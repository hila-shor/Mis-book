const { Link } = ReactRouterDOM

import {BookPreview } from "./book-preview.jsx"

export function BookList({books, onRemoveBook, onSelectBook}){
console.log(books)
  return <ul className="book-list clean-list">
    {
        books.map(book=> <li key={book.id}>
                            <BookPreview book={book}/>
                            <div>
                              <button onClick={()=>{onRemoveBook(book.id)}}>
                                  Remove book</button>
                              {/* <button onClick={()=>{onSelectBook(book.id)}}>
                                Select book</button> */}
                                <Link to={`/books/${book.id}`}>Select book!</Link>
                            </div>
                          </li>)}
    
  </ul>
}