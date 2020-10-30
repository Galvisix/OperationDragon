const express = require("express");
const topSecretHandler = require("./topSecretHandler");
const topSecretSplitHandler = require("./topSecretSplitHandler");
const app = express();

const port = 3000;

app.use(express.json())


app.post('/topsecret/', topSecretHandler.processPost)
app.get('/topsecret_split/:name', topSecretSplitHandler.processGet)
app.post('/topsecret_split/:name', topSecretSplitHandler.processPost)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

