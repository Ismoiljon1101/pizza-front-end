# AGENTS.md - Pizza House React Frontend

## Project Overview

**Pizza House React** is a full-featured restaurant ordering application built with React, TypeScript, Redux Toolkit, and Material-UI. The application provides a comprehensive e-commerce experience for ordering food, managing user accounts, and tracking orders.

## Tech Stack

### Core Technologies
- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 4.1.5** - Type-safe development
- **Redux Toolkit** - State management with Redux best practices
- **React Router DOM 5.1.9** - Client-side routing

### UI Framework & Styling
- **Material-UI (@mui/material 6.1.2)** - Primary component library
- **Material-UI v4 (@material-ui/core 4.12.4)** - Legacy components
- **Emotion (@emotion/react, @emotion/styled)** - CSS-in-JS styling
- **Styled Components 5.3.5** - Additional styling solution
- **Swiper 8.3.1** - Touch slider/carousel functionality

### State Management & Data Flow
- **Redux Toolkit** - Centralized state management
- **Redux Logger 3.0.6** - Development debugging
- **React Redux 7.2.8** - React bindings for Redux

### HTTP & API Integration
- **Axios 0.27.2** - HTTP client for API requests
- **Universal Cookie 4.0.4** - Cookie management for authentication

### Utilities
- **Moment 2.29.4** - Date/time manipulation
- **SweetAlert2 11.4.23** - Beautiful alert modals

## Project Structure

