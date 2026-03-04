/**
 * Copyright (c) 2026 Mohamed Samy
 * https://mohamedsamy.software/
 * All Rights Reserved. Unauthorized use or reproduction is prohibited.
 */
/** Validation helpers for auth forms */

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

export function validateEmail(value: string): ValidationResult {
    if (!value.trim()) return { valid: false, error: "Email is required" };
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return { valid: false, error: "Enter a valid email address" };
    return { valid: true };
}

export function validatePassword(value: string): ValidationResult {
    if (!value) return { valid: false, error: "Password is required" };
    if (value.length < 8) return { valid: false, error: "Password must be at least 8 characters" };
    if (!/[A-Z]/.test(value)) return { valid: false, error: "Include at least one uppercase letter" };
    if (!/[0-9]/.test(value)) return { valid: false, error: "Include at least one number" };
    return { valid: true };
}

export function validateFullName(value: string): ValidationResult {
    if (!value.trim()) return { valid: false, error: "Full name is required" };
    if (value.trim().length < 2) return { valid: false, error: "Name must be at least 2 characters" };
    return { valid: true };
}

export function validateOTP(digits: string[]): ValidationResult {
    if (digits.some((d) => d === "")) return { valid: false, error: "Enter all 6 digits" };
    if (digits.some((d) => !/^\d$/.test(d))) return { valid: false, error: "Digits only" };
    return { valid: true };
}
