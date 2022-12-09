
// @ts-ignore
import app from "../functions/api"

import router from "./routers";

app.use(router)

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST


app.listen(PORT as number, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
