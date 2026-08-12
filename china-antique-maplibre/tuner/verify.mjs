import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = dirname(fileURLToPath(import.meta.url));

const required = [
  'index.html',
  'map-tiles.config.js',
  'map-tiles.config.example.js',
  'assets/han-city-3d.js',
  'assets/sample-sites.json',
  'assets/water-pack.json',
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

// Tiny pack flag must default to disabled (no in-repo redistribution).
const waterPackPath = join(root, 'assets/water-pack.json');
if (existsSync(waterPackPath)) {
  try {
    const pack = JSON.parse(readFileSync(waterPackPath, 'utf8'));
    if (pack.enabled === true) {
      console.error('FAIL assets/water-pack.json enabled=true but public tree must default to false');
      ok = false;
    } else {
      console.log('OK  assets/water-pack.json enabled=false (water not shipped)');
    }
  } catch (e) {
    console.error('FAIL parsing assets/water-pack.json', e);
    ok = false;
  }
}

// Large water pack is optional and not redistributed in this repo.
const waterPath = join(root, 'assets/water-data.js');
if (existsSync(waterPath)) {
  const bytes = statSync(waterPath).size;
  console.log(`OK  assets/water-data.js (optional local pack) size=${bytes}`);
  if (bytes < 1_000) {
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
} else {
  console.log('—   assets/water-data.js (optional, not shipped)');
}

const indexHtml = join(root, 'index.html');
if (existsSync(indexHtml)) {
  const html = readFileSync(indexHtml, 'utf8');
  if (!html.includes('water-pack.json') || !html.includes('assets/water-data.js')) {
    console.error('FAIL index.html lost water-pack.json / assets/water-data.js loader path');
    ok = false;
  } else {
    console.log('OK  index.html keeps water-pack.json + optional water-data.js loader');
  }
  if (!html.includes('ensureWaterData') || !html.includes('__TUNER_BASE__')) {
    console.error('FAIL index.html missing ensureWaterData / __TUNER_BASE__ loader');
    ok = false;
  } else {
    console.log('OK  index.html has ensureWaterData + __TUNER_BASE__');
  }
  if (!html.includes('not-shipped') && !html.includes('optional')) {
    console.error('FAIL index.html should treat missing water as optional / not-shipped');
    ok = false;
  } else {
    console.log('OK  index.html treats water as optional');
  }
  if (!html.includes('three@0.160.0')) {
    console.error('FAIL index.html missing Three.js script');
    ok = false;
  } else {
    console.log('OK  index.html loads Three.js');
  }
}

// Directory-safe base: no-trailing-slash project Pages must not resolve to /assets/
{
  const noSlash = new URL(
    'assets/water-data.js',
    'https://hopechen067.github.io/china-antique-maplibre'
  ).href;
  const withSlash = new URL(
    'assets/water-data.js',
    'https://hopechen067.github.io/china-antique-maplibre/'
  ).href;
  if (noSlash === 'https://hopechen067.github.io/assets/water-data.js') {
    console.log('OK  documented hazard: no-trailing-slash relative URL escapes repo');
  } else {
    console.error('FAIL expected no-slash relative resolution hazard missing');
    ok = false;
  }
  if (withSlash !== 'https://hopechen067.github.io/china-antique-maplibre/assets/water-data.js') {
    console.error('FAIL unexpected with-slash resolution', withSlash);
    ok = false;
  } else {
    console.log('OK  with-trailing-slash relative URL stays in repo');
  }
}

if (!ok) {
  console.error('verify failed');
  process.exit(1);
}

console.log('verify ok');
process.exit(0);
