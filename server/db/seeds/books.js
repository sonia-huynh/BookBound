export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('books').del()

  // Inserts seed entries
  await knex('books').insert([
    {
      id: 1,
      username: 'Sonia',
      book_id: NaN,
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      image:
        'http://books.google.com/books/content?id=E-OLEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      review: 'This book is a rollercoaster of twists.',
      rating: 5,
    },
    {
      id: 2,
      username: 'Sonia',
      book_id: NaN,
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Gabrielle Zevin',
      image:
        'http://books.google.com/books/content?id=pLpHEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      review:
        'In this exhilarating novel, two friends—often in love, but never lovers—come together as creative partners in the world of video game design, where success brings them fame, joy, tragedy, duplicity, and, ultimately, a kind of immortality.',
      rating: 2.5,
    },
    {
      id: 3,
      username: 'Sonia',
      book_id: NaN,
      title: 'Legend',
      image: '',
      author: 'Marie Lu',
      review: 'A dystopian well worth reading!',
      rating: 3,
    },
  ])
}
