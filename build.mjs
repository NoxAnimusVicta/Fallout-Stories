import { cp, mkdir } from 'node:fs/promises';
await mkdir('dist', {recursive:true});
await cp('docs','dist',{recursive:true,filter:source=>!source.replaceAll('\\','/').includes('docs/references')});
console.log('Static app built in dist/');
