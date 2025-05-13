const BASE_URL = 'https://localhost:7023/api/properties'

const getAll = async () => {
  const res = await fetch(BASE_URL)
  const data = await res.json()
  return data.data
}

const getFiltered = async (filters) => {
 
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}?${query}`);
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }  
  const data = await res.json();
  return data.data;  
};
export default { getAll, getFiltered }
