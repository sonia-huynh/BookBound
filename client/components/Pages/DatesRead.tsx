import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useAddBookReadDates, useUpdateBookDates } from '../../hooks/dates'

interface Props {
  startRead: string | null
  endRead: string | null
}

interface Interaction {
  text: string
  width: number
  height: number
}

export function DatesRead({ startRead, endRead }: Props) {
  const { id } = useParams()
  const bookIdString = id as string
  const addDates = useAddBookReadDates()
  const updateDates = useUpdateBookDates()
  const [readStartDate, setReadStartDate] = useState(startRead || '')
  const [readEndDate, setReadEndDate] = useState(endRead || '')
  const [popup, setPopup] = useState(false)

  function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setReadStartDate(e.target.value)
  }

  // console.log(readStartDate)
  function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setReadEndDate(e.target.value)
  }

  function handleSave(
    bookStartDate: string | null,
    bookEndDate: string | null,
  ) {
    addDates.mutate({
      bookId: bookIdString,
      startDate: bookStartDate,
      endDate: bookEndDate,
    })
  }

  function handleUpdate(
    bookStartDate: string | null,
    bookEndDate: string | null,
  ) {
    updateDates.mutate({
      bookId: bookIdString,
      startDate: bookStartDate,
      endDate: bookEndDate,
    })
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
          value={readStartDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="mx-5">
        <p>End date:</p>
        <input
          type="date"
          name="dateEnd"
          id="dateEnd"
          className="dateInput"
          value={readEndDate}
          onChange={handleEndDateChange}
        ></input>

        {!startRead && !endRead && (
          <button
            onClick={() => handleSave(readStartDate, readEndDate)}
            className="ml-6	 hover:font-bold hover:text-lime-600"
          >
            Save
          </button>
        )}

        {startRead && (
          <button
            onClick={() => handleUpdate(readStartDate, readEndDate)}
            className="ml-6	 hover:font-bold hover:text-lime-600"
          >
            update
          </button>
        )}
      </div>
    </div>
  )
}
