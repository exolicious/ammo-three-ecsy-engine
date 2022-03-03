import { BoxBufferGeometry, Mesh, MeshPhongMaterial } from "three";
import { RigidBody } from "../Classes/rigidBody"
import { Vector3, Color } from "three"

class Ground {
    constructor(size=100) {
        this.size = size;
        this.entity = window.mobaWorld.createEntity();
        this.createGroundObject3D();
        this.initializeRigidBody();
    }
    
    createGroundObject3D() {
        const geometry = new BoxBufferGeometry(this.size, 1, this.size);
        const material = new MeshPhongMaterial({color: new Color(0x22aa22)});
        const plane = new Mesh(geometry, material);
        this.entity.addObject3DComponent(plane, window.mobaWorld.sceneEntity);
    }

    initializeRigidBody() {
        let object3D = this.entity.getObject3D();
        object3D.position.set(0,0,0)
        this.rigidBody = new RigidBody();
        this.rigidBody.createBox(0, object3D.position, object3D.quaternion, new Vector3(this.size, 1, this.size));
        this.rigidBody.setRestitution(0.25);
        this.rigidBody.setFriction(1);
        this.rigidBody.setRollingFriction(5);
        window.mobaWorld.physicsWorld.addRigidBody(this.rigidBody.body);
    }
}

export { Ground }