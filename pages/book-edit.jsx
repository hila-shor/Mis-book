const {useState , useEffect} = React
const {useNavigate , useParams , Link} = ReactRouterDOM
import { bookService } from "../services/book.service.js"

export function BookEdit(){
  const [bookToEdit , setBookToEdit] = useState(bookService.getEmptyBook())
  const {bookId} = useParams()
  const navigate = useNavigate()
  
  useEffect(() =>{
    if(!bookId) return
    loadBook()
} , [])

function loadBook() {
    bookService.get(bookId)
    .then((book) => setBookToEdit(book))
    .catch((err) =>{
        console.log(err)
        navigate('/books')
    })
}

console.log('book to Edit from BookEdit :>> ', bookToEdit );

  function onSaveBook(ev){
    console.log("save book")
    ev.preventDefault()
    bookService.save(bookToEdit).then((book)=>{
        console.log('book', book)
        // showSuccessMsg('Book saved')
        navigate('/books')

    })
  }
  function handleChange({target}){
    let {value, name:field, type}= target
    value = type === 'number'? +value : value;
    setBookToEdit((prevFilter)=>{
      return {...prevFilter, [field]:value}
    })
  }
  return <section className="book-edit flex">
            {bookToEdit && <img src={bookToEdit.thumbnail}/>}
            <form onSubmit={onSaveBook}>
              <label className="flex" htmlFor="title">Book name:</label>
              <input type="text"
                  name="title"
                  id="title"
                placeholder="Enter book name..."
                value={bookToEdit.title}
                onChange={handleChange}/> 

              <label className="flex" htmlFor="price">Price:</label>
              <input type="number" 
                name="price"
                id="price"
                placeholder="Enter price..."
                value={bookToEdit.price}
                onChange={handleChange}/>
            
              <div>
                  <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
                  <Link to="/book">Cancel</Link>
              </div>
            </form> 
          
        </section>
}