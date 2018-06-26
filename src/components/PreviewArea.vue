<template>
    <section id="section-hero" class="hero is-primary">
        <div :class="{'hero-body': true, 'lightson': lightsOn, 'lightsoff': !lightsOn}" id="canvas-hero">
            <font-awesome-icon icon="lightbulb" @click="toggleLights" />
            <div class="container">
                <canvas id="layer-dummy" class="canvas-layer" width="1354" height="160" style="z-index: 0;"/>
                <!-- Background -->
                <template-layer zindex="1"
                                :template-name="templateBackground"
                                :color="colorBackground"
                                :needs-dark-border="true"
                                :content-start="{x:152, y:68}"
                                :content-end="{x:1307, y:91}"/>
                <!-- HIDDEN Foreground -->
                <template-layer :display="'none'"
                                :template-name="templateForeground"
                                :color="colorForeground"
                                :content-start="{x:143, y:36}"
                                :content-end="{x:1298, y:59}"/>
                <!-- Preview Foreground -->
                <template-layer zindex="2"
                                :template-name="templateForegroundPreview"
                                :color="colorForeground"
                                :content-start="{x:152, y:68}"
                                :content-end="{x:932, y:91}"/>
                <!-- Bar border -->
                <template-layer zindex="3"
                                :template-name="templateBarBorder"
                                :color="colorBarBorder"
                                :content-start="{x:136, y:52}"
                                :content-end="{x:1323, y:107}"/>
                <!-- Flag -->
                <flag-layer zindex="4"
                            :flag-data="flagData"
                            :is-avatar-present="avatarShape !== 'none'"/>
                
                <!-- Text -->
                <text-layer zindex="5"
                            :text-to-print="textToPrint"
                            :font-size="fontSize"
                            :font="font"
                            :text-color="colorFont"
                            :is-avatar-present="avatarShape !== 'none'"
                            :is-flag-present="isFlagPresent"/>
                
                <!-- Avatar image -->
                <avatar-layer zindex="6"
                              v-if="avatarShape !== 'none'"
                              :avatar-url="avatarUrl"
                              :avatar-shape="avatarShape" />

                <!-- Avatar border -->
                <template-layer zindex="7"
                                v-if="avatarShape !== 'none'"
                                :template-name="templateAvatarBorder"
                                :color="colorAvatarBorder"
                                :placement-position="{x:17, y:14}"
                                :content-start="{x:17, y:14}"
                                :content-end="{x:152, y:149}"/>
            </div>
        </div>
    </section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import TemplateLayer from './layers/TemplateLayer.vue'
import FlagLayer from './layers/FlagLayer.vue'
import TextLayer from './layers/TextLayer.vue'
import AvatarLayer from './layers/AvatarLayer.vue'

export default {

    components: { FontAwesomeIcon, TemplateLayer, FlagLayer, TextLayer, AvatarLayer },

    props: ['textToPrint', 'avatarShape', 'flagData', 'font', 'fontSize', 'colorAvatarBorder',
            'colorBackground', 'colorForeground', 'colorBarBorder', 'colorFont', 'avatarUrl',
            'templateAvatarBorder', 'templateBackground', 'templateForeground', 'templateForegroundPreview',
            'templateBarBorder'],

    data() {
        return {
            lightsOn: true,
        }
    },

    methods: {
        toggleLights() {
            this.lightsOn = !this.lightsOn;
        }
    },

    computed: {
        isFlagPresent: function() {
            return !this.flagData.startsWith('none') && this.flagData.split("/")[1] !== '';
        }
    }
    
}
</script>

<style>
#section-hero {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 5;
}

#canvas-hero {
    padding: .7%;
}

.canvas-layer {
    max-width: 100%;
    height: auto;
}

.canvas-drawable {
    position: absolute;
    left: 0;
    top: 0;
}

#canvas-hero svg {
    position: absolute;
    top: 1vh;
    right: 1vh;
    font-size: 3.3vw;
    cursor: pointer;
    z-index: 1000;
}

.lightsoff {
    background-color: black;
    color: white;
}

.lightson {
    background-color: #dad8d8;
    color: black;
}
</style>
