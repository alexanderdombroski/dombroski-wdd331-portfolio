const WIDTH = 700;
const HEIGHT = 400;
const MARGIN = 10;

let data = [{ x: 0, y: 0 }];

document.querySelector(".reset-btn").addEventListener("click", () => {
  data = [{ x: 0, y: 0 }];
  render();
});

const svg = d3.select(".graph");

const xScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([MARGIN, WIDTH - MARGIN]);

const yScale = d3
  .scaleLinear()
  .domain([-10, 10])
  .range([HEIGHT - MARGIN, MARGIN]);

// Horizontal axis (y=0)
svg
  .append("line")
  .attr("class", "axis-line")
  .attr("x1", MARGIN)
  .attr("x2", WIDTH - MARGIN)
  .attr("y1", yScale(0))
  .attr("y2", yScale(0));

// Add Labels
svg
  .append("text")
  .attr("x", MARGIN + 5) // left of axis
  .attr("y", yScale(10)) // top of y-scale
  .attr("text-anchor", "start")
  .attr("class", "svg-text svg-label-positive")
  .attr("dominant-baseline", "middle")
  .text("Good");
svg
  .append("text")
  .attr("x", MARGIN + 5) // left of axis
  .attr("y", yScale(-10)) // bottom of y-scale
  .attr("text-anchor", "start")
  .attr("class", "svg-text svg-label-negative")
  .attr("dominant-baseline", "middle")
  .text("Bad");
svg
  .append("text")
  .attr("x", xScale(9))
  .attr("y", HEIGHT / 2 - MARGIN + 20) // below x-axis
  .attr("class", "svg-text")
  .attr("text-anchor", "middle")
  .text("Time");

// Vertical reference line (x=0)
svg
  .append("line")
  .attr("class", "axis-line")
  .attr("x1", xScale(0))
  .attr("x2", xScale(0))
  .attr("y1", MARGIN)
  .attr("y2", HEIGHT - MARGIN);

const regressionPath = svg
  .append("path")
  .attr("class", "regression")
  .attr("fill", "none");

function computeRegression(data) {
  if (data.length < 1) return { slope: 0, intercept: 0 };

  const numerator = d3.sum(data, (d) => d.x * d.y);
  const denominator = d3.sum(data, (d) => d.x * d.x);

  const slope = denominator === 0 ? 0 : numerator / denominator;

  return { slope, intercept: 0 };
}

const drag = d3.drag().on("drag", (event, d) => {
  const [px, py] = d3.pointer(event, svg.node());

  d.x = xScale.invert(px);
  d.y = yScale.invert(py);

  d.x = Math.max(0, Math.min(10, d.x));
  d.y = Math.max(-10, Math.min(10, d.y));

  render();
});

function render() {
  const points = svg.selectAll(".point").data(data);

  points
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("r", 7)
    .merge(points)
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("fill", (d) => (d.y >= 0 ? "#10b981" : "#ef4444"))
    .call(drag);

  points.exit().remove();

  // Regression
  const { slope, intercept } = computeRegression(data);

  const xMin = -10;
  const xMax = 10;

  const lineData = [
    { x: xMin, y: slope * xMin + intercept },
    { x: xMax, y: slope * xMax + intercept },
  ];

  const lineGenerator = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  regressionPath
    .datum(lineData)
    .attr("d", lineGenerator)
    .attr("stroke-width", 2)
    .attr("stroke", slope >= 0 ? "#16a34a" : "#dc2626");

  document.getElementById("slope").textContent = slope.toFixed(3);
}

svg.on("click", function (event) {
  // Prevent click from firing after drag
  if (event.defaultPrevented) return;

  const [mx, my] = d3.pointer(event);

  const newPoint = {
    x: xScale.invert(mx),
    y: yScale.invert(my),
  };

  data.push(newPoint);
  render();
});

render();
