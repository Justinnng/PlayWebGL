/**
 * Created by justin on 16/4/28.
 */
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' + // attribute variable
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '  gl_PointSize = 10.0;\n' +
    '  v_Color = a_Color;\n' +
    '}\n';


var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '  gl_FragColor = v_Color;\n' +
    '}\n';
// Fragment shader program

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
    g1.clear(g1.COLOR_BUFFER_BIT);

    g1.drawArrays(g1.TRIANGLES, 0, n);
};

function initVertexBuffers(gl){
    var verticesSizes = new Float32Array([
        -0.5, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, 0.5, 0.0, 0.0, 1.0
    ]);

    var n = 3;


    var vertexSizeBuffer = gl.createBuffer();
    if (!vertexSizeBuffer){
        console.log('failed to create the buffer object');
        return -1;
    }

    var FSIZE = verticesSizes.BYTES_PER_ELEMENT;

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);

    /*var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_PointSize);*/

    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);
    return n;
}

window.onload = function(){
    main();
};