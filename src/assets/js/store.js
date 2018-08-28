export function saveToLocal(id, key, value) {
  let seller = window.localStorag;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value;
  window.localStorage = JSON.stringify(seller);
}

export function loadFormLocal(id, key, def) {
  let seller = window.localStorage;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
}
