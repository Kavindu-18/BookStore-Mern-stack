import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {

    const [books, setBooks] = useState([""]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books/all')
            .then((response) => {
                setBooks(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);


    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl cursor-pointer' />
                </Link>


            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className=' w-full boarder-separate boarder-spacing-2'>
                    <thead>
                        <tr>
                            <th className='boarder boarder-slate-600 rounded-md'>No</th>
                            <th className='boarder boarder-slate-600 rounded-md'>Title</th>
                            <th className='boarder boarder-slate-600 rounded-md max-md:hidden'>Author</th>
                            <th className='boarder boarder-slate-600 rounded-md max-md:hidden'>Publish year</th>
                            <th className='boarder boarder-slate-600 rounded-md'>Opereations</th>
                        </tr>
                    </thead>
                    <tbody>

                      
                        {books && books.map((book, index) => (

                            <tr key={book._id} className='h-8'>
                                <td className='boarder boarder-slate-700 rounded-md text-centre'>
                                    {index + 1}
                                </td>
                                <td className='boarder boarder-slate-700 rounded-md text-centre'>
                                    {book.title}
                                </td>
                                <td className='boarder boarder-slate-700 rounded-md text-centre max-md:hidden'>
                                    {book.author}
                                </td>
                                <td className='boarder boarder-slate-700 rounded-md text-centre max-md:hidden'>
                                    {book.publishYear}
                                </td>

                                <td className='border border-slate-700 round-md text-centre'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/books/details/${book._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800 cursor-pointer' />
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600 cursor-pointer' />
                                        </Link>
                                        <Link to={`/books/delete/${book._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600 cursor-pointer' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>




                        ))}


                    </tbody>



                </table>
            )}

        </div>

    )
}

export default Home