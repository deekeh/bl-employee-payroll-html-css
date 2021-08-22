const salarySlider = document.getElementById("salary");

salarySlider.onchange = function() {
  document.getElementById("salary-text").innerHTML = salarySlider.value;
}
