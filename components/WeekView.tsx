import React from 'react';
import { ProcessedSession } from '../types';
import { WEEK_DAYS, SESSION_TIMES } from '../constants';

interface WeekViewProps {
    sessions: ProcessedSession[];
}

export const WeekView: React.FC<WeekViewProps> = ({ sessions }) => {
    const totalSessions = 13;
    const rowHeight = 60; // Height in pixels for one session slot
    const headerHeight = 40;

    return (
        <div className="h-full w-full overflow-auto bg-white relative">
            <div className="min-w-[120%] pb-20"> {/* Ensure horizontal scroll for small screens */}
                
                {/* Header Row */}
                <div className="flex sticky top-0 z-10 bg-gray-50 border-b border-gray-200" style={{ height: headerHeight }}>
                    <div className="w-10 flex-shrink-0 border-r border-gray-200 bg-gray-50"></div>
                    {WEEK_DAYS.map((day, i) => (
                        <div key={day} className="flex-1 flex items-center justify-center text-sm font-semibold text-gray-500 border-r border-gray-100 last:border-r-0">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Grid Body */}
                <div className="flex relative" style={{ height: totalSessions * rowHeight }}>
                    
                    {/* Time Column (Left Sidebar) */}
                    <div className="w-10 flex-shrink-0 border-r border-gray-200 bg-gray-50 flex flex-col">
                        {Array.from({ length: totalSessions }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center justify-center border-b border-gray-100 text-[10px] text-gray-400 font-medium leading-tight" style={{ height: rowHeight }}>
                                <span>{i + 1}</span>
                                <span className="scale-90">{SESSION_TIMES[i + 1]}</span>
                            </div>
                        ))}
                    </div>

                    {/* Courses Grid Layer */}
                    <div className="flex-1 relative">
                        {/* Background Grid Lines */}
                        {Array.from({ length: totalSessions }).map((_, i) => (
                            <div key={`line-${i}`} className="absolute w-full border-b border-gray-100" style={{ top: (i + 1) * rowHeight }}></div>
                        ))}
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={`col-${i}`} className="absolute h-full border-r border-gray-100" style={{ left: `${(i + 1) * (100 / 7)}%` }}></div>
                        ))}

                        {/* Course Cards */}
                        {sessions.map((session, idx) => {
                            // day is 1-7. index is day-1
                            const colIndex = session.day - 1;
                            const startRow = session.start - 1; // 0-indexed
                            
                            const top = startRow * rowHeight;
                            const height = session.duration * rowHeight;
                            const widthPercent = 100 / 7;
                            const leftPercent = colIndex * widthPercent;

                            return (
                                <div
                                    key={`${session.courseName}-${session.day}-${session.start}-${idx}`}
                                    className={`absolute px-0.5 py-0.5 overflow-hidden transition-all hover:brightness-95 hover:z-20`}
                                    style={{
                                        top: `${top}px`,
                                        height: `${height}px`,
                                        left: `${leftPercent}%`,
                                        width: `${widthPercent}%`,
                                    }}
                                >
                                    <div className={`w-full h-full rounded-md p-1 shadow-sm border text-[10px] leading-tight flex flex-col ${session.color}`}>
                                        <div className="font-bold line-clamp-3 mb-auto break-words">{session.courseName}</div>
                                        <div className="opacity-90 mt-1">
                                            <div className="flex items-center gap-0.5">
                                                <span className="truncate scale-90 origin-left">@{session.classroom}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};