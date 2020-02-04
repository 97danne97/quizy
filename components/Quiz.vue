<template>
    <div class="section container">
        <transition :name="transitionName">
            <keep-alive exclude="Play">
                <router-view
                    tag="div"
                    name="quiz_view"
                    :difficulty.sync="difficulty"
                    :category.sync="category"
                />
            </keep-alive>
        </transition>
    </div>
</template>

<script>
module.exports = {
    name: "Quiz",
    mixins: [Vue2Filters.mixin],
    props: ["data", "response"],
    data: function() {
        return {
            difficulty: undefined,
            category: undefined,
            UserStats: {
                gamesPlayed: 0,
                wins: 0,
                losses: 0
            }
        };
    },
    computed: {
        filterItems: function() {
            var vm = this;
            var category = vm.selected_categories;

            if (category.length < 1) {
                return vm.data;
            } else {
                return vm.data.filter(person => {
                    var matchFilter = false;
                    category.forEach(entry => {
                        if (category.includes(person.parti)) {
                            matchFilter = true;
                        }
                    });
                    return matchFilter;
                });
            }
        }
    },
    watch: {
        $route(to, from) {
            const toDepth = to.path.split("/").length;
            const fromDepth = from.path.split("/").length;
            this.transitionName = toDepth < fromDepth ? "fade2" : "fade";
        }
    }
};
</script>

<style scoped>
.category {
    padding-top: 10px;
    padding-bottom: 10px;
}
.list-item > .card {
    border-radius: 5px;
    overflow: hidden;
}
.list-item {
    /* övergång med anpassad hastighetsfördelning (cubic-bezier) */
    transition: all .3s cubic-bezier(0.865, 0.84, 0.24, 1);
}
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.list-leave-active {
    position: absolute;
}
</style>