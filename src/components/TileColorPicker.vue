<template>
    <div class="tile is-child box trigger" :id="componentId" :style="{ 'background-color': value }">
        
    </div>
</template>

<script>
export default {

    props: {
        value: { default: '' },
        text: { default: 'Sample text' },
    },

    computed: {
        componentId: function() {
            return 'picker-' + this.text.toLowerCase().replace(" ", "-");
        }
    },

    mounted() {
        const thisComponent = this;
        $(`#${this.componentId}`).colorPicker({
            opacity: false,
            cssAddon:
               `.cp-disp {padding:10px; margin-bottom:6px; font-size:19px; height:20px; line-height:20px}
                .cp-xy-slider {width:200px; height:200px;}
                .cp-xy-cursor {width:16px; height:16px; border-width:2px; margin:-8px}
                .cp-z-slider {height:200px; width:40px;}
                .cp-z-cursor {border-width:8px; margin-top:-8px;}
                .cp-alpha {height:40px;}
                .cp-alpha-cursor {border-width:8px; margin-left:-8px;}`,
            renderCallback: function(elem, toggled) {
                if(toggled === undefined) {
                    thisComponent.$emit('input', '#' + this.color.colors.HEX);
                }
            }
        });
    }
}

</script>
