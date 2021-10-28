var blocks = [];

function add_event(element, event, func) {
    if (element.addEventListener) {
        element.addEventListener(event, func, true);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, func);
    }
}

function loadStyle(text) {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = text;
    } else {
        style.appendChild(document.createTextNode(text));
    }
}

function clickButton(e) {
    e = e || window.event;
    e.stopPropagation();
    e.preventDefault();
    let th = closestA(this);
    addBlock(th.getAttribute('href'));
}

function addButton(th) {
    if (!th.getAttribute('href')) return;
    if (th.hasAttribute('bblo')) return;
    th.setAttribute('bblo', 1);
    let el = document.createElement('div');
    el.className = 'bblo';
    el.innerHTML = 'X';
    el.onclick = clickButton;
    // add_event(el, 'click', clickButton);

    th.appendChild(el);
}

function find(blocks, url) {
    for (let i in blocks) {
        if (isNaN(i)) break;
        if (blocks[i] === url)
            return true;
    }
    return false;
}

function hideA(th) {
    let div = closestDiv(closestDiv(th));
    hide(div.parentElement);
}

function hide(th) {
    th.style.display = 'none';
    console.log('[hide]', th);
}

function closestA(th) {
    th = th.parentElement;
    if (th.nodeName === 'A'
        ||
        th.nodeName === 'BODY')
        return th;
    return closestDiv(th);
}

function closestDiv(th) {
    th = th.parentElement;
    if (th.nodeName === 'DIV'
        ||
        th.nodeName === 'BODY')
        return th;
    return closestDiv(th);
}

function show_ddsobj(f) {
    var s = '';
    if (typeof f !== 'object') s = f;
    else for (var i in f)
        try {
            if (f[i])
//if(typeof f[i] =='object')
                if (typeof f[i] == 'string')
//if(i.indexOf('scroll')!=-1)
                    s += i + '(' + typeof f[i] + ')=' + f[i] + '\n';
            // if(typeof f[i] =='object'||typeof f[i] =='function'){console.log(s,i, f[i]);s='';}
        } catch (c) {
        }
    console.log(s);
}


var numFind = 0;

function addBlock(url) {
    numFind++;
    blocks.push(url);
    console.log('[addBlock]');
    chrome.storage.sync.get("block", function (getBlock) {
        console.log('[getBlock]',getBlock);
        if (!getBlock.block)
            getBlock = [];
        getBlock.push(url);
        chrome.storage.sync.set({'block': getBlock});
    });


    findAll();
}

function findAll() {
    var all = document.querySelectorAll('a');
    for (let i in all) {
        if (isNaN(i)) break;
        if (numFind === all[i].getAttribute('numFind')) continue;
        all[i].setAttribute('numFind', numFind);
        // console.log(all[i].getAttribute('href'));
        addButton(all[i]);
        if (find(blocks, all[i].getAttribute('href'))) {
            // console.log(all[i].getAttribute('href'));
            hideA(all[i]);
        }
    }
}



