chrome.browserAction.onClicked.addListener(function() {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
        function(bookmarkTreeNodes) {
            // 38 is in this case my readMe folder, TODO: get by iteration through all
            console.log(bookmarkTreeNodes[0].children[0].children[38].children)
            chrome.tabs.create({'url': bookmarkTreeNodes[0].children[0].children[38].children[0].url});
            // TODO: store opened url & remove from bookmarks list
            // TODO: add next button - popup?
        });
});
