import type { User, LawFirm, Lawyer, Case, Document, Payment, Plan, Promotion, AuditEntry, Ticket, Invoice, SystemLog, BackupEntry } from '../types';

export const users: User[] = [
    { id: 'U001', name: 'Jan Kowalski', email: 'jan@admin.pl', role: 'Super Admin', status: 'active', lastLogin: '2026-02-12 08:30', twoFA: true, createdAt: '2024-01-15' },
    { id: 'U002', name: 'Anna Nowak', email: 'anna@kancelaria-nowak.pl', role: 'Kancelaria Admin', status: 'active', lawFirm: 'Kancelaria Nowak', lastLogin: '2026-02-11 14:20', twoFA: true, createdAt: '2024-03-10' },
    { id: 'U003', name: 'Piotr Wiśniewski', email: 'piotr@prawo.pl', role: 'Prawnik', status: 'active', lawFirm: 'Kancelaria Wiśniewski', lastLogin: '2026-02-12 09:15', twoFA: false, createdAt: '2024-05-22' },
    { id: 'U004', name: 'Maria Zielińska', email: 'maria@klient.pl', role: 'Klient', status: 'active', lastLogin: '2026-02-10 11:00', twoFA: false, createdAt: '2024-07-01' },
    { id: 'U005', name: 'Tomasz Lewandowski', email: 'tomasz@lex.pl', role: 'Prawnik', status: 'suspended', lawFirm: 'LEX', lastLogin: '2026-01-28 16:45', twoFA: true, createdAt: '2024-02-14' },
    { id: 'U006', name: 'Karolina Dąbrowska', email: 'karolina@admin.pl', role: 'Admin', status: 'active', lastLogin: '2026-02-12 07:00', twoFA: true, createdAt: '2024-04-03' },
    { id: 'U007', name: 'Michał Szymański', email: 'michal@klient.pl', role: 'Klient', status: 'inactive', lastLogin: '2025-12-15 10:30', twoFA: false, createdAt: '2024-08-19' },
    { id: 'U008', name: 'Agnieszka Woźniak', email: 'agnieszka@kw.pl', role: 'Kancelaria Admin', status: 'active', lawFirm: 'Woźniak', lastLogin: '2026-02-11 18:30', twoFA: true, createdAt: '2024-06-11' },
];

export const lawFirms: LawFirm[] = [
    { id: 'LF001', name: 'Kancelaria Nowak & Wspólnicy', status: 'active', plan: 'Enterprise', lawyerCount: 12, lawyerLimit: 20, clientCount: 245, aiUsage: 7820, aiLimit: 10000, mrr: 4500, billingOwner: 'Anna Nowak', domain: 'nowak-legal.pl', createdAt: '2024-01-20' },
    { id: 'LF002', name: 'Kancelaria Wiśniewski', status: 'active', plan: 'Professional', lawyerCount: 5, lawyerLimit: 10, clientCount: 89, aiUsage: 3200, aiLimit: 5000, mrr: 1800, billingOwner: 'Piotr Wiśniewski', createdAt: '2024-03-15' },
    { id: 'LF003', name: 'Kancelaria LEX Partnerzy', status: 'trial', plan: 'Trial', lawyerCount: 2, lawyerLimit: 3, clientCount: 12, aiUsage: 150, aiLimit: 500, mrr: 0, billingOwner: 'Tomasz Lewandowski', createdAt: '2026-01-28' },
    { id: 'LF004', name: 'Kancelaria Woźniak Prawo', status: 'active', plan: 'Professional', lawyerCount: 8, lawyerLimit: 10, clientCount: 156, aiUsage: 4100, aiLimit: 5000, mrr: 1800, billingOwner: 'Agnieszka Woźniak', domain: 'wozniak-prawo.pl', createdAt: '2024-05-01' },
    { id: 'LF005', name: 'Adwokaci Online Sp. z o.o.', status: 'active', plan: 'Enterprise', lawyerCount: 18, lawyerLimit: 25, clientCount: 412, aiUsage: 9300, aiLimit: 15000, mrr: 6200, billingOwner: 'Krzysztof Mazur', domain: 'adwokacionline.pl', createdAt: '2024-02-10' },
    { id: 'LF006', name: 'Kancelaria Jura', status: 'suspended', plan: 'Basic', lawyerCount: 1, lawyerLimit: 3, clientCount: 23, aiUsage: 0, aiLimit: 1000, mrr: 0, billingOwner: 'Stefan Krawczyk', createdAt: '2024-09-20' },
    { id: 'LF007', name: 'Grupa Prawna Meridian', status: 'active', plan: 'Professional', lawyerCount: 7, lawyerLimit: 10, clientCount: 134, aiUsage: 2890, aiLimit: 5000, mrr: 1800, billingOwner: 'Magdalena Król', createdAt: '2024-06-18' },
    { id: 'LF008', name: 'Legal Hub Partners', status: 'expired', plan: 'Basic', lawyerCount: 0, lawyerLimit: 3, clientCount: 0, aiUsage: 0, aiLimit: 0, mrr: 0, billingOwner: 'Adam Baran', createdAt: '2024-11-05' },
];

