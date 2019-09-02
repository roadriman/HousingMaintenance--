import Vue from 'vue';

const state = {
    query: null
};

const getters = {
    getQueryString: state => {
        return state.query;
    }
};

// actions
const actions = {
    setQueryString({ commit }, query) {
        commit('setQueryString', query);
    }
};

// mutations
const mutations = {
    setQueryString(state, queryString) {
        Vue.set(state, 'query', queryString);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
