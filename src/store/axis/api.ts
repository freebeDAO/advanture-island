import {post, get, authGet, authPost} from 'src/lib/tools/request';
import {axisBaseType, axisCreateType, axisType} from "src/server/dataType/axis";

export const axisListAll = () => {
    return get({url: '/axis/list'});
}
export const createAxis = (param: axisBaseType) => {
    return post({url: '/axis/create', param});
}
export const updateAxis = (param: axisType) => {
    return post({url: '/axis/update', param});

}
export const removeAxis = (id: number) => {
    return get({url: '/axis/remove', param: {id}})
}

