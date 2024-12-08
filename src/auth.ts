import querystring from 'node:querystring';
import crypto from 'crypto';
import { bot_token, secret } from './config';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { z } from 'zod';
import { serialize } from 'node:v8';

class TelegramWebAppException extends Error {
    constructor() {
        super('Invalid init data');
    }
}

const Key = z.object({
    telegram_id: z.number(),
})

export function telegramWebAppSignIn(initData: string) {
    let parsed = querystring.parse(initData);
    if (parsed['hash'] == null || parsed['user'] == null) {
        throw new TelegramWebAppException();
    }
    let hash = parsed['hash'].toString();
    let user: any;
    try {
        user = JSON.parse(parsed['user'].toString());
    } catch (e) {
        if (e instanceof SyntaxError) {
            throw new TelegramWebAppException();
        }
        throw e;
    }
    delete parsed['hash'];
    let verifyString = Object.keys(parsed).sort().map(x => `${x}=${parsed[x]!.toString()}`).join('\n');
    let secretKey = crypto.createHmac('sha256', 'WebAppData').update(bot_token).digest();
    let signature = crypto.createHmac('sha256', secretKey).update(verifyString).digest();
    if (hash.toLowerCase() != signature.toString('hex').toLowerCase()) {
        throw new TelegramWebAppException();
    }
    let key: z.infer<typeof Key> = {
        telegram_id: user['id'],
    }
    return jwt.sign(key, secret, { algorithm: 'HS256' });
}

export function telegramWebAppVerifyToken(token: string): z.infer<typeof Key> {
    let payload: any;
    try {
        payload = jwt.verify(token, secret, {});
    } catch (e) {
        if (e instanceof JsonWebTokenError) {
            throw new TelegramWebAppException();
        }
        throw e;
    }
    return {
        telegram_id: payload.telegram_id,
    };
}
