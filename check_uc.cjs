const fs = require('fs');
const uc = fs.readFileSync('docs/UC.md', 'utf-8');
const routes = fs.readFileSync('src/app/routes.tsx', 'utf-8');

const routeMatches = [...routes.matchAll(/path:\s*\"([^\"]+)\"/g)].map(m => m[1]);
const ucPaths = [];
const lines = uc.split('\n');

let currentUcName = '';

for (const line of lines) {
  if (line.includes('|')) {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length > 2 && parts[2]) {
      // If column 2 has text, that's the UC name
      if (!['Tên Use case', 'Tên tác nhân', ''].includes(parts[2])) {
        currentUcName = parts[2];
      }
    }
    
    // Find a path like /admin/something or /login in the line
    const pathMatch = line.match(/(?:\s|^)(\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)(?:\s|$|\|)/i);
    if (pathMatch) {
      const pathPart = pathMatch[1];
      ucPaths.push({ name: currentUcName, path: pathPart });
    }
  }
}

const missing = [];
for (const up of ucPaths) {
  let found = false;
  for (const rm of routeMatches) {
    if (('/' + rm) === up.path || rm === up.path || ('/' + rm) === up.path.split(' ')[0] || ('/' + rm.replace('*', '')) === up.path) {
      found = true;
      break;
    }
  }
  if (!found) {
    missing.push(up);
  }
}

console.log('Total UC Paths found in UC.md:', ucPaths.length);
console.log('Missing in routes:');
missing.forEach(m => console.log(`- [${m.name}] : ${m.path}`));
