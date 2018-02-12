import {get,contorller} from "../decorator/router";
import Fech from '../config/fech'
@contorller("/search")
export class Search{
    @get("/getHotKey")
    async getHotKey(ctx,next){
        let url = '/splcloud/fcgi-bin/gethotkey.fcg';
        await Fech.get(`${url}?${ctx.querystring}`).then(res=>{
            ctx.body = res;
        })
    }
    @get("/getSearchSong")
    async getSearchSong(ctx,next){
        let url = '/soso/fcgi-bin/search_for_qq_cp';
        await Fech.get(`${url}?${ctx.querystring}`).then(res=>{
            ctx.body=res;
        })
    }
}