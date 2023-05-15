import { _decorator, Component, Node, Button, director } from 'cc';
import { MenuModel } from './MenuModel';
import { MenuView } from './MenuView';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
    @property({type:MenuModel})
    private MenuModel: MenuModel

    @property({type:MenuView})
    private MenuView: MenuView

    protected start() {

    }

    protected update(deltaTime: number) {
        
    }

    protected onLoad(): void {
        this.MenuModel.PlayGameBtn.node.on(Button.EventType.CLICK, this.playGame, this);
    }

    private playGame (button: Button) {
        director.loadScene('Game', function (err, scene) {
            console.log('PlayGame');
        });
    }
}

