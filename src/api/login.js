import fetch from '@/utils/request'


/**
 * 用户登录
 * @param mobile
 * @param password
 */
export function login(mobile, password) {
    const data = {
        mobile,
        password
    }
    return fetch({
        url: "/rest/account/login",
        method: "post",
        data
    })
}
