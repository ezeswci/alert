//Not using jQuery because this is a special event for phonegap
//If not firing with this event, phonegap plugins don't work
//
if( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false){
	var devicePlatform="iOS";
}else{
	var devicePlatform="Android";
}
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    initClickCB();
}
function sendMail() {
	window.plugins.socialsharing.share('¡Te recomiendo el App Device Track ! Descargalo y vivi acompañado');
}

function initClickCB() {
    $("#amigo").click(sendMail);
}
function alerta(txt){
var iframe = document.createElement("IFRAME");
iframe.setAttribute("src", 'data:text/plain,');
document.documentElement.appendChild(iframe);
window.frames[0].window.alert(txt);
iframe.parentNode.removeChild(iframe);
}