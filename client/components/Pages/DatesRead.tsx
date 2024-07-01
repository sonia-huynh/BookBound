import { useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  useUpdateBookEndDate,
  useUpdateBookStartDate,
} from '../../hooks/useMyBooks'

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
  const updateStartDate = useUpdateBookStartDate()
  const updateEndDate = useUpdateBookEndDate()
  const [readStartDate, setReadStartDate] = useState(startRead || '')
  const [readEndDate, setReadEndDate] = useState(endRead || '')
  const [popup, setPopup] = useState(false)
  const { id } = useParams()
  const bookIdString = id as string

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
    if (readStartDate) {
      updateStartDate.mutate({
        bookId: bookIdString,
        startDate: bookStartDate,
      })
    }

    if (readEndDate && readEndDate > readStartDate) {
      updateEndDate.mutate({
        bookId: bookIdString,
        endDate: bookEndDate,
      })
    } else {
      setPopup(true)
      setTimeout(() => setPopup(false), 5000)
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
        <button
          onClick={() => handleSave(readStartDate, readEndDate)}
          className="ml-6"
        >
          Save
        </button>
        {popup && (
          <p>
            Your end date cannot be before your read date! Please check again.
          </p>
        )}
      </div>
    </div>
  )
}
