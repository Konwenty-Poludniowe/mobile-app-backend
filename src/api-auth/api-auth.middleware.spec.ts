import { ApiAuthMiddleware } from './api-auth.middleware';

describe('ApiAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new ApiAuthMiddleware()).toBeDefined();
  });
});
