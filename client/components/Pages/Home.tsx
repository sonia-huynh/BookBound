import { useSearchParams } from 'react-router-dom'
import { useGetSearchBook } from '../../hooks/useBooks'

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Home</h1>
        <p>This is where i will put my recent activity</p>
      </div>
    </>
  )
}
