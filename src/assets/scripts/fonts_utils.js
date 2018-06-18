import axios from 'axios'

const fontsLocation = "https://agube.lu/generator/css/fonts/";
const fontsAPI = "https://agube.lu/api/fonts";

function loadFonts(extra = false) {
    var newStyle = document.createElement('style');
    document.head.appendChild(newStyle);
    newStyle.setAttribute("id", "style-fonts");

    axios.get(fontsAPI + (extra ? "?extra" : ""))
        .then(response => {
            var fonts = response.data;
            fonts.forEach(addFont);
            Event.$emit('newFontsReady', fonts);
        })
        .catch(error => {
            alert("Error retrieving fonts: " + error);
        });
}

function addFont(fontName) {
    var style = document.getElementById('style-fonts');
    style.appendChild(document.createTextNode(`
        @font-face {
            font-family: "${fontName}";
            src: url('${fontsLocation}${fontName}.ttf');
        }
    `));
}

export {addFont, loadFonts};
