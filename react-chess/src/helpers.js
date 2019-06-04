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
      if (this.getName() == "pawn") {
        this.isFree = false;
      }
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
          this.captureSet = this.getMoveset();
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
  //https://stackoverflow.com/questions/11761881/javascript-dom-find-element-index-in-container
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

export const pieceReducer = function(object) {
  switch (object.emoji) {
    case "♖":
      return factory_piece(
        "rook",
        "♖",
        "white",
        [
          [-16, -24, -32, -40, -48, -56, -8],
          [-7, -6, -5, -4, -3, -2, -1],
          [1, 2, 3, 4, 5, 6, 7, 8],
          [16, 24, 32, 40, 48, 56]
        ],
        object.notation,
        [],
        [],
        "active"
      );
    case "♘":
      return factory_piece(
        "knight",
        "♘",
        "white",
        [6, 10, 15, 17, -6, -10, -15, -17],
        object.notation,
        [],
        [],
        "active"
      );
    case "♗":
      return factory_piece(
        "bishop",
        "♗",
        "white",
        [
          [7, 14, 21, 28, 35, 42, 49, 56],
          [9, 18, 27, 36, 45, 56, 63],
          [-7, -14, -21, -28, -35, -42, -49, -56],
          [-9, -18, -27, -36, -45, -56]
        ],
        object.notation,
        [],
        [],
        "active"
      );
    case "♔":
      return factory_piece(
        "king",
        "♔",
        "white",
        [-8, -1, 1, 8],
        object.notation,
        [],
        [],
        "active"
      );
    case "♜":
      return factory_piece(
        "rook",
        "♜",
        "black",
        [
          [-16, -24, -32, -40, -48, -56, -8],
          [-7, -6, -5, -4, -3, -2, -1],
          [1, 2, 3, 4, 5, 6, 7, 8],
          [16, 24, 32, 40, 48, 56]
        ],
        object.notation,
        [],
        [],
        "active"
      );
    case "♞":
      return factory_piece(
        "knight",
        "♞",
        "black",
        [6, 10, 15, 17, -6, -10, -15, -17],
        object.notation,
        [],
        [],
        "active"
      );
  }
};
