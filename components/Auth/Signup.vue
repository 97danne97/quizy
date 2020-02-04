<template>
    <div>
        <div id="signup" class="container">
            <div class="section row">
                <h4 class="center">Signup</h4>
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
                                <a class="waves-effect blue lighten-2 btn btn-medium" @click="signUp">
                                    <i class="material-icons right">create</i>Create account
                                </a>
                            </div>
                            <div class="col s12">
                                <p>
                                    <router-link
                                        class="grey-text text-darken-1"
                                        to="/login"
                                    >Already registered? Go to login</router-link>
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
    name: "Signup",
    data: function() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        signUp: function(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
                    M.toast({html: 'Your account has been created!'})
                    this.$router.replace('quiz')
                },
                function(err){
                    M.toast({html: 'Oops, ' + err.message})
                }
            )
        }
    }
};
</script>

<style scoped>
#signup.container {
    max-width: 500px;
}
</style>