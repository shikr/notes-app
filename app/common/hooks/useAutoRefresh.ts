import ms from 'ms'
import { useCallback, useEffect } from 'react'
import { useFetcher } from 'react-router'

export function useAutoRefresh() {
  const fetcher = useFetcher()
  const refresh = useCallback(() => {
    fetcher.submit(
      {},
      {
        method: 'post',
        action: '/refresh'
      }
    )
  }, [fetcher.submit])

  useEffect(() => {
    refresh()
    const id = setInterval(() => {
      refresh()
    }, ms('14m'))

    return () => clearInterval(id)
  }, [refresh])
}
