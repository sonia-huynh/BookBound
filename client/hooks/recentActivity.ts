import { useQuery } from '@tanstack/react-query'
import { getRecentActivityHome } from '../apis/recentActivity'
import { Activity } from '../../models/books'

// Get ALL Books
export function useGetRecentActivityHome() {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: async () => {
      const activity = await getRecentActivityHome()
      return activity as Activity[]
    },
  })
}
