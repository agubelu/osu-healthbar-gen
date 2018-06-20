<template>
    <div>
        <label v-if="label" class="label">{{ label }}</label>
        <div class="field has-addons">
            
            <div :class="{ 'control': true, 'has-icons-left': iconleft, 'is-expanded': true}">
                <div class="select">
                    <select :value="value" @input="$emit('input', $event.target.value)" 
                        class="is-fullwidth font-picker" :style="{'font-family': value}">
                        <option v-for="font in fonts" :value="font" :style="{'font-family': font}">
                            {{ text }}
                        </option>
                    </select>
                    <span v-if="iconleft" class="icon is-small is-left">
                        <font-awesome-icon :icon="iconleft" />
                    </span>
                </div>
            </div>
            <div class="control">
                <button class="button is-link" id="button-load-fonts" @click="$emit('loadMoreFonts')">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <p v-if="errorstring" :class="['help', errorstatus]">{{ errorstring }}</p>
        </div>
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



.font-picker option {
    font-size: x-large !important;
}
</style>
