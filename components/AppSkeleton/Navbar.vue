<template>
    <!-- 
        Navigation längst uppe på sidan.
        Länkarna försvinner i mobilt läge för användning av sidomeny.
    -->
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper blue lighten-2">
                <a href="#" data-target="sidenav-1" class="sidenav-trigger">
                    <i class="material-icons">menu</i>
                </a>
                <router-link tag="a" class="brand-logo" to="/">Quizy</router-link>
                <ul class="right hide-on-med-and-down">
                    <ul id="nav-mobile" class="right hide-on-small-and-down">
                        <li class="waves-effect">
                            <router-link
                                data-position="bottom"
                                tag="a" to="/about">About
                            <i class="medium material-icons right">info</i></router-link>
                        </li>
                        <li class="waves-effect">
                            <router-link
                                tag="a" to="/">Quiz
                            <i class="medium material-icons right">launch</i></router-link>
                        </li>
                    </ul>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
module.exports = {
    mounted() {
        //jQuery som skapar sidenav- och tooltip-instanser.
        $(document).ready(function() {
            $(".sidenav").sidenav();
        },
          $(document).ready(function(){
            $('.tooltipped').tooltip();
        }));
    }
};
</script>

<style scoped>
.brand-logo { /* För att loggan inte ska placeras längst ut i vänsterkanten */
    margin-left: 10px;
}
</style>