import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
interface FilterOption {
  value: string;
  label: string;
}
interface FilterControlsProps {
  statusFilter: string;
  onStatusChange: (value: string) => void;
  folderFilter: string;
  onFolderChange: (value: string) => void;
  searchFilter: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  statusOptions: FilterOption[];
}
export function FilterControls({
  statusFilter,
  onStatusChange,
  folderFilter,
  onFolderChange,
  searchFilter,
  onSearchChange,
  searchPlaceholder = "Search...",
  statusOptions
}: FilterControlsProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-40 h-8 text-xs">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-xs">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={folderFilter} onValueChange={onFolderChange}>
          <SelectTrigger className="w-40 h-8 text-xs">
            <SelectValue placeholder="Filter by folder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All Folders</SelectItem>
            <SelectItem value="default" className="text-xs">Default</SelectItem>
            <SelectItem value="production" className="text-xs">Production</SelectItem>
            <SelectItem value="development" className="text-xs">Development</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchFilter}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-7 h-8 text-xs"
        />
      </div>
    </div>
  );
}