import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';



const app = express();

app.use(express.json());

//CORS POLICY

/*app.use(
    cors({
        origin:'http://localhost:5555/',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type'],
    })
)*/

//app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World!');
});

app.use('/books', booksRoute);


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