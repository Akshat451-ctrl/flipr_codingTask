import PropTypes from 'prop-types'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { apiClient } from '../hooks/apiClient.js'

const AuthContext = createContext(null)

function getStoredToken() {
  try {
    return localStorage.getItem('authToken') || ''
  } catch {
    return ''
  }
}

function setStoredToken(token) {
  try {
    if (!token) {
      localStorage.removeItem('authToken')
      return
    }
    localStorage.setItem('authToken', token)
  } catch {
    // ignore storage errors
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken)
  const [user, setUser] = useState(null)
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(token))

  const refreshMe = useCallback(async (activeToken = token) => {
    if (!activeToken) {
      setUser(null)
      return null
    }

    const response = await apiClient.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${activeToken}`,
      },
      timeout: 8000,
    })

    setUser(response.data?.data || null)
    return response.data?.data || null
  }, [token])

  useEffect(() => {
    let isMounted = true

    async function bootstrap() {
      if (!token) {
        setIsBootstrapping(false)
        return
      }

      try {
        await refreshMe(token)
      } catch {
        if (isMounted) {
          setStoredToken('')
          setToken('')
          setUser(null)
        }
      } finally {
        if (isMounted) setIsBootstrapping(false)
      }
    }

    bootstrap()

    return () => {
      isMounted = false
    }
  }, [token, refreshMe])

  const login = useCallback(async ({ email, password }) => {
    const response = await apiClient.post('/api/auth/login', { email, password })
    const nextToken = response.data?.data?.token || ''
    const nextUser = response.data?.data?.user || null

    setStoredToken(nextToken)
    setToken(nextToken)
    setUser(nextUser)

    return { token: nextToken, user: nextUser }
  }, [])

  const signup = useCallback(async ({ fullName, email, password }) => {
    const response = await apiClient.post('/api/auth/signup', { fullName, email, password })
    const nextToken = response.data?.data?.token || ''
    const nextUser = response.data?.data?.user || null

    setStoredToken(nextToken)
    setToken(nextToken)
    setUser(nextUser)

    return { token: nextToken, user: nextUser }
  }, [])

  const logout = useCallback(async () => {
    try {
      if (token) {
        await apiClient.post(
          '/api/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
      }
    } catch {
      // ignore
    } finally {
      setStoredToken('')
      setToken('')
      setUser(null)
    }
  }, [token])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      isBootstrapping,
      login,
      signup,
      logout,
      refreshMe,
    }),
    [token, user, isBootstrapping, login, signup, logout, refreshMe],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return value
}
