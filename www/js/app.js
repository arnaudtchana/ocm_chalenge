// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ApiUrl = 'http://MobileMoneyServer-env.n2yc63jtp6.us-west-2.elasticbeanstalk.com/api';
//var ApiUrl = 'http://mobile_money_admin.local/api';
 var app=angular.module('starter', ['ionic','ngCordova','restangular','ionic-toast','pascalprecht.translate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

  .config(function ($stateProvider, $urlRouterProvider,$httpProvider) {

    $urlRouterProvider.otherwise('/accueil');

    //$urlRouterProvider.otherwise('/prix');
    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html

      .state('accueil',{
        url: '/accueil',
        templateUrl:'templates/accueil.html',
        controller: 'AccueilCtrl'
      })
      .state('localisation',{
        url: '/localisation',
        templateUrl:'templates/localisation.html',
        controller: 'LocalisationCtrl',
        params: {
          depot:'',
            retrait:''
        }
      })

  })
.config(function(RestangularProvider) {
  //set the base url for api calls on our RESTful services
  var newBaseUrl = ApiUrl;

  RestangularProvider.setBaseUrl(newBaseUrl);
})
/*ici le code relatif a l'internationalisation*/
     .config(function($stateProvider, $urlRouterProvider, $translateProvider) {
         $translateProvider.translations('fr', {
             service_rechercher:"Choisir le(s) service(s) recherché(s)",
             creer_compte: "Créer un compte",
             connexion: "Connexion",
             nom_utilisateur: "Nom d'utilisateur",
             mot_passe:"Mot de passe",
             nom:"Nom",
             prenom:"Prénom",
             tel:"Téléphone",
             confirm_mot_passe:"Confirmation du mot de passe",
             enregistrer:"Enregistrer",
             creation_compte:"Création de compte",
             nom_requis:"Le nom est requis",
             prenom_requis:'Le prénom est requis',
             tel_requis:'Le numéro de téléphone est requis',
             username_requis:'Le nom d\'utilisateur est requis',
             password_requis:'Le mot de passe est requis',
             password_min_length:'Le mot de passe doit avoir au moins 6 caractères',
             accueil:"Accueil",
             text_accueil:"Bienvenue dans l'application OM Locate qui vous permet en tant que gérant de kiosque, d'ajouter et de superviser vos\n" +
             "kiosques oranges money; cette application vous permet notamment d'ajouter des kiosques, de renseigner le statut d'un\n" +
             "kiosque à un moment donné afin de savoir s'il est fermé ou ouvert; l'application permet également de dire si un kiosque peut disposer d'une opération\n" +
             "de dépôt ou de retrait à un moment donné.",
             statut_kiosque:'Statut du kiosque',
             ajouter_kiosque:'Ajouter un kiosque',
             liste_kiosque:'Liste des kiosques',
             update_compte:'Mise à jour du compte',
             logout:'Déconnexion',
             titre_statut_kiosque:"Statut et disponibilité",
             texte_statut_kiosque:"Vous pouvez changer le statut d'une boutique pour dire si elle est fermée ou pas",
             pas_de_kiosque:"Pas de kiosque enregistré",
             depot:'Dépôt',
             retrait:'Retrait',
             valider:"Valider",
             disponibilite: "Disponibilité",
             nom_kiosque:"Nom du kiosque",
             ville:"Ville",
             quartier:"Quartier",
             description:"Description",
             changer_position:"Changer de position",
             nom_kiosque_requis:"Le nom du kiosque est obligatoire",
             ville_requis:"La ville est obligatoire",
             quartier_requis:"Le quartier est obligatoire",
             latitude_requis:"La latitude est obligatoire",
             longitude_requis:"La longitude est obligatoire",
             nom_kiosque_utiliser:"Le nom du kiosque est déjà utilisé",
             aucun_kiosque:"Aucun kiosque enregistré",
             confirm_delete_kiosque:"Voulez-vous vraiment supprimer le kiosque ?",
             supprimer:"Supprimer",
             mise_a_jour_kiosque:"Mise à jour du kiosque",
             nouveau_password:"Nouveau mot de passe",
             tel_deja_utiliser:"Ce numéro de téléphone est déjà utilisé",
             username_utiliser:"Le nom d'utilisateur est déjà utilisé",
             password_different_confirmation:"le mot de passe et la confirmation ne sont pas identiques",
             changer_password:"Changer votre mot de passe",
             tel_invalide:"Numero de téléphone invalide",
             parametre_invalide:"Paramètres de connexion invalides"
         });
         $translateProvider.translations('en', {
             service_rechercher:"Choose the service to search",
             creer_compte: "Create an account",
             connexion: "Log in",
             nom_utilisateur: "Username",
             mot_passe:"Password",
             nom:"Name",
             prenom:"First name",
             tel:"Phone",
             confirm_mot_passe:"Confirm password",
             enregistrer:"Save",
             creation_compte:"Account creation",
             nom_requis:"Name is required",
             prenom_requis:'First name is required',
             tel_requis:'Phone is required',
             username_requis:'Username is required',
             password_requis:'Password is required',
             password_min_length:'Password must be at least 6 characters',
             accueil:"Home",
             text_accueil:"Welcome to the OM Locate application that allows you as a kiosk manager to add and supervise your\n" +
             "orange kiosks money; this application allows you to add kiosks, to inform the status of a\n" +
             "kiosk at one point to find out if it is closed or open; the application also allows to tell if a kiosk can have an operation\n" +
             "deposit or withdrawal at any given time.",
             statut_kiosque:'kiosk status',
             ajouter_kiosque:'Add kiosk',
             liste_kiosque:'kiosks list',
             update_compte:'Account update',
             logout:'Log out',
             titre_statut_kiosque:"Status and availability",
             texte_statut_kiosque:"You can change the status of a kiosk to tell if it's closed or not",
             pas_de_kiosque:"No kiosks registered",
             depot:'Deposit',
             retrait:'Withdrawal',
             valider:"Validate",
             disponibilite: "Availability",
             nom_kiosque:"Kiosk's name",
             ville:"City",
             quartier:"District",
             description:"Description",
             changer_position:"Change position",
             nom_kiosque_requis:"Kiosk's name is required",
             ville_requis:"City is required",
             quartier_requis:"District is required",
             latitude_requis:"latitude is required",
             longitude_requis:"Longitude is required",
             nom_kiosque_utiliser:"kiosk's name already used",
             aucun_kiosque:"No kiosks registered",
             confirm_delete_kiosque:"Do you really want to remove the kiosk ?",
             supprimer:"Delete",
             mise_a_jour_kiosque:"Kiosk update",
             nouveau_password:"New password",
             tel_deja_utiliser:"This phone number is already use",
             username_utiliser:"Username already used",
             password_different_confirmation:"The password and the confirmation are not identical",
             changer_password:"Change your password",
             tel_invalide:"Invalid phone number",
             parametre_invalide:"Invalid credentials"
         });
         $translateProvider.preferredLanguage("en");
         $translateProvider.fallbackLanguage("en");
     });
