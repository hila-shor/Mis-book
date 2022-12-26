const { useState, useEffect } = React


import { BookFilter } from '../cmps/book-filter.jsx';
import { BookList, CarList } from '../cmps/book-list.jsx';
import { BookDetails } from './book-details.jsx';
import { UserMsg } from '../cmps/user-msg.jsx';

import { bookService } from './../services/book.service.js';



export function BookIndex(){

  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [userMsg, setUserMsg] = useState('')

  
  useEffect(() => {
    loadBooks()
  }, [filterBy])


function loadBooks() {
  bookService.query(filterBy).then((booksToUpdate) => setBooks(booksToUpdate))
}

function onSetFilter(filterBy){
  console.log(filterBy)
  setFilterBy(filterBy)
}

function onRemoveBook(bookId) {
  bookService.remove(bookId).then(() => {
      const updatedBooks = books.filter(book => book.id !== bookId)
      setBooks(updatedBooks)
      // setUserMsg('Book removed successfully')
      flashMsg('Car removed!')
  })
}

function onSelectBook(bookId) {
  // setSelectedBook(book)
  bookService.get(bookId).then((book) => {
      setSelectedBook(book)
      console.log('book selected', book)
  })
}
function flashMsg(msg) {
  setUserMsg(msg)
  setTimeout(() => {
      setUserMsg('')
  }, 3000)
}

  return ( <section className="book-index">
              
              { selectedBook && <BookDetails book={selectedBook} onGoBack=
              {()=>setSelectedBook(null)} />}
              {!selectedBook && 
              <div>
                <h2>Books list</h2>
                <BookFilter onSetFilter={onSetFilter}/>
                <BookList books={books} onRemoveBook={onRemoveBook} onSelectBook={onSelectBook} />
              </div>}
              {UserMsg && <UserMsg msg={userMsg}/>}
          </section>)
}