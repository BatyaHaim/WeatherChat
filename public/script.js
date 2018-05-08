var array = [];

var fetch = function (city) {
    $.get({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=d703871f861842b79c60988ccf3b17ec",
        success: function (data) {
            var celTemp = data.main.temp; // Degrees Celsius
            var ferTemp = celTemp * 1.8 + 32; // Degrees Fahrenheit

            var name = city;

            console.log(name)
            console.log(city)

            var cityPost = {
                temp: {
                    c: celTemp,
                    f: ferTemp
                },
                name: name,
                comment: []

            }
            array.push(cityPost);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}


var upDate = function () {
    $('.city-list').empty();

    for (var i = 0; i < array.length; i++) {
        var weather =
            `<div class = city-weather>
    <h3>${array[i].name}</h3>
    <p>${array[i].temp.c + " C |"} ${array[i].temp.f + " F "} </p>
    </div>`;

        $('.city-list').append(weather);
    }
}

$('#tempBtn').on('click', function () {

    var city = $('#inpCity').val();
    console.log(city)

    fetch(city);
    upDate();
})

// $('#comBtn').on('click', function () {
//     var comment = $('inpCom').val();
//     fetch(comment);
//     upDate();
// })