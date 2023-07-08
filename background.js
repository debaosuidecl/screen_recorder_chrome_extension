chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./content.js"]
        })
            .then(() => {
                console.log("INJECTED THE FOREGROUND SCRIPT.");
            })
            .catch(err => console.log(err, 12));
    }
});


// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//     if (request.message === 'screenshot') {
//         sendResponse(true)
//         chrome.tabs.captureVisibleTab(null, {}, function (image) {
//             chrome.storage.local.set({
//                 'screenshot': image
//             });
//         });
//     }
//     if (request.message === 'recordpermission') {
//         sendResponse(true)
//         console.log(request, 25)
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             chrome.desktopCapture.chooseDesktopMedia(
//                 ["screen", "window"],
//                 tabs[0],
//                 (chromeMediaSourceId) => {
//                     chrome.tabs.sendMessage(tabs[0].id, { action: "access_approved", data: chromeMediaSourceId }, function (response) {
//                         if (!chrome.runtime.lastError) {
//                             // if you have any response
//                             // console.log(response)
//                             console.log(chromeMediaSourceId, 'the media id o')
//                         } else {
//                             console.log("error occured")
//                         }
//                     });
//                 }

//             );

//         });

//     }
// });

// chrome.action.onClicked.addListener(async (tab) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { action: "open_dialog_box" }, function (response) {
//             if (!chrome.runtime.lastError) {
//                 // if you have any response
//                 console.log(response)

//             } else {
//                 console.log("error occured")
//             }
//         });
//     });
// });