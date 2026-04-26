import { Link, useLocation } from 'react-router-dom';
import { User as UserIcon } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { getCurrentRegisteredUser } from '../lib/auth';

export default function Navigation() {
  const location = useLocation();
  const isAuthPage = ['/', '/login', '/signup', '/verify'].includes(location.pathname);
  const currentUser = getCurrentRegisteredUser();

  if (isAuthPage) return null;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-12">
            <BrandLogo linked size="sm" />
            
            <div className="hidden md:flex space-x-8">
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/browse" className="nav-link">Browse Listings</Link>
              <Link to="/post" className="nav-link">Post a Listing</Link>
              <Link to="/community" className="nav-link">Community</Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center text-right mr-4">
              <div className="mr-3">
                <p className="text-sm font-bold text-brand-navy">{currentUser?.name || 'Guest User'}</p>
                <p className="text-xs text-brand-light-navy">{currentUser?.role || 'Student'}</p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
