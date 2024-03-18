// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpawnPoint extends cc.Component {
  @property(cc.Node) public spawnPlace: cc.Node[] = [];
  LoadSpawnPlace() {
    this.node.children.forEach((element) => {
      this.spawnPlace.push(element);
    });
    // console.log("SpawnPlace", this.spawnPlace);
  }
  protected onLoad(): void {
    this.LoadSpawnPlace();
  }
}
