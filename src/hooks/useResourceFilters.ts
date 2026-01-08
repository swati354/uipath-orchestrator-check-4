import { useState, useMemo } from 'react';
interface FilterableResource {
  name?: string;
  status?: string;
  folderName?: string;
  valueType?: string;
  [key: string]: any;
}
export function useResourceFilters(data: FilterableResource[]) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [folderFilter, setFolderFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      // Status filter
      if (statusFilter !== 'all') {
        const itemStatus = item.status || item.valueType || 'Available';
        if (itemStatus.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }
      }
      // Folder filter
      if (folderFilter !== 'all') {
        const itemFolder = (item.folderName || 'default').toLowerCase();
        if (itemFolder !== folderFilter.toLowerCase()) {
          return false;
        }
      }
      // Search filter
      if (searchFilter) {
        const searchTerm = searchFilter.toLowerCase();
        const itemName = (item.name || '').toLowerCase();
        const itemDescription = (item.description || '').toLowerCase();
        if (!itemName.includes(searchTerm) && !itemDescription.includes(searchTerm)) {
          return false;
        }
      }
      return true;
    });
  }, [data, statusFilter, folderFilter, searchFilter]);
  return {
    statusFilter,
    setStatusFilter,
    folderFilter,
    setFolderFilter,
    searchFilter,
    setSearchFilter,
    filteredData
  };
}