
const
    video = document.getElementById('video'),
    canvas = document.getElementById('canvas'),
    // capture = document.getElementById('capture'),
    visualization = document.getElementById('visualization'),
    fuzzy = 0.1;

let processing = false;
function register() {
    if (!processing) {
        processing = true;
        navigator.geolocation.getCurrentPosition(on, on)

        function on(arg1) {
            console.log(arg1);

            if (arg1 instanceof GeolocationPosition) {
                $(".out .data").html(`
                <div><span>Timestamp</span>${arg1.timestamp}</div>
                <div><span>Accuracy (Deviation)</span> ${arg1.coords.accuracy}</div>
                <div><span>Altitude</span> ${arg1.coords.altitude}</div>
                <div><span>altitudeAccuracy</span> ${arg1.coords.altitudeAccuracy}</div>
                <div><span>Heading</span> ${arg1.coords.heading}</div>
                <div><span>Latitude</span> ${arg1.coords.latitude}</div>
                <div><span>Longitude</span> ${arg1.coords.longitude}</div>
                <div><span>Speed</span> ${arg1.coords.speed}</div>
                `)
            }
        }
        let brightness = snapAndMeasure();
        console.log(brightness);
        visualization.style.backgroundColor =
            `rgb(${brightness},${brightness},${brightness})`

        setTimeout(() => processing = false, 500);
    } else {
        console.error("Already processing!")
    }
}

$(document).ready(async () => {
    navigator.geolocation;

    let stream = await navigator.mediaDevices
        .getUserMedia({ video: true, audio: false });

    video.srcObject = stream;
    video.play();
})

function takePicture() {
    const context = canvas.getContext("2d");

    canvas.height = video.offsetHeight;
    canvas.width = video.offsetWidth;
    context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);

    const data = canvas.toDataURL("image/png");
    capture.setAttribute("src", data);
}