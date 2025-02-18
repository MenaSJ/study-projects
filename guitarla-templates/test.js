const obj1 = { x: 1 }, obj2 = { y: 2 };

// OLE
const ole = { x: obj1.x, y: obj2.y };

// Spread
const spread = { ...obj1, ...obj2 }; // Nuevo objeto

// Object.assign
const e = Object.assign({}, obj1, obj2); // Similar a spread