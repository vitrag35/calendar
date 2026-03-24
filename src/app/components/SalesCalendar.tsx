import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { TargetListView } from './TargetListView';

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

interface DayTargets {
  [key: string]: Target[];
}

// Mock data for demonstration - Weekly recurring schedule
// Each day of the week has fixed customers that repeat
const mondayCustomers: Omit<Target, 'status' | 'callTime'>[] = [
  {
    id: 'MON-1',
    accountNo: 'ACC001',
    store: 'Quick Mart Downtown',
    address: '123 Main St, Downtown',
    route: 'Route A - Monday',
    stop: 'Stop 1',
    phone: '555-0101',
    email: 'quickmart@example.com',
    customerName: 'John Smith',
    companyName: 'Quick Mart LLC',
    creditLimit: '$50,000',
    lastBalance: '$2,500',
    terms: 'Net 30',
    daysUntilDue: '15',
    routeNumber: 'R-MON-A',
    stopNumber: 'S-001',
    operationHours: '8 AM - 8 PM',
    memo: 'Preferred delivery in morning',
    mobile: '555-0102',
    notes: []
  },
  {
    id: 'MON-2',
    accountNo: 'ACC002',
    store: 'Super Save Market',
    address: '456 Oak Ave, Midtown',
    route: 'Route A - Monday',
    stop: 'Stop 2',
    phone: '555-0103',
    email: 'supersave@example.com',
    customerName: 'Sarah Johnson',
    companyName: 'Super Save Inc',
    creditLimit: '$75,000',
    lastBalance: '$5,200',
    terms: 'Net 30',
    daysUntilDue: '10',
    routeNumber: 'R-MON-A',
    stopNumber: 'S-002',
    operationHours: '7 AM - 10 PM',
    memo: 'Large orders on weekends',
    mobile: '555-0104',
    notes: []
  },
  {
    id: 'MON-3',
    accountNo: 'ACC003',
    store: 'City Grocery',
    address: '789 Pine Rd, Uptown',
    route: 'Route A - Monday',
    stop: 'Stop 3',
    phone: '555-0105',
    email: 'citygrocery@example.com',
    customerName: 'Mike Williams',
    companyName: 'City Grocery Co',
    creditLimit: '$40,000',
    lastBalance: '$1,800',
    terms: 'Net 15',
    daysUntilDue: '5',
    routeNumber: 'R-MON-A',
    stopNumber: 'S-003',
    operationHours: '6 AM - 11 PM',
    memo: 'Contact manager for large orders',
    mobile: '555-0106',
    notes: []
  },
  {
    id: 'MON-4',
    accountNo: 'ACC009',
    store: 'Metro Provisions',
    address: '987 Cedar Ln, Eastside',
    route: 'Route A - Monday',
    stop: 'Stop 4',
    phone: '555-0111',
    email: 'metroprovisions@example.com',
    customerName: 'Lisa Anderson',
    companyName: 'Metro Provisions Inc',
    creditLimit: '$80,000',
    lastBalance: '$6,500',
    terms: 'Net 30',
    daysUntilDue: '12',
    routeNumber: 'R-MON-A',
    stopNumber: 'S-004',
    operationHours: '8 AM - 8 PM',
    memo: 'Prefers weekly deliveries',
    mobile: '555-0112',
    notes: []
  }
];

