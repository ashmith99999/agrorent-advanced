import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import MainApp from './components/MainApp';
import UserProfile from './components/UserProfile';
import OwnerDashboard from './components/OwnerDashboard';
import AdminDashboard from './components/AdminDashboard';
import { View, UserRole, User, Booking, Notification, Machinery } from './types';
import { MACHINERY_DATA } from './constants';

const App = () => {
  const [currentView, setCurrentView] = useState<View>('login');
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [backgroundClass, setBackgroundClass] = useState('');

  useEffect(() => {
    switch (currentView) {
      case 'main':
        setBackgroundClass('bg-view-main');
        break;
      case 'profile':
        setBackgroundClass('bg-view-profile');
        break;
      case 'ownerDashboard':
        setBackgroundClass('bg-view-owner');
        break;
      case 'adminDashboard':
        setBackgroundClass('bg-view-admin');
        break;
      default:
        setBackgroundClass('');
        break;
    }
  }, [currentView]);


  const handleLogin = (role: UserRole, userData: User) => {
    setUserRole(role);
    setCurrentUser(userData);
    
    if (role === 'owner') {
        setCurrentView('ownerDashboard');
    } else if (role === 'admin') {
        setCurrentView('adminDashboard');
    } else {
        setCurrentView('main');
    }
    
    if (role === 'user') {
      setBookings([
        { id: 1, machinery: 'John Deere 5075E', date: '2025-10-05', status: 'upcoming', price: 1200, duration: 3 },
        { id: 2, machinery: 'Combine Harvester', date: '2025-09-28', status: 'completed', price: 3500, duration: 5 },
      ]);
      
      setNotifications([
        { id: 1, message: 'Your booking for John Deere 5075E starts in 2 days', type: 'info', time: '2 hours ago' },
      ]);
    }
  };

  const handleSignUp = (userData: Omit<User, 'memberSince' | 'totalBookings'>) => {
    const newUser: User = {
      ...userData,
      memberSince: new Date().getFullYear().toString(),
      totalBookings: 0,
    };
    setCurrentUser(newUser);
    setUserRole('user');
    setCurrentView('main');
    setBookings([]);
    setNotifications([
      {
        id: Date.now(),
        message: `Welcome to AgriRent, ${newUser.name}! Explore our catalog to get started.`,
        type: 'success',
        time: 'Just now'
      }
    ]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setBookings([]);
    setNotifications([]);
    setCurrentView('login');
  };

  const handleBooking = (machinery: Machinery) => {
    const newBooking: Booking = {
      id: Date.now(),
      machinery: machinery.name,
      date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0], // Book for 3 days from now
      status: 'upcoming',
      price: machinery.price,
      duration: 3
    };
    setBookings([newBooking, ...bookings]);
    setNotifications([{
      id: Date.now(),
      message: `Booking confirmed for ${machinery.name}`,
      type: 'success',
      time: 'Just now'
    }, ...notifications]);
  };

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigateToSignUp={() => setCurrentView('signup')} />;
  }
  
  if (currentView === 'signup') {
    return <SignUpPage onSignUp={handleSignUp} onNavigateToLogin={() => setCurrentView('login')} />;
  }

  // Guard against rendering main app without a user
  if (!currentUser) {
    setCurrentView('login');
    return <LoginPage onLogin={handleLogin} onNavigateToSignUp={() => setCurrentView('signup')} />;
  }
  
  // Guard against non-owners/admins accessing protected dashboards
  if (currentView === 'ownerDashboard' && userRole !== 'owner') {
    setCurrentView('login');
    return <LoginPage onLogin={handleLogin} onNavigateToSignUp={() => setCurrentView('signup')} />;
  }
  
  if (currentView === 'adminDashboard' && userRole !== 'admin') {
    setCurrentView('login');
    return <LoginPage onLogin={handleLogin} onNavigateToSignUp={() => setCurrentView('signup')} />;
  }

  const renderMainContent = () => {
    switch(currentView) {
      case 'main':
        return <MainApp 
          onLogout={handleLogout}
          onNavigateToProfile={() => setCurrentView('profile')}
          userRole={userRole}
          currentUser={currentUser}
          bookings={bookings}
          notifications={notifications}
          onBooking={handleBooking}
          machinery={MACHINERY_DATA}
        />;
      case 'profile':
        return <UserProfile
          onBack={() => setCurrentView('main')}
          onLogout={handleLogout}
          currentUser={currentUser}
          bookings={bookings}
        />;
      case 'ownerDashboard':
        return <OwnerDashboard
            currentUser={currentUser}
            onLogout={handleLogout}
        />;
      case 'adminDashboard':
        return <AdminDashboard
            currentUser={currentUser}
            onLogout={handleLogout}
        />;
      default:
        // Fallback to login
        setCurrentView('login');
        return null;
    }
  };

  return (
    <div className={`app-background-container text-[var(--app-text-primary)] min-h-screen ${backgroundClass}`}>
      {renderMainContent()}
    </div>
  );
};

export default App;
