import Camera from "./Camera.mjs";


const camera = new Camera()
camera.init()

const uis = document.querySelectorAll('.ui')
uis.forEach(ui => {
    ui.addEventListener('mouseenter', camera.pause)
    ui.addEventListener('mouseleave', camera.continue)
})