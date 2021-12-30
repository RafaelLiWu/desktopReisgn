let range = document.getElementById("range");
let base = window.getComputedStyle(document.body).getPropertyValue("--base");
let second = window.getComputedStyle(document.body).getPropertyValue("--second");
let rangeValue = document.getElementById("item-audio-subaudio");

let init = (value) => {
  document.documentElement.style.setProperty("--range", value + "%");
}
let updateVar = (value) => {
   document.documentElement.style.setProperty("--range", value + "%");
  if(value >= 100) {
    document.documentElement.style.setProperty("--trackball", second);
  } else {
    document.documentElement.style.setProperty("--trackball", base);
  }
  
}
init(range.value);
range.addEventListener("input", () => { 
  updateVar(range.value);
  rangeValue.innerHTML = Math.floor(range.value)+"%"
  volumeRange = (range.value / 100).toFixed(2)
  volume = volumeRange
});

// Input Range, Feito(a) por Sasha, https://codepen.io/sashatran/pen/MQZYXB?editors=0110