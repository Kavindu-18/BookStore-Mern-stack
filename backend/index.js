import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './config.js';
import { Book } from './models/bookModel.js';


const app = express();

app.use(express.json());

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

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    }
        
     catch (error) {
        console.log(error.massage);
        response.status(500).send({message: error.message});

    }
});

//routing to get all books from database

app.get('/books', async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).send(books);

        count:books.length;
        data:books;

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//routing to get all books from database by id

app.get('/books/:id', async (request, response) => {
    try{

        const { id } = request.params;

        const book = await Book.findby(id);

        return response.status(200).json(book);

    }catch(error){
        console.log(error.message);
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
