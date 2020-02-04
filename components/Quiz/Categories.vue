<template>
    <div>
        <h4>Select a category:</h4>
        <transition name="fade">
            <div v-if="response == false" class="row center">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="section row" v-if="response == true">
                <div
                    class="category col s12 m6 l4 xl3"
                    :key="index"
                    v-for="(category, index) in data"
                    v-on:click="updateValue($event.target.id)"
                >
                    <router-link
                        :id="category.id"
                        class="btn btn-large col blue lighten-1 waves-effect waves-light s12 hoverable"
                        to="/quiz/difficulty"
                        v-html="category.name"
                    ></router-link>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
module.exports = {
    name: "Categories",
    props: ["category"],
    data: function() {
        return {
            response: false
        };
    },
    mounted() {
        //GET-request till API, lagrar svar i info
        axios.get("https://opentdb.com/api_category.php").then(res => {
            this.onResponse(res); // Kallar på onResponse vid svar från API
        });
    },
    methods: {
        onResponse: function(res) {
            this.data = res.data.trivia_categories; //begränsa antalet ledamöter
            this.response = true;
        },
        updateValue: function(category) {
            this.$emit("update:category", category);
        }
    }
};
</script>

<style scoped>

</style>