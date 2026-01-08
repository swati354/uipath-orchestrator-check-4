import React from 'react';
import { ProcessesTable } from '@/components/processes/ProcessesTable';
import { AssetsTable } from '@/components/assets/AssetsTable';
export function ResourcesView() {
  return (
    <div className="space-y-8">
      {/* Processes Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-foreground">Processes</h2>
          <p className="text-sm text-muted-foreground">
            Manage and execute automation processes
          </p>
        </div>
        <ProcessesTable />
      </div>
      {/* Assets Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-foreground">Assets</h2>
          <p className="text-sm text-muted-foreground">
            Configuration values and credentials for processes
          </p>
        </div>
        <AssetsTable />
      </div>
    </div>
  );
}