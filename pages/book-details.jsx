

export function BookDetails({book, onGoBack}){

  return <section className='book-details'>
            <h2>{book.title}</h2>
            <h3>{`€ ${book.listPrice.amount} `} </h3>
            <img src={book.thumbnail}/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident voluptatum id, ducimus neque officia nisi excepturi dolores voluptates possimus modi officiis minus ipsum minima quod, esse exercitationem aspernatur, repellendus perspiciatis!</p>
            <button onClick={onGoBack}>Go back</button>
        </section>
}