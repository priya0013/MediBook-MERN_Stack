# 🏥 Appointment Booking System - MERN Stack

A full-stack appointment booking application for doctors, salons, and service providers. Built with React, Node.js, Express, and MongoDB.

## 📋 Project Overview

This is a **beginner-friendly** project designed to teach MERN stack fundamentals while building a production-ready application.

### Tech Stack

- **Frontend**: React 18 with Hooks & React Router
- **Backend**: Node.js + Express.js (Phase 2)
- **Database**: MongoDB (Phase 2)
- **Authentication**: JWT (Phase 2)
- **Styling**: Pure CSS with responsive design

---

## 🎯 Current Status: PHASE 1 ✅ COMPLETE

### What's Completed in Phase 1:

✅ Complete folder structure  
✅ React components with hooks (useState, useRouter)  
✅ Mock data setup  
✅ Authentication pages (Login, Register)  
✅ User dashboard with service listings  
✅ Booking form with multi-step process  
✅ My Appointments page  
✅ Navigation and Footer  
✅ Complete CSS styling (responsive)  
✅ Protected routes  

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx          # Login with demo credentials
│   │   │   └── Register.jsx       # Registration form with validation
│   │   ├── User/
│   │   │   ├── Dashboard.jsx      # Browse services with search
│   │   │   ├── BookingForm.jsx    # Multi-step booking form
│   │   │   └── MyAppointments.jsx # View all appointments
│   │   ├── Admin/
│   │   │   └── AdminDashboard.jsx # Admin panel (Phase 4)
│   │   ├── Common/
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   └── Footer.jsx         # Footer
│   │   └── styles/
│   │       ├── Auth.css
│   │       ├── Dashboard.css
│   │       ├── BookingForm.css
│   │       ├── MyAppointments.css
│   │       ├── Home.css
│   │       ├── Navbar.css
│   │       ├── Footer.css
│   │       └── Admin.css
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   └── NotFound.jsx
│   ├── mockData.js                # Sample data (will be API in Phase 2)
│   ├── App.jsx                    # Main app with routing
│   ├── App.css
│   ├── index.js
│   └── index.css                  # Global styles
├── public/
│   └── index.html
└── package.json
```

---

## 🚀 How to Run Phase 1

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Installation Steps

1. **Navigate to frontend folder:**
   ```bash
   cd d:\WSA-Intern\frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## 🎓 Key React Concepts Used in Phase 1

### 1. **Functional Components**
```jsx
function Dashboard() {
  // Component code here
}
```
Why: Modern React standard, easier to manage state with hooks.

### 2. **useState Hook** (State Management)
```jsx
const [formData, setFormData] = useState({
  email: '',
  password: ''
});
```
What it does:
- `formData`: Current state value
- `setFormData()`: Function to update state
- When state changes, component re-renders

Used in: All components with user input

### 3. **useNavigate Hook** (Routing)
```jsx
const navigate = useNavigate();
navigate('/dashboard'); // Programmatic navigation
```
When used: Navigate between pages after actions

### 4. **map() Function** (List Rendering)
```jsx
{mockServices.map((service) => (
  <ServiceCard key={service.id} service={service} />
))}
```
Why needed:
- Render lists dynamically
- Always use unique `key` prop
- More efficient than manual loops

### 5. **Conditional Rendering**
```jsx
{token ? (
  <Dashboard />
) : (
  <Login />
)}
```
When needed: Show/hide content based on conditions

### 6. **Props Passing**
```jsx
<ServiceCard 
  service={service}
  onBook={handleBook}
/>
```
Why: Pass data from parent to child components

---

## 🧪 Demo Credentials (Phase 1)

### Regular User
- **Email**: `user@example.com`
- **Password**: `password123`

### Admin User
- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## 📝 React Concepts Explanation

### Understanding useState
```jsx
const [count, setCount] = useState(0);
// count = current value
// setCount = function to update value
// 0 = initial value

setCount(count + 1); // Updates state, triggers re-render
```

### Understanding useNavigate
```jsx
const navigate = useNavigate();
navigate('/dashboard');        // Go to dashboard
navigate(-1);                  // Go back
navigate('/booking', { state: { data } }); // Pass data
```

### Understanding map()
```jsx
const services = [
  { id: 1, name: 'Doctor' },
  { id: 2, name: 'Salon' }
];

services.map((service) => (
  <div key={service.id}>{service.name}</div>
))
// Output: Two divs rendered

// ⚠️ IMPORTANT: Always use unique key!
// Bad: key={index}  - Can cause bugs
// Good: key={service.id} - Each item is uniquely identified
```

---

## 🎯 Features in Phase 1 (Frontend Only)

### User Features
1. ✅ Register new account
2. ✅ Login with demo credentials
3. ✅ View available services/doctors
4. ✅ Search services
5. ✅ Book appointment (multi-step form)
6. ✅ View my appointments
7. ✅ Reschedule/Cancel appointments (UI only)

### Admin Features
1. ✅ Admin login
2. ✅ Admin dashboard (placeholder)

