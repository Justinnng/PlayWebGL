/**
 * Created by justin on 16/4/28.
 */
var main = function(){
    var canvas = document.getElementById('example');

    var g1 = getWebGLContext(canvas);
    if(!g1){
        console.log('failed to get rendering context for WebGL');
        return;
    }

    g1.clearColor(0,0,1,1);

    g1.clear(g1.COLOR_BUFFER_BIT);
};
window.onload = function(){
    main();
};