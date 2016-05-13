/**
 * Created by justin on 16/4/28.
 */
var main = function(){
    var canvas = document.getElementById('example');

    var cxt = canvas.getContext('2d');
    cxt.fillStyle = 'rgba(255, 0, 0, 0.6)';
    cxt.fillRect(15, 15, 200, 200);
};
window.onload = function(){
    main();
};