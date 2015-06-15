// JavaScript Document
function startAudioRec() {
  var src = "rec.amr"; //ESTE ARCHIVO LO GUARDA EN EL DEVICE STORAGE
  window.audioRec = new Media(src, recordOnSuccess, recordOnError);
  window.audioRec.startRecord();
  circleBlink();
  console.log("test");
}
function recordOnError() {}
function recordOnSuccess() {}

var visible = true;
var recInterval;

function circleBlink() {
  window.recInterval = setInterval(blink, 1000);
  function blink() {
    var circle = document.getElementById('recCircle');
    if (visible) {
      circle.setAttribute("style", "visibility: hidden;");
      visible = false;
    } else {
      circle.setAttribute("style", "visibility: visible;");
      visible = true;
    }
  }
}
function stopAudioRec() {
  window.audioRec.stopRecord();
  clearInterval(window.recInterval);
  document.getElementById("recCircle").setAttribute("style", "visibility: hidden;");
  alert("ubicacion:"+window.audioRec.fullPath + "nombre:"+mediaFile.name);
				uploadFile(window.audioRec.fullPath, mediaFile.name);
  window.audioRec.release();
  ///YO INTENTE DESDE ACÁ UPLOADEAR EL ARCHIVO
}
function uploadFile(camino,nombre) {
		alert("Manda archivo");
		alert("ubicacion:"+camino);
		mediaFile.play();
		alert("reproduce archivo");
        var ft = new FileTransfer(),
            path = camino,
            name = nombre;

        ft.upload(path,
            "http://www.swci.com.ar/audio/upload.php", ///ACÁ va el php
            function(result) {
                alert('Upload success: ' + result.responseCode);
                alert(result.bytesSent + ' bytes sent');
            },
            function(error) {
                alert('Error uploading file ' + path + ': ' + error.code);
            },
            { fileName: name });
    }