document.addEventListener('DOMContentLoaded', function() {
    let startButton = document.getElementById("start");

    startButton.addEventListener('click', function() {
        chrome.bookmarks.getTree(handleNextBookmark)
    }, false);
}, false);

function handleNextBookmark(bookmarkTreeNodes) {
    chrome.storage.sync.get(["readMe"], function(result) {
        let seenUrls = result.readMe && result.readMe.seenUrls ? result.readMe.seenUrls : [];
        // 38 is in this case my readMe folder, TODO: get by iteration through all
        let nextBookmark = bookmarkTreeNodes[0].children[0].children[38].children[0];
        seenUrls.push(nextBookmark);
        chrome.storage.sync.set({"readMe": {seenUrls}}, function() {
            chrome.tabs.update({'url': nextBookmark.url});
            chrome.bookmarks.remove(nextBookmark.id);
        });
    });
}
