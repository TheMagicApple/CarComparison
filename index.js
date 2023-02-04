// Data source: https://insideevs.com/reviews/344001/compare-evs/
var carData = JSON.parse(data);

const Criteria = {
	Model: "Model",
	Price: "Price",
	Drive: "Drive",
	Capacity: "Capacity",
	Range: "Range",
	ZeroToSixty: "0to60",
	MaxSpeed: "MaxSpeed"
}


function sort(property) {
	for (i = 0; i < carData.length - 1; i++) {
		for (j = 0; j < carData.length - i - 1; j++) {
			data1 = carData[j];
			data2 = carData[j + 1];
			if (data1[property] > data2[property]) {
				carData[j] = data2;
				carData[j + 1] = data1;
			}
		}
	}
}


function main() {
	console.log(carData);
	sort(Criteria.Drive);
	console.log(carData);
}


main();
