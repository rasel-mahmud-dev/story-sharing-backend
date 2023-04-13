
import app from "./app/app"

import router from "./routes";

app.use(router)

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST


app.listen(PORT as number, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
