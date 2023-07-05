const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
var map_lanzamiento = [];
var map_valence = [];
var mes_lanzamiento = [];
var valence_por_mes = [];

//  ----------------------------------  VALENCE ------------------------------
d3.csv("../data/results_global.csv", d3.autoType).then(function (data) {
	key = 'valence';

	let newchart = Plot.plot({
		width: window.innerWidth-50,
		height: window.innerHeight-50,
		grid: true,
		marginTop: 50,
		marginLeft: 50,
		marginRight: 50,
		x: {
			ticks: 10,
			label: key,
			axis: "bottom",
		},
		marks: [
			Plot.image(
				data,
				Plot.dodgeY({
					x: key,
					padding: 5,
					r: 45,
					anchor: "middle",
					src: "imagen",
					width: 90,
				})
			),
		],
	});

	var elem = d3.select("#graph")
		.append(() => newchart)
		.attr("color", "#fff");
})


//  ----------------------------------  MESES ------------------------------
d3.csv("../data/results_global.csv", d3.autoType).then(function (data) {
	map_lanzamiento = data.map(function(d) {return d.lanzamiento});

	for (i = 0; i < map_lanzamiento.length; i++) {
		const element = map_lanzamiento[i];
		mes_lanzamiento.push(element.getMonth())
	}

	let newchart = Plot.plot({
		width: window.innerWidth-50,
		height: window.innerHeight-100,
		grid: true,
		marginTop: 50,
		marginLeft: 50,
		marginRight: 50,
		x: {
			ticks: 10,
			label: mes_lanzamiento,
			axis: "bottom",
		},
		marks: [
			Plot.image(
				data,
				Plot.dodgeY({
					x: mes_lanzamiento,
					padding: 5,
					r: 45,
					anchor: "middle",
					src: "imagen",
					width: 90,
				})
			),
			/* Plot.plot({
				x: {
					domain: meses,
				},
			}), */
		],
	});

	var elem = d3.select("#graph2")
		.append(() => newchart)
		.attr("color", "#fff");
})

d3.csv("../data/results_global.csv", d3.autoType).then(function (data) {
	map_lanzamiento = data.map(function(d) {return d.lanzamiento});
	map_valence = data.map(function(d) {return d.valence});

	for (let i = 0; i < 12; i++) {
		valence_por_mes.push(0);
	}

	for (i = 0; i < map_lanzamiento.length; i++) {
		const element = map_lanzamiento[i];
		mes_lanzamiento.push(element.getMonth())
		valence_por_mes[element.getMonth()-1] = (valence_por_mes[element.getMonth()-1] + map_valence[i])/2;
	}

	console.log(valence_por_mes)
	console.log(mes_lanzamiento)

	let newchart = Plot.plot({
		width: window.innerWidth-100,
		height: window.innerHeight-100,
		grid: true,
		marginTop: 50,
		marginLeft: 100,
		paddingLeft: 100,
		marginRight: 50,
		x: {
			ticks: 13,
			tickFormat: (d) => extraerMes(d),
			label: "meses",
			axis: "bottom",
		},
		marks: [
			Plot.image(
				data,
				Plot.dodgeY({
					x: mes_lanzamiento,
					padding: 5,
					r: 40,
					anchor: "middle",
					src: "imagen",
					width: 80,
				})
			),
			Plot.line(
				data,
				{
					x: [0,1,2,3,4,5,6,7,8,9,10,11],
					y: valence_por_mes,
					curve: 'natural',
				}
			)
		],
	});

	var elem = d3.select("#graph3")
		.append(() => newchart)
		.attr("color", "#fff");
})

function extraerMes(dat){
	console.log(meses[dat])
	return meses[dat]
}