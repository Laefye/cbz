import axios, { AxiosError } from "axios";

export type UserState = 'unactive' | 'active' | 'banned'; 

export type Account = {
    id: string,
    type: 'private' | 'shared',
    balance: number,
    name: string,
}

export type UserInfo = {
    id: string,
    username: string,
    accounts: Account[],
    credits: [],
}

export type Transaction = {
    id: string,
    from: string,
    fromUsername: string,
    to: string,
    toUsername: string,
    amount: number,
    date: number,
}

export class MakingTransferException extends Error {
    constructor(message?: string) {
        super(message);
    }
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

    async createAccount(name: string): Promise<void> {
        let response;
        try {
            response = await axios.post('/api/createAccount', { name }, { headers: { Authorization: this.token }});
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new UnknownException(e.status)
            }
        }
    }

    async makeTransfer(from: string, to: string, amount: number): Promise<Transaction> {
        let response;
        try {
            response = await axios.post('/api/makeTransfer', { from, to, amount }, { headers: { Authorization: this.token }});
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response) {
                    if (e.response.data['reason'] == 'Not found receiver account') {
                        throw new MakingTransferException('Not found receiver account');
                    }
                }
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
