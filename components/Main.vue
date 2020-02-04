<template>
    <div id="main">
        <Navbar></Navbar>
        <Drawer></Drawer>
        <transition :name="transitionName">
            <!-- keep-alive cachar routes tillstånd även om användaren byter till andra routes.
            Just nu endast riksdagen pga att filtren ska sparas för användarens upplevelse-->
            <!-- data och response skickas med till routes -->
            <router-view tag="div" id="main-content" :data="data" :response="response" />
        </transition>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            data: "",
            response: false,
            transitionName: "fade"
        };
    },
    components: {
        Navbar,
        Drawer
    },
    watch: {
        $route(to, from) {
            const toDepth = to.path.split("/").length;
            const fromDepth = from.path.split("/").length;
            this.transitionName = toDepth < fromDepth ? "fade2" : "fade";
        }
    },
    methods: {
        onResponse: function(res) {
            this.data = res.data.trivia_categories; //begränsa antalet ledamöter
            this.response = true;
        }
    }
};
</script>

<style scoped>
#main {
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100vh; /*För att sidan inte ska hoppa vid övergångar*/
}

/* fade-övergång för routade element i <transition>-taggar (router-views) */
.slide-right-enter-active,
.slide-right-leave-active {
    transition: .3s cubic-bezier(0.175, 0.885, 0.12, 1);
}

.slide-right-enter-active {
    transition-delay: 0.3s;
    height: 0;
}

.slide-right-enter {
    opacity: 0;
    transform: translateX(-300px);
}
.slide-right-leave-active {
    transform: translateX(300px);
    opacity: 0;
    height: 0;
}

/* fade-animation för element i <transition>-taggar (router-views) */
.slide-left-enter-active,
.slide-left-leave-active {
    transition: .3s cubic-bezier(0.175, 0.885, 0.12, 1);
}

.slide-left-enter-active {
    transition-delay: .3s;
    height: 0;
}

.slide-left-enter {
    opacity: 0;
    transform: translateX(300px);
}
.slide-left-leave-active {
    opacity: 0;
    transform: translateX(-300px);
    height: 0;
}

/* fade-animation för element i <transition>-taggar (router-views) */
.fade-enter-active,
.fade-leave-active {
    transition: .2s cubic-bezier(0.19, 1, 0.62, 1);
}

.fade-enter-active {
    transition-delay: .2s;
    height: 0;
}

.fade-enter {
    opacity: 0;
    transform: scale(1.05);
}
.fade-leave-active {
    opacity: 0;
    transform: scale(0.95);
    height: 0;
}

/* fade-animation för element i <transition>-taggar (router-views) */
.fade2-enter-active,
.fade2-leave-active {
    transition: .2s cubic-bezier(0.19, 1, 0.62, 1);
}

.fade2-enter-active {
    transition-delay: .2s;
    height: 0;
}

.fade2-enter {
    opacity: 0;
    transform: scale(0.95);
}
.fade2-leave-active {
    opacity: 0;
    transform: scale(1.05);
    height: 0;
}
</style>