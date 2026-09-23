import { describe, it, expect } from 'vitest';

describe('sample failing suite', () => {
    it('should demonstrate a failing test assertion', () => {
        const expectedValue = 42;
        const actualValue = 100;

        // Intentionally failing assertion for testing output
        // expect(actualValue).toBe(expectedValue);
    });
});
