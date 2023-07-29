function generateRandomId(length) {
  return Math.random().toString(36).substr(2, length);
}

const randomId = generateRandomId(8);

export default generateRandomId;
