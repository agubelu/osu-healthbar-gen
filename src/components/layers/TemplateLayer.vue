<template>
    <canvas :id="componentId" class="canvas-layer canvas-drawable" :style="{'z-index': zindex}" width="1354" height="160"/>
</template>

<script>
import { loadImageInCanvas } from '../../assets/scripts/canvasUtils.js'


export default {

    props: {
        zindex: { default: 0 },
        templateName: { default: '' },
        needsDarkBorder: { default: false },

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
                this.placementPosition
            );
        }
    },

    mounted() {
        // Load the image into the canvas
        this.updateTemplate();
    },

    watch: {
        templateName: function() {
            this.updateTemplate();
        }
    },
}
</script>

<style>

</style>
