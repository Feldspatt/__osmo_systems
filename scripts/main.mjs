const map = document.querySelector('.map')

let
    viewX = 0,
    viewY = 0,
    cursX = 0,
    cursY = 0,
    scale = 100


function followCursor(e, curX, curY) {
    viewX -= e.movementX
    viewY -= e.movementY

    map.style.left = viewX + "px"
    map.style.top = viewY + "px"
}

function trailCursor(deadzone, speed){
    const
        halfW = window.innerWidth/2,
        halfH = window.innerHeight/2

    const dX = cursX - halfW
    const dY = cursY - halfH

    if(Math.abs(dY) + Math.abs(dX) < deadzone) return

    viewX -= speed * dX * 2 /100
    viewY -= speed * dY * 2 /100
    map.style.left = viewX + "px"
    map.style.top = viewY + "px"
}


onmousemove = function (e)  {
    cursX = e.clientX
    cursY = e.clientY
}

onwheel = function (e){
    scale = Math.min(Math.max(scale + e.deltaY/100, 10), 150)
    map.style.scale = scale + "%"
}

let isRendering = false

onkeyup = (e) => {
    if(e.code === "Space"){
        isRendering = !isRendering
        if(isRendering) spleen()
    }
}

document.documentElement.addEventListener('mouseleave', () => {
    isRendering = false
})

document.documentElement.addEventListener('mouseenter', () => {
    isRendering = true
    spleen()
})

function spleen (){
    trailCursor(150, 1)
    if(isRendering){
        requestAnimationFrame(spleen)
    }
}

spleen()