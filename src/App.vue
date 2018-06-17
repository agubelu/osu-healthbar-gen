<template>
    <div id="app">
        <ribbon color="red">Work in progress</ribbon>
        <img src="./assets/images/dog.gif">
        <h1>{{ msg }}</h1>
        <text-input :label="msg" v-model="msg" :isloading="isLoading"
        @focus="isLoading = true" @blur="isLoading = false"/>
    </div>
</template>

<script>
import Ribbon from './components/Ribbon.vue';
import TextInput from './components/TextInput.vue';

export default {
    name: "app",

    data() {
        return {
            msg: "WIP",
            isLoading: false,
        };
    },

    components: { Ribbon, TextInput },
};
</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 60px;
}
</style>
