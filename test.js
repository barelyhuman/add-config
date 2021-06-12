const test = require('ava')
const execa = require('execa')

test('Create Configs', async (t) => {
  let execResponse
  execResponse = await execa('./dist/cli.js', ['-p', 'temp/react/'])
  t.is(execResponse.stdout, 'Created Config!')
  execResponse = await execa('./dist/cli.js', [
    '-p',
    'temp/node/',
    '-t',
    'node'
  ])
  t.is(execResponse.stdout, 'Created Config!')
  execResponse = await execa('./dist/cli.js', [
    '-p',
    'temp/react-native/',
    '-t',
    'react-native'
  ])
  t.is(execResponse.stdout, 'Created Config!')
})

test('Fail on invalid type', async (t) => {
  try {
    await execa('./dist/cli.js', ['-p', 'temp', '-t', 'sad'])
    t.fail()
  } catch (error) {
    t.pass()
  }
})

test('Fail creation', async (t) => {
  try {
    await execa('./dist/cli.js', ['-a', 'temp'])
    t.fail()
  } catch {
    t.pass()
  }
})
