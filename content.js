if (window.location.host === 'www.youtube.com') {
// [dev] загрузка списка → blocks

    findAll();
    // console.log('[]', all);

        loadStyle(
            'a:hover .bblo, #player:hover .bblo{' +
            'font-size: 20px;' +
            'padding: 5px;' +
            'border: #00000033 1px solid;' +
            '}' +
            '.bblo:hover{' +
            'opacity: 1;' +
            'cursor: pointer;' +
            'background: red;' +
            'font-size: 30px;' +
            '}' +
            '.bblo{' +
            'font-size: 0px;' +
            'opacity: 0.2;' +
            'padding: 0px;' +
            'margin-right: 15px;' +
            'transition: .3s linear;' +
            'z-index: 999999;' +
            'position: absolute;' +
            'border: transparent 0px solid;' +
            'border-radius: 5px;' +
            '' +
            '}'
        );
    // console.log('[1]', blocks);
    chrome.storage.local.get("block", function (getBlock) {
        // console.log('[getBlock]',getBlock);
        getBlock = getBlock.block;
        blocks = getBlock;
        numFind++;
        findAll();
    });
    // console.log('[2]', blocks);

    chrome.storage.onChanged.addListener(function (getBlock, namespace) {
        getBlock = getBlock.block.newValue;
        blocks = getBlock;
        if (!blocks) blocks = [];
        /*for (let i in getBlock) {
            if (isNaN(i)) break;
            blocks.push(getBlock[i].url);
        }*/
        numFind++;
        findAll();
    });
    setInterval(findAll, 1000);
    findPlayer();
    add_event(document, 'click', ()=>{setInterval(findPlayer,1000);});
}






