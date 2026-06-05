const board = (function () {
  const gameBoardArray = Array.from({ length: 9 }, () => "");

  return {
    place: function ({ index, marker }) {
      gameBoardArray[index] = marker;
    },
    getter: function () {
      const boardArray = gameBoardArray;
      return [...boardArray];
    },
    reset: function () {
      return gameBoardArray.fill("");
    },
  };
})();
