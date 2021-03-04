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
        $("#page-add-todo").hide();
        $("#page-todos").hide();
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
        home()
    } else {
        $("#page-login").show();
        $("#page-register").hide();
        $("#homePage").hide();
    }
}

function logout() {

    localStorage.removeItem('access_token')
    checkLocalStorage()
}

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 533) {
        $('nav').css('background-color','#291E47')
    }else{
        $('nav').css('background-color','transparent')
    }
});

function home() {
    $.ajax({
        url: baseURL + "/apod",
        method: "GET",
        headers: {
            access_token : localStorage.access_token
        },
        success: function (res) {

            for (let i = 0; i < res.length; i++) {

                $("#apod").append(
                    `
                    <div class="carousel-item">
                        <div class="d-block w-100 img-crop" style="background-image: url('${res[i].url}')"></div>
                        <div class="carousel-caption d-none d-md-block">
                            <h1 class="font">${res[i].title}</h1>
                            <p>${res[i].explanation.substring(0,100)}</p>
                            <a class="btn btn-outline-primary btn-science" href="${res[i].hdurl}" target="_blank">View Image</a>
                        </div>
                    </div>
                    `
                )
            }
        },
        error: function (err){
            console.log(err);
        }
    })

    $.ajax({
        url: baseURL + "/weather",
        method: "GET",
        headers: {
            access_token : localStorage.access_token
        },
        success: function (data){
            $("#humidity").text(data.main.humidity+"%")
            $("#wind").text(Number(data.wind.speed).toFixed(0)+" km/h")
            $("#temp").text(Number(data.main.temp).toFixed(0)+" °")
            $("#weather").text(data.weather[0].main)

            if (data.weather[0].id > 800) {
                $("#logocuaca").append(`<i class="fa fa-cloud mb-5" style="font-size: 92px"></i>`)
            }else if(data.weather[0].id === 800){
                $("#logocuaca").append(`<i class="fa fa-sun  mb-5" style="font-size: 92px"></i>`)
            }else if(data.weather[0].id > 700){
                $("#logocuaca").append(`<i class="fa fa-smog  mb-5" style="font-size: 92px"></i>`)
            }else if(data.weather[0].id > 600){
                $("#logocuaca").append(`<i class="fa fa-snowflake  mb-5" style="font-size: 92px"></i>`)
            }else if(data.weather[0].id > 500){
                $("#logocuaca").append(`<i class="fa fa-cloud-showers-heavy  mb-5" style="font-size: 92px"></i>`)
            }else if(data.weather[0].id > 300){
                $("#logocuaca").append(`<i class="fa fa-cloud-rain  mb-5" style="font-size: 92px"></i>`)
            }else if(data.weather[0].id > 200){
                $("#logocuaca").append(`<i class="fa fa-bolt  mb-5" style="font-size: 92px"></i>`)
            }

            
        },
        error: function (err){
            console.log(err);
        }
    })

    $.ajax({
        url: baseURL + "/berita",
        method: "GET",
        headers: {
            access_token : localStorage.access_token
        },
        success: function (res) {
            for (let i = 0; i < 10; i++) {

                $("#berita").append(
                    `
                    <div class="card card-science mb-4">
                        <div class="row">
                            <div class="col-3 pr-0">
                                <img class="news-image" src="${res.articles[i].urlToImage}" alt="">
                            </div>
                            <div class="col-9">
                                <div class="card-body">
                                    <h5 class="font">${res.articles[i].title}</h5>
                                    <p class="card-text" style="max-height:75px">${res.articles[i].description.substring(0,100)} ...</p>
                                    <a target="_blank" href="${res.articles[i].url}" class="btn btn-science-invert col-6">News Article</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
            }
        },
        error: function (err){

        }
    })
    
}
