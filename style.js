if (window.location.host === 'www.youtube.com') {

    loadStyle(`
/* кнопка в плеере - окошко с права в низу маленькое - будет там проигрываться - убрать! */
.ytp-miniplayer-button {
 display: none !important;   
}
/* Кнопка проигрывать следующее */
/*.ytp-next-button{
    display:none !important;
}*/
/* скрыть всё на видео */
.video-ads>div>div,#continuations{
display: none !important
}
/* показать кнопку рекламы */
.video-ads>div>.ytp-ad-player-overlay-skip-or-preview{
display: block !important
}

/* Затемнение */
.ytp-gradient-bottom{display: none !important;}

`
    );
}
/**
 * расширение Девелом
 */
else if (window.location.host === 'bfbameneiokkgbdmiekhjnmfkcnldhhm') {
    loadStyle(`pre {
    width: 98vw;
    overflow: auto;
    max-height: 91vh;
    white-space: break-spaces;
}`);
}
/**
 * админер - домен поменять
 */
else if (window.location.host === 'www.youtube.com') {

    loadStyle(`
body {
    /*width: unset !important;*/
    overflow: hidden;
    /*max-width: 100px;*/
}
#menu{
    /*width: 9vw;*/
    overflow: auto;
    max-height: 93vh;
}

#content{
    width: 77vw;
    overflow: auto;
    max-height: 93vh;
    padding-right: 20px;
}
#sql-1{
    max-width: 81vw;
overflow: auto;

        white-space: break-spaces;
        overflow-wrap: anywhere;
}

.scrollable{
    overflow: auto;
    max-width: 81vw;
    max-height: 78vh;
}
#form{
    overflow: auto;
    max-width: 81vw;
}

#form > p > pre{
    overflow: auto;
    max-width: 80vw !important;
    min-height: 301px;
}
#form > p > pre {
white-space: break-spaces;
}

#content thead tr:first-child {
    position: relative!important;
    position: -webkit-sticky!important;
    position: sticky!important;
    top: 0;
    z-index:2;
}
#content td{
    max-width: 400px;overflow: auto;}

form#form{    padding-bottom: 40px;}
form#form>p:last-child{
    position: fixed;
    bottom: 0px;

}
`
    );
}






