// JavaScript Document
//window.passestado; 0- apagado 1-prendido 2-simulado 
function activarBackGround(){
	if(!cordova.plugins.backgroundMode.isEnabled()){cordova.plugins.backgroundMode.enable();}
	cordova.plugins.backgroundMode.setDefaults({
    title:  "DeviceTrack",
    ticker: "Sincronizado",
    text:   "Sincronizado",
	silent: true
})
	cordova.plugins.backgroundMode.configure({
    title:  "DeviceTrack",
    ticker: "Sincronizado",
    text:   "Sincronizado",
	silent: true
})
}
function desactivarBackGround(){
	if(cordova.plugins.backgroundMode.isEnabled()){cordova.plugins.backgroundMode.disable();}
}
window.onload=verificarPanico();
function verificarPanico(){
	if (window.passestado==1){
		document.getElementById("img_panic").src="img/boton_parar.jpg";
		activarPanicoRevision();
		}else{
			if(window.passestado==2){
			activarPanicoRevision();
		}}
}
function apretoPanico(elemento){
	//alert(elemento.src);
	if(elemento.src.indexOf("boton_empezar")!=-1){
		elemento.src="img/boton_parar.jpg";
		
		activarPanico();
		//alert(window.celCode+'-'+ window.alarmStatus+'-'+window.sis_ip);
		//setTimeout(function(){navigator.window.app.exitApp();},3000) // Esto cierra la App
	}else{
		desactivarPanico();
	}
}
function clickBanner(){
	//alert("clickBanner gps"+window.gpsestado+" passestado"+window.passestado)
	if(window.gpsestado==0){
		activarGPS();
	}else{
		if(window.passestado==0){
		desactivarGPS();
		desactivarTimer();
		}
		else{
			if(window.passestado==1){
			desactivarPanico();}else{// Desactivado falso
				borrarMensajes();
				estadoDeGPS(0);
			}
		}
	}
}
function revisarBanner(){
	//alert("revisarBanner"+window.gpsestado);
	if(window.gpsestado==0){
		document.getElementById("banneron").src="img/banner.jpg";
	}else{
		document.getElementById("banneron").src="img/banner2.jpg";	
	}
}
function activarGPS(){
	empezarATrasmitirGps();
	mensajeEnPrimerPantalla();
	estadoDeGPS(1);
}
function desactivarGPS(){
	estadoDeGPS(0);
	borrarMensajes();
	dejarDeTrasmitirGps();
	// Si el panico esta activado tiene que desactivar el panico, sino solo apaga el gps
}
function desactivarPanico(){
	document.getElementById("cartel").style.visibility="visible";
	document.getElementById("fondo_negro").style.visibility="visible";
}
function cerrarTodo(){
	document.getElementById("cartel").style.visibility="hidden";
	document.getElementById("fondo_negro").style.visibility="hidden";
}
function validarPass(){
	valor=parseInt(document.getElementById("passing").value);
	real=window.passreal;
	falso=window.passfalsa;
	if(valor==real || valor==falso){
		if(valor==real){
			document.getElementById("passing").value=null;
			cerrarTodo();
			detenerPanico();
		}else{
			document.getElementById("passing").value=null;
			cerrarTodo();
			simularDetenerPanico();
		}
	}else{
		document.getElementById("passing").value=null;
		alert("Clave incorrecta, ingrese nuevamente");
	}
}
function detenerPanico(){
	document.getElementById("img_panic").src="img/boton_empezar.jpg";
	estadoDePanico(0);
	desactivarBackGround();
	//dejarDeTrasmitirGps(); no lo desactiva por que deberia seguir mandando la dir
}
function simularDetenerPanico(){
	//alert("Esto esta simulado");
	document.getElementById("img_panic").src="img/boton_empezar.jpg";
	estadoDePanico(2);
	}
