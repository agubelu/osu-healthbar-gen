<template>
    <div class="field">
        <label v-if="label" class="label" :for="componentid">{{ label }}</label>
        <div :class="['file', 'has-name', 'is-fullwidth', buttonStatus]">
            <label class="file-label">
                <input :id="componentid"
                       :accept="accept"
                        class="file-input"
                        type="file"
                        @change="onFileChange($event)"
                        @click="onClick($event)">
                <span class="file-cta">
                    <span class="file-icon">
                        <font-awesome-icon :icon="icon" />
                    </span>
                    <span class="file-label">
                        {{ textButton }}
                    </span>
                </span>
                <span class="file-name">
                    {{ textSelected }}
                </span>
            </label>
        </div>
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {

    components: { FontAwesomeIcon },

    props: {
        label: { default: '' },
        icon: { default: '' },
        accept: { default: '' },
        textButton: { default: '' },
        textSelected: { default: '' },
        buttonStatus: { default: '' },
    },

    computed: {
        componentid: function() {
            return "id-" + this.label.toLowerCase().replace(/[^a-zA-Z0-9 \-_]/g, "").replace(/\s/g, "-");
        }
    },

    methods: {
        onFileChange(event) {
            let files = event.target.files;
            if(files.length !== 0) {
                this.$emit('fileSelected', files[0]);
                // We set the input value to an empty state to prevent
                // the change event from not firing if the user resets and
                // selects the same file again
                $(`#${this.componentid}`).val('');
            }
        },

        onClick(event) {
            this.$emit('fileSelectorClicked');
            if(this.buttonStatus === 'is-dark') {
                event.preventDefault();
            }
        },
    },

}
</script>

<style>

</style>
