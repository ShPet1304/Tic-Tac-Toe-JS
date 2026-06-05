export function createPlayer(name, marker) {
  let _marker = marker;
  let _name = name;

  return {
    getName: () => _name,
    getMarker: () => _marker,
  };
}
