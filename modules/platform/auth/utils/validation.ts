/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

/**
 * Validates password complexity:
 * - At least 6 characters
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 * - Contains at least one special character
 */
export const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters long.' };
    }
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!/[a-z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!/\d/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one number.' };
    }
    if (!/[@$!%*?&#]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one special character (@$!%*?&#).' };
    }
    return { isValid: true, message: '' };
};
