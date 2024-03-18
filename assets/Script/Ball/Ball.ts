// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Ball extends cc.Component {
  @property(Number) public ballIndex: number = 0;
  @property(cc.Node) public sameBallType: cc.Node[] = [];
  @property(Boolean) public canBeSelected: boolean = false; // dung im moi dc seleted
  @property(Boolean) public canGoTo: boolean = false; // node nay co the di den duoc
  @property(Boolean) public isOnList: boolean = false; //Node duoc chon dua vao list
  public rb: cc.RigidBody = null;
  public highLightLevel = { 1: "HighLight", 2: "HighLight2" };
  stationaryVelocityThreshold: number = 0.1;
  onLoad() {
    this.rb = this.node.getComponent(cc.RigidBody);
    this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);

    this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
  }
  onMouseDown(event: cc.Event.EventMouse): void {
    GameManager.Instance.isMouseDown = true;
    if (this.canBeSelected == false) return;
    if (GameManager.Instance.rootNode == null) {
      GameManager.Instance.rootNode = this.node;
      this.MarkCanGo();
      this.MarkWayGo();
    }
  }
  onMouseUp(event: cc.Event.EventMouse): void {
    GameManager.Instance.isMouseDown = false;
    GameManager.Instance.DestroySameType();
  }
  onMouseEnter(event: cc.Event.EventMouse): void {
    if (GameManager.Instance.isMouseDown == true) {
      if (GameManager.Instance.rootNode == null) return;
      if (
        GameManager.Instance.rootNode.getComponent(Ball).ballIndex !=
          this.ballIndex ||
        this.canGoTo == false
      ) {
        // GameManager.Instance.ResetAllMark();
        return;
      } else if (GameManager.Instance.list.includes(event.getCurrentTarget())) {
        console.log("SdsdS");
        GameManager.Instance.previousNode
          .getComponent(Ball)
          .ClearMarkCanGoOfThisBall();

        if (GameManager.Instance.list.length > 1) {
          GameManager.Instance.previousNode
            .getComponent(Ball)
            .TurnOffHighlight(this.highLightLevel[2]);
          GameManager.Instance.list.pop();
          GameManager.Instance.previousNode =
            GameManager.Instance.GetlastNodeInList();
          GameManager.Instance.previousNode.getComponent(Ball).MarkCanGo();
          // GameManager.Instance.ResetAllMark();
        } else {
          GameManager.Instance.previousNode =
            GameManager.Instance.GetlastNodeInList();
          GameManager.Instance.previousNode.getComponent(Ball).MarkCanGo();

          return;
        }
      } else {
        GameManager.Instance.previousNode
          .getComponent(Ball)
          .ClearMarkCanGoOfThisBall();
        this.MarkCanGo();
        this.MarkWayGo();
      }
    }
  }
  protected update(dt: number): void {
    if (this.rb) {
      const velocity = this.rb.linearVelocity;
      const velocityMagnitude = velocity.mag();

      if (velocityMagnitude < this.stationaryVelocityThreshold) {
        this.canBeSelected = true;
      } else {
        this.canBeSelected = false;
      }
    } else {
      console.log("RigidBody component not found.");
    }
  }
  public TurnOnHighlight(highLightLevel) {
    this.node.getChildByName(highLightLevel).active = true;
    this.node.getChildByName(highLightLevel).active = true;
  }
  public TurnOffHighlight(highLightLevel) {
    this.node.getChildByName(highLightLevel).active = false;
    this.node.getChildByName(highLightLevel).active = false;
  }
  // onTouchEnd(event: cc.Event.EventTouch) {
  //   if (this.canBeSelected == false) return;
  //   if (GameManager.Instance.rootNode == null) {
  //     GameManager.Instance.rootNode = this.node;
  //     this.MarkCanGo();
  //     this.MarkWayGo();
  //   } else {
  //     if (
  //       GameManager.Instance.rootNode.getComponent(Ball).ballIndex !=
  //         this.ballIndex ||
  //       this.canGoTo == false
  //     ) {
  //       GameManager.Instance.ResetAllMark();
  //       return;
  //     } else if (GameManager.Instance.previousNode === this.node) {
  //       // console.log("SdsdS");
  //       console.log(GameManager.Instance.list);

  //       GameManager.Instance.list.pop();
  //       if (GameManager.Instance.list.length <= 0) {
  //         GameManager.Instance.ResetAllMark();
  //         return;
  //       }
  //       GameManager.Instance.previousNode =
  //         GameManager.Instance.GetlastNodeInList();
  //       this.ClearMarkCanGoOfThisBall();
  //       this.TurnOffHighlight(this.highLightLevel[2]);
  //       GameManager.Instance.previousNode.getComponent(Ball).MarkCanGo();
  //     } else {
  //       GameManager.Instance.previousNode
  //         .getComponent(Ball)
  //         .ClearMarkCanGoOfThisBall();
  //       this.MarkCanGo();
  //       this.MarkWayGo();
  //     }
  //   }
  // }

  MarkCanGo() {
    this.canGoTo = true;

    this.sameBallType.forEach((element) => {
      element.getComponent(Ball).TurnOnHighlight(this.highLightLevel[1]);
      element.getComponent(Ball).canGoTo = true;
    });
  }
  ClearMarkCanGoOfThisBall() {
    this.TurnOffHighlight(this.highLightLevel[1]);
    this.sameBallType.forEach((element) => {
      element.getComponent(Ball).TurnOffHighlight(this.highLightLevel[1]);
      element.getComponent(Ball).canGoTo = false;
    });
  }
  MarkWayGo() {
    this.getComponent(Ball).TurnOnHighlight(this.highLightLevel[2]);
    GameManager.Instance.AddToList(this.node);
    this.isOnList = true;
    GameManager.Instance.previousNode = this.node;
  }
}
