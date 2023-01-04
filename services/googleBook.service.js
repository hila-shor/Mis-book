import { utilService } from "../services/util.service.js"
export const googleBookService = {
  debounce,
  searchBooks
}

// const googleBookAPI = `https://www.googleapis.com/books/v1/volumes?q=${query}`

function debounce(func, timeout = 500) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}


function searchBooks(search) {
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
    .then(res => {
      const books = res.data.items.slice(0, 7).map(book => {
        return {
          id: utilService.makeId(),
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          publishedDate: book.volumeInfo.publishedDate,
          description: book.volumeInfo.description,
          pageCount: book.volumeInfo.pageCount,
          categories: book.volumeInfo.categories,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          language: book.volumeInfo.language,
          listPrice: book.saleInfo.listPrice,
          price: book.saleInfo.retailPrice
        }
      })
      console.log(books)
      return books
    })
    .catch(err => {
      console.log(err);
      return []
    })
}





  // axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
  //   .then(res => {
  //     const book = {
  //       id: res.data.id,
  //       title: res.data.volumeInfo.title,
  //       subtitle: res.data.volumeInfo.subtitle,
  //       authors: res.data.volumeInfo.authors,
  //       publishedDate: res.data.volumeInfo.publishedDate,
  //       description: res.data.volumeInfo.description,
  //       pageCount: res.data.volumeInfo.pageCount,
  //       categories: res.data.volumeInfo.categories,
  //       thumbnail: res.data.volumeInfo.imageLinks.thumbnail,
  //       language: res.data.volumeInfo.language,
  //       listPrice: res.data.saleInfo.listPrice,
  //       price: res.data.saleInfo.retailPrice
  //     }
