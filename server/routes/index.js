import {contorller,post,get} from '../decorator/router'
@contorller("/")
export class index{
    @get("")
    async iii(ctx,next){
        await ctx.render('index');
    }

}



