<template>
    <div class="tile is-child box trigger"
         :id="componentId"
         :style="{ 'background-color': value }">
        <p class="subtitle is-4" :style="{ 'color': fontColor }">
            {{ text }}
        </p>
    </div>
</template>

<script>
import { hexToRgb } from '../assets/scripts/utils.js'

export default {

    props: {
        value: { default: '#FFFFFF' },
        text: { default: 'Sample text' },
    },

    computed: {
        componentId: function() {
            return 'picker-' + this.text.toLowerCase().replace(" ", "-");
        },

        fontColor: function() {
            var rgb = hexToRgb(this.value);
            var [R, G, B] = [rgb.r, rgb.g, rgb.b];
            
            var C = [R/255, G/255, B/255];
            for (var i = 0; i < C.length; ++i) {
			    if (C[i] <= 0.03928) {
				    C[i] = C[i] / 12.92;
			    } else {
				    C[i] = Math.pow(( C[i] + 0.055) / 1.055, 2.4);
			    }
		    }

		    var L = (0.2126 * C[0]) + (0.7152 * C[1]) + (0.0722 * C[2]);
            return L > 0.179 ? '#000' : '#FFF';
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

