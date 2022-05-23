interface Version {
  id: string
  name: string
  description: string
}

interface Service {
  idx: number
  id: string
  name: string
  description: string
  enabled: boolean
  versions: Version[]
}

export default Service
