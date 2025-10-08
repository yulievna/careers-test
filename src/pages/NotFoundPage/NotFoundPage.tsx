import React from 'react';
import s from './NotFoundPage.module.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/careers');
  };

  return (
    <div className={s.notFound}>
      <div className={s.notFound__container}>
        <h1 className={s.notFound__title}>404</h1>
        <h2 className={s.notFound__subtitle}>Страница не найдена</h2>
        <button className={s.notFound__btn} onClick={goHome}>
          На главную
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
