import { _decorator, Component, Node, instantiate, Vec3, Game, input, Input, EventTouch, tween, random, randomRange, Vec2, UITransform, Camera} from 'cc';
import { GameView } from './GameView';
import { GameModel } from './GameModel';
import { transform } from 'typescript';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({type:GameView})
    private GameView: GameView

    @property({type:GameModel})
    private GameModel: GameModel

    private startGame: boolean = false;
    private changeDirection: boolean = false;

    private changeLeftDir: boolean = false;
    private changeRightDir: boolean = false;

    private size: number;
    private lastPosition: Vec3;
    private offset: Vec3;
    private lerpRate: number; // rate camera will change position to follow ball
    private dt: number;
    private score: number = 0;

    start() {
        this.startGame = false;
        this.changeDirection = false;
        this.changeLeftDir = false;
        this.changeRightDir = false;
        this.score = 0;
        this.GameView.Score.string = this.score.toString();
        console.log(this.GameModel.Ball.position);

        this.lastPosition = this.GameModel.FirstPlatform.position;
        this.size = this.GameModel.FirstPlatform.getComponent(UITransform).contentSize.x;

        for (let i = 0; i < 500; i++) {
            this.spawnPlatForms();
        } // create first set of platforms

        // console.log(camera.node.position.x);
        // console.log(camera.node.position.y);
        // console.log(this.GameModel.Ball.position.x);
        // console.log(this.GameModel.Ball.position.y);
        // this.offset.x = this.GameModel.Ball.position.x - camera.node.position.x;
        // this.offset.y = this.GameModel.Ball.position.y - camera.node.position.y;
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
        let camera = this.GameView.Canvas.getComponentInChildren(Camera);

        if (this.changeLeftDir == true && this.changeRightDir == false) {
            this.GameModel.Ball.setPosition(
                new Vec3(this.GameModel.Ball.position.x, 
                    this.GameModel.Ball.position.y, 
                    this.GameModel.Ball.position.z))
            this.GameView.Bg.setPosition(
                new Vec3(this.GameView.Bg.position.x - this.GameModel.BallSpeed, 
                    this.GameView.Bg.position.y - this.GameModel.BallSpeed, 
                    this.GameModel.Ball.position.z))

            this.GameModel.GemsNode.setPosition(
                new Vec3(this.GameView.Bg.position.x - this.GameModel.BallSpeed, 
                    this.GameView.Bg.position.y - this.GameModel.BallSpeed, 
                    this.GameModel.Ball.position.z))
        }

        else if (this.changeLeftDir == false && this.changeRightDir == true) {
            this.GameModel.Ball.setPosition(
                new Vec3(this.GameModel.Ball.position.x, 
                    this.GameModel.Ball.position.y, 
                    this.GameModel.Ball.position.z))
            this.GameView.Bg.setPosition(
                new Vec3(this.GameView.Bg.position.x + this.GameModel.BallSpeed, 
                    this.GameView.Bg.position.y - this.GameModel.BallSpeed, 
                    this.GameModel.Ball.position.z))
            this.GameModel.GemsNode.setPosition(
                new Vec3(this.GameView.Bg.position.x - this.GameModel.BallSpeed, 
                    this.GameView.Bg.position.y - this.GameModel.BallSpeed, 
                    this.GameModel.Ball.position.z))
        }

        console.log(this.GameView.Bg.position);
        // let target = this.GameModel.Ball.getPosition();
        // let currentPos = camera.node.getPosition();

        // console.log(target);
        // currentPos.lerp(target, 0.1);
        // camera.node.setPosition(currentPos);
        
        // bgPosY -= 1;
        // console.log(camera.node.setPosition(currentPos));     
    }

    onLoad () {
        // this.GameModel.Ball.setPosition(
        //     new Vec3(this.GameModel.Ball.position.x + this.GameModel.BallSpeed, 
        //         this.GameModel.Ball.position.y + this.GameModel.BallSpeed, 
        //         this.GameModel.Ball.position.z))
        // console.log(this.GameModel.Ball.position);
        input.on(Input.EventType.TOUCH_START, this.changeLeft, this);
    }

    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.changeLeft, this);
        input.off(Input.EventType.TOUCH_START, this.changeRight, this);
        input.off(Input.EventType.TOUCH_START, this.startGameClick, this);
    }

    startGameClick(event: EventTouch) {
        console.log('move');
        this.startGame = true;
        this.changeDirection = true;
        this.changeLeftDir = true;
        input.on(Input.EventType.TOUCH_START, this.changeLeft, this);
        input.off(Input.EventType.TOUCH_START, this.changeRight, this);
        input.off(Input.EventType.TOUCH_START, this.startGameClick, this);
    }

    changeLeft(event: EventTouch) {
        console.log('left');
        this.startGame = false;
        this.changeRightDir = true;
        this.changeLeftDir = false;
        input.off(Input.EventType.TOUCH_START, this.changeLeft, this);
        input.off(Input.EventType.TOUCH_START, this.startGameClick, this);
        input.on(Input.EventType.TOUCH_START, this.changeRight, this);
        this.score++;
        this.GameView.AudioClick.play();
        this.GameView.Score.string = this.score.toString();
    }

    changeRight(event: EventTouch) {
        console.log('right');
        this.startGame = false;
        this.changeLeftDir = true;
        this.changeRightDir = false;

        input.off(Input.EventType.TOUCH_START, this.changeRight, this);
        input.off(Input.EventType.TOUCH_START, this.startGameClick, this);
        input.on(Input.EventType.TOUCH_START, this.changeLeft, this);
        this.score++;
        this.GameView.AudioClick.play();
        this.GameView.Score.string = this.score.toString();
    }

    public StartSpawningPlatforms()
    {
        let _this = this
        this.schedule(function() {
            // Here this refers to component
            _this.spawnPlatForms();
        }, 0.2, 10, 0.1);
    }

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

        this.lastPosition = pos;

        let rand = randomRange(0, 4);
        if (rand < 1) {
            let gems = instantiate(this.GameModel.Gems);
            gems.parent = this.GameModel.GemsNode;
            gems.setPosition(new Vec3(pos.x, pos.y, pos.z));
        }
    }

    public SpawnY()
    {
        let pos: Vec3 = this.lastPosition;
        pos.x -= 51;
        pos.y += 51;
        let platform = instantiate(this.GameModel.Platform);
        platform.parent = this.GameView.Bg;
        platform.setPosition(new Vec3(pos.x, pos.y + 1, pos.z));
        this.lastPosition = pos;

        let rand = randomRange(0, 4);
        if (rand < 1) {
            let gems = instantiate(this.GameModel.Gems);
            gems.parent = this.GameModel.GemsNode;
            gems.setPosition(new Vec3(pos.x, pos.y + 1, pos.z));
        }
    }
}

