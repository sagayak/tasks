
import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { quotes } from '../data';

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 10M20 20l-1.5-1.5A9 9 0 013.5 14" />
    </svg>
);

const QuotesComponent: React.FC = () => {
    const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

    const getDailyQuote = () => {
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        return quotes[dayOfYear % quotes.length];
    };

    const getRandomQuote = () => {
        let newQuote: Quote;
        do {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            newQuote = quotes[randomIndex];
        } while (currentQuote && newQuote.text === currentQuote.text && quotes.length > 1);
        return newQuote;
    };

    useEffect(() => {
        setCurrentQuote(getDailyQuote());
    }, []);

    const handleNewQuote = () => {
        setCurrentQuote(getRandomQuote());
    };

    if (!currentQuote) {
        return (
            <div className="bg-secondary p-8 rounded-2xl shadow-lg max-w-3xl mx-auto text-center">
                <p className="text-text-secondary">Loading quote...</p>
            </div>
        );
    }

    return (
        <div className="bg-secondary p-6 md:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-text-primary">Quote of the Day</h2>
            <div className="bg-primary p-6 rounded-lg my-6 min-h-[150px] flex flex-col justify-center transition-all duration-500">
                <blockquote className="text-xl md:text-2xl text-text-primary italic">
                    “{currentQuote.text}”
                </blockquote>
                <cite className="block text-right mt-4 text-text-secondary not-italic font-semibold">
                    — {currentQuote.author}
                </cite>
            </div>
            <button
                onClick={handleNewQuote}
                className="bg-highlight text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center mx-auto"
                aria-label="Get another quote"
            >
                <RefreshIcon />
                <span className="ml-2">New Quote</span>
            </button>
        </div>
    );
};

export default QuotesComponent;
