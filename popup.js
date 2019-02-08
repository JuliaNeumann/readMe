document.addEventListener('DOMContentLoaded', function() {
    let startButton = document.getElementById("start");
    let showButton = document.getElementById("show");

    startButton.addEventListener('click', function() {
        chrome.bookmarks.getTree(handleNextBookmark)
    }, false);

    showButton.addEventListener('click', function() {
        chrome.tabs.create({'url': 'show.html'});
    }, false);

}, false);

function handleNextBookmark(bookmarkTreeNodes) {
    chrome.storage.sync.get(["readMe"], function(result) {
        let seenUrls = result.readMe && result.readMe.seenUrls ? result.readMe.seenUrls : [];
        let nextBookmark = getNextBookmark(bookmarkTreeNodes);
        seenUrls.push(nextBookmark);
        chrome.storage.sync.set({"readMe": {seenUrls}}, function() {
            chrome.tabs.update({'url': nextBookmark.url});
            chrome.bookmarks.remove(nextBookmark.id);
        });
    });
}

function getNextBookmark(bookmarkTreeNodes) {
    let readMeBookmarks = bookmarkTreeNodes[0].children[0].children.filter(child => child.title === "readMe");
    return readMeBookmarks[0].children[0];
}
