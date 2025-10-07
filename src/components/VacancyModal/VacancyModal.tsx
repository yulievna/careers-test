import React, { useEffect } from "react";
import s from "./VacancyModal.module.css";

interface Vacancy {
  id: string;
  title: string;
  city: string;
  responsibilities: string[];
  requirements: string[];
  conditions: string[];
}

interface VacancyProps {
  open: boolean;
  onClose: () => void;
  vacancy: Vacancy;
}

const VacancyModal: React.FC<VacancyProps> = ({ open, onClose, vacancy }) => {
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  if (!open) return null;

  const sections = [
    { title: "Обязанности", items: vacancy.responsibilities },
    { title: "Требования", items: vacancy.requirements },
    { title: "Условия", items: vacancy.conditions },
  ];

  return (
    <div className={s.modal__overley} onClick={onClose}>
      <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
        <button className={s.modal__closeBtn} onClick={onClose}>
          <img src="/assets/images/close-circle.png" alt="Close circle" />
        </button>

        <div className={s.modal__title}>{vacancy.title}</div>
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

        <button className={s.modal__sendBtn}>Откликнуться на вакансию</button>
      </div>
    </div>
  );
};

export default VacancyModal;
