const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const message='결과'+'\u200b'.repeat(500)+'\n';
const KEY='39X8qcx6nZnK7nGWZu9Ts5APx5nHvOr54gjIWPnqqaBOy2VtUE9g0iEM6r6TWUnq';
/**
 * @param mac 앞에서 얻은 javax.crypto.Mac
 * @param url 원본 Api url(md, msgpad없이)
 * @param time unix timestemp로 된 시간
 * @returns String md와 msgpad가 추가된 url
 */
function getUrl(u,t){
    let m=javax.crypto.Mac.getInstance('HmacSHA1');
    m.init(new javax.crypto.spec.SecretKeySpec(new java.lang.String(KEY).getBytes(),'HmacSHA1'));
    return (u.includes('?')?u+'&':u+'?')+'msgpad='+t+'&md='+encodeURIComponent(java.util.Base64.getEncoder().encodeToString(m.doFinal(new java.lang.String(u.substring(0,Math.min(255,u.length))+t).getBytes())));
}

function response(room,msg,sender,isGroupChat,replier,imageDB,packageName) {
    if (msg == '/네웹') {
        let today=day[new Date().getDay()];
        let json=JSON.parse(org.jsoup.Jsoup.connect(getUrl('https://apis.naver.com/mobiletoon/comic/getMainTitleList.json?order=VIEWCOUNT&cate=WEEK&deviceCode=MOBILE_APP_ANDROID',new Date().getTime() + '')).ignoreContentType(true).get().text());
        let a=message;
        json.message.result.webtoonTitleList.forEach(function(obj) {
            if (!obj.weekDayList.includes(today)) return;
            a+='\n\n'+obj.titleName+'\n작화: '+obj.author.painter+'\n작가: '+obj.author.writer;
        });
        replier.reply(a);
    }
}
