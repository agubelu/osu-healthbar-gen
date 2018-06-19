<template>
    <div class="field">
        <label v-if="label" class="label">{{ label }}</label>
        <div :class="{ 'control': true, 'has-icons-left': iconleft}">
            <div class="select">
                <select :value="value" @input="$emit('input', $event.target.value)" class="font-picker"
                :style="{'font-family': value}">
                    <option v-for="font in fonts" :value="font" :style="{'font-family': font}">
                        {{ text }}
                    </option>
                </select>
                <span v-if="iconleft" class="icon is-small is-left">
                    <font-awesome-icon :icon="iconleft" />
                </span>
            </div>
        </div>
        <p v-if="errorstring" :class="['help', errorstatus]">{{ errorstring }}</p>
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'


export default {

    components: { FontAwesomeIcon },

    props: {
        value: { default: '' },
        text: { default: '' },
        label: { default: '' },
        fonts: { default: [], },
        iconleft: { default: '' },
        enabled: { default: true },
    },

}
</script>

<style>
div.select, select {
    width: 100%;
}

.font-picker {
    font-size: large !important;
}

.font-picker option {
    font-size: x-large !important;
}
</style>
