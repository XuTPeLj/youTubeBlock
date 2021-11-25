if (window.location.host === 'www.youtube.com') {
    let test = false;
    // let test = true;

    function log() {
        if (test)
            console.log(...arguments);
    }

    // log('[1]');
    let findObjButtom;


    function findButtom() {
        let all = document.querySelectorAll('button.ytp-settings-button');
        for (let i in all) {
            if (isNaN(i)) break;
            if (all[i].getAttribute('numFind')) continue;
            all[i].setAttribute('numFind', 1);
            // log('[2]', all[i]);
            let obj = document.createElement('div');
            obj.style.position = 'absolute';
            obj.style.top = '0px';
            obj.style.border = '1px solid black';
            obj.style.borderRadius = '5px';
            obj.style.background = 'black';
            obj.style.color = 'white';
            obj.style.padding = '3px';
            obj.style.cursor = 'pointer';
            obj.innerHTML = 'x2';
            all[i].parentElement.insertBefore(obj, all[i]);
            // log('[3]', obj);

            findObjButtom = obj;
            obj.onclick = function () {
                let th = all[i];
                log('[0]', typeof th.getAttribute('aria-expanded'), th.getAttribute('aria-expanded'));
                // if (!th.getAttribute('aria-expanded') || th.getAttribute('aria-expanded') === 'false') { // это оказалось не нужным - кнопка всегда должна сработать если нажата
                log('[1]', th, i, all);
                th.click();
                setTimeout(() => {

                    let ths = document.querySelectorAll('.ytp-panel-menu .ytp-menuitem-label');
                    log('[2]', ths);
                    for (let i in ths) {
                        if (isNaN(i)) break;
                        if (
                            ths[i].innerText === 'Скорость воспроизведения'
                            ||
                            ths[i].innerText === 'Playback speed'
                        ) {
                            log('[3]');
                            ths[i].click();
                            setTimeout(() => {
                                    let ths = document.querySelectorAll('.ytp-panel-menu .ytp-menuitem-label');
                                    for (let i in ths) {
                                        if (isNaN(i)) break;

                                        log('[4]', typeof ths[i].innerHTML, ths[i].innerHTML.length, ths[i].innerHTML);
                                        log('[5]', typeof ths[i].parentElement.getAttribute('aria-checked'), ths[i].parentElement.getAttribute('aria-checked'));
                                        if (ths[i].parentElement.getAttribute('aria-checked') !== 'true' && ths[i].innerText === '2') {
                                            ths[i].click();
                                            findObjButtom.innerHTML = 'x1';
                                            log('[6][x2]');
                                            return;
                                        } else if (ths[i].parentElement.getAttribute('aria-checked') !== 'true' && (ths[i].innerText === 'Обычная' || ths[i].innerText === 'Normal')) {
                                            ths[i].click();
                                            findObjButtom.innerHTML = 'x2';
                                            log('[6][x1]');
                                            return;
                                        }
                                    }
                                }
                                ,
                                1
                            );
                        }
                    }
                }, 1);
                // th.click();
                // } // if (!th.getAttribute('aria-expanded'))
            };
        }
    }

    findButtom();
    setTimeout(findButtom, 5000);


    /*if (test) setInterval(() => {
        findObjButtom.click();
    }, 5000);*/


}
