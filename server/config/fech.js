import request from 'request'
import axios from 'axios'
import {baseUrl} from "./config";
export default class Fech {
    constructor(){

    }
    static get(url,queryString){
        console.log("url",url)
        return axios.get(`${baseUrl}${url}`, {
            headers: {
                referer: baseUrl,
                host: 'c.y.qq.com'
            },
            params: queryString
        }).then(res=>Promise.resolve(res.data))
        /*return new Promise((resolve,reject) =>{
            console.log(`${baseUrl}${url}`)
            request.get(`${baseUrl}${url}`,function (err,response) {
                if(err){
                    reject(err)
                }
                resolve(response.body)
            })
        } )*/
    }
    static post(url,data){
       return axios.post(url,data,{ headers: {
            "Content-Type": "application/json",
        }}).then(res=>
           res.data
        )
        /*axios({
            url:'https://u.y.qq.com/cgi-bin/musicu.fcg?_=1517156372532',
            method:"POST",
            data: {
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
                        "songmid": ["000lJmLO2EML9f", "004dxAi034jI2D", "001BaZ263wqkmP", "000Xcjdn11qMov", "003Tz8UT3hwEfi", "0012X3Jk3JekUl", "0007DeZH0zg4Op", "003qg32O46NJlj", "0010hBPF4TtDbz", "001Rghzs45UGYg", "000XyeoG3Q46g3", "002dtdc04AL9rT", "003YC3p31HyR96", "003wIKbN3BRA2y", "0017Ac0f1Xx0ZZ", "00217b3Q0j8TcH", "001l7a0U3hvXXF", "000iXVGX1JQlvH", "0018jCvj3i0f3E", "003VuX0F1311pd", "003882i90mneKD", "002zY77R2xDovi", "0039Q3hN3mgWAE", "00139iIU2MZbiS", "0022BlAh3ljcvg", "003SHKTJ2tt412", "003Vn55O2a10nl", "003NkrBw3ObJ9a", "002s3mrF41YHOs", "000pl5Uc3iqg9X", "003py6hi1iRexp", "003gE47J4Kuldb", "001chM672zOLUy", "001yiHJJ0SRABa", "001gcmts2KhYd3", "001r6hET3rWCse", "001hUNRP0P8g7x", "004cYPdT3nn4sM", "00422Cou2DbBUN", "004ThLiR0Gs5IA", "002edeyc0xaACC", "001HmS8C4cQcg2", "002ophnl0RleZ6", "001Xy8YI3aZpWO", "0038ahKF3VWlPt", "002wJJpU0kLcQZ", "0016aHoC1IyI1d", "001OnA814F7sbA", "003QLB0A4Rv2Jw", "002JbQfb2Lh1uI"],
                        "songtype": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        "uin": "0",
                        "loginflag": 0,
                        "platform": "23"
                    }
                }
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>console.log(res.data))*/
       /* //console.log(data)
        const options ={
            url:url,
             multipart:
            [ { 'content-type': 'application/json'
                ,  body: JSON.stringify(data)
            }
                , { body: 'I am an attachment' }
                ],
            headers:{
                ":authority":"u.y.qq.com",
                ":method":"POST",
                ":path":"/cgi-bin/musicu.fcg?_=1517106538510",
                ":scheme":"https",
                "accept":"application/json",
                "accept-encoding":"gzip, deflate, br",
                "accept-language":"zh-CN,zh;q=0.9",
                "content-length":824,
                "content-type":"application/x-www-form-urlencoded",
                "origin":"https://y.qq.com",
                referer:"https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=4&type=top",
                "user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1"
            }
        }
         request(options,(err,response)=>{
             //console.log(response)
         })*/

        /*axios(
            {   url:url,
                method:'post',
                headers: {
                    referer: 'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=4&type=top',
                    host: 'c.y.qq.com'
                },
                data:data
            }).then(res=>Promise.resolve(res.data))*/
    }
}
