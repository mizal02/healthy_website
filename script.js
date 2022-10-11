const burgerButton = document.getElementById("sidebarCollapse");
const bar = document.querySelector("#sidebar");

const input1 = document.getElementById("display-1");
const input2 = document.getElementById("display-2");
const input3 = document.getElementById("display-3");
let sex = document.getElementById("form-select-sex");
let PAL = document.getElementById("form-select-active");
let target = document.getElementById("form-select-target");
const btn = document.querySelector("button.btn-bmr-score");

const vegImg = document.getElementById("vegetables-img");

const h3 = document.createElement("h3");
const newH3 = document.getElementsByClassName("calc-Bmr");
newH3[0].appendChild(h3);

let weight;
let height;
let age;
let BMR;
let pal;
let palValue, targetValue;
let isWoman = true;
let W, T, B;

const handleClick = () => {
	burgerButton.classList.toggle("hamburger--active");
	bar.classList.toggle("active");
};

burgerButton.addEventListener("click", handleClick);

// kalkulator kalorii

input1.addEventListener("keyup", (e) => {
	weight = input1.value;
	console.log(weight);
});
input2.addEventListener("keyup", (e) => {
	height = input2.value;
	console.log(height);
});
input3.addEventListener("keyup", (e) => {
	age = input3.value;
	console.log(age);
});

const checkPalValue = () => {
	pal = PAL.options[PAL.selectedIndex].value;
	switch (Number(pal)) {
		case 1:
			palValue = 1.2;
			break;
		case 2:
			palValue = 1.3;
			break;
		case 3:
			palValue = 1.4;
			break;
		case 4:
			palValue = 1.5;
			break;
		case 5:
			palValue = 1.7;
			break;
		default:
			console.log("PAL - coś poszlo nie tak");
			break;
	}
};

const checkSex = () => {
	switch (Number(sex.options[sex.selectedIndex].value)) {
		case 1:
			isWoman = true;
			break;
		case 2:
			isWoman = false;
			break;
		default:
			console.log("Wybierz płeć - coś poszło nie tak");
			break;
	}
};

const calculateBmr = () => {
	if (isWoman) {
		if (age > 10 && age < 18) {
			BMR = Math.ceil((weight * 12.2 + 746) * palValue);
		} else if (age >= 18 && age <= 30) {
			BMR = Math.ceil((weight * 14.7 + 496) * palValue);
		} else if (age >= 31 && age <= 70) {
			BMR = Math.ceil((weight * 8.7 + 829) * palValue);
		} else {
			BMR = Math.ceil((weight * 9.5 + 830) * (palValue + 0.2));
		}
	} else {
		if (age > 10 && age < 18) {
			BMR = Math.ceil((weight * 17.5 + 651) * palValue);
		} else if (age >= 18 && age <= 30) {
			BMR = Math.ceil((weight * 15.3 + 679) * palValue);
		} else if (age >= 31 && age <= 70) {
			BMR = Math.ceil((weight * 11.6 + 879) * palValue);
		} else {
			BMR = Math.ceil((weight * 12 + 850) * (palValue + 0.2));
		}
	}
};

const checkTarget = () => {
	switch (Number(target.options[target.selectedIndex].value)) {
		case 1:
			targetValue = 0.85;
			BMR = BMR * targetValue;
			break;
		case 2:
			targetValue = 1;
			BMR = BMR * targetValue;
			break;
		case 3:
			targetValue = 1.2;
			BMR = BMR * targetValue;
			break;
		default:
			console.log("Wybierz cel - coś poszło nie tak");
			break;
	}
};

const displayBMR = () => {
	checkPalValue();
	checkSex();
	calculateBmr();
	checkTarget();
	if (
		weight === undefined ||
		weight === "" ||
		height === undefined ||
		height === "" ||
		age === undefined ||
		age === ""
	) {
		h3.innerHTML = "Wprowadziłeś niepoprawne/niekompletne dane!";
	} else {
		console.log(`Twoje BMR wynosi: ${BMR}`);
		h3.style.marginTop = "16px";
		h3.innerHTML = `Twoje BMR wynosi: ${Math.ceil(BMR)}`;
		createChart();
	}
};

// donut chart
const createChart = () => {
	vegImg.style.display = "none";
	W = (0.5 * BMR) / 4;
	T = (0.25 * BMR) / 9;
	B = (0.25 * BMR) / 4;
	var options = {
		series: [W, T, B],
		chart: {
			type: "donut",
			height: 200,
		},
		dataLabels: {
			enabled: false,
		},
		colors: ["#9C27B0", "#E91E63", "#79B4CF"],
		fill: {
			colors: ["#9C27B0", "#E91E63", "#79B4CF"],
		},
		labels: ["Węglowodany", "Tłuszcze", "Białko"],

		legend: {
			formatter: function (value, option) {
				return (
					value + " - " + Math.ceil(option.w.globals.series[option.seriesIndex])
				);
			},
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 100,
					},
					legend: {
						position: "bottom",
					},
				},
			},
		],
	};
	const chart = new ApexCharts(document.querySelector("#donut-chart"), options);
	chart.render();
};

btn.addEventListener("click", displayBMR);
