var cameraDirectionMovement = 0;
var updateCameraPosition = function (camera) {
    switch (cameraDirectionMovement) {
        case "left":
            var q = -0.1;
            var z = camera.position.z * Math.cos(q) - camera.position.x * Math.sin(q)
            var x = camera.position.z * Math.sin(q) + camera.position.x * Math.cos(q)
            camera.position.x = x
            camera.position.z = z;
            camera.lookAt(scene.position);
            break;
        case "right":
            var q = 0.1;
            var z = camera.position.z * Math.cos(q) - camera.position.x * Math.sin(q)
            var x = camera.position.z * Math.sin(q) + camera.position.x * Math.cos(q)
            camera.position.x = x
            camera.position.z = z;
            camera.lookAt(scene.position);
            break;
        case "up":
            camera.position.y += 10;
            camera.lookAt(scene.position);
            break;
        case "down":
            camera.position.y -= 10;
            camera.lookAt(scene.position);
            break;
    }

    camera.fov = document.getElementById("cameraFOV").value;
    camera.updateProjectionMatrix();

}

document.addEventListener("keydown", onKeyDown, false); // naciśnięcie dowolnego klawisza
function onKeyDown(onKeyDown) {
    var keyCode = event.which;
    switch (keyCode) {
        case 37: cameraDirectionMovement = "left"; break;
        case 38: cameraDirectionMovement = "up"; break;
        case 39: cameraDirectionMovement = "right"; break;
        case 40: cameraDirectionMovement = "down"; break;
    }
}
document.addEventListener("keyup", onKeyUp, false); // naciśnięcie dowolnego klawisza
function onKeyUp(onKeyUp) {
    var keyCode = event.which;
    if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) {
        cameraDirectionMovement = 0;
    }
}
