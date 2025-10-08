import React from 'react';
import s from './Footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footer__container}>
        <div className={s.footer__main}>
          <div className={s.footer__logo}>
            <a href="/">
              <img src="/assets/images/logo-white.svg" alt="Figma" />
            </a>
          </div>

          <nav className={s.footer__navList}>
            <NavLink to="/about" className={s.footer__navItem}>
              О НАС
            </NavLink>
            <NavLink to="/assets" className={s.footer__navItem}>
              АКТИВЫ
            </NavLink>
            <NavLink to="/media" className={s.footer__navItem}>
              МЕДИА
            </NavLink>
            <NavLink to="/careers" className={s.footer__navItem}>
              КАРЬЕРА
            </NavLink>
            <NavLink to="/investors" className={s.footer__navItem}>
              ИНВЕСТОРАМ
            </NavLink>
            <NavLink to="/suppliers" className={s.footer__navItem}>
              ПОСТАВЩИКАМ
            </NavLink>
            <NavLink to="/contacts" className={s.footer__navItem}>
              КОНТАКТЫ
            </NavLink>
          </nav>

          <div className={s.footer__contacts}>
            <div className={s.footer__contact}>
              <p className={s.footer__contactTitle}>+7 (999) 451-55-55</p>
              <p className={s.footer__contactText}>По всем вопросам</p>
            </div>
            <div className={s.footer__contact}>
              <p className={s.footer__contactTitle}>info@figma.ru</p>
              <p className={s.footer__contactText}>Корпоративная почта</p>
            </div>
            <div className={s.footer__contact}>
              <p className={s.footer__contactTitle}>USA, California 6772699</p>
              <p className={s.footer__contactText}>Центральный офис</p>
            </div>
          </div>

          <div className={s.footer__more}>
            <p>Хотите узнать больше о нашей работе? Задайте вопрос — мы на связи.</p>
            <button className={s.footer__btn}>Связаться</button>
          </div>
        </div>

        <div className={s.footer__divider}></div>

        <div className={s.footer__bottom}>
          <p>© 2025 ООО «СибЗолото»</p>
          <p>
            <a href="/privacy-policy">Политика конфиденциальности</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
