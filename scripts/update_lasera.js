function laserupdate(laser, direction) {
    //var laserDirectionMovement = 0;
    switch (direction) {
        case -1:
            var q = -0.2;
            var z = laser.position.z * Math.cos(q) - laser.position.x * Math.sin(q)
            var x = laser.position.z * Math.sin(q) + laser.position.x * Math.cos(q)
            laser.position.x = x;
            laser.position.z = z;
            laser.rotateY(Math.PI / 2);
            //camera.lookAt(scene.position);
            break;
        case 1:
            var q = 0.2;
            var z = laser.position.z * Math.cos(q) - laser.position.x * Math.sin(q)
            var x = laser.position.z * Math.sin(q) + laser.position.x * Math.cos(q)
            laser.position.x = x
            laser.position.z = z;
            laser.rotateY(Math.PI / 2);
            //camera.lookAt(scene.position);
            break;

        laser.updateProjectionMatrix();
    }
}