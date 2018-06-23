<template>
    <canvas :id="componentId"
            :style="{'z-index': zindex}"
            class="canvas-layer canvas-drawable" 
            width="1354"
            height="160"/>
</template>

<script>
export default {

    props: {
        zindex: { default: 0 },
        textToPrint: { default: '' },
        fontSize: { default: 20 },
        font: { default: 'arlrdbd'},
        textColor: { default: 'black' },
        isAvatarPresent: { default: true },
        isFlagPresent: { default: false },
    },

    computed: {
        componentId: function() {
            return `id-canvas-layer-${this.zindex}`;
        },

        xposition: function() {
            let x = 137;
            if(this.isAvatarPresent) x += 18;
            if(this.isFlagPresent) x += 40;
            return x;
        }
    },

    methods: {
        updateText() {
            let canvas = document.getElementById(`${this.componentId}`);
            let ctx = canvas.getContext("2d");
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if(!this.textToPrint) return;

            ctx.font = `${this.fontSize}px ${this.font}`;
            ctx.fillStyle = `rgb(${this.textColor.r}, ${this.textColor.g}, ${this.textColor.b})`;
            ctx.fillText(this.textToPrint, this.xposition, 42);
        }
    },

    mounted() {
        this.updateText();
    },

    watch: {
        textToPrint: function() {
            this.updateText();
        },

        fontSize: function() {
            this.updateText();
        },

        font: function() {
            this.updateText();
        },

        isAvatarPresent: function() {
            this.updateText();
        },

        isFlagPresent: function() {
            this.updateText();
        },

        textColor: function() {
            this.updateText();
        },
    }
}
</script>
