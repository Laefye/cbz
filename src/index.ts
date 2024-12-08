import e from "express";

const app = e();

app.use('/', e.static('./web/dist'));

app.listen(3000);
