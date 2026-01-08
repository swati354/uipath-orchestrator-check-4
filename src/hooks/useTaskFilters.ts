import { useState, useMemo } from 'react';
interface FilterableTask {
  title?: string;
  name?: string;
  description?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  assignedTo?: string;
  [key: string]: any;
}
export function useTaskFilters(data: FilterableTask[]) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assignmentFilter, setAssignmentFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((task) => {
      // Status filter
      if (statusFilter !== 'all') {
        const taskStatus = task.status || 'Pending';
        if (taskStatus.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }
      }
      // Priority filter
      if (priorityFilter !== 'all') {
        const taskPriority = task.priority || 'Medium';
        if (taskPriority.toLowerCase() !== priorityFilter.toLowerCase()) {
          return false;
        }
      }
      // Assignment filter
      if (assignmentFilter !== 'all') {
        const taskAssignee = task.assignee || task.assignedTo || '';
        if (assignmentFilter === 'assigned' && !taskAssignee) {
          return false;
        }
        if (assignmentFilter === 'unassigned' && taskAssignee) {
          return false;
        }
      }
      // Search filter
      if (searchFilter) {
        const searchTerm = searchFilter.toLowerCase();
        const taskTitle = (task.title || task.name || '').toLowerCase();
        const taskDescription = (task.description || '').toLowerCase();
        const taskAssignee = (task.assignee || task.assignedTo || '').toLowerCase();
        if (
          !taskTitle.includes(searchTerm) && 
          !taskDescription.includes(searchTerm) && 
          !taskAssignee.includes(searchTerm)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [data, statusFilter, priorityFilter, assignmentFilter, searchFilter]);
  return {
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    assignmentFilter,
    setAssignmentFilter,
    searchFilter,
    setSearchFilter,
    filteredData
  };
}