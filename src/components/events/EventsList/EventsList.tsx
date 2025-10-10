// File: src/components/EventsList/EventsList.tsx
// React + TypeScript компонент для отображения списка мероприятий
// Стили — CSS Modules: EventsList.module.css

import React, { FC, useMemo } from 'react';
import Logo from '../../../assets/images/logo.png';
import styles from './EventsList.module.css';

export type EventStatus = 'upcoming' | 'ongoing' | 'past';

export interface EventItem {
  id: string;
  title: string;
  description?: string;
  startAt: string; // ISO
  endAt?: string; // ISO
  location?: string;
  imageUrl?: string;
  tags?: string[];
  capacity?: number;
  attendees?: number;
  priceCents?: number | null;
  // optional: заранее вычисленный статус, если есть — компонент использует его, иначе вычисляет сам
  status?: EventStatus;
}

interface EventsListProps {
  events: EventItem[];
  onEventClick?: (id: string) => void;
  showImages?: boolean; // по умолчанию true
  className?: string;
}

function getComputedStatus(ev: EventItem): EventStatus {
  if (ev.status) return ev.status;
  const now = Date.now();
  const s = new Date(ev.startAt).getTime();
  const e = ev.endAt ? new Date(ev.endAt).getTime() : s;
  if (now < s) return 'upcoming';
  if (now >= s && now <= e) return 'ongoing';
  return 'past';
}

function formatDateRange(startIso: string, endIso?: string) {
  const start = new Date(startIso);
  const end = endIso ? new Date(endIso) : undefined;
  const sameDay = end && start.toDateString() === end.toDateString();

  const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit', minute: '2-digit'
  });

  if (!end) {
    return `${dateFormatter.format(start)}, ${timeFormatter.format(start)}`;
  }

  if (sameDay) {
    return `${dateFormatter.format(start)}, ${timeFormatter.format(start)} — ${timeFormatter.format(end as Date)}`;
  }

  return `${dateFormatter.format(start)} ${timeFormatter.format(start)} — ${dateFormatter.format(end as Date)} ${timeFormatter.format(end as Date)}`;
}

const EventsList: FC<EventsListProps> = ({ events, onEventClick, showImages = true, className }) => {
  // сортируем по дате начала (восходящий)
  const sorted = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [events]);

  if (!events || events.length === 0) {
    return (
      <div className={`${styles.empty} ${className ?? ''}`} role="status" aria-live="polite">
        <p className={styles.emptyTitle}>Список мероприятий пуст</p>
        <p className={styles.emptySubtitle}>Проверьте фильтры или добавьте новые мероприятия.</p>
      </div>
    );
  }

  return (
    <section className={`${styles.container} ${className ?? ''}`} aria-label="Список мероприятий">
      <ul className={styles.list} role="list">
        {sorted.map(ev => {
          const status = getComputedStatus(ev);
          const occupancy = ev.capacity ? `${ev.attendees ?? 0}/${ev.capacity}` : null;

          return (
            <li key={ev.id} className={styles.item}>
              <article
                className={styles.card}
                role="button"
                tabIndex={0}
                aria-pressed={false}
                onClick={() => onEventClick?.(ev.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onEventClick?.(ev.id); }
                }}
                aria-labelledby={`ev-title-${ev.id}`}
              >
                {showImages && (
                  <div className={styles.media}>
                    <img
                      src={Logo}
                      alt={ev.imageUrl ? `${ev.title}` : 'Заглушка — изображение отсутствует'}
                      className={styles.image}
                      loading="lazy"
                    //   onError={(e) => { (e.currentTarget as HTMLImageElement).src = {Logo}; }}
                    />
                  </div>
                )}

                <div className={styles.body}>
                  <header className={styles.header}>
                    <h3 id={`ev-title-${ev.id}`} className={styles.title}>{ev.title}</h3>
                    <div className={`${styles.status} ${styles[status]}`} aria-hidden>
                      {status === 'upcoming' && 'Скоро'}
                      {status === 'ongoing' && 'Сейчас'}
                      {status === 'past' && 'Прошло'}
                    </div>
                  </header>

                  <p className={styles.when}>
                    <time dateTime={ev.startAt}>{formatDateRange(ev.startAt, ev.endAt)}</time>
                    {ev.location && <span className={styles.location}> • {ev.location}</span>}
                  </p>

                  {ev.description && <p className={styles.description}>{ev.description}</p>}

                  <div className={styles.metaRow}>
                    <div className={styles.leftMeta}>
                      {ev.tags && ev.tags.length > 0 && (
                        <ul className={styles.tags} aria-label="теги события">
                          {ev.tags.slice(0, 4).map((t) => (
                            <li key={t} className={styles.tag}>#{t}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className={styles.rightMeta}>
                      {occupancy && <div className={styles.occupancy} aria-label={`заполнено ${occupancy}`}>{occupancy}</div>}
                      {typeof ev.priceCents === 'number' && (
                        <div className={styles.price}>{(ev.priceCents / 100).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default EventsList;


// ---------------------------
// File: src/components/EventsList/EventsList.module.css
// Пример CSS Modules — адаптивный, доступный, модульный стиль

