import { useState } from 'react';
import Calendar from '../../components/calendar/Calendar';
import BookingForm from '../../components/calendar/BookingForm';
import Layout from '../../components/layout/Layout';
import styles from './CalendarPage.module.css';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleBookingSubmit = (name: string) => {
    console.log('Заявка отправлена:', { date: selectedDate, time: selectedTime, name });
    setSubmitted(true);
  };

  return (
    <Layout>
    <div className={styles.container}>
      <h1 className={styles.title}>Календарь бронирования</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={e => {
          setSelectedDate(e.target.value);
          setSelectedTime('');
          setSubmitted(false);
        }}
        className={styles.datePicker}
      />
      <Calendar selectedDate={selectedDate} onSelectTime={setSelectedTime} />
      {selectedTime && !submitted && (
        <BookingForm date={selectedDate} time={selectedTime} onSubmit={handleBookingSubmit} />
      )}
      {submitted && <p className={styles.success}>Заявка успешно отправлена!</p>}
    </div>
    </Layout>
  );
};

export default CalendarPage;