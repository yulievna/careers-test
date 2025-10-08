import React, {useState, useRef, useEffect, useMemo} from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

interface HeaderProps {
  onSearchChange?: (searchText: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useMemo(
      () => debounce((value: string) => onSearchChange?.(value.trim()), 300),
      [onSearchChange]
  );

  const handleSearchClick = () => setIsSearchOpen((p) => !p);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isSearchOpen]);


  return (
      <header className={s.header}>
        <div className={s.header__container}>
          <div className={s.header__logo}>
            <a href="/"><img
                src='/assets/images/logo.svg'
                alt="Figma"
                className={s.header__logoImage}
            /></a>
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

            <div className={s.header__searchContainer}>
              <div className={`${s.header__searchInputWrapper} ${isSearchOpen ? s.header__searchInputWrapper_open : ''}`}>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Поиск по названию вакансии..."
                    value={searchText}
                    onChange={handleSearchChange}
                    className={s.header__searchInput}
                />
              </div>
              <button
                  className={s.header__searchBtn}
                  onClick={handleSearchClick}
                  aria-label="Открыть поиск"
              >
                <img
                    src="/assets/images/search-normal.svg"
                    alt="Search"
                    className={s.header__searchIcon}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;