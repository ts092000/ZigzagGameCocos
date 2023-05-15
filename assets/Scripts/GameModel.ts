import { _decorator, Button, CCFloat, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({type:Node})
    private ball: Node

    @property({type:Node})
    private ballNode: Node

    @property({type:CCFloat})
    private ballSpeed: number;

    @property({type:Prefab})
    private platform: Prefab;

    @property({type:Node})
    private firstPlatform: Node;

    @property({type:Prefab})
    private gems: Prefab;

    @property({type:Node})
    private gemsNode: Node;

    @property({type:Node})
    private blueFirst: Node;

    @property({type:Button})
    private playAgainBtn: Button;

    // @property({type:Node})
    // private blueBig: Node;

    public get Ball() : Node {
        return this.ball;
    }
    
    public set Ball(ball : Node) {
        this.ball = ball;
    }

    public get BallNode() : Node {
        return this.ballNode;
    }
    
    public set BallNode(ballNode : Node) {
        this.ballNode = ballNode;
    }
    
    public get BallSpeed() : number {
        return this.ballSpeed;
    }
    
    public set BallSpeed(ballSpeed : number) {
        this.ballSpeed = ballSpeed;
    }

    public get Platform() : Prefab {
        return this.platform;
    }
    
    public set Platform(platform : Prefab) {
        this.platform = platform;
    }

    public get FirstPlatform() : Node {
        return this.firstPlatform;
    }
    
    public set FirstPlatform(firstPlatform : Node) {
        this.firstPlatform = firstPlatform;
    }

    public get Gems() : Prefab {
        return this.gems;
    }
    
    public set Gems(gems : Prefab) {
        this.gems = gems;
    }

    public get GemsNode() : Node {
        return this.gemsNode;
    }
    
    public set GemsNode(gemsNode : Node) {
        this.gemsNode = gemsNode;
    }

    public get BlueFirst() : Node {
        return this.blueFirst;
    }
    
    public set BlueFirst(blueFirst : Node) {
        this.blueFirst = blueFirst;
    }

    public get PlayAgainBtn() : Button {
        return this.playAgainBtn;
    }
    
    public set PlayAgainBtn(playAgainBtn : Button) {
        this.playAgainBtn = playAgainBtn;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

