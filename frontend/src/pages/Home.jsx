import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';

const Home = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/api/books')
            .then((response) => {
                setBooks(response.data.data);
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
                <MdOutlineAddBox className='text-sky-800 text-4xl cursor-pointer'/>
            </Link>

        
        </div> 
        {loading ? (
            <Spinner />
        ) : (
            <table className=' w-full boarder-separate boarder-spacing-2'>
                <thead>
                    <th className='boarder boarder-slate-600 rounded-md'>No</th>
                    <th className='boarder boarder-slate-600 rounded-md'>Title</th>
                    <th className='boarder boarder-slate-600 rounded-md max-md:hidden'>Author</th>
                    <th className='boarder boarder-slate-600 rounded-md max-md:hidden'>Publish year</th>
                    <th className='boarder boarder-slate-600 rounded-md'>Opereations</th>
    
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id} className 'h-8'>
                        </tr>

                    ))}

                </tbody>

            </table>
        )}

    </div>

  )
}

export default Home