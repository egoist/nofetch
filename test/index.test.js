import qs from 'querystring'
import nofetch from '../src'

test('get', async () => {
  const res = await nofetch('http://jsonplaceholder.typicode.com/posts')
  expect(res.status).toBe(200)
  expect(res.headers.has('content-type')).toBe(true)
})

test('post', async () => {
  const res = await nofetch('http://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: qs.stringify({title: 'foo', body: 'bar', userId: 10})
  })
  expect(res.ok).toBe(true)
  expect(res.statusText).toBe('Created')
  const body = await res.json()
  expect(body.body).toBe('bar')
})

test('follow redirects', async () => {
  const json = await nofetch('https://git.io/vyTCD').then(res => res.json())
  expect(json).toEqual({foo: 'foo'})
})
