#!/usr/bin/env node
import { readdir, stat } from 'node:fs/promises';
import { resolve, join, parse } from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = resolve('src/assets/images');
const RASTER = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = (await walk(IMAGES_DIR)).filter((f) =>
  RASTER.has(parse(f).ext.toLowerCase()),
);

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const { dir, name } = parse(file);
  const out = join(dir, `${name}.webp`);
  const before = (await stat(file)).size;
  await sharp(file).webp({ quality: 82 }).toFile(out);
  const after = (await stat(out)).size;
  totalBefore += before;
  totalAfter += after;
  const pct = (((before - after) / before) * 100).toFixed(0);
  console.log(`${name}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB (-${pct}%)`);
}

console.log(
  `\nTotal: ${(totalBefore / 1024).toFixed(0)} KB -> ${(totalAfter / 1024).toFixed(0)} KB (-${(
    ((totalBefore - totalAfter) / totalBefore) *
    100
  ).toFixed(0)}%)`,
);
