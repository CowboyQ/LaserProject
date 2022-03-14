window.ENEMIES = [];
window.FIRES = [];
function Level() {
    function Box(width, height, depth, imgTextureSrc) {
        var geometry = new THREE.BoxGeometry(width, height, depth);
        var faceMaterial = new THREE.MeshPhongMaterial({
            shininess: 0,
            side: THREE.DoubleSide,
            map: THREE.ImageUtils.loadTexture(imgTextureSrc),
        })

        this.mesh = new THREE.Mesh(geometry, faceMaterial);
        this.mesh.position.set(width / 2, height / 2, depth / 2);
        scene.add(this.mesh);

        this.setPosition = function (x, y, z) {
            this.mesh.position.set(width / 2 + x, height / 2 + y, depth / 2 + z);
        }
    }

    function FlatShape(width, deepth, imgTextureSrc) {

        var geometry = new THREE.PlaneBufferGeometry(width, deepth);

        var faceMaterial = new THREE.MeshPhongMaterial({
            shininess: 0,
            side: THREE.DoubleSide,
            map: THREE.ImageUtils.loadTexture(imgTextureSrc),
        })

        this.mesh = new THREE.Mesh(geometry, faceMaterial);
        this.mesh.rotateX(90 * (Math.PI / 180));
        this.mesh.material.map.repeat.set(width/128, deepth/128); //gęstość powtarzania
        this.mesh.material.map.wrapS = this.mesh.material.map.wrapT = THREE.RepeatWrapping; // powtarzanie w obu kierunkach
        this.mesh.position.set(0, 0, 0);
        scene.add(this.mesh);

        this.setPosition = function (x, y, z) {
            this.mesh.position.set((width / 2) + x, 0 + y, (deepth / 2) + z);
        }
    }

    this.create = function (JSONdata) {
        ENEMIES = [];
        var levels = JSONdata.levels;
        var wallsSize = JSONdata.walls;
        var size = JSONdata.size;

        for (var i = 0; i < levels.length; i++) {
            var type = levels[i].typ;
            switch (type) {
                case "Wall":
                    var wall = new Box(wallsSize.width, wallsSize.height, wallsSize.width, "mats/walls.jpg");
                    wall.setPosition(levels[i].z * wallsSize.width, 0, levels[i].x * wallsSize.width);
                    break;

                case "Light":
                    var position = {
                        x: levels[i].z * wallsSize.width,
                        y: wallsSize.height - 10,
                        z: levels[i].x * wallsSize.width,
                    };
                    break;
            }
        }

        var floor = new FlatShape(wallsSize.width * size.width, wallsSize.width * size.height, "mats/floor.jpg");
        floor.setPosition(0, 0, 0);

        var ceiling = new FlatShape(wallsSize.width * size.width, wallsSize.width * size.height, "mats/ceiling.png");
        ceiling.setPosition(0, wallsSize.height, 0);

    }
}
var level = new Level();