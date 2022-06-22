new Card

document.onkeydown = checkKey

function checkKey(key) {
  // e = e || window.event
  key.keyCode == "38" && up()
  key.keyCode == "40" && bottom()
  key.keyCode == "37" && left()
  key.keyCode == "39" && right()
}

function left() {
  let isMoved = false
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
        if (matrix[row][col]) {
          matrix[row][col].leftMove() ?
          isMoved = true : false
        }
    }
  }
  isMoved && new Card
}

function right() {
  let isMoved = false
  for (let row = 3; row > -1; row--) {
    for (let col = 3; col > -1; col--) {
    if (matrix[row][col]) {
        matrix[row][col].rightMove() ?
        isMoved = true : false
      }
    }
  }
  isMoved && new Card
}

function up() {
  let isMoved = false
  for (let col = 3; col > -1; col--) {
    for (let row = 0; row < 4; row++) {
    if (matrix[row][col]) {
        matrix[row][col].topMove() ?
        isMoved = true : false
      }
    }
  }
  isMoved && new Card
}

function bottom() {
  let isMoved = false
  for (let col = 0; col < 4; col++) {
    for (let row = 3; row > -1; row--) {
      if (matrix[row][col]) {
        matrix[row][col].bottomMove() ?
        isMoved = true : false
      }
    }
  }
  isMoved && new Card
}