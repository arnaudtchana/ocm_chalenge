/**
 * Created by user on 15/02/2018.
 */
app
.controller('AccueilCtrl', function($scope,$state,Restangular,$translate,$rootScope) {

  /*on fait la requete restangular qui permet de recurer la liste des services en base de donnees
  * pour que lutilisateur choisisse le service qui l'interesse*/
    $scope.flag = "fr";
    $scope.langue = "Français";
    $scope.$on('$ionicView.enter', function () {
  $scope.services = {};
  $scope.kiosque = {
      'depot':false,
      'retrait':false
  }
  $scope.change_depot = function () {
      console.log($scope.kiosque);
  }
  $scope.change_retrait = function () {
      console.log($scope.kiosque);
  }
 /*var Services = Restangular.all('service');
 //var Services = Restangular.all('service_logo');

  Services.getList().then(function (data) {
    $scope.services = data;
    console.log($scope.services);
  })*/

  $scope.rechercher = function () {
    //alert(index)
    /*ici on fait la requete pour recuperer la liste des kioques les plus proches offrant le service en question(depot ou retrait)*/
    $state.go('localisation',{depot:$scope.kiosque.depot,retrait:$scope.kiosque.retrait});

  }


    });
    $scope.update_langue = function (langue) {
        /*on recupere la langue*/
        //alert(langue);
        if (langue == "Anglais") {
            $translate.use("fr");
            $scope.flag = "fr";
            $scope.langue = "Français";
        } else {
            $translate.use("en");
            $scope.flag = "gb";
            $scope.langue = "Anglais";
        }
        $rootScope.lang = $translate.use();
        $state.go($state.current, {}, {reload: true});
        /*permet de recharger la page courrante pour update la langue*/
    }
  });
