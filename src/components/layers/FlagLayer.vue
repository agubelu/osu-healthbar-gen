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
        flagData: { default: '' },
        isAvatarPresent: { default: true },
    },

    computed: {
        componentId: function() {
            return `id-canvas-layer-${this.zindex}`;
        },

        flagUrl: function() {
            let spl = this.flagData.split("/");
            if(spl.length !== 2) return "";
            
            try{
                if(spl[0] === 'old') {
                    return require(`../../assets/flags/old/${spl[1]}.gif`);
                } else {
                    return require(`../../assets/flags/modern/${spl[1]}.png`);
                }
            } catch(e) {
                return require(`../../assets/flags/modern/unknown.png`);
            }
        }
    },

    methods: {
        updateFlag() {
            let canvas = document.getElementById(`${this.componentId}`);
            let ctx = canvas.getContext("2d");
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if(this.flagData.startsWith("none")) return;

            let img = new Image();
            img.onload = () => {
                ctx.drawImage(img, this.isAvatarPresent ? 157 : 137, 20, 32, 22);
            };

            img.src = this.flagUrl;
        }
    },

    watch: {
        flagData: function() {
            this.updateFlag();
        },

        isAvatarPresent: function() {
            this.updateFlag();
        },
    }
}
</script>
