/**
 * Create data for Bar Chart
 */
const x = [
  'giraffes',
  'orangutans',
  'monkeys',
];
const y = [
  20,
  14,
  23,
];
const x2 = [
  'lions',
  'tigers',
  'wolfes',
];
const y2 = [
  6,
  3,
  10,
];
const barTrace1 = new BarTrace(x, y, 'red', 'Trace 1');
const barTrace2 = new BarTrace(x2, y2, 'blue', 'Trace 2');

/**
 * Create layout for Bar Chart
 */
const layout = {
  title: 'Test Bar Chart 2',
};
/**
 * Create a bar object as default value and return it in the response body
 * @type {Bar}
 */
const bar = new Bar([barTrace1.getTraceData(), barTrace2.getTraceData()], layout);
