import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './config.js';
import { Book } from './models/bookModel.js';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World!');
});

app.post('/books',async (request, response) => {

    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({message: 'Data fields missing'});
        }

    }
        
     catch (error) {
        console.log(error.massage);
        response.status(500).send({message: error.message});

    }
});

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

})

.catch((error) => {
    console.log(error);
});
