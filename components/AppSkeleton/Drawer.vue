<template>
    <!--
    Sidomenyn som används i mobilt läge.
    -->
    <ul class="sidenav" id="sidenav-1">
        <li>
            <div class="user-view">
                <div class="background blue lighten-2"></div>
                <a href="#user">
                    <img class="circle" src="images/yuna.jpg" />
                </a>
                <a href="#name">
                    <span class="white-text name">{{this.$store.state.user.email.substring(0, this.$store.state.user.email.indexOf("@"))}}</span>
                </a>
                <a href="#email">
                    <span class="white-text email">{{this.$store.state.user.email}}</span>
                </a>
            </div>
        </li>
        <h5>Quizy</h5>
        <div class="divider"></div>
        <li>
            <router-link class="waves-effect" to="/" v-on:click.native="closeDrawer">
                <i class="small material-icons">launch</i>Quizy
            </router-link>
            <router-link class="waves-effect" to="/about" v-on:click.native="closeDrawer">
                <i class="small material-icons">info</i>Om Oss
            </router-link>
            <a class="waves-effect" v-on:click="logout">
                <i class="small material-icons">logout</i>Log out
            </a>
        </li>
    </ul>
</template>

<script>
module.exports = {
    methods: {
        closeDrawer: function() {
            $(".sidenav").sidenav("close");
        },
        logout: function() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.closeDrawer()
                    this.$router.replace('login')
                })
                .catch(function(error) {
                    // An error happened.
                });
        }
    },
    computed: {
    }
};
</script>

<style>
h5 {
    margin-left: 30px;
}
</style>