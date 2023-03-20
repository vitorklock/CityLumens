function showCoordinates() {
    navigator.geolocation.getCurrentPosition(on, on)

    function on(arg1) {
        console.log(arg1);

        if (arg1 instanceof GeolocationPosition) {
            $(".out").html(`
            <div><span>Timestamp</span>${arg1.timestamp}</div>
            <div><span>Accuracy (Deviation)</span> ${arg1.coords.accuracy}</div>
            <div><span>Altitude</span> ${arg1.coords}</div>
            <div><span>altitudeAccuracy</span> ${arg1.coords.altitudeAccuracy}</div>
            <div><span>Heading</span> ${arg1.coords.heading}</div>
            <div><span>Latitude</span> ${arg1.coords.latitude}</div>
            <div><span>Longitude</span> ${arg1.coords.longitude}</div>
            <div><span>Speed</span> ${arg1.coords.speed}</div>
            `)
        }
    }
}

$(document).ready(navigator.geolocation)