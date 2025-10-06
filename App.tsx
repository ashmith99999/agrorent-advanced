import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import MainApp from './components/MainApp';
import UserProfile from './components/UserProfile';
import OwnerDashboard from './components/OwnerDashboard';
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
    return <LoginPage onLogin={handleLogin} />;
  }

  // Guard against rendering main app without a user
  if (!currentUser) {
    setCurrentView('login');
    return <LoginPage onLogin={handleLogin} />;
  }
  
  // Guard against non-owners accessing owner dashboard
  if (currentView === 'ownerDashboard' && userRole !== 'owner') {
    setCurrentView('login');
    return <LoginPage onLogin={handleLogin} />;
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