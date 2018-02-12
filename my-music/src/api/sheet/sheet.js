import axios from 'axios'
import {baseUrl} from "../base/base";

export default (id)=>{
  return axios.get(`${baseUrl}/sheet/getSheet?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&new_format=1&pic=500&disstid=${id}&type=1&json=1&utf8=1&onlysong=0&picmid=1&nosign=1&song_begin=0&song_num=15&_=${Date.now()}`)
}
