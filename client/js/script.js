const baseURL = 'http://localhost:3000'
$("document").ready(function () {
    checkLocalStorage()

    $("#btn-login").on("click", (e) => {
        e.preventDefault();
        login();
    })

    $("#btn-logout").on("click", () => {
        logout();
    })

    $("#btn-register").on("click", (e) => {
        e.preventDefault();
        register();
    })

    $("#link-register").on("click", (e) => {
        e.preventDefault();
        $("#page-login").hide();
        $("#homePage").hide();
        $("#page-register").show();
    })

})

function onSignIn(googleUser) {
    $.ajax({
        method: "POST",
        url: baseURL + '/loginGoogle',
        data: {
            token: googleUser.getAuthResponse().id_token
        }
    })
        .done((response) => {
            localStorage.setItem("access_token", response.access_token)
            checkLocalStorage();
        })
        .fail((err) => {
            console.log(err);
        })
        .always(() => {
            $("#email").val("")
            $("#password").val("")
        })
}

function login() {
    const email = $("#email").val();
    const password = $("#password").val();

    $.ajax({
        url: baseURL + "/login",
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            localStorage.setItem("access_token", response.access_token)
            checkLocalStorage();
        })
        .fail((err) => {
            console.log(err);
        })
        .always(() => {
            $("#email").val("")
            $("#password").val("")
        })
}

function register() {
    const email = $("#email-regis").val();
    const password = $("#password-regis").val();

    $.ajax({
        url: baseURL + "/register",
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            console.log(response);
            checkLocalStorage();
        })
        .fail((err) => {
            console.log(err);
        })
}

function checkLocalStorage() {
    if (localStorage.access_token) {
        $("#page-login").hide();
        $("#page-register").hide();
        $("#homePage").show();
    } else {
        $("#page-login").show();
        $("#page-register").hide();
        $("#homePage").hide();
    }
}

function logout() {
    localStorage.removeItem("access_token");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log("User signed out.");
    })
    checkLocalStorage();
}
