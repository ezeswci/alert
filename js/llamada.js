// JavaScript Document
function apretoLlamada(elemento){
	//alert(elemento.src);
	if(elemento.src.indexOf("llamada_desactivada")!=-1){
		elemento.src="img/llamada_activada.jpg";
		alert("Llamada Activada");
		document.location.href = 'tel:+01148127101';
	}else{
		elemento.src="img/llamada_desactivada.jpg";
		alert("Llamada Desactivada");
	}
}