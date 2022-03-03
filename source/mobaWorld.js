import { initialize } from "ecsy-three";

const { world, scene, camera, renderer, sceneEntity, cameraEntity, rendererEntity } = initialize();

export const mobaWorldObject = {
    world: world,
    scene: scene,
    camera: camera,
    renderer: renderer,
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