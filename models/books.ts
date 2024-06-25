export interface Books {
  id: number
  username: string
  title: string
  author: string
  image: string
  description?: string
  book_id: string
  start_date?: string | null
  end_date?: string | null
  review: boolean
  rating: boolean
  recent_activity: string
}

export interface Reviews {
  review: string
  recent_activity: string
}

export interface Ratings {
  Rating: number
  recent_activity: string
}

export interface BookDetails {
  title: string
  author: string[]
  description?: string
  rating?: number
  image: string
  bookId: string
}

// export interface Books {
//   kind: string
//   totalItems: number
//   items: Item[]
// }

export interface Item {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
  searchInfo: SearchInfo
}

export interface AccessInfo {
  country: string
  viewability: string
  embeddable: boolean
  publicDomain: boolean
  textToSpeechPermission: string
  epub: Epub
  pdf: Epub
  webReaderLink: string
  accessViewStatus: string
  quoteSharingAllowed: boolean
}

export interface Epub {
  isAvailable: boolean
}

export interface SaleInfo {
  country: string
  saleability: string
  isEbook: boolean
}

export interface SearchInfo {
  textSnippet: string
}

export interface VolumeInfo {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  industryIdentifiers: IndustryIdentifier[]
  readingModes: ReadingModes
  pageCount: number
  printType: string
  categories: string[]
  averageRating: number
  ratingsCount: number
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: PanelizationSummary
  imageLinks: ImageLinks
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
}

export interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}

export interface IndustryIdentifier {
  type: string
  identifier: string
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean
  containsImageBubbles: boolean
}

export interface ReadingModes {
  text: boolean
  image: boolean
}
