import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error('Usage: node fetch_duos.js <url1> [url2 ...]');
  process.exit(1);
}

async function main() {
  const zai = await ZAI.create();
  for (const url of urls) {
    const safeName = url.replace(/^https?:\/\//, '').replace(/[^\w.-]/g, '_').slice(0, 50);
    const outPath = `/tmp/duos_${safeName}.json`;
    try {
      const result = await zai.functions.invoke('page_reader', { url });
      fs.writeFileSync(outPath, JSON.stringify(result.data, null, 2));
      console.log(`OK ${url} -> ${outPath}`);
    } catch (e) {
      console.error(`FAIL ${url}: ${e.message}`);
    }
  }
}
main();
