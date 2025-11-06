import React, { useState, useMemo, useEffect } from 'react';
import { PlannerDay } from '../types';

const Planner: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [occupiedDays, setOccupiedDays] = useState<PlannerDay[]>([
        { day: 5, note: "Doctor's Appointment" },
        { day: 18, note: "Project Deadline" },
    ]);
    const [modalState, setModalState] = useState<{ isOpen: boolean; day: number | null; note: string }>({
        isOpen: false,
        day: null,
        note: '',
    });
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const handleGoToToday = () => setCurrentDate(new Date());

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) {
            return;
        }

        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        const swipeThreshold = 50; // Minimum distance for a swipe

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                // Swiped right -> Previous month
                handlePrevMonth();
            } else {
                // Swiped left -> Next month
                handleNextMonth();
            }
        }

        setTouchStartX(null); // Reset for next touch
    };

    const handleDayClick = (day: number) => {
        const existingDay = occupiedDays.find(d => d.day === day);
        setModalState({ isOpen: true, day, note: existingDay?.note || '' });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, day: null, note: '' });
    };
    
    const handleSaveNote = () => {
        if (modalState.day === null) return;

        setOccupiedDays(prev => {
            const existingDay = prev.find(d => d.day === modalState.day);
            // If there's no note, remove the day from the occupied list
            if (modalState.note.trim() === '') {
                return prev.filter(d => d.day !== modalState.day);
            }
            // If the day already exists, update its note
            if (existingDay) {
                return prev.map(d => d.day === modalState.day ? { ...d, note: modalState.note } : d);
            }
            // Otherwise, add the new day with its note
            return [...prev, { day: modalState.day, note: modalState.note }];
        });

        handleCloseModal();
    };
    
    // Add keyboard shortcuts for the modal
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
            if (event.key === 'Enter' && modalState.isOpen) {
                handleSaveNote();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalState]);


    const calendarDays = useMemo(() => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="border-accent rounded-lg"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const occupiedInfo = occupiedDays.find(d => d.day === day);
            const isOccupied = !!occupiedInfo;

            let dayClass = 'relative text-center p-2 border-accent border rounded-lg cursor-pointer transition-colors duration-200 ';
            if (isOccupied) {
                dayClass += 'bg-danger/40 hover:bg-danger/60 text-text-primary';
            } else {
                dayClass += 'bg-success/40 hover:bg-success/60 text-text-primary';
            }
            if (isToday) {
                dayClass += ' ring-2 ring-highlight';
            }

            days.push(
                <div key={day} className={dayClass} onClick={() => handleDayClick(day)} title={occupiedInfo?.note}>
                    <div className="flex items-center justify-center h-10 w-10 text-lg font-semibold">
                        {day}
                    </div>
                    {isOccupied && <div className="absolute bottom-2 right-2 h-2 w-2 bg-danger rounded-full"></div>}
                </div>
            );
        }
        return days;
    }, [firstDayOfMonth, daysInMonth, month, year, occupiedDays]);

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-secondary p-6 rounded-2xl shadow-lg">
            {/* Modal */}
            {modalState.isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleCloseModal}>
                    <div className="bg-secondary p-6 rounded-xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4 text-text-primary">Note for {currentDate.toLocaleString('default', { month: 'long' })} {modalState.day}</h3>
                        <textarea
                            value={modalState.note}
                            onChange={(e) => setModalState(prev => ({ ...prev, note: e.target.value }))}
                            placeholder="Why are you busy?"
                            className="w-full bg-primary border-accent text-text-primary rounded-lg p-2 h-24 focus:ring-2 focus:ring-highlight focus:outline-none mb-4"
                            autoFocus
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={handleCloseModal} className="px-4 py-2 rounded-lg bg-accent hover:bg-gray-300 text-text-primary font-semibold">Cancel</button>
                            <button onClick={handleSaveNote} className="px-4 py-2 rounded-lg bg-highlight text-white font-semibold hover:opacity-90">Save</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-accent" aria-label="Previous month"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                    <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-accent" aria-label="Next month"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                    <button onClick={handleGoToToday} className="px-4 py-2 text-sm font-semibold rounded-lg bg-accent hover:opacity-80 text-text-primary transition-opacity">Today</button>
                </div>
                <h2 className="text-2xl font-bold text-text-primary text-right">{currentDate.toLocaleString('default', { month: 'long' })} {year}</h2>
            </div>
            <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="cursor-grab">
                <div className="grid grid-cols-7 gap-2">
                    {weekdays.map(day => <div key={day} className="text-center font-bold text-text-secondary">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2 mt-2">
                    {calendarDays}
                </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-success/40 rounded"></div><span>Free Day</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-danger/40 rounded"></div><span>Occupied Day</span></div>
            </div>
        </div>
    );
};

export default Planner;