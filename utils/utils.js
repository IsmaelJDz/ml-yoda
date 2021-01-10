/**
 *
 * @param {*} cordSateliteX
 * @param {*} cordSateliteY
 * TO:DO calculate the distance of point to point
 */

const getLocalization = function (cordSateliteX, cordSateliteY) {
  const RebelAllianceShip = {
    x: -500,
    y: 300,
  };

  const x = RebelAllianceShip.x - cordSateliteX;
  const y = RebelAllianceShip.y - cordSateliteY;

  return Math.sqrt(x * x + y * y);
};

/**
 *
 * @param {*} messages --> type Array
 * TO:DO Find the real message
 */

const getMessage = messages => {
  let messageFinal = [];
  let newArray = [];
  let count = 0;

  for (let index = 0; index < messages.length; index++) {
    const element = messages[index];
    messageFinal.push(element[index]);
    count++;
    for (let y = 0; y < element.length; y++) {
      if (element[y]) {
        newArray.push(element[y]);
      }
    }
    const checkArrays = messageFinal.indexOf(newArray[count]) !== -1;
    if (!checkArrays) {
      messageFinal.push(newArray[count]);
    }
  }

  const msg = messageFinal.splice(1, 1);
  messageFinal.splice(-1, 0, msg.toString());

  return messageFinal.join(" ");
};

/**
 * Example message data
 */

// console.log(
//   getMessage([
//     ["Este", "", "", "mensaje", ""],
//     ["", "es", "", "", "secreto"],
//     ["Este", "", "un", "", ""],
//   ]),
// );

var sqr = function (a) {
  return Math.pow(a, 2);
};
var vector = function (x, y) {
  return {
    x: x,
    y: y,
  };
};

/**
 *
 * @param {*} satellite : Array with coordinates and distance in Object
 * TO:DO calculate te coordinates given three coordinates
 */

const calculate = (distanceOne, distanceTwo, distanceThree) => {
  var satellite = [
    { x: -500, y: -200, distance: distanceOne },
    { x: 100, y: -100, distance: distanceTwo },
    { x: 500, y: 100, distance: distanceThree },
  ];

  var j, k, x, y;
  if (satellite.length < 3) {
    console.error("Error! Please add at least three satellite!");
    return vector(0, 0);
  }
  k =
    (sqr(satellite[0].x) +
      sqr(satellite[0].y) -
      sqr(satellite[1].x) -
      sqr(satellite[1].y) -
      sqr(satellite[0].distance) +
      sqr(satellite[1].distance)) /
      (2 * (satellite[0].y - satellite[1].y)) -
    (sqr(satellite[0].x) +
      sqr(satellite[0].y) -
      sqr(satellite[2].x) -
      sqr(satellite[2].y) -
      sqr(satellite[0].distance) +
      sqr(satellite[2].distance)) /
      (2 * (satellite[0].y - satellite[2].y));
  j =
    (satellite[2].x - satellite[0].x) / (satellite[0].y - satellite[2].y) -
    (satellite[1].x - satellite[0].x) / (satellite[0].y - satellite[1].y);
  x = k / j;
  y =
    ((satellite[1].x - satellite[0].x) / (satellite[0].y - satellite[1].y)) *
      x +
    (sqr(satellite[0].x) +
      sqr(satellite[0].y) -
      sqr(satellite[1].x) -
      sqr(satellite[1].y) -
      sqr(satellite[0].distance) +
      sqr(satellite[1].distance)) /
      (2 * (satellite[0].y - satellite[1].y));
  return vector(x, y);
};

//# Creating three satellite
// var satellite = [
//   { x: -500, y: -200, distance: 100 },
//   { x: 100, y: -100, distance: 115.5 },
//   { x: 500, y: 100, distance: 142.7 },
// ];

//# Start Calculation
//var pos = calculate(satellite);

// console.log("X: " + pos.x + "; Y: " + pos.y); // X: 7; Y: 6.5
// console.log((position = { x: pos.x, y: pos.y }));

module.exports = {
  calculate,
  getMessage,
};
