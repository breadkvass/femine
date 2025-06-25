import { useState, FormEvent } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { createEventThunk } from '../../../utils/api';
import { EventData } from '../../../utils/types';

const CreateEventForm = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [format, setFormat] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const token = localStorage.getItem('accessToken')

  const createEvent = async (eventData: EventData) => {
    await dispatch(createEventThunk(eventData)).unwrap()
      .then(() => {
        setSuccess(true);
        setTitle('');
        setDescription('');
        setDateTime('');
        setFormat('ONLINE');
      })
      .catch((error) => setError(error))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title || !description || !dateTime || !format) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    if (!token) {
      setError('Ошибка авторизации');
      return;
    }

    const eventData: EventData = {
      title,
      description,
      dateTime: new Date(dateTime).toISOString(), // преобразование
      format,
      token,
    };

    createEvent(eventData);
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>Создание мероприятия</h2>

      <div>
        <label>Название</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Описание</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Дата и время</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
      </div>

      <div>
        <label>Формат</label>
        <select value={format} onChange={(e) => setFormat(e.target.value as 'ONLINE' | 'OFFLINE')}>
          <option value="ONLINE">Онлайн</option>
          <option value="OFFLINE">Офлайн</option>
        </select>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Мероприятие создано!</p>}

      <button type="submit">Создать</button>
    </form>
  );
};

export default CreateEventForm;
