import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.header__container}>
                <div className={s.header__logo}>
                    <img 
                        src='/assets/images/logo.svg' 
                        alt="Figma" 
                        className={s.header__logoImage}
                    />
                </div>

                <div className={s.header__navContainer}>
                    <nav className={s.header__navList}>
                        <NavLink to="/about" className={s.header__navItem}>
                            <span className={s.header__navNumber}>01</span>
                            <span className={s.header__navText}>О НАС</span>
                        </NavLink>
                        <NavLink to="/media" className={s.header__navItem}>
                            <span className={s.header__navNumber}>02</span>
                            <span className={s.header__navText}>МЕДИА</span>
                        </NavLink>
                        <NavLink to="/careers" className={s.header__navItem}>
                            <span className={s.header__navNumber}>03</span>
                            <span className={s.header__navText}>КАРЬЕРА</span>
                        </NavLink>
                        <NavLink to="/investors" className={s.header__navItem}>
                            <span className={s.header__navNumber}>04</span>
                            <span className={s.header__navText}>ИНВЕСТОРАМ</span>
                        </NavLink>
                        <NavLink to="/suppliers" className={s.header__navItem}>
                            <span className={s.header__navNumber}>05</span>
                            <span className={s.header__navText}>ПОСТАВЩИКАМ</span>
                        </NavLink>
                        <NavLink to="/contacts" className={s.header__navItem}>
                            <span className={s.header__navNumber}>06</span>
                            <span className={s.header__navText}>КОНТАКТЫ</span>
                        </NavLink>
                    </nav>

                    <button className={s.header__searchBtn}>
                        <img 
                            src="/assets/images/search-normal.svg" 
                            alt="Search" 
                            className={s.header__searchIcon} 
                        />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;