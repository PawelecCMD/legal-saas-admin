import { useState, useMemo } from 'react';
import { users, lawFirms, cases } from '../data/mockData';

export type SearchResult = {
    id: string;
    type: 'użytkownik' | 'kancelaria' | 'sprawa';
    title: string;
    subtitle: string;
    link: string;
};

export function useGlobalSearch() {
    const [query, setQuery] = useState('');

    const results = useMemo(() => {
        if (query.length < 2) return [];

        const q = query.toLowerCase();
        const res: SearchResult[] = [];

        // Przeszukaj użytkowników
        users.forEach(u => {
            if (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) {
                res.push({
                    id: u.id,
                    type: 'użytkownik',
                    title: u.name,
                    subtitle: u.role,
                    link: '/users'
                });
            }
        });

        // Przeszukaj kancelarie
        lawFirms.forEach(f => {
            if (f.name.toLowerCase().includes(q) || f.billingOwner.toLowerCase().includes(q)) {
                res.push({
                    id: f.id,
                    type: 'kancelaria',
                    title: f.name,
                    subtitle: `${f.plan} • ${f.lawyerCount} prawników`,
                    link: '/law-firms'
                });
            }
        });

        // Przeszukaj sprawy
        cases.forEach(c => {
            if (c.id.toLowerCase().includes(q) || c.client.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
                res.push({
                    id: c.id,
                    type: 'sprawa',
                    title: `${c.id}: ${c.client}`,
                    subtitle: c.type,
                    link: '/cases'
                });
            }
        });

        return res.slice(0, 8); // Limit wyników
    }, [query]);

    return { query, setQuery, results };
}
