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

function grafica_funcion(id_canvas, puntos, borrar){
	var elemento = document.getElementById(id_canvas);
	var ventana = elemento.getContext("2d");
	var altura = elemento.height;
	var ancho = elemento.width;
	var margen_vertical = Math.floor(altura * 0.1/2);
	var margen_horizontal = Math.floor(ancho * 0.2/2);

	var valor_maximo_ordenada = itera_lista_puntos(function(punto){return punto.y;}, function(x1,x2){return (x1>=x2);}, puntos);
	var valor_minimo_ordenada = itera_lista_puntos(function(punto){return punto.y;}, function(x1,x2){return (x1<=x2);}, puntos);
	var valor_maximo_abcisa = itera_lista_puntos(function(punto){return punto.x;}, function(x1,x2){return (x1>=x2);}, puntos);
	var valor_minimo_abcisa = itera_lista_puntos(function(punto){return punto.x;}, function(x1,x2){return (x1<=x2);}, puntos);

	var factor_escala_ancho = (valor_maximo_abcisa - valor_minimo_abcisa) / (ancho - margen_horizontal * 2);
	var factor_escala_alto = (valor_maximo_ordenada - valor_minimo_ordenada) / (altura - margen_vertical * 2);

	var incremento_horizontal = (valor_maximo_abcisa-valor_minimo_abcisa) / 4.0;
	var incremento_vertical = (valor_maximo_ordenada-valor_minimo_ordenada) / 4.0;
	var delta_x = Math.floor((ancho-2*margen_horizontal) / 4.0);
	var delta_y = Math.floor((altura-2*margen_vertical) / 4.0);

	ventana.clearStyle = "#FFFFFF";
	if (borrar) ventana.clearRect(0,0,ancho,altura);

	ventana.strokeStyle = "#000000";
	ventana.lineWidth = 3;
	ventana.strokeRect(margen_horizontal, margen_vertical, ancho - margen_horizontal * 2, altura - margen_vertical * 2);
	ventana.lineWidth = 1;

	ventana.font = "10px verdana, sans-serif";
	ventana.textAlign = "start";

	for (var i=0; i<4; i++){
		ventana.fillText(new String((valor_minimo_abcisa+i*incremento_horizontal).toFixed(2)), margen_horizontal+i*delta_x,
						altura-margen_vertical+12);
		ventana.fillText(new String((valor_minimo_ordenada+i*incremento_vertical).toFixed(2)), 2,
						altura-margen_vertical-i*delta_y+12);
		ventana.beginPath();
		ventana.moveTo(margen_horizontal+i*delta_x, altura-margen_vertical);
		ventana.lineTo(margen_horizontal+i*delta_x, margen_vertical);
		ventana.stroke();
		ventana.beginPath();
		ventana.moveTo(margen_horizontal, altura-margen_vertical-i*delta_y);
		ventana.lineTo(ancho - margen_horizontal, altura-margen_vertical-i*delta_y);
		ventana.stroke();
	}

	ventana.strokeStyle = "#FF0000";
	ventana.lineWidth = 5;
	ventana.beginPath();
	ventana.moveTo(Math.floor((puntos[0].x-valor_minimo_abcisa)/factor_escala_ancho)+margen_horizontal
					,altura-Math.floor((puntos[0].y-valor_minimo_ordenada)/factor_escala_alto)
					- margen_vertical); 
	for (var i=0; i<puntos.length; i++)
		ventana.lineTo(Math.floor((puntos[i].x-valor_minimo_abcisa)/factor_escala_ancho)+margen_horizontal
						,altura-Math.floor((puntos[i].y-valor_minimo_ordenada)/factor_escala_alto)
						- margen_vertical); 
	ventana.stroke();
}
