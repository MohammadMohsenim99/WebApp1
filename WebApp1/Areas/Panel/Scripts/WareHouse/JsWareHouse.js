
app.controller('MyCtrl', function ($scope, $compile, $http) {

    Show();
    ShowProduct();

    function Show() {
        var getData = $http.get("/Panel/WareHouse/Show")
        getData.then(function (VarMessage) {
            $scope.ListAllWareHouse = VarMessage.data
        }, function () {
        });
    };

    function ShowProduct() {
  
        var getData = $http.get("/Panel/AttributesForm/Show")
        getData.then(function (VarMessage) {
            $scope.ListAllProduct = VarMessage.data
        }, function () {
        });
    };

    $scope.FunDelete = function (ID) {
        if (confirm("آیا مایلید داده مورد نظر حذف شود؟")) {
            var getData = $http.get("/Panel/WareHouse/Delete?ID=" + ID)
            getData.then(function (VarMessage) {
                alert("اطلاعات با موفقیت حذف شدند");
                Show();
            }, function () {
            });
        }
    };

    $scope.funSaveModal = function () {
                        $scope.varStatusDisSave = false;
                        $scope.varStatusDisUpdate = true;
        
         }

    $scope.funUpdateShow = function (Item) {
        $scope.txtPrice = Item.Price;
        $scope.txtEntry = Item.EntryNo;
        $scope.SelProduct=Item.ProductID;
        $scope.varStatusDisSave = true;
        $scope.varStatusDisUpdate = false;
        document.documentElement.scrollTop = 0;
      
       

    }

   

    $scope.FunctionSave = function () {
       
        if (confirm("آیا مایلید اطلاعات ذخیره شوند؟")) {
            //Save:
            var VarNewRec = {

                ProductID: $scope.SelProduct,
                Price: $scope.txtPrice,
                EntryNo: $scope.txtEntry,
                
            };

            $.ajax({
                type: "post",
                url: "/Panel/WareHouse/Save",
                data: { ClassWareHouse: VarNewRec },
                dataType: 'json',
                success: function (data) {
                    alert('اطلاعات با موفقیت ذخیره شد');
                    Show();

                }
            });
            $scope.txtEntry = "";
            $scope.txtPrice = "";
        }
        
    }


    $scope.FunctionUpdate = function () {
                          if (confirm("آیا مایلید اطلاعات ویرایش شوند؟")) {
                          //Save:
                          var VarNewRec = {
                              Price:$scope.txtPrice,
                              EntryNo:$scope.txtEntry,
                             

            };

            $.ajax({
                type: "post",
                url: "/Panel/WareHouse/Update",
                data: { ClassWareHouse: VarNewRec },
                dataType: 'json',
                success: function (data) {
                    alert('اطلاعات با موفقیت ویرایش شد');
                    Show();

                }
            });
        }

    }

});