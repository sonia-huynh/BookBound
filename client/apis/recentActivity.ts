import request from 'superagent'
import { Activity } from '../../models/books'

const recentActivity = '/api/recentActivity/'

// Calls for get all Books
export async function getRecentActivityHome() {
  try {
    const res = await request.get(recentActivity)
    console.log(res.body)
    return res.body as Activity[]
  } catch (error) {
    console.error('Could not get recent activity from database')
    throw new Error('Failed to get recent activity from database')
  }
}
