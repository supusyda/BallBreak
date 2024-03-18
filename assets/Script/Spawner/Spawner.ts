// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Spawner extends cc.Component {
  @property(cc.Node) prefabs: cc.Node[] = [];
  @property(cc.Node) holder: cc.Node = null;

  protected LoadHolder() {
    if (this.holder != null) return;
    this.holder = this.node.getChildByName("Holder");
  }
  protected LoadPrefabs() {
    this.node.getChildByName("Prefabs").children.forEach((element) => {
      this.prefabs.push(element);
    });
  }
  protected GetPrefabByName(prefabName: string): cc.Node {
    let targetPrefab: cc.Node = null;
    this.prefabs.forEach((prefab) => {
      if (prefab.name == prefabName) {
        targetPrefab = prefab;
      }
    });

    return targetPrefab;
  }
  public SpawnThing(spawnPos: cc.Vec3, prefabName: string): cc.Node {
    let prefab = this.GetPrefabByName(prefabName);
    if (prefab == null) return null;
    let newNode: cc.Node = cc.instantiate(prefab);
    newNode.active = true;
    newNode.position = spawnPos;
    newNode.parent = this.holder;
    return newNode;
  }
  protected start(): void {
    this.LoadHolder();
    this.LoadPrefabs();
  }
}
