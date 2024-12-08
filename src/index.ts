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

app.use('/', e.static('./web/dist'));


app.listen(3000);
