import ZAI from '/home/z/.bun/install/global/node_modules/z-ai-web-dev-sdk/dist/index.js'
const query = process.argv[2] || 'duos wynwood'
console.error(`Searching: ${query}`)
const zai = await ZAI.create()
try {
  const result = await zai.functions.invoke('web_search', { query })
  console.log('TYPE:', typeof result)
  console.log('ARRAY?', Array.isArray(result))
  console.log('LENGTH:', result?.length)
  if (Array.isArray(result)) {
    result.slice(0, 10).forEach((r, i) => {
      console.log(`\n--- ${i} ---`)
      console.log('title:', r.title)
      console.log('url:', r.url || r.link)
      console.log('snippet:', (r.snippet || r.description || '').slice(0, 400))
    })
  } else {
    console.log('JSON:', JSON.stringify(result, null, 2).slice(0, 4000))
  }
} catch (e) {
  console.error('ERROR:', e.message)
}
