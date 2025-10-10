// import { useNavigate } from 'react-router-dom';
import EventsList, { EventItem } from '../../components/events/EventsList/EventsList';
import Layout from '../../components/layout/Layout';
// import EventForm from '../../components/forms/EventForm';
import styles from './EventsPage.module.css';

const EventsPage = () => {
  // const navigate = useNavigate();

  const sampleEvents: EventItem[] = [
{
id: 'ev-1',
title: 'Conference: Frontend Days',
description: 'Двухдневная конференция про современные подходы во фронтенде.',
startAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
endAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString(),
location: 'Москва, Коворкинг Центр',
imageUrl: '',
tags: ['frontend', 'react'],
capacity: 120,
attendees: 60,
priceCents: 29900,
},
{
id: 'ev-2',
title: 'Вебинар: Тестирование компонентов',
startAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
endAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
location: 'онлайн',
tags: ['testing'],
capacity: 500,
attendees: 420,
priceCents: 0,
}
];

  return (
    <Layout>
      <section className={styles.events}>
        <div className={styles.wavyContainer}>
          {/* <EventForm navigate={navigate}/> */}
          <EventsList events={sampleEvents} onEventClick={(id) => console.log('open', id)} />;
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;