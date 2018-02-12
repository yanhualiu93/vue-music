import axios from "axios"
import {baseUrl} from "../base/base";

export const getHotKey = ()=>{
  return axios.get(`${baseUrl}/search/getHotKey?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${Date.now()}`);
}

export const getSearchSong =(searchText)=>{
  return axios.get(`${baseUrl}/search/getSearchSong?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${searchText}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=${Date.now()}`)
}
