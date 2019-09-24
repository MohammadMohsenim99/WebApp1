
app.controller('MyCtrl', function ($scope, $compile, $http) {

   // Show();

    $scope.ProName = sessionStorage.ProName;
    $scope.ProDimension = sessionStorage.ProDimension;
    $scope.ProPack = sessionStorage.ProPack;
    $scope.ProPrice = sessionStorage.ProPrice;
    $scope.ProDesc = sessionStorage.ProDesc;
    $scope.ProCat = sessionStorage.ProCat;
    $scope.ProColor = sessionStorage.ProColor;
    $scope.ProExtra = sessionStorage.ProExtra;
    $scope.ProWeigh = sessionStorage.ProWeigh;


    //function Show() {
    //    var getData = $http.get("/Panel/ProductDetail/Show")
    //    getData.then(function (VarMessage) {
    //        $scope.ListAllUserShow = VarMessage.data
    //    }, function () {
    //    });
    //};
});