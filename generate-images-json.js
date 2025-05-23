import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Corrigido para buscar em public/images/species
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, 'public', 'images', 'species');
const output = path.join(__dirname, 'public', 'images.json');

const sizes = [400, 800, 1920];
const result = {};

fs.readdirSync(baseDir).forEach(code => {
  const codeDir = path.join(baseDir, code);
  if (fs.statSync(codeDir).isDirectory()) {
    // Ignora subpastas de tamanhos
    const files = fs.readdirSync(codeDir)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f) && !sizes.includes(Number(f)));
    if (files.length) {
      result[code] = files.map(f => `/acervo/images/species/${code}/${f}`);
    }
    files.forEach(filename => {
      const srcPath = path.join(codeDir, filename);
      sizes.forEach(size => {
        const sizeDir = path.join(codeDir, String(size));
        if (!fs.existsSync(sizeDir)) fs.mkdirSync(sizeDir, { recursive: true });
        const destPath = path.join(sizeDir, filename);
        // Só gera se não existir
        //if (!fs.existsSync(destPath)) {
          sharp(srcPath)
          .rotate()
          .resize({ width: size })
          .toFile(destPath)
          .catch(err => console.error(`Erro ao redimensionar ${srcPath} para ${size}px:`, err));
        //}
      });
    });
  }
});

fs.writeFileSync(output, JSON.stringify(result, null, 2));
console.log('Arquivo images.json gerado e imagens otimizadas criadas!');
