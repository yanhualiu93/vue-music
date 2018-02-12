import Singer from './singer'

export class Song{
  constructor(song,songUrl){
    this.id=song.id||song.songid;
    this.name=song.songname||song.name;
    this.songmid=song.songmid||song.mid;
    this.singers = this._createSingerArr(song.singer);
    this.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid||song.album.mid}.jpg?max_age=2592000`;
    this.interval = song.interval;
    this.url = songUrl;
  }
  static createSong(musicData,songUrl){
    return new Song(musicData,songUrl)
  }
  _createSingerArr(singers){
    let  singer_arr = [];
    singers.forEach((singer)=>{
      singer_arr.push(new Singer(singer.mid,singer.name));
    })
    return singer_arr;
  }

}

