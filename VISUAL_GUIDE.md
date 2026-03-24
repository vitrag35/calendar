# Visual Guide - Order Management System

## System Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    WHOLESALE ORDER SYSTEM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  📊 SALES CALENDAR (Visual Order Status Tracker)         │   │
│  │  ├─ Shows months at a glance                             │   │
│  │  ├─ Color-coded: 🟢 GREEN 🟡 YELLOW ⚪ GRAY            │   │
│  │  ├─ Click dates for details                             │   │
│  │  └─ Status counts per day                               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                            ↕                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  📋 ORDERS SECTION (Place & Manage Orders)              │   │
│  │  ├─ Place New Order button                              │   │
│  │  ├─ Pending Orders list                                 │   │
│  │  ├─ Confirmed Orders list                               │   │
│  │  └─ Order details & actions                             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  Both sections stay in sync - place order, see calendar update!  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Order Placement Flow

```
                    PLACE NEW ORDER
                          ↓
                  ┌───────────────┐
                  │ SELECT CUSTOMER
                  │ (16 options)   │
                  └────────┬────────┘
                           ↓
              ┌────────────────────────┐
              │ CHOOSE ORDER DATE      │
              │ (Any date works)       │
              └────────────┬───────────┘
                           ↓
        ┌──────────────────┴──────────────────┐
        │ SYSTEM CHECKS:                       │
        │ Is this customer's order day?        │
        ↓                                      ↓
   YES (On-Time)                         NO (Early/Late)
        │                                      │
        ↓                                      ↓
   ✓ On Schedule              ⚠ Will show as PREBOOK
        │                                      │
        └──────────────┬───────────────────────┘
                       ↓
              ┌────────────────────┐
              │ ADD ITEMS          │
              │ & CALCULATE TOTAL  │
              └────────────┬───────┘
                           ↓
              ┌────────────────────┐
              │ PLACE ORDER        │
              └────────────┬───────┘
                           ↓
        ┌──────────────────┴──────────────────┐
        │                                      │
        ↓                                      ↓
   🟢 GREEN ON CALENDAR          🟡 YELLOW ON CALENDAR
   (Order on-time)                (Order pre-booked)
        │                                      │
        └──────────────┬───────────────────────┘
                       ↓
                ✅ COMPLETE & TRACKED
```

## Calendar Color Status Legend

```
┌──────────────────────────────────────────────────────────────┐
│ MARCH 2026                                                    │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  Example day with multiple statuses:                          │
│                                                                │
│  ┌─────────────────────────────────────────┐                │
│  │     MONDAY, MARCH 24                    │                │
│  │  Mon                                     │                │
│  │  23                                      │                │
│  │  ┌─────────────────────────┐             │                │
│  │  │ 🟢 1 on-time  (GREEN)  │             │                │
│  │  │ 🟡 2 prebook  (YELLOW) │             │                │
│  │  │ ⚪ 1 pending   (GRAY)   │             │                │
│  │  └─────────────────────────┘             │                │
│  │  [View (4 customers)]                    │                │
│  └─────────────────────────────────────────┘                │
│                                                                │
│  Color Meanings:                                              │
│  • GREEN  = Order placed on customer's scheduled day         │
│  • YELLOW = Order placed early (pre-booked)                 │
│  • GRAY   = No order placed yet (pending)                   │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

## Order Status Examples

### Example 1: ON-TIME ORDER (GREEN)

```
Customer: Quick Mart Downtown
Order Day: EVERY MONDAY

Date: Monday, March 24, 2026
Place Order: YES
Result: 🟢 GREEN "Done (On-time)"

Why: Order placed on the customer's regular order day
```

### Example 2: PRE-BOOKED ORDER (YELLOW)

```
Customer: Super Save Market  
Order Day: EVERY MONDAY

Date: Friday, March 20, 2026
Place Order: YES
Result: 🟡 YELLOW "Done (Prebook)" shows on March 24 (next Monday)

Why: Order placed BEFORE the customer's regular order day
Advanced planning - reduces last-minute rushes
```

### Example 3: PENDING ORDER (GRAY)

```
Customer: Fresh Foods Market
Order Day: EVERY TUESDAY

Result: ⚪ GRAY "Pending"

Why: No order placed yet for this customer on their order day
Still needs to be ordered
```

## Data Flow Diagram

```
                    USER ACTIONS
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ↓                 ↓                 ↓
    PLACE ORDER     NAVIGATE TABS    MANAGE ORDERS
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ↓
                  ┌──────────────┐
                  │  React State │
                  │  (Orders[])  │
                  └──────┬───────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ↓                ↓                ↓
   ORDERS             CALENDAR         DASHBOARD
   SECTION            (Recalculates    (Shows stats)
   (Manages)          status colors)
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ↓
                 DISPLAY UPDATES
              (All tabs see changes)
