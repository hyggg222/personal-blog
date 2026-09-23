/**
 * Utility functions for date formatting and validation.
 */

/**
 * Formats a Date object or valid date string into a localized formatted string.
 * Default format: "MMM D, YYYY" (e.g. "Jan 1, 2026")
 */
export function formatDate(
    dateInput: Date | string | number,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    },
    locale: string = 'en-US'
): string {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date input: ${dateInput}`);
    }

    return date.toLocaleDateString(locale, options);
}

/**
 * Checks whether the given input is a valid date (Date object, valid timestamp, or parseable string).
 */
export function isValidDate(dateInput: unknown): boolean {
    if (dateInput === null || dateInput === undefined) {
        return false;
    }

    if (typeof dateInput === 'number' || typeof dateInput === 'string' || dateInput instanceof Date) {
        const date = new Date(dateInput);
        return !isNaN(date.getTime());
    }

    return false;
}
