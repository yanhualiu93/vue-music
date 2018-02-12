import {get,contorller } from "../decorator/router";
import Fech from '../config/fech'

@contorller("/singer")
export class Singer{
    constructor(){

    }
    @get("/getSingerSong")
    async getSingerSong(ctx,next){
        const url='v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
        await Fech.get(`${url}?${ctx.querystring}`).then(res=>{
            ctx.body=res;
        })
    }
    @get("/getSinger")
    async getSinger(ctx,next){
        const url='v8/fcg-bin/v8.fcg';
        await Fech.get(`${url}?${ctx.querystring}`).then(res=>{
            ctx.body=res;
        })
    }
}