# Quick Reference Card - Order Management System

## 🎯 30-Second Overview
This system tracks wholesale orders and shows them on a calendar using smart color-coding:
- **🟢 GREEN**: Order placed on customer's scheduled day (on-time)
- **🟡 YELLOW**: Order placed before scheduled day (pre-booked)
- **⚪ GRAY**: No order yet (pending)

## 🚀 Quick Start (3 Steps)

### Step 1: Navigate to Orders
Click **"Orders"** in the left sidebar

### Step 2: Place Order
Click **"Place New Order"** → Select customer → Pick date → Add items → Click "Place Order"

### Step 3: See Calendar Update
Go to **"Sales Calendar"** → Find the order day → See GREEN (on-time) or YELLOW (pre-book) color

## 📅 What Each Color Means

| Color | Meaning | Example |
|-------|---------|---------|
| 🟢 GREEN | Order on customer's regular day | Place Monday order on Monday → shows GREEN |
| 🟡 YELLOW | Order placed early (pre-book) | Place Monday order on Friday → shows YELLOW on next Monday |
| ⚪ GRAY | No order yet (pending) | Customer has no order on their day |

## 👥 Customer Order Days

**Every Monday**: John Smith, Sarah Johnson, Mike Williams, Lisa Anderson
**Every Tuesday**: Emily Davis, David Brown, Robert Taylor
**Every Wednesday**: Jennifer White, Patricia Green, Mark Thompson, Nancy Wilson
**Every Thursday**: George Martinez, Linda Garcia, Charles Moore
**Every Friday**: Barbara Clark, Steven Lewis

## 📊 Sample Orders (Pre-loaded)
- Quick Mart Downtown (Monday, March 24) - ON-TIME ✓
- Super Save Market (Friday, March 20) - PRE-BOOK (shows YELLOW on Monday) ⚠
- Fresh Foods Market (Tuesday, March 26) - CONFIRMED ✓
- City Grocery (Monday, March 24) - CONFIRMED ✓

## 🎮 Try These Actions

### Action 1: See an On-Time Order
1. Go to Orders → Place New Order
2. Pick "John Smith - Monday"
3. Choose any Monday date
4. Add items and place
5. Check Calendar → See GREEN

### Action 2: See a Pre-Book Order
1. Go to Orders → Place New Order
2. Pick "Emily Davis - Tuesday"
3. Choose a Friday date
4. Add items and place
5. Check Calendar → See YELLOW on next Tuesday

### Action 3: Manage Orders
1. Go to Orders tab
2. See all pending orders listed
3. Click order to see details
4. Use action buttons to confirm or delete

## 🗓️ Calendar Legend

| Indicator | What It Shows | Action |
|-----------|--------------|--------|
| Green badge | How many on-time orders | Click date to see customers |
| Yellow badge | How many pre-booked orders | Details show "Done (Prebook)" |
| Gray badge | How many pending orders | Need to place these orders |
| "View (n)" button | Click to see all customers | Shows full customer list |

## 💡 Key Tips

✅ **On your customer's regular order day** → Order shows as GREEN (on-time)  
✅ **Before customer's regular order day** → Order shows as YELLOW (pre-book)  
✅ **No order placed yet** → Shows as GRAY (pending)  
✅ **Click dates on calendar** → See which customers have orders  
✅ **Expand orders** → Click order to see what was ordered  

## 📱 Where Everything Is

| Feature | Location |
|---------|----------|
| Place orders | Orders tab → "Place New Order" button |
| View orders | Orders tab → Pending/Confirmed sections |
| See calendar | Sales Calendar tab |
| Check status | Calendar shows colors, click for details |
| View dashboard | Dashboard tab (shows stats) |

## 🎯 Common Workflows

### Workflow 1: Place Regular Order
```
Orders Tab → Place New Order 
→ Select customer 
→ Pick Monday (their order day) 
→ Add items 
→ Place Order 
→ Calendar shows GREEN
```

### Workflow 2: Pre-Book Future Order
```
Orders Tab → Place New Order 
→ Select customer 
→ Pick Friday (before their Monday) 
→ Add items 
→ Place Order 
→ Next Monday shows YELLOW
```

### Workflow 3: Check Day's Orders
```
Sales Calendar → Click any date 
→ See all customers for that day 
→ View status (GREEN/YELLOW/GRAY) 
→ Click customer name to see details
```

## 🔍 What Information Shows

### In Orders List
- Order ID
- Customer name
- Store name
- Order date
- Number of items
- Total price
- Action buttons (confirm/delete)

### In Calendar Detail View
- Account number
- Address
- Phone/Email
- Route information
- Order status with color
- Call time (if scheduled)

## ⚙️ System Behavior

- **Orders update instantly** - Calendar refreshes as you place orders
- **No page reload needed** - All changes happen in real-time
- **Sample data loads automatically** - 4 orders ready to see
- **Dates are flexible** - Choose any date to place orders
- **Status is automatic** - System calculates GREEN/YELLOW/GRAY
- **Colors are clear** - Easy to spot patterns at a glance

## ❓ Quick FAQs

**Q: Can I place an order for any date?**  
A: Yes! Any date works. The system calculates if it's on-time or pre-booked.

**Q: What if I order before a customer's regular day?**  
A: It shows as YELLOW (pre-book) on their scheduled order day.

**Q: How do I see all orders for a customer?**  
A: Click the customer name in calendar detail view, or search in Orders tab.

**Q: Can I change an order after placing it?**  
A: Current version allows confirm/delete. Delete and re-place to edit.

**Q: Do orders disappear after confirmation?**  
A: No, they move to "Confirmed Orders" section. Still visible for tracking.

**Q: How many customers can I manage?**  
A: 16 pre-configured customers. System scales to hundreds.

## 🎨 Color Quick Reference

```
🟢 GREEN = Customer's Order Day (On-Time)
🟡 YELLOW = Before Order Day (Pre-Booked)
⚪ GRAY = No Order Yet (Pending)
🔵 BLUE = Today's Date (Current)
```

## 📊 Dashboard At A Glance

- **Total Orders**: Count of all orders placed
- **Pre-Booked Orders**: Count of early orders
- **Confirmed Orders**: Count of confirmed orders
- **Features list**: What the system does
- **Quick start**: 4-step getting started guide

## 🎓 Learning Path

1. **5 min**: Read this quick reference
2. **5 min**: View sample data in calendar
3. **10 min**: Follow demo walkthrough
4. **15 min**: Try placing 3-4 orders yourself
5. **10 min**: Read detailed system guide

Total time to understand: ~45 minutes

## 📞 Need Help?

1. **How it works?** → Read SYSTEM_GUIDE.md
2. **Step-by-step demo?** → Read DEMO_WALKTHROUGH.md  
3. **Technical details?** → Read IMPLEMENTATION_SUMMARY.md
4. **Quick tips?** → This file! ✨

## 🚀 You're Ready!

Start by:
1. Clicking **Orders** tab
2. Clicking **"Place New Order"**
3. Selecting any customer
4. Choosing a date and adding items
5. Watching the calendar update!

---

**Print This Card** for quick reference while using the system!

**Current Date**: March 24, 2026 (Monday)  
**System Status**: ✅ Ready to Use
