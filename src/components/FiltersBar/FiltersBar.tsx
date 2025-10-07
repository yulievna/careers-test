import React, { useState, useMemo } from 'react';
import s from './FiltersBar.module.css';
import { Filters, Vacancy } from '../../lib/filters';

interface FiltersProps{
    vacancies: Vacancy[];
    filters: Filters;
    setFilters: (value: Filters | ((prev: Filters) => Filters)) => void;
    onClick: () => void;
    onReset?: () => void;
}

const FiltersBar: React.FC<FiltersProps> = ({vacancies, filters, setFilters, onClick, onReset}) => {
    const [draftFilters, setDraftFilters] = useState<Filters>({} as Filters);

    const cities = useMemo(() => {
        const set = new Set<string>();
        vacancies.forEach(v => v.city && set.add(v.city));
        return Array.from(set);
    }, [vacancies]);

    const title = useMemo(() => {
        const set = new Set<string>();
        vacancies.forEach(v => v.title && set.add(v.title));
        return Array.from(set);
    }, [vacancies]);

    const employments = useMemo(() => {
        const set = new Set<string>();
        vacancies.forEach(v => v.employment && set.add(v.employment));
        return Array.from(set);
    }, [vacancies]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={s.filtersbar}>
            <select name="title" value={filters.title ?? ''} onChange={handleChange}>
                <option value="">Все вакансии</option>
                {title.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select name="employment" value={filters.employment ?? ''} onChange={handleChange}>
                <option value="">Любая занятость</option>
                {employments.map(e => <option key={e} value={e}>{e}</option>)}
            </select>

            <select name="city" value={filters.city ?? ''} onChange={handleChange}>
                <option value="">Все города</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <button onClick={onClick}>Поиск</button>
            {onReset && <button onClick={onReset}>Сбросить</button>}
        </div>
    );
};

export default FiltersBar;
