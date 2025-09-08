import React, { useState } from 'react';
import { Plus, Search, MapPin, Clock, Phone, User, Briefcase, Home, Car, GraduationCap, Wrench, ShoppingBag, Heart, Settings, Star, Calendar, Edit3, ChevronDown, Filter, Bookmark, ThumbsUp, AlertCircle, ArrowRight } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  salary: string;
  description: string;
  contactName: string;
  contactPhone: string;
  postedDate: Date;
  duration: string;
  postedBy: string;
  isUrgent?: boolean;
  isFeatured?: boolean;
  applicants?: number;
  views?: number;
}

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
  rating: number;
  totalJobs: number;
  joinDate: Date;
  profilePicture?: string;
}

const jobCategories = [
  { id: 'domestic', name: 'গৃহস্থালি কাজ', icon: Home, color: 'bg-blue-100 text-blue-700' },
  { id: 'delivery', name: 'ডেলিভারি', icon: Car, color: 'bg-green-100 text-green-700' },
  { id: 'tutoring', name: 'শিক্ষকতা', icon: GraduationCap, color: 'bg-purple-100 text-purple-700' },
  { id: 'construction', name: 'নির্মাণ কাজ', icon: Wrench, color: 'bg-orange-100 text-orange-700' },
  { id: 'sales', name: 'বিক্রয়', icon: ShoppingBag, color: 'bg-pink-100 text-pink-700' },
  { id: 'healthcare', name: 'স্বাস্থ্যসেবা', icon: Heart, color: 'bg-red-100 text-red-700' },
];

const dhakaAreas = [
  'ঢাকা (১০০)', 'ঢাকা বিভাগ (১৩)', 'চট্টগ্রাম (৯)', 'খুলনা (১)', 'খুলনা বিভাগ (২)', 'আরও দেখান'
];

const skillOptions = [
  'রান্না', 'পরিষ্কার-পরিচ্ছন্নতা', 'গাড়ি চালানো', 'ইংরেজি', 'গণিত', 'কম্পিউটার', 
  'নির্মাণ কাজ', 'বিদ্যুৎ কাজ', 'প্লাম্বিং', 'বিক্রয়', 'গ্রাহক সেবা', 'ডেলিভারি'
];