const tuesdayCustomers: Omit<Target, 'status' | 'callTime'>[] = [
  {
    id: 'TUE-1',
    accountNo: 'ACC004',
    store: 'Fresh Foods Market',
    address: '321 Elm St, Southside',
    route: 'Route B - Tuesday',
    stop: 'Stop 1',
    phone: '555-0107',
    email: 'freshfoods@example.com',
    customerName: 'Emily Davis',
    companyName: 'Fresh Foods Ltd',
    creditLimit: '$60,000',
    lastBalance: '$3,100',
    terms: 'Net 30',
    daysUntilDue: '20',
    routeNumber: 'R-TUE-B',
    stopNumber: 'S-001',
    operationHours: '7 AM - 9 PM',
    memo: 'Specializes in organic products',
    mobile: '555-0108',
    notes: []
  },
  {
    id: 'TUE-2',
    accountNo: 'ACC005',
    store: 'Corner Store',
    address: '654 Maple Dr, Westend',
    route: 'Route B - Tuesday',
    stop: 'Stop 2',
    phone: '555-0109',
    email: 'cornerstore@example.com',
    customerName: 'David Brown',
    companyName: 'Corner Store LLC',
    creditLimit: '$35,000',
    lastBalance: '$900',
    terms: 'Net 15',
    daysUntilDue: '8',
    routeNumber: 'R-TUE-B',
    stopNumber: 'S-002',
    operationHours: '6 AM - 12 AM',
    memo: 'Open 24/7 on weekends',
    mobile: '555-0110',
    notes: []
  },
  {
    id: 'TUE-3',
    accountNo: 'ACC010',
    store: 'Budget Mart',
    address: '147 Birch St, Northside',
    route: 'Route B - Tuesday',
    stop: 'Stop 3',
    phone: '555-0113',
    email: 'budgetmart@example.com',
    customerName: 'Robert Taylor',
    companyName: 'Budget Mart Co',
    creditLimit: '$45,000',
    lastBalance: '$2,200',
    terms: 'Net 30',
    daysUntilDue: '18',
    routeNumber: 'R-TUE-B',
    stopNumber: 'S-003',
    operationHours: '9 AM - 9 PM',
    memo: 'Price sensitive customer',
    mobile: '555-0114',
    notes: []
  }
];

const wednesdayCustomers: Omit<Target, 'status' | 'callTime'>[] = [
  {
    id: 'WED-1',
    accountNo: 'ACC006',
    store: 'Prime Market',
    address: '258 Spruce Ave, Central',
    route: 'Route C - Wednesday',
    stop: 'Stop 1',
    phone: '555-0115',
    email: 'primemarket@example.com',
    customerName: 'Jennifer White',
    companyName: 'Prime Market LLC',
    creditLimit: '$70,000',
    lastBalance: '$4,800',
    terms: 'Net 30',
    daysUntilDue: '25',
    routeNumber: 'R-WED-C',
    stopNumber: 'S-001',
    operationHours: '7 AM - 10 PM',
    memo: 'Premium product line preferred',
    mobile: '555-0116',
    notes: []
  },
  {
    id: 'WED-2',
    accountNo: 'ACC011',
    store: 'Green Valley Market',
    address: '234 Valley Rd, Greenside',
    route: 'Route C - Wednesday',
    stop: 'Stop 2',
    phone: '555-0121',
    email: 'greenvalley@example.com',
    customerName: 'Patricia Green',
    companyName: 'Green Valley LLC',
    creditLimit: '$48,000',
    lastBalance: '$2,100',
    terms: 'Net 30',
    daysUntilDue: '11',
    routeNumber: 'R-WED-C',
    stopNumber: 'S-002',
    operationHours: '7 AM - 9 PM',
    memo: 'Organic products specialist',
    mobile: '555-0122',
    notes: []
  },
  {
    id: 'WED-3',
    accountNo: 'ACC012',
    store: 'Downtown Depot',
    address: '567 Commerce St, Downtown',
    route: 'Route C - Wednesday',
    stop: 'Stop 3',
    phone: '555-0123',
    email: 'downtowndepot@example.com',
    customerName: 'Mark Thompson',
    companyName: 'Downtown Depot Inc',
    creditLimit: '$85,000',
    lastBalance: '$7,300',
    terms: 'Net 30',
    daysUntilDue: '22',
    routeNumber: 'R-WED-C',
    stopNumber: 'S-003',
    operationHours: '6 AM - 10 PM',
    memo: 'High volume customer',
    mobile: '555-0124',
    notes: []
  },
  {
    id: 'WED-4',
    accountNo: 'ACC013',
    store: 'Family Food Store',
    address: '890 Family Ln, Suburbs',
    route: 'Route C - Wednesday',
    stop: 'Stop 4',
    phone: '555-0125',
    email: 'familyfood@example.com',
    customerName: 'Nancy Wilson',
    companyName: 'Family Food Co',
    creditLimit: '$42,000',
    lastBalance: '$1,950',
    terms: 'Net 15',
    daysUntilDue: '9',
    routeNumber: 'R-WED-C',
    stopNumber: 'S-004',
    operationHours: '8 AM - 8 PM',
    memo: 'Family-owned business',
    mobile: '555-0126',
    notes: []
  }
];

