<template>
    <footer class="footer" id="footer">
        <div class="columns">
            <div class="column">
                <p>
                    <font-awesome-icon :icon="['fab', 'twitter']" /> <a href="https://twitter.com/agubelu" target="_blank">Twitter</a>
                    &nbsp;|&nbsp;
                    <font-awesome-icon icon="envelope" /> <a href="https://osu.ppy.sh/forum/ucp.php?i=pm&mode=compose&u=4780236" target="_blank">Contact me</a>
                </p>
            </div>
            <div class="column">
                <div class="content has-text-centered">
                    <p>Made with ❤️ by agubelu</p>
                </div>
            </div>
            <div class="column">
                <p>
                    <a href="https://github.com/agubelu/osu-healthbar-gen" target="_blank">
                        {{ this.starCount }} <font-awesome-icon icon="star" /> on GitHub
                    </a>
                    <font-awesome-icon :icon="['fab', 'github']" />
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import axios from 'axios'

export default { 

    components: { FontAwesomeIcon },

    data() {
        return {
            starCount: 0,
        }
    },

    mounted() {
        axios.get("https://api.github.com/repos/agubelu/osu-healthbar-gen")
             .then(response => {
                 this.starCount = response.data["stargazers_count"];
             });
    }

}
</script>

<style>
#footer {
    margin-top: 5vh;
    background-color: #dad8d8;
    padding-top: 10px;
    padding-bottom: 0.8rem;
}

#footer > .container {
    max-width: 1500px !important;
}

#footer a {
    color: inherit;
    text-decoration: underline;
}
</style>
