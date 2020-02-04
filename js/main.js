// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUb9w-Mf62Y8ztp_nz24eZtswc2V2sWEo",
    authDomain: "vuetest-1ae8c.firebaseapp.com",
    databaseURL: "https://vuetest-1ae8c.firebaseio.com",
    projectId: "vuetest-1ae8c",
    storageBucket: "vuetest-1ae8c.appspot.com",
    messagingSenderId: "942291986372",
    appId: "1:942291986372:web:ada927d38ac86dc573e691"
};
// Initierar en firebase-instans
firebase.initializeApp(firebaseConfig);

let app = ''
let user = ''

/*
Registrerar alla komponenter. Här används ett plugin, HTTPVueLoader,
för användning Vue:s single file komponenter utan
webpack och node.
*/

// Komponenter för Quiz-spelet
const Main = window.httpVueLoader('components/Main.vue')
const Quiz = window.httpVueLoader('components/Quiz.vue')
const Categories = window.httpVueLoader('components/Quiz/Categories.vue')
const Difficulty = window.httpVueLoader('components/Quiz/Difficulty.vue')
const Play = window.httpVueLoader('components/Quiz/Play.vue')

// Komponenter för besökare
const About = window.httpVueLoader('components/About.vue')
const Login = window.httpVueLoader('components/Auth/Login.vue')
const Signup = window.httpVueLoader('components/Auth/Signup.vue')

// Appens skelettkomponenter
const Navbar = window.httpVueLoader('components/AppSkeleton/Navbar.vue')
const Drawer = window.httpVueLoader('components/AppSkeleton/Drawer.vue')
const Footer1 = window.httpVueLoader('components/AppSkeleton/Footer1.vue')

// Vue plugins
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vue2Filters) // importerar Vue2Filters-biblioteket för effektiv filtrering av json

// Router
const router = new VueRouter({
    mode: 'hash', // historik-metod för routes. hash används för att snabbare utveckling och undvika extra konfigurering av webbserver.
    base: '/',
    routes: [ //definierar routes och vilken komponent som hör till.
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/quiz',
            name: 'Quiz',
            component: Quiz,
            children: [
                {
                    path: 'categories',
                    alias: '',
                    components: {
                        quiz_view: Categories
                    }
                },
                {
                    path: 'difficulty',
                    components: {
                        quiz_view: Difficulty
                    },
                },
                {
                    path: 'play',
                    components: {
                        quiz_view: Play
                    },
                }
            ],
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/signup',
            component: Signup
        },
        {
            path: '/about',
            component: About
        }
    ]
});
const store = new Vuex.Store({
    state: {
        user: undefined
    },
    mutations: {
        set(state, user) {
            // mutate state
            state.user = user
        }
    }
});
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next('/login');
    else if (!requiresAuth && currentUser) next('/quiz')
    else next()
});

firebase.auth().onAuthStateChanged(() => {
    if (!app) {



        app = new Vue({ //Skapar Vue-instansen.
            router,
            el: '#app',
            store,
            components: {
                Main
            },
            template: '<Main></Main>',
        })
        store.commit('set', firebase.auth().currentUser.providerData[0])
    }
})
