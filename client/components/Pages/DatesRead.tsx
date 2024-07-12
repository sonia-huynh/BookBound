import { useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  useAddBookReadDates,
  useDeleteBookDates,
  useUpdateBookDates,
} from '../../hooks/dates'

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
  const deleteDates = useDeleteBookDates()
  const updateDates = useUpdateBookDates()
  const [readStartDate, setReadStartDate] = useState(startRead || '')
  const [readEndDate, setReadEndDate] = useState(endRead || '')
  const [updatePopup, setUpdatePopup] = useState(false)

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

    setUpdatePopup(true)
    setTimeout(() => setUpdatePopup(false), 3000)
  }

  function handleDelete() {
    deleteDates.mutate(bookIdString)
    setReadStartDate('')
    setReadEndDate('')
  }

  return (
    <div className="dates-read-container flex">
      <div>
        <p>Start date:</p>
        <input
          aria-label="reading start date picker"
          type="date"
          name="dateStart"
          id="dateStart"
          className="dateInput"
          value={readStartDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="end-date mx-5">
        <p>End date:</p>
        <input
          aria-label="reading end date picker"
          type="date"
          name="dateEnd"
          id="dateEnd"
          className="dateInput"
          value={readEndDate}
          onChange={handleEndDateChange}
        ></input>
      </div>
      {!startRead && !endRead && (
        <button
          onClick={() => handleSave(readStartDate, readEndDate)}
          className="ml-6	 hover:font-bold hover:text-lime-600"
        >
          Save
        </button>
      )}

      <div className="date-read-buttons">
        {startRead && (
          <>
            <button
              onClick={() => handleUpdate(readStartDate, readEndDate)}
              className="ml-6	 hover:font-bold hover:text-lime-600"
            >
              update
            </button>

            <button
              onClick={() => handleDelete()}
              className="ml-6	 hover:font-bold hover:text-red-700"
            >
              delete
            </button>
          </>
        )}
      </div>
      {updatePopup && (
        <p className="text-green-700">Read dates have been updated</p>
      )}
    </div>
  )
}
