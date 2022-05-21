import { Cube } from "./cube"
import { RigidBody } from "../Classes/rigidBody"
import { RigidBodyComponent } from "../Components/rigidBodyComponent";
import { Vector3 } from "three"


class RigidBodyCube extends Cube {
    constructor(size = 1, startPos = {x: 0, y: 10, z: 0}) {
        super(size);
        this.initializeRigidBody(startPos);
        this.decorateWithRigidBodyComponent();
    }

    initializeRigidBody(startPos) {
        let object3D = this.entity.getObject3D();
        object3D.position.set(startPos.x, startPos.y, startPos.z)
        this.rigidBody = new RigidBody();
        this.rigidBody.createBox(1, object3D.position, object3D.quaternion, new Vector3(this.size, this.size, this.size));
        this.rigidBody.setRestitution(0.25);
        this.rigidBody.setFriction(1);
        this.rigidBody.setRollingFriction(5);
        window.mobaWorld.physicsWorld.addRigidBody(this.rigidBody.body);
    }

    decorateWithRigidBodyComponent() {
        this.entity.addComponent(RigidBodyComponent, {ref: this.rigidBody})
    }
}

export { RigidBodyCube }