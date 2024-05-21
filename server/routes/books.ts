// import checkJwt, { JwtRequest } from '../auth0.ts'
// import { StatusCodes } from 'http-status-codes'
import express from 'express'
// import request from 'superagent'
// import 'dotenv/config'

import * as db from '../db/books.ts'
import { BookDetails } from '../../models/books.ts'
// const apiKey = process.env.YOUR_API_KEY_NAME
const router = express.Router()

// Add book to your library
router.post('/', async (req, res) => {
  try {
    const details = req.body
    await db.addBook(details)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// Get book from library
router.get('/', async (req, res) => {
  try {
    const books = await db.getBooks()
    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// this can add and update the book review since review already exists:
router.patch('/:id', async (req, res) => {
  try {
    const bookId = String(req.query.id)
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

// this can get the book review by id
router.get('/:id', async (req, res) => {
  try {
    const bookId = String(req.query.id)
    const bookReview = await db.getReviewById(bookId)

    if (bookReview) {
      res.json(bookReview)
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

// delete a book review
router.delete('/:id', async (req, res) => {
  try {
    const bookId = req.params.id
    // const bookId = req.query.id
    await db.deleteBookById(bookId)

    return res.status(200).json({ message: 'Book Removed' })
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
