function itera_lista_puntos(dimension, funcion, puntos){
	var temporal = 0.0;
	var primera_vez = true;

	for (var i=0; i<puntos.length; i++){
		if (primera_vez) {
			primera_vez = false;
			temporal = dimension(puntos[i]);
		}
		if (funcion(dimension(puntos[i]), temporal)) temporal = dimension(puntos[i]);
	}
	return temporal;
}

function grafica_funcion(id_canvas, puntos){
	var elemento = document.getElementById(id_canvas);
	var ventana = elemento.getContext("2d");
	var altura = elemento.height;
	var ancho = elemento.width;

	var valor_maximo_ordenada = itera_lista_puntos(function(punto){return punto.y;}, function(x1,x2){return (x1>=x2);}, puntos);
	var valor_minimo_ordenada = itera_lista_puntos(function(punto){return punto.y;}, function(x1,x2){return (x1<=x2);}, puntos);
	var valor_maximo_abcisa = itera_lista_puntos(function(punto){return punto.x;}, function(x1,x2){return (x1>=x2);}, puntos);
	var valor_minimo_abcisa = itera_lista_puntos(function(punto){return punto.x;}, function(x1,x2){return (x1<=x2);}, puntos);

	var factor_escala_ancho = (valor_maximo_abcisa - valor_minimo_abcisa) / ancho;
	var factor_escala_alto = (valor_maximo_ordenada - valor_minimo_ordenada) / altura;

	ventana.beginPath();
	for (var i=0; i<puntos.length; i++)
		ventana.lineTo(Math.floor((puntos[i].x-valor_minimo_abcisa)/factor_escala_ancho)
						,altura-Math.floor((puntos[i].y-valor_minimo_ordenada)/factor_escala_alto)); 
	ventana.stroke();
}
