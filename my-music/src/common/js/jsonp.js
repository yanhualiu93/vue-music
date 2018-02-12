import fetchJsonp  from 'fetch-jsonp'

export const jsonp = (url,data) =>{
  return fetchJsonp(data?formeatUrl(url,data):url);
}
const formeatUrl=(url,data)=>{

  let param=''
  for(let [key,value] in data) {
        param+=`${key}=${value}&`
  }
  if(!url.include('?')){
    url = `${url}?${param.substring(0,param.length-1)}`
  }else {
    url =`${url}&${param.substring(0,param.length-1)}`
  }
  return url;
}