function App() {
  const [currentUser] = useState<UserProfile>({
    id: 'user1',
    name: 'মোহাম্মদ রহিম',
    phone: '০১৭১২৩৪৫৬৭৮',
    email: 'rahim@example.com',
    location: 'ঢাকা',
    bio: 'অভিজ্ঞ গৃহকর্মী এবং রান্নার কাজে দক্ষ। ৫ বছরের অভিজ্ঞতা রয়েছে।',
    skills: ['রান্না', 'পরিষ্কার-পরিচ্ছন্নতা', 'গ্রাহক সেবা'],
    rating: 4.8,
    totalJobs: 23,
    joinDate: new Date(2023, 5, 15)
  });

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'মোবাইল ও ফেইসবুকিং দোকানের কর্মী প্রয়োজন',
      category: 'sales',
      location: 'ঢাকা, সেলস এক্সিকিউটিভ',
      salary: '৮ ১৩,০০০ - ১৫,০০০',
      description: 'মোবাইল ফোন বিক্রয় এবং ফেইসবুক মার্কেটিং এর কাজে অভিজ্ঞ ব্যক্তি প্রয়োজন। ভাল বেতন ও কমিশন।',
      contactName: 'মালিক',
      contactPhone: '০১৭১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 11, 18),
      duration: 'পূর্ণকালীন',
      postedBy: 'user2',
      isUrgent: true,
      isFeatured: true,
      applicants: 25,
      views: 150
    },
    {
      id: '2',
      title: 'সেলসম্যান আরশক ১০ জন।',
      category: 'sales',
      location: 'ঢাকা, সেলস এক্সিকিউটিভ',
      salary: '৮ ১৫,০০০ - ১৮,৫০০',
      description: 'বিভিন্ন পণ্য বিক্রয়ের জন্য অভিজ্ঞ সেলসম্যান প্রয়োজন। আকর্ষণীয় বেতন ও ইনসেন্টিভ।',
      contactName: 'Ashik',
      contactPhone: '০১৮৯৮৭৬৫৪৩২',
      postedDate: new Date(2024, 11, 17),
      duration: 'পূর্ণকালীন',
      postedBy: 'user3',
      isUrgent: true,
      isFeatured: true,
      applicants: 18,
      views: 95
    },
    {
      id: '3',
      title: 'সেলসম্যান প্রয়োজন',
      category: 'sales',
      location: 'ঢাকা, সেলস এক্সিকিউটিভ',
      salary: '৮ ৯,০০০ - ১৩,০০০',
      description: 'খুচরা বিক্রয়ের জন্য দক্ষ সেলসম্যান চাই। নতুনরাও আবেদন করতে পারেন।',
      contactName: 'Md. Mamun',
      contactPhone: '০১৫৫৫১২৩৪৫৬',
      postedDate: new Date(2024, 11, 16),
      duration: 'পূর্ণকালীন',
      postedBy: 'user4',
      isFeatured: true,
      applicants: 12,
      views: 78
    },
    {
      id: '4',
      title: 'বাসার কাজের লোক দরকার',
      category: 'domestic',
      location: 'ঢাকা, গুলশান',
      salary: '৮ ১০,০০০ - ১২,০০০',
      description: 'পরিষ্কার-পরিচ্ছন্নতা এবং রান্নার কাজের জন্য অভিজ্ঞ ব্যক্তি প্রয়োজন।',
      contactName: 'রহিমা বেগম',
      contactPhone: '০১৯১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 11, 15),
      duration: 'পার্ট-টাইম',
      postedBy: 'user5',
      applicants: 8,
      views: 45
    },
    {
      id: '5',
      title: 'ডেলিভারি বয় প্রয়োজন',
      category: 'delivery',
      location: 'ঢাকা, ধানমন্ডি',
      salary: '৮ ১২,০০০ - ১৬,০০০',
      description: 'মোটরসাইকেল চালানো জানা থাকতে হবে। খাবার ডেলিভারির কাজ।',
      contactName: 'করিম',
      contactPhone: '০১৮১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 11, 14),
      duration: 'পূর্ণকালীন',
      postedBy: 'user6',
      isUrgent: true,
      applicants: 15,
      views: 89
    },
    {
      id: '6',
      title: 'ইংরেজি টিউটর চাই',
      category: 'tutoring',
      location: 'ঢাকা, উত্তরা',
      salary: '৮ ৮,০০০ - ১০,০০০',
      description: 'ক্লাস ৬-১০ এর ছাত্রছাত্রীদের ইংরেজি পড়ানোর জন্য অভিজ্ঞ শিক্ষক প্রয়োজন।',
      contactName: 'নাসির উদ্দিন',
      contactPhone: '০১৭৯৮৭৬৫৪৩২',
      postedDate: new Date(2024, 11, 13),
      duration: 'পার্ট-টাইম',
      postedBy: 'user7',
      applicants: 6,
      views: 34
    }
  ]);

  const [currentView, setCurrentView] = useState<'landing' | 'browse' | 'profile' | 'jobForm' | 'jobDetail' | 'editProfile'>('landing');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [newJob, setNewJob] = useState({
    title: '',
    category: '',
    location: '',
    salary: '',
    description: '',
    contactName: '',
    contactPhone: '',
    duration: '',
    isUrgent: false,
    isFeatured: false
  });

  const [editingProfile, setEditingProfile] = useState({
    name: currentUser.name,
    phone: currentUser.phone,
    email: currentUser.email,
    location: currentUser.location,
    bio: currentUser.bio,
    skills: [...currentUser.skills]
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    const matchesLocation = !selectedLocation || job.location.includes(selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const userJobs = jobs.filter(job => job.postedBy === currentUser.id);

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    const job: Job = {
      id: Date.now().toString(),
      ...newJob,
      postedDate: new Date(),
      postedBy: currentUser.id,
      applicants: 0,
      views: 0
    };
    setJobs([job, ...jobs]);
    setNewJob({ 
      title: '', category: '', location: '', salary: '', description: '', 
      contactName: '', contactPhone: '', duration: '', isUrgent: false, isFeatured: false 
    });
    setCurrentView('browse');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('profile');
  };

  const getCategoryInfo = (categoryId: string) => {
    return jobCategories.find(cat => cat.id === categoryId);
  };

  const toggleSkill = (skill: string) => {
    setEditingProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Kuchra Jobs</h1>
              </div>
              <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
                <button
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">প্রোফাইল</span>
                </button>
                <button
                  onClick={() => setCurrentView('jobForm')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
                >
                  কাজ পোস্ট করুন
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              বাংলাদেশের দৈনন্দিন কাজের সুযোগ খুঁজুন
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-blue-100">
              গৃহস্থালি, ডেলিভারি, শিক্ষকতা, নির্মাণ এবং আরও অনেক কাজের জন্য পোস্ট করুন এবং ব্রাউজ করুন
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg p-2">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="আপনি কী খুঁজছেন?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentView('browse')}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Search className="h-5 w-5" />
                  খুঁজুন
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Job Categories */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-8">
            কাজের ক্যাটেগরি
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {jobCategories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentView('browse');
                  }}
                  className="bg-white rounded-lg p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
                >
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 lg:h-8 lg:w-8" />
                  </div>
                  <h3 className="font-medium text-gray-800 text-sm lg:text-base">{category.name}</h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
                সাম্প্রতিক কাজের সুযোগ
              </h2>
              <button 
                onClick={() => setCurrentView('browse')}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
              >
                সব দেখুন
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.slice(0, 6).map(job => (
                <div
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job);
                    setCurrentView('jobDetail');
                  }}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-blue-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {job.isUrgent && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">জরুরি</span>
                        )}
                        {job.isFeatured && (
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">ফিচারড</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{job.title}</h3>
                      <div className="text-blue-600 font-bold mb-2">{job.salary}</div>
                      <div className="text-sm text-gray-600 mb-2">{job.location}</div>
                      <div className="text-xs text-gray-500">{job.postedDate.toLocaleDateString('bn-BD')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              আজই শুরু করুন
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              আপনার প্রয়োজনীয় কাজ পোস্ট করুন বা উপযুক্ত কাজ খুঁজে নিন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentView('jobForm')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                কাজ পোস্ট করুন
              </button>
              <button
                onClick={() => setCurrentView('browse')}
                className="bg-yellow-400 text-black px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
              >
                কাজ খুঁজুন
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Kuchra Jobs</h3>
            <p className="text-gray-400">বাংলাদেশের দৈনন্দিন কাজের বোর্ড</p>
          </div>
        </footer>
      </div>
    );
  }

  // Profile View
  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button 
                onClick={() => setCurrentView('landing')}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                ← হোমে ফিরুন
              </button>
              <button
                onClick={() => setCurrentView('editProfile')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Edit3 className="h-4 w-4" />
                প্রোফাইল সম্পাদনা
              </button>
            </div>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 lg:px-6 py-6 lg:py-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 lg:gap-6">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 lg:h-12 lg:w-12 text-blue-600" />
                </div>
                <div className="text-white text-center sm:text-left">
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">{currentUser.name}</h1>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-blue-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {currentUser.location}, বাংলাদেশ
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      {currentUser.rating}/৫.০
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 lg:p-6">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">সম্পর্কে</h3>
                    <p className="text-gray-700 leading-relaxed">{currentUser.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">দক্ষতা</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.skills.map(skill => (
                        <span key={skill} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">পরিসংখ্যান</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="text-center">
                        <div className="text-xl lg:text-2xl font-bold text-blue-600">{currentUser.totalJobs}</div>
                        <div className="text-sm text-gray-600">সম্পন্ন কাজ</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl lg:text-2xl font-bold text-blue-600">{currentUser.rating}</div>
                        <div className="text-sm text-gray-600">গড় রেটিং</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Profile View
  if (currentView === 'editProfile') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => setCurrentView('profile')}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-2"
            >
              ← প্রোফাইলে ফিরুন
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">প্রোফাইল সম্পাদনা</h1>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">নাম *</label>
                <input
                  type="text"
                  required
                  value={editingProfile.name}
                  onChange={(e) => setEditingProfile({...editingProfile, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ফোন *</label>
                <input
                  type="tel"
                  required
                  value={editingProfile.phone}
                  onChange={(e) => setEditingProfile({...editingProfile, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল</label>
                <input
                  type="email"
                  value={editingProfile.email}
                  onChange={(e) => setEditingProfile({...editingProfile, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">এলাকা *</label>
                <select
                  required
                  value={editingProfile.location}
                  onChange={(e) => setEditingProfile({...editingProfile, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                >
                  <option value="ঢাকা">ঢাকা</option>
                  <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                  <option value="খুলনা">খুলনা</option>
                  <option value="রাজশাহী">রাজশাহী</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 lg:py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base"
              >
                প্রোফাইল আপডেট করুন
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Job Detail View
  if (selectedJob) {
    const categoryInfo = getCategoryInfo(selectedJob.category);
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => {
                setSelectedJob(null);
                setCurrentView('browse');
              }}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-2"
            >
              ← কাজের তালিকায় ফিরুন
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">কাজের বিস্তারিত</h1>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row items-start justify-between mb-4 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {selectedJob.isUrgent && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">জরুরি</span>
                  )}
                  {selectedJob.isFeatured && (
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">ফিচারড</span>
                  )}
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{selectedJob.title}</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedJob.duration}
                  </span>
                </div>
              </div>
              <div className="text-left lg:text-right w-full lg:w-auto">
                <div className="text-xl lg:text-2xl font-bold text-blue-600">{selectedJob.salary}</div>
                <div className="text-sm text-gray-500">
                  {selectedJob.applicants} জন আবেদন করেছেন
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">কাজের বিবরণ</h3>
              <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">যোগাযোগের তথ্য</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{selectedJob.contactName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{selectedJob.contactPhone}</span>
                </div>
              </div>
              <button className="mt-4 bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                এই কাজের জন্য যোগাযোগ করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Job Form View
  if (currentView === 'jobForm') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => setCurrentView('landing')}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-2"
            >
              ← হোমে ফিরুন
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">নতুন কাজ পোস্ট করুন</h1>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <form onSubmit={handleSubmitJob} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">কাজের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                  placeholder="যেমন: বাসার কাজের লোক দরকার"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ক্যাটেগরি *</label>
                <select
                  required
                  value={newJob.category}
                  onChange={(e) => setNewJob({...newJob, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                >
                  <option value="">ক্যাটেগরি নির্বাচন করুন</option>
                  {jobCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">এলাকা *</label>
                <input
                  type="text"
                  required
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                  placeholder="যেমন: ঢাকা, গুলশান"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">বেতন/পেমেন্ট *</label>
                <input
                  type="text"
                  required
                  value={newJob.salary}
                  onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                  placeholder="যেমন: ৮ ১৫,০০০ - ২০,০০০"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">কাজের বিবরণ *</label>
                <textarea
                  required
                  rows={4}
                  value={newJob.description}
                  onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                  placeholder="কাজের প্রয়োজনীয়তা, সময়সূচী এবং অন্যান্য বিস্তারিত লিখুন..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">যোগাযোগকারীর নাম *</label>
                <input
                  type="text"
                  required
                  value={newJob.contactName}
                  onChange={(e) => setNewJob({...newJob, contactName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ফোন নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={newJob.contactPhone}
                  onChange={(e) => setNewJob({...newJob, contactPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">কাজের ধরন *</label>
                <select
                  required
                  value={newJob.duration}
                  onChange={(e) => setNewJob({...newJob, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="পূর্ণকালীন">পূর্ণকালীন</option>
                  <option value="পার্ট-টাইম">পার্ট-টাইম</option>
                  <option value="প্রজেক্ট বেসড">প্রজেক্ট বেসড</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newJob.isUrgent}
                    onChange={(e) => setNewJob({...newJob, isUrgent: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">জরুরি</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newJob.isFeatured}
                    onChange={(e) => setNewJob({...newJob, isFeatured: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">ফিচারড</span>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 lg:py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base"
              >
                কাজ পোস্ট করুন
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Browse Jobs View (Second Version)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-4 lg:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 w-full lg:w-auto">
              <button
                onClick={() => setCurrentView('landing')}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                ← হোমে ফিরুন
              </button>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="text-sm lg:text-base text-gray-700">অবস্থান নির্বাচন করুন</span>
              </div>
              <div className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-blue-600" />
                <span className="text-sm lg:text-base text-gray-700">সেলস এক্সিকিউটিভ</span>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
              <button
                onClick={() => setCurrentView('profile')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">প্রোফাইল</span>
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="আপনি কী খুঁজছেন?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                />
              </div>
            </div>
            <button className="bg-yellow-400 text-black px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
              <Search className="h-5 w-5" />
              <span className="sm:hidden">খুঁজুন</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="lg:flex gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 w-full bg-white rounded-lg shadow-sm p-4 lg:p-6 h-fit mb-6 lg:mb-0">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">ফলাফল বাছাই করে নিন</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                  <span className="text-sm text-gray-700">আর্জেন্ট</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">পোস্টকারীর ধরন:</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-700">তারিখ নতুন প্রথমে</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">অবস্থান</h3>
              <div className="space-y-2 max-h-48 lg:max-h-none overflow-y-auto lg:overflow-visible">
                <h4 className="font-medium text-gray-700">সমস্ত বাংলাদেশ</h4>
                {dhakaAreas.map((area, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedLocation(area.includes('(') ? area.split(' (')[0] : area)}
                    className={`block text-sm text-left w-full hover:text-blue-600 ${
                      selectedLocation === (area.includes('(') ? area.split(' (')[0] : area) ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">বিজ্ঞাপনের ধরন:</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="adType" className="text-blue-600" defaultChecked />
                  <span className="text-sm text-gray-700">বিক্রিত জন্য (১৭৭)</span>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">বেতন</h3>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>সকল</option>
                <option>১০,০০০ - ২০,০০০</option>
                <option>২০,০০০ - ৩০,০০০</option>
                <option>৩০,০০০+</option>
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <div className="mb-4 overflow-x-auto">
              <div className="text-sm text-gray-600">
                হোমপেজ › সকল বিজ্ঞাপন › চাকরি › বাংলাদেশ ও চাকরি › সেলস এক্সিকিউটিভ চাকরি
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">বাংলাদেশ ও সেলস এক্সিকিউটিভ এর চাকরির বিজ্ঞাপন</h1>
              <p className="text-gray-600">এর জন্য ১৭৭ টি বিজ্ঞাপনের মধ্যে ১-১৫ টি দেখাচ্ছে</p>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-start gap-3 lg:gap-4 flex-1 w-full sm:w-auto">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-6 w-6 lg:h-8 lg:w-8 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {job.isUrgent && (
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">জরুরি</span>
                          )}
                          {job.isFeatured && (
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">ফিচারড</span>
                          )}
                        </div>
                        <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 line-clamp-2">
                          {job.title}
                        </h3>
                        <div className="text-sm text-gray-600 mb-2">{job.contactName}</div>
                        <div className="text-base lg:text-lg font-bold text-blue-600 mb-2">{job.salary}</div>
                        <div className="text-sm text-gray-600 truncate">{job.location}</div>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-yellow-500" />
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="text-xs text-gray-500">
                        {job.postedDate.toLocaleDateString('bn-BD')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Jobs Section */}
            <div className="mt-8">
              <div className="bg-orange-100 rounded-lg p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">ফিচারড</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobs.filter(job => job.isFeatured).slice(0, 3).map(job => (
                    <div key={job.id} className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                         onClick={() => setSelectedJob(job)}>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{job.title}</h4>
                      <div className="text-sm text-gray-600 mb-1">{job.contactName}</div>
                      <div className="text-blue-600 font-bold text-sm">{job.salary}</div>
                      <div className="text-xs text-gray-500 mt-2 truncate">{job.location}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">{job.applicants || 0} ঘন্টা</span>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3 text-yellow-500" />
                          <Star className="h-3 w-3 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">কোন কাজ পাওয়া যায়নি</h3>
                <p className="text-gray-600">আপনার অনুসন্ধানের মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setCurrentView('jobForm')}
        className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 bg-blue-600 text-white p-3 lg:p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <Plus className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
    </div>
  );
}

export default App;