export interface RagKnowledgeEntry {
    id: string;
    code: string;
    art: string;
    title: string;
    content: string;
    keywords: string[];
}

export const ragKnowledgeEntries: RagKnowledgeEntry[] = [
    {
        id: 'kk-286-1',
        code: 'Kodeks karny',
        art: 'Art. 286 § 1',
        title: 'Oszustwo',
        content: 'Kto, w celu osiągnięcia korzyści majątkowej, doprowadza inną osobę do niekorzystnego rozporządzenia własnym lub cudzym mieniem za pomocą wprowadzenia jej w błąd albo wyzyskania błędu lub niezdolności do należytego pojmowania przedsiębranego działania, podlega karze pozbawienia wolności od 6 miesięcy do lat 8.',
        keywords: ['oszustwo', 'kk', 'mienie', 'korzyść majątkowa'],
    },
    {
        id: 'kk-156-1',
        code: 'Kodeks karny',
        art: 'Art. 156 § 1',
        title: 'Ciężki uszczerbek na zdrowiu',
        content: 'Kto powoduje ciężki uszczerbek na zdrowiu, w szczególności w postaci pozbawienia człowieka wzroku, słuchu, mowy, zdolności płodzenia albo innego ciężkiego kalectwa, podlega odpowiedzialności karnej.',
        keywords: ['uszczerbek', 'kk', 'zdrowie', 'kalectwo'],
    },
    {
        id: 'kc-415',
        code: 'Kodeks cywilny',
        art: 'Art. 415',
        title: 'Odpowiedzialność deliktowa',
        content: 'Kto z winy swej wyrządził drugiemu szkodę, obowiązany jest do jej naprawienia.',
        keywords: ['szkoda', 'odpowiedzialność', 'kc', 'delikt'],
    },
    {
        id: 'kp-45-1',
        code: 'Kodeks pracy',
        art: 'Art. 45 § 1',
        title: 'Odwołanie od wypowiedzenia',
        content: 'W razie ustalenia, że wypowiedzenie umowy o pracę zawartej na czas nieokreślony jest nieuzasadnione lub narusza przepisy, sąd pracy orzeka o bezskuteczności wypowiedzenia albo o przywróceniu do pracy lub odszkodowaniu.',
        keywords: ['wypowiedzenie', 'kp', 'sąd pracy', 'odwołanie'],
    },
    {
        id: 'kpc-187-1',
        code: 'Kodeks postępowania cywilnego',
        art: 'Art. 187 § 1',
        title: 'Treść pozwu',
        content: 'Pozew powinien czynić zadość warunkom pisma procesowego, a nadto zawierać dokładnie określone żądanie oraz przytoczenie okoliczności faktycznych uzasadniających żądanie.',
        keywords: ['pozew', 'kpc', 'pismo procesowe', 'żądanie'],
    },
    {
        id: 'kro-56-1',
        code: 'Kodeks rodzinny',
        art: 'Art. 56 § 1',
        title: 'Rozwód',
        content: 'Jeżeli między małżonkami nastąpił zupełny i trwały rozkład pożycia, każdy z małżonków może żądać, aby sąd rozwiązał małżeństwo przez rozwód.',
        keywords: ['rozwód', 'kro', 'małżeństwo', 'rozkład pożycia'],
    },
    {
        id: 'kc-481-1',
        code: 'Kodeks cywilny',
        art: 'Art. 481 § 1',
        title: 'Odsetki za opóźnienie',
        content: 'Jeżeli dłużnik opóźnia się ze spełnieniem świadczenia pieniężnego, wierzyciel może żądać odsetek za czas opóźnienia.',
        keywords: ['odsetki', 'opóźnienie', 'kc', 'świadczenie pieniężne'],
    },
];

export function searchRagKnowledge(query: string, limit = 5): RagKnowledgeEntry[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return [];

    const matches = ragKnowledgeEntries
        .map((entry) => {
            const haystack = `${entry.art} ${entry.title} ${entry.code} ${entry.content} ${entry.keywords.join(' ')}`.toLowerCase();
            let score = 0;

            if (entry.art.toLowerCase().includes(normalizedQuery)) score += 6;
            if (entry.title.toLowerCase().includes(normalizedQuery)) score += 4;
            if (entry.code.toLowerCase().includes(normalizedQuery)) score += 3;
            if (entry.keywords.some((keyword) => keyword.toLowerCase().includes(normalizedQuery))) score += 3;
            if (haystack.includes(normalizedQuery)) score += 1;

            const articleNumber = normalizedQuery.match(/art\.?\s*(\d+[a-z]?)/i)?.[1];
            if (articleNumber && entry.art.toLowerCase().includes(articleNumber)) {
                score += 8;
            }

            const paragraphNumber = normalizedQuery.match(/§\s*(\d+[a-z]?)/i)?.[1];
            if (paragraphNumber && entry.art.toLowerCase().includes(`§ ${paragraphNumber}`)) {
                score += 8;
            }

            return { entry, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((item) => item.entry);

    return matches;
}
