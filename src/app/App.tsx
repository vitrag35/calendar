import { useState } from 'react';
import { Calendar, History, Menu, ShoppingCart, User } from 'lucide-react';
import { Button } from './components/ui/button';
import { SalesCalendar } from './components/SalesCalendar';
import { Toaster } from './components/ui/sonner';

type ActiveTab = 'dashboard' | 'orders' | 'order-history' | 'calendar' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('calendar');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        return <SalesCalendar salesRepId="SR-001" />;
      case 'dashboard':
        return (
          <div className="p-6">
            <h1>Dashboard</h1>
            <p className="text-gray-600 mt-4">Welcome to your wholesale marketplace dashboard.</p>
          </div>
        );
      case 'orders':
        return (
          <div className="p-6">
            <h1>Orders</h1>
            <p className="text-gray-600 mt-4">Manage your current orders here.</p>
          </div>
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