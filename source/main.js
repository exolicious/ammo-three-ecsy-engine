import { AmbientLight } from "three"
import { Ground } from "./Entities/ground"
import { mobaWorldObject } from "./mobaWorld"

import { RotationSystem } from "./Systems/rotationSystem"
import { SimulatePhysicsSystem } from "./Systems/simulatePhysicsSystem"
import { SynchronizePhysicsSystem } from "./Systems/synchronizePhysicsSystem";
import { FPSInputSystem } from "./Systems/FPSInputSystem";

import { Rotating } from "./Components/rotatingComponent"
import { RigidBodyComponent } from "./Components/rigidBodyComponent";
import { InputControllerComponent } from "./Components/inputControllerComponent";
import { CameraComponent } from "./Components/cameraComponent";

import { RigidBodyCube } from "./Entities/rigidBodyCube";
import { FPSCamera } from "./Entities/fpsCamera"
 

window.mobaWorld = mobaWorldObject;

Ammo().then((Ammojs) => {
    window.mobaWorld.physicsWorld.collisionConfiguration = new Ammojs.btDefaultCollisionConfiguration();
    window.mobaWorld.physicsWorld.dispatcher = new Ammojs.btCollisionDispatcher(mobaWorld.physicsWorld.collisionConfiguration);
    window.mobaWorld.physicsWorld.broadphase = new Ammojs.btDbvtBroadphase();
    window.mobaWorld.physicsWorld.solver = new Ammojs.btSequentialImpulseConstraintSolver();
    window.mobaWorld.physicsWorld = new Ammojs.btDiscreteDynamicsWorld(mobaWorld.physicsWorld.dispatcher, mobaWorld.physicsWorld.broadphase, mobaWorld.physicsWorld.solver, mobaWorld.physicsWorld.collisionConfiguration);
    window.mobaWorld.physicsWorld.setGravity(new Ammojs.btVector3(0, -100, 0));
    window.mobaWorld.physicsWorld.tmpTransform =  new Ammo.btTransform();

    let element = document.getElementById("fullscreen");
    element.addEventListener("click", initializeWorld);
});

function initializeWorld() {
    window.mobaWorld.renderer.domElement.requestFullscreen()
        .then(function() {
            // pointer lock event listener
            window.mobaWorld.renderer.domElement.requestPointerLock = window.mobaWorld.renderer.domElement.requestPointerLock ||
            window.mobaWorld.renderer.domElement.mozRequestPointerLock;
            window.mobaWorld.renderer.domElement.requestPointerLock();

            // Hook pointer lock state change events for different browsers
            document.addEventListener('pointerlockchange', init, false);
            document.addEventListener('mozpointerlockchange', init, false);
        })
        .catch(function(error) {
            // element could not enter fullscreen mode
        });
}

function init() {
    if (document.pointerLockElement === window.mobaWorld.renderer.domElement || document.mozPointerLockElement === window.mobaWorld.renderer.domElement) {
        console.log('The pointer lock status is now locked');

        window.mobaWorld.registerComponent(Rotating);
        window.mobaWorld.registerComponent(InputControllerComponent);
        window.mobaWorld.registerComponent(RigidBodyComponent);
        window.mobaWorld.registerComponent(CameraComponent);
        window.mobaWorld.registerSystem(FPSInputSystem);
        window.mobaWorld.registerSystem(RotationSystem);
        window.mobaWorld.registerSystem(SimulatePhysicsSystem);
        window.mobaWorld.registerSystem(SynchronizePhysicsSystem);

        window.mobaWorld.camera.position.set(0,5,10);
        new FPSCamera(window.mobaWorld.camera);

        let ground = new Ground();
        let rigidRotatingCube = new RigidBodyCube(5);
        rigidRotatingCube.entity.getObject3D().position.set(0,10,0);
        let ambientLight = new AmbientLight();
        window.mobaWorld.scene.add(ambientLight);

    } else {
        console.log('The pointer lock status is now unlocked');
        
    }
  }


