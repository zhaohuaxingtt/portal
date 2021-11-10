/*
 * 岗位选择
 */
var KisBpmAssignmentPostCtrl = [
  '$scope',
  '$modal',
  function($scope, $modal) {
    // Config for the modal window
    var opts = {
      template:
        'editor-app/configuration/properties/assignment-post-popup.html?version=' +
        Date.now(),
      scope: $scope,
      backdrop: 'static'
    }
    // Open the dialog
    $modal(opts)
  }
]

var KisBpmAssignmentPostPopupCtrl = [
  '$scope',
  function($scope) {
    $scope.searchForm = {
      postName: '',
      postCode: '',
      postUser: ''
    }
    $scope.postList = [
      {
        checked: false,
        id: 1,
        postCode: 'CSK-1101',
        postName: '车灯采购经理',
        postUser: ['张三']
      },
      {
        checked: false,
        id: 2,
        postCode: 'CSK-1102',
        postName: '前车灯采购专员',
        postUser: ['李四', '王五']
      },
      {
        checked: false,
        id: 3,
        postCode: 'CSK-1103',
        postName: '后车灯采购专员',
        postUser: ['赵六']
      }
    ]

    $scope.checkedAll = false

    // 初始化
    if (
      $scope.assignment &&
      $scope.assignment.post &&
      $scope.assignment.post.value &&
      $scope.assignment.post.value.id
    ) {
      var isCheckedAll = true
      $scope.postList.forEach(function(e) {
        if ($scope.assignment.post.value.id.indexOf(e.id) > -1) {
          e.checked = true
        } else {
          if (isCheckedAll) {
            isCheckedAll = false
          }
        }
      })
      $scope.checkedAll = isCheckedAll
    }

    $scope.save = function() {
      var postNames = []
      var postUsers = []
      var postIds = []
      $scope.postList.forEach(function(e) {
        if (e.checked) {
          postNames.push(e.postName)
          postUsers = postUsers.concat(e.postUser)
          postIds.push(e.id)
        }
      })
      $scope.assignment.post.value.name = postNames.join(',')
      $scope.assignment.post.value.id = postIds
      $scope.assignment.assignee = ''
      $scope.assignment.candidateUsers = [{ value: '' }]
      if (postUsers.length <= 1) {
        $scope.assignment.assignee = postUsers.join(',')
      } else {
        var candidateUsers = postUsers.map(function(e) {
          return { value: e }
        })
        $scope.assignment.candidateUsers = candidateUsers
      }
      $scope.close()
    }
    $scope.close = function() {
      console.log('关闭了')
      $scope.assignment.post.visible = false
      $scope.$hide()
    }
    $scope.search = function() {
      console.log('搜索')
    }
    $scope.checkAll = function() {
      console.log('checkAll', $scope.checkedAll)
      $scope.postList.forEach(function(e) {
        e.checked = $scope.checkedAll
      })
    }
    $scope.checkItem = function(item) {
      console.log('checkItem', item)
      if (!item.checked) {
        $scope.checkedAll = false
      } else {
        $scope.checkedAll =
          $scope.postList.filter(function(e) {
            return !e.checked
          }).length === 0
      }
    }
    $scope.removeChecked = function(item) {
      item.checked = false
      if ($scope.checkedAll) {
        $scope.checkedAll = false
      }
    }
  }
]
