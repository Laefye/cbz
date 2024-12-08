import axios, { AxiosError } from "axios";

export type UserState = 'unactive' | 'active' | 'banned'; 

export type UserInfo = {
    id: string,
    username: string,
    amount: number,
    accounts: [],
    credits: [],
}

export class Client {
    private token: string;

    constructor(token: string) {
        this.token = token;
        
    }

    async getMyState(): Promise<'unactive' | 'active' | 'banned'> {
        let response;
        try {
            response = await axios.get('/api/getMyState', { headers: { Authorization: this.token }});
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new UnknownException(e.status)
            }
        }
        return response.data['state'];
    }

    async getMyUserInfo(): Promise<UserInfo> {
        let response;
        try {
            response = await axios.get('/api/getMyUserInfo', { headers: { Authorization: this.token }});
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new UnknownException(e.status)
            }
        }
        return response.data;
    }
}

export class BackendException extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export class UnknownException extends BackendException {
    code: number;
    
    constructor(code: number) {
        super('Unknown error');
        this.code = code;
    }
}

export class AuthException extends BackendException {
    constructor(message?: string) {
        super(message);
    }
}

export async function login(initData: string): Promise<Client> {
    let response;
    try {
        response = await axios.post('/api/login', { initData });
    } catch (e) {
        if (e instanceof AxiosError) {
            if (e.response && e.response.data['reason']) {
                if (e.status == 403) {
                    throw new AuthException(e.response.data['reason']);
                }
            }
            throw new UnknownException(e.status)
        }
    }
    return new Client(response.data['token']);
}
