export interface PasswordStrength {
    score: number;
    width: number;
    label: string;
    color: string;
}

export const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return { score: 0, width: 0, label: '', color: 'var(--text-tertiary)' };

    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (hasUpper) score += 1;
    if (hasDigit) score += 1;
    if (hasSpecial) score += 1;

    const levels = [
        { label: 'Bardzo słabe', color: 'var(--error)' },
        { label: 'Słabe', color: 'var(--error)' },
        { label: 'Średnie', color: 'var(--warning)' },
        { label: 'Dobre', color: 'var(--warning)' },
        { label: 'Silne', color: 'var(--success)' },
        { label: 'Bardzo silne', color: 'var(--success)' },
    ];

    return {
        score,
        width: (score / 5) * 100,
        label: levels[score].label,
        color: levels[score].color,
    };
};
