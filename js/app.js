$(document).ready(function(){

    $('#search_trains').click(function (){
        let boarding_station = $('#boarding_station').val();
        let destination_station = $('#destination_station').val();

        $.ajax({
            url:"https://indianrailapi.com/api/v2/TrainBetweenStation/apikey/30c382602bfa67c8a7c580e6cfe2becb/From/" + boarding_station + "/To/" + destination_station,
            success:function (data) {
                //console.log(data);
                console.log(data.Trains);

                let blob;
                for(let i=0; i<data.Trains.length;i++){
                    blob= blob + `<tr><td>${data.Trains[i].TrainNo}</td><td>${data.Trains[i].TrainName}</td><td>${data.Trains[i].TravelTime}</td><td>${data.Trains[i].TrainType}</td></tr>`;
                }

                $('#display_trains').html(`
                <table class="table">
                    <tr>
                        <th>Train Number</th>
                        <th>Train Name</th>
                        <th>Duration</th>
                        <th>Train Type</th>
                    </tr>
                    ${blob}
                </table>
                `);
            },
            error:function (error) {
                alert("Some error");
                console.log(error);

            }
        })
    });

    $('#fetch_stations').click(function () {
        let trainNo=$('#train_no').val();

        $.ajax({
            url:"https://indianrailapi.com/api/v2/TrainSchedule/apikey/30c382602bfa67c8a7c580e6cfe2becb/TrainNumber/" + trainNo,
            success:function (data) {
                console.log(data);

                let textBlob;
                for(let i=0; i<data.Route.length;i++){
                    textBlob= textBlob + `<tr><td>${data.Route[i].StationName}</td><td>${data.Route[i].ArrivalTime}</td><td>${data.Route[i].DepartureTime}</td><td>${data.Route[i].Distance} kms</td></tr>`;
                }

                $('#display_stations').html(`
                <table class="table">
                    <tr>
                        <th>Station Name</th>
                        <th>Arrival Time</th>
                        <th>Departure Time</th>
                        <th>Distance Travelled</th>
                    </tr>
                    ${textBlob}
                </table>
                `);
            },
            error:function (error) {
                console.log(error);
                alert("Error occured");
            }
        })
    })

});