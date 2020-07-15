angular.module('starter.controllers', [])

  .controller('AdminCtrl', function ($scope,$state) {
    $scope.admin = {};
    $scope.admingirisyap = function (admin) {
      if (admin.mail == "admin" && admin.sifre == "12345") {
        $state.go("admintab.ad_kullanicilar");
      }
      else {
        alert("Hatalı Mail veya Şifre");
        $scope.admin = {};
      }
    }
  })

  .controller('ad_KullanicilarCtrl', function ($scope, $http) {

    $http.get("https://localhost:44322/api/Kullanici/TumKullanicilariGetir")
      .then(function (response) {
        $scope.kullanicilar = response.data;
      });

  })

  .controller('ad_UrunlerCtrl', function ($scope, $http, $state) {

    $http.get("https://localhost:44322/api/Urun/TumUrunleriGetir")
      .then(function (response) {
        $scope.urunler = response.data;
      });

      //$scope.urunSil = function (urun_id) {
      //  $http.get("https://localhost:44322/api/Urun/UrunSil?UrunID=" + urun_id)
      //    .then(function (response) {
      //      $scope.urunler = response.data;
      //    });
      //}

    $scope.yeniuruneklesayfasi = function () {
      $state.go("admintab.ad_urunekle");
    }
  })

  .controller('ad_UrunEkleCtrl', function ($scope, $state, $http) {

    $scope.urun = {};

    $scope.yeniurunekle = function (veri) {
      $http.post("https://localhost:44322/api/Urun/UrunEkle", veri)
        .then(function (response) {
          if (response.data == true) {
            alert("Ürün Eklendi.");
            $state.go("admintab.ad_urunler");
          }

          else {
            alert("Ürün Eklenemedi.");
          }

          $scope.urun = {};

        });

    }
  })
  

  .controller('ad_KullaniciSepetiCtrl', function ($scope, $stateParams, $http) {

    //alert($stateParams.kullaniciID);

    $http.get("https://localhost:44322/api/Sepet/KullanicininSepetiniGetir?KullaniciID="+ $stateParams.kullaniciID)
      .then(function (response) {
        $scope.kullanicininsepeti = response.data;
      });

    $scope.sepettenUrunSil = function (id) {
      $http.get("https://localhost:44322/api/Sepet/SepetSil?SepetID=" + id)
        .then(function (response) {
          $scope.kullanicininsepeti = response.data;
        });
    }
  
    
  })
  
  .controller('AdminProfilCtrl', function ($scope, $state) {

    $scope.cikisyap = function () {

      $state.go("logintab.giris");
    }

  })

  .controller('GirisCtrl', function ($scope, $http, $state, $rootScope) {

   $scope.kayitolsayfasinagit = function () {
     $state.go("logintab.kayitol");
   }

    $scope.kullanicigirisyap = function (mail, sifre) {

      $http.get("https://localhost:44322/api/Kullanici/KullaniciGirisYap?mailadresi="+mail+"&sifre="+sifre)
        .then(function (response) {
          $scope.kullaniciid = response.data;
          if (response.data == 0)
            alert("Kullanici Bulunamadi");

          else {
            //alert(response.data);
            $rootScope.kullanici = $scope.kullaniciid;
            localStorage.setItem("kullanici", $scope.kullaniciid);

            $state.go("tab.chats");
          }


        });
    }

 })

