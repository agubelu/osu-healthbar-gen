<template>
    <div id="app">
        <ribbon color="red" position="bottom-left">Work in progress</ribbon>

        <preview-area/>

        <h1 class="title">osu! healthbar generator</h1>
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
                    
                    <div class="columns is-grouped">
                        <div class="column is-three-fifths">
                            <font-select v-model="generatorData.selectedFont" :fonts="fontList"
                                label="Font:" iconleft="font" :text="textShowFont"/>
                        </div>
                        <div class="column is-two-fifths">
                            <label class="label">More fonts:</label>
                            <button class="button is-link is-fullwidth" :disabled="loadedFontTier === 3"
                            @click="loadedFontTier++;">
                                {{ loadMoreFontsButtonMsg }}
                            </button>
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
import Vue from 'vue'
import $ from "jquery"

import Ribbon from './components/Ribbon.vue'
import TextInput from './components/TextInput.vue'
import PageFooter from './components/Footer.vue'
import PreviewArea from './components/PreviewArea.vue'
import SelectInput from './components/SelectInput.vue'
import FontSelect from './components/FontSelect.vue'

import countryList from './assets/scripts/country_list.js'
import { addFontsToStyle, tier1_fonts, tier2_fonts, tier3_fonts } from './assets/scripts/fonts_utils.js'

window.Event = new Vue();

export default {
    name: "app",
    components: { Ribbon, TextInput, PageFooter, PreviewArea, SelectInput, FontSelect },

    data() {
        return {
            flagStyleOptions: [
                {value: 'none', name: 'No flag'},
                {value: 'old', name: 'Old'},
                {value: 'new', name: 'Modern'},
            ],

            countryOptions: countryList,
            loadedFontTier: 1,

            generatorData: {
                username: '',
                text: '',
                flagStyle: 'none',
                country: null,
                selectedFont: 'pneumati',
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
        },

        textShowFont: function() {
            return this.textToPrint || 'Lorem ipsum dolor sit amet';
        },

        fontList: function() {
            if(this.loadedFontTier === 1) {
                return tier1_fonts;
            } else if(this.loadedFontTier === 2) {
                return tier1_fonts.concat(tier2_fonts);
            } else {
                return tier1_fonts.concat(tier2_fonts, tier3_fonts);
            }
        },

        loadMoreFontsButtonMsg: function() {
            if(this.loadedFontTier === 1) {
                return "Load more fonts";
            } else if(this.loadedFontTier === 2) {
                return "Load even more fonts";
            } else {
                return "All fonts loaded";
            }
        }
    },

    mounted() {
        // Create the <style> tag for the @font-face's
        $(function() {
            addFontsToStyle();
        });

    },
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

.title {
    margin-top: 15px;
}
</style>
