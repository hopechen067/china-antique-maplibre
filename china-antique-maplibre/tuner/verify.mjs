import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = dirname(fileURLToPath(import.meta.url));

const required = [
  'index.html',
  'map-tiles.config.js',
  'map-tiles.config.example.js',
  'assets/water-data.js',
  'assets/han-city-3d.js',
  'assets/sample-sites.json',
  'preset-antique-default.json',
  'presets/antique-default.json',
];

let ok = true;
for (const rel of required) {
  const p = join(root, rel);
  if (existsSync(p)) {
    console.log(`OK  ${rel}`);
  } else {
    console.error(`MISS ${rel}`);
    ok = false;
  }
}

// Local override is optional
const localCfg = join(root, 'map-tiles.config.local.js');
if (existsSync(localCfg)) {
  console.log('OK  map-tiles.config.local.js (optional local override present)');
} else {
  console.log('—   map-tiles.config.local.js (optional, not present)');
}

const waterPath = join(root, 'assets/water-data.js');
if (existsSync(waterPath)) {
  const bytes = statSync(waterPath).size;
  console.log(`OK  assets/water-data.js size=${bytes}`);
  if (bytes < 1_000_000) {
    console.error(`FAIL assets/water-data.js too small (${bytes} bytes)`);
    ok = false;
  } else {
    try {
      const code = readFileSync(waterPath, 'utf8');
      const ctx = { window: {} };
      vm.runInNewContext(code, ctx, { timeout: 60_000 });
      const data = ctx.window.CHINA_WATER_DATA;
      if (!data || typeof data !== 'object') {
        console.error('FAIL CHINA_WATER_DATA missing after eval');
        ok = false;
      } else {
        const keys = Object.keys(data);
        console.log(`OK  CHINA_WATER_DATA keys=${keys.join(',')}`);
      }
    } catch (e) {
      console.error('FAIL evaluating water-data.js', e);
      ok = false;
    }
  }
}

const indexHtml = join(root, 'index.html');
if (existsSync(indexHtml)) {
  const html = readFileSync(indexHtml, 'utf8');
  if (!html.includes('assets/water-data.js')) {
    console.error('FAIL index.html does not reference assets/water-data.js');
    ok = false;
  } else {
    console.log('OK  index.html references assets/water-data.js');
  }
  if (!html.includes('ensureWaterData')) {
    console.error('FAIL index.html missing ensureWaterData fetch fallback');
    ok = false;
  } else {
    console.log('OK  index.html has ensureWaterData fallback');
  }
}

if (!ok) {
  console.error('verify failed');
  process.exit(1);
}

console.log('verify ok');
process.exit(0);
