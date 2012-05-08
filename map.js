var mmsp83 = new LCC({
semi_major: 6378137,
inverse_flattening: 298.257222101,
standard_parallel_1: 41 + (43/60),
standard_parallel_2: 42 + (41/60),
central_meridian: -71.5,
latitude_of_origin: 41,
false_easting: 656166.6666666665,
false_northing: 2460625,
unit: 0.3048006096012192
});
var noTake;
var notakeUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fhubmaps.cityofboston.gov%2Fopen_gov%2FXML%2Ffs_EatingDrinking.xml'&format=json";
var takeUrl ="http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fhubmaps.cityofboston.gov%2Fopen_gov%2FXML%2Fft_EatingDrinkingTakeOut.xml'&format=json";

$(function() {
    getData(notakeUrl);
}
);
function getData(url){
       m = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: zoom,
      mapTypeId: 'roadmap'
    });
    $.get(url,
    function(data)
            {
                noTake = data.query.results.BUSINESSES.BUSINESS;
                 $.each(noTake,
                function(i,biz)
                        {
                            var content;
                            var dub =[biz.GPSX,biz.GPSY];
                            var latlng = mmsp83.inverse(dub);
                            var  marker = new google.maps.Marker({
                     position:  new google.maps.LatLng(latlng[1],latlng[0]),
                     map: m,
                     title: biz.BUSINESSNAME
        		
                 
                          //  shape
                    });
                    content = "name: " + biz.BUSINESSNAME + "<br  />City: " + biz.CITY + "<br  />Description: " + biz.DESCRIPT
                    google.maps.event.addListener(marker, 'click',
            				function()
							{
                                infowindow.setContent(content);
                              infowindow.open(m,marker);
							})
                        }
                        );
            },"jsonp"
    );
    
}

var m;
var zoom = 12;
var center = new google.maps.LatLng(42.33,-71.067467);
var infowindow = new google.maps.InfoWindow();