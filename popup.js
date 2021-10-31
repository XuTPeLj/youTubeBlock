setTimeout(() => {
    button_clear.onclick = clear;
    button_save.onclick = save;
    button_load.onclick = load;

    console.log('[location]', window.location.host);

    function clear() {
        chrome.storage.local.set({'block': []});
    };


    chrome.storage.local.get("block", function (getBlock) {
        getBlock = getBlock.block;
        console.log('[getBlock]', getBlock);

        for (let i in getBlock) {
            if (isNaN(i)) break;
            let tr = document.createElement('tr');
            let imgStrTd = '<table cellspacing="4" class="tableImage"><tr><td><img src="' + getBlock[i].img.join('"/></td><td><img src="') + '"/></td></tr></table>';

            tr.innerHTML += `<td class="del" url="${getBlock[i].url}" channel="${getBlock[i].channel}">X</td><td>${i}</td><td>${getBlock[i].date}</td><td>${imgStrTd}</td><td>${getBlock[i].channel}</td><td>${getBlock[i].url}</td>`;

            body_table.appendChild(tr)

        }
    });


    add_event(document, 'click', function (e){
        let th = e.target;
        if (th.className !== 'del') return;
        del(th);
        hide(th.parentElement);
    });


    function save(){
        chrome.storage.local.get("block", function (getBlock) {
            getBlock = getBlock.block;
            let obj = {};
            obj[input_save.value] = getBlock;
            chrome.storage.local.set(obj);
        });
    }
    function load(){
        chrome.storage.local.get(input_load.value, function (getBlock) {
            getBlock = getBlock[input_load.value];
            let obj = {};
            obj['block'] = getBlock;
            chrome.storage.local.set(obj);
        });}
}, 1);