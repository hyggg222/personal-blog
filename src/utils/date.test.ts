import { describe, it, expect } from 'vitest';
import { formatDate, isValidDate } from './date';

describe('date utils', () => {
    describe('formatDate', () => {
        it('should format a Date object with default locale and options', () => {
            const date = new Date('2026-01-15T00:00:00Z');
            const formatted = formatDate(date);
            expect(formatted).toContain('2026');
            expect(formatted).toContain('Jan');
        });

        it('should format a valid ISO date string', () => {
            const dateStr = '2026-09-23';
            const formatted = formatDate(dateStr);
            expect(formatted).toContain('2026');
            expect(formatted).toContain('Sep');
        });

        it('should throw an error for an invalid date string', () => {
            expect(() => formatDate('not-a-valid-date')).toThrowError(
                'Invalid date input: not-a-valid-date'
            );
        });
    });

    describe('isValidDate', () => {
        it('should return true for valid Date instances', () => {
            expect(isValidDate(new Date())).toBe(true);
            expect(isValidDate(new Date('2026-05-10'))).toBe(true);
        });

        it('should return true for valid date strings and timestamps', () => {
            expect(isValidDate('2026-12-25')).toBe(true);
            expect(isValidDate(1700000000000)).toBe(true);
        });

        it('should return false for invalid dates, null, or undefined', () => {
            expect(isValidDate('invalid-date')).toBe(false);
            expect(isValidDate(null)).toBe(false);
            expect(isValidDate(undefined)).toBe(false);
            expect(isValidDate({})).toBe(false);
        });
    });
});
