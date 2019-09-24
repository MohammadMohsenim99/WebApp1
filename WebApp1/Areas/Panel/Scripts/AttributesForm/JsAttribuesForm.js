
Dropzone.autoDiscover = false;
var app = angular.module('MyApp', ['thatisuday.dropzone']);

app.config(function (dropzoneOpsProvider) {
    dropzoneOpsProvider.setOptions({
        url: '/upload_1.php',
        acceptedFiles: 'All Files/*.*',
        addRemoveLinks: true,
        dictDefaultMessage: 'Click to add or drop file',
        dictRemoveFile: 'حذف فایل',
        dictResponseError: 'Could not upload this file'
    });
});

app.controller('MyCtrl', function ($scope, $compile, $http) {

    EmpID = 0;

    //DropZone:
    $scope.showBtns = false;
    $scope.lastFile = null;
    $scope.dz_PersImageOptions = {
        url: '/Panel/AttributesForm/GetPersImageFile',
        dictDefaultMessage: 'لطفا فایل ضمیمه خود را اینجا رها کنید',
        acceptedFiles: '',
        parallelUploads: 1,
        autoProcessQueue: false,
        uploadMultiple: true,
        maxFiles: 1,
        maxFilesize: 1000.00,
        //filesize: 500.0,
        //dictFileTooBig:500.0,
        //maxThumbnailFilesize: '500',
        //createImageThumbnails: true,    
        //timeout: 3600000, /*milliseconds*/
        //Send Parameter to c#

        init: function () {
            this.on("sending", function (file, xhr, formData) {
                formData.append("EmpID", EmpID);
            });
            this.on("complete", function (file) {
                $scope.dz_PersImageMethods.removeAllFiles();
                //Refresh Page
            });
        }
    };

    $scope.dz_PersImageMethods = {};
    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.showBtns = true;
            $scope.lastFile = file;
        },
        'error': function (file, xhr) {

            alert("file:" + file);
            alert("xhr:" + xhr);
        }

    };


    $scope.FunctionSave = function () {
        if (confirm("آیامایلید پیام شما ارسال شود؟")) {

            var VarNewRec = {
                Name: $scope.txtName,
                Dimension: $scope.txtDimension,
                Color: $scope.txtColor,
                Weigh: $scope.txtWeigh,
                PackingType: $scope.txtPack,
                ExtraParts: $scope.txtExtra,
                AvailableNo: $scope.txtAvailable,
                Description: $scope.txtDesc,
                Price: $scope.txtPrice,
                CategoryID: $scope.SelCategory,
            };

            $.ajax({
                type: "post",
                url: "/Panel/AttributesForm/Save",
                data: {
                    ClassAtt: VarNewRec
                },
                dataType: 'json',
                async: false,

                success: function (data) {
                    var files = $('#dropzone2').get(0).dropzone.getAcceptedFiles();
                    if (files.length > 0) {
                        EmpID = data;

                        $scope.dz_PersImageMethods.processQueue();
                    }

                },
                complete: function () {
                    var files = $('#dropzone2').get(0).dropzone.getAcceptedFiles();
                    if (files.length == 0) {
                        $scope.TxtExp = "";
                        $scope.ShowDetailsMessageOnChat($scope.CodePers_Reciver, $scope.SelNameLnameReciver, '', $scope.SelImageReciver);
                    }

                    Show();
                }
            });
        }
    }

    Show();
    ShowCategory();

    function Show() {
        var getData = $http.get("/Panel/AttributesForm/Show")
        getData.then(function (VarMessage) {
            $scope.ListAllAttributes = VarMessage.data
        }, function () {
        });
    };

    function ShowCategory() {
        var getData = $http.get("/Panel/CategoryForm/Show")
        getData.then(function (VarMessage) {
            $scope.ListAllCategory = VarMessage.data
        }, function () {
        });
    };

    $scope.FunDelete = function (ID) {
        if (confirm("آیا مایلید داده مورد نظر حذف شود؟")) {
            var getData = $http.get("/Panel/AttributesForm/Delete?ID=" + ID)
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
        
        $('#AttributeAdd').modal('toggle');

    }

    $scope.funUpdateModal = function (Item) {
        document.documentElement.scrollTop = 0;
        $scope.ID = Item.ID;
        $scope.varStatusDisSave = true;
        $scope.varStatusDisUpdate = false;
        $scope.txtName = Item.Name;
        $scope.txtDimension = Item.Dimension;
        $scope.txtColor = Item.Color;
        $scope.txtWeigh = Item.Weigh;
        $scope.txtDesc = Item.Description;
        $scope.txtPack = Item.PackingType;
        $scope.txtExtra = Item.ExtraParts;
        
       

    }

   

    


    $scope.FunctionUpdate = function () {
                          if (confirm("آیا مایلید اطلاعات ویرایش شوند؟")) {
                          //Save:
                          var VarNewRec = {
                          ID : $scope.ID,   
                          Name: $scope.txtName,
                          Dimension: $scope.txtDimension,
                          Color: $scope.txtColor,
                          Weigh: $scope.txtWeigh,
                          PackingType: $scope.txtPack,
                          ExtraParts: $scope.txtExtra,
                          AvailableNo: $scope.txtAvailable,
                          Description: $scope.txtDesc,
                          Price: $scope.txtPrice,
                          CategoryID: $scope.SelCategory,



            };

            $.ajax({
                type: "post",
                url: "/Panel/AttributesForm/Update",
                data: { ClassAtt: VarNewRec },
                dataType: 'json',
                success: function (data) {
                    alert('اطلاعات با موفقیت ویرایش شد');
                    Show();

                }
            });
            $scope.txtName = "";
            $scope.txtDimension = "";
            $scope.txtColor = "";
            $scope.txtWeigh = "";
            $scope.txtPack = "";
            $scope.txtExtra = "";
            $scope.txtDesc = "";
            $scope.SelCategory = "";

        }

    }

});