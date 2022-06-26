new Card

let block = false
const TIMEOUT = 250
const VERSION = "1.0"

console.log(VERSION);

document.onkeydown = checkKey

function checkKey(key) {
  if (block) {return}
  key.keyCode == "38" && moveAll("top")
  key.keyCode == "40" && moveAll("bottom")
  key.keyCode == "37" && moveAll("left")
  key.keyCode == "39" && moveAll("right")
}

function clearStack() {
  matrix.forEach(row => {
    row.forEach(cell => {
      if (cell) {
        cell.isBlocked = false
        cell.isBlockedForOther = false
      }
    })
  })
}

async function moveAll(direction) {
  block = true
  let isMoved = false
  if (direction === "left") {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
          if (matrix[row][col]) {
            matrix[row][col].move(direction) ?
            isMoved = true : false
          }
      }
    }
  }
  if (direction === "right") {
    for (let row = 3; row > -1; row--) {
      for (let col = 3; col > -1; col--) {
      if (matrix[row][col]) {
          matrix[row][col].move(direction) ?
          isMoved = true : false
        }
      }
    }
  }
  if (direction === "top") {
    for (let col = 3; col > -1; col--) {
      for (let row = 0; row < 4; row++) {
      if (matrix[row][col]) {
          matrix[row][col].move(direction) ?
          isMoved = true : false
        }
      }
    }
  }
  if (direction === "bottom") {
    for (let col = 0; col < 4; col++) {
      for (let row = 3; row > -1; row--) {
        if (matrix[row][col]) {
          matrix[row][col].move(direction) ?
          isMoved = true : false
        }
      }
    }
  }
  await new Promise((resolve) => {
    setTimeout(() => {
    isMoved && new Card
      clearStack()
      resolve()
    }, TIMEOUT)
  })
  block = false
}
