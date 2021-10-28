var blocks = [];


function del(url) {
    chrome.storage.sync.get("block", function (getBlock) {
        getBlock = getBlock.block;

        for (let i in getBlock) {
            if (isNaN(i)) break;
            if (getBlock[i].url == url) {
                getBlock.splice(i,1);
                chrome.storage.sync.set({'block': getBlock});
                return;
            }
        }
    });
}
function nowDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return dd + '.' + mm + '.' + yyyy;
}

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
    addBlock(th);
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

function findDiv(th) {
    return closestDiv(closestDiv(th)).parentElement;
}
function hideA(th) {
    hide(findDiv(th));
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

function getImg(th) {
    let all = th.querySelectorAll('img');
    let r = [];
    for (let i in all) {
        if (isNaN(i)) break;
        r.push(all[i].getAttribute('src'));
    }
    return r;
}
function addBlock(th) {
    console.log('[addBlock(th]',findDiv(th));
    let url = th.getAttribute('href');
    numFind++;
    blocks.push(url); // [dev] - Возможно добавление будет в событии
    chrome.storage.sync.get("block", function (getBlock) {
        console.log('[getBlock]', getBlock);
        getBlock = getBlock.block;
        if (!getBlock)
            getBlock = [];
        getBlock.unshift({url: url, date: nowDate(),img:getImg(findDiv(th))});
        chrome.storage.sync.set({'block': getBlock});
    });


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



