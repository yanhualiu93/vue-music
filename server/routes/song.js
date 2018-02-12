import {contorller,post,all} from '../decorator/router'
import Fech from '../config/fech'
@contorller('/song')
class Song{
    @post('/getSong')
    async getSong(ctx,next){
        console.log(ctx.request.body)
        let data= {
            "comm": {
                "g_tk": 5381,
                "uin": 0,
                "format": "json",
                "inCharset": "utf-8",
                "outCharset": "utf-8",
                "notice": 0,
                "platform": "h5",
                "needNewCode": 1
            },
            "url_mid": {
                "module": "vkey.GetVkeyServer",
                "method": "CgiGetVkey",
                "param": {
                    "guid": "2844675240",
                    "songmid": ctx.request.body,
                    "songtype": [0],
                    "uin": "0",
                    "loginflag": 0,
                    "platform": "23"
                }
            }
        }
        await Fech.post(`https://u.y.qq.com/cgi-bin/musicu.fcg?_=${Date.now()}`,data).then(res=>{
            ctx.body=res;
        })
    }
}