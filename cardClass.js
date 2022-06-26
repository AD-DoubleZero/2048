const $deadcells = document.querySelector("#dead-cells")
const $score = document.querySelector("#score")
const $cellsBorder = document.querySelectorAll(".cell")
const colors = ["#996AD6","#D25FD2", "#A600A6", "#6C006C"]
const winCards = []
let isWinning = false
let score = 0

class Card {
  constructor() {
    const random = Math.floor(Math.random() * 100) + 1
    let value = 0
    if (random <= 80) {value = 2}
    if (random > 80) {value = 4}
    // if (random >= 95) {value = 8}

    const card = document.createElement("div")
    card.classList.add("card")
    card.classList.add("small")
    card.innerHTML = `<p>${value}</p>`
    card.classList.add("c"+value)

    const freeCells = findFreeCells()
    const randomEl = Math.floor(Math.random() * freeCells.length)

    this.element = card
    this.value = value
    this.isBlocked = false
    this.isBlockedForOther = false

    this.updateMatrix(freeCells[randomEl])
    this.resize()

    setTimeout(()=> {this.element.classList.remove("small")}, 50)
  }

  resize() {
    this.element.style.left = this.parent.offsetLeft + "px"
    this.element.style.top = this.parent.offsetTop + "px"
  }

  score(points) {
    score += points
    const anim = points * 0.005
    setTimeout(()=> {$score.classList.add("glow")}, 50)
    setTimeout(()=> {$score.classList.remove("glow")}, 250)
    setTimeout(()=> {$score.parentNode.style.transform = `translate(${anim}px,${anim}px)`}, 50)
    setTimeout(()=> {$score.parentNode.style.transform = `translate(-${anim}px,-${anim}px)`}, 150)
    setTimeout(()=> {$score.parentNode.style.transform = `translate(0,0)`}, 250)
    $score.innerHTML = score
  }

  win() {
    if (isWinning) {return}
    console.log("Win!");
    isWinning = true
    let color = 0
    setInterval(() => {
      winCards.forEach(card => {
        card.style.backgroundColor = colors[color]
      })
    $score.parentNode.style.color = colors[color]
    color++
    if (color == colors.length) {
      color = 0
    }
    }, 1000)
  }

  destroy(card) {
    let element = card.element
    card = undefined
    $deadcells.append(element)
    setTimeout(()=> {element.classList.add("small")}, 50)
    setTimeout(()=>{
      $deadcells.innerHTML = ""
    },250)
  }

  removeFromMatrix(){
    matrix[this.parent.parentNode.dataset.vertical-1][this.parent.dataset.horisontal-1] = undefined
  }

  updateMatrix(newPlace){
    this.element.innerHTML = `<p>${this.value}</p>`
    newPlace.append(this.element)
    this.parent = newPlace
    matrix[this.parent.parentNode.dataset.vertical-1][this.parent.dataset.horisontal-1] = this
  }

  updateClass(){
    setTimeout(()=> {this.element.classList.add("big")}, 50)
    setTimeout(()=> {this.element.classList.remove("big")}, 200)
    this.element.classList.remove("c" + this.value)
    this.element.classList.add("c" + this.value * 2)
  }

  stack(i, isVertical = false) {
    let anotherCard
    isVertical ?
    anotherCard = matrix[i-1][this.parent.dataset.horisontal-1] :
    anotherCard = matrix[this.parent.parentNode.dataset.vertical-1][i-1]
    if ((anotherCard && anotherCard.value === this.value)) {
      this.destroy(anotherCard)
      this.updateClass()
      this.value += this.value
      if (this.value == 2048) {
        winCards.push(this.element)
        this.element.classList.add("win")
        this.win()
      }
      this.score(this.value)
      this.isBlocked = true
      this.isBlockedForOther = true
      return true
    } else {
      if ((anotherCard && !(anotherCard.value === this.value))) {
        this.isBlocked = true
      }
    }
    return false
  }

  move(direction) {
    let newPlace
    let position
    if (direction === "top" || direction === "bottom") {
      position = this.parent.parentNode.dataset.vertical
    }
    if (direction === "left" || direction === "right") {
      position = this.parent.dataset.horisontal
    }
    if (direction === "top" || direction === "left") {
      if (position === "1") {return false}
    }
    if (direction === "bottom" || direction === "right") {
      if (position === "4") {return false}
    }
    
    const nextCheck = i => {
      if (direction === "left" || direction === "right") {
        const candidate = this.parent.parentNode.querySelector(`[data-horisontal="${i}"]`)
        if (candidate.innerHTML.trim().length == 0) {newPlace = candidate;} 
        else if (this.isBlocked || matrix[this.parent.parentNode.dataset.vertical-1][i-1].isBlockedForOther) {return 1}
        if (this.stack(i)) {
          newPlace = candidate
        }
      }

      if (direction === "top" || direction === "bottom") {
        const candidate = document
          .querySelector(`[data-vertical="${i}"]`)
          .querySelector(`[data-horisontal="${this.parent.dataset.horisontal}"]`)
        if (candidate.innerHTML.trim().length == 0) {newPlace = candidate}
        else if (this.isBlocked || matrix[i-1][this.parent.dataset.horisontal-1].isBlockedForOther) {return 1}
        if (this.stack(i, true)) {
          newPlace = candidate
        }
      }
      // return true
    }
    if (direction === "top" || direction === "left") {
      for (let i = position - 1; i > 0; i--) {
        if (nextCheck(i) === 1) {break}
      }
    }
    if (direction === "bottom" || direction === "right") {
      for (let i = +position + 1; i < 5; i++) {
        if (nextCheck(i) === 1) {break}
      }
    }
    if (newPlace) { //из-за этого ломается проверка двигались кубики или нет
      this.removeFromMatrix()
      this.updateMatrix(newPlace)
      setTimeout(()=> {this.resize()}, 50)
      return true
    } else {return false}
  }
}

window.addEventListener("resize", () => {
  matrix.forEach(row => {
    row.forEach(cell => cell && cell.resize())
  })
})