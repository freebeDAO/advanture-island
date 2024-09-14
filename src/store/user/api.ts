import {post, get, authGet, authPost} from 'src/lib/tools/request';
import {userType} from "src/server/dataType/users";

export const authChallenge = async (address: string) => {
  return get({url: '/auth/challenge', param: {address}});
}
export const authVerify = async ({address, signature}: {address: string, signature: stirng}) => {
  return post({url: '/auth/verify', param: {address, signature}});
}
export const authCheck = async (address: string) => {
  return authPost({url: '/auth/check',param: {address}});
}
export const userDetail = async ():Promise<userType> => {
  return authGet({url: `/users/detail`});
}
