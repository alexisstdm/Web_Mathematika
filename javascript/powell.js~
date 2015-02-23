function Intervalo(inicial, final, incluido_inicial, incluido_final){
	this._inicial = inicial;
	this._final = final;
	this._incluido_inicial = incluido_inicial;
	this._incluido_final = incluido_final;
	this.is_in_interval = function(numero_real){
			if (numero_real > this._final || numero_real < this._inicial) return false;
			else 
				if (numero_real = this._inicial && !(this._incluido_inicial)) return false;
				else 
					if (numero_real = this._final && !(this._incluido_final)) return false;
					else return false;				 			     
		}
}

function calcula_limites_parametro(P, v, limites){

	var intervalo = new Intervalo(0.0, 0.0, true, true);
	var intervalo_resultado = new Intervalo(0.0, 0.0, true, true);

	var primera_vez = true;

	for (var i = 0; i < limites.length; i++){
		if (v[i] != 0.0) {
			 intervalo._inicial = (limites[i]._inferior - P[i])/v[i];
		         intervalo._final = (limitess[i]._superior - P[i])/v[i];
			 if (v[i]>0) {	
				if ((intervalo._inicial > intervalo_resultado._inicial) || primera_vez) {
					intervalo_resultado._inicial = intervalo._inicial;
				}
				if ((intervalo._final < intervalo_resultado._final) || primera_vez) {
					intervalo_resultado._final = intervalo._final;
				}
			}
			else {
				if ((intervalo._inicial < intervalo_resultado._final) || primera_vez) {
					intervalo_resultado._final = intervalo._inicial;
				}
				if ((intervalo._final > intervalo_resultado._inicial) || primera_vez) {
					intervalo_resultado._inicial = intervalo._final;
				}
			}
	}

	return intervalo_resultado;		
}

function directional_func_min(funcion, comienzo, fin, tol){
	var PHI = (1.0 + Math.sqrt(5.0))/2.0;
	
	var x0 = comienzo;
	var x2 = fin;
	var x1 = comienzo + (fin - comienzo) * (PHI - 1.0);

	var f0 = funcion(x0);
	var f1 = funcion(x1);
	var f2 = funcion(x2);

	var primer_subintervalo =(f1<f2);	
	
	while (Math.abs(x2-x1) > tol*(Math.abs(x0)+Math.abs(x1))){
		var nuevo = 0.0 ;

		if (primer_subintervalo) nuevo = x0 + (x1 - x0) * (PHI - 1.0);
		else nuevo = x2 - (x2 - x1) * (PHI - 1));

          	var f_nuevo = funcion(nuevo);

		if (primer_subintervalo){
                	x2 = x1;
                	fx2 = fx1;
		}
             	else {
                	x0 = x1;
                	fx0 = fx1;
		}
	
          	if (f_nuevo >= fx1) primer_subintervalo = !primer_subintervalo;
             		
          	x1 = nuevo;
          	fx1 = f_nuevo; 
	}
	return new array(x1, fx1);
}

function powell_algorithm(funcion, Punto, direcciones, limites, error, maximo_iteraciones){
	var i = 0;
	var P = new Array();
	P = Punto.slice();
	
	while (i < maximo_iteraciones){
		var max_dec = 0.0;
		var funcion_P = funcion(P);
		var _P = new Array();
		var pos_cambio = 0;
		
		_P = P.slice();
		
		var direccion = new Array();

		function funcion_direccional(parametro){
			for (var j = 0; j < P.length; j++)
				x.push(P[j] + parametro * direccion[j]);
			return funcion(x);
		}
		
		for (var pos = 0; pos < direcciones.length; pos++){
			var x_limites = calcula_limites_parametro(P, direcciones[pos], limites);
			
			direccion = direcciones[pos];
			var parametro_min = directional_func_min(funcion_direccional, x_limites[_inicial], x_limites[_final], error);
			
			for (var j = 0; j < P.length; j++)
				P[j] = P[j] + parametro_min * direcciones[pos][j];
			funcion_P_nueva = funcion(P);

			if (Math.abs(funcion_P_nueva - funcion_P) > max_dec){
				pos_cambio = pos;
				max_dec = Math.abs(funcion_P_nueva - funcion_P);
			}
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

		if (f_extrapolado_P >= funcion_P)
			continue;

		if (2.0*(funcion_P - 2.0 * funcion_P_nueva + f_extrapolado_P)*Math.pow((funcion_P - funcion_P_nueva - max_dec), 2.0) 
			- max_dec * Math.pow((funcion_P - f_extrapolado_P), 2.0) >= 0)
			continue;
		
		var x_limites = calcula_limites_parametro(P, nueva_direccion, limites);	
		direccion = nueva_direccion;
		var parametro_min = directional_func_min(funcion_direccional, x_limites[_inicial], x_limites[_final], error);
		
		for (var j = 0; j < P.length; j++)
			P[j] = P[j] + parametro_min * nueva_direccion[j];

		for (var j = 0; j < direcciones.length, j++)
			if (j == pos_cambio) direcciones[j] = nueva_direccion;
	}
	return P	
}
