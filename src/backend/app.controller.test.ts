import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  describe('routes', () => {
    it('should return list of routes', async () => {
      const result = '';
      jest.spyOn(appService, 'routes').mockImplementation(() => result);

      expect(await appController.routes()).toBe(result);
    });
  });
  describe('public route', () => {
    it('should return a public route', async () => {
      const result = '';
      jest.spyOn(appService, 'publicRoute').mockImplementation(() => result);

      expect(await appController.publicRoute()).toBe(result);
    });
  });
  describe('private route', () => {
    it('should return a private route', async () => {
      const result = '';
      jest.spyOn(appService, 'privateRoute').mockImplementation(() => result);

      expect(await appController.privateRoute()).toBe(result);
    });
  });
});
