function home () {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
        <h2>Home</h2>
        <h5>The city and the human are inseperable.</h5>
        <p>
            Civilization flourished as human beings evolved to live together in close proximity, starting a centuries long
            tradition of urbanisation and a rich history of design and planning.
        </p>
    
        <p>
            This project is dedicated towards documenting the modern city in both its splendor and its decay through a collaborative photography project.
            Contributions come in from all around the globe, contribute today and show the world what urbanism means to you.
            Inspired by the 99% Invisible podcast by Roman Mars: <a href = "https://99pi.org/".>99pi.org</a>.
        </p>
    
        <img src="pics/urban_space.jpg">
    
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele; 
}