// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Ball from "./Ball/Ball";
import BallSpawnerCrl from "./Spawner/BallSpawnerCrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  public static Instance: GameManager = null;
  public ballNumber: number = 0;
  @property(cc.Node) public rootNode: cc.Node = null;
  @property(cc.Node) public previousNode: cc.Node = null;
  @property(cc.Node) public list: cc.Node[] = [];
  @property(cc.Node) public ballHolder: cc.Node = null;
  @property(cc.Node)
  public ballSpawnCrl: BallSpawnerCrl;
  public isMouseDown: boolean = false;

  protected onLoad(): void {
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getCollisionManager().enabled = true;
    GameManager.Instance = this;
    this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
  }
  onMouseUp() {
    if (this.isMouseDown == true && this.list.length > 0) {
      this.isMouseDown = false;
      this.DestroySameType();
    }
  }
  public setBallSpawnerCtr(ballSpawnCrl) {
    this.ballSpawnCrl = ballSpawnCrl;
    if (this.ballSpawnCrl == null) return;
    this.schedule(() => {
      if (this.ballNumber >= 12) return;
      const randomValue = Math.floor(Math.random() * 4);
      const randomValue2 = Math.floor(Math.random() * 4) + 1;
      var newNode: cc.Node = this.ballSpawnCrl.BallSpawner.SpawnThing(
        this.ballSpawnCrl.BallPlace.spawnPlace[randomValue].position,
        this.ballSpawnCrl.BallSpawner.prefabsName + " " + randomValue2
      );
      this.ballNumber++;
      console.log(this.ballNumber);
    }, 0.2);
  }
  public ResetAllMark() {
    this.ballHolder.children.forEach((element) => {
      let ball = element.getComponent(Ball);
      ball.TurnOffHighlight(ball.highLightLevel[1]);
      ball.TurnOffHighlight(ball.highLightLevel[2]);
      ball.canGoTo = false;
      this.list.length = 0;
      this.rootNode = null;
    });
  }
  public DestroySameType() {
    if (this.list.length < 3) {
      this.ResetAllMark();
      return;
    }
    this.list.forEach((ball) => {
      ball.destroy();
      this.ballNumber--;
    });
    this.ResetAllMark();
  }
  AddToList(Ball: cc.Node) {
    if (this.list.includes(Ball)) return;
    this.list.push(Ball);
  }
  GetlastNodeInList() {
    return this.list[this.list.length - 1];
  }
  protected update(dt: number): void {}
}
