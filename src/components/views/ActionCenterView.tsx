import React from 'react';
import { TasksTable } from '@/components/tasks/TasksTable';
export function ActionCenterView() {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground">Action Center</h2>
        <p className="text-sm text-muted-foreground">
          Manage and complete tasks from UiPath Action Center
        </p>
      </div>
      <TasksTable />
    </div>
  );
}