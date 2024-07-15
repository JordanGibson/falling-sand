function createGrid(rows, cols) {
  let grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}

let resolution = 4;
let w, h, grid;

function setup() {
  createCanvas(400, 400);
  frameRate(40);

  w = width / resolution;
  h = height / resolution;

  grid = createGrid(h, w);
  grid[20][20] = 1;
  console.log(grid);
}

function draw() {
  background(220);
  noStroke();

  displayGrid();

  let newGrid = createGrid(h, w);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      newGrid[row][col] = grid[row][col];
    }
  }
  for (let row = grid.length - 2; row >= 0; row--) {
    for (let col = 0; col < grid[row].length; col++) {
      let state = grid[row][col];
      if (state == 1) {
        if (grid[row + 1][col] == 0) {
          newGrid[row + 1][col] = 1;
          newGrid[row][col] = 0;
        } else if (grid[row + 1][col - 1] == 0 && grid[row + 1][col + 1] == 0) {
          let offset = 1;
          if (random(1) < 0.5) {
            offset *= -1;
          }
          newGrid[row + 1][col + offset] = 1;
          newGrid[row][col] = 0;
        } else if (grid[row + 1][col - 1] == 0) {
          newGrid[row + 1][col - 1] = 1;
          newGrid[row][col] = 0;
        } else if (grid[row + 1][col + 1] == 0) {
          newGrid[row + 1][col + 1] = 1;
          newGrid[row][col] = 0;
        }
      }
    }
  }
  grid = newGrid;
}

function mouseDragged() {
  let x = Math.trunc(mouseX / resolution);
  let y = Math.trunc(mouseY / resolution);
  grid[y][x] = 1;
}

function displayGrid() {
  let cellSize = width / grid[0].length;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        fill(0); // Black
      } else {
        fill(255); // White
      }
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}
