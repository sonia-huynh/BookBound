import express from 'express'

import * as db from '../db/dbFunctions/dates'
import { BookDates } from '../../models/books'
const router = express.Router()

// Add book to your library
router.post('/:id', async (req, res) => {
  try {
    const start = req.body.startDate
    const end = req.body.endDate
    const id = req.params.id

    console.log(start, end, id)
    const addedBookDates = await db.addReadDates(id, start, end)
    return res.status(200).json(addedBookDates)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
        'Something went wrong trying to add your reading dates to the database',
    })
  }
})

// Get book by id from library
router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id
    const bookDates = (await db.getReadDates(bookId)) as BookDates[]

    const dates = bookDates[0]
    return res.json(dates)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
        'Something went wrong trying to get your book dates from the database',
    })
  }
})

// Get book by id from library
router.patch('/:id', async (req, res) => {
  try {
    const start = req.body.startDate
    const end = req.body.endDate
    const bookId = req.params.id
    const updatedBookDates = await db.updateReadDates(bookId, start, end)
    return res.json(updatedBookDates)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
        'Something went wrong trying to get your book dates from the database',
    })
  }
})

// Delete book by id from library
router.delete('/:id', async (req, res) => {
  try {
    const bookId = req.params.id
    await db.deleteReadDates(bookId)
    return res.status(204).json({ message: 'book dates have been deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
        'Something went wrong trying to delete your book dates in the database',
    })
  }
})

export default router