### General Features
1. ✅ Protected routes (only logged-in users)
2. ✅ Role-based navigation
3. ✅ Responsive design (mobile-friendly)
4. ✅ Form validation
5. ✅ Error handling (UI level)

---

## 📊 Mock Data Structure

### Services Example
```javascript
{
  id: 1,
  name: "Dr. Rajesh Kumar",
  type: "Dentist",
  price: 500,
  duration: 30, // minutes
  description: "Expert in dental care",
  experience: "10 years",
  image: "👨‍⚕️"
}
```

### Appointments Example
```javascript
{
  id: 1,
  serviceName: "Dr. Rajesh Kumar",
  type: "Dentist",
  date: "2026-02-15",
  time: "10:00 AM",
  price: 500,
  status: "Confirmed",
  bookedAt: "2026-02-05"
}
```

### Time Slots Example
```javascript
{
  id: 1,
  time: "09:00 AM",
  available: true
}
```

---

## 🎓 Interview Questions from Phase 1

### React Basics
1. **What is the difference between state and props?**
   - State: Managed within component, can change
   - Props: Passed from parent, read-only

2. **Explain the `map()` function and why use `key` prop?**
   - `map()` converts array to JSX elements
   - `key` helps React identify which items have changed
   - Never use index as key

3. **What does `useState` do?**
   - Adds state to functional components
   - Returns [value, setValue] pair
   - Triggers re-render on state update

4. **How to navigate between pages in React?**
   - Use `useNavigate()` hook from React Router
   - Call `navigate('/path')` to go to page

5. **What is component lifecycle?**
   - Mount → Update → Unmount
   - `useEffect` runs after render

### Coding Problems
1. Create a search filter for a list
2. Build a form with validation
3. Implement a multi-step form
4. Handle conditional rendering

---

## 🔄 Routing Map

```
/ (Home)
├── /login                 (Public)
├── /register             (Public)
├── /dashboard            (Protected - User)
├── /booking              (Protected - User)
├── /my-appointments      (Protected - User)
└── /admin                (Protected - Admin)
```

---

## 🎨 Color Scheme

- **Primary**: #0066cc (Blue)
- **Secondary**: #ff6b6b (Red)
- **Success**: #22c55e (Green)
- **Warning**: #f59e0b (Orange)
- **Danger**: #ef4444 (Red)
- **Dark**: #1f2937
- **Light**: #f3f4f6

---

## ✨ Code Quality Features

- ✅ Clean, readable code with comments
- ✅ Consistent naming conventions
- ✅ Reusable components
- ✅ Proper error handling
- ✅ Form validation
- ✅ Responsive CSS (mobile-first)
- ✅ No external UI libraries (pure CSS)

---

## 🚀 Next Steps: Phase 2 (Backend)

When ready to move to Phase 2, we'll build:

1. **Backend Setup**
   - Node.js + Express server
   - MongoDB database connection
   - Environment variables setup

2. **Database Models**
   - User model (with password hashing)
   - Service model
   - TimeSlot model
   - Appointment model

3. **APIs**
   - Authentication APIs (register, login, logout)
   - Service APIs (get all, get by id)
   - Appointment APIs (create, get, update, delete)

4. **Integration**
   - Connect frontend to backend APIs
   - Replace mock data with real data
   - Handle API errors properly

---

## 📚 Resources & Learning

### Helpful Concepts to Review
- React Hooks: https://react.dev/reference/react/useState
- React Router: https://reactrouter.com/
- Array.map(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- Form Validation: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation

### Common Mistakes to Avoid
1. ❌ Using `index` as `key` in map()
2. ❌ Modifying state directly (use setState)
3. ❌ Forgetting `key` prop in lists
4. ❌ Not validating forms before submit
5. ❌ Not handling loading/error states

---

## 🤝 Contributing

This is a learning project. Feel free to:
- Experiment with code
- Modify components
- Try different styles
- Add more features

---

## 📝 Author & Purpose

**Built for**: Placement & Internship Preparation  
**Level**: Beginner to Intermediate  
**Time**: ~4-6 weeks (3 phases)

---

## 📞 Support

For questions or issues:
1. Check code comments first
2. Review React documentation
3. Check console errors
4. Test with demo credentials

---

## ✅ Checklist: Before Moving to Phase 2

- [ ] Understood all React concepts explained
- [ ] Can run the app locally
- [ ] Tested all features with demo credentials
- [ ] Reviewed all components and CSS
- [ ] Read all code comments
- [ ] Familiar with folder structure
- [ ] Can explain the project in an interview

---

## 🎉 Ready for Interview?

### What to Explain
1. Project overview (3 mins)
2. Tech stack choice (2 mins)
3. Architecture & data flow (3 mins)
4. Key React concepts used (5 mins)
5. How to run project (2 mins)

### Code to Showcase
1. useState hook implementation
2. map() function usage
3. Form validation logic
4. Protected routes
5. Multi-step form logic

---

## 📄 License

This project is open for educational purposes.

---

**Happy Learning! 🚀**
