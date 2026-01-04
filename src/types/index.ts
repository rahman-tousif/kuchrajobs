import { 
  Briefcase, 
  Home, 
  Settings, 
  ShoppingBag, 
  Wrench, 
  Car, 
  Shield, 
  Utensils, 
  Building, 
  Heart,
  Star,
  ThumbsUp,
  Search,
  Plus,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  Filter
} from 'lucide-react';

export interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  salary: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  postedDate: Date;
  duration: string;
  postedBy: string;
  isUrgent?: boolean;
  isFeatured?: boolean;
  applicants?: number;
  views?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
}

export interface ServiceProvider {
  id: string;
  businessName: string;
  serviceCategory: string;
  serviceDescription: string;
  location: string;
  areasServed: string[];
  priceRange: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  postedDate: Date;
  totalServices: number;
  experience: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  rating?: number;
}

export interface Comment {
  id: string;
  postId: string;
  postType: 'job' | 'service';
  authorName: string;
  authorPhone: string;
  authorEmail?: string;
  content: string;
  postedDate: Date;
  isVerified?: boolean;
  rating?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export type ViewType = 'landing' | 'browse' | 'profile' | 'jobForm' | 'jobDetail' | 'editProfile' | 'services' | 'serviceDetail';

export const jobCategories: Category[] = [
  { id: 'sales', name: 'বিক্রয়', icon: ShoppingBag, color: 'bg-blue-100 text-blue-700' },
  { id: 'domestic', name: 'গৃহস্থালি', icon: Home, color: 'bg-green-100 text-green-700' },
  { id: 'cleaning', name: 'পরিষ্কার-পরিচ্ছন্নতা', icon: Wrench, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'transport', name: 'পরিবহন', icon: Car, color: 'bg-purple-100 text-purple-700' },
  { id: 'security', name: 'নিরাপত্তা', icon: Shield, color: 'bg-red-100 text-red-700' },
  { id: 'food', name: 'খাদ্য', icon: Utensils, color: 'bg-orange-100 text-orange-700' },
  { id: 'construction', name: 'নির্মাণ', icon: Building, color: 'bg-gray-100 text-gray-700' },
  { id: 'healthcare', name: 'স্বাস্থ্যসেবা', icon: Heart, color: 'bg-pink-100 text-pink-700' },
  { id: 'others', name: 'অন্যান্য', icon: ShoppingBag, color: 'bg-pink-100 text-pink-700' }
];

export const serviceTypes = [
  'প্লাম্বিং সেবা', 'বৈদ্যুতিক সেবা', 'মেরামত সেবা', 'পরিষ্কার-পরিচ্ছন্নতার সেবা',
  'ডেলিভারি সেবা', 'ইন্টারনেট সেবা', 'স্বাস্থ্যসেবা', 'পরিবহন সেবা',
  'আইনগত সেবা', 'শিক্ষা সেবা', 'ক্যাটারিং সেবা', 'ইভেন্ট ম্যানেজমেন্ট',
  'ফটোগ্রাফি সেবা', 'ভিডিওগ্রাফি সেবা', 'গ্রাফিক ডিজাইন', 'ওয়েব ডিজাইন',
  'সফটওয়্যার ডেভেলপমেন্ট', 'ডিজিটাল মার্কেটিং', 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট',
  'কন্টেন্ট রাইটিং', 'ট্রান্সলেশন সেবা', 'অ্যাকাউন্টিং সেবা', 'ট্যাক্স কনসাল্টেশন',
  'রিয়েল এস্টেট সেবা', 'ইনস্যুরেন্স সেবা', 'ব্যাংকিং সেবা', 'ফিন্যান্সিয়াল অ্যাডভাইজরি',
  'হিউম্যান রিসোর্স', 'রিক্রুটমেন্ট', 'ট্রেনিং অ্যান্ড ডেভেলপমেন্ট', 'কনসাল্টেশন',
  'রিসার্চ সেবা', 'ডেটা অ্যানালাইসিস', 'মার্কেট রিসার্চ', 'বিজনেস প্ল্যানিং',
  'স্টার্টআপ কনসাল্টেশন', 'ফ্রিল্যান্সিং', 'ভার্চুয়াল অ্যাসিস্ট্যান্ট', 'অনলাইন টিচিং',
  'কোচিং সেন্টার', 'প্রাইভেট টিউশন', 'ল্যাঙ্গুয়েজ টিচিং', 'স্কিল ডেভেলপমেন্ট',
  'ফিটনেস ট্রেনিং', 'ইয়োগা ক্লাস', 'ডান্স ক্লাস', 'মিউজিক লেসন',
  'আর্ট অ্যান্ড ক্রাফ্ট', 'হ্যান্ডিক্রাফ্ট', 'জুয়েলারি ডিজাইন', 'ফ্যাশন ডিজাইন',
  'বিউটি পার্লার', 'হেয়ার স্যালন', 'মেকআপ আর্টিস্ট', 'নেইল আর্টিস্ট',
  'ম্যাসাজ থেরাপি', 'স্পা সেবা', 'স্কিন কেয়ার', 'হেয়ার কেয়ার'
];

export const dhakaMajorAreas = {
  'ঢাকা সিটি কর্পোরেশন': [
    'ধানমন্ডি (১৫০)', 'গুলশান (৮০)', 'বনানী (৬৫)', 'বাড্ডা (৪৫)',
    'রমনা (৩০)', 'মতিঝিল (২৫)', 'পুরান ঢাকা (২০০)', 'লালবাগ (১৮০)',
    'চকবাজার (১৬০)', 'সুত্রাপুর (১৪০)', 'কামরাঙ্গীরচর (১২০)'
  ],
  'ঢাকা উত্তর সিটি কর্পোরেশন': [
    'উত্তরা (৩০০)', 'মিরপুর (২৫০)', 'মোহাম্মদপুর (২০০)', 'শ্যামলী (১৫০)',
    'আদাবর (১০০)', 'খিলগাঁও (৮০)', 'সাভার (৬০)', 'কেরানীগঞ্জ (৪০)'
  ],
  'ঢাকা দক্ষিণ সিটি কর্পোরেশন': [
    'দক্ষিণখান (২০০)', 'দক্ষিণ কেরানীগঞ্জ (১৫০)', 'দক্ষিণ সুরাব (১০০)',
    'দক্ষিণ দেমরা (৮০)', 'দক্ষিণ নবাবগঞ্জ (৬০)', 'দক্ষিণ ধামরাই (৪০)'
  ],
  'ঢাকা মহানগর': [
    'নারায়ণগঞ্জ (৫০০)', 'গাজীপুর (৪০০)', 'মানিকগঞ্জ (৩০০)', 'মুন্সীগঞ্জ (২৫০)',
    'নরসিংদী (২০০)', 'টাঙ্গাইল (১৫০)', 'কিশোরগঞ্জ (১০০)', 'মাদারীপুর (৮০)'
  ]
};

