import {login} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'


const user = {
    state: {
        token: getToken(),
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        }
    },
    actions: {
        LoginByUsername({commit}, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const data = response.data.data;
                    commit('SET_TOKEN', data.accessToken);
                    setToken('Bearer '+data.accessToken);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        LogOut({commit}){
            return new Promise((resolve)=>{
                //请求后端登出@TODO
                commit('SET_TOKEN', '');
                removeToken();
                resolve();
            })
        }
    }
}

export default user
