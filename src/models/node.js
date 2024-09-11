class Node {
  id = null;
  x = 0;
  y = 0;
  constructor(x, y, id = null) {
    this.x = x;
    this.y = y;
    if (id != null) {
      this.id = id;
    }
  }
}

export default Node;
