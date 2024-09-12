class NodeGraph {
  id = null;
  x = 0;
  y = 0;
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    if (id != undefined) {
      this.id = id;
    }
  }
}

export default NodeGraph;
