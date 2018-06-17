<template>
    <div id="app">
        <ribbon color="red">Work in progress</ribbon>
        <img src="./assets/images/dog.gif">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
import Ribbon from './components/Ribbon.vue';

export default {
    name: "app",

    data() {
        return {
            msg: "WIP"
        };
    },

    components: { Ribbon },
};
</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 60px;
}
</style>
