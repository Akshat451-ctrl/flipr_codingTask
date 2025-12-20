import { useCallback, useEffect, useMemo, useState } from 'react'

export default function useAsync(asyncFn, options = {}) {
  const { immediate = true } = options

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const run = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await asyncFn()
      setData(result)
      return result
    } catch (caughtError) {
      setError(caughtError)
      throw caughtError
    } finally {
      setIsLoading(false)
    }
  }, [asyncFn])

  useEffect(() => {
    if (!immediate) return
    run()
  }, [immediate, run])

  return useMemo(
    () => ({
      data,
      isLoading,
      error,
      run,
      setData,
    }),
    [data, isLoading, error, run],
  )
}
