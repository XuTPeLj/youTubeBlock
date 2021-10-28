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
}



