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
document.getElementById("SearchBar").addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        search();
    }
});

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
            var car = document.createElement('li');
            car.classList.add("carItem");
            
            var img=document.createElement('img');
            img.src="./images/"+carProfile[Criteria.Model]+".webp";
            img.classList.add("carImg");
            car.appendChild(img);
            var name=document.createElement('div');
            name.innerHTML="<b>"+carProfile[Criteria.Model]+"</b>";
           // name.href="";
            name.classList.add("carName");
            car.appendChild(name);
            var view=document.createElement('button');
            view.innerHTML="<b>View</b>";
            view.classList.add("carView");
            car.appendChild(view);
            var price=document.createElement('div');
            price.innerHTML="<b>$"+carProfile[Criteria.Price]+"</b>";
            price.classList.add("carPrice");
            car.appendChild(price);
            var range=document.createElement('div');
            range.innerHTML="<b>"+carProfile[Criteria.Range]+" miles</b>";
            range.classList.add("carRange");
            car.appendChild(range);
            document.querySelector('ul').appendChild(car);

            /*
            var row = table.insertRow();
            var img=row.insertCell(0);
            img.src=carProfile[Criteria.Model]+".png";
            console.log(img.src);
			var model = row.insertCell(1);
			model.innerHTML = carProfile[Criteria.Model];
			var price = row.insertCell(2);
			price.innerHTML = "$" + carProfile[Criteria.Price];
			var range = row.insertCell(3);
			range.innerHTML = carProfile[Criteria.Range] != -1 ? carProfile[Criteria.Range] : "Unknown";
            */
		}
	}
    /*
    document.getElementById("SortName").classList.add("selected");
    document.getElementById("SortPrice").classList.remove("selected");
    document.getElementById("SortRange").classList.remove("selected");
    */
}


function sort(property) {
	// Sort data
    if(property=="Model"){
        document.getElementById("SortName").classList.add("selected");
        document.getElementById("SortPrice").classList.remove("selected");
        document.getElementById("SortRange").classList.remove("selected");
    }
    if(property=="Price"){
        document.getElementById("SortName").classList.remove("selected");
        document.getElementById("SortPrice").classList.add("selected");
        document.getElementById("SortRange").classList.remove("selected");
    }
    if(property=="Range"){
        document.getElementById("SortName").classList.remove("selected");
        document.getElementById("SortPrice").classList.remove("selected");
        document.getElementById("SortRange").classList.add("selected");
    }
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

	//setTableHeader();
    search();
	//addAllResults()
}


function addAllResults() {
	// Set data
	var table = document.getElementById("Results");
	for (var i = 0; i < carData.length; i++) {
		var carProfile = carData[i];
        var car = document.createElement('li');
        car.classList.add("carItem");
        var img=document.createElement('img');
        img.src="./images/"+carProfile[Criteria.Model]+".webp";
        img.classList.add("carImg");
        car.appendChild(img);
        var name=document.createElement('div');
        name.innerHTML="<b>"+carProfile[Criteria.Model]+"</b>";
        name.classList.add("carName");
        car.appendChild(name);
        var price=document.createElement('div');
        price.innerHTML="<b>$"+carProfile[Criteria.Price]+"</b>";
        price.classList.add("carPrice");
        car.appendChild(price);
        var range=document.createElement('div');
        range.innerHTML="<b>"+carProfile[Criteria.Range]+" miles</b>";
        range.classList.add("carRange");
        car.appendChild(range);
        document.querySelector('ul').appendChild(car);
        /*
		var row = table.insertRow();
		var model = row.insertCell(0);
		model.innerHTML = carProfile[Criteria.Model];
		var price = row.insertCell(1);
		price.innerHTML = "$" + carProfile[Criteria.Price];
		var range = row.insertCell(2);
		range.innerHTML = carProfile[Criteria.Range] != -1 ? carProfile[Criteria.Range]+" miles" : "Unknown";
        */
	}
}


function setTableHeader() {
	// Set Header
    
	var table = document.getElementById("Results");
	table.innerHTML = ""; // Clear table
	/*
    var header = table.createTHead();
	var headerRow = header.insertRow(0);
	var modelTag = headerRow.insertCell(0);
	modelTag.innerHTML = "Model";
	var priceTag = headerRow.insertCell(1);
	priceTag.innerHTML = "Expected Price";
	var rangeTag = headerRow.insertCell(2);
	rangeTag.innerHTML = "Range (mi)";
    */
}


function main() {
	sort(Criteria.Model);
}


main();
