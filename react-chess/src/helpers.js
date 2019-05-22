export const factory_piece = function(
  name,
  emoji,
  color,
  moveset,
  location,
  history,
  captureSet,
  status
) {
  const piece = {
    isFree: true,

    getName: function() {
      return this.name;
    },
    getColor: function() {
      return this.color;
    },
    getMoveset: function() {
      return this.moveset;
    },
    getCaptureSet: function() {
      return this.captureSet;
    },
    getEmoji: function() {
      return this.emoji;
    },
    getLocation: function() {
      return this.location;
    },
    setLocation: function(location) {
      this.location = location;
    },
    updateHistory: function(notation) {
      this.history.push(notation);
    },
    setStatus: function(status) {
      this.status = status;
    },
    getIsFree: function() {
      return this.isFree;
    },
    setBlocked: function() {
      this.isFree = false;
    },
    setFree: function() {
      this.isFree = true;
    },
    validate: function() {
      // frees up block status before every click
      this.setFree();
      switch (this.emoji) {
        case "♟":
          if (this.history.length > 0) {
            this.moveset = [8];
          }
          this.captureSet = [7, 9];
          break;
        case "♙":
          if (this.history.length > 0) {
            this.moveset = [-8];
          }
          this.captureSet = [-7, -9];
          break;
        default:
          break;
      }
    }
  };

  let obj = Object.assign(Object.create(piece), {
    name,
    emoji,
    color,
    moveset,
    location,
    history,
    captureSet,
    status
  });
  return obj;
};

export const getBoardNotation = function(paramTarget) {
  let chessboard = document.getElementById("chessboard");
  let index = Array.prototype.indexOf.call(chessboard.children, paramTarget);
  let rank;
  let file;

  let rank_arr = [8, 7, 6, 5, 4, 3, 2, 1];
  let file_arr = ["a", "b", "c", "d", "e", "f", "g", "h"];

  rank = rank_arr[Math.floor(index / 8)];
  file = file_arr[index % 8];

  let notation = file + rank;
  // console.log("algebraic notation", file + rank);
  //console.log("simple index", index);

  return { notation, index };
};

export const isOdd = function(num) {
  return num % 2;
};

export const alternateColor = function(color) {
  if (color === "black") {
    color = "white";
  } else {
    color = "black";
  }
  return color;
};
