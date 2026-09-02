import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export interface CalendarProps {
  selectedDate?: Date | null;
  onSelectDate?: (date: Date | null) => void;
  className?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate: propSelectedDate,
  onSelectDate,
  className = '',
}) => {
  // Default to November 2025 as in mockup, or current prop date
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const [currentMonth, setCurrentMonth] = useState<number>(10); // 10 is November (0-indexed)
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    propSelectedDate !== undefined ? propSelectedDate : new Date(2025, 10, 10)
  );

  const selectedDate = propSelectedDate !== undefined ? propSelectedDate : internalSelectedDate;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    const newDate = new Date(currentYear, currentMonth, day);
    setInternalSelectedDate(newDate);
    if (onSelectDate) {
      onSelectDate(newDate);
    }
  };

  const handleClear = () => {
    setInternalSelectedDate(null);
    if (onSelectDate) {
      onSelectDate(null);
    }
  };

  // Compute days in month and starting weekday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Days grid
  const calendarCells = [];

  // Previous month trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    calendarCells.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      dateKey: `prev-${prevMonthDays - i}`,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      dateKey: `curr-${d}`,
    });
  }

  // Next month leading days (fill up to 35 or 42 cells)
  const remainingCells = 35 - calendarCells.length > 0 ? 35 - calendarCells.length : 42 - calendarCells.length;
  for (let n = 1; n <= remainingCells; n++) {
    calendarCells.push({
      day: n,
      isCurrentMonth: false,
      dateKey: `next-${n}`,
    });
  }

  const isSelected = (day: number, isCurr: boolean) => {
    if (!isCurr || !selectedDate) return false;
    return (
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getDate() === day
    );
  };

  const formattedSelected = selectedDate
    ? `${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    : 'None';

  return (
    <div className={`w-full bg-white rounded-xl p-4 sm:p-5 border border-gray-100 ${className}`}>
      <div className="text-xs font-semibold text-gray-700 mb-3 tracking-wide uppercase">
        Select Available Dates
      </div>

      {/* Header with Month / Year Dropdowns and Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-1 text-sm font-semibold text-gray-900 cursor-pointer">
            <span>{MONTH_NAMES[currentMonth]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div className="relative flex items-center gap-1 text-sm font-semibold text-gray-900 cursor-pointer">
            <span>{currentYear}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400 mb-2">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="py-1">
            {wd}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {calendarCells.map((cell) => {
          const selected = isSelected(cell.day, cell.isCurrentMonth);
          return (
            <div key={cell.dateKey} className="flex items-center justify-center p-0.5">
              <button
                type="button"
                disabled={!cell.isCurrentMonth}
                onClick={() => handleDateClick(cell.day, cell.isCurrentMonth)}
                className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs transition-all ${
                  selected
                    ? 'bg-[#0F4A3E] text-white font-bold shadow-sm'
                    : cell.isCurrentMonth
                    ? 'text-gray-700 hover:bg-emerald-50 hover:text-[#0F4A3E] cursor-pointer'
                    : 'text-gray-300 pointer-events-none'
                }`}
              >
                {cell.day}
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected text + Clear button */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100 text-xs">
        <div className="text-gray-600">
          Selected: <span className="font-semibold text-gray-900">{formattedSelected}</span>
        </div>
        {selectedDate && (
          <button
            type="button"
            onClick={handleClear}
            className="text-teal-700 hover:underline font-medium cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