.controller('KayitolCtrl', function ($scope, $http, $state, $rootScope) {

  $scope.kullanici = {};

  $scope.kullanicikayit = function (veri) {

    $http.post("https://localhost:44322/api/Kullanici/KullaniciEkle", veri)
      .then(function (response) {
        $scope.kullaniciid = response.data;
        if (response.data == true) {
          //alert("kayıt basarili");
          $rootScope.kullanici = $scope.kullaniciid;
          localStorage.setItem("kullanici", $scope.kullaniciid);
          $state.go("tab.chats");
        }

        else {
          alert("kayıt hatalı");
        }

        $scope.kullanici = {};

      });

  }

  })

  .controller('DashCtrl', function ($scope, $http) {

    $scope.urunara = function (kelime) {
      $http.get("https://localhost:44322/api/Urun/UrunAra?kelime=" + kelime)
        .then(function (response) {
          $scope.urunler = response.data;
        });
    }

    $http.get("https://localhost:44322/api/Urun/TumUrunleriGetir")
      .then(function (response) {
        $scope.urunler = response.data;
      });

  })

.controller('ChatsCtrl', function($scope, Chats, $http, $rootScope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $http.get("https://localhost:44322/api/Urun/TumUrunleriGetir")
    .then(function (response) {
      $scope.urunler = response.data;
    });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, $http, $state, $rootScope) {

  localStorage.getItem("kullanici");

  UrunID = $stateParams.UrunID;
  //alert(UrunID);
  $scope.urunum = UrunID;
 // $scope.kullaniciID = $rootScope.kullaniciid;
  KullaniciID = $rootScope.kullanici;
  $scope.kullanicim = KullaniciID;
  
  $scope.sepeteekle = function (adet) {

    $http.get("https://localhost:44322/api/Sepet/SepeteYeniKayitEkle2?urunid=" + $stateParams.UrunID + "&kullaniciid=" + $rootScope.kullanici + "&adet=" + adet)
      .then(function (response) {
        //$scope.sepeteekle = response.data;

        if (response.data == false) {
          alert("Ürünü Sepetinize Ekleyemedik.");
        }

        else {
          alert("Ürün Sepetinize Eklendi.");
          $state.go("tab.chats");
        }

      });

  }


  $scope.back = function () {
    $state.go("tab.chats");
  }

})


.controller('ProfilCtrl', function ($scope,$http,$state, $rootScope) {

  localStorage.getItem("kullanici");

  KullaniciID = $rootScope.kullanici;
  $scope.kullanicim = KullaniciID;
    
    //$scope.kullanici = {};

    //$scope.profilguncelle = function (veri) {

    //  $http.post("https://localhost:44322/api/Kullanici/KullaniciGuncelle", veri)
    //    .then(function (response) {
    //      if (response.data == true) {
    //        //alert("Kayıt Başarılı");
    //        //$rootScope.kullaniciid = response.data;
    //        $state.go("tab.chats");
    //      }

    //      else {
    //        alert("Güncelleme Başarısız");
    //      }

    //      $scope.kullanici = {};

    //    });
    //}
  $scope.sifreyiguncelle = function (Sifre) {

    $http.post("https://localhost:44322/api/Kullanici/KullaniciSifreGuncelle?kullaniciid=" + $rootScope.kullanici + "&Sifre=" + Sifre)
      .then(function (response) {
        if (response.data == true) {
          //alert("Kayıt Başarılı");
          //$rootScope.kullaniciid = response.data;
          
          $state.go("tab.chats");
        }

        else {
          alert("Güncelleme Başarısız");
        }

        $scope.kullanici = {};

      });

  }

  $scope.cikisyap = function () {
      localStorage.removeItem("kullanici");
      $rootScope.kullanici = "";
      $state.go("logintab.giris");
    }

})



  .controller('AccountCtrl', function ($scope, $http, $rootScope, $stateParams,$state) {


    id = localStorage.getItem("kullanici");

    //id = $rootScope.kullanici;
    
    $http.get("https://localhost:44322/api/Sepet/KullanicininSepetiniGetir?KullaniciID=" + id)
    .then(function (response) {
      $scope.sepettekiurunler = response.data;
    });

    $scope.sepettenUrunSil = function (sid) {
      $http.get("https://localhost:44322/api/Sepet/SepetSil?SepetID=" + sid)
        .then(function (response) {
          $scope.sepettekiurunler = response.data;
        });
    }

});
