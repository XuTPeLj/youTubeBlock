setTimeout(() => {
    button_clear.onclick = clear;
    console.log('[location]', window.location.host);

    function clear() {
        chrome.storage.sync.set({'block': []});
    };


    chrome.storage.sync.get("block", function (getBlock) {
        getBlock = getBlock.block;
        console.log('[getBlock]', getBlock);

        for (let i in getBlock) {
            if (isNaN(i)) break;
            let tr = document.createElement('tr');
            let imgStrTd = '<td><img src="' + getBlock[i].img.join('"/></td><td><img src="') + '"/></td>';

            tr.innerHTML += `<td>${i}</td><td>${getBlock[i].date}</td>${imgStrTd}<td class="del" url="${getBlock[i].url}">X</td>`;

            body_table.appendChild(tr)

        }
    });


    add_event(document, 'click', function (e){
        let th = e.target;
        let url = th.getAttribute('url');
        del(url);
        hide(th.parentElement);
    });

}, 1);