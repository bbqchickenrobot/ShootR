﻿function Ship(rotateLeft, forward, rotateRight, backward, fire, bullet_manager, conn) {
    var that = this,
        lastShot = new Date(),
        keyMapping = new Array();

    keyMapping.push({ key: rotateLeft, dir: "RotatingLeft" });
    keyMapping.push({ key: rotateRight, dir: "RotatingRight" });
    keyMapping.push({ key: forward, dir: "Forward" });
    keyMapping.push({ key: backward, dir: "Backward" });

    // Mapping each hot key to its corresponding movement direction
    for (k = 0; k < keyMapping.length; k++) {
        shortcut.add(keyMapping[k].key, (function (k) {
            return function () {
                if (!that.MovementController.Moving[keyMapping[k].dir]) {
                    conn.registerMoveStart(keyMapping[k].dir);
                    that.MovementController.Moving[keyMapping[k].dir] = true;
                }
            };
        })(k), { 'disable_in_input': true, 'type': 'keydown' });

        shortcut.add(keyMapping[k].key, (function (k) {
            return function () {
                conn.registerMoveStop(keyMapping[k].dir);
                that.MovementController.Moving[keyMapping[k].dir] = false;
            };
        })(k), { 'disable_in_input': true, 'type': 'keyup' });
    }

    function shoot() {
        var diff = new Date();
        diff.setTime(diff - lastShot);

        if (diff.getTime() > that.FIRE_RATE) {
            lastShot = new Date();

            conn.fire();
        }
    }

    shortcut.add(fire, function () {
        shoot();
    });
}

Ship.prototype = new ShipVehicle();