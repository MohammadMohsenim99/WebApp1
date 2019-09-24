
/// <reference path="JsUserAddForm.js" />
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
        url: '/Panel/UserAddForm/GetPersImageFile',
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
                Img_Url: ''
            };
            $.ajax({
                type: "post",
                url: "/Panel/UserAddForm/SaveRecordBody",
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
    Show();
    function Show() {
        var getData = $http.get("/Panel/UserAddForm/Show")
        getData.then(function (VarMessage) {
            $scope.ListAllUsers = VarMessage.data
        }, function () {
        });
    };

    $scope.FunDelete = function (ID) {
        var getData = $http.get("/Panel/UserAddForm/Delete?ID=" + ID)
        getData.then(function (VarMessage) {
            alert("Delete Succussful!");
            Show();
        }, function () {

        })
    };

    $scope.funShowSave = function () {

        $scope.VarStatusDisBtnSave = false;
        $scope.VarStatusDisBtnUpdate = true;


        $('#UserAdd').modal('toggle');
    };


    $scope.funShowUpdate = function (Item) {

        $scope.VarStatusDisBtnSave = true;
        $scope.VarStatusDisBtnUpdate = false;

        $scope.ID = Item.ID;
        $scope.txtname = Item.FirstName;
        $scope.txtbirth = Item.BirthDate;
        $scope.txtFamily = Item.LastName;
        $scope.txtFather = Item.FatherName;
        $scope.txtmarriage = Item.MarriageStatus;
        $scope.txtnational = Item.NationalID;
        $scope.txtnumber = Item.MobileNo;
        $scope.txtsex = Item.Sex;
        $scope.txtusername = Item.Username;
        $scope.txtpass = Item.Password;
        $scope.txtemail = Item.Email;
        document.documentElement.scrollTop = 0;

    };


    $scope.FunSave = function () {
        if (confirm("آیا مایلید اطلاعات ذخیره شوند؟")) {
            //Save:
            var VarNewRec = {
                FirstName: $scope.txtname,
                LastName: $scope.txtFamily,
                FatherName: $scope.txtFather,
                NationalID: $scope.txtnational,
                Sex: $scope.txtsex,
                BirthDate: $scope.txtbirth,
                Email: $scope.txtemail,
                MobileNo: $scope.txtnumber,
                Username: $scope.txtusername,
                Password: $scope.txtpass,
                MarriageStatus: $scope.txtmarriage,
            };

            $.ajax({
                type: "post",
                url: "/panel/UserAddForm/Save",
                data: { classUsers: VarNewRec },
                dataType: 'json',
                success: function (data) {
                    alert('اطلاعات با موفقیت ذخیره شد');
                    show();

                }
            });
        }
    };
    Show();

   $scope.FunUpdate = function () {
            if (confirm("آیا مایلید اطلاعات ویرایش شوند؟")) {
                //Save:
                var VarNewRec = {
                    ID: $scope.ID,
                    FirstName: $scope.txtname,
                    LastName: $scope.txtFamily,
                    FatherName: $scope.txtFather,
                    NationalID: $scope.txtnational,
                    Sex: $scope.txtsex,
                    BirthDate: $scope.txtbirth,
                    Email: $scope.txtemail,
                    MobileNo: $scope.txtnumber,
                    Username: $scope.txtusername,
                    Password: $scope.txtpass,
                    MarriageStatus: $scope.txtmarriage,
                };

                $.ajax({
                    type: "post",
                    url: "/panel/UserAddForm/Update",
                    data: { classUsers: VarNewRec },
                    dataType: 'json',
                    success: function (data) {
                        alert('اطلاعات با موفقیت ویرایش شد');
                        Show();

                    }
                });
                $scope.txtname = "";
                $scope.txtFamily = "";
                $scope.txtFather = "";
                $scope.txtnational = "";
                $scope.txtsex = "";
                $scope.txtbirth = "";
                $scope.txtemail = "";
                $scope.txtnumber = "";
                $scope.txtusername = "";
                $scope.txtpass = "";
                $scope.txtmarriage = "";

            }


        };


    
});