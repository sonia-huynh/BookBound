import express from 'express'
import * as Path from 'node:path'

import bookDates from './routes/dates'
import bookRoutes from './routes/books'
import reviewsRoutes from './routes/reviews'
import ratingsRoutes from './routes/ratings'
import searchRoutes from './routes/external'
import recentActivityRoutes from './routes/recentActivity'

const server = express()

server.use(express.json())

server.use('/api/books', bookRoutes)
server.use('/api/dates', bookDates)
server.use('/api/reviews', reviewsRoutes)
server.use('/api/ratings', ratingsRoutes)
server.use('/api/external', searchRoutes)
server.use('/api/recentActivity', recentActivityRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
