import { Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface Target {
  id: string;
  accountNo: string;
  customerName: string;
  store: string;
}

interface Order {
  orderNumber: string;
  orderDate: string;
  totalPrice: string;
  totalQuantity: number;
}

interface ViewOrdersModalProps {
  target: Target;
  onClose: () => void;
}

// Mock orders data
const mockOrders: { [key: string]: Order[] } = {
  'ACC001': [
    { orderNumber: 'ORD-2025-001', orderDate: '2025-12-01', totalPrice: '$1,245.00', totalQuantity: 85 },
    { orderNumber: 'ORD-2025-015', orderDate: '2025-11-28', totalPrice: '$987.50', totalQuantity: 62 }
  ],
  'ACC002': [
    { orderNumber: 'ORD-2025-002', orderDate: '2025-12-01', totalPrice: '$2,150.00', totalQuantity: 120 },
    { orderNumber: 'ORD-2025-018', orderDate: '2025-11-29', totalPrice: '$1,875.00', totalQuantity: 95 }
  ],
  'ACC003': [
    { orderNumber: 'ORD-2025-003', orderDate: '2025-12-01', totalPrice: '$875.00', totalQuantity: 48 }
  ],
  'ACC004': [
    { orderNumber: 'ORD-2025-004', orderDate: '2025-12-04', totalPrice: '$1,560.00', totalQuantity: 72 },
    { orderNumber: 'ORD-2025-021', orderDate: '2025-12-01', totalPrice: '$1,320.00', totalQuantity: 68 }
  ],
  'ACC005': [
    { orderNumber: 'ORD-2025-005', orderDate: '2025-12-04', totalPrice: '$645.00', totalQuantity: 35 }
  ],
  'ACC006': [
    { orderNumber: 'ORD-2025-006', orderDate: '2025-12-04', totalPrice: '$3,200.00', totalQuantity: 145 },
    { orderNumber: 'ORD-2025-024', orderDate: '2025-12-02', totalPrice: '$2,890.00', totalQuantity: 132 },
    { orderNumber: 'ORD-2025-019', orderDate: '2025-11-30', totalPrice: '$3,100.00', totalQuantity: 138 }
  ],
  'ACC007': [
    { orderNumber: 'ORD-2025-007', orderDate: '2025-12-04', totalPrice: '$1,125.00', totalQuantity: 58 }
  ],
  'ACC008': [
    { orderNumber: 'ORD-2025-008', orderDate: '2025-12-04', totalPrice: '$2,450.00', totalQuantity: 105 }
  ],
  'ACC009': [
    { orderNumber: 'ORD-2025-009', orderDate: '2025-12-29', totalPrice: '$1,890.00', totalQuantity: 82 },
    { orderNumber: 'ORD-2025-027', orderDate: '2025-12-26', totalPrice: '$1,675.00', totalQuantity: 74 }
  ],
  'ACC010': [
    { orderNumber: 'ORD-2025-010', orderDate: '2025-12-29', totalPrice: '$2,100.00', totalQuantity: 96 }
  ]
};

export function ViewOrdersModal({ target, onClose }: ViewOrdersModalProps) {
  const orders = mockOrders[target.accountNo] || [];

  const handleViewOrder = (orderNumber: string) => {
    // In a real application, this would navigate to the Order History tab and show the specific order
    alert(`Navigating to Order History for order ${orderNumber}`);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Customer: {target.customerName} ({target.accountNo}) - {target.store}
          </p>
        </DialogHeader>

        <div className="mt-4">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No orders found for this customer.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Total Quantity</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderNumber}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.totalPrice}</TableCell>
                    <TableCell>{order.totalQuantity}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewOrder(order.orderNumber)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}