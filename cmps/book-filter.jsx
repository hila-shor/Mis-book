const { useState, useEffect } = React
import { bookService } from './../services/book.service.js';


export function BookFilter({onSetFilter}){

  const [filterByToEdit, setFilterByToEdit]= useState(bookService.getDefaultFilter())
console.log(filterByToEdit)

useEffect(() => {
  onSetFilter(filterByToEdit)
}, [filterByToEdit])

function handleChange({target}){
  let {value, name:field, type}= target
  value = type === 'number'? +value : value;
  setFilterByToEdit((prevFilter)=>{
    return {...prevFilter, [field]:value}
  })
}

function onSubmitFilter(ev){
  ev.preventDefault()
  onSetFilter(filterByToEdit)
}


  return <section className="book-filter">
              <h2> filter our books</h2>
              <form onSubmit={onSubmitFilter}>
                <label htmlFor="authors">Author</label>
                <input type="text"
                        onChange={handleChange}
                        id="authors"
                        name="txt"
                        placeholder='By authors' 
                        value={filterByToEdit.txt}/>
                <label htmlFor="minPrice">Min price</label>
                <input type="number"
                        onChange={handleChange} 
                        id="minPrice"
                        name="minPrice"
                        placeholder='By min price' 
                        value={filterByToEdit.minPrice}/>
                <button>Filter books</button>
              </form>
        </section>
}