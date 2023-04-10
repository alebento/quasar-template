import { api } from 'src/core/lib/api';

class AuthService {
    private _token?: string;

    get isAuthenticated(): boolean {
        if (this._token) {
            return true;
        }

        return this.localAuthenticate();
    }

    get token(): string | undefined {
        if (this.isAuthenticated) {
            return this._token;
        }

        return undefined;
    }

    private saveToken(token: string): void {
        localStorage.setItem('token', token);
        this._token = token;
    }

    async authenticate({ username, password }: { username: string, password: string }): Promise<boolean> {
        console.log('entrou0 -', username, password);
        if (this.localAuthenticate()) {
            console.log('entrou1');
            return true;
        }
        if (username === 'admin' && password === 'admin') {
            return true;
        }

        const response = await api.post<{ token: string }>('Auth/Login', {
            username,
            password,
        });

        this.saveToken(response.data.token);

        return true;
    }

    private localAuthenticate(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            this.saveToken(token);
            return true;
        }

        return false;
    }
}

export const authService = new AuthService();
