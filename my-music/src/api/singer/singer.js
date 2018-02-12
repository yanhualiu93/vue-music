import axios from 'axios'
import {baseUrl} from "../base/base";

export const getSingerSong=(id)=>{
  return axios.get(`${baseUrl}/singer/getSingerSong?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=100&songstatus=1&singermid=${id}`)
}
export const getSinger=()=>{
  return axios.get(`${baseUrl}/singer/getSinger?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&channel=singer&page=list&key=all_all_all&pagesize=300&pagenum=1&hostUin=0&needNewCode=0&platform=yqq`)
}
