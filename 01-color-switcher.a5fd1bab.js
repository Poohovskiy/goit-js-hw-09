!function(){var t=document.body,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),o=null;e.addEventListener("click",(function(){e.setAttribute("disabled",!0),o=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),n.addEventListener("click",(function(){clearInterval(o),e.removeAttribute("disabled"),t.style.backgroundColor="rgb(250, 250, 250)"}))}();
//# sourceMappingURL=01-color-switcher.a5fd1bab.js.map
