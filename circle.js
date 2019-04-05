var PI = Math.PI;

exports.area = function(r) {
  return PI * r ** 2;
  // return PI * Math.pow(r, 2);
};

exports.circumference = function(r) {
  return 2 * PI * r;
};
