import request from 'superagent'
import { BookDetails } from '../../models/books'

// const databaseUrl = '/books/'
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
