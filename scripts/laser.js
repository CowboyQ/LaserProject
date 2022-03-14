var subVectors = function (v1, v2) {
    var subV = new THREE.Vector3(
        v1.x - v2.x,
        v1.y - v2.y,
        v1.z - v2.z
    )
    return subV
}

var Laserek = function () {
    //PARTICLES ARRAY
    var particles = new THREE.Geometry()

    //PARTICLES MATERIAL
    var particleMaterial = new THREE.PointsMaterial(
        {
            color: 0x5555ff,
            size: 100, // ta wartośc zmieniamy suwakiem skali
            map: THREE.ImageUtils.loadTexture("mats/particle.png"), // grafika zapewniająca "okrągły" kształt cząsteczki
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            opacity: 0.6
        });

    //BEGIN/END
    var pPos = levelData.getPlayerPosition();
    var playerx = modelMesh.position.x;
    var playery = modelMesh.position.y;
    var playerz = modelMesh.position.z;
    var playerRotY = modelMesh.rotation.y;
    var rot = playerRotY % 6;
    if(rot > 3 && rot < 6) rot = rot - 6;
    console.log(rot);
    //console.log(playerx);

    var POINT_A = new THREE.Vector3(playerx - 200, playery, playerz);
    var POINT_B = new THREE.Vector3(playerx, playery, playerz);
    //PARTICLES AMOUNT
    var PARTICLES_AMOUNT = 100;
    console.log(PARTICLES_AMOUNT);
    //CREATING PARTICLES
    var subV = subVectors(POINT_B, POINT_A);
    var stepV = subV.divideScalar(PARTICLES_AMOUNT);
    for (var i = 0; i < PARTICLES_AMOUNT; i++) {
        var particle = new THREE.Vector3(
            POINT_A.x + stepV.x * i,
            POINT_A.y + stepV.y * i,
            POINT_A.z + stepV.z * i)
        particles.vertices.push(particle);
    }

    //CREATING PARTICLE SYSTEM
    var particleSystem = new THREE.Points(particles, particleMaterial);
    console.log(lasercount);
    //return particles;
    if (lasercount == 0) {
        lasercount = 1;
        return particleSystem;
        
    }
    else {
        console.log("koniec");
    }
}
/*
var laserupdate = function (laser, camera) {
    var laseraDirectionMovement = 0;
    switch (laserDirectionMovement) {
        case "left":
            var q = -0.1;
            var z = laser.position.z * Math.cos(q) - laser.position.x * Math.sin(q)
            var x = laser.position.z * Math.sin(q) + laser.position.x * Math.cos(q)
            laser.position.x = x
            laser.position.z = z;
            camera.lookAt(scene.position);
            break;
        case "right":
            var q = 0.1;
            var z = laser.position.z * Math.cos(q) - laser.position.x * Math.sin(q)
            var x = laser.position.z * Math.sin(q) + laser.position.x * Math.cos(q)
            laser.position.x = x
            laser.position.z = z;
            camera.lookAt(scene.position);
            break;

            laser.updateProjectionMatrix();
}
*/
/*
function shoot() {
    //PARTICLES ARRAY
    var particles = new THREE.Geometry()

    //PARTICLES MATERIAL
    var particleMaterial = new THREE.PointsMaterial(
        {
            color: 0x5555ff,
            size: 100, // ta wartośc zmieniamy suwakiem skali
            map: THREE.ImageUtils.loadTexture("img/particle.png"), // grafika zapewniająca "okrągły" kształt cząsteczki
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            opacity: 0.6
        });

    //BEGIN/END
    var pPos = levelData.getPlayerPosition();
    var playerx = pPos.x;
    var playery = pPos.y;
    var playerz = pPos.z;
    console.log(playerx);
    var POINT_A = new THREE.Vector3(playerx, playery, playerz);
    var POINT_B = new THREE.Vector3(playerx + 200, playery, playerz);

    //PARTICLES AMOUNT
    var PARTICLES_AMOUNT = POINT_A.distanceTo(POINT_B);
    console.log(PARTICLES_AMOUNT);
    //CREATING PARTICLES
    var subV = subVectors(POINT_B, POINT_A);
    var stepV = subV.divideScalar(PARTICLES_AMOUNT);
    for (var i = 0; i < PARTICLES_AMOUNT; i++) {
        var particle = new THREE.Vector3(
            POINT_A.x + stepV.x * i,
            POINT_A.y + stepV.y * i,
            POINT_A.z + stepV.z * i)
        particles.vertices.push(particle);
    }

    //CREATING PARTICLE SYSTEM
    this.particleSystem = new THREE.Points(particles, particleMaterial);

    //return particles;
    //return particleSystem;
}
*/