
const
    video = document.getElementById('video'),
    canvas = document.getElementById('canvas'),
    // capture = document.getElementById('capture'),
    visualization = document.getElementById('visualization'),
    fuzzy = 0.1, inbetweenDelay = 4000;

// let geolocation; TODO monitor location into this
let processing = false;

function error(...args) {
    console.error(...args);
}

function streaming(bool) {
    $("#visual")[(bool ? "add" : "remove") + "Class"]("streaming");
    processing = !bool;
}

function register() {
    if (!processing) {
        streaming(false);
        navigator.geolocation.getCurrentPosition(on, error);

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
            `rgb(${brightness},${brightness},${brightness})`;
        $("#brightnessVal").text(`${brightness} (${(255 * 100) / brightness}%)`);

        setTimeout(() => streaming(true), inbetweenDelay);
    } else {
        console.error("Already processing!")
    }
}

$(document).ready(async () => {
    // Start geolocation
    navigator.geolocation;

    // Start video stream
    let stream = await navigator.mediaDevices
        .getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.play();

    $("#loading button").show();
})

function init() {
    $("#loading").hide();
}