const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;

const app = express();


app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res, next) => {
    return res.json({
        "text": "hello"
    })
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})