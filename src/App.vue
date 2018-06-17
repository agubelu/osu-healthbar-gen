<template>
    <div id="app">
        <ribbon color="red">Work in progress</ribbon>

        <section class="hero is-primary">
            <div class="hero-body" id="canvas-hero">
                <div class="container">
                    <canvas id="layer-dummy" class="canvas-layer" width="1354" height="160" style="z-index: 0;"/>
                    <canvas id="layer0" class="canvas-layer canvas-drawable" width="1354" height="160" style="z-index: 0;"/>
                    <canvas id="layer1" class="canvas-layer canvas-drawable" width="1354" height="160" style="z-index: 1;"/>
                    <canvas id="layer2" class="canvas-layer canvas-drawable" width="1354" height="160" style="z-index: 2;"/>
                </div>
            </div>
        </section>

        <img src="./assets/images/dog.gif">
        <h1>{{ msg }}</h1>
        <text-input :label="msg" v-model="msg" :isloading="isLoading"
        @focus="isLoading = true" @blur="isLoading = false"/>

        <page-footer/>
    </div>
</template>

<script>
import Ribbon from './components/Ribbon.vue'
import TextInput from './components/TextInput.vue'
import PageFooter from './components/Footer.vue'

export default {
    name: "app",

    data() {
        return {
            msg: "WIP",
            isLoading: false,
        };
    },

    components: { Ribbon, TextInput, PageFooter },

    mounted() {
        function drawcircle(context, centerX, centerY, radius, color) {
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = color;
            context.fill();
        }

        for(var i = 0; i < 3; i++) {
            let color = i == 0 ? 'black' : i == 1 ? 'red' : 'blue';
            var ctx = document.getElementById(`layer${i}`).getContext('2d');
            drawcircle(ctx, 200+i*20, 70, 50, color);
        }
    }
};


</script>

<style>
#app {
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
}

#canvas-hero {
    padding: .7%;
    /*background-color: #fff;*/
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
</style>
