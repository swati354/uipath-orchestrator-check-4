import React, { useState } from 'react';
import { UiPathAuthProvider } from '@/contexts/UiPathAuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ResourcesView } from '@/components/views/ResourcesView';
import { ActionCenterView } from '@/components/views/ActionCenterView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export function HomePage() {
  return (
    <UiPathAuthProvider>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 md:py-10 lg:py-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                UiPath Orchestrator Control Center
              </h1>
              <p className="text-base text-muted-foreground">
                Centralized management of UiPath automation resources and tasks
              </p>
            </div>
            {/* Tab Navigation */}
            <Tabs defaultValue="resources" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="resources" className="text-sm font-medium">
                  Resources
                </TabsTrigger>
                <TabsTrigger value="action-center" className="text-sm font-medium">
                  Action Center
                </TabsTrigger>
              </TabsList>
              <TabsContent value="resources" className="space-y-0">
                <ResourcesView />
              </TabsContent>
              <TabsContent value="action-center" className="space-y-0">
                <ActionCenterView />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DashboardLayout>
    </UiPathAuthProvider>
  );
}