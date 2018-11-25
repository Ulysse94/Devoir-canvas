const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')
const buttonHtml = document.querySelector("button")

 $canvas.sounds = {}
 $canvas.sounds.bot = new Audio('sounds/bot.mp3')
 $canvas.sounds.player = new Audio('sounds/player.mp3')
 $canvas.sounds.win = new Audio('sounds/win.mp3')
 $canvas.sounds.loose = new Audio('sounds/loose.mp3')

let windowWidth = $canvas.width
let windowHeight = $canvas.height
let position = []
let player = []
let counter, search, score, win
let intervalId = null
let bot = []

const resize = () => {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    $canvas.width = windowWidth
    $canvas.height = windowHeight
}
window.addEventListener('resize', resize)
resize()

const tapeButton = () => {
    const button = {}
    button.x = (windowWidth / 2) - 275
    button.y = (windowHeight / 2) - 275
    button.color = 175
    button.identity = 0

    for (let i = 0; i < 4; i++) {
        for (let i = 0; i < 4; i++) {
            context.beginPath()
            context.rect(button.x, button.y, 100, 100)
            context.fillStyle = `hsl(${button.color}, 100%, 50%)`
            context.fill()
            positionButton = [button.x, button.y, button.identity]
            position.push(positionButton)
            button.x += 150
            button.color += 10
            button.identity += 1
        }
        button.x = (windowWidth / 2) - 275
        button.y += 150
    }
}

const cursor = {}
cursor.x = 0
cursor.y = 0

$canvas.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX
    cursor.y = _event.clientY
})

const game = () => {
    $canvas.addEventListener('click', () => {
        for (let i = 0; i < 16; i++) {
            let x = (cursor.x - position[i][0]) / 100
            let y = (cursor.y - position[i][1]) / 100
            if (((0 > x || x > 1) == false) && ((0 > y || y > 1) == false)) {
                context.beginPath()
                context.rect(position[i][0] - 5, position[i][1] - 5, 110, 110)
                context.fillStyle = 'green'
                context.fill()
                player.push(position[i][2])
                $canvas.sounds.player.currentTime = 0
                $canvas.sounds.player.play()
                if (player[search] == bot[search]) {
                    search ++
                    if (search == win) {
                        $canvas.sounds.win.currentTime = 0
                        $canvas.sounds.win.play()
                        alert('You Win')
                        window.location.reload(false)
                    }
                }
                else {
                    $canvas.sounds.loose.currentTime = 0
                    $canvas.sounds.loose.play()
                    alert('You Lose')
                    window.location.reload(false)
                }
            }
        }
    })
}

buttonHtml.addEventListener('click', () => {
    clearInterval(intervalId)
    start()
})

function finish() {
    buttonHtml.innerHTML = "Game in process"
    game()
    clearInterval(intervalId)
}
function random() {
    counter--
    if(counter == -1) {
        finish()
    }
    else {
        let i = Math.floor(Math.random()*16)
        context.beginPath()
        context.rect(position[i][0] - 5, position[i][1] - 5, 110, 110)
        context.fillStyle = 'black'
        context.fill()
        bot.push(i)
        buttonHtml.innerHTML = "Bot Progress"
        $canvas.sounds.bot.currentTime = 0
        $canvas.sounds.bot.play()
    }
}
function start() {
    counter = document.querySelector("select").value
    win = counter
    search = 0
    bot = []
    player = []
    position = []
    if (counter != 0) {
        intervalId = setInterval(random, 1000)
    }
}


const loop = () => {
    window.requestAnimationFrame(loop)
    tapeButton()
    context.fillStyle = 'rgba(255, 255, 255, 0.1)'
    context.fillRect(0, 0, windowWidth, windowHeight)
}
loop()