import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {

        // upload task
        task: null,

        // progress bar values
        percentage: null,
        fileName: null,
        value: 0,
        paused: false,

        // home page spinner for userContainer loading time
        homeSpinner: false,

        // downlaod url
        url: null
    },
    getters: {

    },
    mutations: {
        upload(state, payload) {
            state.task = payload
            state.task.on(
                "state_changed",
                // when upload is in progress
                snapShot => {
                    state.percentage = Math.floor(
                        (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                    );
                    state.value = Math.floor(state.percentage);
                },
                // incase any error
                err => {
                    state.task = null;
                    state.percentage = 0;
                    state.value = 0;
                    state.paused = false;
                    console.error(err.message);
                },
                // when upload is completed
                () => {
                    state.percentage = 0;
                    state.value = 0;
                    state.paused = false;
                    state.task = null;
                }
            );
        }

    },
    actions: {
        upload(context, payload) {
            context.commit('upload', payload)
        }
    },
})