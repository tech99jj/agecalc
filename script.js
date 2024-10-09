document.getElementById('current-year').innerText = new Date().getFullYear();

document.getElementById('dob-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user input
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');

    const year = parseInt(yearInput.value);
    const month = parseInt(monthInput.value) - 1; // Months are zero-indexed
    const day = parseInt(dayInput.value);

    const dob = new Date(year, month, day);
    const now = new Date();

    // Input validation
    if (dob > now) {
        alert('Date of birth cannot be in the future.');
        return;
    }

    if (isNaN(dob.getTime())) {
        alert('Invalid date. Please check your input.');
        return;
    }

    // Calculate age components
    calculateAge(dob, now);
});

function calculateAge(dob, now) {
    // Age in years, months, days
    let ageYears = now.getFullYear() - dob.getFullYear();
    let ageMonths = now.getMonth() - dob.getMonth();
    let ageDays = now.getDate() - dob.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    document.getElementById('age-ymd').innerText = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;

    // Age in smaller units
    const totalDays = Math.floor((now - dob) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (ageYears * 12) + ageMonths;

    document.getElementById('age-total').innerText = `
        That's approximately ${totalMonths} months, ${totalWeeks} weeks, or ${totalDays} days.
    `;

    // Astrological Sign
    const zodiacSign = getZodiacSign(dob.getDate(), dob.getMonth() + 1);
    document.getElementById('zodiac-sign').innerText = `Your astrological sign is ${zodiacSign}.`;

    // Day of the Week Born
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekBorn = daysOfWeek[dob.getDay()];
    document.getElementById('day-of-week').innerText = `You were born on a ${dayOfWeekBorn}.`;

    // Season Born
    const season = getSeason(dob);
    document.getElementById('season').innerText = `You were born in ${season}.`;

    // Next Birthday Countdown
    let nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const oneDay = 1000 * 60 * 60 * 24;
    const daysUntilBirthday = Math.ceil((nextBirthday - now) / oneDay);

    const nextBirthdayDay = daysOfWeek[nextBirthday.getDay()];
    document.getElementById('next-birthday').innerText = `Only ${daysUntilBirthday} days left until your next birthday!`;
    document.getElementById('next-birthday-day').innerText = `It will be on a ${nextBirthdayDay}.`;

    // Show results
    document.getElementById('results').style.display = 'block';

    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// Function to determine zodiac sign
function getZodiacSign(day, month) {
    const zodiacSigns = [
        { sign: 'Capricorn', startDate: new Date(0, 0, 1), endDate: new Date(0, 0, 19) },
        { sign: 'Aquarius', startDate: new Date(0, 0, 20), endDate: new Date(0, 1, 18) },
        { sign: 'Pisces', startDate: new Date(0, 1, 19), endDate: new Date(0, 2, 20) },
        { sign: 'Aries', startDate: new Date(0, 2, 21), endDate: new Date(0, 3, 19) },
        { sign: 'Taurus', startDate: new Date(0, 3, 20), endDate: new Date(0, 4, 20) },
        { sign: 'Gemini', startDate: new Date(0, 4, 21), endDate: new Date(0, 5, 20) },
        { sign: 'Cancer', startDate: new Date(0, 5, 21), endDate: new Date(0, 6, 22) },
        { sign: 'Leo', startDate: new Date(0, 6, 23), endDate: new Date(0, 7, 22) },
        { sign: 'Virgo', startDate: new Date(0, 7, 23), endDate: new Date(0, 8, 22) },
        { sign: 'Libra', startDate: new Date(0, 8, 23), endDate: new Date(0, 9, 22) },
        { sign: 'Scorpio', startDate: new Date(0, 9, 23), endDate: new Date(0, 10, 21) },
        { sign: 'Sagittarius', startDate: new Date(0, 10, 22), endDate: new Date(0, 11, 21) },
        { sign: 'Capricorn', startDate: new Date(0, 11, 22), endDate: new Date(0, 11, 31) }
    ];

    const birthDate = new Date(0, month - 1, day);

    for (const zodiac of zodiacSigns) {
        if (birthDate >= zodiac.startDate && birthDate <= zodiac.endDate) {
            return zodiac.sign;
        }
    }
}

// Function to determine season
function getSeason(date) {
    const month = date.getMonth();
    const day = date.getDate();

    if ((month == 11 && day >= 21) || (month <= 1 && day <= 19)) {
        return 'Winter';
    } else if ((month == 2 && day >= 20) || (month <= 4 && day <= 20)) {
        return 'Spring';
    } else if ((month == 5 && day >= 21) || (month <= 7 && day <= 22)) {
        return 'Summer';
    } else {
        return 'Autumn';
    }
}