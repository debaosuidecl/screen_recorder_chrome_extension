// Request access to the user's screen
chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], onAccessApproved);

function onAccessApproved(chromeMediaSourceId) {
    // Create a MediaRecorder instance
    var recorder = new MediaRecorder(chromeMediaSourceId);

    // Start recording
    recorder.start();

    // Listen for the dataavailable event to access the recorded data
    recorder.ondataavailable = function (event) {
        // Get the recorded data as a Blob
        var recordedBlob = event.data;

        // Create a URL for the recorded data
        var url = URL.createObjectURL(recordedBlob);

        // Use the URL to create an <a> element to download the recording
        var a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "screen-recording.webm";

        // Add the <a> element to the document
        document.body.appendChild(a);

        // Click the <a> element to start the download
        a.click();

        // Remove the <a> element from the document
        document.body.removeChild(a);

        // Revoke the object URL
        URL.revokeObjectURL(url);
    };
}
