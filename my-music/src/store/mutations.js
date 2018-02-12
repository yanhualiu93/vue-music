import {playList} from "./getters";

export  const  setCurrentIndex=(state,obj)=>{
  console.log(typeof obj)
  let index = -1;
  if(!( typeof obj == 'number')){
    index = state.playList.indexOf(obj)
    if(index===-1){
      state.playList.push(obj);
      index =state.playList.length-1;
    }
    state.currentIndex =index;
    return
  }
  index =obj;
  if(state.playType!==2) {
    state.currentIndex = index < 0 ? state.playList.length - 1 : (index >= state.playList.length ? 0 : index);
  }else {
    state.currentIndex=Math.round(Math.random()*state.playList.length);
  }
}
export const  setPlayIng = (state,playing)=>{
  state.playing = playing;
}
export  const  setPlayList = (state,playList)=>{
  state.playList =playList;
}
export const setIsShowPlayer = (state,isShow)=>{
  state.isShowPlayer = isShow;
}
export const setPlayType=(state,type)=>{
  state.playType= type>2?0:type;
}
export const deleteSong=(state,song)=>{
  if(state.playList.length===0){
    return;
  }
  let index= state.playList.indexOf(song);
  state.playList.splice(index,1);
  state.playList.length ===0 && (state.isShowPlayer=false);
}
export const  setPlayerBottom=(state,bottom)=>{
  state.playerBottom = bottom;
}

