const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { LongTxt } from "../cmps/long-txt.jsx"
import { AddReview } from "../cmps/add-review.jsx"
import { ReviewList } from "../cmps/review-list.jsx"
import { bookService } from "../services/book.service.js"
import { showSuccessMsg , showErrorMsg  } from "../services/event-bus.service.js"

export function BookDetails(){
  const [book, setBook] = useState(null)
  const [nextBookId, setNextBookId] = useState(null)
  const [prevBookId, setPrevBookId] = useState(null)
  const params = useParams()
  // const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
}, [params.bookId])

function loadBook() {
  bookService.get(params.bookId)
      .then((book) =>{
        setBook(book)
      } )
      .catch((err) => {
          console.log('Had issues in book details', err)
          navigate('/books')
      })

  bookService.getNextBookId(params.bookId)
      .then(setNextBookId)

  bookService.getPrevBookId(params.bookId)
      .then(setPrevBookId)

}
function getPublishDate(){
  let currYear = new Date().getFullYear()
  if (currYear - book.publishedDate > 10)return 'Vintage'
  if (currYear - book.publishedDate < 1)return 'New'
}

function getReadingLevel(){
  var pageCount= book.pageCount
  if (pageCount>500)return "Serious"
  if (pageCount>200)return  "Descent"
  if (pageCount<100)return   "Light"
}
// var readingLevelClass= getReadingLevel().toLowerCase()
function getPriceClass() {
  
  if (book.listPrice.amount >= 150) return 'red'
  else if (book.listPrice.amount <= 100) return 'green'
  else return ''
}

function onGoBack() {
  navigate('/books')
}

function onSaveReview (review){
  console.log(book.id)
  console.log(review)
  bookService.addReview(review, book.id).then((updatedBook) => {
    showSuccessMsg('Book review added')
    setBook({ ...updatedBook })
  }).catch((err) => {
    console.log('Had issues adding review', err)
    showErrorMsg('Could not add book review')
  })
}


function onRemoveReview(reviewId) {
  console.log('from onRemoveReview(reviewId) from book-details ')
  bookService.removeReview(book.id, reviewId).then((updatedBook) => { 
      showSuccessMsg('Book review removed')
      setBook({ ...updatedBook})
  })
}
  if (!book) return <div>loading..</div>
  return <section className='book-details animate__animated animate__fadeInLeft'>
            <h2>{book.title}</h2>
            {book.listPrice.isOnSale && <img className="on-sale animate__animated animate__wobble animate__delay-1s" src="assets/img/sale.jpg"/>}
            <h3 className={getPriceClass()}>{`€ ${book.listPrice.amount} `} </h3>
            <div className="flex flex-row">
              <img src={book.thumbnail}/> 


              <div className="reviews">
                <AddReview onSaveReview={onSaveReview} />
                {(!book.reviews) && <span className="title">No reviews yet</span>}
                {book.reviews && <h3>{book.reviews.length} Reviews</h3>}
                {book.reviews && <ReviewList book={book} onRemoveReview={onRemoveReview}/>}
              </div>
            </div>
            
            {getReadingLevel() && <h2 className={getReadingLevel().toLowerCase()}>{getReadingLevel()} Reading</h2>}
            <h4 className="published-date">{getPublishDate()}</h4>
            <LongTxt txt={book.description} length={100}/>
            <button onClick={onGoBack}>Go back</button>
            <Link className= "edit-btn" to={`/books/edit/${book.id}`}>Edit book</Link>
            <hr />
            <div className="next-prev container flex">
              <Link className="prev-book" to={`/books/${prevBookId}`}>prev book</Link>
              <Link className="next-book" to={`/books/${nextBookId}`}>Next book</Link>
          </div>
        </section>
}