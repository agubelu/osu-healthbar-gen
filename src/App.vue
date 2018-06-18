<template>
    <div id="app">
        <ribbon color="red" position="bottom-left">Work in progress</ribbon>

        <preview-area/>

        <div class="container" id="form-container">
            <div class="columns">
                <div class="column">

                    <text-input label="Your osu! username:" iconleft="user" v-model="generatorData.username"/>
                    <text-input label="Text to print:" iconleft="pencil-alt" v-model="generatorData.text"
                        placeholder="Leave blank to print your username"/>

                    <div class="columns" id="country-div">
                        <div class="column is-two-fifths">
                            <select-input v-model="generatorData.flagStyle" :options="flagStyleOptions" 
                                iconleft="flag" label="Flag style:"/>
                        </div>
                        <div class="column is-three-fifths">
                            <select-input v-model="generatorData.country" :options="countryOptions" :enabled="countrySelectorEnabled"
                                label="Country:" iconleft="globe"/>
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

import countryList from './assets/scripts/country_list.js'

export default {
    name: "app",

    data() {
        return {
            flagStyleOptions: [
                {value: 'none', name: 'No flag'},
                {value: 'old', name: 'Old'},
                {value: 'new', name: 'Modern'},
            ],

            countryOptions: countryList,

            generatorData: {
                username: '',
                text: '',
                flagStyle: 'none',
                country: null,
            }
        };
    },
    
    computed: {
        countrySelectorEnabled: function() {
            return this.generatorData.flagStyle !== 'none';
        },

        selectedCountry: function() {
            return this.generatorData.flagStyle === 'none' 
                   ? null : this.generatorData.country; 
        },

        textToPrint: function() {
            return this.generatorData.text || this.generatorData.username;
        }
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

#country-div .column {
    padding-bottom: 0;
}
</style>
