(function(angular) {
    "use strict";
    var app = angular.module('Swagwise');

    app.controller('AppController', function($scope, $state, $timeout, Auth) {


        function successCallback() {

            $state.go('login');

            $scope.alert = {
                type: 'success',
                message: 'You have been logged out.'
            };

            $timeout(function() {
                $scope.alert = undefined;

            }, 3000);
        }
        $scope.logout = function() {
            Auth.logout(successCallback);
        }

    });

    app.controller('LoginController', function($scope, $state, $timeout, Auth) {

        function successCallback() {
            $scope.alert = {
                type: 'success',
                message: 'You have successfully logged in.'
            };

            $timeout(function() {

                $state.go('home');

                $scope.alert = undefined;

            }, 3000);
        }

        function errorCallback() {
            $scope.alert = {
                type: 'danger',
                message: 'Invalid username and/or password'
            };

            $timeout(function() {
                $scope.alert = undefined;

            }, 3000);
        }

        $scope.login = function() {

            Auth.login({
                email: $scope.email,
                password: $scope.password
            }, successCallback, errorCallback);

        };

    });

    app.controller('SignupController', function($scope, $state, $timeout, Auth) {

        function successCallback() {
            $scope.alert = {
                type: 'success',
                message: 'Your account has been created.'
            };

            $timeout(function() {

                $state.go('login');

                $scope.alert = undefined;

            }, 3000);
        }

        function errorCallback() {
            $scope.alert = {
                type: 'danger',
                message: 'There was an error in creating your account. Please try again.'
            };

            $timeout(function() {
                $scope.alert = undefined;

            }, 3000);
        }

        $scope.signup = function() {
            Auth.signup({
                email   : $scope.email,
                password: $scope.password
            }, successCallback, errorCallback);
        };
    });

    app.controller('HomeController', function($scope, SwagService){

        $scope.featuredProducts = SwagService.query({isFeatured: true});
    });

    app.controller('SwagController', function($scope, SwagService, filterFilter){

        var items = SwagService.query();

        $scope.swagSearch = '';

        $scope.swag = items;

        $scope.$watch('swagSearch', function(newValue, oldValue) {
            //if searching, filter swag
            if(newValue){
                //filter swag
                $scope.swag = filterFilter(items, {title: newValue});
            }else {
                //reset swag
                $scope.swag = items;
            }

        });
        //$scope.swag = filterFilter(SwagService.query(), $scope.swagSearch);
    });

    app.controller('ProductDetailController', function($scope, $stateParams, SwagService, $interval) {
        var product_id = $stateParams.id;

        $scope.imageInterval = 3000;

        $scope.item = SwagService.get({id: product_id});
    });

    // Inject in the CartService
    app.controller('CartController', function($scope, CartService) {

        // Set the items on the scope to the items in the CartService using the getItems method
        $scope.items = CartService.getItems();

//        $scope.$watch('items', function() {
//           CartService.updateItemsCookie();
//        });

        $scope.addItem = function(item) {
            // Pass the item into the addItem method of the CartService
            CartService.addItem(item);
        };

        $scope.getItemCount = function() {
            // Return the item count from the CartService
            return CartService.getItemCount();
        };

        $scope.getItemPrice = function(item) {
            return item.specialPrice || item.price;
        };

        $scope.getItemSubtotal = function(item) {
          CartService.updateItemsCookie();
          return this.getItemPrice(item) * item.quantity;
        };

        $scope.getCartSubtotal = function() {
            // Return the subtotal using the getCartSubtotal method of the CartService
            return CartService.getCartSubtotal();
        };

        $scope.getCartTotal = function() {
            // Return the cart total using the getCartTotal method of the CartService
            return CartService.getCartTotal();
        };

        $scope.removeItem = function(id) {
            // Pass the item id into the removeItem method of the CartService
            CartService.removeItem(id);
        };

        $scope.emptyCart = function() {
            // Invoke the emptyCart method of the CartService
            CartService.emptyCart();
            $scope.items = CartService.getItems();
        };

        $scope.checkout = function() {
            // Invoke the checkout method of the
            CartService.checkout();
        };

    });

})(window.angular);