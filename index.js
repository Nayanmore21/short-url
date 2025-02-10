const express = require('express');
const URL = require('./models/url')

const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./connect')

const app = express();
const PORT = 8000;
connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('Connected to the MongoDB..'))

app.use(express.json());
app.use(express.urlencoded({ extended: 'true' }));
app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp:Date.now(),
            }
        }

    });
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server running at PORT:${PORT}`));