import { useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
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

interface Customer {
  id: string;
  accountNo: string;
  name: string;
  store: string;
  orderDay: string; // day of week (Monday, Tuesday, etc.)
}

interface PlaceOrderModalProps {
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
}

// Mock customer data
const CUSTOMERS: Customer[] = [
  { id: 'MON-1', accountNo: 'ACC001', name: 'John Smith', store: 'Quick Mart Downtown', orderDay: 'Monday' },
  { id: 'MON-2', accountNo: 'ACC002', name: 'Sarah Johnson', store: 'Super Save Market', orderDay: 'Monday' },
  { id: 'MON-3', accountNo: 'ACC003', name: 'Mike Williams', store: 'City Grocery', orderDay: 'Monday' },
  { id: 'MON-4', accountNo: 'ACC009', name: 'Lisa Anderson', store: 'Metro Provisions', orderDay: 'Monday' },
  { id: 'TUE-1', accountNo: 'ACC004', name: 'Emily Davis', store: 'Fresh Foods Market', orderDay: 'Tuesday' },
  { id: 'TUE-2', accountNo: 'ACC005', name: 'David Brown', store: 'Corner Store', orderDay: 'Tuesday' },
  { id: 'TUE-3', accountNo: 'ACC010', name: 'Robert Taylor', store: 'Budget Mart', orderDay: 'Tuesday' },
  { id: 'WED-1', accountNo: 'ACC006', name: 'Jennifer White', store: 'Prime Market', orderDay: 'Wednesday' },
  { id: 'WED-2', accountNo: 'ACC011', name: 'Patricia Green', store: 'Green Valley Market', orderDay: 'Wednesday' },
  { id: 'WED-3', accountNo: 'ACC012', name: 'Mark Thompson', store: 'Downtown Depot', orderDay: 'Wednesday' },
  { id: 'WED-4', accountNo: 'ACC013', name: 'Nancy Wilson', store: 'Family Food Store', orderDay: 'Wednesday' },
  { id: 'THU-1', accountNo: 'ACC014', name: 'George Martinez', store: 'Sunrise Grocers', orderDay: 'Thursday' },
  { id: 'THU-2', accountNo: 'ACC015', name: 'Linda Garcia', store: 'Quick Stop Market', orderDay: 'Thursday' },
  { id: 'THU-3', accountNo: 'ACC016', name: 'Charles Moore', store: 'Village Market', orderDay: 'Thursday' },
  { id: 'FRI-1', accountNo: 'ACC017', name: 'Barbara Clark', store: 'Express Mart', orderDay: 'Friday' },
  { id: 'FRI-2', accountNo: 'ACC018', name: 'Steven Lewis', store: 'Community Food Hub', orderDay: 'Friday' },
];

const SAMPLE_PRODUCTS = [
  { name: 'Milk (1L)', basePrice: 2.50 },
  { name: 'Bread (Loaf)', basePrice: 3.00 },
  { name: 'Eggs (Dozen)', basePrice: 4.50 },
  { name: 'Cheese (500g)', basePrice: 6.00 },
  { name: 'Yogurt (1L)', basePrice: 3.50 },
  { name: 'Butter (250g)', basePrice: 5.00 },
  { name: 'Juice (1L)', basePrice: 2.75 },
  { name: 'Coffee (500g)', basePrice: 8.00 },
];

export function PlaceOrderModal({ onClose, onOrderPlaced }: PlaceOrderModalProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [newProduct, setNewProduct] = useState('');
  const [newQuantity, setNewQuantity] = useState('1');
  const [newPrice, setNewPrice] = useState('');

  const customer = CUSTOMERS.find(c => c.id === selectedCustomer);

  const handleAddItem = () => {
    if (!newProduct || !newQuantity || !newPrice) {
      toast.error('Please fill in all item fields');
      return;
    }

    const item: OrderItem = {
      product: newProduct,
      quantity: parseInt(newQuantity),
      price: parseFloat(newPrice)
    };

    setItems([...items, item]);
    setNewProduct('');
    setNewQuantity('1');
    setNewPrice('');
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const handlePlaceOrder = () => {
    if (!selectedCustomer) {
      toast.error('Please select a customer');
      return;
    }

    if (items.length === 0) {
      toast.error('Please add at least one item');
      return;
    }

    if (!customer) {
      toast.error('Invalid customer');
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    
    // Parse date string (YYYY-MM-DD format from input) to Date object
    // Add time to avoid timezone issues
    const [year, month, day] = orderDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    
    const order: Order = {
      orderId,
      customerId: customer.id,
      customerName: customer.name,
      store: customer.store,
      orderDate: dateObj,
      items,
      totalPrice,
      status: 'pending'
    };

    onOrderPlaced(order);
    toast.success(`Order ${orderId} placed successfully for ${customer.name}`);
    
    // Reset form and close modal
    setSelectedCustomer('');
    setOrderDate(new Date().toISOString().split('T')[0]);
    setItems([]);
    setNewProduct('');
    setNewQuantity('1');
    setNewPrice('');
    
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Place New Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Customer Selection */}
          <div className="space-y-2">
            <Label htmlFor="customer">Select Customer *</Label>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger id="customer">
                <SelectValue placeholder="Choose a customer..." />
              </SelectTrigger>
              <SelectContent>
                {CUSTOMERS.map((cust) => (
                  <SelectItem key={cust.id} value={cust.id}>
                    {cust.name} - {cust.store} ({cust.orderDay})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Customer Details */}
          {customer && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Customer Name</p>
                  <p className="font-semibold">{customer.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Account No.</p>
                  <p className="font-semibold">{customer.accountNo}</p>
                </div>
                <div>
                  <p className="text-gray-600">Store</p>
                  <p className="font-semibold">{customer.store}</p>
                </div>
                <div>
                  <p className="text-gray-600">Order Day</p>
                  <p className="font-semibold">{customer.orderDay}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Order Date */}
          <div className="space-y-2">
            <Label htmlFor="orderDate">Order Date *</Label>
            <Input
              id="orderDate"
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
            {customer && (
              <div className="text-xs text-gray-600 mt-2 space-y-1">
                <p>Customer's regular order day: <span className="font-semibold">{customer.orderDay}</span></p>
                <p>
                  {new Date(orderDate).toLocaleDateString('en-US', { weekday: 'long' }) === customer.orderDay
                    ? <span className="text-green-600 font-semibold">✓ Order placed on schedule - will show as GREEN on calendar</span>
                    : <span className="text-yellow-600 font-semibold">⚠ Order placed early/late - will show as YELLOW (PREBOOK) on the customer's next {customer.orderDay}</span>}
                </p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="font-semibold">Order Items</h3>

            {items.length > 0 && (
              <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-sm">{item.product}</p>
                      <p className="text-xs text-gray-600">{item.quantity} × ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(idx)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Item */}
            <div className="space-y-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
              <p className="text-sm font-medium">Add Item</p>
              <div className="space-y-2">
                <Select value={newProduct} onValueChange={setNewProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SAMPLE_PRODUCTS.map((prod) => (
                      <SelectItem key={prod.name} value={prod.name}>
                        {prod.name} - ${prod.basePrice.toFixed(2)}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Product</SelectItem>
                  </SelectContent>
                </Select>

                {newProduct === 'custom' && (
                  <Input
                    placeholder="Enter custom product name"
                    value={newProduct === 'custom' ? '' : newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                  />
                )}

                <Input
                  type="number"
                  placeholder="Quantity"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  min="1"
                />

                <Input
                  type="number"
                  placeholder="Unit Price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  step="0.01"
                />

                <Button onClick={handleAddItem} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="font-semibold">Order Total:</span>
            <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePlaceOrder} disabled={!selectedCustomer || items.length === 0}>
            Place Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
