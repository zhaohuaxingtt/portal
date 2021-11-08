var options = []
var createroperationCtr = [ '$scope','$http', function($scope,$http) {
    $http.get("http://127.0.0.1:8012/approval/activiti/service/departs")
        .then(function (response) {
            console.log(response.data);
            $scope.property.option1s = response.data
            options = response.data
        });
    $scope.multiInstanceSelectChanged = function(){
        $scope.updatePropertyInModel($scope.property);
    };

    $scope.multiInstanceSelectChanged1 = function(){
        $http.get("http://127.0.0.1:8012/approval/activiti/service/other?orgId="+$scope.property.value)
            .then(function (response) {
                //修改scope的值
                setTimeout(function(){
                    $scope.$apply(function(){
                        options = []
                        options = response.data
                    })
                },1000)
            });

        $scope.updatePropertyInModel($scope.property);

    };
}];

var createroperationCtr2 = [ '$scope','$http', function($scope,$http) {

    if($scope.property.options != options){
        setInterval(function () {
            $scope.$apply(function(){
                $scope.property.options = options
            })
        })
    }

    $scope.multiInstanceSelectChanged = function(){
        $scope.updatePropertyInModel($scope.property);
    };

}];


