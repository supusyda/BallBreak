// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Ball from "./Ball";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BallDetect extends cc.Component {
  public thisBall: Ball = null;
  public collider: cc.CircleCollider;
  protected onLoad(): void {
    this.collider = this.getComponent(cc.CircleCollider);
    this.thisBall = this.node.parent.getComponent(Ball);
  }
  protected update(dt: number): void {
    // console.log(this.node.position.x + " " + this.node.position.y);
  }
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {
    var otherBall = other.node.parent.getComponent(Ball);

    if (otherBall.ballIndex == this.thisBall.ballIndex) {
      this.thisBall.sameBallType.push(other.node.parent);
      
    }
  }
  onCollisionExit(other: cc.Collider, self: cc.Collider) {
    var otherBall = other.node.parent.getComponent(Ball);

    if (otherBall.ballIndex == this.thisBall.ballIndex) {
      let indexOfRemove = this.thisBall.sameBallType.indexOf(other.node.parent);
      if (indexOfRemove !== -1) {
        // Remove the value from the array using splice
        this.thisBall.sameBallType.splice(indexOfRemove, 1);
      }
    }
  }
  // update (dt) {}
}
