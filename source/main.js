import { AmbientLight } from "three"
import { Ground } from "./Entities/ground"
import { mobaWorldObject } from "./mobaWorld"
import { RotatingCube } from "./Entities/rotatingCube";
import { RigidBodyRotatingCube } from "./Entities/rigidBodyRotatingCube";
import { RotationSystem } from "./Systems/rotationSystem"
import { Rotating } from "./Components/c_rotating"
import { SimulatePhysicsSystem } from "./Systems/simulatePhysicsSystem"
import { SynchronizePhysicsSystem } from "./Systems/synchronizePhysicsSystem";
import { RigidBodyComponent } from "./Components/c_rigidBody";

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
    window.mobaWorld.registerComponent(RigidBodyComponent);
    window.mobaWorld.registerSystem(RotationSystem);
    window.mobaWorld.registerSystem(SimulatePhysicsSystem);
    window.mobaWorld.registerSystem(SynchronizePhysicsSystem);
    window.mobaWorld.camera.position.set(0,5,10);
    
    let ground = new Ground();
    let rotatingCube = new RotatingCube(5);
    let rigidRotatingCube = new RigidBodyRotatingCube(5);
    rigidRotatingCube.entity.getObject3D().position.set(0,10,0);


    let ambientLight = new AmbientLight();
    window.mobaWorld.scene.add(ambientLight);
    

});



