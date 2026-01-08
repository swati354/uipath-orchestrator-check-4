import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
export function ActionCenterView() {
  return (
    <div className="space-y-6">
      <Card className="border-dashed">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">Action Center Coming Soon</CardTitle>
          <CardDescription>
            Task management and assignment features will be available in the next phase
          </CardDescription>
        </CardContent>
        <CardContent className="pt-0">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              This section will include comprehensive task management, assignment workflows, and completion tracking.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}