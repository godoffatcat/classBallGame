// this.canvas = document.querySelector("#id-canvas")
// this.context = this.canvas.getContext('2d')

// drawImage(img) {
//     this.context.drawImage(img.image, img.x, img.y)
// }

main()
//总开关
function main() {
    const canvas = document.querySelector("#my-canvas")

    loadImg((loadedImg) => {
        console.log(loadedImg, ' === load')
        const g = new Game(canvas, loadedImg)
        g.run()

        window.addEventListener('keydown', (e) => {
            console.log(e, 'ee');
            // e.code
            if (e.key === 'f') {
                const s = new ActiveScene(canvas, loadedImg)
                g.replaceScene(s)
            }
        })
    })
}


function loadImg(callback) {
    var images = {
        ball: 'img/food.jpg',
        block: 'img/block.png',
        paddle: 'img/mememe.jpg',
    }

    // 存放已加载图片
    const loadedImg = {}
    var loads = []
    //names提取的是images里的keys
    var names = Object.keys(images)
    // 遍历，逐个new出来
    for (var i = 0; i < names.length; i++) {
        //逐个的图片引用名
        let name = names[i]
        // path是图片路径，即images里的值，读取
        var path = images[name]
        //画画
        let img = new Image()
        img.src = path
        img.onload = function () {
            //存进去
            loadedImg[name] = img
            loads.push(1)
            //如果加载的图片等于图片总数，即可run
            if (loads.length == names.length) {
                console.log('load images')
                // 图片完全加载好了
                callback(loadedImg)
            }
        }
    }

}

class Game {
    constructor(
        canvas,
        loadedImg
    ) {
        //这个是场景
        console.log(canvas, 'fds');
        this.scene = new InitScene(canvas, loadedImg)
    }
    // draw这个scene
    draw() {
        this.scene.draw()
    }
    //更新scene
    update() {
        this.scene.update()
    }

    clear() {
        this.scene.clear()
    }

    replaceScene(scene) {
        this.scene = scene
    }

    run() {
        setInterval(() => {
            this.update()

            this.clear()

            this.draw()
        }, 1000)
    }
}

//场景模块
class Scene {
    constructor(canvas) {
        this.canvas = canvas
        // console.log(canvas, 'cc');
        this.context = canvas.getContext('2d')


        this.elements = []
    }
    //把各个元素遍历并画出来
    draw() {
        for (let index = 0; index < this.elements.length; index++) {
            const element = this.elements[index];
            this.context.drawImage(element.img, element.x, element.y, element.w, element.h)
        }
    }

    update() {
        for (let index = 0; index < this.elements.length; index++) {
            const element = this.elements[index];
            element.update()
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

class InitScene extends Scene {
    constructor(canvas, loadedImg) {
        console.log(canvas, 'f');
        super(canvas, loadedImg)

        this.text = '我是上帝'
    }

    draw() {
        // console.log('object', this.context, this.text);
        this.context.fillText(this.text, 10, 40)
    }

}

class ActiveScene extends Scene {
    constructor(canvas, loadedImg) {
        super(canvas)
        // this.loadedImg = loadedImg
        // todo 传图片
        const ball = new Ball(loadedImg.ball)
        const paddle = new Paddle(loadedImg.paddle)
        const block = new Block(loadedImg.block)

        window.addEventListener('keydown', (e) => {
            if (e.key === 'd') {
                paddle.canMoveLeft = true
            }
        })

        window.addEventListener('keyup', (e) => {
            paddle.canMoveLeft = false烦烦烦
        })


        this.elements.push(ball, paddle, block)
    }
}

class EndScene extends Scene {
    constructor(canvas) {
        super(canvas)

    }

}


class Element {
    // constructor() {}
    draw() {}

    update() {

    }
}

class Ball extends Element {
    constructor(img) {
        super()
        this.x = 0
        this.y = 0
        this.w = 20
        this.h = 20
        this.speed = 10
        this.img = img
    }

    move() {
        this.x += this.speed
        this.y += this.speed
    }

    update() {
        this.move()
    }
}

class Paddle extends Element {
    constructor(img) {
        super()
        this.x = 110
        this.y = 110
        this.w = 20
        this.h = 20
        this.speed = 30
        this.img = img
        this.canMoveLeft = false
    }

    moveLeft() {
        this.x += this.speed
        // this.y += this.speed
    }

    moveRight() {
        this.x -= this.speed
        // this.y += this.speed
    }

    update() {
        if (this.canMoveLeft) {
            this.moveLeft()
        }
    }
}


class Block extends Element {
    constructor(img) {
        super()
        this.x = 80
        this.y = 80
        this.w = 20
        this.h = 20
        this.img = img
    }
}