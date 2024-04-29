import request from 'superagent'
import { BookDetails } from '../../models/books'

const databaseUrl = '/api/books/'
const externalApiUrl = '/api/external/search'

export async function getSearchBook(search: string): Promise<BookDetails[]> {
  if (search.length < 3) {
    return []
  }

  try {
    const res = await request.get(externalApiUrl).query({ q: search })
    console.log(res.body as BookDetails[])
    return res.body as BookDetails[]
  } catch (error) {
    console.error('Error fetching search results')
    throw new Error('Failed to fetch search results')
  }
}

export async function addBookToShelf(details: {
  title: string
  author: string
}) {
  try {
    await request.post(databaseUrl).send(details)
  } catch (error) {
    console.error('Error posting book')
    throw new Error('Failed to add book to shelf')
  }
}
