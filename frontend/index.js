// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        document.querySelector('.targeted').classList.remove('targeted')
        square.classList.add('targeted')
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
  let targetSquare = document.querySelector('.targeted')
    let upNum = 0;
    let downNum = 0;
    let currentRow = targetSquare.parentElement.children
      if(evt.key === keys.right && targetSquare !== currentRow[4]){
      targetSquare.nextElementSibling.classList.add('targeted')
      targetSquare.classList.remove('targeted')
      }
      if(evt.key === keys.left && targetSquare !== currentRow[0]){
      targetSquare.previousElementSibling.classList.add('targeted')
      targetSquare.classList.remove('targeted') 
      }     
     if(evt.key === keys.up && targetSquare.parentElement !== document.querySelector('.row') ){
          let currentRow = targetSquare.parentElement.children
          let upperRow = targetSquare.parentElement.previousElementSibling.children
          for(let i = 0; i < currentRow.length; i++){
            if(currentRow[i].classList.contains('targeted')){
              upNum = i
            }
          }
          upperRow[upNum].classList.add('targeted')
          targetSquare.classList.remove('targeted')
            }
      if(evt.key === keys.down && targetSquare.parentElement !== document.querySelector('#grid').children[4]){
        let currentRow = targetSquare.parentElement.children
        let bottomRow = targetSquare.parentElement.nextElementSibling.children
        for(let i = 0; i < currentRow.length; i++){
             if(currentRow[i].classList.contains('targeted')){
                downNum = i
                  }         
        }
        bottomRow[downNum].classList.add('targeted')
        targetSquare.classList.remove('targeted')
      }
    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    if(evt.key === keys.space && targetSquare.children){
      let mosquito = targetSquare.children[0]
      mosquito.setAttribute('data-status','dead')
      targetSquare.style.backgroundColor = 'red'
    }
    
    // 👉 TASK 5 - End the game 👈
    let count = 0;
    let mosquitoes = document.querySelectorAll('div .square img')
    let pInfo = document.querySelector('p.info')
    mosquitoes.forEach((mosquito) => {
      if(mosquito.dataset.status === 'alive'){
        count++
      }
    })
    if(count === 0){
      let restart = document.createElement('button')
      restart.innerHTML = 'Restart'
      pInfo.textContent = `Extermination completed in ${getTimeElapsed() / 1000} seconds!  `
      document.querySelector('header h2').appendChild(restart)
      restart.addEventListener('click', () => {
        location.reload()
      })
    }
    
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
  