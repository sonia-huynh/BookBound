export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('books').del()

  // Inserts seed entries
  await knex('books').insert([
    { id: 1, username: 'Sonia', title: 'Fourth Wing', author:'Rebecca Yarros', review:"This book is a rollercoaster of twists.", rating: 5},
    { id: 2, username: 'Sonia', title: 'Tomorrow, and Tomorrow, and Tomorrow', author:'Gabrielle Zevin', review:"In this exhilarating novel, two friends—often in love, but never lovers—come together as creative partners in the world of video game design, where success brings them fame, joy, tragedy, duplicity, and, ultimately, a kind of immortality.", rating: 2.5},
    { id: 3, username: 'Sonia', title: 'Legend', author:'Marie Lu', review:"A dystopian well worth reading!", rating: 3},
  ])
}
