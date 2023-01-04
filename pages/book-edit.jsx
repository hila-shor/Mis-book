const {useState , useEffect} = React
const {useNavigate , useParams , Link} = ReactRouterDOM
import { bookService } from "../services/book.service.js"
import { showSuccessMsg , showErrorMsg  } from "../services/event-bus.service.js"

export function BookEdit(){
  const [bookToEdit , setBookToEdit] = useState(bookService.getEmptyBook())
  console.log(bookToEdit)

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
    ev.preventDefault()
    console.log("save book")
    if (!bookToEdit.thumbnail)bookToEdit.thumbnail='assets/img/book1.jpg'
    bookService.save(bookToEdit).then((book)=>{
        console.log('book', book)
        showSuccessMsg('Book saved')
        navigate('/books')
    })
    .catch((err) =>{
      console.log('error', err)
      showErrorMsg('Could not save new book')
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
            {!bookToEdit.thumbnail && <img className="default-img" src="assets/img/book3.jpg"/>}
            <div className="form-container">
              <form onSubmit={onSaveBook}>

                <label className="flex" htmlFor="title">Book name:<span className="red">*</span></label>
                <input type="text"
                    name="title"
                    id="title"
                  placeholder="Enter book name..."
                  value={bookToEdit.title}
                  onChange={handleChange}
                  required/> 

                <label className="flex" htmlFor="price">Price:</label>
                <input type="number" 
                  name="price"
                  id="price"
                  placeholder="Enter price..."
                  value={bookToEdit.price}
                  onChange={handleChange}/>

                <label className="flex" htmlFor="subtitle">Subtitle : </label>
                <input type="text"
                    name="subtitle"
                    id="subtitle"
                    placeholder="Enter subtitle..."
                    value={bookToEdit.subtitle}
                    onChange={handleChange}/>

                <label className="flex" htmlFor="authors">Authors : </label>
                <input type="text"
                    name="authors"
                    id="authors"
                    placeholder="Enter authors..."
                    value={bookToEdit.authors}
                    onChange={handleChange}/>

                <label className="flex" htmlFor="description">Description : </label>
                <input type="text"
                    name="description"
                    id="description"
                    placeholder="Enter description..."
                    value={bookToEdit.description}
                    onChange={handleChange}/>

                <label className="flex" htmlFor="pageCount">Page count : </label>
                <input type="number"
                    name="pageCount"
                    id="pageCount"
                    placeholder="Enter number of pages..."
                    value={bookToEdit.pageCount}
                    onChange={handleChange}/>
            
            
                <label className="flex" htmlFor="categories">Categories : </label>
                <input type="text"
                    name="categories"
                    id="categories"
                    placeholder="Enter categories..."
                    value={bookToEdit.categories}
                    onChange={handleChange}
                />
            
            
                <label className="flex" htmlFor="thumbnail">Cover picture src: </label>
                <input type="url"
                    name="thumbnail"
                    id="thumbnail"
                    placeholder="Enter thumbnail..."
                    value={bookToEdit.thumbnail}
                    onChange={handleChange}
                />
            
            
                <label className="flex" htmlFor="language">Language: </label>
                <input type="text"
                    name="language"
                    id="language"
                    placeholder="Enter language..."
                    value={bookToEdit.language}
                    onChange={handleChange}
                />
            
              
                <label className="flex" htmlFor="amount">Price: </label>
                <input type="number"
                    name="amount"
                    id="amount"
                    placeholder="Enter price..."
                    value={bookToEdit.listPrice.amount}
                    onChange={handleChange}
                />
            
            
                <label className="flex" htmlFor="currencyCode">Currency: </label>
                <input type="text"
                    name="currencyCode"
                    id="currencyCode"
                    placeholder="EUR / ILS / USD"
                    value={bookToEdit.listPrice.currencyCode}
                    onChange={handleChange}/>
            
            
                {!bookToEdit && <div>
                    <label className="flex" htmlFor="publishedDate">Published at : </label>
                  <input type="date"
                      name="publishedDate"
                      id="publishedDate"
                      placeholder="Enter publish date..."
                      value={bookToEdit.publishedDate}
                      onChange={handleChange}/>
                </div>}
                
                {bookToEdit && <div>
                    <label className="flex" htmlFor="publishedDate">Published at : </label>
                  <input type="number"
                      name="publishedDate"
                      id="publishedDate"
                      placeholder="Enter publish date..."
                      value={bookToEdit.publishedDate}
                      onChange={handleChange}/>
                </div>}
              
                  <label className="flex" htmlFor="isOnSale">On sale?: </label>
                  <input type="checkbox"
                      name="isOnSale"
                      id="isOnSale"
                      placeholder="EUR / ILS / USD"
                      value={bookToEdit.listPrice.isOnSale}
                      onChange={handleChange}/>
                
                <div>
                    <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
                    <Link to="/books">Cancel</Link>
                </div>
              </form> 
            </div>
          
        </section>
}