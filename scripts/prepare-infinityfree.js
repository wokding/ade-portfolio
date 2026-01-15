import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join } from 'path';

// Copy InfinityFree specific files
const distPath = 'dist';

// Copy sitemap
copyFileSync(
  join('public', 'sitemap-infinityfree.xml'),
  join(distPath, 'sitemap.xml')
);

// Copy robots.txt
copyFileSync(
  join('public', 'robots-infinityfree.txt'),
  join(distPath, 'robots.txt')
);

// Update index.html URLs for InfinityFree
const indexPath = join(distPath, 'index.html');
let indexContent = readFileSync(indexPath, 'utf-8');

indexContent = indexContent
  .replace(/https:\/\/wokding\.github\.io\/ade-portfolio\//g, 'https://adenaufalr.free.nf/')
  .replace(/wokding\.github\.io\/ade-portfolio/g, 'adenaufalr.free.nf');

writeFileSync(indexPath, indexContent);

console.log('✅ InfinityFree build prepared successfully!');
