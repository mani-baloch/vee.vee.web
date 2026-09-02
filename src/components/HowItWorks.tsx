'use client';

import React, { useState } from 'react';
import { MapPin, Clock, Stethoscope, Building2, List, Map as MapIcon, CheckCircle2 } from 'lucide-react';
import { Tabs } from './ui/tabs';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { RadioGroup } from './ui/radio-group';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';

export interface HowItWorksProps {
  onRequestShift: (shiftDetails?: any) => void;
  onPostSchedule: (scheduleDetails?: any) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onRequestShift,
  onPostSchedule,
}) => {
  const [activeTab, setActiveTab] = useState<'vets-techs' | 'practices'>('vets-techs');

  // Left Card (Search Shifts) state
  const [shiftType, setShiftType] = useState('wellness');
  const [zipCode, setZipCode] = useState('90210');
  const [distance, setDistance] = useState('100');
  const [lunchDuration, setLunchDuration] = useState('full');
  const [selectedShiftIndex, setSelectedShiftIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'list'>('both');

  // Right Card (Post Schedule) state
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date(2025, 10, 10));
  const [postShiftType, setPostShiftType] = useState('wellness');
  const [postSubType, setPostSubType] = useState('');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [postLunchDuration, setPostLunchDuration] = useState('30min');

  // Practice state
  const [practiceRole, setPracticeRole] = useState('vet');
  const [practiceRate, setPracticeRate] = useState('120');

  const shiftOptions = [
    { value: 'wellness', label: 'Wellness' },
    { value: 'gp', label: 'General Practice' },
    { value: 'emergency', label: 'Emergency / Critical' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'urgent', label: 'Urgent Care' },
  ];

  const distanceOptions = [
    { value: '25', label: '25 miles' },
    { value: '50', label: '50 miles' },
    { value: '100', label: '100 miles' },
    { value: '150', label: '150 miles' },
  ];

  const lunchOptions = [
    { value: 'half', label: 'Half Day' },
    { value: 'full', label: 'Full Day' },
  ];

  const subTypeOptions = [
    { value: '', label: 'Select' },
    { value: 'outpatient', label: 'Outpatient Clinic' },
    { value: 'vaccine', label: 'Vaccine Clinic' },
    { value: 'dental', label: 'Dentistry' },
    { value: 'soft-tissue', label: 'Soft Tissue Surgery' },
  ];

  const postLunchOptions = [
    { value: 'nobreak', label: 'No break' },
    { value: '30min', label: '30 min' },
    { value: '60min', label: '60 min' },
    { value: '90min', label: '90 min' },
  ];

  const availableShifts = [
    {
      id: 'shift-1',
      hospital: 'Woodland Animal Hospital',
      sub: 'Emergency & Wellness Hospital',
      date: 'Sat Aug 19, 8:00 AM',
      distance: '14 miles',
      pay: '$1,000',
      coords: { top: '35%', left: '42%' },
    },
    {
      id: 'shift-2',
      hospital: 'Park Avenue Vet Clinic',
      sub: 'Companion Animal Center',
      date: 'Sun Aug 20, 9:00 AM',
      distance: '18 miles',
      pay: '$1,150',
      coords: { top: '55%', left: '72%' },
    },
    {
      id: 'shift-3',
      hospital: 'Metro Pet Emergency & Surgery',
      sub: '24/7 Specialty Center',
      date: 'Wed Aug 23, 7:00 PM',
      distance: '8 miles',
      pay: '$1,400',
      coords: { top: '25%', left: '60%' },
    },
    {
      id: 'shift-4',
      hospital: 'Lakeside Veterinary Center',
      sub: 'General Practice & Wellness',
      date: 'Fri Aug 25, 8:30 AM',
      distance: '22 miles',
      pay: '$950',
      coords: { top: '70%', left: '30%' },
    },
  ];

  const handleRequestCurrentShift = () => {
    const chosen = availableShifts[selectedShiftIndex] || availableShifts[0];
    onRequestShift({
      shift: chosen,
      shiftType,
      zipCode,
      distance,
      lunchDuration,
    });
  };

  const handlePostCurrentSchedule = () => {
    onPostSchedule({
      date: calendarDate,
      shiftType: postShiftType,
      subType: postSubType,
      startTime,
      endTime,
      lunchDuration: postLunchDuration,
    });
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered H2 */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight font-heading mb-6">
            How it works
          </h2>

          {/* Dual Tabs component */}
          <Tabs
            items={[
              {
                id: 'vets-techs',
                label: 'For Veterinarian / Technician',
                icon: <Stethoscope className="w-4 h-4" />,
              },
              {
                id: 'practices',
                label: 'For Practices',
                icon: <Building2 className="w-4 h-4" />,
              },
            ]}
            activeTab={activeTab}
            onTabChange={(id) => setActiveTab(id as 'vets-techs' | 'practices')}
          />
        </div>

        {/* Tab Content: Vets & Techs View */}
        {activeTab === 'vets-techs' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-stretch">
            {/* LEFT CARD: Search Available */}
            <div className="bg-[#EAF7F2] rounded-2xl border-2 border-[#2D9B7C]/40 p-5 sm:p-7 shadow-xs flex flex-col justify-between transition-all hover:shadow-md">
              <div>
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950 inline-block mr-2">
                    Search Available
                  </h3>
                  <span className="text-[#2D9B7C] font-semibold text-sm sm:text-base">
                    (Look for shifts near you)
                  </span>
                </div>

                {/* Form area in white inner container */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100/90 shadow-xs mb-5 space-y-4">
                  {/* Shift Type */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Shift type
                    </label>
                    <Select
                      options={shiftOptions}
                      value={shiftType}
                      onChange={setShiftType}
                    />
                  </div>

                  {/* Zip Code & Distance */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Zip Code
                      </label>
                      <Input
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="e.g. 90210"
                        icon={<MapPin className="w-4 h-4" />}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Distance
                      </label>
                      <Select
                        options={distanceOptions}
                        value={distance}
                        onChange={setDistance}
                      />
                    </div>
                  </div>

                  {/* Lunch Duration */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Lunch Duration
                    </label>
                    <RadioGroup
                      name="searchLunchDuration"
                      options={lunchOptions}
                      value={lunchDuration}
                      onChange={setLunchDuration}
                      inline
                    />
                  </div>
                </div>

                {/* Map Preview with Overlapping Shift Cards */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-800">
                      We search available shifts near you
                    </span>
                    <div className="flex items-center gap-1 text-gray-400">
                      <button
                        type="button"
                        onClick={() => setViewMode('list')}
                        className={`p-1 rounded hover:bg-white transition-colors cursor-pointer ${
                          viewMode === 'list' ? 'text-[#0F4A3E] bg-white' : ''
                        }`}
                        aria-label="List View"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('map')}
                        className={`p-1 rounded hover:bg-white transition-colors cursor-pointer ${
                          viewMode === 'map' ? 'text-[#0F4A3E] bg-white' : ''
                        }`}
                        aria-label="Map View"
                      >
                        <MapIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Map Box */}
                  <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-gray-200 bg-[#E5E9EC] shadow-inner">
                    {/* Stylized Vector Map Background Canvas */}
                    <div className="absolute inset-0 bg-[#E8ECEF]">
                      {/* Streets and Parks SVG Grid */}
                      <svg className="w-full h-full object-cover" viewBox="0 0 400 300" fill="none">
                        {/* Background land */}
                        <rect width="400" height="300" fill="#EBF0EC" />
                        
                        {/* Green Parks */}
                        <path d="M40 30 C 80 20, 120 40, 140 70 C 130 110, 80 120, 40 90 Z" fill="#D4EAD9" />
                        <path d="M260 40 C 310 30, 360 50, 380 90 C 370 130, 310 140, 270 100 Z" fill="#D4EAD9" />
                        <path d="M300 180 C 350 170, 390 190, 400 240 C 370 270, 320 270, 290 230 Z" fill="#D4EAD9" />

                        {/* Waterway */}
                        <path
                          d="M-20 220 Q 120 200, 180 240 T 420 260"
                          stroke="#BDDCF2"
                          strokeWidth="24"
                          fill="none"
                        />

                        {/* Roads Grid */}
                        <path d="M0 60 L400 60" stroke="#FFFFFF" strokeWidth="6" />
                        <path d="M0 130 L400 130" stroke="#FFFFFF" strokeWidth="8" />
                        <path d="M0 210 L400 210" stroke="#FFFFFF" strokeWidth="6" />
                        <path d="M100 0 L100 300" stroke="#FFFFFF" strokeWidth="6" />
                        <path d="M220 0 L220 300" stroke="#FFFFFF" strokeWidth="8" />
                        <path d="M320 0 L320 300" stroke="#FFFFFF" strokeWidth="6" />
                        <path d="M0 0 L400 300" stroke="#FDE68A" strokeWidth="4" strokeDasharray="6 4" opacity="0.8" />

                        {/* Landmarks / Labels */}
                        <text x="50" y="55" fill="#64748B" fontSize="8" fontWeight="600">Ralph Camaño Soccer Complex</text>
                        <text x="280" y="70" fill="#64748B" fontSize="8" fontWeight="600">Wooftopia Dog and Recreation</text>
                        <text x="235" y="150" fill="#334155" fontSize="11" fontWeight="bold">BUFFALO</text>
                        <text x="240" y="195" fill="#64748B" fontSize="8">Pollard Banknote</text>
                        <text x="140" y="240" fill="#64748B" fontSize="8">LaserTopia</text>

                        {/* Map Pins */}
                        {availableShifts.map((shift, idx) => (
                          <g key={shift.id} transform={`translate(${idx === 0 ? 160 : idx === 1 ? 290 : idx === 2 ? 240 : 120}, ${idx === 0 ? 95 : idx === 1 ? 160 : idx === 2 ? 65 : 190})`}>
                            <circle cx="0" cy="0" r="10" fill={selectedShiftIndex === idx ? "#0F4A3E" : "#2D9B7C"} opacity="0.3" />
                            <circle cx="0" cy="0" r="6" fill={selectedShiftIndex === idx ? "#0F4A3E" : "#2D9B7C"} />
                            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
                          </g>
                        ))}
                      </svg>
                    </div>

                    {/* Overlapping Shift Cards Scrollable Overlay on Left */}
                    <div className="absolute top-2 left-2 bottom-2 w-48 sm:w-56 overflow-y-auto custom-scrollbar space-y-2 pr-1 z-10">
                      {availableShifts.map((shift, index) => {
                        const isSelected = selectedShiftIndex === index;
                        return (
                          <div
                            key={shift.id}
                            onClick={() => setSelectedShiftIndex(index)}
                            className={`p-2.5 rounded-lg text-left transition-all cursor-pointer shadow-xs ${
                              isSelected
                                ? 'bg-white border-2 border-[#0F4A3E] ring-1 ring-[#0F4A3E]'
                                : 'bg-white/95 border border-gray-200/90 hover:bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="font-bold text-[11px] sm:text-xs text-gray-900 leading-tight">
                                {shift.hospital}
                              </div>
                              {isSelected && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F4A3E] shrink-0" />
                              )}
                            </div>
                            <div className="text-[10px] text-gray-500 mt-0.5">{shift.date}</div>
                            <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100 text-[10px]">
                              <span className="text-gray-400 font-medium">{shift.distance}</span>
                              <span className="font-bold text-[#0F4A3E]">{`Total pay ${shift.pay}`}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Request Shift Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={handleRequestCurrentShift}
                className="w-full py-3.5 text-sm sm:text-base font-semibold rounded-xl shadow-sm hover:shadow transition-all"
              >
                Request Shift →
              </Button>
            </div>

            {/* RIGHT CARD: Post Your Schedule */}
            <div className="bg-[#FFF5ED] rounded-2xl border-2 border-[#FDBA74]/70 p-5 sm:p-7 shadow-xs flex flex-col justify-between transition-all hover:shadow-md">
              <div>
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950 inline-block mr-2">
                    Post Your Schedule
                  </h3>
                  <span className="text-[#2D9B7C] font-semibold text-sm sm:text-base">
                    (Let practices find you!)
                  </span>
                </div>

                {/* Calendar Component */}
                <Calendar
                  selectedDate={calendarDate}
                  onSelectDate={setCalendarDate}
                  className="shadow-xs mb-4"
                />

                {/* Shifts that you want to work */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-xs mb-5 space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-gray-800 mb-2">
                      Shifts that you want to work
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-1">
                          Shift Type
                        </label>
                        <Select
                          options={shiftOptions}
                          value={postShiftType}
                          onChange={setPostShiftType}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-1">
                          Shift Sub-Type
                        </label>
                        <Select
                          options={subTypeOptions}
                          value={postSubType}
                          onChange={setPostSubType}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Shift Times */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-xs font-semibold text-gray-800">
                        Preferred Shift Times
                      </span>
                      <span className="text-[11px] text-gray-400">
                        (you can edit for each day later)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-1">
                          Start Time
                        </label>
                        <Input
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          placeholder="09:00 AM"
                          icon={<Clock className="w-4 h-4" />}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-gray-600 mb-1">
                          End Time
                        </label>
                        <Input
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          placeholder="05:00 PM"
                          icon={<Clock className="w-4 h-4" />}
                        />
                      </div>
                    </div>

                    {/* Lunch Duration */}
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-1.5">
                        Lunch Duration
                      </label>
                      <RadioGroup
                        name="postLunchDuration"
                        options={postLunchOptions}
                        value={postLunchDuration}
                        onChange={setPostLunchDuration}
                        inline
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Post Schedule Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={handlePostCurrentSchedule}
                className="w-full py-3.5 text-sm sm:text-base font-semibold rounded-xl shadow-sm hover:shadow transition-all"
              >
                Post schedule →
              </Button>
            </div>
          </div>
        ) : (
          /* Tab Content: For Practices View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch animate-in fade-in duration-300">
            {/* Practice Left Card: Find Available Relief Staff */}
            <div className="bg-[#EAF7F2] rounded-2xl border-2 border-[#2D9B7C]/40 p-5 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950 inline-block mr-2">
                    Find Available Staff
                  </h3>
                  <span className="text-[#2D9B7C] font-semibold text-sm sm:text-base">
                    (Vetted Vets & Techs ready to work)
                  </span>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-xs mb-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Role Needed
                      </label>
                      <Select
                        options={[
                          { value: 'vet', label: 'Licensed Veterinarian (DVM)' },
                          { value: 'tech', label: 'Veterinary Technician (RVT/LVT)' },
                          { value: 'assistant', label: 'Vet Assistant' },
                        ]}
                        value={practiceRole}
                        onChange={setPracticeRole}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Specialty / Department
                      </label>
                      <Select
                        options={shiftOptions}
                        value={shiftType}
                        onChange={setShiftType}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Hospital Zip Code
                      </label>
                      <Input
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="e.g. 90210"
                        icon={<MapPin className="w-4 h-4" />}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Max Hourly Budget ($)
                      </label>
                      <Input
                        value={`$${practiceRate}/hr`}
                        onChange={(e) => setPracticeRate(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="$120/hr"
                      />
                    </div>
                  </div>
                </div>

                {/* Available Candidates List */}
                <div className="space-y-2 mb-5">
                  <span className="text-xs font-bold text-gray-800 block">
                    Verified Relief Professionals Available Near You
                  </span>
                  {[
                    {
                      name: 'Dr. Sarah Jenkins, DVM',
                      exp: '8 yrs exp • Emergency & Wellness',
                      rate: '$125/hr',
                      rating: '5.0 (42 shifts)',
                      avail: 'Available this Weekend',
                    },
                    {
                      name: 'Marcus Vance, RVT',
                      exp: '6 yrs exp • Anesthesia & Surgery',
                      rate: '$48/hr',
                      rating: '4.9 (58 shifts)',
                      avail: 'Available Mon - Thu',
                    },
                    {
                      name: 'Dr. Emily Chen, DVM',
                      exp: '11 yrs exp • Soft Tissue Surgery & GP',
                      rate: '$135/hr',
                      rating: '5.0 (65 shifts)',
                      avail: 'Available Next Week',
                    },
                  ].map((cand, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3.5 rounded-xl border border-gray-100 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs text-gray-900">{cand.name}</div>
                        <div className="text-[11px] text-gray-500">{cand.exp}</div>
                        <div className="text-[10px] text-teal-700 font-medium">{cand.avail}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xs text-[#0F4A3E]">{cand.rate}</div>
                        <div className="text-[10px] text-amber-500 font-semibold">{cand.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => onRequestShift({ role: practiceRole, zip: zipCode })}
                className="w-full py-3.5 text-sm sm:text-base font-semibold rounded-xl"
              >
                Hire Relief Staff →
              </Button>
            </div>

            {/* Practice Right Card: Post Open Shifts */}
            <div className="bg-[#FFF5ED] rounded-2xl border-2 border-[#FDBA74]/70 p-5 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-950 inline-block mr-2">
                    Post Shift Coverage Needs
                  </h3>
                  <span className="text-[#2D9B7C] font-semibold text-sm sm:text-base">
                    (Instant match with top talent)
                  </span>
                </div>

                <Calendar
                  selectedDate={calendarDate}
                  onSelectDate={setCalendarDate}
                  className="shadow-xs mb-4"
                />

                <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-xs mb-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-1">
                        Required Role
                      </label>
                      <Select
                        options={[
                          { value: 'vet', label: 'Doctor (DVM)' },
                          { value: 'tech', label: 'Tech (RVT)' },
                        ]}
                        value={practiceRole}
                        onChange={setPracticeRole}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-1">
                        Shift Type
                      </label>
                      <Select
                        options={shiftOptions}
                        value={postShiftType}
                        onChange={setPostShiftType}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-1">
                        Shift Start
                      </label>
                      <Input
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        placeholder="08:00 AM"
                        icon={<Clock className="w-4 h-4" />}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-1">
                        Shift End
                      </label>
                      <Input
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        placeholder="05:00 PM"
                        icon={<Clock className="w-4 h-4" />}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => onPostSchedule({ type: 'practice', role: practiceRole, date: calendarDate })}
                className="w-full py-3.5 text-sm sm:text-base font-semibold rounded-xl"
              >
                Publish Shift Opening →
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
