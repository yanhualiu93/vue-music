import {get,contorller} from "../decorator/router";
import Fech from '../config/fech'
@contorller('/ranking')
class Ranking {
    @get('/getRanking')
    async getRanking(ctx,next){
        const url = '/v8/fcg-bin/fcg_myqq_toplist.fcg';
        await  Fech.get(`${url}?${ctx.querystring}`).then(res=>ctx.body=res);
    }
    @get('/getTop')
    async getTop(ctx,next){
        const url='/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
        await  Fech.get(`${url}?${ctx.querystring}`).then(res=>ctx.body=res);
    }

}
