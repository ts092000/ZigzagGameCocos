import { _decorator, AudioSource, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({type:Node})
    private bg: Node

    @property({type:Node})
    private canvas: Node

    @property({type:Node})
    private canvas2D: Node

    @property({type:AudioSource})
    private audioClick: AudioSource

    @property({type:Label})
    private score: Label
    
    public get Bg() : Node {
        return this.bg 
    }   
    
    public set Bg(bg : Node) {
        this.bg = bg;
    }
    
    public get Canvas() : Node {
        return this.canvas 
    }   
    
    public set Canvas(canvas : Node) {
        this.canvas = canvas;
    }

    public get Canvas2D() : Node {
        return this.canvas2D 
    }   
    
    public set Canvas2D(canvas2D : Node) {
        this.canvas2D = canvas2D;
    }

    public get AudioClick() : AudioSource {
        return this.audioClick 
    }   
    
    public set AudioClick(audioClick : AudioSource) {
        this.audioClick = audioClick;
    }

    public get Score() : Label {
        return this.score 
    }   
    
    public set Score(score : Label) {
        this.score = score;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

