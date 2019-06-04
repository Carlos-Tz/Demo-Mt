var modal = document.getElementById('myModal');
//var btn = document.getElementById("contSign");
//var span = document.getElementsByClassName("close")[0];
var span = document.getElementById("close");
var canvas = document.getElementById('canvas');
/* var modal2 = document.getElementById('myModal2');
var span2 = document.getElementById("close2");
var canvas2 = document.getElementById('canvas2'); */

var signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    minWidth: 3,
    maxWidth: 4,
    penColor: "rgb(33, 33, 33)"
});

//btn.onclick = function (event) {
function btn_click() {
     modal.style.display = "block";
    resizeCanvas();
} 
 span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('imgSign').src = signaturePad.toDataURL();
   /*  document.getElementById('imgSign2').src = signaturePad.toDataURL(); */
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('imgSign').src = signaturePad.toDataURL();
    }
}

function resizeCanvas() {
    var w = modal.clientWidth;
    var h = modal.clientHeight;
    canvas.width = Math.ceil(w * 0.75);
    canvas.height = Math.ceil(h * 0.7);
    signaturePad.clear();
}

window.addEventListener("resize", resizeCanvas);