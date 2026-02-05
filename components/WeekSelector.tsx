import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface WeekSelectorProps {
    currentWeek: number;
    setCurrentWeek: (week: number) => void;
    viewMode: 'day' | 'week';
    setViewMode: (mode: 'day' | 'week') => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({ currentWeek, setCurrentWeek, viewMode, setViewMode }) => {
    const handlePrev = () => {
        if (currentWeek > 1) setCurrentWeek(currentWeek - 1);
    };

    const handleNext = () => {
        if (currentWeek < 25) setCurrentWeek(currentWeek + 1);
    };

    return (
        <div className="flex flex-col bg-white shadow-sm z-50">
            {/* Top Bar: Title and Week Nav */}
            <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
                <div className="flex items-center space-x-2">
                    <Calendar size={20} />
                    <h1 className="text-lg font-bold tracking-wide">My Schedule</h1>
                </div>
                
                <div className="flex bg-blue-700 rounded-lg p-0.5">
                    <button 
                        onClick={() => setViewMode('week')}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewMode === 'week' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100'}`}
                    >
                        Week
                    </button>
                    <button 
                        onClick={() => setViewMode('day')}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewMode === 'day' ? 'bg-white text-blue-700 shadow-sm' : 'text-blue-100'}`}
                    >
                        Day
                    </button>
                </div>
            </div>

            {/* Week Stepper */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white">
                <button 
                    onClick={handlePrev}
                    disabled={currentWeek <= 1}
                    className={`p-2 rounded-full transition-colors ${currentWeek <= 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'}`}
                >
                    <ChevronLeft size={24} />
                </button>
                
                <div className="text-center">
                    <span className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Current Week</span>
                    <div className="text-xl font-bold text-gray-800 leading-none">Week {currentWeek}</div>
                </div>

                <button 
                    onClick={handleNext}
                    disabled={currentWeek >= 25}
                    className={`p-2 rounded-full transition-colors ${currentWeek >= 25 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'}`}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};