import {contorller,get} from '../decorator/router'

@contorller("/u")
class user{
  @get("/er")
  async test(ctx,next){
      ctx.body="--------------------------------------------"
  }
}
