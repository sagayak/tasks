import React, { useState } from 'react';
import { DueDate } from '../types';
import { PlusIcon, TrashIcon } from './Icons';


const DueDates: React.FC = () => {
    const [dueDates, setDueDates] = useState<DueDate[]>([]);
    const [newItemName, setNewItemName] = useState('');
    const [newDueDate, setNewDueDate] = useState('');

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItemName.trim() === '' || newDueDate.trim() === '') return;
        const newItem: DueDate = {
            id: Date.now(),
            name: newItemName,
            date: newDueDate,
        };
        setDueDates(prev => [...prev, newItem].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        setNewItemName('');
        setNewDueDate('');
    };
    
    const handleDeleteItem = (id: number) => {
        setDueDates(dueDates.filter(item => item.id !== id));
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for accurate comparison

    return (
        <div className="bg-secondary p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-text-primary text-center">Upcoming Due Dates</h2>
            <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-2 mb-8">
                <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g., Car Service, Insurance..."
                    className="flex-grow bg-accent border-transparent text-text-primary rounded-lg p-3 focus:ring-2 focus:ring-highlight focus:outline-none"
                />
                <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="bg-accent border-transparent text-text-primary rounded-lg p-3 focus:ring-2 focus:ring-highlight focus:outline-none"
                    required
                />
                <button type="submit" className="bg-highlight text-white font-bold p-3 rounded-lg hover:opacity-90 flex items-center justify-center">
                    <PlusIcon />
                    <span className="ml-2">Add Due Date</span>
                </button>
            </form>

            <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {dueDates.map(item => {
                    const itemDate = new Date(item.date + 'T00:00:00');
                    const isPastDue = itemDate < today;

                    return (
                         <li key={item.id} className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${isPastDue ? 'bg-danger/20 border-l-4 border-danger' : 'bg-primary'}`}>
                            <div>
                                <p className={`font-semibold ${isPastDue ? 'text-text-primary' : 'text-text-primary'}`}>{item.name}</p>
                                <p className={`text-sm ${isPastDue ? 'text-danger' : 'text-text-secondary'}`}>
                                    Due: {itemDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <button onClick={() => handleDeleteItem(item.id)} className="text-danger hover:opacity-80 p-2 rounded-full hover:bg-black/10">
                                <TrashIcon />
                            </button>
                        </li>
                    )
                })}
                {dueDates.length === 0 && <p className="text-text-secondary text-center p-8">No due dates tracked. Add one to get started!</p>}
            </ul>
        </div>
    );
};

export default DueDates;