import express from 'express'

import * as db from '../db/dbFunctions/recentActivity'
const router = express.Router()

export default router

//Get All Recent Activity
router.get('/', async (req, res) => {
  try {
    const recentActivity = await db.getRecentActivity()
    console.log(recentActivity)
    return res.json(recentActivity)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong fetching recent activity' })
  }
})
