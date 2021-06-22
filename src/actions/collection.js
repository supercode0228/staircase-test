export function createEmpCollection(transactionId, payload) {
  return fetch(`${process.env.REACT_APP_API_TEST_URL}/employment/transactions/${transactionId}/collections`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ ...payload })
  }).then((res) => res.json())
}

export function createIncomeCollection(transactionId, payload) {
  return fetch(`${process.env.REACT_APP_API_URL}/income/transactions/${transactionId}/collections`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ ...payload })
  }).then((res) => res.json())
}