<template>
    <div id="app">
        
        <preview-area/>

        <h1 class="title">osu! healthbar generator</h1>
        <div class="container" id="form-container">
            <div class="columns">

                <!-- Left column -->
                <div class="column" id="column-left">

                    <!-- Username and avatar shape -->
                    <div class="columns">
                        <div class="column is-three-fifths">
                            <text-input v-model="generatorFormData.username"
                                        :errorstatus="formStatus.usernameInputStatus"
                                        label="Your osu! username:" 
                                        iconleft="user" />
                        </div>
                        <div class="column is-two-fifths">
                            <select-input v-model="generatorFormData.avatarShape"
                                          :options="selectOptions.avatarStyleOptions" 
                                          iconleft="user-circle"    
                                          label="Avatar style:" />
                        </div>
                    </div>
                    
                    <!-- Text to print -->
                    <text-input v-model="generatorFormData.text"
                                label="Text to print:"
                                iconleft="pencil-alt" 
                                placeholder="Leave blank to print your username" />

                    <!-- Flag style and country -->
                    <div class="columns" id="country-div">
                        <div class="column is-two-fifths">
                            <select-input v-model="generatorFormData.flagStyle"
                                          :options="selectOptions.flagStyleOptions" 
                                          iconleft="flag"
                                          label="Flag style:" />
                        </div>
                        <div class="column is-three-fifths">
                            <select-input v-model="generatorFormData.country"
                                          :options="selectOptions.countryOptions" 
                                          :enabled="countrySelectorEnabled"
                                          label="Country:"
                                          iconleft="globe" />
                        </div>
                    </div>
                    
                    <!-- Font and font size -->
                    <div class="columns is-grouped">
                        <div class="column is-three-quarters">
                            <font-select v-model="generatorFormData.selectedFont"
                                         :fonts="fontList"
                                         :text="textToPrint || 'Lorem ipsum dolor sit amet'"
                                         label="Font:"
                                         iconleft="font" 
                                         @loadMoreFonts="onLoadMoreFonts" />
                        </div>
                        <div class="column is-one-quarter">
                            <number-input v-model="generatorFormData.fontSize"
                                          label="Font size:"
                                          iconleft="sort-numeric-down" 
                                          minval="1" />
                        </div>
                    </div>
                </div>

                <div class="is-divider-vertical"></div>

                <!-- Right column -->
                <div class="column" id="column-right">
                    <div class="tile is-ancestor is-vertical">

                        <!-- Row 1 -->
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <!-- Element 1 -->
                                <div class="tile is-child">
                                    <select-input v-model="generatorFormData.colorTheme" 
                                                  :options="selectOptions.presetStyleOptions" 
                                                  iconleft="paint-brush"
                                                  label="Color theme:"
                                                  errorstring="Click any color to edit it" />
                                </div>
                            </div>
                            <div class="tile is-parent">
                                <!-- Element 2 -->
                                <tile-color-picker/>
                            </div>
                        </div>

                        <!-- Row 2 -->
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <!-- Element 3 -->
                                <div class="tile is-child box">

                                </div>
                            </div>
                            <div class="tile is-parent">
                                <!-- Element 4 -->
                                <div class="tile is-child box">

                                </div>
                            </div>
                        </div>

                        <!-- Row 3 -->
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <!-- Element 5 -->
                                <div class="tile is-child box">

                                </div>
                            </div>
                            <div class="tile is-parent">
                                <!-- Element 6 -->
                                <div class="tile is-child box">

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <page-footer/>
    </div>
</template>

<script>
import Vue from 'vue'

import TextInput from './components/TextInput.vue'
import NumberInput from './components/NumberInput.vue'
import PageFooter from './components/Footer.vue'
import PreviewArea from './components/PreviewArea.vue'
import SelectInput from './components/SelectInput.vue'
import FontSelect from './components/FontSelect.vue'
import TileColorPicker from './components/TileColorPicker.vue'

import countryList from './assets/scripts/country_list.js'
import { addFontsToStyle, tier1_fonts, tier2_fonts, tier3_fonts } from './assets/scripts/fonts_utils.js'

window.Event = new Vue();

export default {
    name: "app",
    components: { TextInput, PageFooter, PreviewArea, SelectInput,
                  NumberInput, FontSelect, TileColorPicker },

    data() {
        return {

            // Holds all raw values from the form
            generatorFormData: {
                username: '',
                avatarShape: 'circle',
                text: '',
                flagStyle: 'none',
                country: '',
                selectedFont: 'pneumati',
                fontSize: 20,
                colorTheme: 'blue',
            },

            // Variables to control the form status
            formStatus: {
                usernameInputStatus: "is-focused",
                loadedFontTier: 1,
            },

            // All options for the diferent <select> inputs
            selectOptions: {
                countryOptions: countryList,
                flagStyleOptions: [
                    {value: 'none', name: 'No flag'},
                    {value: 'old', name: 'Old'},
                    {value: 'new', name: 'Modern'},
                ],
                avatarStyleOptions: [
                    {value: 'circle', name: 'Circle'},
                    {value: 'square', name: 'Square'},
                    {value: 'none', name: 'No avatar'},
                ],
                presetStyleOptions: [
                    {value: 'blue', name: 'Blue'},
                    {value: 'red', name: 'Red'},
                    {value: 'yellow', name: 'Yellow'},
                    {value: 'green', name: 'Green'},
                    {value: 'orange', name: 'Orange'},
                    {value: 'purple', name: 'Purple'},
                    {value: 'pink', name: 'Pink'},
                    {value: 'brown', name: 'Brown'},
                    {value: 'white', name: 'White'},
                ],
            },

        };
    },
    
    computed: {
        // Determines whether the country selector is active or not
        countrySelectorEnabled: function() {
            return this.generatorFormData.flagStyle !== 'none';
        },

        // Returns the selected country or none if the flag style is set to none
        selectedCountry: function() {
            return this.generatorFormData.flagStyle === 'none' 
                   ? null : this.generatorFormData.country; 
        },

        // Returns the text that should be printed in the healthbar
        textToPrint: function() {
            return this.generatorFormData.text || this.generatorFormData.username;
        },

        // Returns the font list based on the font tier currently loaded
        fontList: function() {
            var loadedTier = this.formStatus.loadedFontTier;
            if(loadedTier === 1) {
                return tier1_fonts;
            } else if(loadedTier === 2) {
                return tier1_fonts.concat(tier2_fonts);
            } else {
                return tier1_fonts.concat(tier2_fonts, tier3_fonts);
            }
        },

        // Returns the confirm message for the 'load more fonts' button
        loadMoreFontsAlertMsg: function() {
            return this.formStatus.loadedFontTier === 1 ?
            "This will download 200 aditional fonts, with a total size of around ~25MB" :
            "This will download 400 aditional fonts, with a total size of around ~35MB";
        }
    },

    methods: {
        onLoadMoreFonts() {
            if(!confirm(this.loadMoreFontsAlertMsg)) return;
            
            var button = $("#button-load-fonts");
            button.toggleClass("is-loading");
            this.formStatus.loadedFontTier++;

            setTimeout(() => {
                button.toggleClass("is-loading");
                if(this.formStatus.loadedFontTier === 3) {
                    $("#button-load-fonts").attr("disabled", true);
                    $("#button-load-fonts").toggleClass("is-link");
                }
            }, 1500);
        },
    },

    mounted() {
        
        $(function() {
            // Create the <style> tag for the @font-face's
            // We bind it to onReady to make the fonts load after everything is ready
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

.is-ancestor {
    height: 100%;
}

#column-right {
    padding-bottom: 0;
}
</style>
