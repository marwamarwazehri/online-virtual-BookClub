import React, { useState, useEffect } from 'react';
import './Author.css';
import { useParams } from 'react-router-dom';
import BookItem from './BookItem';
import axios from 'axios';
import {ImSearch} from 'react-icons/im'

const Author = () => {
  const { authorName } = useParams();
  const [books, setBooks] = useState([]);
  const [search,setSearch]=useState('');
  const [results, setResults] = useState([]);
  const [hideavrageRate,setHideAverageRate]=useState(true);

const handleQueryChange = (e) => {
    const search = e.target.value;
    setSearch(search);

    const filteredBooks = books.filter(
      (book) =>
         book.bookname.toLowerCase().includes(search.toLowerCase()) ||
          book.category.toLowerCase().includes(search.toLowerCase())
        
    );
    setResults(filteredBooks);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedAuthorName = decodeURIComponent(authorName); // Decode the author name
        const res = await axios.get(
          `http://localhost:8800/api/bookPost/bookauthor/${decodedAuthorName}`
        );
        setBooks(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authorName]);

  return (
    <div className='book-author'>
      <div className='intro'>
        <h5>AUTHOR</h5>
        <h4>{authorName}</h4>
      </div>
   
   <div className='try1'>
    
     <div className='by-name'>
        <p>Books by {authorName}</p>
      </div>
   {/*SEARCH*/}
       <div className='searchname2'>
      <div className='form'>
        <form>
          <ImSearch size={27} color='rgb(58, 58, 58)'/>
          <input type='text' placeholder='SEARCH BOOKS BY TITLE OR CATEGORY' className='searchText2' value={search} onChange={handleQueryChange}></input>
         {/*<input type='submit' value='SEARCH' className='button'/>*/}
        </form>
       </div>
      </div>

     


      <div className='content'>
        {search.toLowerCase()===''?books.map((book)=>{
          if (book.public ==="true") {
          return <BookItem  book={book} key={book.id}/>
             }
         
          
          }):results.length>0?results.map((book)=>{
             if (book.public ==="true") {
          return <BookItem  book={book} key={book.id}/>
             }
         
          }):<div className='nomatch2'>No matching books found</div>}
      </div>
      </div>
    </div>
  );
};

export default Author;
