// JavaScript Document
function apretoLlamada(elemento){
	//alert(elemento.src);
	if(elemento.src.indexOf("llamada_desactivada")!=-1){
		elemento.src="img/llamada_activada.jpg";
	}else{
		elemento.src="img/llamada_desactivada.jpg";
	}
}