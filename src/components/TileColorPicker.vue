<template>
    <div class="tile is-child box trigger"
         :id="componentId"
         :style="{ 'background-color': `rgb(${value.r},${value.g},${value.b})` }">
        <p class="subtitle is-4" :style="{ 'color': fontColor }">
            {{ text }}
        </p>
    </div>
</template>

<script>
export default {

    props: {
        value: { default: {r: 255, g: 255, b: 255} },
        text: { default: 'Sample text' },
    },

    computed: {
        componentId: function() {
            return 'picker-' + this.text.toLowerCase().replace(" ", "-");
        },

        fontColor: function() {
            var C = [this.value.r/255, this.value.g/255, this.value.b/255];

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
                .cp-alpha-cursor {border-width:8px; margin-left:-8px;}
                .cp-color-picker {background: #eee; border:1px solid #333}`,
            renderCallback: function(elem, toggled) {
                // toggled is undefined if the user has picked a new color
                // otherwise it's true (picker opening) or false (closing)
                if(toggled === undefined) {
                    let r = this.color.colors.RND.rgb.r;
                    let g = this.color.colors.RND.rgb.g;
                    let b = this.color.colors.RND.rgb.b;
                    thisComponent.$emit('input', {r: r, g: g, b: b});
                }
            }
        });
    }
}

</script>

<style>
.trigger {
    cursor: pointer;

    -webkit-touch-callout: none;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
}
</style>
