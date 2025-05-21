import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrigido para buscar em public/images/species
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, 'public', 'images', 'species');
const output = path.join(__dirname, 'public', 'images.json');

const result = {};

fs.readdirSync(baseDir).forEach(code => {
  const codeDir = path.join(baseDir, code);
  if (fs.statSync(codeDir).isDirectory()) {
    const files = fs.readdirSync(codeDir)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map(f => `/acervo/images/species/${code}/${f}`); // Caminho relativo a partir de public/
    if (files.length) result[code] = files;
  }
});

fs.writeFileSync(output, JSON.stringify(result, null, 2));
console.log('Arquivo images.json gerado!');
