$(document).ready(function() {
    // Your jQuery AJAX call here
    $.ajax({
        url: 'http://api.aviationstack.com/v1/flights',
        data: {
            access_key: 'aaad7bdf9c8a9971e995c98013513d0f'
        },
        dataType: 'json',
        success: function(apiResponse) {
            if (Array.isArray(apiResponse['results'])) {
                apiResponse['results'].forEach(flight => {
                    if (!flight['live']['is_ground']) {
                        console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
                            `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
                            `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
                    }
                });
            }
        }
    });
});
    