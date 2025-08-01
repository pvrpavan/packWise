import React from 'react';
import { MapPin, Calendar, CloudSun, Activity, Search, X } from 'lucide-react';
import type { TravelDetails } from '../types';

interface TravelFormProps {
  onSubmit: (details: TravelDetails) => void;
}

export function TravelForm({ onSubmit }: TravelFormProps) {
  const [details, setDetails] = React.useState<TravelDetails>({
    destination: '',
    startDate: '',
    endDate: '',
    weather: 'mild',
    activities: [],
  });

  const [searchQuery, setSearchQuery] = React.useState('');
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const activities = [
    'Beach',
    'Hiking',
    'City Tours',
    'Business',
    'Winter Sports',
    'Camping',
    'Photography',
    'Swimming',
    'Cycling',
    'Cultural Events',
    'Fine Dining',
    'Shopping',
    'Museum Visits',
    'Water Sports',
    'Nightlife',
    'Spa & Wellness',
    'Golf',
    'Safari',
    'Road Trip',
    'Backpacking'
  ];

  const filteredActivities = activities.filter(activity =>
    activity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  const toggleActivity = (activity: string) => {
    setDetails(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const removeActivity = (activityToRemove: string) => {
    setDetails(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity !== activityToRemove),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <MapPin className="w-5 h-5" />
          Destination
        </label>
        <input
          type="text"
          required
          value={details.destination}
          onChange={e => setDetails(prev => ({ ...prev, destination: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Where are you going?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
            <Calendar className="w-5 h-5" />
            Start Date
          </label>
          <input
            type="date"
            required
            value={details.startDate}
            onChange={e => setDetails(prev => ({ ...prev, startDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
            <Calendar className="w-5 h-5" />
            End Date
          </label>
          <input
            type="date"
            required
            value={details.endDate}
            onChange={e => setDetails(prev => ({ ...prev, endDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <CloudSun className="w-5 h-5" />
          Expected Weather
        </label>
        <select
          value={details.weather}
          onChange={e => setDetails(prev => ({ ...prev, weather: e.target.value as TravelDetails['weather'] }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="hot">Hot (25°C+)</option>
          <option value="mild">Mild (15-25°C)</option>
          <option value="cold">Cold (Below 15°C)</option>
        </select>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Activity className="w-5 h-5" />
          Activities
        </label>
        
        <div className="relative">
          <div className="flex items-center border rounded-md">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search activities..."
              className="w-full p-2 pl-2 rounded-md focus:outline-none"
            />
          </div>

          {isDropdownOpen && searchQuery && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border max-h-60 overflow-auto">
              {filteredActivities.map(activity => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => {
                    if (!details.activities.includes(activity)) {
                      toggleActivity(activity);
                    }
                    setSearchQuery('');
                    setIsDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                >
                  {activity}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {details.activities.map(activity => (
            <span
              key={activity}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {activity}
              <button
                type="button"
                onClick={() => removeActivity(activity)}
                className="hover:text-blue-600 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition-colors"
      >
        Generate Packing List
      </button>
    </form>
  );
}