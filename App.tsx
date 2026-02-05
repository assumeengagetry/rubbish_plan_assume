import React, { useState } from 'react';
import { ViewMode } from './types';
import { getSessionsForWeek, getSessionsForDay } from './utils';
import { WeekSelector } from './components/WeekSelector';
import { DaySelector } from './components/DaySelector';
import { WeekView } from './components/WeekView';
import { DayView } from './components/DayView';

export default function App() {
    // Determine initial week based on date or default to 1
    const [currentWeek, setCurrentWeek] = useState<number>(1);
    
    // Determine initial day (1=Mon, 7=Sun)
    const today = new Date().getDay(); // 0 is Sun, 1 is Mon
    // Adjust JS getDay() to match our 1-7 (Mon-Sun) format
    const initialDay = today === 0 ? 7 : today;
    
    const [selectedDay, setSelectedDay] = useState<number>(initialDay);
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Week);

    // Calculate data
    const weekSessions = getSessionsForWeek(currentWeek);
    const daySessions = getSessionsForDay(currentWeek, selectedDay);

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header Area */}
            <div className="flex-none shadow-md z-30">
                <WeekSelector 
                    currentWeek={currentWeek} 
                    setCurrentWeek={setCurrentWeek}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
                
                {/* Only show Day Selector if in Day View */}
                {viewMode === ViewMode.Day && (
                    <DaySelector 
                        selectedDay={selectedDay} 
                        setSelectedDay={setSelectedDay} 
                    />
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {viewMode === ViewMode.Week ? (
                    <WeekView sessions={weekSessions} />
                ) : (
                    <DayView sessions={daySessions} day={selectedDay} />
                )}
            </div>
        </div>
    );
}