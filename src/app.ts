import $ from 'jquery'
import io from 'socket.io-client'
import './style/style.scss'
class HomePage {
    canvas = <HTMLCanvasElement>document.getElementById("canvas")
    ctx = this.canvas!.getContext("2d")
    prevX = 0
    currX = 0
    prevY = 0
    currY = 0
    dot_flag = false
    flag = false
    x = 'black'
    y = 2
    client: SocketIOClient.Socket
    constructor() {
        this.ctx = this.ctx!
        this.canvas.addEventListener('mousemove', (e) => {
            this.findxy('move', e)
        }, false)
        this.canvas.addEventListener('mousedown', (e) => {
            this.findxy('down', e)
        })
        this.canvas.addEventListener('mousemove', (e) => {
            this.findxy('move', e)
        })
        this.client = io('http://localhost:8081')
        this.client.on('connect', () => {
            console.log(`I'm connected!`)
        })
        this.client.on('drawB', (data: { currX: number, currY: number }) => {
            this.drawSocket(data.currX, data.currY)
        })
    }
    findxy(res: 'move' | 'up' | 'down' | 'out', event: MouseEvent) {
        if (res === 'down') {
            this.prevX = this.currX
            this.prevY = this.currY
            this.currX = event.clientX - this.canvas.offsetLeft
            this.currY = event.clientY - this.canvas.offsetTop
            this.flag = false
            this.dot_flag = true
            if (this.dot_flag) {
                this.ctx!.beginPath()
                this.ctx!.fillStyle = this.x
                this.ctx!.fillRect(this.currX, this.currY, 2, 2)
                this.client.emit('draw', { currX: this.currX, currY: this.currY })
            }
        }
        if (res === 'up' || res === 'out') {
            this.flag = false
        }
        if (res === 'move') {
            if (this.flag) {
                this.prevX = this.currX
                this.prevY = this.currY
                this.currX = event.clientX - this.canvas.offsetLeft
                this.currY = event.clientY - this.canvas.offsetTop
                this.draw()
            }
        }
    }
    drawSocket(x: number, y: number) {
        this.ctx!.beginPath()
        this.ctx!.fillStyle = this.x
        this.ctx!.fillRect(x, y, 2, 2)
    }
    draw() {
        this.ctx!.beginPath()
        this.ctx!.moveTo(this.prevX, this.prevY)
        this.ctx!.lineTo(this.currX, this.currY)
        this.ctx!.strokeStyle = this.x
        this.ctx!.lineWidth = this.y
        this.ctx!.stroke()
        this.ctx!.closePath()
    }
}

new HomePage()