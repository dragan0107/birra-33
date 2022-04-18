const rangeInputs = document.querySelectorAll('.abv-range__range-inputs input'),
  progress = document.querySelector('.abv-range__progress');
let minSpan = document.querySelector('.min-span'),
  maxSpan = document.querySelector('.max-span');
minSpan.innerHTML = rangeInputs[0].value;
maxSpan.innerHTML = rangeInputs[1].value;

let rangeGap = 15;
rangeInputs.forEach((inp) => {
  inp.addEventListener('input', (e) => {
    let minVal = parseInt(rangeInputs[0].value),
      maxVal = parseInt(rangeInputs[1].value);

    if (maxVal - minVal < rangeGap) {
      if (e.target.className === 'range-min') {
        rangeInputs[0].value = maxVal - rangeGap;
      } else {
        rangeInputs[1].value = minVal + rangeGap;
      }
    } else {
      progress.style.left = (minVal / rangeInputs[0].max) * 100 + '%';
      progress.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + '%';
      minSpan.innerHTML = rangeInputs[0].value;
      maxSpan.innerHTML = rangeInputs[1].value;
    }
  });
});
