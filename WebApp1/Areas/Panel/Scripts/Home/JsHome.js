
var app = angular.module('MyApp', []);

app.controller('MyCtrl', function ($scope, $compile, $http) {

    var BuyList = [];
    Show();

    function Show() {
        var getData = $http.get("/Home/Show")
        getData.then(function (VarMessage) {
            $scope.ListAllProductShow = VarMessage.data
        }, function () {
        });
    };

    $scope.ShowMore = function (Item) {
        sessionStorage.ProName = Item.Name;
        sessionStorage.ProDimension = Item.Dimension;
        sessionStorage.ProPack = Item.PackingType;
        sessionStorage.ProColor = Item.Color;
        sessionStorage.ProWeigh = Item.Weigh;
        sessionStorage.ProCat = Item.Category;
        sessionStorage.ProExtra = Item.ExtraParts;
        sessionStorage.ProDesc = Item.Description;
        sessionStorage.ProPrice = Item.Price;

        window.location.href = '/Productdetail';
    }

    
    $scope.BuyList = function (Item) {
        var BProductDetails = {
            Name: Item.Name,
            Price: Item.Price
        };
        BuyList.push(BProductDetails);
        $scope.BuyAllList = BuyList;
    }

    $scope.WishList = function (Item) {
         
        var VarNewRec = {
            UserID: Item.UserID,
            ProductID:Item.ProductID,

                
            };

            $.ajax({
                type: "post",
                url: "/panel/UserAddForm/WishSave",
                data: { classWishList: VarNewRec },
                dataType: 'json',
                success: function (data) {
                   
                    show();

                }
            });
        
    };

   

  
  

});