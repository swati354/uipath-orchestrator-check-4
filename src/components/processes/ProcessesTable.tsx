import React, { useState, useMemo } from 'react';
import { useUiPathAuth } from '@/hooks/useUiPathAuth';
import { useUiPathProcesses, useStartProcess } from '@/hooks/useUiPathProcesses';
import { FilterControls } from '@/components/shared/FilterControls';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useResourceFilters } from '@/hooks/useResourceFilters';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Package } from 'lucide-react';
import { format } from 'date-fns';
export function ProcessesTable() {
  const { isAuthenticated } = useUiPathAuth();
  const { data: processes, isLoading, error, refetch } = useUiPathProcesses(undefined, isAuthenticated);
  const { mutate: startProcess, isPending: isStarting } = useStartProcess();
  const {
    statusFilter,
    setStatusFilter,
    folderFilter,
    setFolderFilter,
    searchFilter,
    setSearchFilter,
    filteredData
  } = useResourceFilters(processes || []);
  const handleStartProcess = (processKey: string, folderId: number) => {
    startProcess({ processKey, folderId });
  };
  if (isLoading) {
    return <LoadingState type="table" />;
  }
  if (error) {
    return (
      <ErrorState
        message="Failed to load processes"
        onRetry={refetch}
      />
    );
  }
  const processArray = Array.isArray(processes) ? processes : (processes as any)?.value || [];
  if (processArray.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No processes found"
        description="Create processes in UiPath Studio and publish them to Orchestrator to see them here."
      />
    );
  }
  return (
    <div className="space-y-4">
      <FilterControls
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        folderFilter={folderFilter}
        onFolderChange={setFolderFilter}
        searchFilter={searchFilter}
        onSearchChange={setSearchFilter}
        searchPlaceholder="Search processes..."
        statusOptions={[
          { value: 'all', label: 'All Statuses' },
          { value: 'Available', label: 'Available' },
          { value: 'Running', label: 'Running' },
          { value: 'Failed', label: 'Failed' }
        ]}
      />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Name</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Version</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Status</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Last Run</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Folder</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((process: any) => (
                <TableRow key={process.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <TableCell className="px-3 py-2">
                    <div>
                      <div className="text-sm font-medium text-foreground">{process.name}</div>
                      {process.description && (
                        <div className="text-xs text-muted-foreground mt-1">{process.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-foreground">{process.processVersion || '1.0.0'}</span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <StatusBadge status="Available" />
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-muted-foreground">
                      {process.lastModifiedTime ? format(new Date(process.lastModifiedTime), 'MMM d, HH:mm') : 'Never'}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-muted-foreground">{process.folderName || 'Default'}</span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <Button
                      size="sm"
                      onClick={() => handleStartProcess(process.key, process.folderId || 1)}
                      disabled={isStarting}
                      className="h-7 px-3 text-xs"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}