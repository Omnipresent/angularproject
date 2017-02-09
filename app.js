//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload','rzModule','ui.bootstrap']);

app.controller('MyCtrl', ['$scope', 'Upload', '$http', '$timeout', function ($scope, Upload, $http, $timeout) {
    $scope.loaderHidden = true;
    $scope.textSlider = {
        min: 0,
        max: 100,
        ceil: 100,
        floor: 0,
        step: 1
      };
    $scope.noTextSlider = {
        min: 0,
        max: 100,
        ceil: 100,
        floor: 0,
        step: 1
      };        
    $scope.textMinFilter = function (p) {
        return p.topPercentage >= $scope.textSlider.min;
    };
  
   $scope.textMaxFilter = function (p) {
        return p.topPercentage <= $scope.textSlider.max;
    };    
    $scope.noTextMinFilter = function (p) {
        return p.topPercentage >= $scope.noTextSlider.min;
    };
  
   $scope.noTextMaxFilter = function (p) {
        return p.topPercentage <= $scope.noTextSlider.max;
    };     
    $scope.csvurls = function() {
        $scope.loaderHidden = false;
        $http({
            method : 'POST',
            url : 'url',
            data: $scope.csv
        })
        .success(function (data, status, headers, config) {
            $scope.loaderHidden = true;
            $scope.text = data.text;
            $scope.notext = data.notext
        });
    }

    $scope.uploadFiles = function (files) {
        $scope.files = files;
        
        if (files && files.length) {
            $scope.loaderHidden = false;
            Upload.upload({
                url: "url"
                data: {
                    files: files
                }
            }).then(function (response) {
                $timeout(function () {
                    $scope.loaderHidden = true;
                    $scope.result = response.data;
                    $scope.text = response.data.text;
                    $scope.notext = response.data.notext;
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };
}]);