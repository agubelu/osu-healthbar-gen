<template>
    <div class="field">
        <label v-if="label" class="label">{{ label }}</label>
        <div :class="{ 'control': true,
                       'has-icons-left': iconleft,
                       'has-icons-right': iconright,
                       'is-loading': isloading
                     }">
            <input :value="value"
                   :class="['input', errorstatus]"
                   :placeholder="placeholder"
                   type="text"
                   @focus="sendOnFocus"
                   @blur="sendOnBlur"
                   @input="$emit('input', $event.target.value)">
                   
            <span v-if="iconleft" class="icon is-small is-left">
                <font-awesome-icon :icon="iconleft" />
            </span>
            <span v-if="iconright" class="icon is-small is-right">
                <font-awesome-icon :icon="iconright" />
            </span>
        </div>
        <p v-if="errorstring" :class="['help', errorstatus]">{{ errorstring }}</p>
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
    props: {
        label: { default: '' },
        placeholder: { default: '' },
        iconleft: { default: '' },
        iconright: { default: '' },
        isloading: { default: '' },
        value: { default: '' },
        errorstring: { default: '' },
        errorstatus: { default: '' },
    },

    methods: {
        sendOnFocus() {
            this.$emit('focus', this);
        },

        sendOnBlur() {
            this.$emit('blur', this);
        },
    },

    components: { FontAwesomeIcon },

}
</script>

<style>
label, p.help {
    text-align: left;
}

.label {
    margin-bottom: 0 !important;
}
</style>
