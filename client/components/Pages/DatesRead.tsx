import { useParams } from 'react-router-dom'
import { useState } from 'react'

interface Props {
  bookId: string
}

export function DatesRead({ bookId }: Props) {
  const { id } = useParams()
  const bookIdString = id as string

  //   if (isPending) {
  //     return <p>Loading your book rating details... {String(error)}</p>
  //   }

  //   if (isError) {
  //     return (
  //       <p>
  //         Sorry, the book rating details could not be retrieved! {String(error)}
  //       </p>
  //     )
  //   }

  return (
    <div className="flex ">
      <div>
        <p>Start date:</p>
        <input type="date" name="dateStart" className="dateInput"></input>
      </div>
      <div className="mx-5">
        <p>End date:</p>
        <input type="date" name="dateEnd" className="dateInput"></input>
      </div>
    </div>
  )
}
