import React from 'react';
import { Briefcase, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold">Khuchra Jobs</h3>
            </div>
            <p className="text-gray-300 mb-4">
              বাংলাদেশের সবচেয়ে বড় চাকরি এবং সেবা খোঁজার প্ল্যাটফর্ম। 
              আপনার স্বপ্নের চাকরি খুঁজুন বা আপনার সেবা অন্যদের সাথে শেয়ার করুন।
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">চাকরি খুঁজুন</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">সেবা খুঁজুন</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">কাজ পোস্ট করুন</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">সেবা যোগ করুন</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">প্রোফাইল</a></li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">চাকরির ধরন</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">বিক্রয়</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">গৃহস্থালি</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">পরিবহন</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">নিরাপত্তা</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">খাদ্য</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">যোগাযোগ</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+৮৮ ০১৭১২৩৪৫৬৭৮</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">info@kajerkhoj.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">ধানমন্ডি, ঢাকা</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © ২০২৪ Khuchra Jobs। সকল অধিকার সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
