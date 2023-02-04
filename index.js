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
	// Sort data
	for (var i = 0; i < carData.length - 1; i++) {
		for (var j = 0; j < carData.length - i - 1; j++) {
			var data1 = carData[j];
			var data2 = carData[j + 1];
			if (data1[property] > data2[property]) {
				carData[j] = data2;
				carData[j + 1] = data1;
			}
		}
	}

	// Set Header
	var table = document.getElementById("Results");
	table.innerHTML = ""; // Clear table
	var header = table.createTHead();
	var headerRow = header.insertRow(0);
	var modelTag = headerRow.insertCell(0);
	modelTag.innerHTML = "Model";
	var priceTag = headerRow.insertCell(1);
	priceTag.innerHTML = "Expected Price";
	var driveTag = headerRow.insertCell(2);
	driveTag.innerHTML = "Drive Train";
	var capacityTag = headerRow.insertCell(3);
	capacityTag.innerHTML = "Battery Capacity (kWh)";
	var rangeTag = headerRow.insertCell(4);
	rangeTag.innerHTML = "Range (mi)";
	var zeroToSixtyTag = headerRow.insertCell(5);
	zeroToSixtyTag.innerHTML = "0-60 (sec)";
	var maxSpeedTag = headerRow.insertCell(6);
	maxSpeedTag.innerHTML = "Speed (mph)";

	// Set data
	for (var i = 0; i < carData.length; i++) {
		var carProfile = carData[i];

		var row = table.insertRow();
		var model = row.insertCell(0);
		model.innerHTML = carProfile[Criteria.Model];
		var price = row.insertCell(1);
		price.innerHTML = "$" + carProfile[Criteria.Price];
		var drive = row.insertCell(2);
		drive.innerHTML = carProfile[Criteria.Drive];
		var capacity = row.insertCell(3);
		capacity.innerHTML = carProfile[Criteria.Capacity];
		var range = row.insertCell(4);
		range.innerHTML = carProfile[Criteria.Range] != -1 ? carProfile[Criteria.Range] : "Unknown";
		var zeroToSixty = row.insertCell(5);
		zeroToSixty.innerHTML = carProfile[Criteria.ZeroToSixty] != -1 ? carProfile[Criteria.ZeroToSixty] : "Unknown";
		var maxSpeed = row.insertCell(6);
		maxSpeed.innerHTML = carProfile[Criteria.MaxSpeed] != -1 ? carProfile[Criteria.MaxSpeed] : "Unknown";
	}
}


function main() {
	console.log(carData);
	sort(Criteria.Drive);
	console.log(carData);
}


main();
