<template>
    <div id="app">
        
        <preview-area :textToPrint="textToPrint"
                      :avatarShape="generatorFormData.avatarShape"
                      :flagData="countryAndFlagStyle"
                      :font="generatorFormData.selectedFont"
                      :fontSize="generatorFormData.fontSize"
                      :colorAvatarBorder="generatorFormData.colorAvatarBorder"
                      :colorBackground="generatorFormData.colorBackground"
                      :colorForeground="generatorFormData.colorForeground"
                      :colorBarBorder="generatorFormData.colorBarBorder"
                      :colorFont="generatorFormData.colorFont"
                      :avatar-url="customAvatarUrl || avatarUrl"
                      
                      :templateAvatarBorder="templateAvatarBorder"
                       templateBackground="background.png"
                       templateForeground="foreground.png"
                       templateForegroundPreview="foreground-preview.png"
                       templateBarBorder="border.png"/>

        <h1 class="title is-2" id="page-title">osu! healthbar generator</h1>
        <div class="container" id="form-container">
            <div class="columns">

                <!-- Left column -->
                <div class="column" id="column-left">

                    <!-- Username and avatar shape -->
                    <div class="columns">
                        <div class="column is-three-fifths">
                            <text-input v-model="generatorFormData.username"
                                        :errorstatus="formStatus.usernameInputStatus"
                                        :errorstring="formStatus.usernameInputError"
                                        :isloading="formStatus.usernameInputLoading"
                                        :iconright="formStatus.usernameInputIcon"
                                        :autofocus="true"
                                        label="Your osu! username:" 
                                        iconleft="user" 
                                        @input="onUsernameInput"/>
                        </div>
                        <div class="column is-two-fifths">
                            <select-input v-model="generatorFormData.avatarShape"
                                          :options="selectOptions.avatarStyleOptions" 
                                          iconleft="user-circle"    
                                          label="Avatar style:" />
                        </div>
                    </div>
                    
                    <!-- Text to print -->
                    <div class="columns">
                        <div class="column">
                            <text-input v-model="generatorFormData.text"
                                        label="Text to print:"
                                        iconleft="pencil-alt" 
                                        placeholder="Leave blank to print your username" />
                        </div>
                    </div>

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
                                          :enabled="generatorFormData.flagStyle !== 'none'"
                                          label="Country:"
                                          iconleft="globe" />
                        </div>
                    </div>
                    
                    <!-- Font and font size -->
                    <div class="columns is-grouped">
                        <div class="column is-three-quarters">
                            <font-select v-model="generatorFormData.selectedFont"
                                         :fonts="fontList"
                                         :text="textToPrint || 'Type in your username!'"
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

                    <!-- Custom avatar uploader -->
                    <file-uploader :icon="this.customAvatar === null ?
                                          'file-image' : 'times'"
                                   :text-button="avatarUploadButtonText"
                                   :text-selected="avatarUploadText"
                                   :button-status="this.customAvatar === null ?
                                                   'is-link' : 'is-dark'"
                                    label="Override avatar:"
                                    accept="image/*"
                                    @fileSelected="onFileSelected"
                                    @fileSelectorClicked="onFileSelectorClicked"/>

                <!-- Close column-left -->
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
                                    <select-input v-model="colorTheme" 
                                                  :options="selectOptions.presetStyleOptions" 
                                                  iconleft="paint-brush"
                                                  label="Color theme:"
                                                  errorstring="Click any color to edit it" />
                                </div>
                            </div>
                            <div class="tile is-parent">
                                <!-- Element 2 -->
                                <tile-color-picker v-model="generatorFormData.colorAvatarBorder"
                                                   text="Avatar border"/>
                            </div>
                        </div>

                        <!-- Row 2 -->
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <!-- Element 3 -->
                                <tile-color-picker v-model="generatorFormData.colorBackground"
                                                   text="Background"/>
                            </div>
                            <div class="tile is-parent">
                                <!-- Element 4 -->
                                <tile-color-picker v-model="generatorFormData.colorForeground"
                                                   text="Foreground"/>
                            </div>
                        </div>

                        <!-- Row 3 -->
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <!-- Element 5 -->
                                <tile-color-picker v-model="generatorFormData.colorBarBorder"
                                                   text="Bar border"/>
                            </div>
                            <div class="tile is-parent">
                                <!-- Element 6 -->
                                <tile-color-picker v-model="generatorFormData.colorFont"
                                                   text="Font"/>
                            </div>
                        </div>
                        
                    </div>

                <!-- Close column-right -->
                </div>

            <!-- Close columns -->
            </div>

            <div class="is-divider"></div>

            <div id="columns-download" class="columns">
                <div class="column is-one-third is-offset-one-third">
                    <a id="button-download"
                       class="button is-link is-large"
                       @click="onDirectDownload">
                        <span class="icon">
                            <font-awesome-icon icon="download" />
                        </span>
                        <span>Download</span>
                    </a>
                </div>
            </div>

        <!-- Close form-container -->
        </div>

        <page-footer/>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'
import 'bulma'
import 'bulma-divider'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

import TextInput from './components/TextInput.vue'
import NumberInput from './components/NumberInput.vue'
import PageFooter from './components/Footer.vue'
import PreviewArea from './components/PreviewArea.vue'
import SelectInput from './components/SelectInput.vue'
import FontSelect from './components/FontSelect.vue'
import TileColorPicker from './components/TileColorPicker.vue'
import FileUploader from './components/FileUploader.vue'

import countryList from './assets/scripts/countryList.js'
import { addFontsToStyle, tier1_fonts, tier2_fonts, tier3_fonts } from './assets/scripts/fontsUtils.js'
import themeDefaults from './assets/scripts/themeColors.js'
import shake from './assets/scripts/shake.js'
import { generateDownloadZip } from './assets/scripts/fileUtils.js'

