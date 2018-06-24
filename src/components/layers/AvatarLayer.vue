<template>
    <canvas :id="componentId"
            :style="{'z-index': zindex}"
            class="canvas-layer canvas-drawable" 
            width="1354"
            height="160"/>
</template>

<script>
import { roundedClip } from '../../assets/scripts/canvasUtils.js'

export default {

    props: {
        zindex: { default: 0 },
        userID: { default: 'noone' },
        avatarShape: { default: 'circle' },
    },

    computed: {
        componentId: function() {
            return `id-canvas-layer-${this.zindex}`;
        },

        roundRadius: function() {
            return this.avatarShape === 'circle' ? 64 : 7;
        }
    },

    methods: {
        updateAvatar() {
            if(this.avatarShape === 'none') return;

            let canvas = document.getElementById(this.componentId);
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let img = new Image();
            img.onload = () => {
                ctx.save();
                roundedClip(ctx, 21, 18, 126, 126, this.roundRadius);
                
                // Fill it with white in case the image has transparencies
                ctx.fillStyle="#FFFFFF";
                ctx.fillRect(21,18,128,128);

                ctx.drawImage(img, 21, 18, 128, 128);
                ctx.restore();
            };

            img.crossOrigin="anonymous";
            img.src = `https://agube.lu/generator/api/avatars/${this.userID}.png`;
        }
    },

    mounted() {
        this.updateAvatar();
    },

    watch: {
        userID: function() {
            this.updateAvatar();
        },

        avatarShape: function() {
            this.updateAvatar();
        }
    }
}
</script>
