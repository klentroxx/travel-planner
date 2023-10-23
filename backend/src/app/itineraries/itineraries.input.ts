export interface CreateItineraryInput {
  destination: string
  startDate: Date
  endDate: Date
  activities: Array<CreateItineraryActivityInput>
}

export interface UpdateItineraryInput {
  destination?: string
  startDate?: Date
  endDate?: Date
  activities?: Array<UpdateItineraryActivityInput>
}

export interface CreateItineraryActivityInput {
  name: string
  startTime: Date
  endTime: Date | null
}

export interface UpdateItineraryActivityInput {
  id: number
  name?: string
  startTime?: Date
  endTime?: Date | null
}
