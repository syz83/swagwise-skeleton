(function(angular) {
    "use strict";

    var app = angular.module("Swagwise");

    app.directive('rotatingThumbnail', function($interval) {
        return {
            replace: true,
            //E element
            //A attribute
            //C class
            restrict: 'E',
            scope: {
                // @ String
                title: '@',
                // & one-way function
                // = two-way bound object
                images: '='

            },
            templateUrl: 'templates/rotating-thumbnail.html',
            link: function(scope, element, attributes) {
                var rotator;
                var counter = 0;

                var destroyRotator = function() {
                    if(rotator) {
                        //Cancel rotator
                        $interval.cancel(rotator);
                        //Destroy rotator
                        rotator = undefined;
                        //Reset productImage
                        scope.productImage = scope.images[0];
                        //Reset counter
                        counter = 0;
                    }
                };

                scope.productImage = scope.images[0];

                scope.rotateImage = function(){

                    //if rotator exists,
                    //return out of this function
                    if(rotator) {
                        return;
                    }

                    rotator = $interval(function(){
                        //Increment counter
                        counter += 1;
                        //Check if counter has surpassed images array length
                        if(counter >= scope.images.length) {
                            //re-initialize counter to 0
                            counter = 0;
                        }
                        //set next image in images array
                        scope.productImage = scope.images[counter];
                    }, 1500);
                };

                scope.cancelRotator = function(){
                    destroyRotator();
                };

                scope.$on('$destroy', function() {
                    destroyRotator();
                });
            }


        };
    }   );

    app.directive('productGroup', function() {

       return {
           scope: {
               swag: '='
           },
           restrict: 'E',
           replace: true,
           templateUrl: 'templates/product-group.html'
       }
    });

    app.directive('addCartButton', function(CartService) {

        return {
            scope: {
                item: '='
            },
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/add-cart-button.html',
            link: function(scope) {

                scope.addItem = function() {
                    CartService.addItem(scope.item);
                }

            }
        }
    });

    // Inject in the CartService
    app.directive('miniCart', function(CartService) {

        return {
            // Create an isolated scope
            scope: {
            },
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/mini-cart.html',
            link: function(scope, elem, attr) {

                CartService.getItems();

                scope.getCartSubtotal = function() {
                    // Returns subtotal from CartService
                    return CartService.getCartSubtotal();
                };

                scope.getItemCount = function() {
                    //Returns the item count from the CartService
                    return CartService.getItemCount();
                };
            }

        };
    });

})(window.angular)