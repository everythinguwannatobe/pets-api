import { Test, TestingModule } from '@nestjs/testing';
import { PetOwnersResolver } from './pet_owners.resolver';

describe('PetOwnersResolver', () => {
  let resolver: PetOwnersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetOwnersResolver],
    }).compile();

    resolver = module.get<PetOwnersResolver>(PetOwnersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
