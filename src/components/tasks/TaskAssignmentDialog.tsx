import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, User } from 'lucide-react';
interface TaskAssignmentDialogProps {
  task: any;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (userNameOrEmail: string, reason?: string) => void;
  isLoading: boolean;
}
export function TaskAssignmentDialog({
  task,
  isOpen,
  onClose,
  onAssign,
  isLoading
}: TaskAssignmentDialogProps) {
  const [selectedUser, setSelectedUser] = useState('');
  const [customUser, setCustomUser] = useState('');
  const [reason, setReason] = useState('');
  const [useCustomUser, setUseCustomUser] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userToAssign = useCustomUser ? customUser : selectedUser;
    if (userToAssign.trim()) {
      onAssign(userToAssign.trim(), reason.trim() || undefined);
      handleClose();
    }
  };
  const handleClose = () => {
    setSelectedUser('');
    setCustomUser('');
    setReason('');
    setUseCustomUser(false);
    onClose();
  };
  // Common users for demo purposes - in real app, this would come from UiPath API
  const commonUsers = [
    'admin@company.com',
    'user1@company.com',
    'user2@company.com',
    'manager@company.com'
  ];
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Assign Task
          </DialogTitle>
          <DialogDescription>
            Assign "{task?.title || task?.name || 'this task'}" to a user
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-selection">Assign to</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="preset-user"
                  name="user-type"
                  checked={!useCustomUser}
                  onChange={() => setUseCustomUser(false)}
                  className="w-4 h-4"
                />
                <Label htmlFor="preset-user" className="text-sm">Select from list</Label>
              </div>
              {!useCustomUser && (
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonUsers.map((user) => (
                      <SelectItem key={user} value={user}>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {user}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="custom-user"
                  name="user-type"
                  checked={useCustomUser}
                  onChange={() => setUseCustomUser(true)}
                  className="w-4 h-4"
                />
                <Label htmlFor="custom-user" className="text-sm">Enter custom user</Label>
              </div>
              {useCustomUser && (
                <Input
                  placeholder="Enter username or email"
                  value={customUser}
                  onChange={(e) => setCustomUser(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Assignment reason (optional)</Label>
            <Textarea
              id="reason"
              placeholder="Enter reason for assignment..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || (!selectedUser && !customUser)}
            >
              {isLoading ? 'Assigning...' : 'Assign Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}