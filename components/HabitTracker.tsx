
import React, { useState, useEffect } from 'react';
import { Quote } from '../types';

const quotes: Quote[] = [
    { "text": "Success is not final, failure is not fatal: it is the courage to continue that counts.", "author": "Winston Churchill" },
    { "text": "True love stories never have endings.", "author": "Richard Bach" },
    { "text": "Success usually comes to those who are too busy to be looking for it.", "author": "Henry David Thoreau" },
    { "text": "Don’t be afraid to give up the good to go for the great.", "author": "John D. Rockefeller" },
    { "text": "Love doesn’t make the world go round. Love is what makes the ride worthwhile.", "author": "Franklin P. Jones" },
    { "text": "Relationships are built on trust. Without it, you have nothing.", "author": "Unknown" },
    { "text": "The greatest relationships are the ones you never expected to be in.", "author": "Unknown" },
    { "text": "If you really look closely, most overnight successes took a long time.", "author": "Steve Jobs" },
    { "text": "The way to get started is to quit talking and begin doing.", "author": "Walt Disney" },
    { "text": "A happy family is but an earlier heaven.", "author": "George Bernard Shaw" },
    { "text": "In every conceivable manner, the family is link to our past and bridge to our future.", "author": "Alex Haley" },
    { "text": "Love recognizes no barriers.", "author": "Maya Angelou" },
    { "text": "The secret of success is to do the common thing uncommonly well.", "author": "John D. Rockefeller Jr." },
    { "text": "A great relationship is about two things: appreciating the similarities and respecting the differences.", "author": "Unknown" },
    { "text": "Where there is love, there is life.", "author": "Mahatma Gandhi" },
    { "text": "We are most alive when we're in love.", "author": "John Updike" },
    { "text": "Opportunities don't happen, you create them.", "author": "Chris Grosser" },
    { "text": "The best thing to hold onto in life is each other.", "author": "Audrey Hepburn" },
    { "text": "Rejoice with your family in the beautiful land of life.", "author": "Albert Einstein" },
    { "text": "The bond that links your true family is not one of blood, but of respect and joy in each other's life.", "author": "Richard Bach" },
    { "text": "Family means no one gets left behind or forgotten.", "author": "David Ogden Stiers" },
    { "text": "Having somewhere to go is home. Having someone to love is family. Having both is a blessing.", "author": "Unknown" },
    { "text": "Family is not an important thing. It’s everything.", "author": "Michael J. Fox" },
    { "text": "Family gives you the roots to stand tall and strong.", "author": "Unknown" },
    { "text": "A real friend is one who walks in when the rest of the world walks out.", "author": "Walter Winchell" },
    { "text": "Don’t watch the clock; do what it does. Keep going.", "author": "Sam Levenson" },
    { "text": "I find that the harder I work, the more luck I seem to have.", "author": "Thomas Jefferson" },
    { "text": "Success is walking from failure to failure with no loss of enthusiasm.", "author": "Winston Churchill" },
    { "text": "The love of a family is life’s greatest blessing.", "author": "Unknown" },
    { "text": "Other things may change us, but we start and end with the family.", "author": "Anthony Brandt" }
];

const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 10M20 20l-1.5-1.5A9 9 0 013.5 14" />
    </svg>
);

const Quotes: React.FC = () => {
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

export default Quotes;
