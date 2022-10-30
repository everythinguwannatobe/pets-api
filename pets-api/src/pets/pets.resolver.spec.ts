import { Test, TestingModule } from '@nestjs/testing';
import { PetsResolver } from './pets.resolver';

describe('PetsResolver', () => {
  let resolver: PetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsResolver],
    }).compile();

    resolver = module.get<PetsResolver>(PetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