const thursdayCustomers: Omit<Target, 'status' | 'callTime'>[] = [
  {
    id: 'THU-1',
    accountNo: 'ACC014',
    store: 'Sunrise Grocers',
    address: '123 East Ave, Eastville',
    route: 'Route D - Thursday',
    stop: 'Stop 1',
    phone: '555-0127',
    email: 'sunrise@example.com',
    customerName: 'George Martinez',
    companyName: 'Sunrise Grocers Inc',
    creditLimit: '$52,000',
    lastBalance: '$2,800',
    terms: 'Net 30',
    daysUntilDue: '16',
    routeNumber: 'R-THU-D',
    stopNumber: 'S-001',
    operationHours: '6 AM - 9 PM',
    memo: 'Early morning deliveries preferred',
    mobile: '555-0128',
    notes: []
  },
  {
    id: 'THU-2',
    accountNo: 'ACC015',
    store: 'Quick Stop Market',
    address: '456 Fast Ln, Speedway',
    route: 'Route D - Thursday',
    stop: 'Stop 2',
    phone: '555-0129',
    email: 'quickstop@example.com',
    customerName: 'Linda Garcia',
    companyName: 'Quick Stop LLC',
    creditLimit: '$38,000',
    lastBalance: '$1,600',
    terms: 'Net 15',
    daysUntilDue: '6',
    routeNumber: 'R-THU-D',
    stopNumber: 'S-002',
    operationHours: '24/7',
    memo: 'Convenience store - always open',
    mobile: '555-0130',
    notes: []
  },
  {
    id: 'THU-3',
    accountNo: 'ACC016',
    store: 'Village Market',
    address: '789 Village Rd, Oldtown',
    route: 'Route D - Thursday',
    stop: 'Stop 3',
    phone: '555-0131',
    email: 'village@example.com',
    customerName: 'Charles Moore',
    companyName: 'Village Market Co',
    creditLimit: '$44,000',
    lastBalance: '$2,300',
    terms: 'Net 30',
    daysUntilDue: '13',
    routeNumber: 'R-THU-D',
    stopNumber: 'S-003',
    operationHours: '8 AM - 7 PM',
    memo: 'Small town market - loyal customer',
    mobile: '555-0132',
    notes: []
  }
];

const fridayCustomers: Omit<Target, 'status' | 'callTime'>[] = [
  {
    id: 'FRI-1',
    accountNo: 'ACC017',
    store: 'Express Mart',
    address: '321 Quick St, Fastville',
    route: 'Route E - Friday',
    stop: 'Stop 1',
    phone: '555-0133',
    email: 'express@example.com',
    customerName: 'Barbara Clark',
    companyName: 'Express Mart Inc',
    creditLimit: '$56,000',
    lastBalance: '$3,400',
    terms: 'Net 30',
    daysUntilDue: '19',
    routeNumber: 'R-FRI-E',
    stopNumber: 'S-001',
    operationHours: '7 AM - 11 PM',
    memo: 'Fast-paced business',
    mobile: '555-0134',
    notes: []
  },
  {
    id: 'FRI-2',
    accountNo: 'ACC018',
    store: 'Community Food Hub',
    address: '654 Community Dr, Townville',
    route: 'Route E - Friday',
    stop: 'Stop 2',
    phone: '555-0135',
    email: 'communityhub@example.com',
    customerName: 'Steven Lewis',
    companyName: 'Community Hub LLC',
    creditLimit: '$68,000',
    lastBalance: '$4,500',
    terms: 'Net 30',
    daysUntilDue: '21',
    routeNumber: 'R-FRI-E',
    stopNumber: 'S-002',
    operationHours: '8 AM - 9 PM',
    memo: 'Community-focused store',
    mobile: '555-0136',
    notes: []
  }
];

