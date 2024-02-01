import { areYouSureAlert, errorAlert, successAlert } from "../../src/helper";

describe('modals', () => {

  test('areYouSureAlert should be defined', () => {
    expect(areYouSureAlert).toBeDefined();
  });

  test('successAlert should be defined', () => {
    expect(successAlert).toBeDefined();
  });

  test('errorAlert should be defined', () => {
    expect(errorAlert).toBeDefined();
  });
});
