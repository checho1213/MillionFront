const BASE_URL = 'https://localhost:7023/api/properties'

const getAll = async () => {
  const res = await fetch(BASE_URL)
  const data = await res.json()
  return data.data
}

export default { getAll }
