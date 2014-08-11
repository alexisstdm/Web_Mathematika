function integral_Darboux(funcion, a, b, n, tipo){
	var suma = 0.0;
	var h = (b - a) / n;

	for (var i = 0; i < n; i++){
		if (tipo == "superior"){
			suma = suma + evaluaExpresion(funcion, "@x", a + (i + 1) * h) * h;}
		else {
			if (tipo == "inferior"){
				suma = suma + evaluaExpresion(funcion, "@x", a + i * h) * h;}}}
	return suma;
}

function integral(funcion, a, b){
	var ERROR = 0.001;
	var error_integral = 1.0;
	var n = 1000;
	var suma_superior = 0.0;
	var suma_inferior = 0.0;

	while (error_integral > ERROR){
		suma_superior = integral_Darboux(funcion, a, b, n, "superior");
		suma_inferior = integral_Darboux(funcion, a, b, n, "inferior");
		error_integral = Math.abs((suma_superior-suma_inferior)/suma_inferior);
		n = n * 10;
	}
	return suma_superior;
}
