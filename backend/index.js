import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './config.js';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('MongoDB connected successfully');

})

.catch((error) => {
    console.log(error);
}
