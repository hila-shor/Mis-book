const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

export function BookDetails(){
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
}, [])

function loadBook() {
  bookService.get(params.bookId)
      .then((book) => setBook(book))
      .catch((err) => {
          console.log('Had issues in book details', err)
          navigate('/books')
      })
}
function onGoBack() {
  navigate('/books')
}
  if (!book) return <div>loading..</div>
  return <section className='book-details'>
            <h2>{book.title}</h2>
            <h3>{`€ ${book.listPrice.amount} `} </h3>
            <img src={book.thumbnail}/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident voluptatum id, ducimus neque officia nisi excepturi dolores voluptates possimus modi officiis minus ipsum minima quod, esse exercitationem aspernatur, repellendus perspiciatis!</p>
            <button onClick={onGoBack}>Go back</button>
        </section>
}