import express from 'express'
// import request from 'superagent'
// import 'dotenv/config'

import * as db from '../db/dbFunctions/reviews'
// const apiKey = process.env.YOUR_API_KEY_NAME
const router = express.Router()

// add book review
router.post('/:id', async (req, res) => {
  try {
    const bookId = String(req.params.id)
    const bookReview = req.body.review
    const insertReview = await db.addReview(bookId, bookReview)

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

// Get ALL reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await db.getAllReview()
    res.json(reviews)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Could not fetch your reviews' })
  }
})

// Get the book review by id
router.get('/:id', async (req, res) => {
  try {
    const bookId = String(req.params.id)
    const reviewExist = await db.checkReviewExists(bookId)

    if (reviewExist.review_exist === 1) {
      const bookReview = await db.getReviewById(bookId)
      if (bookReview) {
        return res.json(bookReview.review)
      } else {
        res.json([])
      }
    } else if (reviewExist.review_exist === 0) {
      console.log('book review does not exist')
      return res.json([])
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong in locating your book review' })
  }
})

// update book review
router.patch('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
export default router
