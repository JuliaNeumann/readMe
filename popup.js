document.addEventListener('DOMContentLoaded', function() {
    let startButton = document.getElementById("start");
    let nextButton = document.getElementById("next");

    startButton.addEventListener('click', function() {
        chrome.bookmarks.getTree(
            function(bookmarkTreeNodes) {
                // 38 is in this case my readMe folder, TODO: get by iteration through all
                nextButton.disabled = false;
                startButton.disabled = true;
                handleSeenUrl(bookmarkTreeNodes);
                //chrome.tabs.create({'url': bookmarkTreeNodes[0].children[0].children[38].children[0].url});
                // TODO: store opened url & remove from bookmarks list
                // TODO: add next button - popup?
            });
    }, false);
}, false);

function handleSeenUrl(bookmarkTreeNodes) {
    chrome.storage.sync.get(["readMeSeenUrls"], function(result) {
        let seenUrls = result.seenUrls || [];
        seenUrls.push(bookmarkTreeNodes[0].children[0].children[38].children[0].url);
        chrome.storage.sync.set({"readMeSeenUrls": {seenUrls}}, function() {
            chrome.storage.sync.get(["readMeSeenUrls"], function(result) {
               console.log(result);
            });
        });
    });
}
