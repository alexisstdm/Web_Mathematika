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
