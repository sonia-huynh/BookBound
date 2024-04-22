import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { StatusCodes } from 'http-status-codes'
// import 'dotenv/config'

import * as db from '../db/books.ts'
// const apiKey = process.env.YOUR_API_KEY_NAME
const router = Router()

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

router.post('/:title', async (req, res) => {
  try {
    const title = req.params.title
    const review = req.body.review
    await db.addReview(title, review)

    res.status(200).json({ message: 'Review added' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/:title', async (req, res) => {
  try {
    const title = req.params.title
    const update = req.body
    await db.updateReview(title, update)

    res.status(200).json({ message: 'Review updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/:title', async (req, res) => {
  try {
    const title = req.params.title
    await db.deleteReview(title)

    res.status(200).json({ message: 'Review deleted' })
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
