if (window.location.host === 'www.youtube.com') {
    // console.log('[1]');
    function findButtom() {
        let all = document.querySelectorAll('button.ytp-settings-button');
        for (let i in all) {
            if (isNaN(i)) break;
            if (all[i].getAttribute('numFind')) continue;
            all[i].setAttribute('numFind', 1);
            // console.log('[2]', all[i]);
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
            // console.log('[3]', obj);


            obj.onclick = function () {
                let th = all[i];
                if (!th.getAttribute('aria-expanded')) {
                    th.click();
                    setTimeout(() => {
                        let ths = document.querySelectorAll('.ytp-panel-menu .ytp-menuitem-label')
                        for (let i in ths) {
                            if (isNaN(i)) break;
                            if (ths[i].innerText === 'Скорость воспроизведения') {
                                ths[i].click();

                                setTimeout(() => {
                                        let ths = document.querySelectorAll('.ytp-panel-menu .ytp-menuitem-label');
                                        for (let i in ths) {
                                            if (isNaN(i)) break;
                                            if (ths[i].innerText === '2' /*'Обычная'*/) {
                                                ths[i].click();
                                            }
                                        }
                                    }
                                    ,
                                    1
                                );
                            }
                        }
                    }, 1);
                    th.click();
                }
            };
        }
    }
    findButtom();
    setTimeout(findButtom, 5000);
}