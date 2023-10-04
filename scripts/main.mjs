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

    viewX -= speed * dX /100
    viewY -= speed * dY /100

    map.style.left = viewX + "px"
    map.style.top = viewY + "px"
}


onmousemove = function (e)  {
    cursX = e.clientX
    cursY = e.clientY
}

onwheel = function (e){
    console.log('deltaY', e.deltaY)
    scale = Math.min(Math.max(scale + e.deltaY/100, 10), 150)
    map.style.scale = scale + "%"
}

let isRendering = true

function spleen (){
    trailCursor(200, 1)
    if(isRendering){
        requestAnimationFrame(spleen)
    }
}

spleen()