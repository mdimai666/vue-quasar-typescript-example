import Vue from 'vue'
import * as Vuex from 'vuex'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
// https://github.com/championswimmer/vuex-module-decorators#hello-decorators-

import store from '.'


@Module({
    namespaced: false,
    name: 'root',
    store,
    stateFactory: true,
})
export default class RootStore extends VuexModule {
    count = 0

    get get1() {
        return 101
    }

    @Mutation increment(delta: number) { this.count += delta }
    @Mutation decrement(delta: number) { this.count -= delta }

    // action 'incr' commits mutation 'increment' when done with return value as payload
    @Action({ commit: 'increment' }) incr() {
        return 5
    }
    // action 'decr' commits mutation 'decrement' when done with return value as payload
    @Action({ commit: 'decrement' }) decr() {
        return 5
    }

    @Action
    Act2() {
        console.log(555)
    }

    @Action
    async Act1() {
        this.Act2()
        this.increment(22)

    }
}