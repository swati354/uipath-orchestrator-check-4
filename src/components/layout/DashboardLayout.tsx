import React from 'react';
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Connection Status Indicator */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Connected to UiPath Orchestrator</span>
              </div>
              <div className="text-xs text-muted-foreground">
                © Powered by UiPath
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}