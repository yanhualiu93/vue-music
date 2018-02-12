import {all,contorller} from '../decorator/router'
import Fech from "../config/fech";
@contorller("/recommend")
class Recommernd{
    @all('/getRecommend')
    async getRecommend(ctx,next){
        const url = 'musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
        await Fech.get(url,ctx.querystring).then(res=>{
            ctx.body=res
        });
    }
    @all("/getDiscList")
    async getDiscList (ctx,next){
        const url="splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
        await Fech.get(`${url}?${ctx.querystring}`).then(res=>{
            ctx.body=res
        });
    }
}