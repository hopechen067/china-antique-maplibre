import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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

if (!ok) {
  console.error('verify failed');
  process.exit(1);
}

console.log('verify ok');
process.exit(0);
