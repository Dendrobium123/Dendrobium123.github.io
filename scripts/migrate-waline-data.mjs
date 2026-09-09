import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const [sourceArg, outputArg] = process.argv.slice(2)

if (!sourceArg || !outputArg) {
  console.error('Usage: node scripts/migrate-waline-data.mjs <source.json> <output.json>')
  process.exit(1)
}

const pathMap = new Map([
  ['/posts/blog-decoration/', '/blog/博客装修'],
  ['/posts/blog-images-broken/', '/blog/突然打开blog发现图片全部崩坏'],
  ['/posts/hello-world/', '/blog/hello-world'],
  ['/posts/perception-of-time/', '/blog/时间的感知'],
  ['/posts/prenet-module-improvement/', '/blog/prenet渐近递归网络模块改进'],
  ['/posts/pytorch_note_0/', '/blog/pytorch_note_0']
])

const sourcePath = resolve(sourceArg)
const outputPath = resolve(outputArg)
const backup = JSON.parse(await readFile(sourcePath, 'utf8'))

if (backup.type !== 'waline' || !backup.data || !Array.isArray(backup.data.Comment)) {
  throw new Error('The source file is not a supported Waline JSON export.')
}

let changed = 0
for (const comment of backup.data.Comment) {
  const target = pathMap.get(comment.url)
  if (!target) throw new Error(`Unmapped comment URL: ${comment.url}`)
  // Waline keys comments by window.location.pathname. Browsers expose
  // non-ASCII path segments in percent-encoded form, so the imported URL
  // must match the value rendered into the Astro page's data-path attribute.
  comment.url = encodeURI(target)
  changed += 1
}

let fixedAvatars = 0
for (const user of backup.data.Users ?? []) {
  if (user.avatar === 'https://www.dendrobiumcgk.chat/') {
    user.avatar = '/avatar.jpg'
    fixedAvatars += 1
  } else if (typeof user.avatar === 'string' && user.avatar.startsWith('http://')) {
    user.avatar = user.avatar.replace(/^http:\/\//, 'https://')
    fixedAvatars += 1
  }
}

await writeFile(outputPath, `${JSON.stringify(backup, null, 2)}\n`, 'utf8')
console.log(`Migrated ${changed} comments to Astro article paths.`)
console.log(`Fixed ${fixedAvatars} Waline avatar URLs.`)
console.log(`Output: ${outputPath}`)
