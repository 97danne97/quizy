<template>
    <div>
        <h4>Select difficulty:</h4>
        <transition name="fade">
            <div class="section row" v-if="response == true">
                <form action="#">
                    <p>
                        <label>
                            <input
                                class="with-gap"
                                name="group1"
                                type="radio"
                                value="easy"
                                v-on:input="updateValue($event.target.value)"
                            />
                            <span>Easy</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input
                                class="with-gap"
                                name="group1"
                                type="radio"
                                value="medium"
                                v-on:input="updateValue($event.target.value)"
                            />
                            <span>Medium</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input
                                class="with-gap"
                                name="group1"
                                type="radio"
                                value="hard"
                                v-on:input="updateValue($event.target.value)"
                            />
                            <span>Hard</span>
                        </label>
                    </p>
                </form>
                <transition name="fade">
                    <div class="section" v-if="difficulty != null">
                        <router-link
                            to="/quiz/play"
                            class="btn btn-large blue lighten-2 waves-effect"
                        >
                            <i class="material-icons left">done</i>Play
                        </router-link>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
module.exports = {
    name: "Difficulty",
    props: ["difficulty"],
    data: function() {
        return {
            response: true
        };
    },
    mounted() {},
    methods: {
        updateValue: function(difficulty) {
            this.difficulty = difficulty;
            this.$emit("update:difficulty", difficulty);
        }
    }
};
//https://opentdb.com/api.php?amount=3&category=9&difficulty=medium
</script>

<style scoped>

</style>