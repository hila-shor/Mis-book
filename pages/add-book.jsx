const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

import { GoogleList } from '../cmps/google-list.jsx';
import { googleBookService } from '../services/googleBook.service.js'
import { bookService } from "../services/book.service.js"
import { showSuccessMsg , showErrorMsg  } from "../services/event-bus.service.js"
import {utilService } from "../services/util.service.js"

export function AddBook(){

  const [books, setBooks] = useState([])
  const elInputRef = useRef(null)
  const navigate = useNavigate()
  const searchDebounce = useRef(null)


  useEffect(() => {
    loadBooksFromGoogle()
    searchDebounce.current = googleBookService.debounce(loadBooksFromGoogle)
  }, [])


  function onSearchHandle({target}){
    // console.log(target.value)
    searchDebounce.current(target.value)
  }

  function loadBooksFromGoogle(txt = 'James Clavell') {
    
    googleBookService.searchBooks(txt)
      .then((books)=>{
        setBooks(books)
        console.log(books)
      })
      .catch(err => {
        console.log('Had issues in book details:', err)
        navigate('/books')
    })
    
  }

  function onSaveGoogleBook(ev,book){
    // console.log('saved the book from add-book')
    ev.preventDefault()
    console.log("save book", book)
    if (!book.thumbnail)book.thumbnail='assets/img/book1.jpg'
    if(typeof book.price !== 'number') book.price=utilService.getRandomIntInclusive(48,169)
    bookService.save(book).then((book)=>{
        console.log('book', book)
        showSuccessMsg('Book saved')
        navigate('/books')
    })
    .catch((err) =>{
      console.log('error', err)
      showErrorMsg('Could not save new book')
  })
  }

  return <section className="add-book">
            <div className="add-wrapper container">
              <label >Search Book
                <input type="text"
                  onChange={onSearchHandle}
                  ref={elInputRef}
                  id="title"
                  name="title"
                  placeholder='Enter book detail..' />
                   {/* value={bookSearchVal.txt} */}
              </label> 
            </div>

            {books && <GoogleList books={books} onSaveGoogleBook={onSaveGoogleBook}/>}
          
        </section>
      }
