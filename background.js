chrome.action.onClicked.addListener(() => {
    chrome.scripting.executeScript({
        target: { tabId: chrome.tabs.query({ active: true, currentWindow: true }, tabs => tabs[0].id )},
        files: ['content.js']
    });
});