/**
 * Created by user on 16/02/2018.
 ici le fichier permettant de gerer la localisation des points disponibles pour un service donne*/
app
  .controller('LocalisationCtrl', function($scope,$state,Restangular,$cordovaGeolocation,$stateParams,$ionicLoading,ionicToast) {

    /*on fait la requete restangular qui permet de recurer la liste des services en base de donnees
     * pour que lutilisateur choisisse le service qui l'interesse*/
    $scope.coords = {};
    var options = {timeout: 10000, enableHighAccuracy: true};
    /*$cordovaGeolocation.getCurrentPosition(options).then(function(position){
      $scope.coords.latitude = position.coords.latitude;
      $scope.coords.longitude = position.coords.longitude;
      console.log($scope.coords);
      /!*on fait une requete backend pour envoyer les coordonnees du client*!/
      var location = {
        latitude: $scope.coords.latitude,
        longitude: $scope.coords.longitude,
        service_id: $stateParams.service_id
      }
      var Services = Restangular.all('retourne_service');
      Services.post(location).then(function (data) {
        //console.log(data);
        $scope.services = data.donne;
        console.log($scope.services);
      },function (error) {
        alert('une erreur')
      })
    },function (error) {
      alert('impossible de recuperer la position actuelle');
    })*/

    $scope.accueil = function () {
      $state.go('accueil');
    }

    $scope.$on('$ionicView.enter', function () {
      /*on lance le loading a ce niveau en attendant de rechercher tous les points*/
        $ionicLoading.show({
            template: 'Loading...',
        })
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        console.log(position);
        $scope.coords.latitude = position.coords.latitude;
        $scope.coords.longitude = position.coords.longitude;
        console.log($scope.coords);
        /*on fait une requete backend pour envoyer les coordonnees du client*/
        var location = {
          latitude: $scope.coords.latitude,
          longitude: $scope.coords.longitude,
          depot: $stateParams.depot,
          retrait: $stateParams.retrait
        }
        console.log(location)
        var Services = Restangular.all('retourne_service');
        Services.post(location).then(function (data) {
          //console.log(data);
          $scope.services = data.donne;

          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          //var latLng = new google.maps.LatLng(3.86, 11.5);
          var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
          //Wait until the map is loaded
          google.maps.event.addListenerOnce($scope.map, 'idle', function(){

            /*ici on affiche les differents marqueurs de la page en question*/
            /*on fait une boucle ici pour afficher tous les marqueurs*/
            console.log('jarrive aussi ici')
            console.log('nombre de resultat',$scope.services.length);
            angular.forEach($scope.services,function (value,key) {
              /*ici chaque marqueur va venir avec son image correspondante*/
              console.log(data.icone)
              var markerPos = new google.maps.LatLng(value.latitude, value.longitude);
              var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: markerPos,
                /*icon: {
                  url:data.icone
                 /!* size: {
                    width: 50,
                    height: 50
                  }*!/
                }*/
              });
              var infoWindowContent = "<h4>" + value.description +","+value.quartier+ "</h4>";

              $scope.addInfoWindow(marker, infoWindowContent, value);
            })
              $ionicLoading.hide();
            /*on affiche un toast ici pour indiquer le nombre de resultats trouver*/
              if($scope.services.length > 1){
                  ionicToast.show($scope.services.length+' résultats trouvés', 'middle', false, 2000);
              }else{
                  ionicToast.show($scope.services.length+' résultat trouvé', 'middle', false, 2000);
              }

            /*var marker = new google.maps.Marker({
             map: $scope.map,
             animation: google.maps.Animation.DROP,
             position: latLng
             });*/

          });


        },function (error) {
          $ionicLoading.hide();
          alert('une erreur')
        })

        $scope.addInfoWindow = function(marker, message, value) {

          var infoWindow = new google.maps.InfoWindow({
            content: message
          });

          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
          });

        }

      }, function (error) {

        /*var alertPopup = $ionicPopup.alert({
         title: 'Alert',
         templateUrl: 'templates/alert_localisation.html'
         });*/
        $ionicLoading.hide();
        alert('Activer votre Gps')
        console.log("Could not get location");
      });
    });
  });
