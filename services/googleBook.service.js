import { utilService } from "../services/util.service.js"

export const googleBookService = {
  debounce,
  searchBooks
}


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
      const books = res.data.items.slice(0, 5).map(book => {
        return {
          id: '',
          keyId: utilService.makeId(),
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          publishedDate: book.volumeInfo.publishedDate,
          description: book.volumeInfo.description,
          pageCount: book.volumeInfo.pageCount,
          categories: book.volumeInfo.categories,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          language: book.volumeInfo.language,
          listPrice: book.saleInfo.saleability,
          price: book.saleInfo.saleability
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


// getRandomIntInclusive(min, max)