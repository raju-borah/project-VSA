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
        url: null,

        //admin progress bar
        adminProgValue: 0,
        // admin task
        adminTask: null,

        // admin progress bar values
        adminPercentage: null,
        adminFileName: null,
        adminValue: 0,
        adminPaused: false,
        adminUrl: null,
        hide: false
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
        },
        adminUpload(state, payload) {
            state.adminTask = payload
            state.adminTask.on(
                "state_changed",
                // when upload is in progress
                snapShot => {
                    state.adminPercentage = Math.floor(
                        (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                    );
                    state.adminValue = Math.floor(state.adminPercentage);
                },
                // incase any error
                err => {
                    state.adminTask = null;
                    state.adminPercentage = 0;
                    state.adminValue = 0;
                    state.adminPaused = false;
                    console.error(err.message);
                },
                // when upload is completed
                () => {
                    state.adminPercentage = 0;
                    state.adminValue = 0;
                    state.adminPaused = false;
                    state.adminTask = null;
                }
            );
        }

    },
    actions: {
        upload(context, payload) {
            context.commit('upload', payload)
        },
        adminUpload(context, payload) {
            context.commit('adminUpload', payload)
        },
    },
})