<template>
    <canvas :id="componentId"
            :style="{'z-index': zindex, 'display': display}"
            class="canvas-layer canvas-drawable" 
            width="1354"
            height="160"/>
</template>

<script>
import { loadImageInCanvas, recolorCanvas } from '../../assets/scripts/canvasUtils.js'


export default {

    props: {
        zindex: { default: 0 },
        templateName: { default: '' },
        needsDarkBorder: { default: false },
        display: { default: '' },

        placementPosition: { 
            type: Object,
            default: () => ({x:0, y:0}),
        },
        contentStart: {
            type: Object,
            default: () => ({x:0, y:0}),
        },
        contentEnd: {
            type: Object,
            default: () => ({x:1354, y:160}),
        },
        color: {
            type: Object,
            default: () => ({r:50, g:100, b:200}),
        },
    },

    computed: {
        componentId: function() {
            return `id-canvas-layer-${this.zindex}`;
        }
    },

    methods: {
        updateTemplate() {
            loadImageInCanvas(
                document.getElementById(this.componentId),
                require("../../assets/templates/" + this.templateName),
                this.placementPosition,
                this.contentStart,
                this.contentEnd,
                this.color,
                this.needsDarkBorder
            );
        },

        recolorTemplate() {
            recolorCanvas(
                document.getElementById(this.componentId),
                this.contentStart,
                this.contentEnd,
                this.color,
                this.needsDarkBorder
            );
        }
    },

    mounted() {
        // Load the image into the canvas and recolor them
        this.updateTemplate();
    },

    watch: {
        templateName: function() {
            this.updateTemplate();
        },

        color: function() {
            this.recolorTemplate();
        }
    },
}
</script>

<style>

</style>