export const lawyers: Lawyer[] = [
    { id: 'L001', name: 'mec. Piotr Wiśniewski', email: 'piotr@wisniewski.pl', lawFirm: 'Kancelaria Wiśniewski', specializations: ['Prawo cywilne', 'Prawo rodzinne'], status: 'active', caseCount: 34, rating: 4.8, activityScore: 92, createdAt: '2024-03-15' },
    { id: 'L002', name: 'mec. Robert Kamiński', email: 'robert@nowak.pl', lawFirm: 'Kancelaria Nowak & Wspólnicy', specializations: ['Prawo karne', 'Prawo gospodarcze'], status: 'active', caseCount: 56, rating: 4.9, activityScore: 97, createdAt: '2024-01-25' },
    { id: 'L003', name: 'mec. Katarzyna Nowicka', email: 'katarzyna@nowak.pl', lawFirm: 'Kancelaria Nowak & Wspólnicy', specializations: ['Prawo pracy'], status: 'active', caseCount: 28, rating: 4.6, activityScore: 85, createdAt: '2024-02-10' },
    { id: 'L004', name: 'mec. Tomasz Lewandowski', email: 'tomasz@lex.pl', lawFirm: 'Kancelaria LEX Partnerzy', specializations: ['Prawo podatkowe'], status: 'suspended', caseCount: 8, rating: 4.2, activityScore: 30, createdAt: '2024-06-01' },
    { id: 'L005', name: 'mec. Magdalena Król', email: 'mag@meridian.pl', lawFirm: 'Grupa Prawna Meridian', specializations: ['Prawo gospodarcze', 'Prawo unijne'], status: 'active', caseCount: 41, rating: 4.7, activityScore: 88, createdAt: '2024-06-18' },
    { id: 'L006', name: 'mec. Wojciech Zając', email: 'wojciech@adwokaci.pl', lawFirm: 'Adwokaci Online Sp. z o.o.', specializations: ['Prawo karne'], status: 'active', caseCount: 67, rating: 4.5, activityScore: 94, createdAt: '2024-02-15' },
];

export const cases: Case[] = [
    { id: 'SP001', client: 'Maria Zielińska', lawFirm: 'Kancelaria Nowak', lawyer: 'mec. Robert Kamiński', status: 'W trakcie realizacji', type: 'Prawo cywilne', value: 5000, createdAt: '2026-01-15', deadline: '2026-03-15', description: 'Odszkodowanie za szkodę majątkową' },
    { id: 'SP002', client: 'Michał Szymański', lawFirm: 'Kancelaria Wiśniewski', lawyer: 'mec. Piotr Wiśniewski', status: 'Nowa', type: 'Prawo rodzinne', value: 3000, createdAt: '2026-02-10', deadline: '2026-04-10', description: 'Sprawa rozwodowa' },
    { id: 'SP003', client: 'Ewa Jankowska', lawFirm: 'Adwokaci Online', lawyer: 'mec. Wojciech Zając', status: 'Oczekuje na płatność', type: 'Prawo karne', value: 8000, createdAt: '2026-02-05', deadline: '2026-05-01', description: 'Obrona – art. 286 kk' },
    { id: 'SP004', client: 'Maria Zielińska', lawFirm: 'Kancelaria Nowak', lawyer: 'mec. Katarzyna Nowicka', status: 'Oczekuje na akceptację', type: 'Prawo pracy', value: 2500, createdAt: '2026-01-20', deadline: '2026-02-28', description: 'Odwołanie od wypowiedzenia' },
    { id: 'SP005', client: 'Andrzej Kowal', lawFirm: 'Grupa Meridian', lawyer: 'mec. Magdalena Król', status: 'Zakończona', type: 'Prawo gospodarcze', value: 15000, createdAt: '2025-11-01', deadline: '2026-01-31', description: 'Spór handlowy' },
    { id: 'SP006', client: 'Barbara Sikora', lawFirm: 'Kancelaria Woźniak', lawyer: 'mec. Łukasz Wójcik', status: 'Do poprawy', type: 'Prawo administracyjne', value: 4000, createdAt: '2026-01-25', deadline: '2026-03-25', description: 'Odwołanie od decyzji' },
    { id: 'SP007', client: 'Paweł Grabowski', lawFirm: 'Adwokaci Online', lawyer: 'mec. Joanna Mazur', status: 'Anulowana', type: 'Prawo rodzinne', value: 2000, createdAt: '2026-01-10', deadline: '2026-02-10', description: 'Sprawa alimentacyjna' },
    { id: 'SP008', client: 'Katarzyna Błaszczyk', lawFirm: 'Kancelaria Nowak', lawyer: 'mec. Robert Kamiński', status: 'W trakcie realizacji', type: 'Prawo karne', value: 12000, createdAt: '2025-12-15', deadline: '2026-04-15', description: 'Oszustwo finansowe' },
    { id: 'SP009', client: 'Marek Pawłowski', lawFirm: 'Grupa Meridian', lawyer: 'mec. Magdalena Król', status: 'Zamknięta', type: 'Prawo gospodarcze', value: 20000, createdAt: '2025-09-01', deadline: '2025-12-31', description: 'Fuzja spółek' },
    { id: 'SP010', client: 'Dorota Michalska', lawFirm: 'Kancelaria Wiśniewski', lawyer: 'mec. Piotr Wiśniewski', status: 'W trakcie realizacji', type: 'Prawo cywilne', value: 6500, createdAt: '2026-02-01', deadline: '2026-04-01', description: 'Pozew o zapłatę' },
];

