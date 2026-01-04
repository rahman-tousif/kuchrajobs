import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { 
  Navbar, 
  Footer, 
  Breadcrumb, 
  Pagination, 
  LocationModal, 
  CommentSection 
} from './components';
import { 
  Job, 
  UserProfile, 
  ServiceProvider, 
  Comment, 
  ViewType, 
  BreadcrumbItem,
  jobCategories,
  serviceTypes,
  dhakaMajorAreas
} from './types';
import { getCategoryInfo } from './utils';

// Demo data
const initialJobs: Job[] = [
  {
    id: '1',
    title: 'কাস্টমার কেয়ার সার্ভিস - ৬ জন',
    category: 'sales',
    location: 'ঢাকা, ধানমন্ডি',
    salary: '৮ ৮,০০০ - ১২,০০০',
    description: 'ই-কমার্স কোম্পানিতে কাস্টমার কেয়ার কাজ। ওয়েবসাইট ও ফেসবুক থেকে অর্ডার নেওয়া। ফোনে কাস্টমারের সাথে কথা বলা। কম্পিউটার বেসিক জানা আবশ্যক।',
    contactName: 'জশিম',
    contactPhone: '০১৭১২৩৪৫৬৭৮',
    contactEmail: 'jashim@company.com',
    postedDate: new Date(2024, 11, 15),
    duration: 'ফুল-টাইম',
    postedBy: 'user1',
    applicants: 25,
    views: 150,
    isUrgent: true,
    isFeatured: true
  },
  {
    id: '2',
    title: 'বাজার করা - ১ জন',
    category: 'domestic',
    location: 'ঢাকা, রমনা',
    salary: '৮ ৩০০ - ৫০০/দিন',
    description: 'বাজার করে আনা, রান্নার উপকরণ কেনা। সকাল ৭টা থেকে ৯টা। সপ্তাহে ৬ দিন।',
    contactName: 'নাসিরা বেগম',
    contactPhone: '০১৯৮৭৬৫৪৩২১',
    postedDate: new Date(2024, 11, 12),
    duration: 'পার্ট-টাইম',
    postedBy: 'user2',
    applicants: 4,
    views: 22
  }
];

const initialServices: ServiceProvider[] = [
  {
    id: 'sp1',
    businessName: 'রহিম প্লাম্বিং সার্ভিস',
    serviceCategory: 'plumbing',
    serviceDescription: 'সব ধরনের প্লাম্বিং কাজ। পাইপ মেরামত, টয়লেট ইনস্টলেশন, গিজার মেরামত।',
    location: 'ঢাকা, ধানমন্ডি',
    areasServed: ['ধানমন্ডি', 'গুলশান', 'বনানী'],
    priceRange: '৫০০-২০০০ টাকা',
    contactName: 'রহিম উদ্দিন',
    contactPhone: '০১৭১২৩৪৫৬৭৮',
    contactEmail: 'rahim@plumbing.com',
    postedDate: new Date(2024, 11, 14),
    totalServices: 150,
    experience: '৫ বছর',
    isVerified: true,
    isFeatured: true,
    rating: 4.8
  }
];

const currentUser: UserProfile = {
  id: 'user1',
  name: 'আহমেদ রহমান',
  email: 'ahmed@example.com',
  location: 'ঢাকা, ধানমন্ডি',
  bio: 'সফটওয়্যার ডেভেলপার হিসেবে ৫ বছর অভিজ্ঞতা',
  skills: ['JavaScript', 'React', 'Node.js', 'Python']
};