function activarPanico(){
	dejarDeTrasmitirGps();// Dejo de trasmitir asi lo reactiva
	//empezarATrasmitirGps();
	estadoDePanico(1);
	enviarMensajes();
	if(window.llamadaSecreta==1){startAudioRec();
	if(cordova.plugins.backgroundMode.isEnabled()!=true){cordova.plugins.backgroundMode.enable();}}
	// Desactivo y reactivo el Gps asi manda la dir con el panico
	setTimeout(function(){
	empezarATrasmitirGps();
	salidaMagica();
	},2000);
	//document.location.href = 'tel:+01148127101';
}
function activarPanicoRevision(){
	empezarATrasmitirGps();
	//estadoDePanico(1);
	if(window.llamadaSecreta==1){startAudioRec();}
	if(cordova.plugins.backgroundMode.isEnabled()!=true){cordova.plugins.backgroundMode.enable();}
	//document.location.href = 'tel:+01148127101';
}
function estadoDePanico(numero){
	//alert("cambio el estado del panico"+numero);
	window.passestado=numero;
	if(numero==1){estadoDeGPS(numero);}
	window.base.transaction(actualizarEstado, errorCB);
}
function actualizarEstado(tx) {
    tx.executeSql("UPDATE PASS SET pass_estado ='" +window.passestado+"'  WHERE rowid =1  ;", [],   updatePass, errorPass);
}
function estadoDeGPS(numero){
	//alert("cambio el estado del GPS"+numero);
	window.gpsestado=numero;
	revisarBanner();
	window.base.transaction(actualizarEstadoGPS, errorCB);
}
function actualizarEstadoGPS(tx) {
    tx.executeSql("UPDATE PASS SET gps_estado ='" +window.gpsestado+"'  WHERE rowid =1  ;", [],   updatePass, errorPass);
}
function updatePass(){
}
function errorPass(){
}
function mensajeEnPrimerPantalla(){
	//numero=Math.floor((Math.random() * 10000) + 1);
	numero=123;
	window.plugin.notification.local.add({
    id:         numero,
    message:    "Activar",
	json:       JSON.stringify({ test: 123 })
	});//
}
function borrarMensajes(){ // borrar los mensajes de las pantallas
//alert("Entro a cancelar notificiaciones");
window.plugin.notification.local.cancel(123);
//alert("Fin notificiaciones");
}
/*window.plugin.notification.local.oncancel = function (id, state, json) {window.alarmStatus=1;alert("panico 1");};*/
document.addEventListener('deviceready', function () {
window.plugin.notification.local.onclick = function (id, state, json) {
	document.getElementById("img_panic").src="img/boton_parar.jpg";
	activarPanico();
}
borrarMensajes();
});
function activarTimer(minutos){
	if(minutos==0){	minutos=document.getElementById("timerMinutes").value;cerrarTodo();	}
	if(checkConnection()){
		var ipSend=window.sis_ip;
		var hasta = ipSend.length - 17;// Le saco el /leer_telefono.php
		var ipSendBaja = str.substring(0, hasta)+"activar_panico.php";
		celId=window.celCode;
		// /monitoreo/
		var xmlhttp;
				if (window.XMLHttpRequest)
				{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
				}
				else
				{// code for IE6, IE5
				 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						var respuesta = xmlhttp.responseText;
					}
				}
			xmlhttp.open("POST",ipSendBaja,false);// Que no se trabe por culpa de esto
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send('minPrev='+minutos+'celId='+celId);
	}else{
		setTimeout(function(){activarTimer(minutos);},1000);
	}
}
function desactivarTimer(){
	if(checkConnection()){
		var ipSend=window.sis_ip;
		var hasta = ipSend.length - 17;// Le saco el /leer_telefono.php
		var ipSendBaja = str.substring(0, hasta)+"desactivar_panico.php";
		celId=window.celCode;
		// /monitoreo/
		var xmlhttp;
				if (window.XMLHttpRequest)
				{// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
				}
				else
				{// code for IE6, IE5
				 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function()
				{
					if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
						var respuesta = xmlhttp.responseText;
					}
				}
			xmlhttp.open("POST",ipSendBaja,false);// Que no se trabe por culpa de esto
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send('celId='+celId);
	}else{
		setTimeout(function(){desactivarTimer();},1000);
	}
}