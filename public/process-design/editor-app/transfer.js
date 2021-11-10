function positionToChild(val) {
  var appElement = document.querySelector(
    '[ng-controller=KisBpmCustomDefaultOperationPostCtrl]'
  )
  var $scope = angular.element(appElement).scope()
  $scope.receivePositionData(val)
}

function xmlToParent() {
  var appElement = document.querySelector('[ng-controller=CustomSaveModelCtrl]')
  var $scope = angular.element(appElement).scope()
  return $scope.customGetXml()
}

function orgToChild(val) {
  var appElement = document.querySelector(
    '[ng-controller=KisBpmUseridPropertyCtrl]'
  )
  var $scope = angular.element(appElement).scope()
  $scope.receiveOrgData(val)
}
