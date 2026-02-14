export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'suspended';
    lawFirm?: string;
    lastLogin: string;
    twoFA: boolean;
    createdAt: string;
}

export interface LawFirm {
    id: string;
    name: string;
    status: 'active' | 'suspended' | 'trial' | 'expired';
    plan: string;
    lawyerCount: number;
    lawyerLimit: number;
    clientCount: number;
    aiUsage: number;
    aiLimit: number;
    mrr: number;
    billingOwner: string;
    domain?: string;
    createdAt: string;
}

export interface Lawyer {
    id: string;
    name: string;
    email: string;
    lawFirm: string;
    specializations: string[];
    status: 'active' | 'suspended' | 'verification';
    caseCount: number;
    rating: number;
    activityScore: number;
    createdAt: string;
}

export interface Case {
    id: string;
    client: string;
    lawFirm: string;
    lawyer: string;
    status: CaseStatus;
    type: string;
    value: number;
    createdAt: string;
    deadline: string;
    description: string;
}

export type CaseStatus =
    | 'Nowa'
    | 'Oczekuje na płatność'
    | 'W trakcie realizacji'
    | 'Oczekuje na akceptację'
    | 'Do poprawy'
    | 'Zakończona'
    | 'Zamknięta'
    | 'Anulowana';

export interface Document {
    id: string;
    title: string;
    author: string;
    caseId: string;
    version: number;
    status: 'Szkic' | 'Do akceptacji' | 'Zaakceptowany' | 'Do poprawy';
    createdAt: string;
    updatedAt: string;
    type: string;
}

export interface Payment {
    id: string;
    caseId: string;
    client: string;
    lawFirm: string;
    amount: number;
    status: 'pending' | 'paid' | 'escrow' | 'released' | 'refunded';
    method: string;
    createdAt: string;
    invoiceId?: string;
}

export interface Plan {
    id: string;
    name: string;
    price: number;
    billing: 'monthly' | 'yearly' | 'pay-per-use';
    aiLimit: number;
    userLimit: number;
    trial: boolean;
    trialDays: number;
    features: string[];
    active: boolean;
}

export interface Promotion {
    id: string;
    code: string;
    type: 'global' | 'per-firm' | 'one-time' | 'multi-use';
    discount: number;
    discountType: 'percent' | 'fixed';
    usageLimit: number;
    usageCount: number;
    expiresAt: string;
    assignedPlans: string[];
    active: boolean;
}

export interface AuditEntry {
    id: string;
    user: string;
    action: string;
    target: string;
    before?: string;
    after?: string;
    ip: string;
    timestamp: string;
}

export interface Ticket {
    id: string;
    lawFirm: string;
    subject: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'critical';
    createdAt: string;
    updatedAt: string;
    messages: number;
}

export interface Invoice {
    id: string;
    number: string;
    lawFirm: string;
    nip: string;
    netAmount: number;
    vatRate: number;
    grossAmount: number;
    status: 'draft' | 'sent' | 'ksef-accepted' | 'ksef-rejected' | 'paid';
    ksefNumber?: string;
    issuedAt: string;
    type: 'VAT' | 'zaliczkowa' | 'końcowa' | 'korekta';
}

export interface SystemLog {
    id: string;
    level: 'info' | 'warn' | 'error' | 'critical';
    source: string;
    message: string;
    timestamp: string;
}

export interface BackupEntry {
    id: string;
    type: 'full' | 'incremental';
    size: string;
    status: 'completed' | 'in-progress' | 'failed';
    createdAt: string;
    encrypted: boolean;
}
