import request from 'superagent'
import { BookDetails } from '../../models/books'

const databaseUrl = '/books'
const externalApiUrl = '/external'

// export async function getSearchBook(): Promise<BookDetails> {
//   return await request.get(rootUrl).then((res) => {
//     return res.body
//   })
// }

export async function getSearchBook(search: string): Promise<BookDetails[]> {
  try {
    const res = await request.get(externalApiUrl + `/${search}`)
    return res.body // Assuming the response contains an array of BookDetails
  } catch (error) {
    console.error('Error fetching search results:', error)
    throw new Error('Failed to fetch search results')
  }
}
