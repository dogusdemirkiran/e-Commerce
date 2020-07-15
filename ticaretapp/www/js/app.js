// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('logintab', {
      url: '/logintab',
      abstract: true,
      templateUrl: 'templates/logintab.html'
    })


    .state('admintab', {
      url: '/admintab',
      abstract: true,
      templateUrl: 'templates/admintab.html'
    })

    // Each tab has its own nav history stack:

    .state('logintab.adminpanel', {
      url: '/adminpanel',
      views: {
        'adminpanel': {
          templateUrl: 'templates/admin.html',
          controller: 'AdminCtrl'
        }
      }
    })

    .state('admintab.ad_kullanicilar', {
      url: '/ad_kullanicilar',
      views: {
        'ad_kullanicilar': {
          templateUrl: 'templates/ad_kullanicilar.html',
          controller: 'ad_KullanicilarCtrl'
        }
      }
    })

    .state('admintab.ad_urunler', {
      url: '/ad_urunler',
      views: {
        'ad_urunler': {
          templateUrl: 'templates/ad_urunler.html',
          controller: 'ad_UrunlerCtrl',
          cache: false
        }
      }
    })

    .state('admintab.ad_urunekle', {
      url: '/ad_urunler',
      views: {
        'ad_urunler': {
          templateUrl: 'templates/ad_urunekle.html',
          controller: 'ad_UrunEkleCtrl'
        }
      }
    })

    .state('admintab.ad_kullanicisepeti', {
      url: '/ad_kullanicilar/:kullaniciID',
      views: {
        'ad_kullanicilar': {
          templateUrl: 'templates/ad_kullanicisepeti.html',
          controller: 'ad_KullaniciSepetiCtrl'
        }
      }
    })

    .state('admintab.adminprofil', {
      url: '/adminprofil',
      views: {
        'adminprofil': {
          templateUrl: 'templates/adminprofil.html',
          controller: 'AdminProfilCtrl'
        }
      }
    })

    .state('logintab.giris', {
      url: '/giris',
      views: {
        'giris': {
          templateUrl: 'templates/giris.html',
          controller: 'GirisCtrl',
          cache: false
        }
      }
    })


    .state('logintab.kayitol', {
      url: '/kayitol',
      views: {
        'kayitol': {
          templateUrl: 'templates/kayitol.html',
          controller: 'KayitolCtrl'
        }
      }
    })

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:UrunID',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl',
          cache: false
        }
      }
    })

    .state('tab.profil', {
      url: '/profil',
      views: {
        'profil': {
          templateUrl: 'templates/profil.html',
          controller: 'ProfilCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/logintab/giris');

});
