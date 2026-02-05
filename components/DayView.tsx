import React from 'react';
import { ProcessedSession } from '../types';
import { SESSION_TIMES, WEEK_DAYS_FULL } from '../constants';
import { MapPin, User, Clock, Calendar } from 'lucide-react';

interface DayViewProps {
    sessions: ProcessedSession[];
    day: number;
}

export const DayView: React.FC<DayViewProps> = ({ sessions, day }) => {
    const sortedSessions = [...sessions].sort((a, b) => a.start - b.start);
    const dayName = WEEK_DAYS_FULL[day - 1];

    if (sortedSessions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <Calendar size={48} className="text-gray-300" />
                </div>
                <p className="text-lg font-medium">No classes on {dayName}</p>
                <p className="text-sm">Enjoy your free time!</p>
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-y-auto p-4 space-y-4 pb-24 bg-gray-50">
            {sortedSessions.map((session, idx) => {
                const startTime = SESSION_TIMES[session.start] || "00:00";
                // Estimate end time by adding duration (assuming 45 min slots + 10 min break, roughly)
                // Just displaying start time and session range for simplicity
                const sessionRange = `${session.start} - ${session.start + session.duration - 1}`;
                
                return (
                    <div 
                        key={idx} 
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-row"
                    >
                        {/* Left Color Strip */}
                        <div className={`w-3 ${session.color.split(' ')[0]}`}></div>
                        
                        {/* Content */}
                        <div className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-800 text-lg leading-tight w-3/4">
                                    {session.courseName}
                                </h3>
                                <div className={`text-xs font-bold px-2 py-1 rounded-full ${session.color.split(' ')[0]} ${session.color.split(' ')[1]}`}>
                                    {session.weeks}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mt-3">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-blue-500" />
                                    <span>
                                        <span className="font-semibold text-gray-900">{startTime}</span>
                                        <span className="text-xs text-gray-400 ml-1">(Slot {sessionRange})</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-red-500" />
                                    <span className="truncate">{session.classroom}</span>
                                </div>
                                <div className="flex items-center gap-2 col-span-2">
                                    <User size={16} className="text-green-500" />
                                    <span>{session.teacher}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};