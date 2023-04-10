import { Notify } from 'quasar';
import { HttpStatusCode } from 'src/utils/constants';
import { authService } from '../services/auth-service';

const host = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5261/api';

function getUrl(url: string) {
    if (url.startsWith('http')) {
        return url;
    }

    if (url.startsWith('/')) {
        return host + url;
    }

    return `${host}/${url}`;
}

class KnownFetchError extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, KnownFetchError.prototype);
    }
}

async function onError(response: Response) {
    const errorMessage = await response.text();

    if (response.status === HttpStatusCode.UNAUTHORIZED) {
        Notify.create({
            message: errorMessage ?? 'Unauthorized',
            type: 'negative',
        });
    } else {
        Notify.create({
            message: 'Internal Server Error',
            type: 'negative',
        });
    }

    throw new KnownFetchError(errorMessage);
}

class Http {
    async get<T>(url: string): Promise<{ data: T }> {
        try {
            const response = await fetch(getUrl(url), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authService.token}`,
                },
            });

            if (!response.ok) {
                await onError(response);
            }

            const data = await response.json() as T;
            return { data };
        } catch (e: unknown) {
            if (e instanceof KnownFetchError) {
                throw e;
            }

            Notify.create({
                message: 'Error on fetch',
                type: 'negative',
            });
            throw e;
        }
    }

    async post<T>(url: string, body: unknown): Promise<{ data: T }> {
        try {
            const response = await fetch(getUrl(url), {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authService.token}`,
                },
            });

            if (!response.ok) {
                await onError(response);
            }

            const data = await response.json() as T;
            return { data };
        } catch (e: unknown) {
            if (e instanceof KnownFetchError) {
                throw e;
            }

            Notify.create({
                message: 'Error on fetch',
                type: 'negative',
            });
            throw e;
        }
    }
}

const api = new Http();

export { api };
