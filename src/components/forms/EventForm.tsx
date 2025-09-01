import { useState, useEffect, FormEvent, ChangeEvent, useCallback, useContext, FC } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { ModalContext } from '../../hooks/useModal/useModalProvider';
import Data from '../../../public/data.json';
// import { getEventsThunk } from '../../utils/api';
import styles from './Form.module.css';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';

type FormErrors = {
  meeting?: string;
  name?: string;
  adult?: string;
  telegram?: string;
};

type TouchedFields = {
  meeting: boolean;
  name: boolean;
  adult: boolean;
  telegram: boolean;
};

type EventFormProps = {
  navigate: NavigateFunction;
}

const EventForm: FC<EventFormProps> = ({navigate}) => {
  // const dispatch = useAppDispatch();
  // const { eventsList } = useAppSelector((state) => state.events);
  const [ , closeModal ] = useContext(ModalContext);
  const [ selectedMeeting, setSelectedMeeting ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const [ isAdult, setIsAdult ] = useState<'да'| 'нет' | null>(null);
  const [ telegram, setTelegram ] = useState<string>('@');
  const [ errors, setErrors ] = useState<FormErrors>({});
  const [ touched, setTouched ] = useState<TouchedFields>({
    meeting: false,
    name: false,
    adult: false,
    telegram: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [ isSuccessful, setIsSuccessful ] = useState<boolean | null>(null);

  const eventsList = Data.events;

  // useEffect(() => {
  //   dispatch(getEventsThunk())
  
  // }, [])
  //   console.log(selectedMeeting)

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    if (!selectedMeeting) newErrors.meeting = 'выбери, пожалуйста, мероприятие';
    if (!name.trim()) newErrors.name = 'как к тебе лучше обращаться?';
    if (isAdult === null) newErrors.adult = 'отметь возраст';
    if (!telegram.match(/^@\w{5,32}$/)) newErrors.telegram = 'некорректный telegram';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedMeeting, name, isAdult, telegram]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [validateForm]);

  const handleTelegramChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = '@' + value.replace(/@/g, '');
    setTelegram(value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Фильтруем введенные символы с помощью регулярного выражения
    const filteredValue = newValue.replace(/[^a-zA-Zа-яёА-ЯЁ\s\-.]/g, '');
    setName(filteredValue);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (isFormValid) {
      submitHandler(e);
      // Сброс формы
      setSelectedMeeting('');
      setName('');
      setIsAdult(null);
      setTelegram('@');
      setTouched({
        meeting: false,
        name: false,
        adult: false,
        telegram: false
      });
      setSubmitted(false);
    }
  };

  const closeHandler = () => {
    closeModal();
    if (isSuccessful) {
      navigate('/');
    } else navigate('/events')
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const event = eventsList.find((item) => item.value === selectedMeeting);
    if (event) {
      const formData = {
        event: event.label,
        name: name,
        isAdult: isAdult,
        telegram: telegram
      }

      await fetch(`https://femine.space/requests.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(async (res: Response) => {
        if (res.ok) {
          return res.json();
        }
        const err = await res.json();
        return await Promise.reject(err);
      })
      .then(() => setIsSuccessful(true))
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
      });
    }
  }

  const handleBlur = (field: keyof TouchedFields) => {
    if (!touched[field]) {
      setTouched(prev => ({ ...prev, [field]: true }));
    }
  };

  const shouldShowError = (field: keyof TouchedFields) => {
    return (submitted || touched[field]) && errors[field];
  };

  return isSuccessful === null ? (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>мероприятие</label>
        <select
          value={selectedMeeting}
          onChange={(e) => setSelectedMeeting(e.target.value)}
          onBlur={() => handleBlur('meeting')}
          className={styles.select}
        >
        <option key={0} value="">выбери мероприятие</option>
          {eventsList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {shouldShowError('meeting') && (
          <span className={styles.error}>{errors.meeting}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>твоё имя</label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleChangeName(e)}
          onBlur={() => handleBlur('name')}
          className={styles.input}
        />
        {shouldShowError('name') && (
          <span className={styles.error}>{errors.name}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.radioGroup}>
          <p>тебе есть 18?</p>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="adult"
              checked={isAdult === 'да'}
              onChange={() => setIsAdult('да')}
              onBlur={() => handleBlur('adult')}
              className={styles.radio}
            />
            Да
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="adult"
              checked={isAdult === 'нет'}
              onChange={() => setIsAdult('нет')}
              onBlur={() => handleBlur('adult')}
              className={styles.radio}
            />
            Нет
          </label>
        </div>
        {shouldShowError('adult') && <span className={styles.error}>{errors.adult}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>твой telegram:</label>
        <input
          type="text"
          value={telegram}
          onChange={handleTelegramChange}
          onBlur={() => handleBlur('telegram')}
          className={styles.input}
        />
        {shouldShowError('telegram') && (
          <span className={styles.error}>{errors.telegram}</span>
        )}
      </div>

      <button 
        type="submit" 
        className={styles.button}
        disabled={!isFormValid}
      >
        Записаться
      </button>
      <p className={styles.text}>на&nbsp;данном этапе оплата не&nbsp;потребуется</p>
    </form>
  ) : (isSuccessful === true ? (
    <div className={styles.final}>
      <p>Спасибо, что&nbsp;записалась на&nbsp;встречу! Буду&nbsp;рада тебя увидеть!</p>
      <p>Я постараюсь связаться с&nbsp;тобой в&nbsp;телеграме как&nbsp;можно быстрее, 
        но&nbsp;если&nbsp;ответ затянется, ты всегда можешь маякнуть мне в&nbsp;комментариях 
        на&nbsp;нашем <a href='http://t.me/femine_moscow'>telegram-канале</a></p>
      <button className={styles.button} onClick={closeHandler}>хорошо, спасибо &#128150;</button>
    </div>
  ) : (
    <div className={styles.final}>
      <p>Упс... Не получилось отправить форму.</p>
      <p>Пожалуйста, попробуй позже. Если снова не выйдет, маякни в&nbsp;комментариях 
        на&nbsp;нашем <a href='http://t.me/femine_moscow'>telegram-канале</a>. Буду 
        тебе очень благодарна!</p>
      <button className={styles.button} onClick={closeHandler}>хорошо, я попробую &#128546;</button>
    </div>
  ))
};

export default EventForm;