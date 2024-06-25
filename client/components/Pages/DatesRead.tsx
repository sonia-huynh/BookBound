import { useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  useUpdateBookEndDate,
  useUpdateBookStartDate,
} from '../../hooks/useMyBooks'

export function DatesRead() {
  const updateStartDate = useUpdateBookStartDate()
  const updateEndDate = useUpdateBookEndDate()
  const [readStartDate, setReadStartDate] = useState('')
  const [readEndDate, setReadEndDate] = useState('')
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

  function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setReadStartDate(e.target.value)
  }

  function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setReadEndDate(e.target.value)
  }

  //   function howManyDaysInMonth(month: number, year: number) {
  //     return new Date(year, month, 0).getDate()
  //   }

  //  function getMonths(){

  //  }

  function handleSave(bookStartDate: string, bookEndDate: string) {
    if (readStartDate != '') {
      updateStartDate.mutate({
        bookId: bookIdString,
        startDate: bookStartDate,
      })
    } else if (readEndDate != '') {
      updateEndDate.mutate({
        bookId: bookIdString,
        endDate: bookEndDate,
      })
    }
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
          onClick={() => handleSave(readStartDate, readEndDate)}
          className="ml-6"
        >
          Save
        </button>
      </div>
    </div>
  )
}
