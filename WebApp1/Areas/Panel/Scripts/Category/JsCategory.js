
var app = angular.module('MyApp', []);

app.controller('MyCtrl', function ($scope, $compile, $http) {

    //alert("In Cat");
    Show();

    function Show() {
        var getData = $http.get("/Panel/CategoryForm/Show")
        getData.then(function(VarMessage){
            $scope.ListAllCategory=VarMessage.data
        }, function () {
        });
    }

    $scope.FunDelete = function (ID) {
        if (confirm("آیا از حذف داده ها مطمئن هستید ؟")) {
            var getData = $http.get("/Panel/CategoryForm/Delete?ID=" + ID)
            getData.then(function (VarMessage) {
                alert("داده ها با موفقیت حذف شدند ");
                Show();
            }, function () {
            });
        }
    }

    $scope.funUpdateShow = function (Item) {
       $scope.varStatusDisSave = true;
       $scope.varStatusDisUpdate = false;
       $scope.txtTitle = Item.Name;
       document.documentElement.scrollTop = 0;

    }
    $scope.funSaveShow = function () {
       
        $scope.varStatusDisSave = false;
        $scope.varStatusDisUpdate = true;
       



    }

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
                    show();
                   
                }
            });
        }
    }
    

    $scope.FunUpdate = function () {
        if (confirm("آیا مایلید اطلاعات ویرایش شوند؟")) {
            //Save:
            var VarNewRec = {
                ID: $scope.ID,
                Name: $scope.txtTitle,

            };

            $.ajax({
                type: "post",
                url: "/Panel/CategoryForm/Update",
                data: { ClassCategory: VarNewRec },
                dataType: 'json',
                success: function (data) {
                    alert('اطلاعات با موفقیت ویرایش شد');
                    show();

                }
            });
        }
        $scope.txtTitle = "";
    }

});