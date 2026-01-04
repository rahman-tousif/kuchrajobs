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
  contactEmail?: string;
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

interface ServiceProvider {
  id: string;
  businessName: string;
  serviceCategory: string;
  serviceDescription: string;
  location: string;
  areasServed: string[];
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  rating: number;
  totalServices: number;
  priceRange: string;
  availability: string;
  postedDate: Date;
  isVerified?: boolean;
  isFeatured?: boolean;
  serviceImages?: string[];
  workingHours: string;
  experience: string;
}

interface Comment {
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

const jobCategories = [
  { id: 'domestic', name: 'গৃহস্থালি কাজ', icon: Home, color: 'bg-blue-100 text-blue-700' },
  { id: 'plumbing', name: 'প্লাম্বিং সেবা', icon: Wrench, color: 'bg-cyan-100 text-cyan-700' },
  { id: 'electrical', name: 'বৈদ্যুতিক সেবা', icon: Wrench, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'repair', name: 'মেরামত সেবা', icon: Wrench, color: 'bg-orange-100 text-orange-700' },
  { id: 'cleaning', name: 'পরিষ্কার-পরিচ্ছন্নতার সেবা', icon: Home, color: 'bg-green-100 text-green-700' },
  { id: 'delivery', name: 'ডেলিভারি সেবা', icon: Car, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'internet', name: 'ইন্টারনেট সেবা', icon: Settings, color: 'bg-indigo-100 text-indigo-700' },
  { id: 'healthcare', name: 'স্বাস্থ্যসেবা', icon: Heart, color: 'bg-red-100 text-red-700' },
  { id: 'transportation', name: 'পরিবহন সেবা', icon: Car, color: 'bg-teal-100 text-teal-700' },
  { id: 'legal', name: 'আইনগত সেবা', icon: Bookmark, color: 'bg-slate-100 text-slate-700' },
  { id: 'education', name: 'শিক্ষা সেবা', icon: GraduationCap, color: 'bg-purple-100 text-purple-700' },
  { id: 'others', name: 'অন্যান্য', icon: ShoppingBag, color: 'bg-pink-100 text-pink-700' },
];

const serviceTypes = [
  'ইভেন্ট হেল্পার / স্টাফ',
  'ফাংশন সেটআপ হেল্পার',
  'ডেলিভারি রাইডার',
  'ফ্লায়ার / পোস্টার বিতরণকারী',
  'হাউজ ক্লিনার',
  'অফিস ক্লিনার',
  'দোকান বা স্টল হেল্পার',
  'কেক / খাবার ডেলিভারি হেল্পার',
  'হ্যান্ডিম্যান / ছোট মেরামতি কর্মী',
  'সিকিউরিটি গার্ড (দিনের শিফট)',
  'পার্ট-টাইম রিসেপশনিস্ট',
  'অফিস সহকারী (১-দিন বা ছোট কাজ)',
  'মার্কেট প্রমোশনাল স্টাফ',
  'স্ট্রীট সার্ভে / রিসার্চ এসিস্ট্যান্ট',
  'ফটো / ভিডিও অ্যাসিস্ট্যান্ট',
  'সোশ্যাল মিডিয়া ফটো হেল্পার',
  'পার্টি / ইভেন্ট ডেকোরেশন হেল্পার',
  'গাড়ি বা বাইক সার্ভিস হেল্পার',
  'দোকান সেটআপ হেল্পার',
  'ড্রাইভার হেল্পার',
  'গার্ডেনিং / লন ওয়ার্ক হেল্পার',
  'রঙের কাজ / হোম পেইন্টার হেল্পার',
  'ব্যানার পোস্টার সেটআপ হেল্পার',
  'দোকানের ইনভেন্টরি হেল্পার',
  'শপিং / পণ্য ডেলিভারি হেল্পার',
  'মোবাইল / কম্পিউটার সার্ভিস সহায়ক',
  'লাইব্রেরি হেল্পার',
  'দোকান / হোটেলের হেল্পার',
  'গাড়ি পার্কিং অ্যাটেনডেন্ট',
  'হোটেল বা রেস্টুরেন্ট হেল্পার',
  'লন্ড্রি / কাপড় ধোয়ার হেল্পার',
  'কুকিং হেল্পার / শেফ অ্যাসিস্ট্যান্ট',
  'স্কুল / কলেজ এডমিন হেল্পার',
  'রিসিপশন হেল্পার ইভেন্ট / পার্টি',
  'ফ্রুট / ভেজিটেবল ভেন্ডর হেল্পার',
  'প্লাস্টার / মেরামতির হেল্পার',
  'ইলেকট্রিশিয়ান অ্যাসিস্ট্যান্ট',
  'পেইন্টিং হেল্পার',
  'ছোট ভিডিও / প্রোডাকশন হেল্পার',
  'হোম ডেলিভারি হেল্পার',
  'আইসক্রিম / ফুড স্টল হেল্পার',
  'পোষা প্রাণী হেল্পার / কেয়ারটেকার',
  'পার্ট-টাইম ট্রাফিক সহায়ক',
  'হেল্পার – পেপার ও জার্নাল বিতরণ',
  'ইভেন্ট ফটোগ্রাফি হেল্পার',
  'লাইট / সাউন্ড সেটআপ হেল্পার',
  'মার্কেট / দোকান সেলস হেল্পার',
  'হেল্পার – পিকনিক / ট্যুর সেটআপ',
  'পার্ট-টাইম কার / বাইক ধোয়ার হেল্পার',
  'হেল্পার – হালকা কারিগরি কাজ'
];

const dhakaAreas = [
  'ঢাকা (১০০)', 'ঢাকা বিভাগ (১৩)', 'চট্টগ্রাম (৯)', 'খুলনা (১)', 'খুলনা বিভাগ (২)', 'আরও দেখান'
];

const dhakaMajorAreas = {
  'জনপ্রিয় এলাকাসমূহ': [
    'সমগ্র ঢাকা',
    'মিরপুর',
    'উত্তরা', 
    'সাভার',
    'মোহাম্মদপুর',
    'যাত্রাবাড়ি',
    'ধানমন্ডি',
    'গুলশান',
    'বনানী',
    'রমনা',
    'মতিঝিল',
    'পুরান ঢাকা',
    'লালবাগ',
    'কামরাঙ্গীরচর',
    'বাড্ডা',
    'রামপুরা',
    'তেজগাঁও',
    'খিলগাঁও',
    'শাহবাগ',
    'নিউমার্কেট'
  ],
  'উত্তর ঢাকা': [
    'উত্তরা',
    'মিরপুর',
    'কামরাঙ্গীরচর',
    'সাভার',
    'উত্তরা সেক্টর ১',
    'উত্তরা সেক্টর ২',
    'উত্তরা সেক্টর ৩',
    'উত্তরা সেক্টর ৪',
    'উত্তরা সেক্টর ৫',
    'উত্তরা সেক্টর ৬',
    'উত্তরা সেক্টর ৭',
    'উত্তরা সেক্টর ৮',
    'উত্তরা সেক্টর ৯',
    'উত্তরা সেক্টর ১০',
    'উত্তরা সেক্টর ১১',
    'উত্তরা সেক্টর ১২',
    'উত্তরা সেক্টর ১৩',
    'উত্তরা সেক্টর ১৪',
    'উত্তরা সেক্টর ১৫',
    'উত্তরা সেক্টর ১৬',
    'উত্তরা সেক্টর ১৭',
    'উত্তরা সেক্টর ১৮',
    'মিরপুর ১',
    'মিরপুর ২',
    'মিরপুর ৬',
    'মিরপুর ১০',
    'মিরপুর ১১',
    'মিরপুর ১২',
    'মিরপুর ১৩',
    'মিরপুর ১৪'
  ],
  'দক্ষিণ ঢাকা': [
    'ধানমন্ডি',
    'গুলশান',
    'বনানী',
    'রমনা',
    'মতিঝিল',
    'পুরান ঢাকা',
    'লালবাগ',
    'যাত্রাবাড়ি',
    'কামরাঙ্গীরচর',
    'বাড্ডা',
    'রামপুরা',
    'তেজগাঁও',
    'খিলগাঁও',
    'শাহবাগ',
    'নিউমার্কেট',
    'মোহাম্মদপুর',
    'আদাবর',
    'কলাবাগান',
    'বেইলি রোড',
    'ইস্কাটন',
    'মালিবাগ',
    'খিলগাঁও',
    'বাড্ডা',
    'রামপুরা',
    'তেজগাঁও',
    'খিলগাঁও',
    'শাহবাগ',
    'নিউমার্কেট',
    'মোহাম্মদপুর',
    'আদাবর',
    'কলাবাগান',
    'বেইলি রোড',
    'ইস্কাটন',
    'মালিবাগ'
  ],
  'পূর্ব ঢাকা': [
    'খিলগাঁও',
    'বাড্ডা',
    'রামপুরা',
    'তেজগাঁও',
    'খিলগাঁও',
    'শাহবাগ',
    'নিউমার্কেট',
    'মোহাম্মদপুর',
    'আদাবর',
    'কলাবাগান',
    'বেইলি রোড',
    'ইস্কাটন',
    'মালিবাগ',
    'খিলগাঁও',
    'বাড্ডা',
    'রামপুরা',
    'তেজগাঁও',
    'খিলগাঁও',
    'শাহবাগ',
    'নিউমার্কেট',
    'মোহাম্মদপুর',
    'আদাবর',
    'কলাবাগান',
    'বেইলি রোড',
    'ইস্কাটন',
    'মালিবাগ'
  ],
  'পশ্চিম ঢাকা': [
    'মিরপুর',
    'কামরাঙ্গীরচর',
    'সাভার',
    'মিরপুর ১',
    'মিরপুর ২',
    'মিরপুর ৬',
    'মিরপুর ১০',
    'মিরপুর ১১',
    'মিরপুর ১২',
    'মিরপুর ১৩',
    'মিরপুর ১৪',
    'কামরাঙ্গীরচর',
    'সাভার',
    'মিরপুর ১',
    'মিরপুর ২',
    'মিরপুর ৬',
    'মিরপুর ১০',
    'মিরপুর ১১',
    'মিরপুর ১২',
    'মিরপুর ১৩',
    'মিরপুর ১৪'
  ]
};

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
      title: 'কাস্টমার কেয়ার সার্ভিস - ৬ জন',
      category: 'sales',
      location: 'ঢাকা, মিরপুর',
      salary: '৮,০০০ - ১২,০০০',
      description: 'ই-কমার্স কোম্পানিতে কাস্টমার কেয়ার কাজ। ওয়েবসাইট ও ফেসবুক থেকে অর্ডার নেওয়া। ফোনে কাস্টমারের সাথে কথা বলা। কম্পিউটার বেসিক জানা আবশ্যক।',
      contactName: 'জশিম',
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
      title: 'বাসার কাজের লোক - ১ জন',
      category: 'domestic',
      location: 'ঢাকা, ধানমন্ডি',
      salary: '৮৫,০০০ - ৭,০০০',
      description: 'বাড়ি পরিষ্কার, রান্না, কাপড় ধোয়া। সকাল ৮টা থেকে দুপুর ২টা পর্যন্ত। সপ্তাহে ৬ দিন।',
      contactName: 'রহিমা বেগম',
      contactPhone: '০১৯১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 11, 17),
      duration: 'পার্ট-টাইম',
      postedBy: 'user3',
      isUrgent: true,
      isFeatured: true,
      applicants: 18,
      views: 95
    },
    {
      id: '4',
      title: 'দোকানের সহকারী - ২ জন',
      category: 'sales',
      location: 'ঢাকা, নিউমার্কেট',
      salary: '৮ ৬,০০০ - ৮,০০০',
      description: 'কাপড়ের দোকানে বিক্রয় সহকারী। গ্রাহক সেবা, পণ্য সাজানো, হিসাব রাখা। নতুনরাও আবেদন করতে পারেন।',
      contactName: 'আলম',
      contactPhone: '০১৫৫৫১২৩৪৫৬',
      postedDate: new Date(2024, 11, 15),
      duration: 'পূর্ণকালীন',
      postedBy: 'user5',
      applicants: 8,
      views: 45
    },
    {
      id: '5',
      title: 'বাচ্চা দেখাশোনা - ১ জন',
      category: 'domestic',
      location: 'ঢাকা, উত্তরা',
      salary: '৮ ৪,০০০ - ৬,০০০',
      description: '২ বছরের বাচ্চার দেখাশোনা। সকাল ৯টা থেকে বিকাল ৫টা। অভিজ্ঞ মহিলা প্রয়োজন।',
      contactName: 'ফাতেমা খাতুন',
      contactPhone: '০১৭৯৮৭৬৫৪৩২',
      postedDate: new Date(2024, 11, 14),
      duration: 'পার্ট-টাইম',
      postedBy: 'user6',
      isUrgent: true,
      applicants: 15,
      views: 89
    },
    {
      id: '6',
      title: 'গাড়ি ধোয়া - ২ জন',
      category: 'cleaning',
      location: 'ঢাকা, বাড্ডা',
      salary: '৮ ২০০ - ৩০০/গাড়ি',
      description: 'গাড়ি ধোয়ার কাজ। দিনে ৫-৮ টি গাড়ি। সকাল ৮টা থেকে বিকাল ৬টা।',
      contactName: 'রহিম উদ্দিন',
      contactPhone: '০১৮৯৮৭৬৫৪৩২',
      postedDate: new Date(2024, 11, 13),
      duration: 'পার্ট-টাইম',
      postedBy: 'user7',
      applicants: 6,
      views: 34
    },
    {
      id: '7',
      title: 'বাজার করা - ১ জন',
      category: 'domestic',
      location: 'ঢাকা, রমনা',
      salary: '৮ ৩০০ - ৫০০/দিন',
      description: 'বাজার করে আনা, রান্নার উপকরণ কেনা। সকাল ৭টা থেকে ৯টা। সপ্তাহে ৬ দিন।',
      contactName: 'নাসিরা বেগম',
      contactPhone: '০১৯৮৭৬৫৪৩২১',
      postedDate: new Date(2024, 11, 12),
      duration: 'পার্ট-টাইম',
      postedBy: 'user8',
      applicants: 4,
      views: 22
    },
    {
      id: '8',
      title: 'অফিস ক্লিনার - ১ জন',
      category: 'cleaning',
      location: 'ঢাকা, মতিঝিল',
      salary: '৮ ৪,০০০ - ৫,০০০',
      description: 'অফিস পরিষ্কার করা। সকাল ৭টা থেকে ১০টা। সপ্তাহে ৬ দিন।',
      contactName: 'আবুল হোসেন',
      contactPhone: '০১৭১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 11, 11),
      duration: 'পার্ট-টাইম',
      postedBy: 'user9',
      applicants: 7,
      views: 38
    },
    {
      id: '9',
      title: 'গার্ড - ১ জন',
      category: 'domestic',
      location: 'ঢাকা, বনানী',
      salary: '৮ ৮,০০০ - ১০,০০০',
      description: 'বাড়ির নিরাপত্তার জন্য গার্ড। রাত ১০টা থেকে সকাল ৬টা। সপ্তাহে ৬ দিন।',
      contactName: 'করিম উদ্দিন',
      contactPhone: '০১৮১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 11, 10),
      duration: 'পার্ট-টাইম',
      postedBy: 'user10',
      applicants: 9,
      views: 41
    },
    {
      id: '10',
      title: 'বাগান পরিচর্যা - ১ জন',
      category: 'domestic',
      location: 'ঢাকা, গুলশান',
      salary: '৮ ৩০০ - ৪০০/দিন',
      description: 'বাগান পরিষ্কার, গাছের পরিচর্যা, জল দেওয়া। সকাল ৮টা থেকে ১১টা। সপ্তাহে ৩ দিন।',
      contactName: 'মো. আলী',
      contactPhone: '০১৫৫৫১২৩৪৫৬',
      postedDate: new Date(2024, 11, 9),
      duration: 'পার্ট-টাইম',
      postedBy: 'user11',
      applicants: 3,
      views: 19
    },
    {
      id: '11',
      title: 'রেস্টুরেন্ট হেল্পার - ২ জন',
      category: 'food',
      location: 'ঢাকা, ধানমন্ডি',
      salary: '৮ ৫,০০০ - ৭,০০০',
      description: 'রেস্টুরেন্টে কাজ। অর্ডার নেওয়া, খাবার পরিবেশন। সকাল ১০টা থেকে রাত ১০টা।',
      contactName: 'রহিমা খাতুন',
      contactPhone: '০১৭৯৮৭৬৫৪৩২',
      postedDate: new Date(2024, 11, 8),
      duration: 'ফুল-টাইম',
      postedBy: 'user12',
      applicants: 12,
      views: 67
    },
    {
      id: '12',
      title: 'ক্যাশিয়ার - ১ জন',
      category: 'sales',
      location: 'ঢাকা, গুলশান',
      salary: '৮ ৭,০০০ - ৯,০০০',
      description: 'দোকানে ক্যাশিয়ার কাজ। বিক্রয়, হিসাব রাখা। সকাল ৯টা থেকে সন্ধ্যা ৭টা।',
      contactName: 'সালমা বেগম',
      contactPhone: '০১৮৭৬৫৪৩২১০',
      postedDate: new Date(2024, 11, 7),
      duration: 'ফুল-টাইম',
      postedBy: 'user13',
      applicants: 8,
      views: 43
    },
    {
      id: '13',
      title: 'সিকিউরিটি গার্ড - ৩ জন',
      category: 'security',
      location: 'ঢাকা, মিরপুর',
      salary: '৮ ৮,০০০ - ১০,০০০',
      description: 'বিল্ডিং নিরাপত্তা। ৮ ঘন্টা শিফট। সপ্তাহে ৬ দিন।',
      contactName: 'আবুল কালাম',
      contactPhone: '০১৯৮৭৬৫৪৩২১',
      postedDate: new Date(2024, 11, 6),
      duration: 'ফুল-টাইম',
      postedBy: 'user14',
      applicants: 15,
      views: 89
    },
    {
      id: '14',
      title: 'ডেলিভারি বয় - ৫ জন',
      category: 'delivery',
      location: 'ঢাকা, সব এলাকা',
      salary: '৮ ৪,০০০ - ৬,০০০',
      description: 'খাবার ডেলিভারি। মোটরসাইকেল চালাতে জানতে হবে। সকাল ১০টা থেকে রাত ১০টা।',
      contactName: 'করিম উদ্দিন',
      contactPhone: '০১৭১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 11, 5),
      duration: 'ফুল-টাইম',
      postedBy: 'user15',
      applicants: 22,
      views: 156
    },
    {
      id: '15',
      title: 'ক্লিনিং স্টাফ - ২ জন',
      category: 'cleaning',
      location: 'ঢাকা, মতিঝিল',
      salary: '৮ ৩,০০০ - ৪,০০০',
      description: 'অফিস পরিষ্কার। সকাল ৭টা থেকে ১১টা। সপ্তাহে ৬ দিন।',
      contactName: 'নাসিরা বেগম',
      contactPhone: '০১৮১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 11, 4),
      duration: 'পার্ট-টাইম',
      postedBy: 'user16',
      applicants: 9,
      views: 52
    },
    {
      id: '16',
      title: 'রিকশা চালক - ১ জন',
      category: 'transport',
      location: 'ঢাকা, পুরান ঢাকা',
      salary: '৮ ৫,০০০ - ৭,০০০',
      description: 'রিকশা চালানো। সকাল ৬টা থেকে রাত ১০টা। সপ্তাহে ৬ দিন।',
      contactName: 'মো. আলী',
      contactPhone: '০১৯৮৭৬৫৪৩২১',
      postedDate: new Date(2024, 11, 3),
      duration: 'ফুল-টাইম',
      postedBy: 'user17',
      applicants: 6,
      views: 34
    },
    {
      id: '17',
      title: 'কনস্ট্রাকশন হেল্পার - ৪ জন',
      category: 'construction',
      location: 'ঢাকা, উত্তরা',
      salary: '৮ ৬,০০০ - ৮,০০০',
      description: 'বিল্ডিং কাজে সাহায্য। ভারী কাজ। সকাল ৮টা থেকে সন্ধ্যা ৫টা।',
      contactName: 'আবুল হোসেন',
      contactPhone: '০১৭৯৮৭৬৫৪৩২',
      postedDate: new Date(2024, 11, 2),
      duration: 'ফুল-টাইম',
      postedBy: 'user18',
      applicants: 11,
      views: 78
    },
    {
      id: '18',
      title: 'গার্ডেনার - ১ জন',
      category: 'domestic',
      location: 'ঢাকা, ধানমন্ডি',
      salary: '৮ ৪,০০০ - ৫,০০০',
      description: 'বাগান পরিচর্যা। গাছপালা কাটা, জল দেওয়া। সকাল ৭টা থেকে ১১টা।',
      contactName: 'রহিম উদ্দিন',
      contactPhone: '০১৮৭৬৫৪৩২১০',
      postedDate: new Date(2024, 11, 1),
      duration: 'পার্ট-টাইম',
      postedBy: 'user19',
      applicants: 5,
      views: 29
    },
    {
      id: '19',
      title: 'কুক - ১ জন',
      category: 'food',
      location: 'ঢাকা, গুলশান',
      salary: '৮ ৮,০০০ - ১০,০০০',
      description: 'রান্না করা। বাঙালি খাবার জানতে হবে। সকাল ৮টা থেকে রাত ৮টা।',
      contactName: 'রহিমা খাতুন',
      contactPhone: '০১৯১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 10, 30),
      duration: 'ফুল-টাইম',
      postedBy: 'user20',
      applicants: 7,
      views: 41
    },
    {
      id: '20',
      title: 'সেলস এক্সিকিউটিভ - ৩ জন',
      category: 'sales',
      location: 'ঢাকা, ধানমন্ডি',
      salary: '৮ ১০,০০০ - ১৫,০০০',
      description: 'টেলিকম কোম্পানিতে সেলস কাজ। কাস্টমার সাথে কথা বলা, পণ্য বিক্রয়।',
      contactName: 'আবুল কালাম',
      contactPhone: '০১৭৯৮৭৬৫৪৩২',
      postedDate: new Date(2024, 10, 29),
      duration: 'ফুল-টাইম',
      postedBy: 'user21',
      applicants: 18,
      views: 95
    },
    {
      id: '21',
      title: 'ডেটা এন্ট্রি - ২ জন',
      category: 'admin',
      location: 'ঢাকা, মতিঝিল',
      salary: '৮ ৬,০০০ - ৮,০০০',
      description: 'কম্পিউটারে ডেটা এন্ট্রি। টাইপিং স্পিড ভালো হতে হবে। সকাল ৯টা থেকে সন্ধ্যা ৬টা।',
      contactName: 'সালমা বেগম',
      contactPhone: '০১৮৭৬৫৪৩২১০',
      postedDate: new Date(2024, 10, 28),
      duration: 'ফুল-টাইম',
      postedBy: 'user22',
      applicants: 14,
      views: 72
    },
    {
      id: '22',
      title: 'রিসেপশনিস্ট - ১ জন',
      category: 'admin',
      location: 'ঢাকা, গুলশান',
      salary: '৮ ৭,০০০ - ৯,০০০',
      description: 'অফিস রিসেপশন কাজ। ফোন রিসিভ করা, ভিজিটর রিসিভ করা। সকাল ৯টা থেকে সন্ধ্যা ৬টা।',
      contactName: 'রহিমা খাতুন',
      contactPhone: '০১৯১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 10, 27),
      duration: 'ফুল-টাইম',
      postedBy: 'user23',
      applicants: 9,
      views: 48
    },
    {
      id: '23',
      title: 'ক্লিনার - ২ জন',
      category: 'cleaning',
      location: 'ঢাকা, উত্তরা',
      salary: '৮ ৪,০০০ - ৫,০০০',
      description: 'বাড়ি পরিষ্কার। সকাল ৮টা থেকে ১২টা। সপ্তাহে ৬ দিন।',
      contactName: 'নাসিরা বেগম',
      contactPhone: '০১৮১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 10, 26),
      duration: 'পার্ট-টাইম',
      postedBy: 'user24',
      applicants: 6,
      views: 35
    },
    {
      id: '24',
      title: 'ড্রাইভার - ১ জন',
      category: 'transport',
      location: 'ঢাকা, মিরপুর',
      salary: '৮ ৮,০০০ - ১০,০০০',
      description: 'প্রাইভেট গাড়ি চালানো। লাইসেন্স থাকতে হবে। সকাল ৮টা থেকে সন্ধ্যা ৬টা।',
      contactName: 'করিম উদ্দিন',
      contactPhone: '০১৭১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 10, 25),
      duration: 'ফুল-টাইম',
      postedBy: 'user25',
      applicants: 12,
      views: 68
    },
    {
      id: '25',
      title: 'সিকিউরিটি গার্ড - ২ জন',
      category: 'security',
      location: 'ঢাকা, পুরান ঢাকা',
      salary: '৮ ৭,০০০ - ৯,০০০',
      description: 'শপিং মলের নিরাপত্তা। ৮ ঘন্টা শিফট। সপ্তাহে ৬ দিন।',
      contactName: 'আবুল হোসেন',
      contactPhone: '০১৭৯৮৭৬৫৪৩২',
      postedDate: new Date(2024, 10, 24),
      duration: 'ফুল-টাইম',
      postedBy: 'user26',
      applicants: 11,
      views: 59
    },
    {
      id: '26',
      title: 'কুক - ১ জন',
      category: 'food',
      location: 'ঢাকা, ধানমন্ডি',
      salary: '৮ ৬,০০০ - ৮,০০০',
      description: 'রেস্টুরেন্টে রান্না। চাইনিজ খাবার জানতে হবে। সকাল ১০টা থেকে রাত ১০টা।',
      contactName: 'রহিম উদ্দিন',
      contactPhone: '০১৮৭৬৫৪৩২১০',
      postedDate: new Date(2024, 10, 23),
      duration: 'ফুল-টাইম',
      postedBy: 'user27',
      applicants: 8,
      views: 44
    },
    {
      id: '27',
      title: 'ডেলিভারি বয় - ৩ জন',
      category: 'delivery',
      location: 'ঢাকা, সব এলাকা',
      salary: '৮ ৫,০০০ - ৭,০০০',
      description: 'ই-কমার্স ডেলিভারি। মোটরসাইকেল চালাতে জানতে হবে। সকাল ৯টা থেকে রাত ৯টা।',
      contactName: 'মো. আলী',
      contactPhone: '০১৯৮৭৬৫৪৩২১',
      postedDate: new Date(2024, 10, 22),
      duration: 'ফুল-টাইম',
      postedBy: 'user28',
      applicants: 16,
      views: 82
    },
    {
      id: '28',
      title: 'কনস্ট্রাকশন হেল্পার - ৩ জন',
      category: 'construction',
      location: 'ঢাকা, উত্তরা',
      salary: '৮ ৭,০০০ - ৯,০০০',
      description: 'বিল্ডিং কাজে সাহায্য। ভারী কাজ করতে হবে। সকাল ৮টা থেকে সন্ধ্যা ৫টা।',
      contactName: 'আবুল কালাম',
      contactPhone: '০১৯৮৭৬৫৪৩২১',
      postedDate: new Date(2024, 10, 21),
      duration: 'ফুল-টাইম',
      postedBy: 'user29',
      applicants: 13,
      views: 71
    },
    {
      id: '29',
      title: 'গার্ডেনার - ১ জন',
      category: 'domestic',
      location: 'ঢাকা, গুলশান',
      salary: '৮ ৫,০০০ - ৬,০০০',
      description: 'বাগান পরিচর্যা। গাছের পরিচর্যা, জল দেওয়া। সকাল ৭টা থেকে ১১টা।',
      contactName: 'রহিমা খাতুন',
      contactPhone: '০১৯১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 10, 20),
      duration: 'পার্ট-টাইম',
      postedBy: 'user30',
      applicants: 7,
      views: 38
    },
    {
      id: '30',
      title: 'ক্লিনিং স্টাফ - ২ জন',
      category: 'cleaning',
      location: 'ঢাকা, মতিঝিল',
      salary: '৮ ৪,০০০ - ৫,০০০',
      description: 'অফিস পরিষ্কার। সকাল ৭টা থেকে ১১টা। সপ্তাহে ৬ দিন।',
      contactName: 'নাসিরা বেগম',
      contactPhone: '০১৮১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 10, 19),
      duration: 'পার্ট-টাইম',
      postedBy: 'user31',
      applicants: 10,
      views: 52
    },
    {
      id: '31',
      title: 'রিকশা চালক - ২ জন',
      category: 'transport',
      location: 'ঢাকা, পুরান ঢাকা',
      salary: '৮ ৬,০০০ - ৮,০০০',
      description: 'রিকশা চালানো। সকাল ৬টা থেকে রাত ১০টা। সপ্তাহে ৬ দিন।',
      contactName: 'করিম উদ্দিন',
      contactPhone: '০১৭১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 10, 18),
      duration: 'ফুল-টাইম',
      postedBy: 'user32',
      applicants: 9,
      views: 47
    },
    {
      id: '32',
      title: 'সেলস এক্সিকিউটিভ - ২ জন',
      category: 'sales',
      location: 'ঢাকা, ধানমন্ডি',
      salary: '৮ ১২,০০০ - ১৮,০০০',
      description: 'ইনস্যুরেন্স কোম্পানিতে সেলস। কাস্টমার সাথে কথা বলা, পলিসি বিক্রয়।',
      contactName: 'সালমা বেগম',
      contactPhone: '০১৮৭৬৫৪৩২১০',
      postedDate: new Date(2024, 10, 17),
      duration: 'ফুল-টাইম',
      postedBy: 'user33',
      applicants: 15,
      views: 78
    },
    {
      id: '33',
      title: 'ডেটা এন্ট্রি - ১ জন',
      category: 'admin',
      location: 'ঢাকা, গুলশান',
      salary: '৮ ৭,০০০ - ৯,০০০',
      description: 'কম্পিউটারে ডেটা এন্ট্রি। টাইপিং স্পিড ভালো হতে হবে। সকাল ৯টা থেকে সন্ধ্যা ৬টা।',
      contactName: 'রহিম উদ্দিন',
      contactPhone: '০১৮৭৬৫৪৩২১০',
      postedDate: new Date(2024, 10, 16),
      duration: 'ফুল-টাইম',
      postedBy: 'user34',
      applicants: 12,
      views: 63
    },
    {
      id: '34',
      title: 'রিসেপশনিস্ট - ১ জন',
      category: 'admin',
      location: 'ঢাকা, মতিঝিল',
      salary: '৮ ৮,০০০ - ১০,০০০',
      description: 'হাসপাতাল রিসেপশন কাজ। ফোন রিসিভ করা, রোগী রিসিভ করা। সকাল ৯টা থেকে সন্ধ্যা ৬টা।',
      contactName: 'রহিমা খাতুন',
      contactPhone: '০১৯১২৩৪৫৬৭৮',
      postedDate: new Date(2024, 10, 15),
      duration: 'ফুল-টাইম',
      postedBy: 'user35',
      applicants: 11,
      views: 58
    }
  ]);

  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>([
    {
      id: 'sp1',
      businessName: 'রহিম প্লাম্বিং সার্ভিস',
      serviceCategory: 'plumbing',
      serviceDescription: 'বাড়ি-ঘরের সব ধরনের প্লাম্বিং সমস্যার সমাধান। পাইপ লিকেজ, টয়লেট মেরামত, গেইজার ইনস্টলেশন সহ সব ধরনের প্লাম্বিং কাজ।',
      location: 'ঢাকা, মিরপুর',
      areasServed: ['মিরপুর', 'ধানমন্ডি', 'গুলশান', 'বনানী'],
      contactName: 'মো. রহিম উদ্দিন',
      contactPhone: '০১৭১২৩৪৫৬৭৮',
      contactEmail: 'rahim.plumbing@email.com',
      rating: 4.8,
      totalServices: 156,
      priceRange: '৫০০ - ৩,০০০ টাকা',
      availability: 'সকাল ৮টা - সন্ধ্যা ৬টা',
      postedDate: new Date(2024, 11, 15),
      isVerified: true,
      isFeatured: true,
      workingHours: 'সকাল ৮টা - সন্ধ্যা ৬টা',
      experience: '৮ বছর'
    },
    {
      id: 'sp2',
      businessName: 'আলম ইলেকট্রিক্যাল',
      serviceCategory: 'electrical',
      serviceDescription: 'বৈদ্যুতিক সমস্যার সমাধান, নতুন ওয়্যারিং, ফ্যান-লাইট ইনস্টলেশন, বৈদ্যুতিক যন্ত্রপাতি মেরামত।',
      location: 'ঢাকা, উত্তরা',
      areasServed: ['উত্তরা', 'বাড্ডা', 'রামপুরা', 'বনানী'],
      contactName: 'ইঞ্জিনিয়ার আলম',
      contactPhone: '০১৮৯৮৭৬৫৪৩২',
      contactEmail: 'alm.electrical@email.com',
      rating: 4.9,
      totalServices: 203,
      priceRange: '৩০০ - ৫,০০০ টাকা',
      availability: '২৪/৭ জরুরি সেবা',
      postedDate: new Date(2024, 11, 14),
      isVerified: true,
      isFeatured: true,
      workingHours: 'সকাল ৭টা - রাত ১০টা',
      experience: '১২ বছর'
    },
    {
      id: 'sp3',
      businessName: 'ক্লিন মাস্টার্স',
      serviceCategory: 'cleaning',
      serviceDescription: 'বাড়ি-অফিস পরিষ্কার, কার্পেট ক্লিনিং, উইন্ডো ক্লিনিং, ডিপ ক্লিনিং সার্ভিস।',
      location: 'ঢাকা, ধানমন্ডি',
      areasServed: ['ধানমন্ডি', 'গুলশান', 'বনানী', 'রমনা'],
      contactName: 'রোকসানা বেগম',
      contactPhone: '০১৯১২৩৪৫৬৭৮',
      contactEmail: 'cleanmasters@email.com',
      rating: 4.7,
      totalServices: 89,
      priceRange: '১,০০০ - ৮,০০০ টাকা',
      availability: 'সকাল ৯টা - সন্ধ্যা ৭টা',
      postedDate: new Date(2024, 11, 13),
      isVerified: true,
      workingHours: 'সকাল ৯টা - সন্ধ্যা ৭টা',
      experience: '৫ বছর'
    },
    {
      id: 'sp4',
      businessName: 'সুপার ডেলিভারি',
      serviceCategory: 'delivery',
      serviceDescription: 'খাবার, প্যাকেজ, ডকুমেন্ট ডেলিভারি। মোটরসাইকেল ও ভ্যান সার্ভিস।',
      location: 'ঢাকা, মোহাম্মদপুর',
      areasServed: ['মোহাম্মদপুর', 'ধানমন্ডি', 'গুলশান', 'বনানী', 'রমনা'],
      contactName: 'করিম হোসেন',
      contactPhone: '০১৮১২৩৪৫৬৭৮',
      contactEmail: 'superdelivery@email.com',
      rating: 4.6,
      totalServices: 312,
      priceRange: '৫০ - ৫০০ টাকা',
      availability: '২৪/৭',
      postedDate: new Date(2024, 11, 12),
      isVerified: true,
      isFeatured: true,
      workingHours: '২৪/৭',
      experience: '৬ বছর'
    },
    {
      id: 'sp5',
      businessName: 'টেক হেল্প ডেস্ক',
      serviceCategory: 'internet',
      serviceDescription: 'ইন্টারনেট সমস্যা সমাধান, রাউটার সেটআপ, নেটওয়ার্ক কনফিগারেশন, ওয়াইফাই সমস্যা সমাধান।',
      location: 'ঢাকা, বাড্ডা',
      areasServed: ['বাড্ডা', 'রামপুরা', 'উত্তরা', 'বনানী'],
      contactName: 'সাকিব আহমেদ',
      contactPhone: '০১৭৯৮৭৬৫৪৩২',
      contactEmail: 'techhelp@email.com',
      rating: 4.8,
      totalServices: 127,
      priceRange: '৫০০ - ২,০০০ টাকা',
      availability: 'সকাল ১০টা - রাত ৮টা',
      postedDate: new Date(2024, 11, 11),
      isVerified: true,
      workingHours: 'সকাল ১০টা - রাত ৮টা',
      experience: '৪ বছর'
    },
    {
      id: 'sp6',
      businessName: 'হেলথ কেয়ার সলিউশন',
      serviceCategory: 'healthcare',
      serviceDescription: 'হোম নার্সিং, বয়স্কদের যত্ন, রোগী সেবা, মেডিকেল চেকআপ সহায়তা।',
      location: 'ঢাকা, গুলশান',
      areasServed: ['গুলশান', 'বনানী', 'ধানমন্ডি', 'রমনা'],
      contactName: 'ডা. ফাতেমা খাতুন',
      contactPhone: '০১৫৫৫১২৩৪৫৬',
      contactEmail: 'healthcare@email.com',
      rating: 4.9,
      totalServices: 78,
      priceRange: '২,০০০ - ১০,০০০ টাকা',
      availability: '২৪/৭ জরুরি',
      postedDate: new Date(2024, 11, 10),
      isVerified: true,
      isFeatured: true,
      workingHours: '২৪/৭',
      experience: '১০ বছর'
    },
    // Additional Plumbing Service
    {
      id: 'sp7',
      businessName: 'আল-আমিন প্লাম্বিং',
      serviceCategory: 'plumbing',
      serviceDescription: 'পাইপ লিকেজ, বাথরুম মেরামত, নতুন পাইপ সংযোগ, গেইজার ইনস্টলেশন।',
      location: 'ঢাকা, মিরপুর',
      areasServed: ['মিরপুর', 'উত্তরা', 'সাভার'],
      contactName: 'আল-আমিন',
      contactPhone: '০১৭১২৩৪৫৬৭৮',
      contactEmail: 'alamin@plumbing.com',
      rating: 4.7,
      totalServices: 120,
      priceRange: '৪০০ - ২,৫০০ টাকা',
      availability: 'সকাল ৮টা - সন্ধ্যা ৭টা',
      postedDate: new Date(2024, 11, 9),
      isVerified: true,
      workingHours: 'সকাল ৮টা - সন্ধ্যা ৭টা',
      experience: '৬ বছর'
    },
    // Additional Electrical Service
    {
      id: 'sp8',
      businessName: 'ইলেকট্রিক হাব',
      serviceCategory: 'electrical',
      serviceDescription: 'ফ্যান, লাইট, সুইচ মেরামত, নতুন বৈদ্যুতিক সংযোগ, ওয়্যারিং কাজ।',
      location: 'ঢাকা, বনানী',
      areasServed: ['বনানী', 'গুলশান', 'ধানমন্ডি'],
      contactName: 'করিম',
      contactPhone: '০১৫৫৫৫৫৫৫৫৫',
      rating: 4.5,
      totalServices: 95,
      priceRange: '২৫০ - ১,৫০০ টাকা',
      availability: 'সকাল ৯টা - সন্ধ্যা ৬টা',
      postedDate: new Date(2024, 11, 8),
      isVerified: true,
      workingHours: 'সকাল ৯টা - সন্ধ্যা ৬টা',
      experience: '৪ বছর'
    },
    // Additional Cleaning Service
    {
      id: 'sp9',
      businessName: 'স্পার্কল ক্লিন',
      serviceCategory: 'cleaning',
      serviceDescription: 'গৃহস্থালি পরিষ্কার-পরিচ্ছন্নতা, উইন্ডো ক্লিনিং, কার্পেট শ্যাম্পু।',
      location: 'ঢাকা, ধানমন্ডি',
      areasServed: ['ধানমন্ডি', 'গুলশান', 'রমনা'],
      contactName: 'রোকসানা',
      contactPhone: '০১৩৩৩৩৩৩৩৩৩',
      rating: 4.6,
      totalServices: 75,
      priceRange: '৮০০ - ৩,০০০ টাকা',
      availability: 'সকাল ৯টা - সন্ধ্যা ৬টা',
      postedDate: new Date(2024, 11, 7),
      isVerified: true,
      workingHours: 'সকাল ৯টা - সন্ধ্যা ৬টা',
      experience: '৫ বছর'
    },
    // Additional Delivery Service
    {
      id: 'sp10',
      businessName: 'কুইক কুরিয়ার',
      serviceCategory: 'delivery',
      serviceDescription: 'পার্সেল, দলিল, গুরুত্বপূর্ণ ডকুমেন্ট ডেলিভারি।',
      location: 'ঢাকা, মতিঝিল',
      areasServed: ['মতিঝিল', 'রমনা', 'পুরান ঢাকা', 'ধানমন্ডি'],
      contactName: 'আবুল',
      contactPhone: '০১৭৯৯৯৯৯৯৯৯',
      rating: 4.4,
      totalServices: 180,
      priceRange: '১০০ - ৬০০ টাকা',
      availability: 'সকাল ৮টা - সন্ধ্যা ৮টা',
      postedDate: new Date(2024, 11, 6),
      isVerified: true,
      workingHours: 'সকাল ৮টা - সন্ধ্যা ৮টা',
      experience: '৩ বছর'
    },
    // Additional Internet Service
    {
      id: 'sp11',
      businessName: 'নেটওয়ার্ক এক্সপার্ট',
      serviceCategory: 'internet',
      serviceDescription: 'ইন্টারনেট সমস্যা সমাধান, রাউটার সেটআপ, সাইবার সিকিউরিটি।',
      location: 'ঢাকা, উত্তরা',
      areasServed: ['উত্তরা', 'মিরপুর', 'সাভার'],
      contactName: 'রাকিব',
      contactPhone: '০১৭৭৭৭৭৭৭৭৭',
      rating: 4.6,
      totalServices: 60,
      priceRange: '৮০০ - ৪,০০০ টাকা',
      availability: 'সকাল ৯টা - সন্ধ্যা ৬টা',
      postedDate: new Date(2024, 11, 5),
      isVerified: true,
      workingHours: 'সকাল ৯টা - সন্ধ্যা ৬টা',
      experience: '৬ বছর'
    },
    // Additional Healthcare Service
    {
      id: 'sp12',
      businessName: 'ফ্যামিলি কেয়ার',
      serviceCategory: 'healthcare',
      serviceDescription: 'বাড়িতে ডাক্তার পরামর্শ, ওষুধ সরবরাহ, স্বাস্থ্য পরীক্ষা।',
      location: 'ঢাকা, গুলশান',
      areasServed: ['গুলশান', 'বনানী', 'ধানমন্ডি'],
      contactName: 'ডা. আহমেদ',
      contactPhone: '০১৪৪৪৪৪৪৪৪৪',
      rating: 4.8,
      totalServices: 85,
      priceRange: '১,৫০০ - ৭,০০০ টাকা',
      availability: 'সকাল ৯টা - সন্ধ্যা ৮টা',
      postedDate: new Date(2024, 11, 4),
      isVerified: true,
      workingHours: 'সকাল ৯টা - সন্ধ্যা ৮টা',
      experience: '৮ বছর'
    },
    // Transportation Services
    {
      id: 'sp13',
      businessName: 'সেফ রাইড',
      serviceCategory: 'transportation',
      serviceDescription: 'নিরাপদ পরিবহন সেবা। বিমানবন্দর, স্টেশন, শহরের যেকোনো স্থান।',
      location: 'ঢাকা, উত্তরা',
      areasServed: ['উত্তরা', 'মিরপুর', 'ধানমন্ডি', 'গুলশান'],
      contactName: 'আবুল কালাম',
      contactPhone: '০১৮৮৮৮৮৮৮৮৮',
      rating: 4.6,
      totalServices: 300,
      priceRange: '২০০ - ১,৫০০ টাকা',
      availability: '২৪/৭',
      postedDate: new Date(2024, 11, 3),
      isVerified: true,
      workingHours: '২৪/৭',
      experience: '৬ বছর'
    },
    {
      id: 'sp14',
      businessName: 'কমফোর্ট ক্যাব',
      serviceCategory: 'transportation',
      serviceDescription: 'আরামদায়ক গাড়ি ভাড়া, দীর্ঘ দূরত্বের যাত্রা, ট্যুর প্যাকেজ।',
      location: 'ঢাকা, ধানমন্ডি',
      areasServed: ['ধানমন্ডি', 'গুলশান', 'বনানী', 'রমনা'],
      contactName: 'করিম',
      contactPhone: '০১৫৫৫৫৫৫৫৫৫',
      rating: 4.5,
      totalServices: 150,
      priceRange: '৫০০ - ৩,০০০ টাকা',
      availability: 'সকাল ৬টা - রাত ১১টা',
      postedDate: new Date(2024, 11, 2),
      isVerified: true,
      workingHours: 'সকাল ৬টা - রাত ১১টা',
      experience: '৪ বছর'
    },
    // Legal Services
    {
      id: 'sp15',
      businessName: 'আইনি সহায়তা কেন্দ্র',
      serviceCategory: 'legal',
      serviceDescription: 'আইনি পরামর্শ, দলিল প্রস্তুত, আদালতের কাজ।',
      location: 'ঢাকা, রমনা',
      areasServed: ['রমনা', 'মতিঝিল', 'পুরান ঢাকা'],
      contactName: 'অ্যাডভোকেট রহমান',
      contactPhone: '০১৪৪৪৪৪৪৪৪৪',
      contactEmail: 'adv.rahman@legal.com',
      rating: 4.8,
      totalServices: 45,
      priceRange: '২,০০০ - ২০,০০০ টাকা',
      availability: 'সকাল ১০টা - সন্ধ্যা ৬টা',
      postedDate: new Date(2024, 11, 1),
      isVerified: true,
      workingHours: 'সকাল ১০টা - সন্ধ্যা ৬টা',
      experience: '১৫ বছর'
    },
    {
      id: 'sp16',
      businessName: 'লিগ্যাল সাপোর্ট',
      serviceCategory: 'legal',
      serviceDescription: 'বিবাহ নিবন্ধন, দলিল প্রস্তুত, সম্পত্তি নিবন্ধন সহায়তা।',
      location: 'ঢাকা, গুলশান',
      areasServed: ['গুলশান', 'বনানী', 'ধানমন্ডি'],
      contactName: 'অ্যাডভোকেট ফাতেমা',
      contactPhone: '০১৬৭৮৯০১২৩৪',
      rating: 4.7,
      totalServices: 65,
      priceRange: '১,৫০০ - ১৫,০০০ টাকা',
      availability: 'সকাল ৯টা - সন্ধ্যা ৭টা',
      postedDate: new Date(2024, 10, 30),
      isVerified: true,
      workingHours: 'সকাল ৯টা - সন্ধ্যা ৭টা',
      experience: '১২ বছর'
    },
    // Education Services
    {
      id: 'sp17',
      businessName: 'ব্রিলিয়ান্ট টিউশন',
      serviceCategory: 'education',
      serviceDescription: 'বাড়িতে প্রাইভেট টিউশন। সব বিষয়, সব ক্লাস।',
      location: 'ঢাকা, ধানমন্ডি',
      areasServed: ['ধানমন্ডি', 'গুলশান', 'বনানী', 'রমনা'],
      contactName: 'সালমা আক্তার',
      contactPhone: '০১৯০০০০০০০০',
      contactEmail: 'salma@tution.com',
      rating: 4.7,
      totalServices: 80,
      priceRange: '৫০০ - ২,০০০ টাকা',
      availability: 'সকাল ৪টা - রাত ৯টা',
      postedDate: new Date(2024, 10, 29),
      isVerified: true,
      workingHours: 'সকাল ৪টা - রাত ৯টা',
      experience: '৮ বছর'
    },
    {
      id: 'sp18',
      businessName: 'এডুকেশন হাব',
      serviceCategory: 'education',
      serviceDescription: 'অনলাইন ও অফলাইন শিক্ষা, ভাষা শিক্ষা, কম্পিউটার প্রশিক্ষণ।',
      location: 'ঢাকা, বনানী',
      areasServed: ['বনানী', 'গুলশান', 'ধানমন্ডি'],
      contactName: 'রাকিব',
      contactPhone: '০১৭৭৭৭৭৭৭৭৭',
      rating: 4.6,
      totalServices: 95,
      priceRange: '৩০০ - ২,৫০০ টাকা',
      availability: 'সকাল ৯টা - সন্ধ্যা ৮টা',
      postedDate: new Date(2024, 10, 28),
      isVerified: true,
      workingHours: 'সকাল ৯টা - সন্ধ্যা ৮টা',
      experience: '৬ বছর'
    },
    // Repair Services
    {
      id: 'sp19',
      businessName: 'কুইক রিপেয়ার',
      serviceCategory: 'repair',
      serviceDescription: 'মোবাইল, ল্যাপটপ, কম্পিউটার মেরামত। বাড়িতে সার্ভিস।',
      location: 'ঢাকা, তেজগাঁও',
      areasServed: ['তেজগাঁও', 'ধানমন্ডি', 'গুলশান', 'বনানী'],
      contactName: 'রাকিব',
      contactPhone: '০১৭৭৭৭৭৭৭৭৭',
      contactEmail: 'rakib@repair.com',
      rating: 4.5,
      totalServices: 180,
      priceRange: '২০০ - ৩,০০০ টাকা',
      availability: 'সকাল ১০টা - সন্ধ্যা ৮টা',
      postedDate: new Date(2024, 10, 27),
      isVerified: true,
      workingHours: 'সকাল ১০টা - সন্ধ্যা ৮টা',
      experience: '৫ বছর'
    },
    {
      id: 'sp20',
      businessName: 'গ্যাজেট ফিক্স',
      serviceCategory: 'repair',
      serviceDescription: 'স্মার্টফোন, ট্যাবলেট, ইলেকট্রনিক যন্ত্রপাতি মেরামত।',
      location: 'ঢাকা, মিরপুর',
      areasServed: ['মিরপুর', 'উত্তরা', 'সাভার'],
      contactName: 'সাকিব',
      contactPhone: '০১৭৯৯৯৯৯৯৯৯',
      rating: 4.4,
      totalServices: 140,
      priceRange: '১৫০ - ২,৫০০ টাকা',
      availability: 'সকাল ৯টা - সন্ধ্যা ৭টা',
      postedDate: new Date(2024, 10, 26),
      isVerified: true,
      workingHours: 'সকাল ৯টা - সন্ধ্যা ৭টা',
      experience: '৪ বছর'
    }
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      postId: '1',
      postType: 'job',
      authorName: 'আহমেদ হোসেন',
      authorPhone: '০১৭১২৩৪৫৬৭৮',
      content: 'ভালো কাজের সুযোগ। আমি এই কাজে আগ্রহী। যোগাযোগ করবো।',
      postedDate: new Date(2024, 11, 18),
      isVerified: true,
      rating: 5
    },
    {
      id: 'c2',
      postId: '1',
      postType: 'job',
      authorName: 'রোকসানা বেগম',
      authorPhone: '০১৯৮৭৬৫৪৩২১',
      content: 'আমার ৩ বছরের অভিজ্ঞতা আছে। কখন যোগাযোগ করতে পারি?',
      postedDate: new Date(2024, 11, 17),
      isVerified: false,
      rating: 4
    },
    {
      id: 'c3',
      postId: 'sp1',
      postType: 'service',
      authorName: 'করিম উদ্দিন',
      authorPhone: '০১৮১২৩৪৫৬৭৮',
      content: 'রহিম ভাইয়ের সেবা খুব ভালো। আমার বাড়ির প্লাম্বিং সমস্যা দ্রুত সমাধান করেছেন।',
      postedDate: new Date(2024, 11, 16),
      isVerified: true,
      rating: 5
    },
    {
      id: 'c4',
      postId: 'sp2',
      postType: 'service',
      authorName: 'ফাতেমা খাতুন',
      authorPhone: '০১৫৫৫১২৩৪৫৬',
      content: 'আলম ইলেকট্রিক্যালের সেবা চমৎকার। বৈদ্যুতিক সমস্যা নিয়ে আর চিন্তা নেই।',
      postedDate: new Date(2024, 11, 15),
      isVerified: true,
      rating: 5
    },
    {
      id: 'c5',
      postId: 'sp3',
      postType: 'service',
      authorName: 'নাসির আহমেদ',
      authorPhone: '০১৭৯৮৭৬৫৪৩২',
      content: 'ক্লিন মাস্টার্সের পরিষ্কার-পরিচ্ছন্নতার সেবা অসাধারণ। অফিস পরিষ্কার করিয়েছি।',
      postedDate: new Date(2024, 11, 14),
      isVerified: false,
      rating: 4
    }
  ]);

  const [currentView, setCurrentView] = useState<'landing' | 'browse' | 'profile' | 'jobForm' | 'jobDetail' | 'editProfile' | 'services' | 'serviceDetail'>('landing');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceProvider | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [newComment, setNewComment] = useState({
    authorName: '',
    authorPhone: '',
    authorEmail: '',
    content: '',
    rating: 5
  });
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState('');
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{label: string, path: string}>>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  
  // Services pagination state
  const [currentServicesPage, setCurrentServicesPage] = useState(1);
  const [servicesItemsPerPage] = useState(30);
  
  const [newJob, setNewJob] = useState({
    title: '',
    category: '',
    location: '',
    salary: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
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

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLocation]);

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

  // Services pagination logic
  const totalServicesPages = Math.ceil(filteredServices.length / servicesItemsPerPage);
  const servicesStartIndex = (currentServicesPage - 1) * servicesItemsPerPage;
  const servicesEndIndex = servicesStartIndex + servicesItemsPerPage;
  const paginatedServices = filteredServices.slice(servicesStartIndex, servicesEndIndex);

  // Reset services pagination when filters change
  React.useEffect(() => {
    setCurrentServicesPage(1);
  }, [searchTerm, selectedCategory, selectedLocation]);

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
      contactName: '', contactPhone: '', contactEmail: '', duration: '', isUrgent: false, isFeatured: false 
    });
    setCurrentView('browse');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('profile');
  };

  const handleSubmitComment = (e: React.FormEvent, postId: string, postType: 'job' | 'service') => {
    e.preventDefault();
    if (!newComment.authorName.trim() || !newComment.content.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      postType,
      authorName: newComment.authorName,
      authorPhone: newComment.authorPhone,
      content: newComment.content,
      postedDate: new Date(),
      rating: newComment.rating
    };
    
    setComments([comment, ...comments]);
    setNewComment({ authorName: '', authorPhone: '', authorEmail: '', content: '', rating: 5 });
  };

  const getCommentsForPost = (postId: string, postType: 'job' | 'service') => {
    return comments.filter(comment => comment.postId === postId && comment.postType === postType);
  };

  const Breadcrumb = () => {
    if (breadcrumbs.length === 0) return null;
    
    return (
      <div className="bg-gray-50 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <nav className="flex items-center space-x-3 text-base lg:text-lg text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-3 text-gray-400 text-lg">›</span>}
                <button
                  onClick={() => {
                    if (crumb.path === 'landing') {
                      setCurrentView('landing');
                      setBreadcrumbs([]);
                    } else if (crumb.path === 'browse') {
                      setCurrentView('browse');
                      setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}]);
                    } else if (crumb.path === 'services') {
                      setCurrentView('services');
                      setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}]);
                    } else if (crumb.path === 'profile') {
                      setCurrentView('profile');
                      setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'প্রোফাইল', path: 'profile'}]);
                    } else if (crumb.path === 'editProfile') {
                      setCurrentView('editProfile');
                      setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'প্রোফাইল', path: 'profile'}, {label: 'প্রোফাইল সম্পাদনা', path: 'editProfile'}]);
                    } else if (crumb.path === 'jobDetail') {
                      setCurrentView('browse');
                      setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}]);
                    } else if (crumb.path === 'serviceDetail') {
                      setCurrentView('services');
                      setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}]);
                    }
                  }}
                  className={`hover:text-blue-600 transition-colors py-2 px-2 rounded ${
                    index === breadcrumbs.length - 1 ? 'text-gray-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {crumb.label}
                </button>
              </div>
            ))}
          </nav>
        </div>
      </div>
    );
  };

  const Navbar = () => {
    return (
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setCurrentView('landing');
                  setBreadcrumbs([]);
                }}
                className="group"
              >
                <div className="text-left">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    Kuchra Jobs
                  </h1>
                  <p className="text-xs text-gray-500 hidden lg:block">দৈনন্দিন কাজের সহজ ঠিকানা</p>
                </div>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
              <button
                onClick={() => {
                  setCurrentView('services');
                  setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}]);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm lg:text-base group"
              >
                <Settings className="h-4 w-4 lg:h-5 lg:w-5 group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline font-medium">সেবাসমূহ</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentView('browse');
                  setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}]);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm lg:text-base group"
              >
                <Briefcase className="h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-medium">কাজ খুঁজুন</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentView('profile');
                  setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'প্রোফাইল', path: 'profile'}]);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm lg:text-base group"
              >
                <User className="h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-medium">প্রোফাইল</span>
              </button>
              
              <div className="hidden lg:block w-px h-8 bg-gray-300 mx-2"></div>
              
              <button
                onClick={() => {
                  setCurrentView('jobForm');
                  setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'কাজ পোস্ট করুন', path: 'jobForm'}]);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm lg:text-base font-semibold shadow-md hover:shadow-lg flex items-center gap-2 group"
              >
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                <span>কাজ পোস্ট করুন</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  };

  const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Kuchra Jobs</h3>
              <p className="text-gray-400 text-sm mb-4">
                বাংলাদেশের দৈনন্দিন কাজের সহজ ঠিকানা। আপনার প্রয়োজনীয় কাজ খুঁজুন বা সেবা প্রদান করুন।
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span>ইমেইল:</span>
                  <span>info@kuchrajobs.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>ফোন:</span>
                  <span>+৮৮০ ১৭১২৩৪৫৬৭৮</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>ঠিকানা:</span>
                  <span>ঢাকা, বাংলাদেশ</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">সেবাসমূহ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">গৃহস্থালি কাজ</button></li>
                <li><button className="hover:text-white transition-colors text-left">ডেলিভারি সেবা</button></li>
                <li><button className="hover:text-white transition-colors text-left">শিক্ষা সেবা</button></li>
                <li><button className="hover:text-white transition-colors text-left">স্বাস্থ্যসেবা</button></li>
                <li><button className="hover:text-white transition-colors text-left">প্লাম্বিং সেবা</button></li>
                <li><button className="hover:text-white transition-colors text-left">বৈদ্যুতিক সেবা</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">কাজের ধরন</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">পার্ট-টাইম</button></li>
                <li><button className="hover:text-white transition-colors text-left">পূর্ণকালীন</button></li>
                <li><button className="hover:text-white transition-colors text-left">প্রজেক্ট বেসড</button></li>
                <li><button className="hover:text-white transition-colors text-left">রিমোট</button></li>
                <li><button className="hover:text-white transition-colors text-left">দৈনিক কাজ</button></li>
                <li><button className="hover:text-white transition-colors text-left">সাপ্তাহিক কাজ</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">বিক্রেতাদের জন্য</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">দ্রুত বিক্রি করুন</button></li>
                <li><button className="hover:text-white transition-colors text-left">মেম্বারশিপ</button></li>
                <li><button className="hover:text-white transition-colors text-left">ব্যানার বিজ্ঞাপন</button></li>
                <li><button className="hover:text-white transition-colors text-left">অ্যাড বুস্ট</button></li>
                <li><button className="hover:text-white transition-colors text-left">প্রিমিয়াম প্যাকেজ</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">সহায়তা</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors text-left">হেল্প ও সাপোর্ট</button></li>
                <li><button className="hover:text-white transition-colors text-left">প্রশ্ন-উত্তর</button></li>
                <li><button className="hover:text-white transition-colors text-left">নিরাপদ থাকুন</button></li>
                <li><button className="hover:text-white transition-colors text-left">আমাদের কথা</button></li>
                <li><button className="hover:text-white transition-colors text-left">পেশা</button></li>
                <li><button className="hover:text-white transition-colors text-left">সাইটম্যাপ</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-400">
                <p>&copy; ২০২৪ Kuchra Jobs. সকল অধিকার সংরক্ষিত।</p>
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <button className="hover:text-white transition-colors">শর্তাবলী এবং নীতিমালা</button>
                <button className="hover:text-white transition-colors">গোপনীয়তার নীতিমালা</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  const LocationModal = () => {
    const filteredAreas = Object.entries(dhakaMajorAreas).reduce((acc, [category, areas]) => {
      const filtered = areas.filter(area => 
        area.toLowerCase().includes(locationSearchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    }, {} as Record<string, string[]>);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">অবস্থান নির্বাচন করুন</h2>
            <button
              onClick={() => setShowLocationModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          
          <div className="flex h-96">
            {/* Left Panel - Categories */}
            <div className="w-1/3 border-r overflow-y-auto">
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-3">শহর বা বিভাগ নির্বাচন করুন</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedLocation('সমগ্র ঢাকা');
                      if (currentView === 'jobForm') {
                        setNewJob({...newJob, location: 'সমগ্র ঢাকা'});
                      }
                      setShowLocationModal(false);
                    }}
                    className="w-full text-left p-2 hover:bg-blue-50 rounded"
                  >
                    সমগ্র ঢাকা
                  </button>
                  {Object.keys(dhakaMajorAreas).map(category => (
                    <button
                      key={category}
                      className="w-full text-left p-2 hover:bg-blue-50 rounded flex items-center justify-between"
                    >
                      <span>{category}</span>
                      <span>→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Panel - Areas */}
            <div className="w-2/3 overflow-y-auto">
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-3">ঢাকা-এর মধ্যে একটি স্থানীয় এলাকা নির্বাচন করুন</h3>
                
                {/* Search Bar */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="অন্যান্য এলাকা (A-Z)"
                      value={locationSearchTerm}
                      onChange={(e) => setLocationSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
                
                {/* Popular Areas */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">জনপ্রিয় এলাকাসমূহ</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {dhakaMajorAreas['জনপ্রিয় এলাকাসমূহ'].map(area => (
                      <button
                        key={area}
                        onClick={() => {
                          setSelectedLocation(area);
                          if (currentView === 'jobForm') {
                            setNewJob({...newJob, location: area});
                          }
                          setShowLocationModal(false);
                        }}
                        className="text-left p-2 hover:bg-blue-50 rounded flex items-center justify-between"
                      >
                        <span>{area}</span>
                        <span>→</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Other Areas */}
                {Object.entries(filteredAreas).map(([category, areas]) => (
                  <div key={category} className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {areas.map(area => (
                        <button
                          key={area}
                          onClick={() => {
                            setSelectedLocation(area);
                            if (currentView === 'jobForm') {
                              setNewJob({...newJob, location: area});
                            }
                            setShowLocationModal(false);
                          }}
                          className="text-left p-2 hover:bg-blue-50 rounded text-sm"
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CommentSection = ({ postId, postType }: { postId: string, postType: 'job' | 'service' }) => {
    const postComments = getCommentsForPost(postId, postType);
    
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">মন্তব্য ({postComments.length})</h3>
        
        {/* Comment Form */}
        <div className="bg-gray-50 rounded-lg p-4 lg:p-6 mb-6">
          <h4 className="text-md font-medium text-gray-800 mb-4">মন্তব্য করুন</h4>
          <form onSubmit={(e) => handleSubmitComment(e, postId, postType)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  value={newComment.authorName}
                  onChange={(e) => setNewComment({...newComment, authorName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="আপনার নাম লিখুন"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ফোন নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={newComment.authorPhone}
                  onChange={(e) => setNewComment({...newComment, authorPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="০১৭১২৩৪৫৬৭৮"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল (ঐচ্ছিক)</label>
              <input
                type="email"
                value={newComment.authorEmail || ''}
                onChange={(e) => setNewComment({...newComment, authorEmail: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="আপনার ইমেইল ঠিকানা"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">মন্তব্য *</label>
              <textarea
                required
                rows={3}
                value={newComment.content}
                onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="আপনার মন্তব্য লিখুন..."
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">রেটিং</label>
                <select
                  value={newComment.rating}
                  onChange={(e) => setNewComment({...newComment, rating: parseInt(e.target.value)})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value={5}>৫ ⭐ (চমৎকার)</option>
                  <option value={4}>৪ ⭐ (ভালো)</option>
                  <option value={3}>৩ ⭐ (মাঝারি)</option>
                  <option value={2}>২ ⭐ (খারাপ)</option>
                  <option value={1}>১ ⭐ (খুব খারাপ)</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                মন্তব্য পোস্ট করুন
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {postComments.map(comment => (
            <div key={comment.id} className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{comment.authorName}</span>
                      {comment.isVerified && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">যাচাইকৃত</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{comment.postedDate.toLocaleDateString('bn-BD')}</div>
                  </div>
                </div>
                {comment.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-sm font-medium">{comment.rating}/৫</span>
                  </div>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed">{comment.content}</p>
              {comment.authorPhone && (
                <div className="mt-2 text-xs text-gray-500">
                  যোগাযোগ: {comment.authorPhone}
                </div>
              )}
            </div>
          ))}
          
          {postComments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>এখনো কোন মন্তব্য নেই। প্রথম মন্তব্য করুন!</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} এর মধ্যে {filteredJobs.length} টি ফলাফল
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            পূর্ববর্তী
          </button>
          
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            পরবর্তী
          </button>
        </div>
      </div>
    );
  };

  const ServicesPagination = () => {
    if (totalServicesPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalServicesPages <= maxVisiblePages) {
        for (let i = 1; i <= totalServicesPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentServicesPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalServicesPages);
        } else if (currentServicesPage >= totalServicesPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalServicesPages - 3; i <= totalServicesPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentServicesPage - 1; i <= currentServicesPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalServicesPages);
        }
      }
      
      return pages;
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {servicesStartIndex + 1}-{Math.min(servicesEndIndex, filteredServices.length)} এর মধ্যে {filteredServices.length} টি সেবা
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentServicesPage(prev => Math.max(1, prev - 1))}
            disabled={currentServicesPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            পূর্ববর্তী
          </button>
          
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentServicesPage(page)}
                disabled={page === '...'}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  page === currentServicesPage
                    ? 'bg-blue-600 text-white'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentServicesPage(prev => Math.min(totalServicesPages, prev + 1))}
            disabled={currentServicesPage === totalServicesPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            পরবর্তী
          </button>
        </div>
      </div>
    );
  };

  const getCategoryInfo = (categoryId: string) => {
    if (categoryId === 'others') {
      return { id: 'others', name: 'ডে / পার্ট-টাইম জব – বাংলাদেশ', icon: ShoppingBag, color: 'bg-pink-100 text-pink-700' };
    }
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

  // Services View
  if (currentView === 'services') {
    const categoryInfo = getCategoryInfo(selectedCategory);
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumb />
        
        {/* Hero Section for Services */}
        <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/img/services.jpg')`
            }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              আপনার সার্ভিসগুলো যোগ করুন
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
              আপনার দক্ষতা এবং সেবা অন্যদের সাথে শেয়ার করুন এবং আয় করুন
            </p>
              </div>
        </div>

        {/* Service Categories or Selected Category Services */}
        <div className="container mx-auto px-4 py-12">
          {!selectedCategory ? (
            /* Show all service categories when no specific category is selected */
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">সেবার ধরন</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {jobCategories.map(category => {
                  const Icon = category.icon;
                  return (
                <button
                      key={category.id}
                      onClick={() => {
                        if (category.id === 'others') {
                          setSelectedCategory('others');
                          setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}, {label: 'অন্যান্য', path: 'services'}]);
                        } else {
                          setSelectedCategory(category.id);
                          setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}, {label: category.name, path: 'services'}]);
                        }
                      }}
                      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center group border border-gray-200"
                    >
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm">{category.name}</h3>
                </button>
                  );
                })}
              </div>
              
              {/* All Services Section */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">সব ধরনের সেবা</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  {serviceTypes.map((serviceType, index) => (
                    <button
                      key={index}
                      className="text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <span className="text-sm text-gray-700">{serviceType}</span>
                    </button>
                  ))}
                </div>
                
                {/* Service Listings */}
                <div className="space-y-4">
                  {paginatedServices.map(service => (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}, {label: service.businessName, path: 'serviceDetail'}]);
                      }}
                      className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div className="flex items-start gap-3 lg:gap-4 flex-1 w-full sm:w-auto">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              {(() => {
                                const categoryInfo = getCategoryInfo(service.serviceCategory);
                                if (categoryInfo && categoryInfo.icon) {
                                  const IconComponent = categoryInfo.icon;
                                  return <IconComponent className="h-6 w-6 lg:h-8 lg:w-8 text-gray-400" />;
                                }
                                return null;
                              })()}
                            </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {service.isVerified && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">যাচাইকৃত</span>
                              )}
                              {service.isFeatured && (
                                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">ফিচারড</span>
                              )}
                            </div>
                            <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 line-clamp-2">
                              {service.businessName}
                            </h3>
                            <div className="text-sm text-gray-600 mb-2">{service.contactName}</div>
                            <div className="text-base lg:text-lg font-bold text-blue-600 mb-2">{service.priceRange}</div>
                            <div className="text-sm text-gray-600 mb-1">{service.location}</div>
                            <div className="text-xs text-gray-500 mb-2">
                              সেবা প্রদান এলাকা: {service.areasServed.join(', ')}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current text-yellow-500" />
                                {service.rating}/৫.০
                              </span>
                              <span>{service.totalServices} সেবা</span>
                              <span>{service.experience} অভিজ্ঞতা</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
                          <div className="text-xs text-gray-500">
                            {service.postedDate.toLocaleDateString('bn-BD')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredServices.length === 0 && (
                  <div className="text-center py-12">
                    <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">কোন সেবা পাওয়া যায়নি</h3>
                    <p className="text-gray-600">আপনার অনুসন্ধানের মানদণ্ড পরিবর্তন করে আবার চেষ্টা করুন।</p>
                  </div>
                )}

                {/* Pagination for all services */}
                <ServicesPagination />
              </div>
            </div>
          ) : (
            /* Show services for the selected category */
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{categoryInfo?.name}</h2>
                  <p className="text-gray-600 mt-2">এই ক্যাটেগরিতে {filteredServices.length}টি সেবা পাওয়া যাচ্ছে</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}]);
                  }}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  ← সব সেবা দেখুন
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedServices.map(service => (
                  <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{service.businessName}</h3>
                          <p className="text-sm text-gray-600">{service.serviceType}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{service.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{service.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{service.contactPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{service.workingHours}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">{service.priceRange}</span>
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}, {label: categoryInfo?.name || '', path: 'services'}, {label: service.businessName, path: 'serviceDetail'}]);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          বিস্তারিত দেখুন
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination for category services */}
              <ServicesPagination />
            </div>
          )}
        </div>


        {/* Floating Action Button */}
                <button
                  onClick={() => setCurrentView('jobForm')}
          className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 bg-blue-600 text-white p-3 lg:p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
                >
          <Plus className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>

        {/* Location Modal */}
        {showLocationModal && <LocationModal />}
        <Footer />
              </div>
    );
  }

  // Service Detail View
  if (selectedService) {
    const categoryInfo = getCategoryInfo(selectedService.serviceCategory);
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumb />
        
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => {
                setSelectedService(null);
                setCurrentView('services');
                setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}]);
              }}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-2"
            >
              ← সেবার তালিকায় ফিরুন
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">সেবার বিস্তারিত</h1>
            </div>
          </div>
        
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row items-start justify-between mb-4 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {selectedService.isVerified && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">যাচাইকৃত</span>
                  )}
                  {selectedService.isFeatured && (
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">ফিচারড</span>
                  )}
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{selectedService.businessName}</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedService.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedService.workingHours}
                  </span>
                </div>
              </div>
              <div className="text-left lg:text-right w-full lg:w-auto">
                <div className="text-xl lg:text-2xl font-bold text-blue-600">{selectedService.priceRange}</div>
                <div className="text-sm text-gray-500">
                  {selectedService.totalServices} সেবা প্রদান করেছেন
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">সেবার বিবরণ</h3>
              <p className="text-gray-700 leading-relaxed">{selectedService.serviceDescription}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">সেবা প্রদান এলাকা</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedService.areasServed.map((area, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">সেবার তথ্য</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">অভিজ্ঞতা:</span>
                    <span className="font-medium">{selectedService.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">রেটিং:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      {selectedService.rating}/৫.০
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">সর্বমোট সেবা:</span>
                    <span className="font-medium">{selectedService.totalServices}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">যোগাযোগের তথ্য</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{selectedService.contactName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{selectedService.contactPhone}</span>
                </div>
                {selectedService.contactEmail && (
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700">{selectedService.contactEmail}</span>
                  </div>
                )}
              </div>
              <button className="mt-4 bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                এই সেবার জন্য যোগাযোগ করুন
              </button>
            </div>
            
            {/* Comments Section */}
            <CommentSection postId={selectedService.id} postType="service" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Section */}
        <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/img/hero.jpg')`
            }}
          />
          
          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
              দৈনন্দিন কাজের সহজ ঠিকানা
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-gray-200 drop-shadow-md">
              গৃহস্থালি, ডেলিভারি, শিক্ষকতা, নির্মাণ এবং আরও অনেক কাজের জন্য পোস্ট করুন এবং ব্রাউজ করুন
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg p-2 shadow-xl">
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
                  onClick={() => {
                    setCurrentView('browse');
                    setBreadcrumbs([
                      {label: 'হোমপেজ', path: 'landing'}, 
                      {label: 'সকল কাজ', path: 'browse'},
                      ...(searchTerm ? [{label: `"${searchTerm}" এর ফলাফল`, path: 'search'}] : [])
                    ]);
                  }}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Search className="h-5 w-5" />
                  খুঁজুন
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="text-center mb-8">
            <button
              onClick={() => {
                setSelectedCategory('');
                setCurrentView('services');
                setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}]);
              }}
              className="text-2xl lg:text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              সেবাসমূহ
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {jobCategories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                  setCurrentView('services');
                  setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সেবাসমূহ', path: 'services'}, {label: category.name, path: 'services'}]);
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
                    setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}, {label: job.title, path: 'jobDetail'}]);
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

        <Footer />
      </div>
    );
  }

  // Profile View
  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumb />
        
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button 
                onClick={() => {
                  setCurrentView('landing');
                  setBreadcrumbs([]);
                }}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                ← হোমে ফিরুন
              </button>
              <button
                onClick={() => {
                  setCurrentView('editProfile');
                  setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'প্রোফাইল', path: 'profile'}, {label: 'প্রোফাইল সম্পাদনা', path: 'editProfile'}]);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Edit3 className="h-4 w-4" />
                প্রোফাইল সম্পাদনা
              </button>
            </div>
          </div>
        </div>
        
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
        <Footer />
      </div>
    );
  }

  // Edit Profile View
  if (currentView === 'editProfile') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumb />
        
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button 
                onClick={() => {
                  setCurrentView('profile');
                  setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'প্রোফাইল', path: 'profile'}]);
                }}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              ← প্রোফাইলে ফিরুন
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">প্রোফাইল সম্পাদনা</h1>
          </div>
          </div>
        </div>
        
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
        <Footer />
      </div>
    );
  }

  // Job Detail View
  if (selectedJob) {
    const categoryInfo = getCategoryInfo(selectedJob.category);
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumb />
        
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => {
                setSelectedJob(null);
                setCurrentView('browse');
                setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}]);
              }}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-2"
            >
              ← কাজের তালিকায় ফিরুন
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">কাজের বিস্তারিত</h1>
          </div>
        </div>
        
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
            
            {/* Comments Section */}
            <CommentSection postId={selectedJob.id} postType="job" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Job Form View
  if (currentView === 'jobForm') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Breadcrumb />
        
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => {
                setCurrentView('landing');
                setBreadcrumbs([]);
              }}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-2"
            >
              ← হোমে ফিরুন
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">নতুন কাজ পোস্ট করুন</h1>
          </div>
        </div>
        
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
                <button
                  type="button"
                  onClick={() => setShowLocationModal(true)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                >
                  <div className="flex items-center justify-between">
                    <span className={newJob.location ? 'text-gray-900' : 'text-gray-500'}>
                      {newJob.location || 'এলাকা নির্বাচন করুন'}
                    </span>
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                </button>
                {newJob.location && (
                  <div className="mt-2 text-xs text-gray-600">
                    নির্বাচিত: {newJob.location}
                  </div>
                )}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল (ঐচ্ছিক)</label>
                <input
                  type="email"
                  value={newJob.contactEmail || ''}
                  onChange={(e) => setNewJob({...newJob, contactEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                  placeholder="আপনার ইমেইল ঠিকানা"
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

        {/* Location Modal */}
        {showLocationModal && <LocationModal />}
        <Footer />
      </div>
    );
  }

  // Browse Jobs View (Second Version)
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb />
          
          {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
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
      </div>

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
                {breadcrumbs.length > 0 ? (
                  breadcrumbs.map((crumb, index) => (
                    <span key={index}>
                      {crumb.label}
                      {index < breadcrumbs.length - 1 && ' › '}
                    </span>
                  ))
                ) : (
                  'হোমপেজ › সকল কাজ'
                )}
              </div>
            </div>

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
                         onClick={() => {
                           setSelectedJob(job);
                           setCurrentView('jobDetail');
                           setBreadcrumbs([{label: 'হোমপেজ', path: 'landing'}, {label: 'সকল কাজ', path: 'browse'}, {label: job.title, path: 'jobDetail'}]);
                         }}>
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

            {/* Pagination */}
            <Pagination />
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
        <Footer />
    </div>
  );
}

export default App;