### Application Architecture

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication modal
│   │   ├── divider/        # Divider component
│   │   ├── footer/         # Footer component
│   │   └── headers/        # Navigation components
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── MaterialTheme/      # MUI theme configuration
│   ├── screens/            # Page components
│   │   ├── homePage/       # Home page with sections
│   │   ├── productsPage/   # Product browsing
│   │   ├── ordersPage/     # Order management
│   │   ├── userPage/       # User profile
│   │   └── helpPage/       # Help & support
│   ├── services/           # API service classes
│   └── store.ts            # Redux store configuration
├── css/                    # CSS stylesheets
├── lib/
│   ├── config.ts           # Configuration & constants
│   ├── data/               # Static data
│   ├── enums/              # TypeScript enums
│   ├── types/              # TypeScript type definitions
│   └── sweetAlert.ts       # Alert utilities
└── index.tsx               # Application entry point
```

## Key Features & Components

### 1. Navigation System
- **HomeNavbar** - Navigation bar for home page
- **OtherNavbar** - Navigation bar for other pages
- **Basket** - Shopping cart component integrated into navbar
- Dynamic navigation based on current route
- User authentication status displayed

### 2. Home Page Sections
- **Advertisement** - Promotional content with video ads
- **Statistics** - Key metrics and statistics display
- **PopularDishes** - Featured popular menu items
- **NewDishes** - Newly added menu items
- **ActiveUsers** - Display of top/active users
- **Events** - Upcoming events and promotions

### 3. Products Page
- **Products** - Main product listing with filters
- **ChosenProduct** - Detailed product view modal
- Product filtering by collection (Seafood, Sweets, Donar, Gurme, etc.)
- Search functionality
- Add to cart functionality
- Product size and volume options

### 4. Orders Management
- **ProcessOrders** - Active/processing orders
- **PausedOrders** - Paused/pending orders
- **FinishedOrders** - Completed order history
- Order status tracking (Process, Pause, Finished, Deleted)
- Order item management

### 5. User Profile
- **Settings** - User account settings and profile management
- Member information display
- Profile image upload
- Address and contact information
- Member points system

### 6. Help & Support
- FAQ section
- Terms and conditions
- Subscription plans information
- Contact support

## State Management

### Redux Slices

#### Home Page Slice
- Manages home page data (popular dishes, new dishes, top users)
- Handles loading states for different sections

#### Products Page Slice
- Product list state
- Chosen/selected product state
- Filter and search parameters

#### Orders Page Slice
- Process orders state
- Paused orders state
- Finished orders state

### Custom Hooks

#### useBasket
- Shopping cart functionality
- `onAdd` - Add item to cart
- `onRemove` - Remove one quantity from cart
- `onDelete` - Remove item completely
- `onDeleteAll` - Clear entire cart
- Manages cart items state

#### useGlobals
- Global application state
- User authentication state
- Theme/settings management

## Services (API Integration)

### MemberService
- User authentication (login/signup/logout)
- Get top users
- Update member profile
- Member status management

### ProductService
- Fetch products with filters
- Get product details
- Product search
- Handle product collections

### OrderService
- Create new orders
- Update order status
- Get orders by status
- Process order items

## Type System

### Core Types

#### Member Types
```typescript
- Member: User account information
- MemberInput: Data for creating member
- LoginInput: Login credentials
- MemberUpdateInput: Update member data
- MemberType: USER | RESTAURANT
- MemberStatus: ACTIVE | BLOCK | DELETE
```

#### Product Types
```typescript
- Product: Product information
- ProductInquiry: Search/filter parameters
- ProductCollection: DISH | SALAD | DESSERT | DRINK | etc.
- ProductSize: SMALL | NORMAL | LARGE | SET
- ProductVolume: Number in ml/g
- ProductStatus: PAUSE | PROCESS | DELETE
```

#### Order Types
```typescript
- Order: Order information with items
- OrderItem: Individual order item
- OrderItemInput: Data for creating order item
- OrderInquiry: Filter parameters
- OrderUpdateInput: Update order data
- OrderStatus: PAUSE | PROCESS | FINISH | DELETE
```

## Styling Approach

The project uses a **hybrid styling approach**:

1. **Material-UI Theme** - Custom theme configuration in `MaterialTheme/`
   - Typography settings
   - Shadow configurations
   - Styled components setup

2. **CSS Modules** - Organized by feature in `src/css/`
   - `App.css` - Global app styles
   - `navbar.css` - Navigation styles
   - `footer.css` - Footer styles
   - `home.css` - Home page styles (524 lines)
   - `products.css` - Products page styles (860 lines)
   - `order.css` - Orders page styles
   - `userPage.css` - User page styles
   - `help.css` - Help page styles

3. **Styled Components** - For component-specific styling

## Assets & Media

### Icons
- SVG icons for various features (shopping cart, user, location, etc.)
- Payment method icons (Visa, MasterCard, PayPal, Western Union)
- Social media icons (Facebook, Instagram, Twitter, YouTube)

### Images
- Product images (WebP format for optimization)
- Restaurant logos and branding
- User profile images
- Marketing banners

### Video
- `burak-ads.mp4` - Promotional video content

## Configuration

### Environment Variables
- `REACT_APP_API_URL` - Backend API base URL

### Build Configuration
- Production build optimizations
- Code splitting enabled
- Asset optimization (WebP images)

## Development Workflow

### Available Scripts
```bash
npm start       # Development server (localhost:3000)
npm test        # Run tests
npm run build   # Production build
npm run eject   # Eject from Create React App
```

### Testing
- Jest testing framework
- React Testing Library
- User event simulation testing

## Recent Updates (February 10, 2025)

### Initial Project Setup
- **Complete project initialization** with React + TypeScript + Redux
- **Full application architecture** implemented with component-based structure
- **State management** configured with Redux Toolkit and slices
- **Authentication system** with login/signup modals
- **Shopping cart functionality** with add/remove/delete operations
- **Order management** system with multiple status views
- **Product catalog** with filtering and search
- **User profile** management and settings
- **API integration** with service layer architecture
- **Material-UI theming** and custom styling
- **Production build** generated and optimized

### Key Components Implemented
- Navigation system (Home & Other navbar variants)
- Shopping basket with full cart operations
- Authentication modal system
- Footer with social links
- Home page sections (Statistics, Popular/New Dishes, Events, Active Users)
- Products browsing with filters
- Order tracking (Process/Paused/Finished)
- User settings and profile page
- Help page with FAQ

### Technical Infrastructure
- TypeScript type definitions for all entities
- Redux slices for state management
- Custom hooks (useBasket, useGlobals)
- Service classes for API communication
- SweetAlert2 integration for notifications
- Moment.js for date handling
- Universal Cookie for auth persistence
- Axios interceptors for HTTP requests

### Asset Organization
- SVG icons collection
- WebP image optimization
- Video content integration
- Payment provider icons
- Social media icons

---

## Notes for AI Agents

### Working with this Project

1. **State Management**: Always check the Redux slices in `src/app/screens/*/slice.ts` before modifying component state
2. **Type Safety**: Use existing types from `src/lib/types/` - don't create duplicate types
3. **API Calls**: Always use service classes in `src/app/services/` - never make direct axios calls from components
4. **Styling**: Match existing CSS patterns - check relevant CSS file before adding new styles
5. **Navigation**: Route changes should be tested with both HomeNavbar and OtherNavbar
6. **Authentication**: Always verify user auth state before allowing protected actions
7. **Shopping Cart**: Use the `useBasket` hook - don't create separate cart logic
8. **Alerts**: Use `sweetAlert.ts` utilities for all user notifications

### Common Tasks

- **Adding a new product collection**: Update `ProductCollection` enum, add filter in Products component, update CSS
- **New order status**: Update `OrderStatus` enum, add corresponding order view component
- **User profile field**: Update `Member` type, MemberService, and Settings component
- **New page**: Create screen in `src/app/screens/`, add route in App.tsx, add navigation link

### Code Patterns

- Components use functional React with hooks
- Redux state accessed via custom selectors
- Service methods are async and return typed data
- Error handling uses try-catch with sweetAlert
- Forms validated before submission
- Images lazy-loaded where possible

---

**Last Updated**: February 10, 2025  
**Project Status**: Active Development  
**Version**: 0.1.0
