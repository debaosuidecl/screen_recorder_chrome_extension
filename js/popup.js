document.addEventListener("DOMContentLoaded", () => {
    const screenshotButton = document.querySelector("button#pick_color")
    const stoopVideoButton = document.querySelector("button#stop_video")

    screenshotButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box" }, function (response) {
                if (!chrome.runtime.lastError) {
                    // if you have any response
                    console.log(response)
                    window.close();
                } else {
                    console.log("error 13")
                }

            });
        });
    })
    stoopVideoButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "stopvideo" }, function (response) {
                if (!chrome.runtime.lastError) {
                    // if you have any response
                    console.log(response)
                    window.close();
                } else {
                    console.log("error 13")
                }

            });
        });
    })
})