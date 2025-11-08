import { rmSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const [, , suite = 'unit'] = process.argv
const target = resolve('test-results', suite)

rmSync(target, { recursive: true, force: true })
mkdirSync(target, { recursive: true })

console.log(`[test-results] prepared folder: ${target}`)
