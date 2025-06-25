import React, { useEffect, useState } from 'react';
import bookingsData from '../../utils/calendar.json';
import styles from './Calendar.module.css';

interface Booking {
  date: string;
  time: string;
  name: string;
}

interface Props {
  selectedDate: string;
  onSelectTime: (time: string) => void;
}

const Calendar: React.FC<Props> = ({ selectedDate, onSelectTime }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(bookingsData);
  }, []);

  const times = Array.from({ length: 12 }, (_, i) => `${10 + i}:00`);

  const isBooked = (time: string) =>
    bookings.some(b => b.date === selectedDate && b.time === time);

  return (
    <div>
      <h2>Доступные слоты на {selectedDate}</h2>
      <div className={styles.grid}>
        {times.map(time => (
          <button
            key={time}
            disabled={isBooked(time)}
            onClick={() => onSelectTime(time)}
            className={`${styles.slot} ${
              isBooked(time) ? styles.booked : styles.available
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
