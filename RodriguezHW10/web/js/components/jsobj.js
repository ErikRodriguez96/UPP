"use strict";
function jsobj () {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
      <h2>JS Objects</h2>
        <p>
            Hover over the image to see the favorite spots and to convert the currency.
        </p>
    
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    ele.appendChild(twoPics());
    return ele; 
}
