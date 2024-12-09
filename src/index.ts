import e from "express";
import { z } from "zod";
import { TelegramWebAppException } from "./auth";
import * as user from "./methods/user";
import bodyParser from "body-parser";

const app = e();

app.use(bodyParser.json({}));

app.post('/api/login', async (req, res) => {
    try {
        let body = z.object({ initData: z.string() }).parse(req.body);
        res.json({
            token: await user.login(body.initData),
        });
    } catch (e) {
        if (e instanceof TelegramWebAppException) {
            res.status(403).json({ reason: 'Invalid init data' });
        } else if (e instanceof z.ZodError) {
            res.status(400).json({ reason: 'Bad request' });
        } else {
            console.log(e);
            res.status(500).json({ reason: 'Unknown error' });
        }
    }
});

app.get('/api/getMyState', async (req, res) => {
    try {
        let token = req.header('Authorization');
        if (token == null) {
            throw new TelegramWebAppException();
        }
        res.json(await user.getMyUserState(token));
    } catch (e) {
        if (e instanceof TelegramWebAppException) {
            res.status(403).json({ reason: 'Invalid token' });
        } else {
            console.log(e);
            res.status(500).json({ reason: 'Unknown error' });
        }
    }
});

app.get('/api/getMyUserInfo', async (req, res) => {
    try {
        let token = req.header('Authorization');
        if (token == null) {
            throw new TelegramWebAppException();
        }
        res.json(await user.getMyUserInfo(token));
    } catch (e) {
        if (e instanceof TelegramWebAppException) {
            res.status(403).json({ reason: 'Invalid token' });
        } else if (e instanceof user.UserNotFoundException) {
            res.status(404).json({ reason: 'User not found' });
        } else {
            console.log(e);
            res.status(500).json({ reason: 'Unknown error' });
        }
    }
});

app.post('/api/createAccount', async (req, res) => {
    try {
        let token = req.header('Authorization');
        if (token == null) {
            throw new TelegramWebAppException();
        }
        let body = z.object({ name: z.string() }).parse(req.body);
        res.json(await user.createAccount(token, body.name));
    } catch (e) {
        if (e instanceof TelegramWebAppException) {
            res.status(403).json({ reason: 'Invalid token' });
        } else if (e instanceof z.ZodError) {
            res.status(400).json({ reason: 'Bad request' });
        } else if (e instanceof user.UserNotFoundException) {
            res.status(404).json({ reason: 'User not found' });
        } else if (e instanceof user.CreatingAccountException) {
            switch (e.message) {
                case 'name is required':
                    res.status(400).json({ reason: 'Name is required' });
                    break;
                case 'name is very big':
                    res.status(400).json({ reason: 'Name is very big' });
                    break;
                default:
                    res.status(400).json({ reason: 'Bad request' });
                    break;
            }
        } else {
            console.log(e);
            res.status(500).json({ reason: 'Unknown error' });
        }
    }
});

app.post('/api/makeTransfer', async (req, res) => {
    try {
        let token = req.header('Authorization');
        if (token == null) {
            throw new TelegramWebAppException();
        }
        let body = z.object({ from: z.string(), to: z.string(), amount: z.number() }).parse(req.body);
        res.json(await user.makeTransfer(token, body.from, body.to, body.amount));
    } catch (e) {
        if (e instanceof TelegramWebAppException) {
            res.status(403).json({ reason: 'Invalid token' });
        } else if (e instanceof z.ZodError) {
            res.status(400).json({ reason: 'Bad request' });
        } else if (e instanceof user.UserNotFoundException) {
            res.status(404).json({ reason: 'User not found' });
        } else if (e instanceof user.MakingTransferException) {
            switch (e.message) {
                case 'Amount must be positive':
                    res.status(400).json({ reason: 'Amount must be positive' });
                    break;
                case 'Not found sender account':
                    res.status(404).json({ reason: 'Not found sender account' });
                    break;
                case 'Not found receiver account':
                    res.status(404).json({ reason: 'Not found receiver account' });
                    break;
                default:
                    res.status(400).json({ reason: 'Bad request' });
                    break;
            }
        } else {
            console.log(e);
            res.status(500).json({ reason: 'Unknown error' });
        }
    }
});

app.use('/', e.static('./web/dist'));


app.listen(3000);
