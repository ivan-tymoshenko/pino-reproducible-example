import pino from 'pino'
import { execa } from 'execa'

console.log('Index process')

const destination = pino.destination({
  dest: 1,
  sync: false
})

const logger = pino(destination)

const child = execa('echo', ['Child process'])

child.stdout.pipe(process.stdout)
child.stderr.pipe(process.stderr)

await child