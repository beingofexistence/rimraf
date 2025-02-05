const t = require('tap')

const {
  rimrafWindows,
  rimrafWindowsSync,
} = require('../dist/cjs/src/rimraf-windows.js')

const {
  rimrafPosix,
  rimrafPosixSync,
} = require('../dist/cjs/src/rimraf-posix.js')

const {
  rimrafManual,
  rimrafManualSync,
} = require('../dist/cjs/src/rimraf-manual.js')

if (!process.env.__TESTING_RIMRAF_PLATFORM__) {
  const otherPlatform = process.platform !== 'win32' ? 'win32' : 'posix'
  t.spawn(process.execPath, [__filename], {
    env: {
      ...process.env,
      __TESTING_RIMRAF_PLATFORM__: otherPlatform,
    },
  })
}

const platform = process.env.__TESTING_RIMRAF_PLATFORM__ || process.platform

const [expectManual, expectManualSync] =
  platform === 'win32'
    ? [rimrafWindows, rimrafWindowsSync]
    : [rimrafPosix, rimrafPosixSync]
t.equal(rimrafManual, expectManual, 'got expected implementation')
t.equal(rimrafManualSync, expectManualSync, 'got expected implementation')
