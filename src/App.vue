<template>
    <div id="app">
        <ribbon color="red" position="bottom-left">Work in progress</ribbon>

        <preview-area/>

        <div class="form-container">
            <img src="./assets/images/dog.gif">
            <h1>{{ msg }}</h1>
            <div class="container" style="max-width: 25%;">
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            <text-input :label="msg" v-model="msg" :isloading="isLoading"
            @focus="isLoading = true" @blur="isLoading = false"/>
            </div>
        </div>

        <page-footer/>
    </div>
</template>

<script>
import 'bulma/css/bulma.min.css'
import Ribbon from './components/Ribbon.vue'
import TextInput from './components/TextInput.vue'
import PageFooter from './components/Footer.vue'
import PreviewArea from './components/PreviewArea.vue'

export default {
    name: "app",

    data() {
        return {
            msg: "WIP",
            isLoading: false,
        };
    },

    components: { Ribbon, TextInput, PageFooter, PreviewArea },
};


</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
}

.form-container {
    margin-bottom: 15px;
    margin-top: 15px;
}
</style>
