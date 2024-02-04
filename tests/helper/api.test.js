import { api, getEnvironments } from "../../src/helper";

describe('api', () => {

  it('should be defined', () => {
    expect(api).toBeDefined();
  });

  it('should have a baseURL matching the environment variable', () => {
    const { VITE_REMINDER_SERVER_URL } = getEnvironments();
    expect(api.defaults.baseURL).toBe(VITE_REMINDER_SERVER_URL);
  });
});
