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
import '../assets/scripts/jqColorPicker.js'

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
                `.cp-color-picker{box-sizing:border-box; width:275px;}
                .cp-color-picker .cp-panel {line-height: 21px; float:right;
                    padding:0 1px 0 8px; margin-top:-1px; overflow:visible}
                .cp-xy-slider {width:175px; height:175px;}
                .cp-xy-slider:active {cursor:none;}
                .cp-z-slider {height:175px; width:30px;}
                .cp-panel, .cp-panel input {color:#bbb; font-family:monospace,
                    "Courier New",Courier,mono; font-size:12px; font-weight:bold; overflow: visible;}
                .cp-panel input {width:28px; height:12px; padding:2px 3px 1px;
                    text-align:right; line-height:12px; background:transparent;
                    border:1px solid; border-color:#222 #666 #666 #222;}
                .cp-panel hr {margin:0 -2px 2px; height:1px; border:0;
                    background:#666; border-top:1px solid #222;}
                .cp-panel .cp-HEX {width:50px; position:absolute; margin:1px -3px 0 -2px;}
                .cp-alpha {width:155px;}`,

            buildCallback: function($elm) {
                var colorInstance = this.color,
                    colorPicker = this;

                $elm.prepend(`<div class="cp-panel">
                    R <input type="text" class="cp-r" /><br>
                    G <input type="text" class="cp-g" /><br>
                    B <input type="text" class="cp-b" /><hr>
                    HEX: <br>
                    <input type="text" class="cp-HEX" />
                </div>`).on('change', 'input', function(e) {
                    var value = this.value,
                        className = this.className,
                        type = className.split('-')[1],
                        color = {};

                    color[type] = value;
                    colorInstance.setColor(type === 'HEX' ? value : color,
                        type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                    colorPicker.render();
                    this.blur();
                });
            },
            renderCallback: function(elem, toggled) {
                // toggled is undefined if the user has picked a new color
                // otherwise it's true (picker opening) or false (closing)
                if(toggled === undefined) {
                    let r = this.color.colors.RND.rgb.r;
                    let g = this.color.colors.RND.rgb.g;
                    let b = this.color.colors.RND.rgb.b;
                    thisComponent.$emit('input', {r: r, g: g, b: b});
                }

                var colors = this.color.colors.RND,
				modes = {
					r: colors.rgb.r, g: colors.rgb.g, b: colors.rgb.b,
					h: colors.hsv.h, s: colors.hsv.s, v: colors.hsv.v,
					HEX: this.color.colors.HEX
				};

			$('input', '.cp-panel').each(function() {
				this.value = modes[this.className.substr(3)];
			});
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