// Generate targets for entire month with weekly recurring customers
const generateMonthTargets = (): DayTargets => {
  const targets: DayTargets = {};
  const today = new Date(2026, 2, 24); // March 24, 2026
  
  // March 2026 calendar
  const daysInMarch = 31;
  const marchStart = new Date(2026, 2, 1);
  
  for (let day = 1; day <= daysInMarch; day++) {
    const currentDate = new Date(2026, 2, day);
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dateKey = `2026-03-${String(day).padStart(2, '0')}`;
    const isPast = currentDate < today;
    const isToday = currentDate.toDateString() === today.toDateString();
    
    let dayCustomers: Omit<Target, 'status' | 'callTime'>[] = [];
    
    // Assign customers based on day of week
    switch (dayOfWeek) {
      case 1: // Monday
        dayCustomers = mondayCustomers;
        break;
      case 2: // Tuesday
        dayCustomers = tuesdayCustomers;
        break;
      case 3: // Wednesday
        dayCustomers = wednesdayCustomers;
        break;
      case 4: // Thursday
        dayCustomers = thursdayCustomers;
        break;
      case 5: // Friday
        dayCustomers = fridayCustomers;
        break;
      // Saturday and Sunday - no targets
    }
    
    if (dayCustomers.length > 0) {
      targets[dateKey] = dayCustomers.map((customer, index) => {
        const target: Target = {
          ...customer,
          id: `${customer.id}-${dateKey}`,
          status: isPast ? 'done' : 'pending',
          notes: customer.notes || []
        };
        
        // Add call times and notes for today (March 24, Monday)
        if (isToday) {
          if (index === 0) {
            target.callTime = '09:30 AM';
            target.notes = [
              {
                id: '1',
                text: 'Customer requested earlier delivery time. Confirmed 9:30 AM works well.',
                date: '03/17/2026, 2:30 PM'
              },
              {
                id: '2',
                text: 'Discussed spring promotions. Very interested in new organic line.',
                date: '03/20/2026, 10:15 AM'
              }
            ];
          } else if (index === 2) {
            target.callTime = '02:00 PM';
            target.notes = [
              {
                id: '3',
                text: 'Manager prefers afternoon visits after lunch rush.',
                date: '03/18/2026, 3:45 PM'
              }
            ];
          }
        }
        
        return target;
      });
    }
  }
  
  return targets;
};

const mockTargets: DayTargets = generateMonthTargets();

export function SalesCalendar({ salesRepId = 'SR-001' }: { salesRepId?: string }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 24)); // March 24, 2026 (month is 0-indexed)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [targets, setTargets] = useState<DayTargets>(mockTargets);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (targets[dateKey] && targets[dateKey].length > 0) {
      setSelectedDate(dateKey);
    }
  };

  const handleBackToCalendar = () => {
    setSelectedDate(null);
  };

  const getDateKey = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };

  const updateTarget = (targetId: string, updates: Partial<Target>) => {
    setTargets(prev => {
      const newTargets = { ...prev };
      Object.keys(newTargets).forEach(dateKey => {
        newTargets[dateKey] = newTargets[dateKey].map(target => 
          target.id === targetId ? { ...target, ...updates } : target
        );
      });
      return newTargets;
    });
  };

  if (selectedDate && targets[selectedDate]) {
    return (
      <TargetListView
        date={selectedDate}
        targets={targets[selectedDate]}
        onBack={handleBackToCalendar}
        onUpdateTarget={updateTarget}
        salesRepId={salesRepId}
      />
    );
  }

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = getDateKey(day);
    const dayTargets = targets[dateKey] || [];
    const hasTargets = dayTargets.length > 0;
    const isTodayDate = isToday(day);

    calendarDays.push(
      <div
        key={day}
        className={`aspect-square border rounded-lg p-2 ${
          isTodayDate ? 'bg-blue-50 border-blue-500 border-2' : 'border-gray-200'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className={`mb-1 ${isTodayDate ? 'font-bold text-blue-600' : ''}`}>
            {day}
          </div>
          {hasTargets && (
            <Button
              onClick={() => handleDayClick(day)}
              className="mt-auto w-full"
              size="sm"
            >
              {dayTargets.length} {dayTargets.length === 1 ? 'target' : 'targets'}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h1 className="mb-4">Sales Calendar</h1>
        <div className="flex gap-2">
          <Button onClick={handleToday} variant="outline">
            Today
          </Button>
          <Button onClick={handlePrevMonth} variant="outline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button onClick={handleNextMonth} variant="outline">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      <Card className="p-4 flex-1">
        <h2 className="mb-4">
          {monthNames[month]} {year}
        </h2>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays}
        </div>
      </Card>
    </div>
  );
}