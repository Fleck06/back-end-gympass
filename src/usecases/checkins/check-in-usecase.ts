import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import {CheckIn} from '@prisma/client'

export interface CheckInUseCaseRequest{
  userId: string
  gymId: string
}

export interface CheckInUseCaseResponse{
  checkIn: CheckIn
}

export class CheckInUseCase{
  constructor(private checkInsRepository: CheckInsRepository){}
  async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
  if(checkInOnSameDay){
    throw new Error()
  }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    })
    return {checkIn}
  }
}
