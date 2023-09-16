import React, { useState } from "react";
import moment from "moment";
// import './Calendar.css'; // Import the CSS file for styling

const Calendar = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const renderCalendar = () => {
    const startOfMonth = moment()
      .month(selectedMonth)
      .year(selectedYear)
      .startOf("month");
    const endOfMonth = moment()
      .month(selectedMonth)
      .year(selectedYear)
      .endOf("month");
    const today = moment();

    const days = [];
    let day = startOfMonth;

    while (day.isSameOrBefore(endOfMonth)) {
      days.push(day);
      day = day.clone().add(1, "day");
    }

    return (
      <table className="calendar">
        <thead>
          <tr>
            <th colSpan="7">
              <select value={selectedMonth} onChange={handleMonthChange}>
                {moment.months().map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select value={selectedYear} onChange={handleYearChange}>
                {renderYearOptions()}
              </select>
            </th>
          </tr>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => (
            <tr key={index}>
              {[0, 1, 2, 3, 4, 5, 6].map((weekDay) => {
                const isToday = day.isSame(today, "day");
                const isInRange = day.isBetween(startDate, endDate, "day");
                const isCurrentMonth = day.month() === selectedMonth;

                return (
                  <td
                    key={weekDay}
                    className={`calendar-day ${
                      !isCurrentMonth ? "calendar-day--outside" : ""
                    } ${isToday ? "calendar-day--today" : ""} ${
                      isInRange ? "calendar-day--range" : ""
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    {isCurrentMonth ? day.format("D") : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleDateClick = (day) => {
    // Handle logic for selecting start and end dates
    // ...
  };

  const renderYearOptions = () => {
    const years = [];
    const currentYear = moment().year();

    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      years.push(year);
    }

    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  return <div>{renderCalendar()}</div>;
};

export default Calendar;
