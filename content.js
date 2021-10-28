if (window.location.host === 'www.youtube.com') {
// [dev] загрузка списка → blocks

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
        if (style.styleSheet){
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
        console.log(this);
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

    function hide(th) {
        th.style.display = 'none';
    }

    function closestDiv(th) {
        th = th.parentElement;
        if (th.nodeName === 'DIV')
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

    var blocks = ['/watch?v=LYgBatopRvA'];
    var numFind = 0;
    function addBlock(url) {
        numFind++;
        blocks.push(url);
        findAll();
    }
    function findAll() {
        var all = document.querySelectorAll('a');
        for (let i in all) {
            if (isNaN(i)) break;
            if(numFind === all[i].getAttribute('numFind'))continue;
            all[i].setAttribute('numFind', numFind);
console.log(all[i].getAttribute('href'));
            addButton(all[i]);
            if (find(blocks, all[i].getAttribute('href'))) {
                console.log(all[i].getAttribute('href'));
                let div = closestDiv(closestDiv(all[i]));
                hide(div);
                console.log('[div]', div);
            }
        }
    }

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
        'transition: .3s linear;' +
        'z-index: 999999;' +
        'display: none;' +
        'position: absolute;' +
        'border: black 1px solid;' +
        '' +
        '}'
    );
}



