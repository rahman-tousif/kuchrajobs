import { jobCategories, Category } from '../types';

export const getCategoryInfo = (categoryId: string): Category | undefined => {
  if (categoryId === 'others') {
    return { id: 'others', name: 'ডে / পার্ট-টাইম জব – বাংলাদেশ', icon: null, color: 'bg-pink-100 text-pink-700' };
  }
  return jobCategories.find(cat => cat.id === categoryId);
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('bn-BD');
};

export const formatCurrency = (amount: string): string => {
  return amount.replace(/৮/g, '৳');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateId = (): string => {
  return Date.now().toString();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{11}$/;
  return phoneRegex.test(phone.replace(/[^\d]/g, ''));
};

