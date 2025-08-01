import React from 'react';
import { Check, Save, Trash2 } from 'lucide-react';
import type { PackingItem } from '../types';

interface PackingListProps {
  items: PackingItem[];
  onToggleItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
}

export function PackingList({ items, onToggleItem, onUpdateQuantity, onSave, onDelete }: PackingListProps) {
  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Packing List</h2>
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save List
        </button>
      </div>

      <div className="space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{category}</h3>
            <div className="space-y-2">
              {items
                .filter(item => item.category === category)
                .map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onToggleItem(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                          ${item.packed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        {item.packed && <Check className="w-4 h-4" />}
                      </button>
                      <span className={item.packed ? 'line-through text-gray-500' : ''}>
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}