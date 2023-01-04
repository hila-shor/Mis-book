import { GooglePreview } from '../cmps/google-preview.jsx';

export function GoogleList({books, onSaveGoogleBook}){

  return <section className="google-list">
            <ul className="ul-list clean-list mail-layout container">
                {books.map(book=> <li className="google-list-li flex" key={book.keyId}>
                            <GooglePreview book={book}/>
                            <div>
                              <div onClick={(ev)=>{onSaveGoogleBook(ev,book)}}>➕</div>
                            </div>
                      </li>)}
    
              </ul>
          </section>

}

