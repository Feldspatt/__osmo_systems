export default class {

    map = document.getElementById('map')
    isActive = false
    viewX= 0
    viewY= 0
    cursX= window.innerWidth/2
    cursY= window.innerHeight/2
    scale= 100
    deadzone = 15
    speed = 1
    toggleKey = 'Space'
    locked = true

    continue = (_,unlock = false)=> {
        if(this.locked && unlock) this.locked = false
        if(this.locked) return
        this.isActive = true
        this.loop()
    }

    pause = (_,lock = false)=> {
        this.isActive = false
        if(lock) this.locked = true
    }

    init = ()=> {
        this.removeListeners()
        this.addListeners()
    }

    exit = ()=> {
        this.isActive = false
        this.scale = 100
        this.map.style.scale = 100 + "%"
        this.removeListeners()
    }
    
    addListeners = () => {
        window.addEventListener('mousemove', this.onMouseMove)
        window.addEventListener('keyup', this.onToggle)
        window.addEventListener('wheel', this.onWheel)
        document.documentElement.addEventListener('mouseenter', this.continue)
        document.documentElement.addEventListener('mouseleave', this.pause)
    }

    removeListeners = () => {
        window.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('keyup', this.onToggle)
        window.removeEventListener('wheel', this.onWheel)
        document.documentElement.removeEventListener('mouseenter', this.continue)
        document.documentElement.removeEventListener('mouseleave', this.pause)
    }

    followCursor = ()=>{
        const
            halfW = window.innerWidth/2,
            halfH = window.innerHeight/2

        let
            dX = this.cursX - halfW,
            dY = this.cursY - halfH

        dX += (Math.abs(dX)>0) ? -this.deadzone : this.deadzone
        dY += (Math.abs(dY)>0) ? -this.deadzone : this.deadzone

        if(this.deadzone && dY*dY + dX*dX < this.deadzone*this.deadzone) return

        this.viewX -= this.speed * dX * 2 /100
        this.viewY -= this.speed * dY * 2 /100

    }

    moveMap = () => {
        this.map.style.left = this.viewX + "px"
        this.map.style.top = this.viewY + "px"
    }


    onMouseMove = (e)=>  {
        this.cursX = e.clientX
        this.cursY = e.clientY
    }

    onWheel = (e)=>{
        this.scale = Math.min(Math.max(this.scale + e.deltaY/100, 10), 150)
        this.map.style.scale = this.scale + "%"
    }

    onToggle = (ev)=> {
        if(ev.code === this.toggleKey) this.isActive ? this.pause(null,true) : this.continue(null,true)
    }

    loop = ()=> {
        this.followCursor(this.deadzone, this.speed)
        this.moveMap()
        if(this.isActive){
            requestAnimationFrame(this.loop)
        }
    }
}