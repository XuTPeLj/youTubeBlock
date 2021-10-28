if (window.location.host === 'www.youtube.com') {
// [dev] загрузка списка → blocks

    findAll();
    // console.log('[]', all);

    loadStyle(
        'a:hover .bblo{' +
        'display: block;' +
        '}' +
        '.bblo:hover{' +
        'cursor: pointer;' +
        'background: red;' +
        'font-size: 20px' +
        '}' +
        '.bblo{' +
        'margin-top: -5px;' +
        'transition: .3s linear;' +
        'z-index: 999999;' +
        'display: none;' +
        'position: absolute;' +
        'border: black 1px solid;' +
        '' +
        '}'
    );
    console.log('[1]', blocks);
    chrome.storage.sync.get("block", function (getBlock) {
        console.log('[getBlock]',getBlock);
    });
    console.log('[2]', blocks);

    chrome.storage.onChanged.addListener(function (getBlock, namespace) {
        getBlock = getBlock.block.newValue;
        blocks = [];
        for (let i in getBlock) {
            if (isNaN(i)) break;
            blocks.push(getBlock[i].url);
        }
        findAll();
    });
    setInterval(findAll, 1000);
}



