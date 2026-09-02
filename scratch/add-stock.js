const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../lib/data.ts');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/price: "(.*?)"(,?)\r?\n/g, (match, price, comma) => {
  const stock = Math.floor(Math.random() * 10) + 1;
  return `price: "${price}"${comma}\n    stock: ${stock},\n`;
});
fs.writeFileSync(file, content);
console.log('Stock updated successfully.');
