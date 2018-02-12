import axios from 'axios'
import {baseUrl} from "../base/base";

export const getRecommend = ()=>{
  return axios.get(`${baseUrl}/recommend/getRecommend?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1516945390051`)
}
export const getDiscList=()=>{
  return axios.get(`${baseUrl}/recommend/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.05541762043818155`)
}

