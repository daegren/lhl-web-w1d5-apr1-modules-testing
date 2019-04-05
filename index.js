var circle = require("./circle");
var add = require("./add");

console.log("circle", circle);
console.log("add", add);

console.log(
  "The area of a circle with a radius of 4 is:",
  circle.area(4).toFixed(2)
);

console.log(
  "The circumference of a circle with a radius of 4 is:",
  circle.circumference(4).toFixed(2)
);

console.log("2 + 2 = ", add(2, 2));
