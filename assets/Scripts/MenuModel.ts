import { _decorator, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuModel')
export class MenuModel extends Component {
    @property({type: Button})
    private playGameBtn: Button;

    
    public get PlayGameBtn() : Button {
        return this.playGameBtn;
    }

    
    public set PlayGameBtn(playGameBtn : Button) {
        this.playGameBtn = playGameBtn;
    }
    
    

    start() {

    }

    update(deltaTime: number) {
        
    }
}

