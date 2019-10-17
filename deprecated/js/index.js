var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(64, 64);
document.getElementById('three').appendChild(renderer.domElement);

// add a camera
// THREE.PerspectiveCamera(fov, aspect, near, far)
var camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();

var light = new THREE.PointLight(0x5555FF);
light.position.set(20, 0, 10);
// var light2 = new THREE.PointLight(0xFF5555);
// light2.position.set(-20, 0, 10);

var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
var material2 = new THREE.LineBasicMaterial({ color: 0xff0000 });
var material3 = new THREE.LineBasicMaterial({ color: 0x000000});
var material4 = new THREE.LineBasicMaterial({ color: 0xff00ff });

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));
// geometry.vertices.push(new THREE.Vector3(-10, 0, 0));

var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(0, 0, -10));
geometry2.vertices.push(new THREE.Vector3(0, 10, 0));
geometry2.vertices.push(new THREE.Vector3(0, 0, 10));
// geometry2.vertices.push(new THREE.Vector3(0, 0, -10));

var geometry3 = new THREE.Geometry();
geometry3.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry3.vertices.push(new THREE.Vector3(0, -10, 0));
geometry3.vertices.push(new THREE.Vector3(10, 0, 0));
// geometry3.vertices.push(new THREE.Vector3(-10, 0, 0));

var geometry4 = new THREE.Geometry();
geometry4.vertices.push(new THREE.Vector3(0, 0, -10));
geometry4.vertices.push(new THREE.Vector3(0, -10, 0));
geometry4.vertices.push(new THREE.Vector3(0, 0, 10));
// geometry4.vertices.push(new THREE.Vector3(0, 0, -10));

var icosahedronGeometry = new THREE.IcosahedronGeometry(2, 0);
var icosahedronMaterial = new THREE.MeshNormalMaterial();
var icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
var verticePositions = [];
scene.add(icosahedron);


var line = new THREE.Line(geometry, material);
var line2 = new THREE.Line(geometry2, material2);
var line3 = new THREE.Line(geometry3, material3);
var line4 = new THREE.Line(geometry4, material4);

scene.add(light);
// scene.add(light2);
scene.add(line);
scene.add(line2);
scene.add(line3);
scene.add(line4);

function getOriginalVerticePositions() {
  // go through each vertice geometry and store their position in an array
  for (var i = 0, l = icosahedronGeometry.vertices.length; i<l; i++) {
    verticePositions.push({x: icosahedronGeometry.vertices[i].x, y: icosahedronGeometry.vertices[i].y});
  } 
}

function getNewVertices() {
  /* this function returns an array of vertice positions which are randomised
  from the original vertice position */
  var newVertices = [];
  for (var i = 0, l = icosahedronGeometry.vertices.length; i<l; i++) {
    newVertices[i] = {
      x: verticePositions[i].x -5 + Math.random()*10,
      y: verticePositions[i].y -5 + Math.random()*10
    }
  }
  return newVertices;
}

function tweenIcosahedron() {
  var newVerticePositions = getNewVertices();
  // tween each vertice to their new position
  for (var i = 0; i < icosahedronGeometry.vertices.length; i++) {
    tweenVertice(i, newVerticePositions);
  }
}

function tweenVertice(i, newVerticePositions) {
  // set the tween
  TweenLite.to(icosahedronGeometry.vertices[i], 1, {x: newVerticePositions[i].x, y: newVerticePositions[i].y, onComplete: function() {
    // start the icosahedron tween again now the animation is complete
    if (i === 0) tweenIcosahedron();
  }});
}

var animate = function () {
  requestAnimationFrame( animate );

  line.rotation.y += 0.02;
  line2.rotation.y += 0.02;
  line3.rotation.y += 0.02;
  line4.rotation.y += 0.02;

  icosahedron.rotation.y += 0.02;
  icosahedron.rotation.x += 0.02;

  renderer.render(scene, camera);
  icosahedronGeometry.verticesNeedUpdate = true;
};
animate();
getOriginalVerticePositions();
tweenIcosahedron();