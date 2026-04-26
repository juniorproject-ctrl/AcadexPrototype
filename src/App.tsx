import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import PostListing from './pages/PostListing';
import Community from './pages/Community';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifyOTP from './pages/VerifyOTP';

// Layout wrapper for pages that show Nav and Footer
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background-soft">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyOTP />} />

        {/* Main App Routes */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/browse" element={<Layout><Browse /></Layout>} />
        <Route path="/post" element={<Layout><PostListing /></Layout>} />
        <Route path="/community" element={<Layout><Community /></Layout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
