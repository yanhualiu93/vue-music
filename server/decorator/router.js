import Router from 'koa-router'
import { resolve } from 'path'
import glob from 'glob'

const SYMBOL_CONTORLL =  Symbol("Controller");
const routeMap = new Map();

export class Route extends Router{
    constructor(app,apiPath){
        super();
        this.app=app;
        this.apiPath=apiPath;
        this._init();
    }
    _init(){
        glob.sync(resolve(this.apiPath, './*.js')).forEach(require)
        routeMap.forEach((method,conf)=>{
            let prePath = conf.target[SYMBOL_CONTORLL]
            if(prePath){
                const path =  `${prePath}${conf.path}`
                this[conf.method](path,method);
            }
            this.app.use(this.routes());
            this.app.use(this.allowedMethods());
        })
    }

}
const routeUtil =(conf)=>(target,key,descriptor)=>{
    if(!target[SYMBOL_CONTORLL]){
        //throw new Error(`${conf.path}====>类没有被 contorller 修饰`);
    }
    routeMap.set({
        target:target,
        ...conf
    },target[key])
}
export const contorller = path =>(target) => target.prototype[SYMBOL_CONTORLL]=path||"";
export const get = path=>routeUtil({
    method:"get",
    path:path
})
export const post = path=>routeUtil({
    method:"post",
    path:path
})
export const all = path=>routeUtil({
    method:'all',
    path:path
})