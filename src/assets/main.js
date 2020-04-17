var modal = document.getElementById('myModal');
var span = document.getElementById("close");
var canvas = document.getElementById('canvas');
var modal2 = document.getElementById('myModal2');
var span2 = document.getElementById("close2");
var canvas2 = document.getElementById('canvas2');
var modal3 = document.getElementById('myModal3');
var span3 = document.getElementById("close3");
var canvas3 = document.getElementById('canvas3');
var modal4 = document.getElementById('myModal4');
var span4 = document.getElementById("close4");
var canvas4 = document.getElementById('canvas4');
const {remote, ipcRenderer} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs');

let print_win;

var signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    minWidth: 3,
    maxWidth: 4,
    penColor: "rgb(33, 33, 33)"
});
var signaturePad2 = new SignaturePad(canvas2, {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    minWidth: 3,
    maxWidth: 4,
    penColor: "rgb(33, 33, 33)"
});
var signaturePad3 = new SignaturePad(canvas3, {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    minWidth: 3,
    maxWidth: 4,
    penColor: "rgb(33, 33, 33)"
});
var signaturePad4 = new SignaturePad(canvas4, {
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
function btn_click2() {
    modal2.style.display = "block";
   resizeCanvas2();
} 
function btn_click3() {
    modal3.style.display = "block";
   resizeCanvas3();
} 
function btn_click4() {
    modal4.style.display = "block";
   resizeCanvas4();
} 
span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('imgSign').src = signaturePad.toDataURL();
}
span2.onclick = function () {
    modal2.style.display = "none";
    document.getElementById('imgSign2').src = signaturePad2.toDataURL();
}
span3.onclick = function () {
    modal3.style.display = "none";
    document.getElementById('imgSign3').src = signaturePad3.toDataURL();
}
span4.onclick = function () {
    modal4.style.display = "none";
    document.getElementById('imgSign4').src = signaturePad4.toDataURL();
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('imgSign').src = signaturePad.toDataURL();
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
        document.getElementById('imgSign2').src = signaturePad2.toDataURL();
    }
    if (event.target == modal3) {
        modal3.style.display = "none";
        document.getElementById('imgSign3').src = signaturePad3.toDataURL();
    }
    if (event.target == modal4) {
        modal4.style.display = "none";
        document.getElementById('imgSign4').src = signaturePad4.toDataURL();
    }
}

function resizeCanvas() {
    var w = modal.clientWidth;
    var h = modal.clientHeight;
    canvas.width = Math.ceil(w * 0.75);
    canvas.height = Math.ceil(h * 0.7);
    signaturePad.clear();
}
function resizeCanvas2() {
    var w = modal2.clientWidth;
    var h = modal2.clientHeight;
    canvas2.width = Math.ceil(w * 0.75);
    canvas2.height = Math.ceil(h * 0.7);
    signaturePad2.clear();
}
function resizeCanvas3() {
    var w = modal3.clientWidth;
    var h = modal3.clientHeight;
    canvas3.width = Math.ceil(w * 0.75);
    canvas3.height = Math.ceil(h * 0.7);
    signaturePad3.clear();
}
function resizeCanvas4() {
    var w = modal4.clientWidth;
    var h = modal4.clientHeight;
    canvas4.width = Math.ceil(w * 0.75);
    canvas4.height = Math.ceil(h * 0.7);
    signaturePad4.clear();
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("resize2", resizeCanvas2);
window.addEventListener("resize3", resizeCanvas3);
window.addEventListener("resize4", resizeCanvas4);

document.addEventListener('keypress', function(evt) {
    if (evt.key !== 'Enter') {
      return;
    }
  
    let element = evt.target;
    if (!element.classList.contains('focusNext')) {
      return;
    }
    let tabIndex = element.tabIndex + 1;
    var next = document.querySelector('[tabindex="'+tabIndex+'"]');
    if (next) {
      next.focus();
      event.preventDefault();
    }
  });

  function pdfExport(id, anio, nocontrol, tipo, land) {
    ipcRenderer.send('var-in', [id, anio, nocontrol, tipo, land]);
  }

  function pdfExport2(id, id2, type, anio, nocontrol, tipo, land) {
    ipcRenderer.send('var-in2', [id, id2, type, anio, nocontrol, tipo, land]);
    // dialog.showMessageBox(null, options);
  }

 
  /* function pdfExport(id, anio, nocontrol, tipo, land) {
    print_win = new BrowserWindow({show: false, webPreferences: { nodeIntegration: true }});
    print_win.loadURL(`file://${__dirname}/index.html#/${tipo}/${id}`);
    print_win.webContents.on('did-finish-load', function() {
        if (!print_win) {
          dialog.showErrorBox('Error', "Algo ha salido mal!");
          return;
        }
        dialog.showSaveDialog(print_win, {defaultPath: `${tipo}_${nocontrol}_20${anio}__${id}`, filters: [{name: 'PDF', extensions: ['pdf']}]}, function(file_path) {
          if (file_path) {
            print_win.webContents.printToPDF({ pageSize: 'Letter', landscape: land,}, function(err, data) {
              if (err) {
                dialog.showErrorBox('Error', err);
                return;
              }
              fs.writeFile(file_path, data, function(err) {
                if (err) {
                  dialog.showErrorBox('Error', err);
                  return;
                }
                print_win = null;
              });
            });
          }
        });
      });
  }
  function pdfExport2(id, type, anio, nocontrol, tipo, land) {
    print_win = new BrowserWindow({show: false, webPreferences: { nodeIntegration: true }});
    print_win.loadURL(`file://${__dirname}/index.html#/${tipo}/${id}/${type}`);
    print_win.webContents.on('did-finish-load', function() {
        if (!print_win) {
          dialog.showErrorBox('Error', "Algo ha salido mal!");
          return;
        }
        dialog.showSaveDialog(print_win, {defaultPath: `${tipo}_${type}_${nocontrol}_20${anio}__${id}`, filters: [{name: 'PDF', extensions: ['pdf']}]}, function(file_path) {
          if (file_path) {
            print_win.webContents.printToPDF({ pageSize: 'Letter', landscape: land,}, function(err, data) {
              if (err) {
                dialog.showErrorBox('Error', err);
                return;
              }
              fs.writeFile(file_path, data, function(err) {
                if (err) {
                  dialog.showErrorBox('Error', err);
                  return;
                }
                print_win = null;
              });
            });
          }
        });
      });
  } */