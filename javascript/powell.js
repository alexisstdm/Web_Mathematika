function Intervalo(inicio, fin, incluido_inicio, incluido_fin){
	this._inicio = inicio;
	this._fin = fin;
	this._incluido_inicio = incluido_inicio;
	this._incluido_fin = incluido_fin;
	this.is_in_interval = function(numero_real){
			if (numero_real > this._fin || numero_real < this._inicio) return false;
			else 
				if (numero_real = this._inicio && !(this._incluido_inicio)) return false;
				else 
					if (numero_real = this._fin && !(this._incluido_fin)) return false;
					else return false;				 			     
		}
}

function calcula_limites_parametro(P, v, limites){

	var intervalo = new Intervalo(0.0, 0.0, true, true);
	var intervalo_resultado = new Intervalo(0.0, 0.0, true, true);

	var primera_vez = true;

	for (var i = 0; i < limites.length; i++){
		if (v[i] != 0.0) {
			 intervalo._inicio = (limites[i]._inicio - P[i])/v[i];
		         intervalo._fin = (limites[i]._fin - P[i])/v[i];
			 if (v[i]>0) {	
				if ((intervalo._inicio > intervalo_resultado._inicio) || primera_vez) {
					intervalo_resultado._inicio = intervalo._inicio;
				}
				if ((intervalo._fin < intervalo_resultado._fin) || primera_vez) {
					intervalo_resultado._fin = intervalo._fin;
				}
			}
			else {
				if ((intervalo._inicio < intervalo_resultado._fin) || primera_vez) {
					intervalo_resultado._fin = intervalo._inicio;
				}
				if ((intervalo._fin > intervalo_resultado._inicio) || primera_vez) {
					intervalo_resultado._inicio = intervalo._fin;
				}
			}
		}
	}

	return intervalo_resultado;		
}


function directional_func_min(funcion, comienzo, fin, tol){
	var PHI = (1.0 + Math.sqrt(5.0))/2.0;
	
	var x0 = comienzo;
	var x2 = fin;

	var f0 = funcion(x0);
	var f2 = funcion(x2);
    var x1 = x0 + (x2 - x0) * (PHI - 1.0);
	var f1 = funcion(x1);
	var nuevo = x0 + (x1 - x0) * (PHI - 1.0);
	var f_nuevo = funcion(nuevo);
	var primer_subintervalo = true;
	
	while (Math.abs(x2-nuevo) > tol*(Math.abs(x0)+Math.abs(nuevo))){
		
		if (primer_subintervalo){
			if (f_nuevo <= f1){
				x2 = x1;
				f2 = f1;
				x1 = nuevo;
				f1 = f_nuevo;
			}
			else {
				x0 = nuevo;
				f0 = f_nuevo;
				primer_subintervalo = false;
			}
		}		
		else {
			if (f_nuevo <= f1){
				x0 = x1;
				f0 = f1;
				x1 = nuevo;
				f1 = f_nuevo;
			}
			else {
				x2 = nuevo;
				f2 = f_nuevo;
				primer_subintervalo = true;
			}
		}
		
		if (primer_subintervalo) nuevo = x0 + (x1 - x0) * (PHI - 1.0);
		else nuevo = x2 - (x2 - x1) * (PHI - 1.0);
		f_nuevo = funcion(nuevo); 
	}
	return new Array(nuevo, f_nuevo);
}

function powell_algorithm(funcion, Punto, direcciones, limites, error, maximo_iteraciones){
	var i = 0;
	var P = new Array();
	P = Punto.slice();
	
	while (i < maximo_iteraciones){
		var max_dec = 0.0;
		var funcion_P = funcion(P);
		var funcion_P_nueva = 0;
		var funcion_P_anterior = funcion_P;
		var _P = new Array();
		var pos_cambio = 0;
		
		_P = P.slice();
		
		var direccion = new Array();

		function funcion_direccional(parametro){
			var x = new Array();
			for (var j = 0; j < P.length; j++)
				x.push(P[j] + parametro * direccion[j]);
			return funcion(x);
		}
		
		for (var pos = 0; pos < direcciones.length; pos++){
			var x_limites = calcula_limites_parametro(P, direcciones[pos], limites);
			
			direccion = direcciones[pos];
			var parametro_min = directional_func_min(funcion_direccional, x_limites["_inicio"], x_limites["_fin"], error);
			
			for (var j = 0; j < P.length; j++)
				P[j] = P[j] + parametro_min[0] * direcciones[pos][j];
			funcion_P_nueva = funcion(P);

			if (Math.abs(funcion_P_nueva - funcion_P_anterior) > max_dec){
				pos_cambio = pos;
				max_dec = Math.abs(funcion_P_nueva - funcion_P_anterior);
			}
			
			funcion_P_anterior = funcion_P_nueva;
		}
		
		if (2.0*Math.abs(funcion_P - funcion_P_nueva) < error * (Math.abs(funcion_P) + Math.abs(funcion_P_nueva)))
			break;

		var extrapolado_P = new Array();
		for (var j = 0; j < _P.length; j++)
			extrapolado_P.push(2.0*P[j]-_P[j]);

		var nueva_direccion = new Array();
		for (var j = 0; j < P.length; j++)
			nueva_direccion.push(P[j]-_P[j]);

		var f_extrapolado_P = funcion(extrapolado_P);

		if (f_extrapolado_P > funcion_P){
			i++;
			continue;
		}
		
		if (2.0*(funcion_P - 2.0 * funcion_P_nueva + f_extrapolado_P)*Math.pow((funcion_P - funcion_P_nueva - max_dec), 2.0) 
			- max_dec * Math.pow((funcion_P - f_extrapolado_P), 2.0) >= 0){
			i++
			continue;
		}
		
		var x_limites = calcula_limites_parametro(P, nueva_direccion, limites);	
		direccion = nueva_direccion;
		var parametro_min = directional_func_min(funcion_direccional, x_limites["_inicio"], x_limites["_fin"], error);
		
		for (var j = 0; j < P.length; j++)
			P[j] = P[j] + parametro_min[0] * nueva_direccion[j];

		for (var j = 0; j < direcciones.length; j++)
			if (j == pos_cambio) direcciones[j] = nueva_direccion;
		
		i++;
	}
	return P	
}
