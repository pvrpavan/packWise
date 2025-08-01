import React from 'react';
import { Briefcase as Suitcase } from 'lucide-react';
import { TravelForm } from './components/TravelForm';
import { PackingList } from './components/PackingList';
import { generatePackingList } from './utils/generatePackingList';
import type { TravelDetails, PackingItem, SavedChecklist } from './types';

function App() {
  const [travelDetails, setTravelDetails] = React.useState<TravelDetails | null>(null);
  const [packingItems, setPackingItems] = React.useState<PackingItem[]>([]);
  const [savedChecklists, setSavedChecklists] = React.useState<SavedChecklist[]>(() => {
    const saved = localStorage.getItem('savedChecklists');
    return saved ? JSON.parse(saved) : [];
  });

  const handleTravelDetailsSubmit = (details: TravelDetails) => {
    setTravelDetails(details);
    setPackingItems(generatePackingList(details));
  };

  const handleToggleItem = (id: string) => {
    setPackingItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setPackingItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleSaveChecklist = () => {
    if (!travelDetails) return;

    const newChecklist: SavedChecklist = {
      id: Math.random().toString(36).substr(2, 9),
      travelDetails,
      items: packingItems,
      createdAt: new Date().toISOString(),
    };

    const updatedChecklists = [...savedChecklists, newChecklist];
    setSavedChecklists(updatedChecklists);
    localStorage.setItem('savedChecklists', JSON.stringify(updatedChecklists));
  };

  const handleDeleteItem = (id: string) => {
    setPackingItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Suitcase className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Travel Packing Assistant</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Trip Details</h2>
            <TravelForm onSubmit={handleTravelDetailsSubmit} />
          </div>

          {packingItems.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <PackingList
                items={packingItems}
                onToggleItem={handleToggleItem}
                onUpdateQuantity={handleUpdateQuantity}
                onSave={handleSaveChecklist}
                onDelete={handleDeleteItem}
              />
            </div>
          )}

          {savedChecklists.length > 0 && (
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Saved Checklists</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedChecklists.map(checklist => (
                  <div
                    key={checklist.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-gray-900">{checklist.travelDetails.destination}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(checklist.travelDetails.startDate).toLocaleDateString()} -{' '}
                      {new Date(checklist.travelDetails.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {checklist.items.filter(item => item.packed).length} of {checklist.items.length} items packed
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;