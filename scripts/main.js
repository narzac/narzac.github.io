var app = angular.module('Narzac', ['ui.bootstrap']);

app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});
