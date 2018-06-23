function loadImageInCanvas(canvas, imageUrl, placement) {
    let ctx = canvas.getContext("2d");
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create the image and put it in the canvas as soon as it loads
    let img = new Image();
    img.onload = function() {
        ctx.drawImage(img, placement.x, placement.y);
    };

    img.src = imageUrl;
}

export { loadImageInCanvas };