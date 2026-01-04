import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbItem } from '../../types';

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (path: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs, onBreadcrumbClick }) => {
  if (breadcrumbs.length === 0) return null;

  return (
    <div className="bg-gray-50 border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex items-center space-x-3 text-base lg:text-lg">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
              <button
                onClick={() => onBreadcrumbClick(crumb.path)}
                className={`${
                  index === breadcrumbs.length - 1
                    ? 'text-gray-800 font-semibold'
                    : 'text-gray-600 hover:text-blue-600 py-2 px-2 rounded hover:bg-gray-100'
                }`}
              >
                {crumb.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

