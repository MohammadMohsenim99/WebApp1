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
        url: '/Areas/Panel/AttributesForm/GetPersImageFile',
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


    $scope.FunSavePhoto = function () {
        if (confirm("آیامایلید پیام شما ارسال شود؟")) {

            //alert(ExpExp);
            var VarNewRec = {
                Img_Url:''
            };
            $.ajax({
                type: "post",
                url: "/Areas/Panel/AttributesForm/SaveRecordBody",
                data: {
                    ClassTbl_Emp: VarNewRec
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
                }
            });
        }
    }

});
