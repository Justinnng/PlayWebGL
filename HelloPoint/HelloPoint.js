/**
 * Created by justin on 16/4/28.
 */
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' + // attribute variable
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '  gl_PointSize = a_PointSize;\n' +
    '}\n';


var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
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


    var a_Position = g1.getAttribLocation(g1.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    g1.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

    var a_PointSize = g1.getAttribLocation(g1.program, 'a_PointSize');
    if (a_PointSize < 0) {
        console.log('Failed to get the storage location of a_PointSize');
        return;
    }
    g1.vertexAttrib1f(a_PointSize, 10.0);

    g1.clearColor(0.0, 0.0, 0.0, 1.0);

    g1.clear(g1.COLOR_BUFFER_BIT);

    g1.drawArrays(g1.POINTS, 0, 1);
};
window.onload = function(){
    main();
};
