import {API_URL} from "./config";
import {cookieManager} from "../internal/utils/cookie_manager";
import {appAuthStatusState, appTokenState, AuthStatus, refreshTokenState} from "../internal/effector/app/store";

const getHeaders = (isAuth, token) => {
  const initHeaders = {
    "Content-Type": "application/json",
    "Accept": "*/*",
  }

  if (isAuth) {
    initHeaders['Authorization'] = `Bearer ${token}`
  }

  return new Headers(initHeaders)
}

const refreshSession = async () => {
  const refreshToken = cookieManager.get('refresh')

  const refreshPromiseOptions = {
    method: "POST",
    headers: new Headers({
      "Accept": "*/*",
      "Content-Type": 'text/plain',
    }),
    body: refreshToken ?? ''
  }

  try {
    const response = await fetch(API_URL + 'api/authenticate', refreshPromiseOptions)

    if (!response.ok) {
      throw new Error('Ошибка при обновлении сессии')
    }

    const newTokens = await response.json()

    cookieManager.set('bearer', newTokens.idToken)
    cookieManager.set('refresh', newTokens.refreshToken)

    return true;
  } catch (err) {
    console.error('Ошибка при обновлении сессии:', err)
    return false
  }
}

export const request = (params) => {
  const controller = new AbortController()
  const isAuth = params.isAuth ?? true
  const url = API_URL + params.url
  const token = params.token ?? cookieManager.get('bearer')

  const promiseOptions = {
    signal: controller.signal,
    method: params.method,
    headers: getHeaders(isAuth, token),
  }

  if (params.data) {
    promiseOptions.body = JSON.stringify(params.data)
  }

  const promise = fetch(url, promiseOptions)
    .then(async result => {
      const headers = result.headers
      const contentType = result.headers.get('Content-Type') ?? []
      let res

      if (result.status === 401) {
        const isRefreshed = await refreshSession()

        if (isRefreshed) {
          try {
            const rePromiseOptions = {
              method: params.method,
              headers: getHeaders(isAuth, cookieManager.get('bearer'))
            }
            if (params.data) {
              rePromiseOptions.body = JSON.stringify(params.data)
            }

            const reResponse = await fetch(url, rePromiseOptions)

            if (reResponse?.ok) {
              if (contentType && contentType.includes('application/json')) {
                res = await result.json()
              } else {
                res = result
              }
              const headers = reResponse.headers

              return {
                res,
                headers
              }
            } else {
              const error = new Error('Request failed');

              if (contentType &&
                (contentType.includes('application/json') || contentType.includes('application/problem+json'))) {
                error.response = await result.json()
              } else {
                error.response = result
              }

              throw error
            }
          } catch (err) {
            throw err
          }
        } else {
          cookieManager.removeAll()
          appAuthStatusState.setState(AuthStatus.notAuth)
          appTokenState.setState(null)
          refreshTokenState.setState(null)
          const unAuthError = new Error('UnAuth')

          if (contentType &&
            (contentType.includes('application/json') || contentType.includes('application/problem+json'))) {
            unAuthError.response = await result.json()
          } else {
            unAuthError.response = result
          }

          throw unAuthError
        }
      }

      if (result?.ok) {
        if (contentType && contentType.includes('application/json')) {
          res = await result.json()
        } else {
          res = result
        }

        return {
          res,
          headers
        }
      } else {
        const error = new Error('Request failed');

        if (contentType &&
          (contentType.includes('application/json') || contentType.includes('application/problem+json'))) {
          error.response = await result.json()
        } else {
          error.response = result
        }

        throw error
      }
    })
    .catch((err) => {
      throw err
    })

  return ({
    promise,
    controller,
    promiseOptions,
  })
}
