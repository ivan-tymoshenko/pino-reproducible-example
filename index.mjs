import pino from 'pino'
import { execa } from 'execa'
import './lib/index.mjs'

console.log('Index process')

process.on('exit', () => {})

const loggers = []
for (let i = 0; i < 1000; i++) {
  const destination = pino.destination({
    dest: 1,
    sync: false
  })
  
  const logger = pino(destination)
  loggers.push(logger)
  logger.info(`Logger ${i}`)
}

for (let i = 0; i < 10; i++) {
  const child = execa('echo', [`Child process ${i}`])
  
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)

  await child
}
