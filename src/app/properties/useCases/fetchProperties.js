import propertyService from '../services/propertyService'

export const fetchProperties = async () => {
  return await propertyService.getAll()
}

export const fetchPropertiesByFilters = async (filters) => {
  console.log(filters);  
  return await propertyService.getFiltered(filters)
}
