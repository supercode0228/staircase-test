export function createEmpTransaction() {
  return fetch(`${process.env.REACT_APP_API_URL}/employment/transactions`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY
    }
  }).then((res) => res.json())
}

export function createIncomeTransaction() {
  return fetch(`${process.env.REACT_APP_API_URL}/income/transactions`, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY
    }
  }).then((res) => res.json())
}