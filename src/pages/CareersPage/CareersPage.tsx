import React, { useEffect, useMemo, useState } from 'react';
import s from './CareersPage.module.css';
import SidebarInquiryForm from '../../components/SidebarInquiryForm/SidebarInquiryForm';
import VacancyCard from '../../components/VacancyCard/VacancyCard';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import vacancies from '../../mocks/vacancies.json';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import VacancyModal from '../../components/VacancyModal/VacancyModal';
import { applyFilters, Filters } from '../../lib/filters';

const CareersPage = () => {
    
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const vacancyId = searchParams.get('vacancy');
    const selectedVacancy = vacancies.find(v => v.id === vacancyId);
    
    const [draftFilters, setDraftFilters] = useState<Filters>({});
    const [appliedFilters, setAppliedFilters] = useState<Filters>({});

    // при монтировании — читаем из URL
    useEffect(() => {
        const newFilters: Filters = {};
        const city = searchParams.get('city');
        const employment = searchParams.get('employment');
        const title = searchParams.get('title');
        if (city) newFilters.city = city;
        if (employment) newFilters.employment = employment;
        if (title) newFilters.title = title;

        setDraftFilters(newFilters);
        setAppliedFilters(newFilters);
    }, []);

    // при изменении appliedFilters — обновляем URL
    useEffect(() => {
        const params = new URLSearchParams();
        Object.entries(appliedFilters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        setSearchParams(params);
    }, [appliedFilters]);

    const filtered = useMemo(() => applyFilters(vacancies, appliedFilters), [vacancies, appliedFilters]);

    if (vacancyId && !selectedVacancy) {
        return <Navigate to='/404' replace/>
    }

    const handleCardClick = (id: string) => {
        navigate(`/careers?vacancy=${id}`);
    }

    const handleCloseModal = () => {
        navigate('/careers');
    }

    const handleApplyFilters = (newFilters: Filters) => {
        setAppliedFilters(newFilters);
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        setSearchParams(params);
    }

    return (
        <div className={s.careers}>
            <div className={s.careers__container}>
                <h1 className={s.careers__title}>Карьера</h1>
                <div className={s.careers__content}>
                    <div className={s.careers__sidebar}>
                        <SidebarInquiryForm/>
                    </div>
                    <div className={s.careers__info}>
                        <p className={s.careere__text}>
                            Компания «Figma» — это крупный российский холдинг, 
                            работающий в регионах с богатейшими недрами. <br /><br />
                            Мы создаём рабочие места, даём стабильность и возможность 
                            развиваться вместе с компанией. Нам нужны те, кто готов трудиться
                            в команде, кто ценит порядок, технику и уважает дело, которым занимается.
                        </p>
                        <div className={s.careers__filter}>
                            <FiltersBar
                                vacancies={vacancies}
                                filters={draftFilters} // <-- показываем текущие выбранные значения
                                setFilters={setDraftFilters} // <-- обновляем draft
                                onClick={() => handleApplyFilters(draftFilters)} // <-- применяем фильтры по кнопке
                            />

                        </div>
                        <div className={s.careers__cards}>
                            {filtered.length > 0 ? (
                                filtered.map((vacancy) => (
                                    <VacancyCard 
                                        key={vacancy.id}
                                        vacancy={vacancy}
                                        onClick={handleCardClick}    
                                    />
                                ))
                            ) : (
                                <div className={s.emptyState}>
                                    Вакансии не найдены. <button onClick={() => { setDraftFilters({}); setAppliedFilters({});}}>Сбросить фильтры</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {
                selectedVacancy && (
                    <VacancyModal
                        open={!!vacancyId}
                        onClose={handleCloseModal}
                        vacancy={selectedVacancy}
                    />                
                )
            }

        </div>
    );
};

export default CareersPage;