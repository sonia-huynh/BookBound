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
    return res.status(200).json(details)
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
