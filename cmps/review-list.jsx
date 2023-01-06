
export function ReviewList({ book, onRemoveReview }){

  return(

  <ul className="review-list flex clean-list mail-layout">
     {book.reviews.map((review)=>
     
              <li className=" review-li " key={review.id} >
                <h5>Full Name: {review.fullName}</h5>
                <h5>Rating: {'⭐'.repeat(review.rating)}</h5>
                <h5>Read at: {review.readAt}</h5>
                <button className="remove-review" 
                        onClick={() => onRemoveReview(review.id)}>
                        Delete review</button>
              </li>)}
  </ul> )

}
