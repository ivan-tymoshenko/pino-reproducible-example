import test from 'node:test'
import { execa } from 'execa'
import { join } from 'desm'

test('test', async (t) => {
  console.log('Main test process')

  const childPath = join(import.meta.url, 'index.mjs')
  const childProcess = execa('node', [childPath])
  
  childProcess.stdout.pipe(process.stdout)
  childProcess.stderr.pipe(process.stderr)
  
  await childProcess
})
