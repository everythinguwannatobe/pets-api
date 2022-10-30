import { Test, TestingModule } from '@nestjs/testing';
import { PetProfileResolver } from './pet_profile.resolver';

describe('PetProfileResolver', () => {
  let resolver: PetProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetProfileResolver],
    }).compile();

    resolver = module.get<PetProfileResolver>(PetProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
