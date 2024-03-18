// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Spawner from "./Spawner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BallSpawner extends Spawner {
  public static Instance: BallSpawner = null;
  @property({ multiline: true }) public prefabsName: string = "Ball";
  protected onLoad(): void {
    BallSpawner.Instance = this;
  }

  // update (dt) {}
}
