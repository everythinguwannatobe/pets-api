import { Test, TestingModule } from '@nestjs/testing';
import { PetOwnersService } from './pet_owners.service';

describe('PetOwnersService', () => {
  let service: PetOwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetOwnersService],
    }).compile();

    service = module.get<PetOwnersService>(PetOwnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
