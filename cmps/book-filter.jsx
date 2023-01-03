const { useState, useEffect, useRef } = React
import { bookService } from './../services/book.service.js';


export function BookFilter({onSetFilter}){

  const [filterByToEdit, setFilterByToEdit]= useState(bookService.getDefaultFilter())
  const elInputRef = useRef(null)
// console.log(filterByToEdit)

useEffect(() => {
  elInputRef.current.focus()
}, [])

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
                <label htmlFor="title">Book name</label>
                <input type="text"
                        onChange={handleChange}
                        ref={elInputRef}
                        id="title"
                        name="txt"
                        placeholder='By title' 
                        value={filterByToEdit.txt}/>
                <label htmlFor="maxPrice">Max Price</label>
                <input type="number"
                        onChange={handleChange}
                        id="maxPrice"
                        name="maxPrice"
                        placeholder='By max Price' 
                        value={filterByToEdit.maxPrice}/>
                <button>Filter books</button>
              </form>
        </section>
}