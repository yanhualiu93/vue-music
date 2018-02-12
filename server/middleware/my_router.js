import {Route}  from '../decorator/router'
import {apiPath} from "../config/config";
export default (app)=>{
    new Route(app,apiPath);
}