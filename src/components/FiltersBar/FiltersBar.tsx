import React, { useMemo } from 'react';
import s from './FiltersBar.module.css';
import { Filters, Vacancy } from '../../lib/filters';

interface FiltersProps {
  vacancies: Vacancy[];
  filters: Filters;
  setFilters: (value: Filters | ((prev: Filters) => Filters)) => void;
  onClick: () => void;
  onReset?: () => void;
}

const FiltersBar: React.FC<FiltersProps> = ({
    vacancies,
    filters,
    setFilters,
    onClick,
    onReset,
  }) => {

    const { titles, employments, cities } = useMemo(() => {
        const titlesSet = new Set<string>();
        const citiesSet = new Set<string>();
        const employmentsSet = new Set<string>();

        vacancies.forEach((v) => {
            if (v.title) titlesSet.add(v.title);
            if (v.city) citiesSet.add(v.city);
            if (v.employment) employmentsSet.add(v.employment);
        });

        return {
            titles: Array.from(titlesSet),
            cities: Array.from(citiesSet),
            employments: Array.from(employmentsSet),
        };
    }, [vacancies]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={s.filtersbar}>
        <select name="title" value={filters.title ?? ''} onChange={handleChange}>
            <option value="">Все вакансии</option>
            {titles.map((b: string) => (
                <option key={b} value={b}>
                    {b}
                </option>
            ))}
        </select>

        <select name="employment" value={filters.employment ?? ''} onChange={handleChange}>
            <option value="">Любая занятость</option>
            {employments.map((e: string) => (
                <option key={e} value={e}>
                    {e}
                </option>
            ))}
        </select>

        <select name="city" value={filters.city ?? ''} onChange={handleChange}>
            <option value="">Все города</option>
            {cities.map((c: string) => (
                <option key={c} value={c}>
                    {c}
                </option>
            ))}
        </select>


        <button onClick={onClick}>Поиск</button>
      {onReset && <button onClick={onReset}>Сбросить</button>}
    </div>
  );
};

export default FiltersBar;
