import { priceFormatter } from "./index";

const regex = /^\s*(?:[1-9]\d{0,2}(?:\.\d{3})*|0)(?:,\d{1,2})?$/;

test('Check price is formatted correctly', () => {
  let result = priceFormatter.format(10000000.10);

  expect(result).toContain("R$");
  expect(regex.test(result.replace("R$", ""))).toBe(true);
});