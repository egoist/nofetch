import url from 'url'
import qs from 'querystring'
import http from 'follow-redirects/http'
import https from 'follow-redirects/https'
import timeout from 'timed-out'
import pkg from '../package.json' // eslint-disable-line import/extensions

export default function (_url, opts = {}) {
  const reqHeaders = {Accept: '*/*', 'User-Agent': `${pkg.name}/${pkg.version} (https://github.com/egoist/nofetch)`}
  let body = opts.body

  if (body) {
    if (isStream(body) && typeof body.getBoundary === 'function') {
      // for https://github.com/form-data/form-data
      reqHeaders['Content-Type'] = `multipart/form-data; boundary=${body.getBoundary()}`
    } else if (!isStream(body)) {
      reqHeaders['Content-Type'] = 'application/x-www-form-urlencoded'
      body = typeof body === 'object' ? qs.stringify(body) : body
    }
    reqHeaders['Content-Length'] = typeof body === 'string' ? Buffer.byteLength(body) : body.length
  }

  Object.assign(reqHeaders, opts.headers)
  const requestOpts = Object.assign(url.parse(_url), {
    method: opts.method ? opts.method.toUpperCase() : 'GET',
    headers: reqHeaders,
    agent: opts.agent
  })

  return new Promise((resolve, reject) => {
    const fn = requestOpts.protocol === 'https:' ? https : http
    const req = fn.request(requestOpts, res => {
      const body = []
      res.on('data', chunk => body.push(chunk))
      res.on('end', () => resolve(response()))

      function response() {
        const toString = body => Buffer.concat(body).toString()
        const headers = res.headers
        const keys = []
        const entries = []
        const values = []

        for (const key in headers) {
          keys.push(key)
          values.push(headers[key])
          entries.push([key, headers[key]])
        }

        return {
          ok: res.statusCode >= 200 && res.statusCode < 400,
          status: res.statusCode,
          statusText: res.statusMessage,
          url: url.format(res.url),
          text: () => Promise.resolve(toString(body)),
          json: () => Promise.resolve(toString(body)).then(JSON.parse),
          headers: {
            keys: () => keys,
            values: () => values,
            entries: () => entries,
            get: n => headers[n.toLowerCase()],
            has: n => n.toLowerCase() in headers
          }
        }
      }
    })

    req.on('error', reject)

    if (opts.timeout) {
      timeout(req, opts.timeout)
    }

    if (body) {
      req.write(body)
    }

    req.end()
  })
}

function isStream(body) {
  return typeof body === 'object' && body.pipe
}
