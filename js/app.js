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
        $scope.users = [
            {name: 'Mario', telephone: '123 456 789', age: 35},
            {name: 'Luigi', telephone: '321 654 987', age: 30},
            {name: 'Vincenzo', telephone: '456 123 789', age: 27}
        ];
        $scope.predicates = ['name', 'telephone', 'age'];
        $scope.predicate = $scope.predicates[0];
        $scope.reverse = false;
        $scope.name = '';
        $scope.starNumber = 0;
    }])
    .controller('FormCtrl', ['$scope', function ($scope) {
        $scope.origin = {};
        $scope.reset = function () {
            $scope.user = angular.copy($scope.origin);
        };
        $scope.update = function (user) {
            $scope.origin = angular.copy(user);
        };
        $scope.isUnchanged = function (user) {
            return angular.equals(user, $scope.origin);
        };
        $scope.reset();
    }])
    .controller('ServiceCtrl', ['$scope', '$filter', '$http', '$httpBackend', '$location', 'Mario', function ($scope, $filter, $http, $httpBackend, $location, Mario) {
        $scope.date = '';
        $scope.americanDate = '';
        $scope.filter = function () {
            var dateFilter = $filter('date');
            $scope.americanDate = dateFilter($scope.date, 'M/d/yyyy');
        };

        /*$httpBackend.when('GET', '/Users.json')
            .respond([
                {name: 'Mario', telephone: '123 456 789', age: 35},
                {name: 'Luigi', telephone: '321 654 987', age: 30},
                {name: 'Vincenzo', telephone: '456 123 789', age: 27}
            ]);*/
        $scope.users = [];
        $scope.getUsers = function () {
            $http.get('fixtures/Users.json')
                .success(function (users) {
                    $scope.users = users;
                });
        };

        $scope.url = {};
        $scope.getUrl = function () {
            $scope.url.absUrl = $location.absUrl();
            $scope.url.url = $location.url();
            $scope.url.protocol = $location.protocol();
            $scope.url.host = $location.host();
            $scope.url.path = $location.path();
            $scope.url.port = $location.port();
        };

        $scope.salutation = Mario.salutation;
        $scope.findLuigi = Mario.findLuigi;
    }])
    .service('Mario', ['$http', '$log', function ($http, $log) {
        this.salutation = function () {
            alert('Hi, I\'m Mario!');
        };

        this.findLuigi = function () {
            $http.get('/luigi')
                .success(function (luigi) {
                    alert('I found you Luigi!');
                    $log.debug(luigi);
                });
        };
    }])
    .filter('star', ['uppercaseFilter', function (uppercaseFilter) {
        return function (value, starNumber) {
            value = String(value);
            starNumber = starNumber || 0;
            var stars = '',
                result = [];

            for (var i = 0; i < starNumber; i++) {
                stars += '*';
            }

            result.push(stars);
            result.push(uppercaseFilter(value));
            result.push(stars);

            if (value && value.length > 0) return result.join(' ');
            else return '';
        };
    }]);