/**
 * on addBlock(th) - блокирует - добавляет в признак блокирования
 * По клику на крестик (clickButton) - в облости объекта
 * on findAll() - поиск по всем ссылкам
 * <- setInterval(findAll, 1000);
 */

var blocks = [];


function del(th) {
    chrome.storage.local.get("block", function (getBlock) {
        getBlock = getBlock.block;
        let key = 'url';
        let value = th.getAttribute(key);
        // console.log(value, typeof value);
        if(!value || value == 'null'){
            key = 'channel';
            value = th.getAttribute(key);
            // console.log(key, value);
        }

        for (let i in getBlock) {
            if (isNaN(i)) break;
            if (getBlock[i][key] == value) {
                getBlock.splice(i, 1);
                chrome.storage.local.set({'block': getBlock});
                return;
            }
        }
    });
}

function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
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
    let th = this;
    // console.log('[clickButton]', th);
    if (th.parentElement.getAttribute('href')) {
        // console.log('[1]');
        addBlock(th.parentElement);
        return;
    }
    th = closestA(th);
    addBlock(th);
}

function addButtonA(th) {
    if (!th.getAttribute('href')) return;
    if (th.hasAttribute('bblo')) return;
    addButton(th);
}

function addButton(th) {
    if (th.getAttribute('bblo')) return;
    th.setAttribute('bblo', 1);
    let el = document.createElement('div');
    el.className = 'bblo';
    el.innerHTML = 'X';
    el.onclick = clickButton;
    // add_event(el, 'click', clickButton);

    th.appendChild(el);
    return el;
}

function findChannel(block, th) {
    if (!block.channel) return false;
    let channel = th.parentElement.parentElement.querySelector('.ytd-channel-name');
    if (channel)
        channel = channel.innerText.trim('\n');
    if (channel === block.channel) return true;
    return false;
}

function find(blocks, th) {
    let url = th.getAttribute('href');
    for (let i in blocks) {
        if (isNaN(i)) break;
        if (blocks[i].url === url
            || findChannel(blocks[i], th)
        )
            return true;
    }
    return false;
}

function findDiv(th) {
    th = closestId(th, 'dismissible');
    if (!th) return th;
    if (th.className.indexOf('ytd-compact-video-renderer') != -1) {
        return th.parentElement;
    }
    return closestDiv(th).parentElement;
}

function hideA(th) {
    hide(findDiv(th));
}

function hide(th) {
    if (!th) return;
    th.style.display = 'none';
    // console.log('[hide]', th);
}

function closestA(th) {
    th = th.parentElement;
    if (th.nodeName === 'A'
        ||
        th.nodeName === 'BODY')
        return th;
    return closestDiv(th);
}

function closestId(th, id) {
    if (!th
        || th.getAttribute('id') === id)
        return th;
    return closestId(th.parentElement, id);
}

function closestDiv(th) {
    th = th.parentElement;
    if (!th
        ||
        th.nodeName === 'DIV'
    )
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
    let r = [];
    if (!th) return r;
    let all = th.querySelectorAll('img');
    for (let i in all) {
        if (isNaN(i)) break;
        r.push(all[i].getAttribute('src'));
    }
    return r;
}

function addBlock(th) {
    // console.log('[addBlock(th]', th);
    let url = th.getAttribute('href');
    blocks.push(url); // [dev] - Возможно добавление будет в событии
    chrome.storage.local.get("block", function (getBlock) {
        // console.log('[getBlock]', getBlock);
        getBlock = getBlock.block;
        if (!getBlock)
            getBlock = [];
        let channel = th.parentElement.querySelector('.ytd-channel-name');
        if (channel)
            channel = channel.innerText.trim('\n');
        let obj = {url: url, channel: channel, date: nowDate(), img: getImg(findDiv(th))};
        // console.log('[obj]', obj);
        getBlock.unshift(obj);
        chrome.storage.local.set({'block': getBlock});
        numFind++;
    });


}

function findAll() {
    var all = document.querySelectorAll('a');
    for (let i in all) {
        if (isNaN(i)) break;
        if (numFind == all[i].getAttribute('numFind')) continue;
        all[i].setAttribute('numFind', numFind);
        // console.log(all[i].getAttribute('href'));

        if (find(blocks, all[i])) {
            // console.log(all[i].getAttribute('href'));
            hideA(all[i]);
            continue;
        }
        addButtonA(all[i]);
    }
}


function findPlayer() {
    // console.log('[findPlayer]');
    // let player = document.all('player');
    let players = document.querySelectorAll('.html5-video-container');
    /*if (!HTMLCollection.prototype.isPrototypeOf(player)) {
        doToPlayer(player);
        return;
    }*/

    for (let i in players) {
        if (isNaN(i)) break;
        doToPlayer(players[i]);
    }

}

function doToPlayer(player) {
    player.setAttribute('href', window.location.href.replace('https://www.youtube.com', ''));
    let el = addButton(player);
    if (el) el.style.top = '-8px';
}

function visible(elem) {
    return elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}