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
            upDate();
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

        var commentsContainer =
            '<div id="divComment">' +
            '<input type="text" id="inpCom" placeholder="Your Comment">' +
            '<button type="button" class="btn btn-primary" id="comBtn">Comment</button>' +
            '<ul class="comment-list"></ul>' +
            '</div>';
            $('.city-weather').append(commentsContainer);
    }
}

$('#tempBtn').on('click', function () {

    var city = $('#inpCity').val();
    console.log(city)

    fetch(city);

})

var upDateComment = function(textComment, $commentList, indexCityPost){

    
    array[indexCityPost].comment.push(textComment);
    $commentList.append('<input type="button" class="removeCom">Remove</input>' + textComment);

$('.city-weather').append($commentList);

}

$('.city-list').on('click', '#comBtn',function(){

    var textComment = $('#inpCom').val();  
    var $commentList= $(this).next();  
    var indexCityPost= $(this).closest('.city-weather').index();
    
    upDateComment(textComment, $commentList, indexCityPost);
})



$('.removeCom').on('click', function(){
    textComment.remove();
})




