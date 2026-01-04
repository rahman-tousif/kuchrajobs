import React from 'react';
import { Search, Plus, User, Briefcase } from 'lucide-react';
import { ViewType } from '../../types';

interface NavbarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onBreadcrumbChange: (breadcrumbs: Array<{label: string, path: string}>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, onBreadcrumbChange }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onViewChange('landing');
                onBreadcrumbChange([]);
              }}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Khuchra Jobs
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => {
                onViewChange('landing');
                onBreadcrumbChange([]);
              }}
              className={`flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm lg:text-base group ${
                currentView === 'landing' ? 'text-blue-600 bg-blue-50' : ''
              }`}
            >
              <Briefcase className="h-4 w-4" />
              হোম
            </button>
            
            <button
              onClick={() => {
                onViewChange('browse');
                onBreadcrumbChange([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}]);
              }}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm lg:text-base group"
            >
              <Search className="h-4 w-4" />
              কাজ খুঁজুন
            </button>

            <button
              onClick={() => {
                onViewChange('services');
                onBreadcrumbChange([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}]);
              }}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm lg:text-base group"
            >
              <Briefcase className="h-4 w-4" />
              সেবাসমূহ
            </button>

            <button
              onClick={() => {
                onViewChange('profile');
                onBreadcrumbChange([{label: 'হোমপেজ', path: 'landing'}, {label: 'প্রোফাইল', path: 'profile'}]);
              }}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm lg:text-base group"
            >
              <User className="h-4 w-4" />
              প্রোফাইল
            </button>
          </nav>

          {/* Post Job Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onViewChange('jobForm');
                onBreadcrumbChange([{label: 'হোমপেজ', path: 'landing'}, {label: 'কাজ পোস্ট করুন', path: 'jobForm'}]);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm lg:text-base"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">কাজ পোস্ট করুন</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
