<template>
    <section id="section-hero" class="hero is-primary">
        <div :class="{'hero-body': true, 'lightson': lightsOn, 'lightsoff': !lightsOn}" id="canvas-hero">
            <i id="lightsicon" class="fas fa-lightbulb" @click="toggleLights"></i>
            <div class="container">
                <canvas id="layer-dummy" class="canvas-layer" width="1354" height="160" style="z-index: 0;"/>
                <canvas id="layer0" class="canvas-layer canvas-drawable" width="1354" height="160" style="z-index: 0;"/>
                <canvas id="layer1" class="canvas-layer canvas-drawable" width="1354" height="160" style="z-index: 1;"/>
                <canvas id="layer2" class="canvas-layer canvas-drawable" width="1354" height="160" style="z-index: 2;"/>
            </div>
        </div>
    </section>
</template>

<script>
export default {

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
    top: 0;
    z-index: 5;
}

#canvas-hero {
    padding: .7%;
}

.canvas-layer {
    border: 2px dotted red;
    max-width: 100%;
    height: auto;
}

.canvas-drawable {
    position: absolute;
    left: 0;
    top: 0;
}

#lightsicon {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 3vw;
    cursor: pointer;
}

.lightsoff {
    background-color: black;
    color: white;
}

.lightson {
    background-color: #e8e8e8;
    color: black;
}
</style>