export const documents: Document[] = [
    { id: 'D001', title: 'Pozew o odszkodowanie', author: 'mec. Robert Kamiński', caseId: 'SP001', version: 3, status: 'Do akceptacji', createdAt: '2026-02-01', updatedAt: '2026-02-10', type: 'Pozew' },
    { id: 'D002', title: 'Wniosek rozwodowy', author: 'mec. Piotr Wiśniewski', caseId: 'SP002', version: 1, status: 'Szkic', createdAt: '2026-02-10', updatedAt: '2026-02-10', type: 'Wniosek' },
    { id: 'D003', title: 'Apelacja od wyroku', author: 'mec. Wojciech Zając', caseId: 'SP003', version: 2, status: 'Zaakceptowany', createdAt: '2026-01-20', updatedAt: '2026-02-05', type: 'Apelacja' },
    { id: 'D004', title: 'Odwołanie od wypowiedzenia', author: 'mec. Katarzyna Nowicka', caseId: 'SP004', version: 4, status: 'Do akceptacji', createdAt: '2026-01-22', updatedAt: '2026-02-08', type: 'Odwołanie' },
    { id: 'D005', title: 'Ugoda pozasądowa', author: 'mec. Magdalena Król', caseId: 'SP005', version: 2, status: 'Zaakceptowany', createdAt: '2025-12-15', updatedAt: '2026-01-20', type: 'Ugoda' },
    { id: 'D006', title: 'Skarga do WSA', author: 'mec. Łukasz Wójcik', caseId: 'SP006', version: 1, status: 'Do poprawy', createdAt: '2026-02-05', updatedAt: '2026-02-09', type: 'Skarga' },
];

export const payments: Payment[] = [
    { id: 'P001', caseId: 'SP001', client: 'Maria Zielińska', lawFirm: 'Kancelaria Nowak', amount: 5000, status: 'escrow', method: 'Stripe', createdAt: '2026-01-16', invoiceId: 'FV/2026/001' },
    { id: 'P002', caseId: 'SP003', client: 'Ewa Jankowska', lawFirm: 'Adwokaci Online', amount: 8000, status: 'pending', method: 'Przelewy24', createdAt: '2026-02-05' },
    { id: 'P003', caseId: 'SP005', client: 'Andrzej Kowal', lawFirm: 'Grupa Meridian', amount: 15000, status: 'released', method: 'PayU', createdAt: '2025-11-02', invoiceId: 'FV/2025/087' },
    { id: 'P004', caseId: 'SP008', client: 'Katarzyna Błaszczyk', lawFirm: 'Kancelaria Nowak', amount: 12000, status: 'paid', method: 'Stripe', createdAt: '2025-12-16', invoiceId: 'FV/2025/095' },
    { id: 'P005', caseId: 'SP007', client: 'Paweł Grabowski', lawFirm: 'Adwokaci Online', amount: 2000, status: 'refunded', method: 'Stripe', createdAt: '2026-01-11' },
    { id: 'P006', caseId: 'SP010', client: 'Dorota Michalska', lawFirm: 'Kancelaria Wiśniewski', amount: 6500, status: 'paid', method: 'PayU', createdAt: '2026-02-02', invoiceId: 'FV/2026/012' },
];

