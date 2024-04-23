import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'
import express from 'express'
import request from 'superagent'
// import 'dotenv/config'

import * as db from '../db/books.ts'
// const apiKey = process.env.YOUR_API_KEY_NAME
const router = express.Router()

router.get('/:title', async (req, res) => {
  try {
    const title = req.params.title
    const book = await db.getBookByTitle(title)

    res.json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// this can add and update the book review since review already exists:
router.patch('/:title', async (req, res) => {
  try {
    const title = req.params.title
    const update = req.body
    await db.updateReview(title, update)

    return res.status(200).json({ message: 'Review updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// delete a book review
router.delete('/:title', async (req, res) => {
  try {
    const title = req.params.title
    await db.deleteReview(title)

    return res.status(200).json({ message: 'Review deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

//getting book based off search bar
router.get('/', async (req, res) => {
  try {
    const search = req.body.search
    const bookResponse = await request.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&langRestrict=en`,
    )

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
      const image = volumeInfo.imageLinks.thumbnail
      const bookDetails = { title, author, description, rating, image } // Object containing book details
      bookDetailsArray.push(bookDetails) // Push book details to array
      console.log(bookDetails)
    }
    res.json(bookDetailsArray)

    res.status(200).json({ message: 'Book Found' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// router.post('/', checkJwt, async (req: JwtRequest, res, next) => {
//   if (!req.auth?.sub) {
//     res.sendStatus(StatusCodes.UNAUTHORIZED)
//     return
//   }

//   try {
//     const { owner, name } = req.body
//     const id = await db.addFruit({ owner, name })
//     res
//       .setHeader('Location', `${req.baseUrl}/${id}`)
//       .sendStatus(StatusCodes.CREATED)
//   } catch (err) {
//     next(err)
//   }
// })

export default router
