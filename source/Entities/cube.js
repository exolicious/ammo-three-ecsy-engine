import { BoxBufferGeometry, Mesh, MeshPhongMaterial } from "three";


class Cube {
    constructor(size=1) {
        this.size = size;
        this.entity = window.mobaWorld.createEntity();
        this.createCubeObject3D();
    }
    createCubeObject3D() {
        const geometry = new BoxBufferGeometry(this.size, this.size, this.size);
        const material = new MeshPhongMaterial();
        const mesh = new Mesh(geometry, material);
        this.entity.addObject3DComponent(mesh, window.mobaWorld.sceneEntity);
    }
}

export { Cube }