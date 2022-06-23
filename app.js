new Card

let block = false
const TIMEOUT = 250

document.onkeydown = checkKey

function checkKey(key) {
  if (block) {return}
  key.keyCode == "38" && up()
  key.keyCode == "40" && bottom()
  key.keyCode == "37" && left()
  key.keyCode == "39" && right()
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

async function left() {
  block = true
  let isMoved = false
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
        if (matrix[row][col]) {
          matrix[row][col].leftMove() ?
          isMoved = true : false
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

async function right() {
  block = true
  let isMoved = false
  for (let row = 3; row > -1; row--) {
    for (let col = 3; col > -1; col--) {
    if (matrix[row][col]) {
        matrix[row][col].rightMove() ?
        isMoved = true : false
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

async function up() {
  block = true
  let isMoved = false
  for (let col = 3; col > -1; col--) {
    for (let row = 0; row < 4; row++) {
    if (matrix[row][col]) {
        matrix[row][col].topMove() ?
        isMoved = true : false
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

async function bottom() {
  block = true
  let isMoved = false
  for (let col = 0; col < 4; col++) {
    for (let row = 3; row > -1; row--) {
      if (matrix[row][col]) {
        matrix[row][col].bottomMove() ?
        isMoved = true : false
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