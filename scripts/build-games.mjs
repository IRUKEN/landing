import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const repository = 'https://github.com/tes-legends/teslegends.git'
const revision = '2d54b827c9dea101f60fae29ec05483475eec966'
const localSource = process.env.TESLEGENDS_SOURCE
const temporaryRoot = mkdtempSync(join(tmpdir(), 'teslegends-'))
const source = join(temporaryRoot, 'source')
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function run(command, args, cwd) {
  if (process.platform === 'win32' && command === 'npm.cmd') {
    execFileSync('cmd.exe', ['/d', '/s', '/c', command, ...args], { cwd, stdio: 'inherit' })
    return
  }
  execFileSync(command, args, { cwd, stdio: 'inherit' })
}

function findBrowserOutput(root) {
  const candidates = [join(root, 'dist', 'tesl', 'browser'), join(root, 'dist', 'tesl')]
  const output = candidates.find(candidate => existsSync(join(candidate, 'index.html')))
  if (!output) throw new Error('TES Legends build output was not found.')
  return output
}

function configureCspCompatibleStyles(sourceRoot) {
  const angularConfigPath = join(sourceRoot, 'angular.json')
  const angularConfig = JSON.parse(readFileSync(angularConfigPath, 'utf8'))
  const projectName = angularConfig.defaultProject ?? Object.keys(angularConfig.projects)[0]
  const production = angularConfig.projects[projectName].architect.build.configurations.production

  production.optimization = {
    scripts: true,
    styles: { minify: true, inlineCritical: false },
    fonts: true,
  }

  writeFileSync(angularConfigPath, `${JSON.stringify(angularConfig, null, 2)}\n`)
}

function rewriteAssetPaths(directory) {
  const textExtensions = new Set(['.css', '.html', '.js', '.json', '.scss', '.ts', '.webmanifest'])

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      rewriteAssetPaths(path)
      continue
    }

    const extension = entry.name.endsWith('.webmanifest')
      ? '.webmanifest'
      : entry.name.slice(entry.name.lastIndexOf('.'))
    if (!textExtensions.has(extension)) continue

    const original = readFileSync(path, 'utf8')
    const rewritten = original.replaceAll('/assets/', '/games/assets/')
    if (rewritten !== original) writeFileSync(path, rewritten)
  }
}

try {
  const cloneSource = localSource ? resolve(localSource) : repository
  const cloneArguments = localSource
    ? ['clone', '--local', '--no-hardlinks', '--depth', '1', cloneSource, source]
    : ['clone', '--depth', '1', cloneSource, source]
  run('git', cloneArguments, process.cwd())

  const resolvedRevision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: source, encoding: 'utf8' }).trim()
  if (resolvedRevision !== revision) {
    throw new Error(`Expected TES Legends ${revision}, received ${resolvedRevision}.`)
  }

  rewriteAssetPaths(join(source, 'src'))
  configureCspCompatibleStyles(source)
  run(npmCommand, ['ci'], source)
  run(npmCommand, ['run', 'build', '--', '--base-href', '/games/'], source)

  const gameOutput = findBrowserOutput(source)

  const destination = resolve('dist', 'games')
  rmSync(destination, { recursive: true, force: true })
  cpSync(gameOutput, destination, { recursive: true })

  const size = statSync(join(destination, 'index.html')).size
  console.log(`TES Legends published to dist/games (${size} byte index).`)
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true })
}
