import { AmbientLight } from "three"
import { Ground } from "./Entities/ground"
import { mobaWorldObject } from "./mobaWorld"
import { RigidBodyCube } from "./Entities/rigidBodyCube";
import { RotationSystem } from "./Systems/rotationSystem"
import { Rotating } from "./Components/c_rotating"
import { SimulatePhysicsSystem } from "./Systems/simulatePhysicsSystem"
import { SynchronizePhysicsSystem } from "./Systems/synchronizePhysicsSystem";
import { RigidBodyComponent } from "./Components/c_rigidBody";
import { InputControllerComponent } from "./Components/c_inputController";
import { CameraComponent } from "./Components/c_camera";
import { FPSInputSystem } from "./Systems/FPSInputSystem";
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
});



