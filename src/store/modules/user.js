const state = {
    userName: '',
    authority:'',
    name
};

const getters = {
    userName: state => state.userName,
    authority:state => state.authority,
    name:state => state.name,
};

const actions = {
    setUserName: ({ commit }, userName) => {
        commit('setUserName', userName);
    },
    setAuthority: ({ commit }, authority) => {
        commit('setAuthority', authority);
    },
    setName: ({ commit }, name) => {
        commit('setName', name);
    }
};

const mutations = {
    setUserName: (state, userName) => {
        state.userName = userName;
    },
    setAuthority: (state, authority) => {
        state.authority = authority;
    },
    setName: (state, name) => {
        state.name = name;
    }
};

export default { state, getters, actions, mutations };
