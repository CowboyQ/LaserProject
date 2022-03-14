var scene;
var lasercount = 0;
var laser;
window.addEventListener("load", function () {
    var CAMERA_POS = {
        x: 150,
        y: document.getElementById("cameraY").value,
        z: document.getElementById("cameraZ").value,
    }
    document.getElementById("cameraY").oninput = function () {
        CAMERA_POS.y = this.value;
    }
    document.getElementById("cameraZ").oninput = function () {
        CAMERA_POS.z = this.value;
    }
    scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    //renderer.setClearColor(document.getElementById("sceneColor").value);
    var width, height;
    width = document.getElementById("scene").offsetWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
    var camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1, 
        10000 
    );
    var light = new THREE.AmbientLight(0xf0f0f0, 0.7);
    scene.add(light);

    document.getElementById("scene").appendChild(renderer.domElement);

    var pPos = levelData.getPlayerPosition(); //player
    window.player = new Player(pPos.x, pPos.y, pPos.z);

    //laser = new Laser();
    //scene.add(laser);

    document.body.addEventListener("keydown", function (e) { //poruszanie
        var keysPressed = {};
        var KEY = e.key;
        var KEYv = KEY.toUpperCase();
        keysPressed[e.KEYv] = true;
        /*
        if(keysPressed[87] == true){
            //player.goForward(true);
            if(keysPressed[127] == true){
                player.goForwardL(true);
            }
            else{
                player.goForward(true);
            }
        }
        */
        if(KEYv == "W"){
            player.goForward(true);
            //laserupdate(laser, 0);
                
        }
        if(KEYv == "A"){
            player.goLeft(true);
            //laserupdate(laser, -1);
        }
        if(KEYv == "D"){
            player.goRight(true);
            //laserupdate(laser, 1);
        }
        if(KEYv == " "){
            if (lasercount == 0) {
                    laser = new Laserek();
                    scene.add(laser);
                    lasercount = 1;
                }
                else {
                    console.log("nope");
                }
        }
        /*
        switch (KEY.toUpperCase()) {
            case "W": player.goForward(true); break;
            case "A": player.goLeft(true); break;
            case "D": player.goRight(true); break;
            case " ": {
                //player.shoot(true);
                if (lasercount == 0) {
                    laser = new Laserek();
                    scene.add(laser);
                    lasercount = 1;
                }
                else {
                    console.log("nope");
                }
                break;
            }
        }
        */
    }, false)
    document.body.addEventListener("keyup", function (e) {
        var KEY = e.key;
        switch (KEY.toUpperCase()) {
            case "W": player.goForward(false); break;
            case "A": player.goLeft(false); break;
            case "D": player.goRight(false); break;
            case " ": {
                lasercount = 0;
                scene.remove(laser);
                break;
            }
        }
    }, false)

    level.create(levelData.getLevelData());

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    function animateScene() {
        stats.begin();
        //renderer.setClearColor(document.getElementById("sceneColor").value);
        updateCameraPosition(camera);
        laserupdate(laser)
        player.cameraFollowPlayer(camera, CAMERA_POS.x, CAMERA_POS.y, CAMERA_POS.z);
        player.animationUpdate();
        player.move();

        for (var i = 0; i < ENEMIES.length; i++) { //animacje enemy
            ENEMIES[i].animationUpdate();
        }

        requestAnimationFrame(animateScene);
        renderer.render(scene, camera);
        stats.end();
    }
    animateScene();

})