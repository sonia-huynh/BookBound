import express from 'express'
import * as db from '../db/ratings.ts'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const bookId = String(req.params.id)
    const rating = await db.getRatingById(bookId)

    if (rating) {
      return res.status(201).json(rating)
    } else {
      res.status(404).json({ message: 'Book Rating not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong in trying to get your book Rating',
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const bookId = String(req.params.id)
    const title = String(req.query.title)
    const rating = req.body.rating

    const ratingExist = await db.getRatingById(bookId)

    if (ratingExist) {
      const updateRating = await db.updateRating(bookId, rating)
      return res.status(201).json(updateRating)
    } else {
      const newRating = await db.addRating(bookId, title, rating)
      return res.status(201).json(newRating)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong in trying to add your book Rating',
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const bookId = String(req.params.id)
    await db.deleteRating(bookId)
    return res.status(201).json({ message: 'Book rating removed' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something went wrong in trying to add your book Rating',
    })
  }
})
export default router
