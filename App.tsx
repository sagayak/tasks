
import React, { useState, PropsWithChildren } from 'react';
import TodoList from './components/TodoList';
import Planner from './components/Planner';
import DueDates from './components/DueDates';
import Quotes from './components/HabitTracker';

type Section = 'todo' | 'planner' | 'duedates' | 'quotes';

const CheckSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);


const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<Section>('todo');

    const renderSection = () => {
        switch (activeSection) {
            case 'todo':
                return <TodoList />;
            case 'planner':
                return <Planner />;
            case 'duedates':
                return <DueDates />;
            case 'quotes':
                return <Quotes />;
            default:
                return <TodoList />;
        }
    };

    // Fix: Use PropsWithChildren to correctly type NavButton component props, resolving a TypeScript error where the 'children' prop was not being recognized.
    const NavButton = ({ section, children }: PropsWithChildren<{ section: Section }>) => {
        const isActive = activeSection === section;
        return (
            <button
                onClick={() => setActiveSection(section)}
                className={`flex items-center justify-center w-full md:w-auto px-4 py-3 font-semibold rounded-xl transition-all duration-300 ${isActive ? 'bg-highlight text-white shadow-lg' : 'bg-secondary text-text-secondary hover:bg-accent'}`}
            >
                {children}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-primary font-sans">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight">
                        Sam<span className="text-highlight">Tasks</span>
                    </h1>
                    <p className="text-text-secondary mt-2">Plan Easy, Live sorted</p>
                </header>

                <nav className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 mb-8 p-2 bg-secondary rounded-2xl shadow-md">
                    <NavButton section="todo"><CheckSquareIcon /> To-Do List</NavButton>
                    <NavButton section="planner"><CalendarIcon /> Planner</NavButton>
                    <NavButton section="duedates"><BellIcon /> Due Dates</NavButton>
                    <NavButton section="quotes"><QuoteIcon /> Quotes</NavButton>
                </nav>

                <main>
                    {renderSection()}
                </main>
            </div>
        </div>
    );
};

export default App;
