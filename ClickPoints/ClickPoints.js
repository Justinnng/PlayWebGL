


/**
 * Created by justin on 16/4/28.
 */
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' + // attribute variable
    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '  gl_PointSize = 10.0;\n' +
    '}\n';


var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' +
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
    if (a_Position < 0) { //getAttribLocation 错误返回-1
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    /*var a_PointSize = g1.getAttribLocation(g1.program, 'a_PointSize');
    if (a_PointSize < 0) {
        console.log('Failed to get the storage location of a_PointSize');
        return;
    }
    g1.vertexAttrib1f(a_PointSize, 100.0);*/

    var u_FragColor = g1.getUniformLocation(g1.program, 'u_FragColor');
    if (!u_FragColor) { //如果getUniformLocation 错误 返回的是null
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    g1.clearColor(0.0, 0.0, 0.0, 1.0);
    g1.clear(g1.COLOR_BUFFER_BIT);

    canvas.onmousedown = function(ev) { click(ev, g1, canvas, a_Position, u_FragColor) };

};

var g_points = [];
var g_colors = [];
function click(ev, gl, canvas, a_Position, u_FragColor){
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    g_points.push([x,y]);

    if (x >= 0.0 && y >= 0.0) {      // First quadrant
        g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
    } else if (x < 0.0 && y < 0.0) { // Third quadrant
        g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
    } else {                         // Others
        g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;

    for(var i = 0; i < len; i++){
        var rgba = g_colors[i];
        gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2],rgba[3]);

        gl.drawArrays(gl.POINTS, 0, 1);
    }
}


window.onload = function(){
    main();
};