window.addEventListener('DOMContentLoaded', () => {
  const EPC = require("electron")

  let range = document.getElementById("range");
  let base = window.getComputedStyle(document.body).getPropertyValue("--base");
  let second = window.getComputedStyle(document.body).getPropertyValue("--second");
  let rangeValue = document.getElementById("item-audio-subaudio");

  let init = (value) => {
    document.documentElement.style.setProperty("--range", value + "%");
  }
  let updateVar = (value) => {
    document.documentElement.style.setProperty("--range", value + "%");
    if (value >= 100) {
      document.documentElement.style.setProperty("--trackball", second);
    } else {
      document.documentElement.style.setProperty("--trackball", base);
    }

  }
  init(range.value);
  range.addEventListener("input", () => {
    updateVar(range.value);
    rangeValue.innerHTML = Math.floor(range.value) + "%"
    volumeRange = (range.value / 100).toFixed(2)
    volume = volumeRange
  });

  // Input Range, Feito(a) por Sasha, https://codepen.io/sashatran/pen/MQZYXB?editors=0110

  /* Dropdown Sizes
  ====================*/
  const sizes = ["375 x 660", "414 x 698", "450 x 750", "600 x 800"]
  const subSizes = ["1280x720", "1366x768", "< 1366x768", "Testing"]
  let alerta = []
  let sizesDropdown = false

  s(".size-item-active").textContent = (innerWidth)+" x "+(innerHeight)
  SizesItem()
  SizeModDom(innerWidth)
  s(".size-active").addEventListener("click", ActionClickSizes)

  function SizesItem() {
      let sizeAtivo = s(".size-item-active").innerHTML.toString().trim()
      let html = ""

      sizes.forEach((element, index) => {
        if(element != sizeAtivo){
          html += `<div class="size-item">
                    <div class="size-value">${element}</div>
                    <div class="size-recommend">${subSizes[index]}</div>
                  </div>`
        }
      });
      s(".nonActive-size-item").innerHTML = html

      document.querySelectorAll(".size-item").forEach(element => {
        element.addEventListener("click", e => {
          sizesDropdown = false
          s(".nonActive-size-item").style.display = "none"
          s(".size-item-active").innerHTML = element.children[0].innerHTML

          let dimensions = element.children[0].innerHTML.split("x")
          EPC.ipcRenderer.send("resize", [dimensions[0], dimensions[1]])
          s(".size-active").removeEventListener("click", ActionClickSizes)
          SizesItem()
        })
      })
  }

  function ActionClickSizes() {
    if (!sizesDropdown) {
      sizesDropdown = true
      s(".nonActive-size-item").style.display = "flex"
    } else {
      sizesDropdown = false
      s(".nonActive-size-item").style.display = "none"
    }
  }

  function SizeModDom(width){
    if(width == 375) {
      document.documentElement.style.setProperty("--carta-width", "80%")
      document.documentElement.style.setProperty("--carta-height", "80%")
    } else if(width == "450") {
      document.documentElement.style.setProperty("--carta-width", "80%");
      document.documentElement.style.setProperty("--carta-height", "80%");
    } else if(width == "414") {
      document.documentElement.style.setProperty("--carta-width", "80%");
      document.documentElement.style.setProperty("--carta-height", "80%");
    }
  }

  function ActiveAlert(mensagem){
    s(".alert").style.display = "flex"
    s(".alert").innerHTML = mensagem
    if(alerta.length > 0) {
      for(let i = 0; i < alerta.length; i++){
        clearTimeout(alerta[i])
      }
      alerta = []
    }
    alerta.push(setTimeout(()=>{
      s(".alert").style.marginTop = 0;
      s(".alert").style.opacity = "0%";
      setTimeout(()=>{
        s(".alert").style.display = "none"
        s(".alert").style.opacity = "100%"
        s(".alert").style.marginTop = "10px"
      }, 300)
    },3000))
  }
  

  EPC.ipcRenderer.on("resize-full", (event, args) => {
    setTimeout(()=>{
      s(".size-active").addEventListener("click", ActionClickSizes)
    }, 300)
    SizeModDom(args[0])
  })

  EPC.ipcRenderer.on("error", (event, args) => {
    ActiveAlert(args[0])
  })

  EPC.ipcRenderer.on("resize-error", (event, args) => {
    s(".size-active").addEventListener("click", ActionClickSizes)
    ActiveAlert(args[0])
    sizesDropdown = true
    s(".nonActive-size-item").style.display = "flex"
  })
})