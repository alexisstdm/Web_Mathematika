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
