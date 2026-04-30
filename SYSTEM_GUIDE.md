# Order Management & Calendar System Guide

## Overview
This system manages wholesale orders with intelligent calendar status tracking based on order timing relative to each customer's scheduled order day.

## Key Concepts

### Order Days
Each customer has a designated order day (Monday, Tuesday, Wednesday, Thursday, or Friday):
- **Quick Mart Downtown** → Monday
- **Fresh Foods Market** → Tuesday  
- **Prime Market** → Wednesday
- **Sunrise Grocers** → Thursday
- **Express Mart** → Friday

### Order Status Colors

The calendar displays three status indicators for each customer on their scheduled order day:

#### 🟢 **GREEN** - On-Time Order
- Order placed **on the customer's scheduled order day**
- Example: Quick Mart's order day is Monday. If you place their order on Monday (any Monday), it shows GREEN on that date
- Meaning: Regular, on-schedule order placement

#### 🟡 **YELLOW** - Pre-Booked Order
- Order placed **BEFORE the customer's scheduled order day**
- Example: Quick Mart's order day is Monday. If you place their order on Friday (13th March), it pre-books the order for Monday (17th March - the next Monday)
- On the next Monday (17th March), the calendar shows YELLOW indicating an order was pre-booked
- Meaning: Customer order secured in advance, reduces last-minute rush

#### ⚪ **GRAY** - Pending (No Order)
- No order has been placed for this customer on their scheduled day
- Meaning: Order still needs to be placed

## How to Use

### Step 1: Navigate to Orders Section
Click on **"Orders"** in the sidebar navigation menu.

### Step 2: Place a New Order
1. Click **"Place New Order"** button
2. Select a customer from the dropdown (shows customer name, store, and regular order day)
3. Choose the order date using the date picker
4. The system will indicate:
   - If it's the customer's regular order day → "On schedule ✓" (GREEN)
   - If it's before their order day → "Early/Late - will mark calendar with PREBOOK" (YELLOW)
5. Add items to the order:
   - Select products from the sample list or add custom items
   - Specify quantity and unit price
6. Click **"Place Order"** to submit

### Step 3: View Orders
- **Pending Orders**: Orders not yet confirmed
- **Confirmed Orders**: Orders that have been confirmed

### Step 4: Check Calendar
Navigate to **"Sales Calendar"** to see the visual representation:
- Each calendar day shows how many orders are pending, on-time (green), or pre-booked (yellow)
- Click on a date to see all customers and their statuses
- Status colors update in real-time as orders are placed

## Example Scenarios

### Scenario 1: Order on Scheduled Day
```
Customer: Quick Mart Downtown
Order Day: Monday (every week)
Action: Place order on Monday, March 24, 2026
Result: Calendar shows GREEN on March 24 → "Done (On-time)"
```

### Scenario 2: Early Order (Pre-book)
```
Customer: Quick Mart Downtown  
Order Day: Monday
Action: Place order on Friday, March 20, 2026
Result: 
- Order created for Friday
- Calendar on Monday, March 24 shows YELLOW → "Done (Prebook)"
- Indicates order was placed in advance
```

### Scenario 3: Late Order
```
Customer: Fresh Foods Market
Order Day: Tuesday
Action: Place order on Thursday, March 25, 2026
Result: Calendar shows YELLOW on Tuesday, March 26 (next Tuesday)
```

## Customer Directory

| Customer ID | Name | Store | Order Day | Account |
|---|---|---|---|---|
| MON-1 | John Smith | Quick Mart Downtown | Monday | ACC001 |
| MON-2 | Sarah Johnson | Super Save Market | Monday | ACC002 |
| MON-3 | Mike Williams | City Grocery | Monday | ACC003 |
| MON-4 | Lisa Anderson | Metro Provisions | Monday | ACC009 |
| TUE-1 | Emily Davis | Fresh Foods Market | Tuesday | ACC004 |
| TUE-2 | David Brown | Corner Store | Tuesday | ACC005 |
| TUE-3 | Robert Taylor | Budget Mart | Tuesday | ACC010 |
| WED-1 | Jennifer White | Prime Market | Wednesday | ACC006 |
| WED-2 | Patricia Green | Green Valley Market | Wednesday | ACC011 |
| WED-3 | Mark Thompson | Downtown Depot | Wednesday | ACC012 |
| WED-4 | Nancy Wilson | Family Food Store | Wednesday | ACC013 |
| THU-1 | George Martinez | Sunrise Grocers | Thursday | ACC014 |
| THU-2 | Linda Garcia | Quick Stop Market | Thursday | ACC015 |
| THU-3 | Charles Moore | Village Market | Thursday | ACC016 |
| FRI-1 | Barbara Clark | Express Mart | Friday | ACC017 |
| FRI-2 | Steven Lewis | Community Food Hub | Friday | ACC018 |

## Features

✅ **Real-time Calendar Updates** - Order placement immediately reflects on the calendar
✅ **Color-Coded Status** - Visual indicators (Green/Yellow) for quick order status recognition
✅ **Customer Profiles** - Access detailed customer information and credit details
✅ **Order Tracking** - View all pending and confirmed orders
✅ **Pre-booking** - Plan ahead with advanced order placement
✅ **Flexible Products** - Add custom products or select from standard inventory

## Tips & Best Practices

1. **Plan Ahead**: Use the pre-booking feature (YELLOW) to secure orders before the actual order day
2. **Regular Orders**: Place orders on the customer's scheduled day (GREEN) for consistent service
3. **Customer Communication**: The system shows clear indicators for your admin dashboard
4. **Batch Processing**: Group orders by day to optimize delivery routes
5. **Historical Tracking**: Confirmed orders remain visible for audit and analysis

---

**Current Date**: March 24, 2026 (Monday)
**System Time**: Real-time synchronized
