function evaluaExpresion(expresion, variable, valor){

	var aux = new String();
	var retorno = new String();
	retorno = expresion;
	do {
		retorno = retorno.replace(variable, "("+String(valor)+")");
		aux = retorno.match(variable);
	} while (aux != null);

	return eval(retorno);

}

function construyeFuncion(expresion){
	var inicio = 0;
	var variables_posicion = {};
	var posicion = 0
	while (inicio >= 0){
		inicio = expresion.indexOf('@', inicio);
		if (inicio >= 0){
			if (!(expresion[inicio+1] in variables_posicion)){
				variables_posicion[expresion[inicio+1]] = posicion;
				posicion++;
			}
			inicio++;
		}
	}

	var cuerpo_funcion = new String();
	var fin = 0;

	inicio = 0;

	while (fin >= 0){
		fin = expresion.indexOf('@', inicio);
		if (fin >= 0){
			cuerpo_funcion = cuerpo_funcion.concat(expresion.substring(inicio, fin));
			cuerpo_funcion = cuerpo_funcion.concat("Parametros", "[", new String(variables_posicion[expresion[fin+1]]),
					"]");
			inicio = fin + 2;
		}
		else {
			cuerpo_funcion = cuerpo_funcion.concat(expresion.substring(inicio, expresion.length));
		}
	}
	
	var funcion = new String("(function(Parametros){ return ");
	funcion = funcion.concat(cuerpo_funcion, "; })");

	return eval(funcion);
}
