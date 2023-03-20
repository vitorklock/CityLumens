function snapAndMeasure() {
    const context = canvas.getContext("2d");

    canvas.height = video.offsetHeight;
    canvas.width = video.offsetWidth;
    context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);

    let
        imageData = context.getImageData(0, 0, canvas.width, canvas.height),
        data = imageData.data;

    let r, g, b, avg, colorSum = 0;

    for (let x = 0, len = data.length; x < len; x += 4) {
        r = data[x];
        g = data[x + 1];
        b = data[x + 2];

        avg = Math.floor((r + g + b) / 3);

        colorSum += avg;
    }

    const brightness = Math.floor(colorSum / (canvas.width * canvas.height));
    return brightness;
}