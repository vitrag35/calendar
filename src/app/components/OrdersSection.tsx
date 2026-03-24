import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { PlaceOrderModal } from './PlaceOrderModal';
import { toast } from 'sonner';

interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  customerId: string;
  customerName: string;
  store: string;
  orderDate: Date;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed';
}

interface OrdersSectionProps {
  orders: Order[];
  onOrderPlaced: (order: Order) => void;
}

export function OrdersSection({ orders, onOrderPlaced }: OrdersSectionProps) {
  const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const handleConfirmOrder = (orderId: string) => {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      // Update order status to confirmed
      const updatedOrder = { ...order, status: 'confirmed' as const };
      toast.success(`Order ${orderId} confirmed`);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    toast.success(`Order ${orderId} deleted`);
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const confirmedOrders = orders.filter(o => o.status === 'confirmed');

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1>Orders Management</h1>
          <Button onClick={() => setShowPlaceOrderModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Place New Order
          </Button>
        </div>
        <p className="text-gray-600">Manage orders for your wholesale customers</p>
        
        {/* Info Card */}
        <Card className="mt-4 p-4 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-sm mb-2">How it works:</h3>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• <span className="font-semibold">Select a customer</span> - Each customer has a designated order day (e.g., Monday, Tuesday)</li>
            <li>• <span className="font-semibold">Choose order date</span> - Place order on any date you want</li>
            <li>• <span className="font-semibold">Calendar updates</span> - If placed on customer's order day → <span className="bg-green-100 px-1 rounded text-green-700">GREEN</span>, if placed before → <span className="bg-yellow-100 px-1 rounded text-yellow-700">YELLOW (Prebook)</span></li>
          </ul>
        </Card>
      </div>

      {/* Pending Orders */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Pending Orders ({pendingOrders.length})</h2>
        {pendingOrders.length === 0 ? (
          <Card className="p-6 text-center text-gray-500">
            No pending orders
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingOrders.map((order) => (
                    <div key={order.orderId}>
                      <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => setExpandedOrderId(expandedOrderId === order.orderId ? null : order.orderId)}>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.store}</TableCell>
                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>{order.items.length} items</TableCell>
                        <TableCell className="font-semibold">${order.totalPrice.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleConfirmOrder(order.orderId);
                              }}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteOrder(order.orderId);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedOrderId === order.orderId && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-gray-50 p-4">
                            <div>
                              <h3 className="font-semibold mb-3">Order Items:</h3>
                              <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between text-sm">
                                    <span>{item.product}</span>
                                    <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </div>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>

      {/* Confirmed Orders */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Confirmed Orders ({confirmedOrders.length})</h2>
        {confirmedOrders.length === 0 ? (
          <Card className="p-6 text-center text-gray-500">
            No confirmed orders yet
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {confirmedOrders.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.store}</TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell className="font-semibold">${order.totalPrice.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>

      {showPlaceOrderModal && (
        <PlaceOrderModal
          onClose={() => setShowPlaceOrderModal(false)}
          onOrderPlaced={(order) => {
            onOrderPlaced(order);
            setShowPlaceOrderModal(false);
          }}
        />
      )}
    </div>
  );
}
