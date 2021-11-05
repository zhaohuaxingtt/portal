var CustomSaveModelCtrl = [
  '$rootScope',
  '$scope',
  function($rootScope, $scope) {
    $scope.saveParent = function() {
      var json = $scope.editor.getJSON()
      var svgClone = $scope.editor.getCanvas().getSVGRepresentation(true)
      var svgDOM = DataManager.serialize(svgClone)
      var jsonXml = JSON.stringify({ key: 'jsonXml', value: json })
      var svgXml = JSON.stringify({ key: 'svgXml', value: svgDOM })
      window.parent.postMessage(jsonXml, '*')
      window.parent.postMessage(svgXml, '*')
      return true
    }

    $scope.customGetXml = function() {
      var json = $scope.editor.getJSON()
      var svgClone = $scope.editor.getCanvas().getSVGRepresentation(true)
      var svgDOM = DataManager.serialize(svgClone)
      return {
        jsonXml: json,
        svgXml: svgDOM
      }
    }
  }
]
