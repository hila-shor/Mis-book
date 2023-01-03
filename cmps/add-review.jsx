const { useState, useEffect } = React
import { bookService } from '../services/book.service.js';

export function AddReview({onSaveReview}){

  const [review, setReview]= useState(bookService.getDefaultReview())



  function handleChange({target}){
    let {value, name:field, type}= target
    value = type === 'number'? +value : value;
    setReview((prevFilter)=>{
      return {...prevFilter, [field]:value}
    })
  }

  function onSubmitReview(ev) {
    ev.preventDefault()
    onSaveReview(review)
    setReview(bookService.getDefaultReview())
    
  }

  return <section className="add-review">
    <h1>hello from review </h1>

            <form onSubmit={onSubmitReview}>

              <label>
                Full Name:
                  <input type="text"
                        onChange={handleChange}
                        id="fullName"
                        name="fullName"
                        placeholder='Full Name' 
                        value={review.fullName}/>
              </label> 
      
              <label>
                Rating:
                <select
                  value={review.rating} 
                  onChange={handleChange}
                  name="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
              </label> 

              <label >Read at:
                <input type="date"
                id="readAt"
                name="readAt"
                value={review.readAt}
                onChange={handleChange} />
              </label>

            <button>Submit</button>

            </form>
          </section>
}