var KisBpmUseridPropertyCtrl = [
  '$scope',
  '$rootScope',
  function($scope, $rootScope) {
    $scope.conditions = {
      dept: { label: '本部门', value: '' },
      deptCode: '',
      zhongwai: { label: '不限', value: '' },
      zhishu: { label: '否', value: 'no' },
      k: { label: '不限', value: '' },
      r: { label: '不限', value: '' }
    }
    $scope.deptOptions = [
      { label: '本部门', value: '' },
      { label: '手动选择', value: 'CUSTOM_SELECT' }
    ]
    $scope.zhongwaiOptions = [
      { label: '不限', value: '' },
      { label: '中方', value: '1' },
      { label: '外方', value: '2' }
    ]
    $scope.zhishuOptions = [
      { label: '不限', value: '' },
      { label: '是', value: 'yes' },
      { label: '否', value: 'no' }
    ]
    $scope.kOptions = [
      { label: '不限', value: '' },
      { label: 'K0', value: 'K0' },
      { label: 'K1', value: 'K1' },
      { label: 'K2', value: 'K2' },
      { label: 'K3', value: 'K3' }
    ]
    $scope.rOptions = [
      { label: '不限', value: '' },
      { label: 'R1', value: '1' },
      { label: 'R2', value: '2' },
      { label: 'R3', value: '3' },
      { label: 'R4', value: '4' }
    ]

    $scope.deptSelectCallback = function($item, $model) {
      $scope.property.value = generateUserId()
      if ($item.value !== '') {
        $scope.openChooseOrgDialog()
      }
    }

    $scope.openChooseOrgDialog = function() {
      window.parent.postMessage(
        JSON.stringify({ key: 'chooseOrg', value: true }),
        '*'
      )
    }

    $scope.receiveOrgData = function(val) {
      if (val && val.length > 0) {
        $scope.conditions.deptCode = val[0].fullCode
        setPropertyValue()
        $scope.$apply()
      }
    }

    $scope.zhongWaiSelectCallback = function($item, $model) {
      setPropertyValue()
    }
    $scope.zhishuSelectCallback = function($item, $model) {
      setPropertyValue()
    }
    $scope.kSelectCallback = function($item, $model) {
      setPropertyValue()
    }
    $scope.rSelectCallback = function($item, $model) {
      setPropertyValue()
    }

    function setPropertyValue(value) {
      $scope.property.value = generateUserId()
      $scope.updatePropertyInModel($scope.property)
      $scope.$apply()
    }
    initValue()
    function initValue() {
      const scopeShapes = $scope.modelData.model.childShapes
      if (scopeShapes) {
        const nodeItems = scopeShapes.filter(function(e) {
          return e.properties.overrideid === $scope.property.value
        })
        if (nodeItems.length) {
          const documentation = nodeItems[0].properties.documentation
          if (documentation) {
            try {
              const documentationJson = JSON.parse(documentation)
              if (!documentationJson.idDescription) {
                return
              }
              const idDescription = documentationJson.idDescription
              if (idDescription.dept) {
                var items = $scope.deptOptions.filter(function(e) {
                  return e.value === idDescription.dept.value
                })
                if (items.length) {
                  $scope.conditions.dept = items[0]
                }
              }
              $scope.conditions.deptCode = idDescription.deptCode || ''
              if (idDescription.zhongwai) {
                var items = $scope.zhongwaiOptions.filter(function(e) {
                  return e.value === idDescription.zhongwai.value
                })
                if (items.length) {
                  $scope.conditions.zhongwai = items[0]
                }
              }
              if (idDescription.zhishu) {
                var items = $scope.zhishuOptions.filter(function(e) {
                  return e.value === idDescription.zhishu.value
                })
                if (items.length) {
                  $scope.conditions.zhishu = items[0]
                }
              }
              if (idDescription.k) {
                var items = $scope.kOptions.filter(function(e) {
                  return e.value === idDescription.k.value
                })
                if (items.length) {
                  $scope.conditions.k = items[0]
                }
              }
              if (idDescription.r) {
                var items = $scope.rOptions.filter(function(e) {
                  return e.value === idDescription.r.value
                })
                if (items.length) {
                  $scope.conditions.r = items[0]
                }
              }
            } catch (error) {
              console.log('try error', error)
            }
          }
        }
      }
    }
    function generateUserId() {
      var id = ''
      // 选择中方外方
      if ($scope.conditions.zhongwai.value === '') {
        id += 'DEPT'
      } else {
        id += 'ASL'
      }
      // 选择本部门
      if ($scope.conditions.dept.value === '') {
        if ($scope.conditions.zhishu.value === 'yes') {
          id += '-DIRECTOR'
        }
      } else {
        // 选择指定部门
        id += '-DT'
        if ($scope.conditions.zhishu.value === 'yes') {
          id += '-DIRECTOR'
        }
      }
      if (
        $scope.conditions.k.value !== '' &&
        $scope.conditions.r.value !== ''
      ) {
        id += '-KR'
      } else if (
        $scope.conditions.k.value !== '' &&
        $scope.conditions.r.value === ''
      ) {
        id += '-KK'
      } else if (
        $scope.conditions.k.value === '' &&
        $scope.conditions.r.value !== ''
      ) {
        id += '-RR'
      }
      // 选择了部门
      if ($scope.conditions.dept.value !== '') {
        id += '-' + $scope.conditions.deptCode
        if ($scope.conditions.k.value !== '') {
          id += '_' + $scope.conditions.k.value
        }
        if ($scope.conditions.r.value !== '') {
          id += '_' + $scope.conditions.r.value
        }
      } else {
        if ($scope.conditions.k.value !== '') {
          id += '-' + $scope.conditions.k.value
        }
        if ($scope.conditions.r.value !== '') {
          id += '-' + $scope.conditions.r.value
        }
      }
      if ($scope.conditions.zhongwai.value !== '') {
        if ($scope.conditions.zhishu.value === 'yes') {
          id += '-' + $scope.conditions.zhongwai.value
        } else {
          id += '_' + $scope.conditions.zhongwai.value
        }
      }

      if (id === 'DEPT-DIRECTOR') {
        id = 'DEPT-DIRECTOR-'
      }

      window.parent.postMessage(
        JSON.stringify({
          key: 'overideidCondition',
          value: true,
          item: {
            key: id,
            value: $scope.conditions
          }
        }),
        '*'
      )

      return id
    }

    $scope.shapeId = $scope.selectedShape.id
    $scope.valueFlushed = false
    /** Handler called when input field is blurred */
    $scope.inputBlurred = function() {
      $scope.valueFlushed = true
      if ($scope.property.value) {
        $scope.property.value = $scope.property.value.replace(
          /(<([^>]+)>)/gi,
          ''
        )
      }
      $scope.updatePropertyInModel($scope.property)
    }

    $scope.enterPressed = function(keyEvent) {
      if (keyEvent && keyEvent.which === 13) {
        keyEvent.preventDefault()
        $scope.inputBlurred() // we want to do the same as if the user would blur the input field
      }
    }

    $scope.$on('$destroy', function controllerDestroyed() {
      if (!$scope.valueFlushed) {
        if ($scope.property.value) {
          $scope.property.value = $scope.property.value.replace(
            /(<([^>]+)>)/gi,
            ''
          )
        }
        $scope.updatePropertyInModel($scope.property, $scope.shapeId)
      }
    })
  }
]
