import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
    const start = performance.now();

    const response = await next();

    const latencyMs = Math.round(performance.now() - start);

    const logEntry = {
        timestamp: new Date().toISOString(),
        level: response.status >= 500 ? 'ERROR' : 'INFO',
        route: url.pathname, // ví dụ: /api/health
        method: request.method, // GET, POST...
        statusCode: response.status,
        latencyMs: latencyMs
    };

    console.log(JSON.stringify(logEntry));

    return response;
});
