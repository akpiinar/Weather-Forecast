$(document).ready(function () {

    let cities = document.getElementById("cities");
    let newCity;
    let i = 0; //button id sine aktarılacak her botunun id sinin farklı olmasını sağlayacak değer.
      
    $('#addBtn').click(function (e) {
        i++; 
        newCity = cities.value.trim();

        $.ajax({
            url: 'http://api.weatherstack.com/current',
            data: {
                access_key: '885c6c35d49e96bcdc2a7177dd39fac7',
                query: newCity
            },

            dataType: 'json',
            success: function (apiResponse) {
                console.log(apiResponse);
                card = $("<div id='card" + i + "' class='card col-lg-2 my-2 mx-2 border border-info rounded'>"+
                "<div class='float-right'><button type='button' class='close' data-dismis='modal' aria-label_'close' data-id=" + i + " id='btnRemove" + i + "'>x</button></div>"+
                "<img class='card-img-top' src=" + `${apiResponse.current.weather_icons[0]}` + ">"+
                "<h5 class='card-title text-center'>" +`${apiResponse.current.weather_descriptions}`+ "</h5>"+
                "<p class='card-text text-center'>" +`${apiResponse.location.name}`+ ` ${apiResponse.current.temperature}` +"°C" + "</p>" +
                "</div>");
                card.appendTo('.cities');
            }
            

        });

    });

    //    $('[id^=btnRemove').click(function(e){ id si btnremove ile başlayan button click olduğunda 

    //Seçili cardı silme

    $('body').on("click", "[id^=btnRemove]", function (e) {

        let i = $(this).data("id");
        $('#card' + i).remove();

    });

    // Tüm cardları temizleme

    $(document).ready(function (e) {

        $('#removeForm').click(function (e) {

            document.getElementById('cities').value = '';

            $(".card").remove();
        });

    });

});

