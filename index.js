let option = {};
let container = {};
let count = 0;
const setGridStyle = (grid, portionX, portionY, wordColor) => {
  grid.style.setProperty("--x-portion", portionX);
  grid.style.setProperty("--y-portion", portionY);
  grid.style["display"] = "grid";
  grid.style["gridTemplateColumns"] = "repeat(var(--x-portion), 1fr)";
  grid.style["gridTemplateRows"] = "repeat(var(--y-portion), 1fr)";
  grid.style["overflow"] = "hidden";
  grid.style["gridAutoFlow"] = "dense";
  grid.style["cursor"] = "pointer";
  let style = document.createElement("style");
  style.innerText = `.wordfall-generator-cell{grid-column-start:span var(--cellsize);grid-row-start:span var(--cellsize);will-change:grid-row-start,grid-column-start}.wordfall-generator-cell::before{content:var(--word);display:block;text-align: center;margin:0 auto;height:100%;transition:all var(--second) cubic-bezier(0.45, 0.05, 0.55, 0.95);will-change:transform,opacity,font-size,color;font-size: calc(var(--cellsize) * 2vmax);color:var(--color);opacity:var(--opacity)}`;
  document.body.appendChild(style);
};
const setCellStyle = (cell, cellSize, word) => {
  cell.className = "wordfall-generator-cell";
  cell.style.setProperty("--word", `"${word}"`);
  cell.style.setProperty("--opacity", `${Math.random() + 0.2}`);
  cell.style.setProperty("--second", `${Math.random() * 0.5}s`);
  cell.style.setProperty("--cellsize", cellSize);
  cell.style.setProperty(
    "--color",
    `rgb(${Math.round(Math.random() * 190 + 20)}, 194, 154)`
  );
};
const createWordFall = ({
  el = "#app",
  gridSize = 30,
  cellSize = [1, 1, 3, 4],
  wordColor = "#eee",
  words = "庄汉祖敏王紫鸾余颖朱珀言万盛光李延钟梦露陈振彬"
}) => {
  option = {
    el,
    gridSize,
    cellSize,
    wordColor,
    words
  };
  words = typeof words === "string" ? words.split("") : words;
  let grid = (container = document.querySelector(`${el}`));
  let fragment = document.createDocumentFragment();
  // 计算横竖的份数
  const portionX = gridSize;
  const portionY = Math.round(
    grid.clientHeight / (grid.clientWidth / gridSize)
  );
  setGridStyle(grid, portionX, portionY, wordColor);
  count = portionX * portionY;
  let sizeArr = [];
  let sizeNum = 0;
  while (sizeNum <= count) {
    let size = cellSize[Math.round(Math.random() * (cellSize.length - 1))];
    sizeNum += size ** 2;
    sizeArr.push(size);
  }

  let cells = [];
  sizeArr.forEach((v, i) => {
    let cell = document.createElement("div");
    setCellStyle(
      cell,
      v,
      words[Math.round(Math.random() * (words.length - 1))]
    );
    cells.push(cell);
    fragment.appendChild(cell);
  });
  grid.appendChild(fragment);
  grid.onclick = () => {
    // container.innerHTML = "";
    // createWordFall(option);
    let sizeArr = [];
    let sizeNum = 0;
    while (sizeNum <= count) {
      let size = cellSize[Math.round(Math.random() * (cellSize.length - 1))];
      sizeNum += size ** 2;
      sizeArr.push(size);
    }
    cells.forEach((cell, i) => {
      setCellStyle(
        cell,
        sizeArr[i],
        option.words[Math.round(Math.random() * (option.words.length - 1))]
      );
    });
  };
};
export { createWordFall };
