function normal_dist(x){
	var funcion = "1.0/Math.sqrt(2.0*Math.PI)*Math.exp(-1.0/2.0*Math.pow(@x,2.0))";
	if (x>=20.0) return 1.0;
	else if (x<=-20.0) return -1.0;
	else
		return (1 + integral_Simpson_grado_2(funcion, -x, x, 1000))/2.0;
}

function priceBlackScholes(spot, strike, maturity, volatility, rate, dividend_rate, type){

	var d_plus = 1.0/volatility/Math.sqrt(maturity)*
			Math.log(spot*Math.exp((rate-dividend_rate)*maturity)/strike)+
			1.0/2.0*volatility*Math.sqrt(maturity);
	var d_minus = 1.0/volatility/Math.sqrt(maturity)*
			Math.log(spot*Math.exp((rate-dividend_rate)*maturity)/strike)-
			1.0/2.0*volatility*Math.sqrt(maturity);

	if (type == "call")
		return spot * normal_dist(d_plus) * Math.exp(-dividend_rate * maturity)
			- strike * Math.exp(-rate*maturity) * normal_dist(d_minus);
	else if (type == "put")
		return strike * Math.exp(-rate*maturity) * normal_dist(-d_minus) 
			- spot * normal_dist(-d_plus) * Math.exp(-dividend_rate * maturity);
	else
		return 0.0;
}

function normal_density(x){
	return 1.0/Math.sqrt(2.0 * Math.PI) * Math.exp(-1.0/2.0 * Math.pow(x, 2.0));
}

function greeksBlackScholes(spot, strike, maturity, volatility, rate, dividend_rate, type){

	var resultado = {delta:0.0, vega:0.0, theta:0.0, rho:0.0, dividend_delta:0.0};

	var d_plus = 1.0/volatility/Math.sqrt(maturity)*
			Math.log(spot*Math.exp((rate-dividend_rate)*maturity)/strike)+
			1.0/2.0*volatility*Math.sqrt(maturity);
	var d_minus = 1.0/volatility/Math.sqrt(maturity)*
			Math.log(spot*Math.exp((rate-dividend_rate)*maturity)/strike)-
			1.0/2.0*volatility*Math.sqrt(maturity);

	if (type == "call"){
	   resultado["delta"] = Math.exp(-dividend_rate * maturity) * normal_dist(d_plus);
	   resultado["vega"] = spot * Math.sqrt(maturity) * Math.exp(-dividend_rate * maturity) * normal_density(d_plus);
	   resultado["theta"] = strike * Math.exp(-rate * maturity) * rate * normal_dist(d_minus) + 
				spot * Math.exp(-dividend_rate * maturity) * (-dividend_rate * normal_dist(d_plus) +
								volatility/(2.0 * Math.sqrt(maturity)) * normal_density(d_plus))
	   resultado["rho"] = strike * maturity * Math.exp(-rate * maturity) * normal_dist(d_minus);
	   resultado["dividend_delta"] = -spot * maturity * Math.exp(-dividend_rate * maturity) * normal_dist(d_plus);
	}
	else if (type == "put"){
	   resultado["delta"] = Math.exp(-dividend_rate * maturity) * (normal_dist(d_plus) - 1);
	   resultado["vega"] = spot * Math.sqrt(maturity) * Math.exp(-dividend_rate * maturity) * normal_density(d_plus);
	   resultado["theta"] = -strike * Math.exp(-rate * maturity) * rate * normal_dist(-d_minus) + 
				spot * Math.exp(-dividend_rate * maturity) * (dividend_rate * normal_dist(-d_plus) -
								volatility/(2.0 * Math.sqrt(maturity)) * normal_density(-d_plus))
	   resultado["rho"] = -strike * maturity * Math.exp(-rate * maturity) * normal_dist(-d_minus);
	   resultado["dividend_delta"] = spot * maturity * Math.exp(-dividend_rate * maturity) * normal_dist(-d_plus);
	}
	return resultado;
}
