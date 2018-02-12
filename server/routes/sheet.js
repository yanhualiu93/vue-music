import {get,contorller} from "../decorator/router";
import Facth from '../config/fech';
@contorller("/sheet")
class Sheet{
    @get("/getSheet")
    async getSheet(ctx,next){
        const url="qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg"
        await Facth.get(`${url}?${ctx.querystring}`).then(res=>{
            ctx.body=res;
        })
    }
}