```

## Customer Order Schedule Grid

```
┌─────────────┬──────────────────────────────────────────────────┐
│ DAY OF WEEK │ CUSTOMERS                                         │
├─────────────┼──────────────────────────────────────────────────┤
│             │                                                   │
│ 🟦 MONDAY   │ Quick Mart Downtown                              │
│             │ Super Save Market                                │
│             │ City Grocery                                     │
│             │ Metro Provisions                                 │
│             │                                                   │
├─────────────┼──────────────────────────────────────────────────┤
│             │                                                   │
│ 🟨 TUESDAY  │ Fresh Foods Market                               │
│             │ Corner Store                                     │
│             │ Budget Mart                                      │
│             │                                                   │
├─────────────┼──────────────────────────────────────────────────┤
│             │                                                   │
│ 🟩 WEDNESDAY│ Prime Market                                     │
│             │ Green Valley Market                              │
│             │ Downtown Depot                                   │
│             │ Family Food Store                                │
│             │                                                   │
├─────────────┼──────────────────────────────────────────────────┤
│             │                                                   │
│ 🟧 THURSDAY │ Sunrise Grocers                                  │
│             │ Quick Stop Market                                │
│             │ Village Market                                   │
│             │                                                   │
├─────────────┼──────────────────────────────────────────────────┤
│             │                                                   │
│ 🟥 FRIDAY   │ Express Mart                                     │
│             │ Community Food Hub                               │
│             │                                                   │
└─────────────┴──────────────────────────────────────────────────┘
```

## UI Navigation Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    MAIN APP                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  SIDEBAR (Left Navigation)                                       │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ 📊 Dashboard          ← Overview & Quick Start          │    │
│  │ 📋 Orders           ← Place & Manage Orders            │    │
│  │ 📈 Order History    ← Historical Tracking             │    │
│  │ 🗓️  Sales Calendar   ← View Status Colors             │    │
│  │ 👤 Profile          ← User Settings                    │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  HEADER (Top)                                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ 🍔 Menu  Title          Sales Dashboard | Rep Info  👤 │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  CONTENT AREA (Main)                                            │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  [Different per Tab - Dashboard/Orders/Calendar]      │    │
│  │                                                        │    │
│  │  Example - ORDERS TAB:                                │    │
│  │  ┌──────────────────────────────────────────────────┐│    │
│  │  │ Orders Management                                 ││    │
│  │  │ [+ Place New Order]                              ││    │
│  │  │                                                  ││    │
│  │  │ Pending Orders (2)                              ││    │
│  │  │ ┌──────────────────────────────────────────────┐││    │
│  │  │ │ Order | Customer | Date | Total | Actions   │││    │
│  │  │ │ ORD-1 | John... | 3/24 | $95   | [✓][🗑️]   │││    │
│  │  │ └──────────────────────────────────────────────┘││    │
│  │  │                                                  ││    │
│  │  │ Confirmed Orders (2)                            ││    │
│  │  │ [Similar Table]                                 ││    │
│  │  └──────────────────────────────────────────────────┘│    │
│  │                                                        │    │
│  │  Example - CALENDAR TAB:                              │    │
│  │  ┌──────────────────────────────────────────────────┐│    │
│  │  │ Sales Calendar                                    ││    │
│  │  │ [Today] [Back] [Next]                            ││    │
│  │  │ Legend: 🟢 Green 🟡 Yellow ⚪ Gray               ││    │
│  │  │                                                  ││    │
│  │  │  Sun Mon Tue Wed Thu Fri Sat                     ││    │
│  │  │       1   2   3   4   5   6                      ││    │
│  │  │   7   8   9  10  11  12  13                      ││    │
│  │  │  14  15  16  17  18 🟢19  20 🟡21  ← Today     ││    │
│  │  │  22 🟢23 🟡24  25 🟡26  27  28                  ││    │
│  │  │  29  30  31                                      ││    │
│  │  └──────────────────────────────────────────────────┘│    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  FOOTER                                                          │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ [Toast Notifications appear here]                     │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Modal Flow - Place Order

```
[ORDERS TAB]
    ↓
[+ Place New Order]
    ↓
