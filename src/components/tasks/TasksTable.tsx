import React, { useState } from 'react';
import { useUiPathAuth } from '@/hooks/useUiPathAuth';
import { useUiPathTasks, useAssignTask, useCompleteTask } from '@/hooks/useUiPathTasks';
import { FilterControls } from '@/components/shared/FilterControls';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { TaskAssignmentDialog } from '@/components/tasks/TaskAssignmentDialog';
import { TaskCompletionDialog } from '@/components/tasks/TaskCompletionDialog';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
export function TasksTable() {
  const { isAuthenticated } = useUiPathAuth();
  const { data: tasks, isLoading, error, refetch } = useUiPathTasks(undefined, isAuthenticated);
  const { mutate: assignTask, isPending: isAssigning } = useAssignTask();
  const { mutate: completeTask, isPending: isCompleting } = useCompleteTask();
  const [selectedTaskForAssignment, setSelectedTaskForAssignment] = useState<any>(null);
  const [selectedTaskForCompletion, setSelectedTaskForCompletion] = useState<any>(null);
  const {
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    assignmentFilter,
    setAssignmentFilter,
    searchFilter,
    setSearchFilter,
    filteredData
  } = useTaskFilters(tasks || []);
  const handleAssignTask = (userNameOrEmail: string, reason?: string) => {
    if (selectedTaskForAssignment) {
      assignTask({ 
        taskId: selectedTaskForAssignment.id, 
        userNameOrEmail 
      });
      setSelectedTaskForAssignment(null);
    }
  };
  const handleCompleteTask = (action: string, data: Record<string, unknown>) => {
    if (selectedTaskForCompletion) {
      completeTask({
        taskId: selectedTaskForCompletion.id,
        type: selectedTaskForCompletion.type || 'External',
        action,
        data,
        folderId: selectedTaskForCompletion.folderId || 1
      });
      setSelectedTaskForCompletion(null);
    }
  };
  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'High': 'destructive',
      'Medium': 'default',
      'Low': 'secondary',
      'Critical': 'destructive'
    };
    const colors: Record<string, string> = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-green-100 text-green-800 border-green-200'
    };
    return (
      <Badge variant="outline" className={`text-xs font-medium border ${colors[priority] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {priority}
      </Badge>
    );
  };
  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'inprogress':
      case 'in progress':
        return <AlertTriangle className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };
  if (isLoading) {
    return <LoadingState type="table" />;
  }
  if (error) {
    return (
      <ErrorState
        message="Failed to load tasks"
        onRetry={refetch}
      />
    );
  }
  const taskArray = Array.isArray(tasks) ? tasks : tasks?.value || [];
  if (taskArray.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle}
        title="No tasks found"
        description="Tasks from UiPath Action Center will appear here when available."
      />
    );
  }
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <FilterControls
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            folderFilter={assignmentFilter}
            onFolderChange={setAssignmentFilter}
            searchFilter={searchFilter}
            onSearchChange={setSearchFilter}
            searchPlaceholder="Search tasks..."
            statusOptions={[
              { value: 'all', label: 'All Statuses' },
              { value: 'Pending', label: 'Pending' },
              { value: 'InProgress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' }
            ]}
          />
          <div className="flex items-center gap-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-8 px-3 text-xs border border-input bg-background rounded-md"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Task</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Status</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Priority</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Assignee</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Due Date</TableHead>
                  <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((task: any) => (
                  <TableRow key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <TableCell className="px-3 py-2">
                      <div>
                        <div className="text-sm font-medium text-foreground flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          {task.title || task.name || `Task ${task.id}`}
                        </div>
                        {task.description && (
                          <div className="text-xs text-muted-foreground mt-1">{task.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <StatusBadge status={task.status || 'Pending'} />
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      {getPriorityBadge(task.priority || 'Medium')}
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <span className="text-sm text-muted-foreground">
                        {task.assignee || task.assignedTo || 'Unassigned'}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <span className="text-sm text-muted-foreground">
                        {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due date'}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedTaskForAssignment(task)}
                          disabled={isAssigning}
                          className="h-7 px-3 text-xs"
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Assign
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setSelectedTaskForCompletion(task)}
                          disabled={isCompleting || task.status === 'Completed'}
                          className="h-7 px-3 text-xs"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Complete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {/* Assignment Dialog */}
      <TaskAssignmentDialog
        task={selectedTaskForAssignment}
        isOpen={!!selectedTaskForAssignment}
        onClose={() => setSelectedTaskForAssignment(null)}
        onAssign={handleAssignTask}
        isLoading={isAssigning}
      />
      {/* Completion Dialog */}
      <TaskCompletionDialog
        task={selectedTaskForCompletion}
        isOpen={!!selectedTaskForCompletion}
        onClose={() => setSelectedTaskForCompletion(null)}
        onComplete={handleCompleteTask}
        isLoading={isCompleting}
      />
    </>
  );
}