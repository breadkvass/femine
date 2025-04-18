import { ReactElement, useEffect, useState } from "react";

export type UseModalType = [
  openModal: (content: ReactElement) => void,
  closeModal: () => void,
  content: ReactElement | null,
];

// Глобальный счетчик открытых модалок
let modalCount = 0;

export const useModal = () => {
  const [content, setContent] = useState<ReactElement | null>(null);
  const [, setScrollBarWidth] = useState(0);

  const handleBodyLock = () => {
    const body = document.body;
    const html = document.documentElement;

    if (modalCount === 0) {
      // Сохраняем ширину скроллбара только при первом открытии
      const scrollBarWidth = window.innerWidth - html.clientWidth;
      setScrollBarWidth(scrollBarWidth);

      // Блокируем скролл на обоих элементах
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      
      // Компенсируем исчезновение скроллбара
      body.style.paddingRight = `${scrollBarWidth}px`;
    }
    modalCount++;
  };

  const handleBodyUnlock = () => {
    modalCount = Math.max(0, modalCount - 1);
    
    if (modalCount === 0) {
      const body = document.body;
      const html = document.documentElement;

      // Восстанавливаем стили
      body.style.overflow = "";
      html.style.overflow = "";
      body.style.paddingRight = "";
    }
  };

  useEffect(() => {
    if (content) {
      handleBodyLock();
    } else {
      handleBodyUnlock();
    }

    return () => {
      if (content) {
        handleBodyUnlock();
      }
    };
  }, [content]);

  const openModal = (content: ReactElement) => {
    setContent(content);
  };

  const closeModal = () => {
    setContent(null);
  };

  return [openModal, closeModal, content] as UseModalType;
};