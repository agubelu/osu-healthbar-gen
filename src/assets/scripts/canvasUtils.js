function loadImageInCanvas(canvas, imageUrl, placement, start, end, color, addDarkBorder = false) {
    let ctx = canvas.getContext("2d");
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create the image and put it in the canvas as soon as it loads
    let img = new Image();
    img.onload = function() {
        ctx.drawImage(img, placement.x, placement.y);
        recolorCanvas(canvas, start, end, color, addDarkBorder);
    };

    img.src = imageUrl;
}

function recolorCanvas(canvas, start, end, color, addDarkBorder = false) {
    let ctx = canvas.getContext("2d");
    let imageData;

    if(!addDarkBorder) {
        // Easy recolor
        imageData = ctx.getImageData(start.x, start.y, end.x-start.x+1, end.y-start.y+1);

        for(var x = 0; x < imageData.width; x++) {
            for(var y = 0; y < imageData.height; y++) {
                recolorPixel(imageData, x, y, color);
            }
        }

        ctx.putImageData(imageData, start.x, start.y);
    } else {
        // For the healthbar background, we need to add a darker border and bars
        // this is pretty much ad-hoc but hey, it works
        imageData = ctx.getImageData(start.x-8, start.y-8, end.x-start.x+17, end.y-start.y+17);
        let darkeningFactor = 1.5;

        let darkColor = {
            r: Math.round(color.r / darkeningFactor),
            g: Math.round(color.g / darkeningFactor),
            b: Math.round(color.b / darkeningFactor),
        };

        for(var x = 0; x < imageData.width; x++) {
            for(var y = 0; y < imageData.height; y++) {
                if(x < 8 || y < 8 || x >= imageData.width-8 || y >= imageData.height-8 
                   || (x >= 258 && x <= 263) || (x >= 559 && x <= 565) || (x >= 862 && x <= 867)) {
                    recolorPixel(imageData, x, y, darkColor);
                } else {
                    recolorPixel(imageData, x, y, color);
                }
            }
        }

        ctx.putImageData(imageData, start.x-8, start.y-8);
    }
}

function recolorPixel(imageData, x, y, color) {
    let i = y * (imageData.width * 4) + x * 4;
    imageData.data[i] = color.r;
    imageData.data[i+1] = color.g;
    imageData.data[i+2] = color.b;
}

function roundedClip(ctx, x, y, width, height, radius) {
    // From https://stackoverflow.com/a/19593950/5604339
    // This is probably better than manually trimming the corners using square distance
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
}

export { loadImageInCanvas, recolorCanvas, roundedClip };