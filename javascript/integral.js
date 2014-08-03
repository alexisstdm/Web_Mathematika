function integral(funcion, limite_inf, limite_sup){
	alert("Entrando en Funcion");
	var error = 0.001
	var numero_iteraciones = Math.ceil(
				Math.abs(limite_sup-limite_inf)/error*
				Math.abs(funcion(limite_sup)-funcion(limite_inf)));
	alert(numero_iteraciones)
	var paso = Math.abs(limite_sup-limite_inf)/numero_iteraciones;
	var x = limite_inf;
	var suma = 0;
	while (x<=limite_sup){
		suma = suma + paso*(funcion(x)+funcion(x+paso))/2;
		x = x + paso;
	} 

	return suma;
}
