
console.log("injected")
async function asyncmessaging(message) {
    console.log(message, 4)
    return new Promise((res, rej) => {
        chrome.runtime.sendMessage(message, function (response) {
            res(response);

        });
    });
}

async function delay(ms) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('done')
        }, ms)
    });
}
async function retrieveStorage(key) {
    return new Promise((res, rej) => {
        chrome.storage.local.get(key, function (data) {
            res(data)

        });
    })
}


var recorder = null
function onAccessApproved(stream) {
    recorder = new MediaRecorder(stream);
    recorder.start();
    recorder.onstop = function () {
        stream.getTracks().forEach(function (track) {
            if (track.readyState == 'live') {
                track.stop();
            }
        });
    }

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

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    sendResponse("seen")
    if (message.action === "open_dialog_box") {
        console.log("recording request")
        // chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], onAccessApproved);

        navigator.mediaDevices
            .getDisplayMedia({
                audio: true,
                video: {
                    width: 9999999999,
                    height: 9999999999
                }
            })
            .then((stream) => {

                onAccessApproved(stream)
            })

        // await asyncmessaging({ message: "recordpermission" })

    }
    if (message.action === "stopvideo") {
        console.log("stopping video")
        if (!recorder) {

        }
        recorder.stop()

    }
    if (message.action === "access_approved") {
        // recorder.stop()

        navigator.mediaDevices
            .getDisplayMedia({
                audio: true,
                video: true,

            })
            .then((stream) => {

                onAccessApproved(stream)
            })


    }
    // await asyncmessaging({ message: "screenshot" })
    // await delay(1000)
    // const image = await retrieveStorage("screenshot")
    // const anchor = document.createElement("a")
    // anchor.setAttribute("href", image.screenshot)
    // anchor.setAttribute("download", "newfile.png")
    // document.querySelector("body").appendChild(anchor)
    // anchor.click();
    // document.querySelector("body").removeChild(anchor)

    // Request access to the user's screen




})