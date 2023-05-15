import { _decorator, AudioSource, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({type:Node})
    private bg: Node

    @property({type:Node})
    private background: Node

    @property({type:Node})
    private canvas: Node

    @property({type:Node})
    private canvas2D: Node

    @property({type:AudioSource})
    private audioClick: AudioSource

    @property({type:AudioSource})
    private audioGems: AudioSource

    @property({type:AudioSource})
    private audioFail: AudioSource

    @property({type:Label})
    private score: Label

    @property({type:Node})
    private gameOverTable: Node

    @property({type:Label})
    private currentScore: Label

    @property({type:Label})
    private bestScore: Label
    
    public get Bg() : Node {
        return this.bg 
    }   
    
    public set Bg(bg : Node) {
        this.bg = bg;
    }

    public get Background() : Node {
        return this.background 
    }   
    
    public set Background(background : Node) {
        this.background = background;
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

    public get AudioGems() : AudioSource {
        return this.audioGems 
    }   
    
    public set AudioGems(audioGems : AudioSource) {
        this.audioGems = audioGems;
    }

    public get AudioFail() : AudioSource {
        return this.audioFail 
    }   
    
    public set AudioFail(audioFail : AudioSource) {
        this.audioFail = audioFail;
    }

    public get Score() : Label {
        return this.score 
    }   
    
    public set Score(score : Label) {
        this.score = score;
    }

    public get GameOverTable() : Node {
        return this.gameOverTable 
    }   
    
    public set GameOverTable(gameOverTable : Node) {
        this.gameOverTable = gameOverTable;
    }

    public get CurrentScore() : Label {
        return this.currentScore 
    }   
    
    public set CurrentScore(currentScore : Label) {
        this.currentScore = currentScore;
    }

    public get BestScore() : Label {
        return this.bestScore 
    }   
    
    public set BestScore(bestScore : Label) {
        this.bestScore = bestScore;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

