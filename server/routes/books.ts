// import checkJwt, { JwtRequest } from '../auth0.ts'
// import { StatusCodes } from 'http-status-codes'
import express from 'express'
// import request from 'superagent'
// import 'dotenv/config'

import * as db from '../db/books.ts'
// const apiKey = process.env.YOUR_API_KEY_NAME
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const details = req.body
    await db.addBook(details)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/', async (req, res) => {
  try {
    const books = await db.getBooks()
    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

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
