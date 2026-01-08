import React, { useState } from 'react';
import { useUiPathAuth } from '@/hooks/useUiPathAuth';
import { useUiPathAssets } from '@/hooks/useUiPathAssets';
import { FilterControls } from '@/components/shared/FilterControls';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useResourceFilters } from '@/hooks/useResourceFilters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
export function AssetsTable() {
  const { isAuthenticated } = useUiPathAuth();
  const { data: assets, isLoading, error, refetch } = useUiPathAssets(undefined, isAuthenticated);
  const [showCredentials, setShowCredentials] = useState<Record<string, boolean>>({});
  const {
    statusFilter,
    setStatusFilter,
    folderFilter,
    setFolderFilter,
    searchFilter,
    setSearchFilter,
    filteredData
  } = useResourceFilters(assets || []);
  const toggleCredentialVisibility = (assetId: string) => {
    setShowCredentials(prev => ({
      ...prev,
      [assetId]: !prev[assetId]
    }));
  };
  const formatAssetValue = (asset: any) => {
    if (!asset.value) return 'Not set';
    // Handle credential assets with security masking
    if (asset.valueType === 'Credential' || asset.hasDefaultValue === false) {
      const isVisible = showCredentials[asset.id];
      return isVisible ? asset.value : '••••••••';
    }
    // Handle other asset types
    if (typeof asset.value === 'string' && asset.value.length > 50) {
      return asset.value.substring(0, 50) + '...';
    }
    return asset.value;
  };
  const getAssetTypeBadge = (valueType: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      'Text': 'default',
      'Integer': 'secondary',
      'Boolean': 'outline',
      'Credential': 'destructive'
    };
    return (
      <Badge variant={variants[valueType] || 'default'} className="text-xs">
        {valueType}
      </Badge>
    );
  };
  if (isLoading) {
    return <LoadingState type="table" />;
  }
  if (error) {
    return (
      <ErrorState
        message="Failed to load assets"
        onRetry={refetch}
      />
    );
  }
  const assetArray = Array.isArray(assets) ? assets : (assets as any)?.value || [];
  if (assetArray.length === 0) {
    return (
      <EmptyState
        icon={Settings}
        title="No assets found"
        description="Create assets in UiPath Orchestrator to store configuration values and credentials."
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
        searchPlaceholder="Search assets..."
        statusOptions={[
          { value: 'all', label: 'All Types' },
          { value: 'Text', label: 'Text' },
          { value: 'Integer', label: 'Integer' },
          { value: 'Boolean', label: 'Boolean' },
          { value: 'Credential', label: 'Credential' }
        ]}
      />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Name</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Type</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Value</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Folder</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Last Modified</TableHead>
                <TableHead className="px-3 py-2 text-xs font-medium text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((asset: any) => (
                <TableRow key={asset.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <TableCell className="px-3 py-2">
                    <div>
                      <div className="text-sm font-medium text-foreground">{asset.name}</div>
                      {asset.description && (
                        <div className="text-xs text-muted-foreground mt-1">{asset.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    {getAssetTypeBadge(asset.valueType)}
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground font-mono">
                        {formatAssetValue(asset)}
                      </span>
                      {(asset.valueType === 'Credential' || asset.hasDefaultValue === false) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCredentialVisibility(asset.id)}
                          className="h-6 w-6 p-0"
                        >
                          {showCredentials[asset.id] ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-muted-foreground">{asset.folderName || 'Default'}</span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-muted-foreground">
                      {asset.lastModifiedTime ? format(new Date(asset.lastModifiedTime), 'MMM d, HH:mm') : 'Unknown'}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      Edit
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