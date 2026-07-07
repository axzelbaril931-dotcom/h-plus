import { useState, FormEvent } from 'react';
import { InventoryItem } from '../types';
import { Package, Search, PlusCircle, AlertCircle, ShoppingCart, Check } from 'lucide-react';

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'INV-1021',
    name: 'Amoxicillin 500mg (Capsules)',
    category: 'Pharmacy',
    stock: 450,
    minStock: 200,
    unit: 'Bottle(s)',
    status: 'In Stock'
  },
  {
    id: 'INV-1022',
    name: 'Disposable Nitrile Gloves (L)',
    category: 'Supplies',
    stock: 40,
    minStock: 100,
    unit: 'Box(es)',
    status: 'Low Stock'
  },
  {
    id: 'INV-1023',
    name: 'Digital Cardiac Monitors (v4)',
    category: 'Equipment',
    stock: 12,
    minStock: 10,
    unit: 'Unit(s)',
    status: 'In Stock'
  },
  {
    id: 'INV-1024',
    name: 'Rapid Covid-19 Antigen Kits',
    category: 'Supplies',
    stock: 5,
    minStock: 150,
    unit: 'Kit(s)',
    status: 'Low Stock'
  }
];

export default function InventorySandbox() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Supplies' | 'Pharmacy' | 'Equipment'>('All');
  
  // New Item Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Supplies' | 'Pharmacy' | 'Equipment'>('Supplies');
  const [stock, setStock] = useState<number | ''>('');
  const [minStock, setMinStock] = useState<number | ''>('');
  const [unit, setUnit] = useState('Box(es)');

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initialStockValue = stock !== '' ? Number(stock) : 0;
    const minStockValue = minStock !== '' ? Number(minStock) : 0;
    
    let status: InventoryItem['status'] = 'In Stock';
    if (initialStockValue === 0) status = 'Out of Stock';
    else if (initialStockValue < minStockValue) status = 'Low Stock';

    const newItem: InventoryItem = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      category,
      stock: initialStockValue,
      minStock: minStockValue,
      unit,
      status
    };

    setInventory(prev => [...prev, newItem]);
    setName('');
    setStock('');
    setMinStock('');
  };

  const handleRestock = (id: string) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          const restockAmount = item.minStock * 2;
          return {
            ...item,
            stock: item.stock + restockAmount,
            status: 'In Stock' as const
          };
        }
        return item;
      })
    );
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full lg:h-[530px] overflow-y-auto lg:overflow-hidden">
      {/* Search & Main Inventory Table Panel */}
      <div className="flex-1 flex flex-col border border-slate-200 rounded-xl bg-white p-4 sm:p-5 h-auto lg:h-full overflow-y-auto lg:overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3 mb-4">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Medical Supplies & Pharmacy Ledger</h4>
            <p className="text-xs text-slate-500">Live pharmaceutical stocks, surgical supplies & equipment.</p>
          </div>
        </div>

        {/* Search & Category Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search supplies or ID..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            {(['All', 'Supplies', 'Pharmacy', 'Equipment'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
                  categoryFilter === cat
                    ? 'bg-primary text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table/Cards List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredInventory.length > 0 ? (
            filteredInventory.map(item => {
              const isLow = item.stock < item.minStock;
              return (
                <div key={item.id} className="border border-slate-100 bg-slate-50/50 hover:bg-slate-50 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({item.id})</span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Category: {item.category} • Min Stock threshold: {item.minStock} {item.unit}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <p className={`font-bold text-sm ${isLow ? 'text-amber-600' : 'text-slate-800'}`}>
                        {item.stock} <span className="text-[10px] font-normal text-slate-500">{item.unit}</span>
                      </p>
                      <div className="flex items-center gap-1 mt-0.5 justify-end">
                        <span className={`w-1.5 h-1.5 rounded-full ${isLow ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                        <span className={`text-[9px] font-bold uppercase ${isLow ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {isLow ? 'Low Stock' : 'Good Stock'}
                        </span>
                      </div>
                    </div>

                    {isLow && (
                      <button
                        onClick={() => handleRestock(item.id)}
                        className="bg-primary hover:bg-primary-container text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm uppercase tracking-wider"
                      >
                        <ShoppingCart className="w-3 h-3" /> Auto-Restock
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-xs text-slate-400 py-12">No inventory items match filter criteria.</p>
          )}
        </div>
      </div>

      {/* Add New Stock Item Form Panel */}
      <div className="w-full lg:w-5/12 flex flex-col justify-between border border-slate-200 rounded-xl bg-slate-50/50 p-4 sm:p-5 h-auto lg:h-full shrink-0">
        <div>
          <h4 className="text-sm font-semibold text-primary font-headline-md mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" /> Register New Medical Item
          </h4>

          <form onSubmit={handleAddItem} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Item / Generic Name</label>
              <input
                type="text"
                placeholder="e.g. Surgical Mask 3-Ply..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Stock Category</label>
              <select
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                value={category}
                onChange={e => setCategory(e.target.value as any)}
              >
                <option value="Supplies">Supplies</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Current Stock Count</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                  value={stock}
                  onChange={e => setStock(e.target.value !== '' ? Number(e.target.value) : '')}
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Minimum Alert Level</label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                  value={minStock}
                  onChange={e => setMinStock(e.target.value !== '' ? Number(e.target.value) : '')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Stock Unit type</label>
              <input
                type="text"
                placeholder="e.g. Box(es), Bottle(s), Unit(s)"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                value={unit}
                onChange={e => setUnit(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="border-t border-slate-100 pt-4 mt-4">
          <button
            onClick={handleAddItem}
            className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow active:scale-95"
          >
            <PlusCircle className="w-4 h-4" /> Add Item to Registry
          </button>
        </div>
      </div>
    </div>
  );
}
