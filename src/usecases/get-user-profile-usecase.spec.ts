import { UsersInMemoryRepository } from "@/repositories/users-in-memory-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GetUserProfileUseCase } from "./users/get-user-profile";
import { hash } from "bcryptjs";
let usersRepository:UsersInMemoryRepository
let sut:GetUserProfileUseCase
describe('Get user profile use case', ()=>{
  beforeEach(()=>{
    usersRepository = new UsersInMemoryRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  //1 º Teste
  it('It should be able to get user profile by id', async()=>{
      const newUser = await usersRepository.create({
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
        password_hash: await hash('123456',6)
      })

      const { user } = await sut.execute({
        userId: newUser.id
      })

      expect(user.id).toEqual(expect.any(String))
  })
})
