import React, { useEffect, useState, useRef, useCallback } from 'react';
import s from './VacancyModal.module.css';

interface VacancyModal {
  id: string;
  title: string;
  city: string;
  responsibilities: string[];
  requirements: string[];
  conditions: string[];
}

interface VacancyModalProps {
  open: boolean;
  onClose: () => void;
  vacancy: VacancyModal;
}

const VacancyModal: React.FC<VacancyModalProps> = ({ open, onClose, vacancy }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open && !isClosing) {
        handleClose();
      }
    },
    [open, isClosing]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('no-scroll');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('no-scroll');
    };
  }, [open, handleKeyDown]);

  const handleClose = useCallback(() => {
    if (isClosing) return;

    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [onClose, isClosing]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSendBtnClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      handleClose();
    }, 2000);
  };

  if (!open && !isClosing) return null;

  const sections = [
    { title: 'Обязанности', items: vacancy.responsibilities },
    { title: 'Требования', items: vacancy.requirements },
    { title: 'Условия', items: vacancy.conditions },
  ];

  return (
    <div
      className={`${s.modal__overley} ${isClosing ? s.closing : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div
        className={`${s.modal__content} ${isClosing ? s.closing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={s.modal__closeBtn} onClick={handleClose}>
          <img src="/assets/images/close-circle.png" alt="Close circle" />
        </button>

        <div className={s.modal__title} id="modal-title">
          {vacancy.title}
        </div>
        <div className={s.modal__city}>Город: {vacancy.city}</div>

        {sections.map(({ title, items }) => (
          <div key={title} className={s.modal__section}>
            <div className={s.modal__sectionTitle}>{title}:</div>
            <ul className={s.modal__list}>
              {items.map((item, i) => (
                <li key={i} className={s.modal__listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button className={s.modal__sendBtn} onClick={handleSendBtnClick}>
          Откликнуться на вакансию
        </button>

        {showToast && <div className={s.toast}>Заявка отправлена</div>}
      </div>
    </div>
  );
};

export default VacancyModal;
