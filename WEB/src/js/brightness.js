function measureBrightness() {
    var fuzzy = 0.1;
    var img = document.createElement("img");
    img.style.display = "none";
    document.body.appendChild(img);

    const context = canvas.getContext("2d");
    canvas.height = video.offsetHeight;
    canvas.width = video.offsetWidth;
    // context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
    img.setAttribute("src", canvas.toDataURL("image/png"));

    // create canvas
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var r, g, b, max_rgb;
    var light = 0, dark = 0;

    for (var x = 0, len = data.length; x < len; x += 4) {
        r = data[x];
        g = data[x + 1];
        b = data[x + 2];

        max_rgb = Math.max(Math.max(r, g), b);
        if (max_rgb < 128)
            dark++;
        else
            light++;
    }

    var dl_diff = ((light - dark) / (img.width * img.height));
    return dl_diff + fuzzy;
}


/// debug code

var imgs = document.body.getElementsByTagName('img');

for (var x = 0; x < imgs.length; x++) {
    imgs[x].onclick = function () {
        isItDark(this.src, function (darkornot) {
            document.getElementsByTagName('pre')[0].innerHTML = "Dark ? " + darkornot;
        });
    }
}

function snapAndMeasure() {
    const context = canvas.getContext("2d");

    canvas.height = video.offsetHeight;
    canvas.width = video.offsetWidth;
    context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
    // capture.setAttribute("src", canvas.toDataURL("image/png"));

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