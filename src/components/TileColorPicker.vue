<template>
    <div class="tile is-child box" :id="componentId" :style="{ 'background-color': value }" @click="onclicc">
        <input class="color">{{ text }}
    </div>
</template>

<script>
export default {

    props: {
        value: { default: '#BEDEAD' },
        text: { default: 'Sample text' },
    },

    computed: {
        componentId: function() {
            return this.text.toLowerCase().replace(" ", "-");
        }
    },

    methods: {
        onclicc() {
            alert("Benis");
        }
    }

}

$(function() {
    $(`.color`).colorPicker();
});
</script>

<style>

</style>
