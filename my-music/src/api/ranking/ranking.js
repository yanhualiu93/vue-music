import axios  from 'axios'
import {baseUrl} from "../base/base";
export const getRanking =()=>{
  return axios.get(`${baseUrl}/ranking/getRanking?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${Date.now()}`)
}
export const getTop =(id)=>{
  return axios.get(`${baseUrl}/ranking/getTop?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=${id}&_=${Date.now()}`)
}
