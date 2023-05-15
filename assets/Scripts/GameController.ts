import { _decorator, Component, Node, instantiate, Vec3, Game, input, Input, EventTouch, tween, game, randomRange, director, Color, Sprite, Button} from 'cc';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({type:GameView})
    private GameView: GameView

    @property({type:GameModel})
    private GameModel: GameModel

    private startGame: boolean;
    private gameOver: boolean = false;
    private changeDirection: boolean = false;

    private changeLeftDir: boolean = false;
    private changeRightDir: boolean = false;

    private size: number;
    private lastPosition: Vec3;
    private score: number = 0;

    private platformArrayPos: Vec3[] = [];
    private gemsArrayPos: Vec3[] = [];
    private gemsArray: Node[] = [];
    private ballPosition: Vec3;

    private zigzagHighScoreArray: number[] = [];
    
    start() {
        let zigzagHighScoreArray1 = localStorage.getItem('zigzagHighScoreArray');
        
        if (zigzagHighScoreArray1) {
            this.zigzagHighScoreArray = JSON.parse(zigzagHighScoreArray1);
            localStorage.setItem('zigzagHighScoreArray', JSON.stringify(this.zigzagHighScoreArray));
        }
    }
    
    update(deltaTime: number) {
        // console.log(this.GameModel.Ball.position);
        // if (this.startGame == true) {
        //     this.GameModel.Ball.setPosition(
        //         new Vec3(this.GameModel.Ball.position.x, 
        //             this.GameModel.Ball.position.y + this.GameModel.BallSpeed, 
        //             this.GameModel.Ball.position.z))

        //     // this.startGame = false;
        //     // this.changeDirection = false;
        // }
        // this.dt = deltaTime;

        if (this.changeLeftDir == true && this.changeRightDir == false) {
            this.GameModel.Ball.setPosition(
                new Vec3(this.GameModel.Ball.position.x, 
                    this.GameModel.Ball.position.y , 
                    this.GameModel.Ball.position.z))
            this.GameView.Bg.setPosition(
                new Vec3(this.GameView.Bg.position.x - this.GameModel.BallSpeed , 
                    this.GameView.Bg.position.y - this.GameModel.BallSpeed , 
                    this.GameModel.Ball.position.z))

            this.GameModel.GemsNode.setPosition(
                new Vec3(this.GameView.Bg.position.x - this.GameModel.BallSpeed, 
                    this.GameView.Bg.position.y - this.GameModel.BallSpeed, 
                    this.GameModel.Ball.position.z))
        }

        else if (this.changeLeftDir == false && this.changeRightDir == true) {
            this.GameModel.Ball.setPosition(
                new Vec3(this.GameModel.Ball.position.x , 
                    this.GameModel.Ball.position.y , 
                    this.GameModel.Ball.position.z))
            this.GameView.Bg.setPosition(
                new Vec3(this.GameView.Bg.position.x + this.GameModel.BallSpeed , 
                    this.GameView.Bg.position.y - this.GameModel.BallSpeed , 
                    this.GameModel.Ball.position.z))
            this.GameModel.GemsNode.setPosition(
                new Vec3(this.GameView.Bg.position.x - this.GameModel.BallSpeed, 
                    this.GameView.Bg.position.y - this.GameModel.BallSpeed, 
                    this.GameModel.Ball.position.z))
        }
        
        for (let j = 0; j < this.platformArrayPos.length; j++) {
            // console.log(this.platformArrayPos);
            // console.log(this.platformArrayPos[j].y);
            if(this.GameView.Bg.position.y == -75 && this.GameView.Bg.position.y < 0 && this.GameView.Bg.position.x == 75) {
                this.gameOverAction();
            }
            else if (Math.round(-this.GameView.Bg.position.x) >= (Math.round(this.platformArrayPos[j].x) + 60)
            && (Math.round(-this.GameView.Bg.position.y) <= (Math.round(this.platformArrayPos[j].y) + 20)
            && (Math.round(-this.GameView.Bg.position.y) >= (Math.round(this.platformArrayPos[j].y) - 20))
            && this.GameView.Bg.position.y < -90) && (this.gameOver == false)) {
                this.gameOverAction();
            }
            else if (Math.round(-this.GameView.Bg.position.x) <= (Math.round(this.platformArrayPos[j].x) - 60)
            && (Math.round(-this.GameView.Bg.position.y) <= (Math.round(this.platformArrayPos[j].y) + 20)
            && (Math.round(-this.GameView.Bg.position.y) >= (Math.round(this.platformArrayPos[j].y) - 20))
            && this.GameView.Bg.position.y < -90) && (this.gameOver == false)) {
                this.gameOverAction();
            }
        
        }

        for (let i = 0; i < this.gemsArray.length; i++) {
            if (Math.round(-this.GameView.Bg.position.x) <= (Math.round(this.gemsArrayPos[i].x) + 45)
            && (Math.round(-this.GameView.Bg.position.x) >= (Math.round(this.gemsArrayPos[i].x) - 45)
            && (Math.round(-this.GameView.Bg.position.y) == (Math.round(this.gemsArrayPos[i].y) - 20))
            && this.GameView.Bg.position.y < - 100) && (this.gameOver == false)) {
                console.log('Eatgems1');
                
                this.score += 2;
                this.GameView.AudioGems.play();
                this.gemsArray[i].destroy();
            }
            this.GameView.Score.string = this.score.toString();
        }

        if (this.gameOver == true) {
            input.off(Input.EventType.TOUCH_START, this.changeLeft, this);
            input.off(Input.EventType.TOUCH_START, this.changeRight, this);
        }

    }

    onLoad () {
        this.platformArrayPos.push(this.GameModel.BlueFirst.position);
        this.gameOver = false;
        this.changeDirection = false;
        this.changeLeftDir = false;
        this.changeRightDir = false;
        this.score = 0;
        this.GameView.GameOverTable.active = false;
        this.GameView.Score.string = this.score.toString();
        
        this.lastPosition = this.GameModel.FirstPlatform.position;
        for (let i = 0; i < 10; i++) {
            // this.spawnPlatForms();
            this.spawnPlatForms();
            // if (i = 49) {
            //     for (i = 0; i < 20; i++) {
            //         this.spawnPlatForms();
            //     }
            // }
            this.schedule(function() {
                this.spawnPlatForms();
            }, 2)
            // if (this.startGame == true) {
            // }
            // if (this.startGame != false) {
            // }
        } // create first set of platforms

        this.schedule(function() {
            this.changeBallColor();
        }, 15)

        this.schedule(function() {
            this.changeBgColor();
        }, 15)
        
        // if (this.startGame == true) {
        // }
        // this.GameModel.Ball.setPosition(
        //     new Vec3(this.GameModel.Ball.position.x + this.GameModel.BallSpeed, 
        //         this.GameModel.Ball.position.y + this.GameModel.BallSpeed, 
        //         this.GameModel.Ball.position.z))
        // console.log(this.GameModel.Ball.position);
        input.on(Input.EventType.TOUCH_START, this.changeLeft, this);
        this.GameModel.PlayAgainBtn.node.on(Button.EventType.CLICK, this.playAgain, this);
    }

    onDestroy () {
        // input.off(Input.EventType.TOUCH_START, this.changeLeft, this);
        // input.off(Input.EventType.TOUCH_START, this.changeRight, this);
        // input.off(Input.EventType.TOUCH_START, this.startGameClick, this);
        // this.GameModel.PlayAgainBtn.node.off(Button.EventType.CLICK, this.playAgain, this);
    }

    changeLeft(event: EventTouch) {
        console.log('left');
        if (this.startGame == undefined) {
            this.startGame = true;
        }
        this.changeRightDir = true;
        this.changeLeftDir = false;
        input.off(Input.EventType.TOUCH_START, this.changeLeft, this);
        // input.off(Input.EventType.TOUCH_START, this.startGameClick, this);
        input.on(Input.EventType.TOUCH_START, this.changeRight, this);
        this.score++;
        this.GameView.AudioClick.play();
        this.GameView.Score.string = this.score.toString();
    }

    changeRight(event: EventTouch) {
        console.log('right');
        this.changeLeftDir = true;
        this.changeRightDir = false;

        input.off(Input.EventType.TOUCH_START, this.changeRight, this);
        // input.off(Input.EventType.TOUCH_START, this.startGameClick, this);
        input.on(Input.EventType.TOUCH_START, this.changeLeft, this);
        this.score++;
        this.GameView.AudioClick.play();
        this.GameView.Score.string = this.score.toString();
    }

    // public StartSpawningPlatforms()
    // {
    //     let _this = this
    //     if(this.gameOver == false) {
    //         this.schedule(function() {
    //             // Here this refers to component
    //             _this.spawnPlatForms();
                
    //         }, 7, 0, 7);
    //     }
    // }

    public spawnPlatForms() {
        let rand = randomRange(0, 6); // 0 to 5
        if (rand < 3) {
            this.SpawnX();
        }
        else if (rand >= 3) {
            this.SpawnY();
        }
    }

    public SpawnX() // spawn platform in X direction
    {
        let pos: Vec3 = this.lastPosition;
        pos.x += 51; // move new one on x axis by the size of the platform
        pos.y += 51; // move new one on x axis by the size of the platform
        let platform = instantiate(this.GameModel.Platform);
        platform.parent = this.GameView.Bg;
        platform.setPosition(new Vec3(pos.x, pos.y, pos.z));

        // this.lastPosition = pos;

        let rand = randomRange(0, 4);
        if (rand < 1) {
            let gems = instantiate(this.GameModel.Gems);
            gems.parent = this.GameModel.GemsNode;
            gems.setPosition(new Vec3(pos.x, pos.y, pos.z));
            this.gemsArrayPos.push(gems.position);
            this.gemsArray.push(gems);
        }
        this.platformArrayPos.push(platform.position);
        // console.log(this.platformArrayPos);
    }

    public SpawnY()
    {
        let pos: Vec3 = this.lastPosition;
        pos.x -= 51;
        pos.y += 51;
        let platform = instantiate(this.GameModel.Platform);
        platform.parent = this.GameView.Bg;
        platform.setPosition(new Vec3(pos.x, pos.y, pos.z));
        // this.lastPosition = pos;

        let rand = randomRange(0, 4);
        if (rand < 1) {
            let gems = instantiate(this.GameModel.Gems);
            gems.parent = this.GameModel.GemsNode;
            gems.setPosition(new Vec3(pos.x, pos.y, pos.z));
            this.gemsArrayPos.push(gems.position);
            this.gemsArray.push(gems);
        }
        this.platformArrayPos.push(platform.position);
        // console.log(this.platformArrayPos);
    }

    public changeBallColor() {
        this.GameModel.Ball.getComponent(Sprite).color = 
        new Color(this.randomNum1(), this.randomNum1(), this.randomNum1(), 255);
    }

    public changeBgColor() {
        this.GameView.Background.getComponent(Sprite).color = 
        new Color(this.randomNum2(), this.randomNum2(), this.randomNum2(), 255);
    }

    public randomNum1() {
        return Math.floor(Math.random() * 256);
    }

    public randomNum2() {
        return Math.floor(Math.random() * 256);
    }

    private gameOverAction() {
        this.gameOver = true;
        console.log('GameOver');
        this.GameView.AudioFail.play();
        this.GameView.GameOverTable.active = true;
        this.zigzagHighScoreArray.push(this.score);
        localStorage.setItem('zigzagHighScoreArray', JSON.stringify(this.zigzagHighScoreArray));
        this.GameView.CurrentScore.string = this.score.toString();
        this.GameView.BestScore.string = Math.max(...this.zigzagHighScoreArray).toString();
        director.pause();
    }

    private playAgain (button: Button) {
        director.resume();
        // input.on(Input.EventType.TOUCH_START, this.changeLeft, this);

        director.loadScene('Menu', function (err, scene) {
            console.log('PlayAgain');
        });
    }
}