┌─────────────────────────────────────────┐
│  PLACE ORDER MODAL                      │
├─────────────────────────────────────────┤
│                                         │
│ 1. SELECT CUSTOMER                      │
│    [▼ Choose Customer...]               │
│    Shows: Name | Store | Order Day      │
│                                         │
│ 2. CUSTOMER DETAILS (Auto-fill)        │
│    Name: John Smith                    │
│    Account: ACC001                     │
│    Store: Quick Mart Downtown          │
│    Order Day: Monday                   │
│                                         │
│ 3. CHOOSE DATE                          │
│    [📅 Date Picker] ← Friday Mar 20?   │
│    ⚠ Early/Late - will be PREBOOK     │
│                                         │
│ 4. ADD ITEMS                            │
│    [Product ▼] [Qty] [Price] [+ Add]  │
│    ├─ Milk (1L) 20 $2.50               │
│    ├─ Bread 15 $3.00                   │
│    └─ [Remove] [Remove]                │
│                                         │
│ 5. TOTAL                                │
│    ORDER TOTAL: $95.00                 │
│                                         │
│ [Cancel] [Place Order]                  │
│                                         │
└─────────────────────────────────────────┘
    ↓
[Place Order]
    ↓
✅ Toast: "Order placed!"
    ↓
Modal Closes
    ↓
Calendar Updates with Colors
```

## Color Psychology

```
🟢 GREEN
├─ Meaning: Go, Approved, On-Time
├─ Emotion: Professional, Punctual
├─ Use: Orders on customer's regular day
└─ Message: "Everything is on schedule"

🟡 YELLOW  
├─ Meaning: Caution, Advance, Warning
├─ Emotion: Proactive, Forward-Thinking
├─ Use: Orders placed before regular day
└─ Message: "Order was pre-booked in advance"

⚪ GRAY
├─ Meaning: Neutral, Pending, Inactive
├─ Emotion: Waiting, Not Started
├─ Use: No order yet for this day
└─ Message: "This order still needs to be placed"
```

## Sample Scenario Timeline

```
Friday, March 20, 2026
└─ Admin places order for Sarah Johnson (normally Monday)
   └─ Order Date: Friday, March 20
      └─ System: "This is EARLY - pre-book for Monday"

Monday, March 24, 2026
└─ Calendar shows:
   ├─ 🟢 GREEN for John Smith (Monday order on Monday)
   ├─ 🟡 YELLOW for Sarah Johnson (Friday order for Monday)
   ├─ ⚪ GRAY for any customers without orders
   └─ [View (n) customers] button to see details

Orders Tab
└─ Pending Orders:
   ├─ ORD-001 | John Smith | 3/24 | $95.00
   └─ ORD-002 | Sarah Johnson | 3/20 | $195.00

Click Date on Calendar
└─ Shows Customer List:
   ├─ John Smith | Done (On-time) 🟢
   ├─ Sarah Johnson | Done (Prebook) 🟡
   └─ [Other customers with status]
```

## Responsive Design Layout

```
DESKTOP VIEW (Wide)
┌────────────────────────────────────────────┐
│ ☰  Title              Dashboard  👤        │
├──────┬──────────────────────────────────────┤
│Sidebar│ Content Area                       │
│ Nav  │ (Full Width)                        │
│      │                                      │
│  📋 │ [Grid of Info/Calendar/Orders]     │
│  📊 │                                      │
│  📈 │                                      │
│  🗓️  │                                      │
│  👤 │                                      │
└──────┴──────────────────────────────────────┘

TABLET VIEW (Medium)
┌─────────────────────────────────────────┐
│ ☰ Title                              👤 │
├─────────────────────────────────────────┤
│ Content Area (Responsive Grid)         │
│ [Content stacks and reflows]           │
└─────────────────────────────────────────┘

MOBILE VIEW (Narrow)
┌──────────────────────┐
│ ☰ Title         👤   │
├──────────────────────┤
│ Content Area         │
│ (Single Column)      │
│ [Buttons stack]      │
│ [Tables scroll]      │
└──────────────────────┘
```

## State Flow

```
Initial Load
    ↓
Sample Orders Loaded into State
├─ ORD-2026-001: John Smith
├─ ORD-2026-002: Sarah Johnson
├─ ORD-2026-003: Emily Davis
└─ ORD-2026-004: Mike Williams
    ↓
Calendar Calculates Colors
├─ Green: On-time orders
├─ Yellow: Pre-booked orders
└─ Gray: Pending
    ↓
UI Updates
├─ Calendar displays colors
├─ Orders tab lists orders
└─ Dashboard shows stats
    ↓
User Places New Order
    ↓
New Order Added to State
    ↓
Calendar Recalculates (Real-time)
    ↓
All Tabs Update Instantly
    ↓
Toast Shows Confirmation
    ↓
System Ready for Next Order
```

---

This visual guide helps understand the system structure and flow at a glance!
