const { useState, useEffect } = React
const {Link} = ReactRouterDOM

import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { bookService } from "../services/book.service.js"
import { showSuccessMsg , showErrorMsg  } from "../services/event-bus.service.js"



export function BookIndex() {

    const [books, setBooks] = useState([])
    const [filterBy , setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(books => setBooks(books))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBook = books.filter(book => book.id !== bookId)
            setBooks(updatedBook)
            showSuccessMsg('Book removed')
        })
        .catch((err) =>{
            console.log('error', err)
            showErrorMsg('Could not remove book')
        })
    }

 
    return <section className="book-index">
        <BookFilter onSetFilter={onSetFilter} />

        <Link className= "edit-btn" to={`/books/edit`}>Add book</Link>

        <BookList books={books} onRemoveBook={onRemoveBook}/>

    </section>
}


























// const { useState, useEffect } = React
// // const {Link} = ReactRouterDOM

// import { BookFilter } from '../cmps/book-filter.jsx';
// import { BookList } from '../cmps/book-list.jsx';

// import { bookService } from './../services/book.service.js';
// import { eventBusService , showSuccessMsg , showErrorMsg  } from "../services/event-bus.service.js"


// export function BookIndex(){
// console.log('BookIndex')
//   const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
//   const [books, setBooks] = useState([])
  
//   useEffect(() => {
//     loadBooks()
//   }, [filterBy])


// function loadBooks() {
//   // bookService.query(filterBy).then((booksToUpdate) => setBooks(booksToUpdate))
//   bookService.query(filterBy).then(setBooks)
// }

// function onSetFilter(filterBy){
//   console.log('onSetFilter filterBy',filterBy)
//   setFilterBy(filterBy)
// }

// function onRemoveBook(bookId) {
//   bookService.remove(bookId).then(() => {
//       const updatedBooks = books.filter(book => book.id !== bookId)
//       setBooks(updatedBooks)
//       showSuccessMsg('Book removed successfully')  
//   })
//   .catch((err) =>{
//     console.log('error', err)
//     showErrorMsg('Failed to remove the book')
//   })
// }


//   return  <section className="book-index">
//             <h2>Books list</h2>
//             <BookFilter onSetFilter={onSetFilter}/>
//             <BookList books={books} onRemoveBook={onRemoveBook}/>
//           </section>


