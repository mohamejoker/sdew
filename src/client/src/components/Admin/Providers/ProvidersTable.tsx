import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, RefreshCw, Globe, Layers } from 'lucide-react';
import { TableLoading } from '@/components/Common/LoadingStates';

interface Provider {
  id: string;
  name: string;
  description: string;
  api_url: string;
  is_active: boolean;
  servicesCount: number;
  activeServicesCount: number;
  added_at: string;
}

interface ProvidersTableProps {
  providers: Provider[];
  onEdit: (provider: Provider) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (provider: Provider) => void;
  onSync: (id: string) => void;
  onManageServices: (provider: Provider) => void;
  isMobile: boolean;
  syncingProvider: string | null;
  isLoading: boolean;
}

const ProvidersTable: React.FC<ProvidersTableProps> = ({
  providers,
  onEdit,
  onDelete,
  onToggleStatus,
  onSync,
  onManageServices,
  isMobile,
  syncingProvider,
  isLoading
}) => {
  if (isLoading) {
    return <TableLoading />;
  }

  if (isMobile) {
    return (
      <div className="grid gap-4">
        {providers.map((provider) => (
          <Card key={provider.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <Badge variant={provider.is_active ? "default" : "secondary"}>
                  {provider.is_active ? 'مفعل' : 'معطل'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{provider.description}</p>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" onClick={() => onEdit(provider)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSync(provider.id)}
                  disabled={syncingProvider === provider.id}
                >
                  <RefreshCw className={`h-4 w-4 ${syncingProvider === provider.id ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(provider.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" onClick={() => onManageServices(provider)}>
                  <Layers className="h-4 w-4" />
                  إدارة الخدمات
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          جميع الموردين ({providers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المورد</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الخدمات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاريخ الإضافة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {providers.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-500">{provider.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={provider.is_active ? "default" : "secondary"}>
                      {provider.is_active ? 'مفعل' : 'معطل'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {provider.activeServicesCount}/{provider.servicesCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(provider.added_at).toLocaleDateString('ar')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => onEdit(provider)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSync(provider.id)}
                        disabled={syncingProvider === provider.id}
                      >
                        <RefreshCw className={`h-4 w-4 ${syncingProvider === provider.id ? 'animate-spin' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(provider.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => onManageServices(provider)}>
                        <Layers className="h-4 w-4" />
                        إدارة الخدمات
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProvidersTable;
