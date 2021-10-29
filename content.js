if (window.location.host === 'www.youtube.com') {
// [dev] загрузка списка → blocks

    findAll();
    // console.log('[]', all);

    loadStyle(
        'a:hover .bblo{' +
        'font-size: 20px;' +
        'padding: 5px;' +
        'border: black 1px solid;' +
        '}' +
        '.bblo:hover{' +
        'cursor: pointer;' +
        'background: red;' +
        'font-size: 30px;' +
        '}' +
        '.bblo{' +
        'font-size: 0px;' +
        'padding: 0px;' +
        'margin-right: 15px;' +
        'transition: .3s linear;' +
        'z-index: 999999;' +
        'position: absolute;' +
        'border: black 0px solid;' +
        '' +
        '}'
    );
    console.log('[1]', blocks);
    chrome.storage.local.get("block", function (getBlock) {
        console.log('[getBlock]',getBlock);
        getBlock = getBlock.block;
        blocks = getBlock;
        numFind++;
        findAll();
    });
    console.log('[2]', blocks);

    chrome.storage.onChanged.addListener(function (getBlock, namespace) {
        getBlock = getBlock.block.newValue;
        blocks = getBlock;
        /*for (let i in getBlock) {
            if (isNaN(i)) break;
            blocks.push(getBlock[i].url);
        }*/
        numFind++;
        findAll();
    });
    setInterval(findAll, 1000);
}



