document.addEventListener('DOMContentLoaded', function() {
    let showList = document.getElementById("show_list");

    chrome.storage.local.get(["readMe"], function(result) {
        let seenUrls = result.readMe && result.readMe.seenUrls ? result.readMe.seenUrls : [];

        seenUrls.forEach(bookmark => {
           let div = document.createElement('div');
           div.classList.add("uk-card", "uk-card-body", "uk-card-small", "uk-card-hover", "uk-card-default");

           let a = document.createElement('a');
           a.classList.add("uk-card-title");
           a.href = bookmark.url;
           a.innerText = bookmark.title;
            div.appendChild(a);

           if (bookmark.notes && bookmark.notes.length > 0) {
               let ul = document.createElement('ul');
               bookmark.notes.forEach(note => {
                   let li = document.createElement('li');
                   li.innerText = note;
                   ul.appendChild(li);
               });
               div.appendChild(ul);
           }

           let wrapper = document.createElement('div');
           wrapper.append(div);
           showList.appendChild(wrapper);
        });
    });

}, false);
