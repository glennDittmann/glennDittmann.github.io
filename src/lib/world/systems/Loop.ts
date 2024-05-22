import { Clock, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export interface ITickable {
    tick(delta: number): void;
}

// A mesh that has a tick method that can be called by the loop
// tick contains logic to transform the mesh each frame
export class TickableMesh extends Mesh implements ITickable {
    tick(delta: number): void {
        throw new Error("Method not implemented. Delta was: " + delta);
    }
}

export class Loop {
    private camera: PerspectiveCamera;
    private clock = new Clock();
    private renderer: WebGLRenderer;
    private scene: Scene;
    public updateables: ITickable[] = [];

    constructor(camera: PerspectiveCamera, renderer: WebGLRenderer, scene: Scene) {
        this.camera = camera;
        this.renderer = renderer;
        this.scene = scene;
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick();

            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        const delta = this.clock.getDelta();

        for (const updateable of this.updateables) {
            updateable.tick(delta);
        }
    }
}