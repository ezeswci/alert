// JavaScript Document
window.StopRecord=0;// En 0 No lo para, en 1 si
function recordAudio(cual) {
		alert("Entro a Grabar");
        var src = "myrecording"+cual+".amr";
        var mediaRec = new Media(src, onSuccess, onError);

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
				uploadFile(mediaRec);
				mediaRec.release();
				//if(cual>2){
					//window.StopRecord=1;
					//alert("Paro");
				//}
				//if(window.StopRecord==0){
				//recordAudio(cual+1);}
            }
        }, 1000);
    }
    function onSuccess() {
        //console.log("recordAudio():Audio Success");
    }
    // onError Callback
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    // Upload files to server
    function uploadFile(mediaFile) {
		alert("Manda archivo");
		mediaFile.play();
		alert("reproduce archivo");
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;

        ft.upload(path,
            "http://www.swci.com.ar/audio/upload.php", ///ACÁ va el php
            function(result) {
                console.log('Upload success: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent');
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
            },
            { fileName: name });
    }