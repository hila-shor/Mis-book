const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

import { googleBookService } from '../services/googleBook.service.js';

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
          
        </section>
      }
