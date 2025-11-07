
import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from './Icons';

interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Drink 8 glasses of water', completed: true },
    { id: 2, name: 'Read for 30 minutes', completed: false },
    { id: 3, name: 'Exercise for 20 minutes', completed: false },
  ]);
  const [newHabit, setNewHabit] = useState('');

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { id: Date.now(), name: newHabit, completed: false }]);
      setNewHabit('');
    }
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <div className="bg-secondary p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-text-primary text-center">Habit Tracker</h2>
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit"
          className="flex-grow bg-accent border-transparent text-text-primary rounded-lg p-3 focus:ring-2 focus:ring-highlight focus:outline-none"
        />
        <button onClick={addHabit} className="bg-highlight text-white font-bold p-3 rounded-lg hover:opacity-90 flex items-center justify-center">
          <PlusIcon />
        </button>
      </div>
      <ul>
        {habits.map(habit => (
          <li key={habit.id} className="flex items-center justify-between bg-primary p-3 rounded-lg mb-3">
            <span
              className={`flex-grow cursor-pointer ${habit.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}
              onClick={() => toggleHabit(habit.id)}
            >
              {habit.name}
            </span>
            <button onClick={() => deleteHabit(habit.id)} className="text-danger hover:opacity-80 p-2 rounded-full hover:bg-black/10">
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;
