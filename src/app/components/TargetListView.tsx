import { useState } from 'react';
import { ChevronLeft, Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { SetCallTimeModal } from './SetCallTimeModal';
import { CustomerDetailsModal } from './CustomerDetailsModal';
import { ViewOrdersModal } from './ViewOrdersModal';

interface Target {
  id: string;
  accountNo: string;
  store: string;
  address: string;
  route: string;
  stop: string;
  phone: string;
  email: string;
  callTime?: string;
  status: 'pending' | 'done';
  customerName: string;
  companyName: string;
  creditLimit: string;
  lastBalance: string;
  terms: string;
  daysUntilDue: string;
  routeNumber: string;
  stopNumber: string;
  operationHours: string;
  memo: string;
  mobile: string;
  notes: Array<{ id: string; text: string; date: string }>;
}

interface TargetListViewProps {
  date: string;
  targets: Target[];
  onBack: () => void;
  onUpdateTarget: (targetId: string, updates: Partial<Target>) => void;
  salesRepId: string;
}

export function TargetListView({ date, targets, onBack, onUpdateTarget, salesRepId }: TargetListViewProps) {
  const [selectedTargetForTime, setSelectedTargetForTime] = useState<Target | null>(null);
  const [selectedTargetForDetails, setSelectedTargetForDetails] = useState<Target | null>(null);
  const [selectedTargetForOrders, setSelectedTargetForOrders] = useState<Target | null>(null);

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSetTime = (targetId: string, time: string) => {
    onUpdateTarget(targetId, { callTime: time });
    setSelectedTargetForTime(null);
  };

  const handleJumpToCustomer = (target: Target) => {
    // In a real application, this would navigate to the customer profile page
    alert(`Navigating to customer profile for ${target.customerName} (${target.accountNo})`);
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Calendar
        </Button>
        <h1>Targets for {formattedDate}</h1>
        <p className="text-gray-600 mt-2">{targets.length} {targets.length === 1 ? 'target' : 'targets'} scheduled</p>
      </div>

      <Card className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account No.</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Stop</TableHead>
              <TableHead>Phone No.</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {targets.map((target) => (
              <TableRow key={target.id}>
                <TableCell>{target.accountNo}</TableCell>
                <TableCell>{target.store}</TableCell>
                <TableCell>{target.address}</TableCell>
                <TableCell>{target.route}</TableCell>
                <TableCell>{target.stop}</TableCell>
                <TableCell>{target.phone}</TableCell>
                <TableCell>{target.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {target.callTime ? (
                      <span className="text-sm">{target.callTime}</span>
                    ) : (
                      <span className="text-sm text-gray-400">Not set</span>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedTargetForTime(target)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={target.status === 'done' ? 'default' : 'secondary'}>
                    {target.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedTargetForDetails(target)}
                    >
                      View Customer Detail
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedTargetForOrders(target)}
                    >
                      View Orders
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleJumpToCustomer(target)}
                    >
                      Jump Customer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {selectedTargetForTime && (
        <SetCallTimeModal
          target={selectedTargetForTime}
          salesRepId={salesRepId}
          onClose={() => setSelectedTargetForTime(null)}
          onSave={handleSetTime}
        />
      )}

      {selectedTargetForDetails && (
        <CustomerDetailsModal
          target={selectedTargetForDetails}
          onClose={() => setSelectedTargetForDetails(null)}
          onUpdateTarget={onUpdateTarget}
        />
      )}

      {selectedTargetForOrders && (
        <ViewOrdersModal
          target={selectedTargetForOrders}
          onClose={() => setSelectedTargetForOrders(null)}
        />
      )}
    </div>
  );
}
