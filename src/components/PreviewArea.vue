<template>
    <section id="section-hero" class="hero is-primary">
        <div :class="{'hero-body': true, 'lightson': lightsOn, 'lightsoff': !lightsOn}" id="canvas-hero">
            <font-awesome-icon icon="lightbulb" @click="toggleLights" />
            <div class="container">
                <canvas id="layer-dummy" class="canvas-layer" width="1354" height="160" style="z-index: 0;"/>
                <!-- Bar border -->
                <template-layer zindex="1"
                                :template-name="templateBarBorder"
                                :color="colorBarBorder"
                                :content-start="{x:136, y:52}"
                                :content-end="{x:1323, y:107}"/>
                <!-- Background -->
                <template-layer zindex="2"
                                :template-name="templateBackground"
                                :color="colorBackground"
                                :content-start="{x:152, y:68}"
                                :content-end="{x:1307, y:91}"/>
                <!-- Foreground -->
                <template-layer zindex="3"
                                :template-name="templateForeground"
                                :color="colorForeground"
                                :content-start="{x:143, y:36}"
                                :content-end="{x:1298, y:59}"/>
                <!-- Avatar border -->
                <template-layer zindex="4"
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

export default {

    components: { FontAwesomeIcon, TemplateLayer },

    props: ['textToPrint', 'avatarShape', 'flagData', 'font', 'fontSize', 'colorAvatarBorder',
            'colorBackground', 'colorForeground', 'colorBarBorder', 'colorFont', 'userID',
            'templateAvatarBorder', 'templateBackground', 'templateForeground', 'templateBarBorder'],

    data() {
        return {
            lightsOn: true,
        }
    },

    methods: {
        toggleLights() {
            this.lightsOn = !this.lightsOn;
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
    background-color: #ecebeb;
    color: black;
}
</style>
