import React from 'react';
import { WEEK_DAYS_FULL } from '../constants';

interface DaySelectorProps {
    selectedDay: number;
    setSelectedDay: (day: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, setSelectedDay }) => {
    return (
        <div className="overflow-x-auto no-scrollbar bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex px-2 py-2 min-w-max">
                {WEEK_DAYS_FULL.map((dayName, index) => {
                    const dayNum = index + 1;
                    const isSelected = selectedDay === dayNum;
                    
                    return (
                        <button
                            key={dayNum}
                            onClick={() => setSelectedDay(dayNum)}
                            className={`flex flex-col items-center justify-center min-w-[4.5rem] py-2 mx-1 rounded-xl transition-all duration-200 ${
                                isSelected 
                                    ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            <span className="text-xs font-medium uppercase opacity-80">{dayName.substring(0, 3)}</span>
                            <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                                {dayName.substring(0, 1)}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};