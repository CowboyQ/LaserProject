var modelMesh;
function Player(x, y, z) {
    var Player = this;
    var modelMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("mats/eva01.png"),
        morphTargets: true,
    });
    var loader = new THREE.JSONLoader();

    var modelMixer;
    loader.load('scripts/playerModelInf.js', function (geometry) {
        modelMesh = new THREE.Mesh(geometry, modelMaterial)
        modelMesh.name = "pat";
        modelMesh.position.x = x;
        modelMesh.position.y = y;
        modelMesh.position.z = z;
        modelMesh.scale.set(1, 1, 1); // ustaw skale modelu
        scene.add(modelMesh); 
        modelMixer = new THREE.AnimationMixer(modelMesh);
    });

    this.setPosition = function (x, y, z) {
        try {
            modelMesh.position.x = x;
            modelMesh.position.y = y;
            modelMesh.position.z = z;
            set = true;
        }
        catch (e) { }
    }

    var PLAYER_ANIM = {
        MOVING: "run",
        STAND: "stand",
    }

    var animation = {
        current: PLAYER_ANIM.STAND,
        previous: undefined,
        needUpdate: false,
        clock: new THREE.Clock(),
    }
    this.animationUpdate = function () {
        var delta = animation.clock.getDelta();
        if (animation.needUpdate) {
            modelMixer.clipAction(animation.previous).stop();
            modelMixer.clipAction(animation.current).play();
            animation.needUpdate = false;
        }
        if (modelMixer) { modelMixer.update(delta) }
    }

    this.changeAnimation = function (animationName) {
        animation.previous = animation.current;
        animation.current = animationName
        animation.needUpdate = true;
    }

    var playerMove = {
        left: null,
        right: null,
        forward: null
    }
    this.goLeft = function (onOff) {
        playerMove.left = onOff;
    }
    this.goRight = function (onOff) {
        playerMove.right = onOff;
    }
    this.goForward = function (onOff) {
        if (onOff && !playerMove.forward) {
            this.changeAnimation(PLAYER_ANIM.MOVING);
        }
        if (!onOff) {
            this.changeAnimation(PLAYER_ANIM.STAND);
        }
        playerMove.forward = onOff;
    }
    this.move = function () {
        if (playerMove.forward) {
            modelMesh.translateX(-2);
            if (lasercount == 1) {
                laser.translateX(-2);
            }
            console.log(modelMesh.position.x);
            console.log(modelMesh.position.z);
        }
        if (playerMove.left) {
            modelMesh.rotation.y += 0.05;
            if (lasercount == 1) {
                console.log("LASERTURN");
                var q = 0.025;
                var z = laser.position.z * Math.cos(q) - laser.position.x * Math.sin(q)
                var x = laser.position.z * Math.sin(q) + laser.position.x * Math.cos(q)
                laser.position.x = x;
                laser.position.z = z;
                laser.lookAt(modelMesh);
                laser.rotateY(Math.PI / 2);
            }
            //POINT_B.rotation.y += 0.05;
        }
        if (playerMove.right) {
            modelMesh.rotation.y -= 0.05;
            if (lasercount == 1) {
                var q = -0.025;
                var z = laser.position.z * Math.cos(q) - laser.position.x * Math.sin(q)
                var x = laser.position.z * Math.sin(q) + laser.position.x * Math.cos(q)
                laser.position.x = x;
                laser.position.z = z;
                laser.lookAt(modelMesh);
                laser.rotateY(Math.PI / 2);
            }
        }
    }
    /*
    this.shoot = function (onOff) {
        var subVectors = function (v1, v2) {
            var subV = new THREE.Vector3(
                v1.x - v2.x,
                v1.y - v2.y,
                v1.z - v2.z
            )
            return subV
        }
        //PARTICLES ARRAY
        var particles = new THREE.Geometry()

        //PARTICLES MATERIAL
        var particleMaterial = new THREE.PointsMaterial(
            {
                color: 0x5555ff,
                size: 100, // ta wartoœc zmieniamy suwakiem skali
                map: THREE.ImageUtils.loadTexture("mats/particle.png"), // grafika zapewniaj¹ca "okr¹g³y" kszta³t cz¹steczki
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
                opacity: 0.6
            });

        //BEGIN/END
        var cokolwiek = window.Player;
        
        var pPos = levelData.getPlayerPosition();
        var playerx = pPos.x;
        var playery = pPos.y;
        var playerz = pPos.z;
        console.log(playerx);
        var POINT_A = new THREE.Vector3(playerx, playery, playerz);
        var POINT_B = new THREE.Vector3(playerx + 200, playery, playerz);

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

        //return particles;
        console.log(lasercount);
        if (onOff = true && lasercount != 1) {
            return particleSystem;
        }
        else {
            console.log("koniec");
        }
    }
    */
    this.cameraFollowPlayer = function (camera, x, y, z) {
        try {
            var camVect = new THREE.Vector3(x, y, z);
            var camPos = camVect.applyMatrix4(modelMesh.matrixWorld);
            camera.position.x = camPos.x
            camera.position.y = camPos.y
            camera.position.z = camPos.z
            camera.lookAt(modelMesh.position)
        }
        catch(e){}
    }
}