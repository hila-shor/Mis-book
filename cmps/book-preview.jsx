
export function BookPreview({book}){
// console.log(book)
  return <article className="book-preview">
            <h2>{book.title}</h2>
            <img src={book.thumbnail}/>
            <h3>{'€ ' +book.listPrice.amount}</h3>
        </article>
}