const allCells = document.querySelectorAll('.cell')

function findFreeCells() {
  const freeCells = []
  allCells.forEach(cell => {
    if (cell.innerHTML.trim().length == 0) {
      freeCells.push(cell)
    }
  })
  return freeCells
}
