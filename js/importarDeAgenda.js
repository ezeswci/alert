// JavaScript Document
function agregarMailAgenda2(nombre,mails,telefonos){
	contadorImportados=0;
	cualesImportar= new array();
	for (var b in mails) {
	   texto +='<div class="historial_item"><div class="texto"><div class="fecha">Mail</div><div class="borrar" agregarDesdeAgenda(this,'+nombre+','+mails[b]+',Mail)>+Agregar</div><strong>'+nombre+' </strong>'+ mails[b]+'</div></div>';
   }
   for (var c in numeros) {
	   texto +='<div class="historial_item"><div class="texto"><div class="fecha">Sms</div><div class="borrar" agregarDesdeAgenda(this,'+nombre+','+numeros[c]+',Sms)>+Agregar</div><strong>'+nombre+' </strong>'+ numeros[c]+'</div></div>'; 
   }
	document.getElementById("cartel2").style.visibility="hidden";
	document.getElementById("cartel3").innerHTML='<div class="titulo">DATOS IMPORTADOS DE AGENDA</div><div class="content"><p>Haga click en “+ Agregar” en aquellas opciones que desee agregar a su listado de alertas. En el detalle podrá ver si es que lo recibe por SMS o por Mail.</p></div><div class="content_export">'+texto+'</div><div class="botones"><div onclick="cerrarTodo();" class="boton_unico">FINALIZAR</div></div>';
	document.getElementById("cartel3").style.visibility="visible";
}
function agregarDesdeLaAgenda(){
	navigator.contacts.pickContact(function(contact){
		result="Datos:";
		mails=new Array();
		numeros=new Array();
		 for (var i in contact) { 
      		result += "1-"+ i + " = " + contact[i] + "\n";
				for (var a in contact[i]) { 
				result += "2-"+ i+"+"+ a + " = " + contact[i] + "\n";
				for (var e in contact[i][a]) {
				if(i=="emails"&&e=="value"){mails.push(contact[i][a][e]);}
				if(i=="phoneNumbers"&&e=="value"){numeros.push(contact[i][a][e]);}
				result += "2-"+ i+"+"+ a +"+"+ e + " = " + contact[i][a][e] + "\n";
				}
				}
   			} 
   //alert(result);
   //alert("display Name"+contact.displayName) 
		//alert("Todo:"+JSON.stringify(contact));
   agregarDesdeLaAgenda(contact.displayName,mails,numeros);
    },function(err){
        alert('Error: ' + err);
    });
}
function agregarDesdeAgenda (element,nombre,dato,tipo){
	crearAviso(3);
	window.adtipo=tipo;
	window.adnombre=nombre;
	window.addestino=dato;
	element=element.parentNode;
	element.parentNode.style.display="none";
	window.db.transaction(insertContactoManualAgenda, errorCB, successCBS);
}
function insertContactoManualAgenda(tx){
	 //alert("claves"+verdadera+"-fal-"+falsa);CONTACT (con_id unique, con_tipo, con_nombre, con_destino)
	 var query = 'INSERT INTO CONTACT (con_tipo, con_nombre, con_destino) VALUES (?,?,?)';
     tx.executeSql(query, [window.adtipo, window.adnombre, window.addestino]);
	 
}