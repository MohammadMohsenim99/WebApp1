
var app = angular.module('MyApp', []);

app.controller('MyCtrl', function ($scope, $compile, $http) {

    //alert("In Cat");

    $scope.FunSave = function () {
        if (confirm("آیا مایلید اطلاعات ذخیره شوند؟")) {
            //Save:
            var VarNewRec = {
                Name: $scope.txtTitle,
               
            };

            $.ajax({
                type: "post",
                url: "/Panel/CategoryForm/Save",
                data: { ClassCategory: VarNewRec },
                dataType: 'json',
                success: function (data) {
                    alert('اطلاعات با موفقیت ذخیره شد');
                   
                }
            });
        }
    }
    

});