<template>
    <div>
        <div id="login" class="container">
            <div class="section row">
                <h4 class="center">Login</h4>
                <form class="col s12">
                    <div class="row">
                        <div class="input-field">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="email" v-model="email" type="email" class="validate" />
                            <label for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix">security</i>
                            <input
                                id="password"
                                v-model="password"
                                type="password"
                                class="validate"
                            />
                            <label for="password">Password</label>
                        </div>
                        <div class="container center-align">
                            <div class="col s12">
                                <a
                                    class="waves-effect blue lighten-2 btn btn-medium"
                                    @click="login"
                                >
                                    <i class="material-icons right">launch</i>Log in
                                </a>
                            </div>
                            <div class="col s12">
                                <p>
                                    <router-link
                                        class="grey-text text-darken-1"
                                        to="/signup"
                                    >Don't have an account? Go sign up</router-link>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    name: "Login",
    data: function() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login: function() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(
                    user => {
                        M.toast({ html: "You're now logged in!" });
                        this.$store.commit('set', firebase.auth().currentUser.providerData[0])
                        this.$router.replace("quiz");
                    },
                    function(err) {
                        M.toast({ html: "Oops, " + err.message });
                    }
                );
        }
    }
};
</script>

<style scoped>
#login.container {
    max-width: 500px;
}
</style>