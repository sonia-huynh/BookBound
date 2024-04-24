import request from 'superagent'
import { BookDetails } from '../../models/books'

const rootUrl = '/books'

// export async function getSearchBook(): Promise<BookDetails> {
//   return await request.get(rootUrl).then((res) => {
//     return res.body
//   })
// }

export async function getSearchBook(search: string) {
  const res = await request.get(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&langRestrict=en`,
  )

  return res.body
}
