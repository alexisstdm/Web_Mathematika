function busca_cambio_signo(funcion, a, b, n) {
	
	if (n==0) {
		return "ERROR";
	} 
	else {
		if (evaluaExpresion(funcion,"x",a)*evaluaExpresion(funcion,"x",b)<=0) {
			return a;
		}
		else {
			var izquierda = busca_cambio_signo(funcion,a,a+(b-a)/2,n-1);
			var derecha = busca_cambio_signo(funcion,a+(b-a)/2,b,n-1);
			if (izquierda=="ERROR") {
				if (derecha=="ERROR") {
					return "ERROR";
				}
				else {
					return derecha;
				}
			}
			else {
				if (derecha=="ERROR") {
					return izquierda;
				}
				else {
					if (evaluaExpresion(funcion,"x",izquierda)*evaluaExpresion(funcion,"x",a)<=0) {
						return izquierda;
					}
					else {
						return derecha;
					}
				}
			}
		}
	}
}

	

function calculaCeros(funcion, cotaInferior, cotaSuperior) {
	
	var ERROR = 1.0e-5;
	var inferior = cotaInferior;
	var superior = busca_cambio_signo(funcion, cotaInferior, cotaSuperior, 10);
	if (superior != "ERROR") {
		if (superior == inferior) {
			superior = cotaSuperior;
		}
	}
	else {
		return "ERROR";
	}

	var f_medio = 0.0;
	var f_inferior = evaluaExpresion(funcion, "x", inferior);
	var f_superior = evaluaExpresion(funcion, "x", superior);

	if (Math.abs(cotaSuperior-cotaInferior)<=ERROR) return contaInferior;

	while (Math.abs(inferior-superior)>=ERROR) {
		f_medio = evaluaExpresion(funcion, "x", inferior+(superior-inferior)/2.0);
		if (f_medio*f_inferior<0) {
			superior = inferior+(superior-inferior)/2.0;
		}
		else {
			if (f_medio*f_inferior==0){
				if (f_inferior==0){
					return inferior;
				}
				else {
					return inferior+(superior-inferior)/2.0;
				}
			}
			else {
				if (f_medio*f_superior<0) {
					inferior = inferior+(superior-inferior)/2.0;
				}
				else {
					if (f_medio*f_superior==0) {
						if (f_superior==0) {
							return superior;
						}
						else {
							return inferior+(superior-inferior)/2.0;
						} 
					}
					else {
						return "ERROR";
					}
				}
			}
		}
		f_inferior = evaluaExpresion(funcion, "x", inferior);
		f_superior = evaluaExpresion(funcion, "x", superior);
	}
	return inferior+(superior-inferior)/2.0;
}
