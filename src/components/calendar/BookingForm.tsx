import React, { useState } from 'react';
import styles from './BookingForm.module.css';

interface Props {
  date: string;
  time: string;
  onSubmit: (name: string) => void;
}

const BookingForm: React.FC<Props> = ({ date, time, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <strong>Вы бронируете: {date} в {time}</strong>
      </div>
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={e => setName(e.target.value)}
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>
        Отправить заявку
      </button>
    </form>
  );
};

export default BookingForm;
