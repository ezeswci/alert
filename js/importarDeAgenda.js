// JavaScript Document
function agregarMailAgenda2(){
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").innerHTML='<div class="titulo">DATOS DE AGENDA</div><div class="content_export"><!-- Export --><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><div class="historial_item"><div class="texto"><div class="fecha">Alerta</div><div class="borrar">Eliminar</div><strong>Policia: </strong>*911</div></div><!-- Export --></div><div class="botones"><div onclick="cerrarTodo();" class="boton">CANCELAR</div><div onclick="agregarAgenda();" class="boton der">AGREGAR</div></div>';
	document.getElementById("cartel3").style.visibility="visible";
}
function agregarMailAgenda(){
	alert("entre");
	//window.plugins.ContactPicker.chooseContact(function(contactInfo) {
    //alert("Nombre:"+contactInfo.displayName);
	//alert("Numero:"+contactInfo.phoneNumber);
	//alert("Mail:"+contactInfo.email);
//});
	navigator.contacts.pickContact(function(contact){
		result="Datos:";
		mails=new Array();
		numeros=new Array();
		 for (var i in contact) { 
      		result += "1-"+ i + " = " + contact[i] + "\n";
				for (var a in contact[i]) { 
				result += "2-"+ i+"+"+ a + " = " + contact[i] + "\n";
				for (var e in contact[i][a]) {
				if(i=="emails"&&e=="value"){mails.push(mails);}
				if(i=="phoneNumbers"&&e=="value"){numeros.push(numeros);}
				result += "2-"+ i+"+"+ a +"+"+ e + " = " + contact[i][a][e] + "\n";
				}
				}
   			} 
   //alert(result);
   for (var b in mails) {
	   alert("mail"+mails[b]); 
   }
   for (var c in numeros) {
	   alert("numeros"+numeros[c]); 
   }
   alert("display Name"+contact.displayName) 
		//alert("Todo:"+JSON.stringify(contact));
    },function(err){
        alert('Error: ' + err);
    });
}
function agregarSMSAgenda(){
	alert("Entro sms");
	window.plugins.contactNumberPicker.pick(numsuccessCallback,numfailedCallback);
}
var numsuccessCallback = function(result){
    setTimeout(function(){alert(result.name + " " + result.phoneNumber);},0);
};
var numfailedCallback = function(result){
    setTimeout(function(){alert(result);},0);
}