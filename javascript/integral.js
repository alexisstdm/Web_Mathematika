function Integral(funcion, limite_inf, limite_sup, error=0.01){

	var numero_iteraciones = Math.ceil(
				Math.abs(limite_sup-limite_inf)/error*
				Math.abs(funcion(limite_sup)-funcion(limite_inf)));
	var paso = Math.abs(limite_sup-limite_inf)/numero_iteraciones;
	var x = limite_inf;
	var suma = 0;
	while (x<=limite_sup){
		suma = suma + paso*(funcion(x)+funcion(x+paso))/2;
		x = x + paso;
	}

	return suma;
}
