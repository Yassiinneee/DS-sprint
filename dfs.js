class NearestPickupFinder {
  constructor(grid, blockedCells = [], batteryLimit = null) {
    this.grid = grid;
    this.blockedCells = new Set(blockedCells.map(cell => cell.join(',')));
    this.batteryLimit = batteryLimit;
    this.rows = grid.length;
    this.cols = grid[0].length;
    this.start = null;
    this.pickups = [];
    this.findStartAndPickups();
  }
  // Find the start (S) and pickup (P) positions in the grid

  findStartAndPickups() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j] === 'S') {
          this.start = [i, j];
        } else if (this.grid[i][j] === 'P') {
          this.pickups.push([i, j]);
        }
      }
    }
  }
  // Check if a cell is blocked (either a wall or in the blocked list)

  isBlocked(x, y) {
    return this.grid[x][y] === '#' || this.blockedCells.has(`${x},${y}`);
  }

    // BFS: Find the shortest path from S to the nearest P

  bfs() {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const queue = [[...this.start, 0]];
    const visited = new Set([this.start.join(',')]);
    const parent = {};
    parent[this.start.join(',')] = null;

    while (queue.length > 0) {
      const [x, y, dist] = queue.shift();

            // Check if current cell is a pickup point

      if (this.pickups.some(p => p[0] === x && p[1] === y)) {
        // Reconstruct path
        const path = [];
        let current = [x, y];
        while (current !== null) {
          path.push(current);
          current = parent[current.join(',')] ? parent[current.join(',')].split(',').map(Number) : null;
        }
        path.reverse();
        return { distance: dist, path };
      }

            // Explore all 4-directional neighbors

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < this.rows && ny >= 0 && ny < this.cols) {
          const key = `${nx},${ny}`;
          if (!visited.has(key) && !this.isBlocked(nx, ny)) {
            visited.add(key);
            parent[key] = [x, y].join(',');
            queue.push([nx, ny, dist + 1]);
          }
        }
      }
    }
    return { distance: -1, path: [] };
  }

  // DFS: Count all reachable cells from S

  dfs() {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const stack = [this.start];
    const visited = new Set([this.start.join(',')]);
    let count = 0;

    while (stack.length > 0) {
      const [x, y] = stack.pop();
      count++;
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < this.rows && ny >= 0 && ny < this.cols) {
          const key = `${nx},${ny}`;
          if (!visited.has(key) && !this.isBlocked(nx, ny)) {
            visited.add(key);
            stack.push([nx, ny]);
          }
        }
      }
    }
    return count;
  }

  // Solve: Run BFS and DFS, then print results

  solve() {
    const { distance, path } = this.bfs();
    const reachable = this.dfs();

    console.log("Grid:");
    this.grid.forEach(row => console.log(row.join('')));

    if (distance === -1) {
      console.log("No path to any pickup.");
    } else {
      console.log(`Nearest pickup distance: ${distance}`);
      console.log(`Path: ${JSON.stringify(path)}`);
      if (this.batteryLimit !== null && distance > this.batteryLimit) {
        console.log("Not possible with current battery.");
      }
    }
    console.log(`Reachable zone size: ${reachable}`);
  }
}

// Example usage
const grid = [
  ['S', '.', '.', '.', '#'],
  ['.', '#', '.', '.', '.'],
  ['.', '.', 'P', '.', '.'],
  ['.', '.', '.', 'P', '.']
];
const blockedCells = [[0, 4], [1, 1]];
const batteryLimit = 5;

const finder = new NearestPickupFinder(grid, blockedCells, batteryLimit);
finder.solve();
