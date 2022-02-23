import { initialize } from "ecsy-three";

const { world, scene, camera, sceneEntity, cameraEntity, rendererEntity } = initialize();

export const mobaWorldObject = {
    world: world,
    scene: scene,
    camera: camera,
    sceneEntity: sceneEntity,
    cameraEntity: cameraEntity,
    rendererEntity: rendererEntity,
    physicsWorld: {},
    createEntity: function() {
        return this.world.createEntity();
    },
    registerSystem: function(system) {
        this.world.registerSystem(system);
    },
    registerComponent: function(component) {
        this.world.registerComponent(component);
    }
}