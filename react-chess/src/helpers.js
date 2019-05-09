export const factory_piece = function(
  name,
  emoji,
  color,
  moveset,
  location,
  history
) {
  let piece = {
    getName: function() {
      return this.name;
    },
    getMoveset: function() {
      return this.moveset;
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
    validate: function() {
      switch (this.emoji) {
        case "♟":
          if (this.history.length > 0) {
            this.moveset = [8];
          }
          break;
        case "♙":
          if (this.history.length > 0) {
            this.moveset = [-8];
          }
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
    history
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

  console.log("algebraic notation", file + rank);
  console.log("simple index", index);

  return index;
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
