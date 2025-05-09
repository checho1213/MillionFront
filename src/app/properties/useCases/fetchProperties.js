import propertyService from '../services/propertyService'

export const fetchProperties = async () => {
  return await propertyService.getAll()
}
