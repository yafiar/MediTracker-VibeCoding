# 🎨 MediTracker - Visual Design Guide

## 🎨 Design System

### Color Palette

#### Primary Colors
```css
/* Main Gradient */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--primary-purple: #667eea;
--primary-dark: #764ba2;

/* Backgrounds */
--bg-light: #f5f7fa;
--bg-white: #ffffff;
--bg-gray: #f8f9fa;

/* Text */
--text-dark: #333333;
--text-medium: #666666;
--text-light: #999999;

/* Borders */
--border-light: #e0e0e0;
--border-primary: #667eea;

/* Status Colors */
--success: #4caf50;
--success-light: #e8f5e9;
--success-dark: #2e7d32;

--danger: #ff4757;
--danger-light: #ffebee;
--danger-dark: #ee2e3c;

--warning: #ffa726;
--warning-light: #fff3e0;

--info: #2196f3;
--info-light: #e3f2fd;
```

---

### Typography

```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 
             'Droid Sans', 'Helvetica Neue', sans-serif;

/* Font Sizes */
--font-xs: 12px;      /* Small labels, badges */
--font-sm: 14px;      /* Body text, inputs */
--font-base: 16px;    /* Default buttons */
--font-lg: 18px;      /* Subheadings */
--font-xl: 20px;      /* Card titles */
--font-2xl: 24px;     /* Page titles */
--font-3xl: 28px;     /* Main headings */
--font-4xl: 32px;     /* Dashboard titles */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

### Spacing

```css
/* Padding & Margin Scale */
--space-xs: 5px;
--space-sm: 10px;
--space-md: 15px;
--space-lg: 20px;
--space-xl: 30px;
--space-2xl: 40px;
--space-3xl: 60px;
```

---

### Border Radius

```css
--radius-sm: 8px;     /* Small buttons, badges */
--radius-md: 10px;    /* Inputs, cards */
--radius-lg: 15px;    /* Large cards */
--radius-xl: 20px;    /* Main containers */
--radius-full: 50%;   /* Circular elements */
--radius-pill: 20px;  /* Pill-shaped badges */
```

---

### Shadows

```css
/* Elevation */
--shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.1);    /* Cards */
--shadow-md: 0 4px 15px rgba(0, 0, 0, 0.1);    /* Medicine cards */
--shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);  /* Hover states */
--shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.3);   /* Auth card */

