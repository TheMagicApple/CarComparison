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


function search() {
	setTableHeader();
	
	// Set data
	var str = document.getElementById("SearchBar").value;
	str = str.toLowerCase();
	var table = document.getElementById("Results");
	for (var i = 0; i < carData.length; i++) {
		var carProfile = carData[i];
		var modelStr = carProfile[Criteria.Model];
		modelStr = modelStr.toLowerCase();

		if (modelStr.includes(str)) {
			var row = table.insertRow();
			var model = row.insertCell(0);
			model.innerHTML = carProfile[Criteria.Model];
			var price = row.insertCell(1);
			price.innerHTML = "$" + carProfile[Criteria.Price];
			var range = row.insertCell(2);
			range.innerHTML = carProfile[Criteria.Range] != -1 ? carProfile[Criteria.Range] : "Unknown";
		}
	}
}


function sort(property) {
	// Sort data
	for (var i = 0; i < carData.length - 1; i++) {
		for (var j = 0; j < carData.length - i - 1; j++) {
			var data1 = carData[j];
			var data2 = carData[j + 1];

			if (property == Criteria.Range) {
				if (data1[property] < data2[property]) {
					carData[j] = data2;
					carData[j + 1] = data1;
				}
			}
			else {
				if (data1[property] > data2[property]) {
					carData[j] = data2;
					carData[j + 1] = data1;
				}
			}
		}
	}

	setTableHeader();
	addAllResults()
}


function addAllResults() {
	// Set data
	var table = document.getElementById("Results");
	for (var i = 0; i < carData.length; i++) {
		var carProfile = carData[i];

		var row = table.insertRow();
		var model = row.insertCell(0);
		model.innerHTML = carProfile[Criteria.Model];
		var price = row.insertCell(1);
		price.innerHTML = "$" + carProfile[Criteria.Price];
		var range = row.insertCell(2);
		range.innerHTML = carProfile[Criteria.Range] != -1 ? carProfile[Criteria.Range] : "Unknown";
	}
}


function setTableHeader() {
	// Set Header
	var table = document.getElementById("Results");
	table.innerHTML = ""; // Clear table
	var header = table.createTHead();
	var headerRow = header.insertRow(0);
	var modelTag = headerRow.insertCell(0);
	modelTag.innerHTML = "Model";
	var priceTag = headerRow.insertCell(1);
	priceTag.innerHTML = "Expected Price";
	var rangeTag = headerRow.insertCell(2);
	rangeTag.innerHTML = "Range (mi)";
}


function main() {
	sort(Criteria.Model);
}


main();