function App() {
  // State management
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceProvider | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [currentServicesPage, setCurrentServicesPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const [servicesItemsPerPage] = useState(30);

  // Data state
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>(initialServices);

  // Filtering logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    const matchesLocation = !selectedLocation || job.location.includes(selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const filteredServices = serviceProviders.filter(service => {
    const matchesSearch = service.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.serviceDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || 
                           selectedCategory === 'others' || 
                           service.serviceCategory === selectedCategory;
    const matchesLocation = !selectedLocation || service.location.includes(selectedLocation) ||
                           service.areasServed.some(area => area.includes(selectedLocation));
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const totalServicesPages = Math.ceil(filteredServices.length / servicesItemsPerPage);
  const servicesStartIndex = (currentServicesPage - 1) * servicesItemsPerPage;
  const servicesEndIndex = servicesStartIndex + servicesItemsPerPage;
  const paginatedServices = filteredServices.slice(servicesStartIndex, servicesEndIndex);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
    setCurrentServicesPage(1);
  }, [searchTerm, selectedCategory, selectedLocation]);

  // Event handlers
  const handleBreadcrumbClick = (path: string) => {
    if (path === 'landing') {
      setCurrentView('landing');
      setBreadcrumbs([]);
    } else if (path === 'browse') {
      setCurrentView('browse');
      setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}]);
    } else if (path === 'services') {
      setCurrentView('services');
      setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}]);
    }
  };

  const handleSubmitComment = (commentData: Omit<Comment, 'id' | 'postedDate'>) => {
    const comment: Comment = {
      id: Date.now().toString(),
      ...commentData,
      postedDate: new Date()
    };
    setComments([comment, ...comments]);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationModal(false);
  };

  // Render different views
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <div className="min-h-screen bg-gray-50">
            <Navbar 
              currentView={currentView} 
              onViewChange={setCurrentView}
              onBreadcrumbChange={setBreadcrumbs}
            />
            
            {/* Hero Section */}
            <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/img/hero.jpg')` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              
              <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                  দৈনন্দিন কাজের সহজ ঠিকানা
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
                  আপনার স্বপ্নের চাকরি খুঁজুন বা আপনার সেবা অন্যদের সাথে শেয়ার করুন
                </p>
                
                <div className="max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg p-2 shadow-xl">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="আপনি কী খুঁজছেন?"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        setCurrentView('browse');
                        setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}]);
                      }}
                      className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      খুঁজুন
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Categories */}
            <div className="container mx-auto px-4 py-12 lg:py-16">
              <div className="text-center mb-8">
                <button
                  onClick={() => {
                    setCurrentView('services');
                    setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}]);
                  }}
                  className="text-3xl lg:text-4xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
                >
                  সেবাসমূহ
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {jobCategories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        if (category.id === 'others') {
                          setSelectedCategory('others');
                          setCurrentView('services');
                          setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}, {label: 'অন্যান্য', path: 'services'}]);
                        } else {
                          setSelectedCategory(category.id);
                          setCurrentView('services');
                          setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}, {label: category.name, path: 'services'}]);
                        }
                      }}
                      className={`p-6 rounded-lg text-center hover:shadow-md transition-all duration-200 ${category.color}`}
                    >
                      <Icon className="h-8 w-8 mx-auto mb-3" />
                      <div className="font-medium">{category.name}</div>
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
                    onClick={() => {
                      setCurrentView('browse');
                      setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}]);
                    }}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
                  >
                    সব দেখুন
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedJobs.slice(0, 6).map(job => (
                    <div
                      key={job.id}
                      onClick={() => {
                        setSelectedJob(job);
                        setCurrentView('jobDetail');
                        setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}, {label: job.title, path: 'jobDetail'}]);
                      }}
                      className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-blue-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Plus className="h-6 w-6 text-blue-600" />
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

            <Footer />
          </div>
        );

      case 'browse':
        return (
          <div className="min-h-screen bg-gray-50">
            <Navbar 
              currentView={currentView} 
              onViewChange={setCurrentView}
              onBreadcrumbChange={setBreadcrumbs}
            />
            <Breadcrumb breadcrumbs={breadcrumbs} onBreadcrumbClick={handleBreadcrumbClick} />
            
            <div className="container mx-auto px-4 py-6">
              <div className="lg:flex gap-6">
                {/* Sidebar */}
                <div className="lg:w-80 w-full bg-white rounded-lg shadow-sm p-4 lg:p-6 h-fit mb-6 lg:mb-0">
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">ফিল্টার করুন</h3>
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
                      {Object.values(dhakaMajorAreas).flat().slice(0, 10).map((area, index) => (
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
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="mb-6">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                      {searchTerm ? `"${searchTerm}" এর জন্য চাকরি` : 'সকল চাকরি'}
                      {selectedCategory && ` - ${jobCategories.find(cat => cat.id === selectedCategory)?.name || selectedCategory}`}
                      {selectedLocation && ` - ${selectedLocation}`}
                    </h1>
                    <p className="text-gray-600">
                      {filteredJobs.length} টি চাকরি পাওয়া গেছে
                      {filteredJobs.length > 0 && ` (${startIndex + 1}-${Math.min(endIndex, filteredJobs.length)} টি দেখানো হচ্ছে)`}
                    </p>
                  </div>

                  {/* Job Listings */}
                  <div className="space-y-4">
                    {paginatedJobs.map(job => (
                      <div
                        key={job.id}
                        onClick={() => {
                          setSelectedJob(job);
                          setCurrentView('jobDetail');
                          setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}, {label: job.title, path: 'jobDetail'}]);
                        }}
                        className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                          <div className="flex items-start gap-3 lg:gap-4 flex-1 w-full sm:w-auto">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Plus className="h-6 w-6 lg:h-8 lg:w-8 text-gray-400" />
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
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                      <Plus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-800 mb-2">
                        {searchTerm ? `"${searchTerm}" এর জন্য কোন কাজ পাওয়া যায়নি` : 'কোন কাজ পাওয়া যায়নি'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm 
                          ? 'আপনার অনুসন্ধানের শব্দ পরিবর্তন করে আবার চেষ্টা করুন।' 
                          : 'আপনার ফিল্টার মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।'
                        }
                      </p>
                      {(searchTerm || selectedCategory || selectedLocation) && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('');
                            setSelectedLocation('');
                          }}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          সব ফিল্টার সরান
                        </button>
                      )}
                    </div>
                  )}

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredJobs.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    itemType="চাকরি"
                  />
                </div>
              </div>
            </div>

            <Footer />
          </div>
        );

      case 'jobDetail':
        if (!selectedJob) return null;
        return (
          <div className="min-h-screen bg-gray-50">
            <Navbar 
              currentView={currentView} 
              onViewChange={setCurrentView}
              onBreadcrumbChange={setBreadcrumbs}
            />
            <Breadcrumb breadcrumbs={breadcrumbs} onBreadcrumbClick={handleBreadcrumbClick} />
            
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 mb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{selectedJob.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>{selectedJob.location}</span>
                        <span>{selectedJob.duration}</span>
                        <span>{selectedJob.postedDate.toLocaleDateString('bn-BD')}</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-4">{selectedJob.salary}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {selectedJob.isUrgent && (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium">জরুরি</span>
                      )}
                      {selectedJob.isFeatured && (
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm font-medium">ফিচারড</span>
                      )}
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">কাজের বিবরণ</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">যোগাযোগের তথ্য</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">যোগাযোগকারী:</span>
                        <div className="font-medium">{selectedJob.contactName}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">ফোন নম্বর:</span>
                        <div className="font-medium">{selectedJob.contactPhone}</div>
                      </div>
                      {selectedJob.contactEmail && (
                        <div>
                          <span className="text-sm text-gray-600">ইমেইল:</span>
                          <div className="font-medium">{selectedJob.contactEmail}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <CommentSection
                  postId={selectedJob.id}
                  postType="job"
                  comments={comments}
                  onSubmitComment={handleSubmitComment}
                />
              </div>
            </div>

            <Footer />
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">পেজটি পাওয়া যায়নি</h1>
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setBreadcrumbs([]);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                হোমে ফিরুন
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
      
      {/* Floating Action Button */}
      <button
        onClick={() => {
          setCurrentView('jobForm');
          setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'কাজ পোস্ট করুন', path: 'jobForm'}]);
        }}
        className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 bg-blue-600 text-white p-3 lg:p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <Plus className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationSelect={handleLocationSelect}
        searchTerm={locationSearchTerm}
        onSearchChange={setLocationSearchTerm}
      />
    </div>
  );
}

export default App;

