'use strict';

angular
    .module('AmsterdamConf', [])
    .config(['$interpolateProvider', function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    }])
    .controller('TemplateCtrl', ['$scope', function ($scope) {
        $scope.text = '';
        $scope.templateSubmit = function () {
            alert("text value is:" + $scope.text);
        };
    }])
    .controller('DirectiveCtrl', ['$scope', function ($scope) {
        $scope.tools = ['AngularJS', 'Go Lang', 'Dart'];
        $scope.selection = $scope.tools[0];

        $scope.name = 'Wilk';

        $scope.articles = [
            {title: 'Article A', body: 'Content of article A', notes: 'Notes of article A'},
            {title: 'Article B', body: 'Content of article B', notes: 'Notes of article B'},
            {title: 'Article C', body: 'Content of article C', notes: 'Notes of article C'}
        ];
    }])
    .controller('FilterCtrl', ['$scope', function ($scope) {
        $scope.amount = 0;
        $scope.today = new Date();
        $scope.objectToDebug = {a:10, b:30, c:[1,2,3]};
    }]);