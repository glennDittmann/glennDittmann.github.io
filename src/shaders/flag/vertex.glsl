uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;

void main() {
    vec4 modelPos = modelMatrix * vec4(position, 1.0);
    modelPos.z += sin(modelPos.x * uFrequency.x + uTime) * 0.1;
    modelPos.z += sin(modelPos.y * uFrequency.y + uTime) * 0.1;

    vec4 viewPos = viewMatrix * modelPos;
    vec4 projectionPos = projectionMatrix * viewPos;

    gl_Position = projectionPos;
}
