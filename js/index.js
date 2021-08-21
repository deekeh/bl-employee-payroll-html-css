const salarySlider = document.getElementById("salary");
// console.log(salarySlider);

salarySlider.onchange = function() {
  document.getElementById("salary-text").innerHTML = salarySlider.value;
}