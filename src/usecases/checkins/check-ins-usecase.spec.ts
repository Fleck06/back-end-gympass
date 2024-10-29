import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest'
import { CheckInUseCase } from './check-in-usecase'

let checkInsRepository:InMemoryCheckInsRepository
let sut: CheckInUseCase
describe('Check in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })
  afterEach(() =>{
    vi.useRealTimers()
  })
  it('Should be able to check in', async ()=>{
    vi.setSystemTime(new Date(2024,9,24,22,22,0))
    const {checkIn} = await sut.execute({
      userId: 'usuario-0001',
      gymId: 'abl-0001'
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  // Teste 02 - TDD (Test Driven Development)
  // Red, Green, Refector
it('It should not be able to check in twice in same day',
    async()=>{
      vi.setSystemTime(new Date(2024,9,20,16,0,0))
      const {checkIn} = await sut.execute({
        userId: '00001',
        gymId: '171'
      })
      await expect(()=> sut.execute({
        userId: '00001',
        gymId: '171'
      })).rejects.toBeInstanceOf(Error)
    }
  )

  // teste 3

it('It should be able to check in twice in different days',
  async()=>{
    vi.setSystemTime(new Date(2024,9,20,16,0,0))
    await sut.execute({
      userId: '00001',
      gymId: '171'
    })
    vi.setSystemTime(new Date(2024,9,20,16,0,0))
    const {checkIn} = await sut.execute({
      userId: '00001',
      gymId: '171'
    })
    expect(checkIn.id).toEqual(expect.any(String))
  }
)
})
