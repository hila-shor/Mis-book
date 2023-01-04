const { useState, useEffect, useRef } = React

export function AddBook(){

  const [bookSearch, setBookSearch]= useState({})
  const elInputRef = useRef(null)

  function handleChange({target}){
    let {value, name:field, type}= target
    value = type === 'number'? +value : value;
    setBookSearch((prevFilter)=>{
      return {...prevFilter, [field]:value}
    })
  }

  return <section className="add-book">
            <div className="add-wrapper container">
              <label>
                <input type="text"
                  onChange={handleChange}
                  ref={elInputRef}
                  id="title"
                  name="title"
                  placeholder='By title'
                  value={bookSearch.txt} />
              </label> 
            </div>
          
        </section>
      }
