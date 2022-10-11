const burgerButton = document.getElementById("sidebarCollapse");
const bar = document.querySelector("#sidebar");

const handleClick = () => {
	burgerButton.classList.toggle("hamburger--active");
	bar.classList.toggle("active");
};

burgerButton.addEventListener("click", handleClick);
