if (window.location.host === 'www.youtube.com') {

    function findButtomSubscribe() {
        let all = document.all('subscribe-button');
        if (!all) return;
        if (all.getAttribute('numFind')) return;
        all.setAttribute('numFind', 1);
        all.style.display = 'none';
        // console.log('[2]', all);
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
        all.parentElement.insertBefore(obj, all);
        // console.log('[3]', obj);


        obj.onclick = function () {
        };
    }

    findButtomSubscribe();
    setTimeout(findButtomSubscribe, 5000);
}