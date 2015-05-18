// JavaScript Document
function apretoPanico(elemento){
	//alert(elemento.src);
	if(elemento.src.indexOf("boton_empezar")!=-1){
		elemento.src="img/boton_parar.jpg";
	}else{
		elemento.src="img/boton_empezar.jpg";
	}
}