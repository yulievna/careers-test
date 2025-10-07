export interface Vacancy {
    id: string;
    title: string;
    city: string;
    employment: string;
    tags: string[]; 
};

export interface Filters {
    city?: string;
    employment?: string;
    title?: string;
};
export function applyFilters(vacancies: Vacancy[], filters: Filters): Vacancy[] {
    return vacancies.filter((v) => {
        if (filters.city && String(v.city).toLowerCase() !== filters.city.toLowerCase()) return false;
        if (filters.employment && String(v.employment).toLowerCase() !== filters.employment.toLowerCase()) return false;
        if (filters.title && String(v.title).toLowerCase() !== filters.title.toLowerCase()) return false;
        return true;
    });
}