/* Button Shadows */
--shadow-primary: 0 10px 25px rgba(102, 126, 234, 0.4);
```

---

## 📱 Screen Designs

### 1. Login Page

```
┌─────────────────────────────────────────┐
│                                         │
│           [Purple Gradient BG]          │
│                                         │
│        ┌──────────────────┐            │
│        │                  │            │
│        │       💊         │  [Bounce   │
│        │   MediTracker    │   Animation]│
│        │                  │            │
│        │  Track your      │            │
│        │  medicine...     │            │
│        │                  │            │
│        │  [Email Input]   │            │
│        │  [Password ]     │            │
│        │                  │            │
│        │  [Login Button]  │            │
│        │                  │            │
│        │  Don't have...?  │            │
│        │  [Register]      │            │
│        │                  │            │
│        └──────────────────┘            │
│                                         │
└─────────────────────────────────────────┘
```

**Features:**
- Centered white card dengan shadow
- Gradient background (purple)
- Animated bouncing emoji logo
- Clean form inputs dengan focus states
- Error message below form
- Link to register page

---

### 2. Register Page

```
┌─────────────────────────────────────────┐
│                                         │
│           [Purple Gradient BG]          │
│                                         │
│        ┌──────────────────┐            │
│        │       💊         │            │
│        │ Create Account   │            │
│        │                  │            │
│        │  [Name Input]    │            │
│        │  [Email Input]   │            │
│        │  [Password]      │            │
│        │  [Confirm Pass]  │            │
│        │                  │            │
│        │ [Register Btn]   │            │
│        │                  │            │
│        │  Already have..? │            │
│        │  [Login here]    │            │
│        └──────────────────┘            │
│                                         │
└─────────────────────────────────────────┘
```

---

### 3. Dashboard

```
┌─────────────────────────────────────────┐
│  💊 MediTracker          [Logout]      │  ← Navbar
├─────────────────────────────────────────┤
│                                         │
│  Your Medicine Dashboard  [+Add New]   │
│                                         │
│  [My Medicines (5)] [Today's Intake]   │  ← Tabs
│  ────────────────                       │
│                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐   │
│  │ [IMG]  │  │ [IMG]  │  │ [IMG]  │   │
│  │        │  │        │  │        │   │
│  │Paracet │  │Vitamin │  │Aspirin │   │
│  │500mg   │  │1 tab   │  │100mg   │   │
│  │        │  │        │  │        │   │
│  │For...  │  │Daily.. │  │Pain... │   │
│  │        │  │        │  │        │   │
│  │[✏️][🕐][🗑️]│  │[✏️][🕐][🗑️]│  │[✏️][🕐][🗑️]│   │
│  └────────┘  └────────┘  └────────┘   │
│                                         │
│  ┌────────┐  ┌────────┐               │
│  │ [IMG]  │  │ [IMG]  │               │
│  │...     │  │...     │               │
│  └────────┘  └────────┘               │
│                                         │
└─────────────────────────────────────────┘
```

**Features:**
- Sticky navbar dengan logo & logout
- Tab navigation
- Responsive grid (auto-fill, minmax 300px)
- Medicine cards dengan:
  - Image (200px height)
  - Name & dosage
  - Description
  - Frequency badge
  - Action buttons (Edit, Schedule, Delete)
- Hover effects (lift + shadow)

---

### 4. Today's Intake Tab

```
┌─────────────────────────────────────────┐
│  💊 MediTracker          [Logout]      │
├─────────────────────────────────────────┤
│                                         │
│  Your Medicine Dashboard  [+Add New]   │
│                                         │
│  [My Medicines] [Today's Intake (3)]   │
│                  ───────────────        │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ ✅  Paracetamol              9:00 │ │
│  │     Taken at: 09:15 AM            │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ ✅  Vitamin C               12:00 │ │
│  │     Taken at: 12:05 PM            │ │
│  │     Notes: After lunch            │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ ✅  Aspirin                 14:00 │ │
│  │     Taken at: 14:02 PM            │ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

---

### 5. Add/Edit Medicine Form

```
┌─────────────────────────────────────────┐
│                                         │
│  [← Back]                              │
│                                         │
│  Add New Medicine                      │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │         📷                        │ │
│  │  Click to upload medicine image   │ │
│  │  PNG, JPG up to 5MB              │ │
│  │                                   │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Medicine Name *                       │
│  [________________]                    │
│                                         │
│  Dosage *                              │
│  [________________]                    │
│                                         │
│  Frequency (times per day)             │
│  [________________]                    │
│                                         │
│  Description                           │
│  [____________________]                │
│  [                    ]                │
│  [____________________]                │
│                                         │
│  [Cancel]  [Add Medicine]             │
│                                         │
└─────────────────────────────────────────┘
```

**Features:**
- Upload area dengan dashed border
- Image preview after selection
- Form validation
- Button group (Cancel + Submit)
- Loading state pada button

---

### 6. Schedule Management

```
┌─────────────────────────────────────────┐
│                                         │
│  [← Back to Dashboard]                 │
│                                         │
│  Schedule for Paracetamol              │
│  500mg                                  │
│                                         │
│                    [+ Add New Schedule]│
│                                         │
│  ┌─────────────────────────────────┐  │
│  │ Time: [09:00]                    │  │
│  │                                  │  │
│  │ Days of the week:                │  │
│  │ [Mon] [Tue] [Wed] [Thu] [Fri]   │  │
│  │ [Sat] [Sun]                      │  │
│  │        ^active                   │  │
│  │                                  │  │
│  │ [Add Schedule]                   │  │
│  └─────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ ⏰  09:00 AM                      │ │
│  │     Mon Tue Wed Thu Fri           │ │
│  │              [✓ Taken] [Delete]  │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ ⏰  14:00 PM                      │ │
│  │     Daily                         │ │
│  │              [✓ Taken] [Delete]  │ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

**Features:**
- Medicine info header
- Collapsible add form
- Time picker
- Day selector buttons (toggle state)
- Schedule list dengan:
  - Time display
  - Day badges
  - Action buttons
- Empty state ketika no schedules

---

## 🎭 Component States

### Button States

```css
/* Primary Button */
Normal:   [Purple Gradient] White Text
Hover:    [Elevated] + [Stronger Shadow]
Active:   [Pressed Down Effect]
Disabled: [Opacity 0.6] + [No Pointer]
Loading:  [Disabled] + "Loading..." text

/* Icon Button */
Normal:   [Light BG] Emoji Icon
Hover:    [Darker BG] + [Scale 1.05]
Active:   [Pressed Effect]
```

---

### Input States

```css
Normal:   [White BG] [Gray Border]
Focus:    [Primary Border] + [Blue Shadow Ring]
Error:    [Red Border] + Error message below
Disabled: [Gray BG] + [No Pointer]
```

---

### Card States

```css
Normal:   [White BG] [Small Shadow]
Hover:    [translateY(-5px)] + [Larger Shadow]
Active:   [Slight scale down]
```

---

## 🎬 Animations

### Page Load
```
- fadeInUp: Content slides up + fade in (0.5s ease)
- Stagger effect: Cards animate in sequence
```

### Interactions
```
- Button hover: translateY(-2px) + shadow (0.3s)
- Card hover: translateY(-5px) + shadow (0.3s)
- Day toggle: background change (0.3s)
- Tab switch: Instant content swap
```

### Logo
```
- Continuous bounce: translateY(-10px) 2s infinite
```

### Loading
```
- Spinner: 360deg rotation 1s linear infinite
```

---

## 📐 Layout Grid

### Desktop (1200px container)
```
3-column grid for medicine cards
Gap: 20px
Card width: ~380px
```

### Tablet (768px - 1024px)
```
2-column grid
Gap: 20px
Card width: ~48%
```

### Mobile (< 768px)
```
1-column stack
Card width: 100%
Padding: 20px sides
```

---

## 🎨 Visual Hierarchy

### Primary Actions
- Large gradient buttons
- High contrast
- Center alignment

### Secondary Actions
- Outline or light background
- Smaller size
- Side alignment

### Destructive Actions
- Red color
- Confirmation required
- Icon + text

---

## ✨ Micro-interactions

1. **Form Submit:**
   - Button shows "Loading..."
   - Disable button
   - Show spinner (optional)
   - Success → Redirect
   - Error → Show message

2. **Image Upload:**
   - Hover → Border color change
   - Drop → Visual feedback
   - Preview → Instant display

3. **Delete Action:**
   - Confirm dialog
   - Success → Fade out card
   - List re-renders

4. **Tab Switch:**
   - Active tab underline
   - Content instant swap
   - Smooth transition

---

## 🖼️ Empty States

### No Medicines
```
📦 Icon (80px, opacity 0.5)
"No medicines yet"
"Start by adding your first medicine"
[Add Medicine Button]
```

### No Schedules
```
🕐 Icon (80px, opacity 0.5)
"No schedules yet"
"Add your first schedule to start tracking"
```

### No Intakes
```
✅ Icon (80px, opacity 0.5)
"No intakes recorded today"
"Start tracking when you take your medicines"
```

---

## 📱 Mobile Optimizations

- Min button height: 44px (touch target)
- Stack form buttons vertically
- Full-width cards
- Larger text for readability
- Adequate spacing between elements
- Sticky navbar
- Bottom action buttons

---

## ♿ Accessibility

- Semantic HTML (header, nav, main, section)
- Alt text for images
- Form labels properly associated
- Focus indicators
- Keyboard navigation
- Sufficient color contrast
- Touch targets min 44x44px

---

## 🎯 Key Visual Elements

### Logo
- 💊 Emoji (60px on auth, 32px on nav)
- Bouncing animation
- Brand identity

### Cards
- White background
- Rounded corners (15px)
- Subtle shadow
- Hover elevation
- Image at top (200px height)
- Content padding (20px)

### Forms
- Clean inputs with focus states
- Validation messages
- Clear labels
- Helpful placeholders
- Error states in red

### Badges
- Frequency: Green pill shape
- Days: White with purple border
- Small text (12px)
- Rounded corners

---

## 🌈 Theme Colors Usage

**Purple Gradient:** Primary actions, brand elements, headers
**White:** Cards, forms, content areas
**Gray BG:** Secondary areas, disabled states
**Green:** Success, frequency badges, taken status
**Red:** Danger, delete actions, errors
**Blue:** Info, links

---

## 📏 Spacing Examples

```
Card padding: 20px
Form group gap: 25px
Grid gap: 20px
Section margin: 30px
Page padding: 30px (desktop), 20px (mobile)
Button padding: 12px 24px
Input padding: 12px 15px
```

---

**Design Philosophy:**
- Clean and minimal
- Modern and friendly
- Easy to use
- Visually appealing
- Consistent patterns
- Responsive first

---

**Color Psychology:**
- Purple: Trust, medical, calm
- Green: Health, success
- Red: Alert, careful
- White: Clean, medical

---

Last Updated: November 23, 2025
