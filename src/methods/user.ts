import { User } from "@prisma/client";
import { telegramWebAppSignIn, telegramWebAppVerifyToken } from "../auth";
import { prisma } from "../repository/client";

export async function login(initData: string): Promise<string> {
    return telegramWebAppSignIn(initData);
}

type UserState = {
    state: 'unactive' | 'banned' | 'active',
}

function getUser(token: string): number {
    return telegramWebAppVerifyToken(token).telegramId;
}

export async function getMyUserState(token: string): Promise<UserState> {
    let user = await prisma.user.findFirst({ where: { telegramId: getUser(token)}});
    if (user === null) {
        return { state: 'unactive' };
    }
    return { state: 'active' }
}

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

export class UserNotFoundException extends Error {
    constructor() {
        super('User not found');
    }
}

async function authUser(token: string): Promise<User> {
    let user = await prisma.user.findFirst({ where: { telegramId: getUser(token)}});
    if (user == null)
        throw new UserNotFoundException();
    return user;
}

export async function getMyUserInfo(token: string): Promise<UserInfo> {
    let user = await authUser(token);
    let accounts = await prisma.account.findMany({ where: { userId: user.id }});
    return {
        id: user.id,
        accounts: accounts.map(x => ({id: x.id, balance: x.balance, name: x.name, type: 'private'})),
        username: user.username,
        credits: [],
    }
}

export type CreatedAccount = {
    id: string,
}

function generateAccountId() {
    let blocks = [];
    for (let i = 0; i < 3; i++) {
        let block = '';
        for (let j = 0; j < 4; j++) {
            block += Math.round(Math.random() * 9).toString();
        }
        blocks.push(block);
    }
    return blocks.join('-');
}

export class CreatingAccountException extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export async function createAccount(token: string, name: string): Promise<CreatedAccount> {
    if (name.length == 0) throw new CreatingAccountException('name is required');
    if (name.length > 15) throw new CreatingAccountException('name is very big');
    let user = await authUser(token);
    let account = await prisma.account.create({ data: { id: generateAccountId(), userId: user.id, name, }});
    return {
        id: account.id,
    }
}
