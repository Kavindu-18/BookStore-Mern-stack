
import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

export default router;



router.post('/add',async (request, response) => {

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

router.get('/all', async (request, response) => {
    try{
        const books = await Book.find({});

        return response.status(200).send(books);

        //count:books.length;
        //data:books;

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//routing to get all books from database by id

router.get('/:id', async (request, response) => {
    try{

        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});



//Routing to update Book
router.put('/update', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({message: 'Send all required fields'});
        }

        const {id}=request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

     if(!result){   
        return response.status(404).send({message: 'Book not found'});
     }

     return response.status(200).send({message: 'Book updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

});

//route for deleting book
router.delete('/delete', async (request, response) => {
    try{
        const {id}=request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book deleted successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});
