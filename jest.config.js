const path = require('path');

// stop ignore node_modules transform since d3 (recharts), query-string and
// others start to put es6 as main of packages
// Added below fix as per https://github.com/recharts/recharts/blob/master/CHANGELOG.md#2112-jun-27-2022
const es6Modules = [
  'd3',
  'd3-array',
  'internmap',
  'delaunator',
  'robust-predicates',
  'query-string',
  'split-on-first',
  'decode-uri-component',
  'filter-obj',
  'msw',
  'axios'
];

module.exports = {
  coverageReporters: [
    'text',
    'cobertura',
  ],
  coverageDirectory: 'coverage/unit/',
  setupFiles: ['./jest.polyfills.js'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [`/node_modules/(?!${es6Modules.join('|')})`],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleDirectories: [
    path.resolve('./'),
    'node_modules',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    'stores/__tests__/store.js',
  ],
  globals: {
    TESTING: true,
  },
};