export const plans: Plan[] = [
    { id: 'PL001', name: 'Basic', price: 299, billing: 'monthly', aiLimit: 1000, userLimit: 3, trial: true, trialDays: 14, features: ['Do 3 prawników', 'Podstawowy AI', 'Email support', 'PDF eksport'], active: true },
    { id: 'PL002', name: 'Professional', price: 799, billing: 'monthly', aiLimit: 5000, userLimit: 10, trial: true, trialDays: 14, features: ['Do 10 prawników', 'Zaawansowany AI', 'Priorytetowy support', 'PDF + DOCX', 'Kanban', 'Kalendarz'], active: true },
    { id: 'PL003', name: 'Enterprise', price: 1999, billing: 'monthly', aiLimit: 15000, userLimit: 25, trial: false, trialDays: 0, features: ['Do 25 prawników', 'Nielimitowany AI', '24/7 support', 'White-label', 'API access', 'SLA'], active: true },
    { id: 'PL004', name: 'Pay-per-use', price: 0, billing: 'pay-per-use', aiLimit: 0, userLimit: 5, trial: false, trialDays: 0, features: ['Płatność za zapytanie', 'Do 5 prawników', 'Podstawowy support'], active: true },
];

export const promotions: Promotion[] = [
    { id: 'PR001', code: 'LEGAL2026', type: 'global', discount: 20, discountType: 'percent', usageLimit: 500, usageCount: 127, expiresAt: '2026-06-30', assignedPlans: ['Basic', 'Professional'], active: true },
    { id: 'PR002', code: 'TRIAL30', type: 'one-time', discount: 30, discountType: 'percent', usageLimit: 1, usageCount: 0, expiresAt: '2026-12-31', assignedPlans: ['Professional'], active: true },
    { id: 'PR003', code: 'NOWAK-VIP', type: 'per-firm', discount: 500, discountType: 'fixed', usageLimit: 12, usageCount: 3, expiresAt: '2026-12-31', assignedPlans: ['Enterprise'], active: true },
    { id: 'PR004', code: 'WINTER2025', type: 'multi-use', discount: 15, discountType: 'percent', usageLimit: 200, usageCount: 200, expiresAt: '2025-12-31', assignedPlans: ['Basic'], active: false },
];

export const auditLog: AuditEntry[] = [
    { id: 'A001', user: 'Jan Kowalski', action: 'UPDATE', target: 'User U005 – status', before: 'active', after: 'suspended', ip: '192.168.1.100', timestamp: '2026-02-12 08:45:00' },
    { id: 'A002', user: 'Anna Nowak', action: 'CREATE', target: 'Case SP011', ip: '10.0.0.15', timestamp: '2026-02-11 14:30:00' },
    { id: 'A003', user: 'System', action: 'BACKUP', target: 'Full backup #247', ip: '127.0.0.1', timestamp: '2026-02-11 03:00:00' },
    { id: 'A004', user: 'Jan Kowalski', action: 'DELETE', target: 'Promotion PR004', before: 'active', after: 'deleted', ip: '192.168.1.100', timestamp: '2026-02-10 16:20:00' },
    { id: 'A005', user: 'Karolina Dąbrowska', action: 'UPDATE', target: 'Plan PL002 – price', before: '699 PLN', after: '799 PLN', ip: '192.168.1.105', timestamp: '2026-02-10 11:00:00' },
];

export const tickets: Ticket[] = [
    { id: 'T001', lawFirm: 'LEX Partnerzy', subject: 'Nie mogę zalogować się do panelu', status: 'open', priority: 'high', createdAt: '2026-02-12 09:00', updatedAt: '2026-02-12 09:00', messages: 1 },
    { id: 'T002', lawFirm: 'Kancelaria Nowak', subject: 'Błąd w generatorze AI', status: 'in-progress', priority: 'medium', createdAt: '2026-02-11 14:00', updatedAt: '2026-02-12 08:30', messages: 4 },
    { id: 'T003', lawFirm: 'Grupa Meridian', subject: 'Zwiększenie limitu AI', status: 'resolved', priority: 'low', createdAt: '2026-02-08 10:00', updatedAt: '2026-02-10 16:00', messages: 3 },
    { id: 'T004', lawFirm: 'Adwokaci Online', subject: 'Problem z KSeF', status: 'in-progress', priority: 'critical', createdAt: '2026-02-10 11:00', updatedAt: '2026-02-12 07:00', messages: 8 },
];

