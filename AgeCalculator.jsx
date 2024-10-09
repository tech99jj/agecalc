import React, { useState } from 'react';
import { Calendar, Clock, Sun, Moon, Sunrise, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const getZodiacSign = (month, day) => {
  // Logic for zodiac sign calculation would go here
  return "Libra"; // Placeholder
};

const getSeason = (month) => {
  const seasons = {
    winter: [12, 1, 2],
    spring: [3, 4, 5],
    summer: [6, 7, 8],
    autumn: [9, 10, 11]
  };
  
  for (const [season, months] of Object.entries(seasons)) {
    if (months.includes(month)) return season;
  }
  return "Unknown";
};

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState({ year: '', month: '', day: '' });
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    const { year, month, day } = birthDate;
    if (!year || !month || !day) {
      setError('Please fill in all fields');
      return;
    }

    const birthDateTime = new Date(year, month - 1, day);
    const now = new Date();

    if (birthDateTime > now) {
      setError('Birth date cannot be in the future');
      return;
    }

    const diffTime = Math.abs(now - birthDateTime);
    const ageDate = new Date(diffTime);
    
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
    
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffTime / (1000 * 60));
    const totalSeconds = Math.floor(diffTime / 1000);
    const totalWeeks = Math.floor(totalDays / 7);

    const dayOfWeek = birthDateTime.toLocaleDateString('en-US', { weekday: 'long' });
    const zodiacSign = getZodiacSign(month, day);
    const season = getSeason(month);

    // Calculate next birthday
    let nextBirthday = new Date(now.getFullYear(), month - 1, day);
    if (nextBirthday < now) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
    const nextBirthdayDay = nextBirthday.toLocaleDateString('en-US', { weekday: 'long' });

    setResults({
      years, months, days, totalMonths: years * 12 + months,
      totalWeeks, totalDays, totalHours, totalMinutes, totalSeconds,
      dayOfWeek, zodiacSign, season, daysUntilBirthday, nextBirthdayDay
    });
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Modern Age Calculator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          placeholder="Year"
          className="p-2 border rounded"
          value={birthDate.year}
          onChange={(e) => setBirthDate({ ...birthDate, year: e.target.value })}
        />
        <input
          type="number"
          placeholder="Month"
          className="p-2 border rounded"
          min="1"
          max="12"
          value={birthDate.month}
          onChange={(e) => setBirthDate({ ...birthDate, month: e.target.value })}
        />
        <input
          type="number"
          placeholder="Day"
          className="p-2 border rounded"
          min="1"
          max="31"
          value={birthDate.day}
          onChange={(e) => setBirthDate({ ...birthDate, day: e.target.value })}
        />
      </div>

      <button 
        onClick={calculateAge}
        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
      >
        Calculate Age
      </button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Age Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Years: {results.years}</p>
              <p>Months: {results.months}</p>
              <p>Days: {results.days}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Total Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Months: {results.totalMonths}</p>
              <p>Weeks: {results.totalWeeks}</p>
              <p>Days: {results.totalDays}</p>
              <p>Hours: {results.totalHours}</p>
              <p>Minutes: {results.totalMinutes}</p>
              <p>Seconds: {results.totalSeconds}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Birth Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Day of Week: {results.dayOfWeek}</p>
              <p>Zodiac Sign: {results.zodiacSign}</p>
              <p>Season: {results.season}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5" />
                Next Birthday
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Days until next birthday: {results.daysUntilBirthday}</p>
              <p>Day of week: {results.nextBirthdayDay}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Ad Space Placeholders */}
      <div className="h-[250px] bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded">
        Ad Space - Top Banner (728x90)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[600px] bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded">
          Ad Space - Sidebar (300x600)
        </div>
        <div className="h-[600px] bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded">
          Ad Space - Sidebar (300x600)
        </div>
      </div>
    </div>
  );
}