<template>
    <div id="app">
        <ribbon color="red" position="bottom-left">Work in progress</ribbon>

        <preview-area/>

        <div class="container" id="form-container">
            <div class="columns">
                <div class="column">
                    <text-input label="Your osu! username:" iconleft="user"/>
                    <text-input label="Text to print:" iconleft="pencil-alt"
                    placeholder="Leave blank to print your username"/>
                    <div class="columns">
                        <div class="column">
                            <select-input label="Flag style:" :options="options" iconleft="flag"/>
                        </div>
                        <div class="column">
                            <select-input label="Country:" :options="options" iconleft="globe"/>
                        </div>
                    </div>
                    
                    

                </div>

                <div class="column">
                    
                </div>
            </div>
        </div>

        <page-footer/>
    </div>
</template>

<script>
import Ribbon from './components/Ribbon.vue'
import TextInput from './components/TextInput.vue'
import PageFooter from './components/Footer.vue'
import PreviewArea from './components/PreviewArea.vue'
import SelectInput from './components/SelectInput.vue'

export default {
    name: "app",

    data() {
        return {
            msg: "WIP",
            isLoading: false,
            options: [
                {value: 1, name: 'uno'},
                {value: 2, name: 'dos'},
            ],
        };
    },

    components: { Ribbon, TextInput, PageFooter, PreviewArea, SelectInput },
};


</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    
}

#form-container {
    padding-left: 3vw;
    padding-right: 3vw;
    margin-top: 3vh;
    margin-bottom: 3vh;
    background-color: white;
}
</style>
