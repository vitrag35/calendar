import { useState } from 'react';
import { Calendar, History, Menu, ShoppingCart, User } from 'lucide-react';
import { Button } from './components/ui/button';
import { SalesCalendar } from './components/SalesCalendar';
import { Toaster } from './components/ui/sonner';
import { OrdersSection } from './components/OrdersSection';

type ActiveTab = 'dashboard' | 'orders' | 'order-history' | 'calendar' | 'profile';

interface Order {
  orderId: string;
  customerId: string;
  customerName: string;
  store: string;
  orderDate: Date;
  items: Array<{ product: string; quantity: number; price: number }>;
  totalPrice: number;
  status: 'pending' | 'confirmed';
}

// Sample orders for demonstration
const SAMPLE_ORDERS: Order[] = [
  {
    orderId: 'ORD-2026-001',
    customerId: 'MON-1',
    customerName: 'John Smith',
    store: 'Quick Mart Downtown',
    orderDate: new Date(2026, 2, 24), // Monday, March 24, 2026
    items: [
      { product: 'Milk (1L)', quantity: 20, price: 2.50 },
      { product: 'Bread (Loaf)', quantity: 15, price: 3.00 },
    ],
    totalPrice: 95.00,
    status: 'pending'
  },
  {
    orderId: 'ORD-2026-002',
    customerId: 'MON-2',
    customerName: 'Sarah Johnson',
    store: 'Super Save Market',
    orderDate: new Date(2026, 2, 20), // Friday, March 20, 2026 (before Monday order day)
    items: [
      { product: 'Eggs (Dozen)', quantity: 30, price: 4.50 },
      { product: 'Cheese (500g)', quantity: 10, price: 6.00 },
    ],
    totalPrice: 195.00,
    status: 'pending'
  },
  {
    orderId: 'ORD-2026-003',
    customerId: 'TUE-1',
    customerName: 'Emily Davis',
    store: 'Fresh Foods Market',
    orderDate: new Date(2026, 2, 25), // Wednesday, March 25, 2026 (before Tuesday order day)
    items: [
      { product: 'Yogurt (1L)', quantity: 25, price: 3.50 },
    ],
    totalPrice: 87.50,
    status: 'confirmed'
  },
  {
    orderId: 'ORD-2026-004',
    customerId: 'MON-3',
    customerName: 'Mike Williams',
    store: 'City Grocery',
    orderDate: new Date(2026, 2, 24), // Monday, March 24, 2026
    items: [
      { product: 'Butter (250g)', quantity: 12, price: 5.00 },
    ],
    totalPrice: 60.00,
    status: 'confirmed'
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('calendar');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);

  const navItems = [
    { id: 'dashboard' as ActiveTab, icon: ShoppingCart, label: 'Dashboard' },
    { id: 'orders' as ActiveTab, icon: ShoppingCart, label: 'Orders' },
    { id: 'order-history' as ActiveTab, icon: History, label: 'Order History' },
    { id: 'calendar' as ActiveTab, icon: Calendar, label: 'Sales Calendar' },
    { id: 'profile' as ActiveTab, icon: User, label: 'Profile' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <SalesCalendar salesRepId="SR-001" orders={orders} />;
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <h1>Dashboard</h1>
            <p className="text-gray-600">Welcome to your wholesale order management system.</p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{orders.length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-600">Pre-Booked Orders</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{orders.filter(o => o.orderDate < new Date()).length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600">Confirmed Orders</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{orders.filter(o => o.status === 'confirmed').length}</p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Smart Calendar Status</p>
                    <p className="text-sm text-gray-600">Orders marked as GREEN (on-time) or YELLOW (pre-booked)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Customer Profiles</p>
                    <p className="text-sm text-gray-600">16 wholesale customers with assigned order days</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Order Management</p>
                    <p className="text-sm text-gray-600">Place, confirm, and track orders in real-time</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Pre-Book System</p>
                    <p className="text-sm text-gray-600">Plan ahead with advance order placement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">Quick Start</h2>
              <ol className="space-y-3 text-blue-900">
                <li className="flex gap-3">
                  <span className="font-semibold bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">1</span>
                  <span>Go to <span className="font-semibold">Orders</span> tab to place orders</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">2</span>
                  <span>Select a customer and choose an order date</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">3</span>
                  <span>Add items and place the order</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm">4</span>
                  <span>Watch the calendar update with GREEN (on-time) or YELLOW (pre-book) status</span>
                </li>
              </ol>
            </div>
          </div>
        );
      case 'orders':
        return (
          <OrdersSection 
            orders={orders} 
            onOrderPlaced={(newOrder) => {
              console.log('[v0] Order placed:', newOrder);
              setOrders([...orders, newOrder]);
            }}
            onOrderConfirmed={(orderId) => {
              console.log('[v0] Order confirmed:', orderId);
              setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: 'confirmed' as const } : o));
            }}
            onOrderDeleted={(orderId) => {
              console.log('[v0] Order deleted:', orderId);
              setOrders(orders.filter(o => o.orderId !== orderId));
            }}
          />
        );
      case 'order-history':
        return (
          <div className="p-6">
            <h1>Order History</h1>
            <p className="text-gray-600 mt-4">View your order history and past transactions.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6">
            <h1>Profile</h1>
            <p className="text-gray-600 mt-4">Manage your account settings and profile information.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl">Wholesale Hub</h2>
          <p className="text-sm text-gray-600 mt-1">Sales Portal</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg">Sales Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your sales targets and customer visits</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm">Sales Rep</p>
                <p className="text-sm">ID: SR-001</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
