$(function(){
    $('#google').on('click', function() {
        console.log("clicking");

        r = gtag('event', 'game_launched', {
            game_name: "TEST",
        });

        console.log(r);
    });
});


