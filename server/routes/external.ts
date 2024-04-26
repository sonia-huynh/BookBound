import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'
import express from 'express'
import request from 'superagent'

const router = express.Router()

export default router

//getting book based off search bar
router.get('/search', async (req, res) => {
  try {
    const search = req.query.q
    const bookResponse = await request
      .get(`https://www.googleapis.com/books/v1/volumes`)
      .query({
        q: search,
        langRestrict: 'en',
      })

    // example link - hardcoded stuff:
    // const bookResponse = await request.get(
    //   `https://www.googleapis.com/books/v1/volumes?q=six of crows&langRestrict=en`,
    // )

    const items = bookResponse.body.items
    const bookDetailsArray = [] // Array to store book details

    for (let i = 0; i < items.length; i++) {
      const bookItem = items[i]
      const volumeInfo = bookItem.volumeInfo
      const title = volumeInfo.title
      const author = volumeInfo.authors
      const description = volumeInfo.description
      const rating = volumeInfo.averageRating
      const image = volumeInfo.imageLinks?.thumbnail
      const bookDetails = { title, author, description, rating, image } // Object containing book details
      bookDetailsArray.push(bookDetails) // Push book details to array
    }

    res.json(bookDetailsArray)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
