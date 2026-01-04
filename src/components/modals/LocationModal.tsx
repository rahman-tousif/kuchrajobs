import React from 'react';
import { X, Search, MapPin } from 'lucide-react';
import { dhakaMajorAreas } from '../../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
  searchTerm,
  onSearchChange
}) => {
  if (!isOpen) return null;

  const filteredAreas = Object.entries(dhakaMajorAreas).reduce((acc, [category, areas]) => {
    const filtered = areas.filter(area => 
      area.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">অবস্থান নির্বাচন করুন</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="অবস্থান খুঁজুন..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {Object.entries(filteredAreas).map(([category, areas]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {areas.map((area, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onLocationSelect(area.includes('(') ? area.split(' (')[0] : area);
                        onClose();
                      }}
                      className="text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-gray-800">{area}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(filteredAreas).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>কোন অবস্থান পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

