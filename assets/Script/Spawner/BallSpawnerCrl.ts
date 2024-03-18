// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../GameManager";
import BallSpawnerPlace from "./BallSpawnPlace";
import BallSpawner from "./BallSpawner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BallSpawnerCrl extends cc.Component {
  public BallSpawner: BallSpawner;
  public BallPlace: BallSpawnerPlace;
  LoadBallSpawner() {
    this.BallSpawner = this.node.getComponent(BallSpawner);
  }
  LoadBallPlace() {
    this.BallPlace = this.node.getComponentInChildren(BallSpawnerPlace);

  }
  protected start(): void {
    this.LoadBallPlace();
    this.LoadBallSpawner();
    GameManager.Instance.setBallSpawnerCtr(this);
  }
  
}