export const invoices: Invoice[] = [
    { id: 'INV001', number: 'FV/2026/001', lawFirm: 'Kancelaria Nowak', nip: '5271234567', netAmount: 4065.04, vatRate: 23, grossAmount: 5000, status: 'ksef-accepted', ksefNumber: 'KSeF-2026-00123', issuedAt: '2026-01-16', type: 'VAT' },
    { id: 'INV002', number: 'FV/2026/003', lawFirm: 'Kancelaria Nowak', nip: '5271234567', netAmount: 2032.52, vatRate: 23, grossAmount: 2500, status: 'sent', issuedAt: '2026-01-21', type: 'VAT' },
    { id: 'INV003', number: 'FV/2026/012', lawFirm: 'Kancelaria Wiśniewski', nip: '8391234568', netAmount: 5284.55, vatRate: 23, grossAmount: 6500, status: 'paid', issuedAt: '2026-02-02', type: 'VAT' },
    { id: 'INV004', number: 'FV/2026/015', lawFirm: 'Adwokaci Online', nip: '1132345678', netAmount: 1626.02, vatRate: 23, grossAmount: 2000, status: 'ksef-rejected', issuedAt: '2026-02-05', type: 'korekta' },
];

export const systemLogs: SystemLog[] = [
    { id: 'SL001', level: 'error', source: 'AI Service', message: 'Timeout GPT-4 – fallback DeepSeek', timestamp: '2026-02-12 08:30:15' },
    { id: 'SL002', level: 'info', source: 'Auth', message: 'User U003 logged in', timestamp: '2026-02-12 09:15:00' },
    { id: 'SL003', level: 'warn', source: 'Payment', message: 'Stripe webhook retry #3', timestamp: '2026-02-12 07:45:30' },
    { id: 'SL004', level: 'critical', source: 'Database', message: 'Connection pool exhausted – 100 max', timestamp: '2026-02-11 23:58:00' },
    { id: 'SL005', level: 'info', source: 'Backup', message: 'Incremental backup done – 245 MB', timestamp: '2026-02-11 03:05:00' },
    { id: 'SL006', level: 'warn', source: 'AI Service', message: 'Low confidence RAG result (0.42)', timestamp: '2026-02-11 14:22:00' },
];

export const backups: BackupEntry[] = [
    { id: 'B001', type: 'full', size: '4.2 GB', status: 'completed', createdAt: '2026-02-09 03:00', encrypted: true },
    { id: 'B002', type: 'incremental', size: '245 MB', status: 'completed', createdAt: '2026-02-10 03:00', encrypted: true },
    { id: 'B003', type: 'incremental', size: '312 MB', status: 'completed', createdAt: '2026-02-11 03:00', encrypted: true },
    { id: 'B004', type: 'full', size: '4.5 GB', status: 'in-progress', createdAt: '2026-02-12 08:00', encrypted: true },
];

export const revenueData = [
    { month: 'Mar', revenue: 28400, cases: 45 },
    { month: 'Kwi', revenue: 32100, cases: 52 },
    { month: 'Maj', revenue: 38700, cases: 61 },
    { month: 'Cze', revenue: 41200, cases: 58 },
    { month: 'Lip', revenue: 39800, cases: 63 },
    { month: 'Sie', revenue: 45100, cases: 67 },
    { month: 'Wrz', revenue: 48300, cases: 72 },
    { month: 'Paź', revenue: 52100, cases: 78 },
    { month: 'Lis', revenue: 55800, cases: 82 },
    { month: 'Gru', revenue: 58200, cases: 85 },
    { month: 'Sty', revenue: 61400, cases: 91 },
    { month: 'Lut', revenue: 64800, cases: 96 },
];

export const caseStatusData = [
    { name: 'Nowe', value: 24, color: '#6366f1' },
    { name: 'W realizacji', value: 38, color: '#3b82f6' },
    { name: 'Oczekuje', value: 12, color: '#f59e0b' },
    { name: 'Zakończone', value: 45, color: '#10b981' },
    { name: 'Anulowane', value: 8, color: '#ef4444' },
    { name: 'Zamknięte', value: 31, color: '#64748b' },
];

export const aiUsageData = [
    { month: 'Wrz', queries: 4200, tokens: 890000 },
    { month: 'Paź', queries: 5100, tokens: 1020000 },
    { month: 'Lis', queries: 6300, tokens: 1340000 },
    { month: 'Gru', queries: 5800, tokens: 1180000 },
    { month: 'Sty', queries: 7200, tokens: 1560000 },
    { month: 'Lut', queries: 7800, tokens: 1690000 },
];
