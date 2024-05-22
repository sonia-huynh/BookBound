// import checkJwt, { JwtRequest } from '../auth0.ts'
// import { StatusCodes } from 'http-status-codes'
import express from 'express'
// import request from 'superagent'
// import 'dotenv/config'

import * as db from '../db/books.ts'
// const apiKey = process.env.YOUR_API_KEY_NAME
const router = express.Router()

// Add book to your library
router.post('/', async (req, res) => {
  try {
    const details = req.body
    console.log(details)
    await db.addBook(details)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Get books from library
router.get('/', async (req, res) => {
  try {
    const books = await db.getBooks()
    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Get book by id from library
router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id
    const books = await db.getBookById(bookId)
    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// add book review
router.post('/review/:id/', async (req, res) => {
  try {
    const bookId = String(req.params.id)
    const title = String(req.query.title)
    const bookReview = req.body.review
    const insertReview = await db.addReview(bookId, title, bookReview)

    if (insertReview) {
      res
        .status(201)
        .json({ message: 'Review added successfully', review: bookReview })
    } else {
      res.status(404).json({ message: 'Book not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong in trying to add your book review',
    })
  }
})

// this can get the book review by id
router.get('/review/:id', async (req, res) => {
  try {
    const bookId = String(req.params.id)
    const bookReview = await db.getReviewById(bookId)
    if (bookReview) {
      return res.json(bookReview.review)
    } else {
      res.status(404).json({ message: 'Book review not found' })
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong in locating your book review' })
  }
})

// update book review
router.patch('/review/:id', async (req, res) => {
  try {
    const bookId = String(req.params.id)
    const bookReview = req.body.review
    const result = await db.updateReview(bookId, bookReview)
    if (result) {
      res.json({ message: 'Review updated successfully', review: bookReview })
    } else {
      res.status(404).json({ message: 'Book not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong in trying to update your book review',
    })
  }
})

// delete a book review
router.delete('/review/:id', async (req, res) => {
  try {
    const bookId = String(req.params.id)
    await db.deleteReview(bookId)

    return res.status(200).json({ message: 'Book review removed' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
        'Something went wrong in trying to remove your book from your library',
    })
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
