import React,{useState,useEffect} from 'react'
import './BookShelf.css'
import { Link} from 'react-router-dom';
import Shelf from '../../img/self.avif'
import book1 from '../../img/book1.jpg'
import BookItem from './BookItem'
import {ImSearch} from 'react-icons/im'
import axios from 'axios'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import shelfbook from '../../img/shelf-book.jpg'
import shelfbook2 from '../../img/shelf-book2.jpg'
import shelfbook3 from '../../img/shelf-book3.jpg'






const BookShelf = () => {
const [books,setBooks]=useState([]);

useEffect(()=>{
    const fetchAllBooks = async ()=>{
        try{
        const res= await axios.get("http://localhost:8800/api/bookPost/books")
        setBooks(res.data) 
        }catch(err){
            console.log(err)
        }
}
        fetchAllBooks()

    },[]);

//avarage rate for each book
/*useEffect(() => {
    const fetchBookRates = async () => {
      try {
        const booksWithRates = await Promise.all(
          books.map(async (book) => {
            if (!book.averageRate) {
              const res = await axios.get(
                `http://localhost:8800/api/bookRate/avaragerate?bookId=${book.id}`
              );
              const averageRate = res.data;
              return { ...book, averageRate };
            }
            return book;
          })
        );
        setBooks(booksWithRates);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookRates();
  }, [books]);*/

 /* useEffect(() => {
    const updateAverageRate = async () => {
      try {
        await Promise.all(
          books.map(async (book) => {
            if (book.averageRate && book.id) {
              await axios.put(
                `http://localhost:8800/api/bookRate/averagerate/${book.id}`,
                {
                  averageRate: book.averageRate,
                }
              );
            }
          })
        );
        console.log('Average rate updated successfully');
      } catch (error) {
        console.error('Error updating average rate:', error);
      }
    };

    updateAverageRate();
  }, [books]);*/



   const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Display 3 slides at a time (adjust as needed)
  slidesToScroll: 1 // Scroll 1 slide at a time
  
};




const [search,setSearch]=useState('');
 const [visible,setVisible]=useState(4);
 const [results, setResults] = useState([]);

  const showMoreItems=()=>{
        setVisible((prevValue) => prevValue + 4);
    };
     const showLessItems=()=>{
        setVisible(4);
    };
//Search bt name and writer
    const handleQueryChange = (e) => {
    const search = e.target.value;
    setSearch(search);

    const filteredBooks = books.filter(
      (book) =>
        book.bookname.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())||
         book.category.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filteredBooks);
  };




  const [bookItems, setBookItems] = useState([]);

  
 


  
  return (
    <div className='shelf-container'>
      <div className='line'></div>
        <div className='design-shelf'>
        <div className='titleTop'> <h3>About The Magic Book Club</h3>
        <span>Horror, Suspense, Fiction, Fantasy , Fairy Tale &Poetry....</span>
       </div>
 
 <div className='Slider'>
 {/*//////////////////////// */}

<div className='slide-book'>
 <img src={shelfbook}/>
  <img src={shelfbook2}/>
  <img src={shelfbook3}/>
</div>



 {/*//////////////////////// */}
  
  <div className='stand'>
    <Link>
      <img src={Shelf} alt='shelf' />
      
    </Link>
  </div>
</div>



        </div>
        
        
        <div className='bookItem'>
          <div className='search'>
          <div className='drop-downlist'>
        {/*<label htmlFor="category">Select a category:</label>
      <select id="category" value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
        <option value="">-- Select a Category --</option>
        <option value="play6">Category 1</option>
        <option value="play7">marwa</option>
        <option value="category8">horrer</option>
          </select>*/}
      </div>
       <div className='searchname'>
      <div className='form'>
        <form>
          <ImSearch size={27} color='rgb(58, 58, 58)'/>
          <input type='text' placeholder='SEARCH BOOKS BY TITLE, AUTHOR OR CATEGORY' className='searchText' value={search} onChange={handleQueryChange}></input>
         {/*<input type='submit' value='SEARCH' className='button'/>*/}
        </form>
       </div>
      </div>
      </div>
      <div className='item1'>
       {search.toLowerCase()===''?books.map((book)=>{
        if (book.public ==="true") {
          return <BookItem  book={book} key={book.id} />
        }
          
          }):results.length>0?results.map((book)=>{
           if (book.public==="true") {
          return <BookItem  book={book} key={book.id} />
        }
         
          }):<div className='nomatch'>No matching books found</div>}
          
          

</div >
      
          
        </div>

          
     
      
      
      
      
      
      
      
      
      
      
    </div>
  )
}

export default BookShelf