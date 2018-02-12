import axios from 'axios'
import {baseUrl} from "../base/base";
export const getSong = (ids) => {
  if(!(ids instanceof Array)){
    throw new Error("id is not Array");
  }
  return axios.post(`${baseUrl}/song/getSong`,ids,{
    headers:{
      "Content-Type":"application/json;charset=UTF-8"
    }
  })
}

