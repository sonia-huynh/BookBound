import { useParams } from 'react-router-dom'
import { useState } from 'react'

interface Props {
  bookId: string
}

export function DatesRead({ bookId }: Props) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
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

  function handleStartDateChange(e) {
    e.preventDefault()
    setStartDate(e.target.value)
  }

  function handleEndDateChange(e) {
    e.preventDefault()
    setEndDate(e.target.value)
  }

  return (
    <div className="flex ">
      <div>
        <p>Start date:</p>
        <input
          type="date"
          name="dateStart"
          id="dateStart"
          className="dateInput"
          onChange={handleStartDateChange}
        ></input>
      </div>
      <div className="mx-5">
        <p>End date:</p>
        <input
          type="date"
          name="dateEnd"
          id="dateEnd"
          className="dateInput"
          onChange={handleEndDateChange}
        ></input>
        <button
          onClick={() => console.log({ startDate }, { endDate })}
          className="mx-5"
        >
          Save
        </button>
      </div>
    </div>
  )
}
