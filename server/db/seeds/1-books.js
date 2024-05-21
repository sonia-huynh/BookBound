export async function seed(knex) {
  // Deletes ALL existing entries
  //   await knex('books').del()

  // Inserts seed entries
  await knex('books').insert([
    {
      username: 'Sonia',
      book_id: 'abc',
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      image:
        'http://books.google.com/books/content?id=E-OLEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    {
      username: 'Sonia',
      book_id: 'abcd1234',
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Gabrielle Zevin',
      image:
        'http://books.google.com/books/content?id=pLpHEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    },
    {
      username: 'Sonia',
      book_id: '1234',
      title: 'Legend',
      image: '',
      author: 'Marie Lu',
    },
  ])
}
