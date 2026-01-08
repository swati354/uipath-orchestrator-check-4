import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, AlertCircle } from 'lucide-react';
interface TaskCompletionDialogProps {
  task: any;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (action: string, data: Record<string, unknown>) => void;
  isLoading: boolean;
}
export function TaskCompletionDialog({
  task,
  isOpen,
  onClose,
  onComplete,
  isLoading
}: TaskCompletionDialogProps) {
  const [selectedAction, setSelectedAction] = useState('');
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [comments, setComments] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAction) {
      const completionData = {
        ...formData,
        comments: comments.trim() || undefined,
        completedAt: new Date().toISOString()
      };
      onComplete(selectedAction, completionData);
      handleClose();
    }
  };
  const handleClose = () => {
    setSelectedAction('');
    setFormData({});
    setComments('');
    onClose();
  };
  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };
  // Common actions for different task types
  const getAvailableActions = () => {
    const taskType = task?.type?.toLowerCase() || 'external';
    switch (taskType) {
      case 'app':
      case 'form':
        return [
          { value: 'approve', label: 'Approve', icon: CheckCircle, variant: 'default' },
          { value: 'reject', label: 'Reject', icon: AlertCircle, variant: 'destructive' },
          { value: 'submit', label: 'Submit', icon: CheckCircle, variant: 'default' }
        ];
      default:
        return [
          { value: 'complete', label: 'Complete', icon: CheckCircle, variant: 'default' },
          { value: 'submit', label: 'Submit', icon: CheckCircle, variant: 'default' }
        ];
    }
  };
  const availableActions = getAvailableActions();
  // Dynamic form fields based on task type
  const renderFormFields = () => {
    const taskType = task?.type?.toLowerCase() || 'external';
    if (taskType === 'external') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="result">Task Result</Label>
            <Select 
              value={formData.result as string || ''} 
              onValueChange={(value) => handleFieldChange('result', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="partial">Partial Success</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }
    // App/Form tasks - more complex form
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="decision">Decision</Label>
          <Select 
            value={formData.decision as string || ''} 
            onValueChange={(value) => handleFieldChange('decision', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select decision" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="needs-review">Needs Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (if applicable)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={formData.amount as string || ''}
            onChange={(e) => handleFieldChange('amount', e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="urgent"
            checked={formData.urgent as boolean || false}
            onCheckedChange={(checked) => handleFieldChange('urgent', checked)}
          />
          <Label htmlFor="urgent" className="text-sm">Mark as urgent</Label>
        </div>
      </div>
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Complete Task
          </DialogTitle>
          <DialogDescription>
            Complete "{task?.title || task?.name || 'this task'}" with the required information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Action</Label>
            <div className="grid grid-cols-1 gap-2">
              {availableActions.map((action) => (
                <Button
                  key={action.value}
                  type="button"
                  variant={selectedAction === action.value ? "default" : "outline"}
                  onClick={() => setSelectedAction(action.value)}
                  className="justify-start"
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
          {selectedAction && (
            <>
              {renderFormFields()}
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Add any additional comments..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !selectedAction}
            >
              {isLoading ? 'Completing...' : 'Complete Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}