export function employmentVerify(payload) {
  return fetch(`${process.env.REACT_APP_API_URL}/employment`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ ...payload })
  }).then((res) => res.json())
}

export function incomeVerify(payload) {
  return fetch(`${process.env.REACT_APP_API_URL}/income`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ ...payload })
  }).then((res) => res.json())
}