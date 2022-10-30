import { Test, TestingModule } from '@nestjs/testing';
import { PetProfileService } from './pet_profile.service';

describe('PetProfileService', () => {
  let service: PetProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetProfileService],
    }).compile();

    service = module.get<PetProfileService>(PetProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
