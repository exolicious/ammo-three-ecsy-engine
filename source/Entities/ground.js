import { BoxBufferGeometry, Mesh, MeshPhongMaterial } from "three";
import { RigidBody } from "../Classes/rigidBody"
import { Vector3 } from "three"

class Ground {
    constructor(size=100) {
        this.size = size;
        this.entity = mobaWorld.createEntity();
        this.createGroundObject3D();
        this.initializeRigidBody();
    }
    
    createGroundObject3D() {
        const geometry = new BoxBufferGeometry(this.size, 1, this.size);
        const material = new MeshPhongMaterial();
        const plane = new Mesh(geometry, material);
        this.entity.addObject3DComponent(plane, window.mobaWorld.sceneEntity);
    }

    initializeRigidBody() {
        let object3D = this.entity.getObject3D();
        object3D.position.set(0,0,0)
        console.log(object3D.position);
        this.rigidBody = new RigidBody();
        this.rigidBody.createBox(0, object3D.position, object3D.quaternion, new Vector3(this.size, 1, this.size));
        this.rigidBody.setRestitution(0.25);
        this.rigidBody.setFriction(1);
        this.rigidBody.setRollingFriction(5);
        window.mobaWorld.physicsWorld.addRigidBody(this.rigidBody.body);
    }
}

export { Ground }