// Importing all icons that we'll need here
// (Helps to keeping the bundle size small compared to importing them all)
import './assets/scripts/loadIcons.js'

window.Event = new Vue();

export default {
    name: "app",
    components: { TextInput, PageFooter, PreviewArea, SelectInput,
                  NumberInput, FontSelect, TileColorPicker, FontAwesomeIcon,
                  FileUploader },

    data() {
        return {
            // Selected color theme
            colorTheme: 'blue',

            // Current user's avatar
            avatarUrl: 'https://agube.lu/generator/api/avatars/noone.png',
            // Custom avatar data URL
            customAvatarUrl: '',
            customAvatar: null,

            // Holds all raw values from the form
            generatorFormData: {
                username: '',
                avatarShape: 'circle',
                text: '',
                flagStyle: 'new',
                country: '',
                selectedFont: 'arlrdbd',
                fontSize: 30,
                colorAvatarBorder: themeDefaults.blue.avatarBorder,
                colorBackground: themeDefaults.blue.background,
                colorForeground: themeDefaults.blue.foreground,
                colorBarBorder: themeDefaults.blue.barBorder,
                colorFont: themeDefaults.blue.font,
            },

            // Variables to control the form status
            formStatus: {
                usernameInputStatus: "is-focused",
                usernameInputError: '',
                usernameInputIcon: '',
                usernameInputLoading: false,
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
        avatarUploadText: function() {
            let avatar = this.customAvatar;
            if(avatar === null) {
                return "Click to upload";
            } else {
                return avatar.name;
            }
        },

        // Returns the text for the custom avatar upload button
        avatarUploadButtonText: function() {
            return this.customAvatar === null ?
                    "Upload your avatar" : "Reset custom avatar";
        },

        // Returns always a valid avatar border template
        templateAvatarBorder: function() {
            let shape = this.generatorFormData.avatarShape;
            return shape !== 'none' ? `border-${shape}.png` : 'border-circle.png';
        },

        // Returns the country and flag style in a unified way
        countryAndFlagStyle: function() {
            return this.generatorFormData.flagStyle + "/" + this.generatorFormData.country;
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

    watch: {
        colorTheme: function(newVal) {
                this.generatorFormData.colorAvatarBorder = themeDefaults[newVal].avatarBorder,
                this.generatorFormData.colorBackground = themeDefaults[newVal].background,
                this.generatorFormData.colorForeground = themeDefaults[newVal].foreground,
                this.generatorFormData.colorBarBorder = themeDefaults[newVal].barBorder,
                this.generatorFormData.colorFont = themeDefaults[newVal].font
        },

        customAvatar: function(avatar) {
            if(avatar === null) {
                this.customAvatarUrl = "";
            } else {
                let reader = new FileReader();

                reader.addEventListener('load', () => {
                    this.customAvatarUrl = reader.result;
                });

                reader.readAsDataURL(avatar);
            }
        },
    },

    methods: {
        onFileSelectorClicked() {
            if(this.customAvatar !== null) {
                this.customAvatar = null;
            }
        },

        onFileSelected(file) {
            this.customAvatar = file;
        },

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

        getUserDataDebounced: _.debounce(function() {
            let username = this.generatorFormData.username;
            if(!username) return;

            this.formStatus.usernameInputLoading = true;

            axios.get("https://agube.lu/generator/api/getUser?q=" + encodeURI(username))
                 .then(response => {
                    let userExists = response.data.exists;

                    if(userExists) {
                        this.formStatus.usernameInputStatus = 'is-success';
                        this.formStatus.usernameInputIcon = 'check';
                        this.formStatus.usernameInputLoading = false;
                        this.generatorFormData.country = response.data.country;
                        this.generatorFormData.username = response.data.username;
                        this.avatarUrl = `https://agube.lu/generator/api/avatars/${response.data.id}.png`;
                    } else {
                        this.formStatus.usernameInputStatus = 'is-danger';
                        this.formStatus.usernameInputError = 'User does not exist!';
                        this.formStatus.usernameInputIcon = 'exclamation-triangle';
                        this.formStatus.usernameInputLoading = false;

                        shake($("#id-your-osu-username").parent());
                    }
                 })
                 .catch(error => {
                     alert(error);
                 });
        }, 750),

        onUsernameInput() {
            // Reset the status
            this.formStatus.usernameInputStatus = '';
            this.formStatus.usernameInputError = '';
            this.formStatus.usernameInputIcon = '';
            this.formStatus.usernameInputLoading = false;

            this.getUserDataDebounced();
        },

        onDirectDownload() {
            let username = (this.generatorFormData.username || 'healthbar')
                            .replace(" ", "-");
            generateDownloadZip(username);
        }
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
html {
    min-height: 100vh;
    overflow-y:auto;
}

body {
    min-height: 100vh;
}

#app {
    font-family: 'arlrdbd';
    text-align: center;
    background-color: #f3f3f3;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

#form-container {
    padding-left: 3vw;
    padding-right: 3vw;
    margin-top: 0vh;
    margin-bottom: 3vh;
    flex: 1;
}

#form-container .columns, #form-container .column {
    margin-bottom: 0;
}

.is-divider {
    padding: 0;
    margin-top: 25px;
    margin-bottom: 25px;
}

.is-divider-vertical {
    padding: 0;
    margin-right: 20px;
    margin-left: 20px;
}

.title {
    margin-top: 3.5vh;
    margin-bottom: 3.5vh !important;
}

.is-ancestor {
    height: 100%;
}

#columns-download a {
    width: 100%;
}

#button-download:hover {
    background-color: #2568d3;
}

#button-download:active {
    background-color: #225ebd;
}
</style>
