<template>
    <footer class="footer" id="footer">
        <div class="columns">
            <div class="column">
                <p>
                    <span class="pointer" @click="openTab('https://twitter.com/agubelu')">
                        <i class="fab fa-twitter"></i> <span class="underline">Twitter</span>
                    </span>
                    &nbsp;|&nbsp;
                    <span class="pointer" @click="openTab('https://osu.ppy.sh/forum/ucp.php?i=pm&mode=compose&u=4780236')">
                        <i class="fa fa-envelope"></i> <span class="underline">Contact me</span>
                    </span>
                </p>
            </div>
            <div class="column">
                <div class="content has-text-centered">
                    <p>Made with ❤️ by agubelu</p>
                </div>
            </div>
            <div class="column">
                <p>
                    <span class="pointer" @click="openTab('https://github.com/agubelu/osu-healthbar-gen')">
                        <span class="underline">View on GitHub</span> <i class="fab fa-github"></i>
                    </span>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {

    components: { FontAwesomeIcon },

    methods: {
        openTab(url) {
            window.open(url, '_blank');
        }
    }

}
</script>

<style>
#footer {
    background-color: #e0e0e0;
    padding: 1%;
}

#footer > .container {
    max-width: 1500px !important;
}

.pointer {
    cursor: pointer;
}

.underline {
    text-decoration: underline;
}
</style>
