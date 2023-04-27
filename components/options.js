
/* Обход объекта
for (let prop in keysRow1) {
  const key = new Key(keysRow1[prop]);
  key.appendKey();
}*/

/* 
function drawKeys() {
  for (let i = 0; i < Object.keys(keysRow1).length; i++) {
    console.log(keysRow1[Object.keys(keysRow1)[i]]);
    const key = new Key(keysRow1[Object.keys(keysRow1)[i]]);
    key.appendKey();
  }
}

drawKeys();*/

/* 
function drawKeys() {
  for (let i = 0; i < keysRow2.length; i++) {
    const key = new Key(keysRow2[[i]]);
    key.appendKey();
  }
}

drawKeys();*/

/*const keysArr = [];
for (let prop in keysRow1) {
  keysArr.push(keysRow1[prop]);
}

console.log(keysArr)*/

/* С помощью Map 
let map = new Map(Object.entries(keysRow1));


console.log(map)

function drawKey(value) {
  const key = new Key(value);
  key.appendKey();
}

map.forEach(drawKey);
*/

/* с раскладкой - сложность в кубе
const keyboardLayout = {
  1: 13,
  2: 14,
  3: 12,
  4: 12,
  5: 8,
}

console.log(keyboardLayout['1']) //13

for (let i = 0; i < keyboardLayout['1']; i++) {
  //const key = new Key(keysRow1);
  //key.appendKey();
}
*/