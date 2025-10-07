import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import s from './VacancyCard.module.css';
import VacancyModal from '../VacancyModal/VacancyModal';
import { on } from 'node:stream';

interface Vacancy{
    id: string;
    title: string;
    tags: string[];
}

interface VacancyProps{
    vacancy: Vacancy;
    onClick: (id: string) => void;
}

const VacancyCard: React.FC<VacancyProps> = ({vacancy, onClick}) => {
    return (
        <div className={s.card}>
            <div className={s.card__info}>
                <div className={s.card__title}>{vacancy.title}</div>
                <div className={s.card__tags}>
                    {vacancy.tags.map((tag, i) => (
                        <div key={i} className={s.card__tag}>
                            {tag}
                        </div>
                    ))}
                    
                </div>
            </div>
            <button className={s.card__btn} onClick={() => onClick(vacancy.id)}>Подробнее <img className={s.card__btnImg} src="/assets/images/arrow-right.png" alt="arrow" /></button>
        </div>
    );
};

export default VacancyCard;