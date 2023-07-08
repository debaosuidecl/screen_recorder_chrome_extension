
console.log("injected")
async function asyncmessaging(message) {
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

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    sendResponse("seen")
    await asyncmessaging({ message: "screenshot" })
    await delay(1000)
    const image = await retrieveStorage("screenshot")
    const anchor = document.createElement("a")
    anchor.setAttribute("href", image.screenshot)
    anchor.setAttribute("download", "newfile.png")
    document.querySelector("body").appendChild(anchor)
    anchor.click();
    document.querySelector("body").removeChild(anchor)

})