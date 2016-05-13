/**
 * Created by justin on 16/4/28.
 */
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' + // attribute variable
    'uniform mat4 u_ModelMatrix;\n' +
    'void main() {\n' +
    '  gl_Position = u_ModelMatrix * a_Position;\n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';

var ANGLE_STEP = - 6.0;

var main = function(){
    var canvas = document.getElementById('example');

    var g1 = getWebGLContext(canvas);
    if(!g1){
        console.log('failed to get rendering context for WebGL');
        return;
    }
    if (!initShaders(g1, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('failed to initialize shaders');
        return;
    }

    var n = initVertexBuffers(g1);
    if (n < 0){
        console.log('failed to set positions for vertices');
        return;
    }
    g1.clearColor(0.0, 0.0, 0.0, 1.0);
    //g1.clear(g1.COLOR_BUFFER_BIT);

    var u_ModelMatrix = g1.getUniformLocation(g1.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }

    var currentAngle = 0.0;
    // modelMatrix
    var modelMatrix = new Matrix4();

    var tick = function(){
        currentAngle = animate(currentAngle);
        draw(g1, n, currentAngle, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick);
    };
    tick();
};

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0, 0, 0, -0.01, 0.7, 0, 0.7, -0.01
    ]);

    var n = 4;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer){
        console.log('failed to create the buffer object');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
    // Set the rotation matrix
    modelMatrix.setRotate(currentAngle, 0, 0, 1); // Rotation angle, rotation axis (0, 0, 1)
    //modelMatrix.translate(0.01, 0, 0);

    // Pass the rotation matrix to the vertex shader
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

// Last time that this function was called
var g_last = Date.now();
function animate(angle) {
    // Calculate the elapsed time
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;
    // Update the current rotation angle (adjusted by the elapsed time)
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360;
}

window.onload = function(){
    main();
};