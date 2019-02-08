document.addEventListener('DOMContentLoaded', function() {
    let showList = document.getElementById("show_list");

    chrome.storage.sync.get(["readMe"], function(result) {
        let seenUrls = result.readMe && result.readMe.seenUrls ? result.readMe.seenUrls : [];

        seenUrls.forEach(bookmark => {
           let div = document.createElement('div');
           div.classList.add("uk-card", "uk-card-body", "uk-card-small", "uk-card-hover", "uk-card-default");

           let a = document.createElement('a');
           a.classList.add("uk-card-title");
           a.href = bookmark.url;
           a.innerText = bookmark.title;

           let wrapper = document.createElement('div');
           div.appendChild(a);
           wrapper.append(div);
           showList.appendChild(wrapper);
        });
    });

}, false);
