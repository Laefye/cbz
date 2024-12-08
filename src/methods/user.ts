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
