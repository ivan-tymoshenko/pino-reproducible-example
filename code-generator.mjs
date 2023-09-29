import { join } from 'desm'
import { writeFile } from 'fs/promises'

async function generateJSFile (fileName, linesNumber) {
  const lines = []
  for (let i = 0; i < linesNumber; i++) {
    lines.push(`export function foo${i} () { return ${i} }`)
  }
  const fileContent = lines.join('\n')
  await writeFile(join(import.meta.url, 'lib', fileName), fileContent)
}

async function generateCode (filesNumber) {
  for (let i = 0; i < filesNumber; i++) {
    await generateJSFile(`code-generator-${i}.mjs`, 1000)
  }

  let indexFileLines = []
  for (let i = 0; i < filesNumber; i++) {
    indexFileLines.push(`import './code-generator-${i}.mjs'`)
  }
  const indexFileContent = indexFileLines.join('\n')
  await writeFile(join(import.meta.url, 'lib', 'index.mjs'), indexFileContent)
}

await generateCode(100)
