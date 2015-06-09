// JavaScript Document
window.StopRecord=0;// En 0 No lo para, en 1 si
function recordAudio(cual) {
		alert("Entro a Grabar");
        var src = "myrecording.amr";
        var mediaRec = new Media(src, onSuccessGrab, onErrorGrab);

        // Record audio
        mediaRec.startRecord();

        // Stop recording after 30 sec
        var recTime = 0;
        var recInterval = setInterval(function() {
            recTime = recTime + 1;
            if (recTime >= 30) {
                clearInterval(recInterval);
                mediaRec.stopRecord();
				alert("Paro de grabar");
				mediaRec.play();
				alert("mando archivo");
				alert("ubicacion:"+mediaRec.fullPath + "nombre:"+mediaFile.name);
				uploadFile(mediaRec.fullPath, mediaFile.name);
				//mediaRec.release();
				//if(cual>2){
					//window.StopRecord=1;
					//alert("Paro");
				//}
				//if(window.StopRecord==0){
				//recordAudio(cual+1);}
            }
        }, 1000);
    }
    function onSuccessGrab() {
        alert("recordAudio():Audio Success");
    }
    // onError Callback
    //
    function onErrorGrab(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 // a ver si o agarra
    // Upload files to server
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