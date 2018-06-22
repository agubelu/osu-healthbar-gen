<template>
    <div>
        <label v-if="label" class="label" :for="componentid">{{ label }}</label>
        <div class="field has-addons">
            
            <div :class="{ 'control': true, 'has-icons-left': iconleft, 'is-expanded': true}">
                <div class="select">
                    <select :value="value"
                            :style="{'font-family': value}"
                            :id="componentid"
                            class="is-fullwidth font-picker"
                            @input="$emit('input', $event.target.value)">
                        <option v-for="font in fonts"
                                :value="font"
                                :style="{'font-family': font}">
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
                    <font-awesome-icon icon="plus" />
                </button>
            </div>
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

    computed: {
        componentid: function() {
            return "id-" + this.label.toLowerCase().replace(/[^a-zA-Z0-9 \-_]/g, "").replace(/\s/g, "-");
        }
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
