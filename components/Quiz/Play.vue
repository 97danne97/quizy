<template>
    <div class="questions">
        <transition name="fade">
            <div v-if="response != 0" class="row center">
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
            <div v-if="response == 0">
                <div class="grey lighten-4 section row valign-wrapper z-depth-1">
                    <div class="col s2 left">
                        <div
                            v-show="questionCounter > 1"
                            class="btn-floating large left yellow darken-2 waves-effect"
                            v-on:click="previousQuestion"
                        >
                            <i class="material-icons">arrow_back</i>
                        </div>
                    </div>
                    <div class="col s8 center-align">
                        <span class="flow-text">Fråga {{questionCounter}} av {{data.length}}</span>
                    </div>
                    <div class="col s2 right">
                        <div
                            v-show="questionCounter < questionAmount"
                            class="btn-floating right yellow darken-2 waves-effect"
                            v-on:click="nextQuestion"
                        >
                            <i class="material-icons">arrow_forward</i>
                        </div>
                    </div>
                </div>
                <transition-group :name="transitionName">
                    <div
                        v-show="index === questionCounter-1"
                        class="question row"
                        v-for="(question, index) in data"
                        :key="index"
                    >
                        <div class="card grey lighten-4 z-depth-2">
                            <div class="card-content">
                                <p class="flow-text" v-html="question.question"></p>
                                <div class="divider"></div>
                                <div class="row section">
                                    <div
                                        class="col s12 m6"
                                        v-for="(answer, index) in question.answers"
                                        :key="index"
                                    >
                                        <a
                                            class="blue flow-text lighten-2 waves-effect waves-light btn btn-large col s12"
                                            v-html="answer['text']"
                                            @click="userAnswer($event, answer['correct'])"
                                        ></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </transition>
    </div>
</template>

<script>
module.exports = {
    name: "Play",
    props: ["category", "difficulty"],
    data: function() {
        return {
            data: null,
            response: true,
            questionCounter: 1,
            transitionName: "fade",
            confirm: 0
        };
    },
    mounted() {
        //GET-request till API, lagrar svar i info
        if (this.category == undefined || this.difficulty == undefined) {
            axios.get("https://opentdb.com/api.php?amount=25").then(res => {
                this.onResponse(res);
            });
        } else {
            axios
                .get(
                    "https://opentdb.com/api.php?amount=25&category=" +
                        this.category +
                        "&difficulty=" +
                        this.difficulty
                )
                .then(res => {
                    this.onResponse(res);
                });
        }
    },
    methods: {
        onResponse: function(res) {
            this.data = res.data.results;
            for (i in this.data) {
                for (j in this.data[i].incorrect_answers) {
                    var answer = {
                        text: this.data[i].incorrect_answers[j],
                        correct: false
                    };
                    this.data[i].incorrect_answers[j] = answer;
                }
                var answer = {
                    text: this.data[i].correct_answer,
                    correct: true
                };
                this.data[i].correct_answer = answer;
                this.data[i].answers = this.shuffle(
                    this.data[i].incorrect_answers.concat(
                        this.data[i].correct_answer
                    )
                );
            }
            this.questionAmount = this.data.length;
            this.response = res.data.response_code;
        },
        incrementQuestion: function(question, index) {
            this.data[index].id = index + 1;
            return index + 1;
        },
        nextQuestion: function() {
            if (this.questionCounter < this.questionAmount) {
                this.questionCounter++;
                this.transitionName = "fade";
                this.confirm = false;
            }
        },
        previousQuestion: function() {
            if (this.questionCounter > 1) {
                this.questionCounter--;
                this.transitionName = "fade2";
            }
        },
        userAnswer: function(event, correct) {
            if (correct == true) {
                if (this.confirm == 1) {
                    this.nextQuestion();
                    this.confirm = 0;
                } else if (this.confirm == 0) {
                    this.confirm = 1;
                }
                event.target.classList.remove("blue");
                event.target.classList.add("green");
            } else {
                event.target.classList.remove("blue");
                event.target.classList.add("red");
            }
        },
        shuffle: function(array) {
            var currentIndex = array.length,
                temporaryValue,
                randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    },
    computed: {}
};
</script>

<style scoped>
.question {
    max-width: 600px;
}
.question .btn {
    margin-top: 20px;
}
</style>