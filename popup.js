document.addEventListener('DOMContentLoaded', function() {
    let startButton = document.getElementById("start");
    let showButton = document.getElementById("show");
    let noteInput = document.getElementById("note");

    startButton.addEventListener('click', function() {
        chrome.bookmarks.getTree(handleNextBookmark)
    }, false);

    showButton.addEventListener('click', function() {
        chrome.tabs.create({'url': 'show.html'});
    }, false);

    noteInput.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) { // enter key
            chrome.storage.local.get(["readMe"], function(result) {
                let seenUrls = result.readMe && result.readMe.seenUrls ? result.readMe.seenUrls : [];
                if (seenUrls.length > 0) {
                    seenUrls[seenUrls.length - 1].notes.push(noteInput.value);
                    chrome.storage.local.set({"readMe": {seenUrls}}, function() {
                        noteInput.value = "";
                    });
                }
            });
        }
    });
}, false);

function handleNextBookmark(bookmarkTreeNodes) {
    chrome.storage.local.get(["readMe"], function(result) {
        let seenUrls = result.readMe && result.readMe.seenUrls ? result.readMe.seenUrls : [];
        let nextBookmark = getNextBookmark(bookmarkTreeNodes);
        nextBookmark.notes = [];
        seenUrls.push(nextBookmark);
        chrome.storage.local.set({"readMe": {seenUrls}}, function() {
            chrome.tabs.update({'url': nextBookmark.url});
            chrome.bookmarks.remove(nextBookmark.id);
        });
    });
}

function getNextBookmark(bookmarkTreeNodes) {
    let readMeBookmarks = bookmarkTreeNodes[0].children[0].children.filter(child => child.title === "readMe");
    return readMeBookmarks[0].children[0];
}
