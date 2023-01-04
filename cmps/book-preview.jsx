
export function BookPreview({book}){
// console.log('BookPreview book ',book)
  return <article className="book-preview">
            <h2>{book.title}</h2>
            <img src={book.thumbnail}/>
            <h3>{'€ '+ book.price}</h3>
        </article>
}