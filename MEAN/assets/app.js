angular.module("app",[]),angular.module("app").controller("PostsCtrl",["$scope","PostsSvc",function(t,s){t.addPost=function(){t.postBody&&s.create({username:"dickeyxxx",body:t.postBody}).success(function(s){t.posts.unshift(s),t.postBody=null})},s.fetch().success(function(s){t.posts=s})}]),angular.module("app").service("PostsSvc",["$http",function(t){this.fetch=function(){return t.get("/api/posts")},this.create=function(s){return t.post("/api/posts",s)}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsInBvc3RzLmN0cmwuanMiLCJwb3N0cy5zdmMuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJQb3N0c1N2YyIsImFkZFBvc3QiLCJwb3N0Qm9keSIsImNyZWF0ZSIsInVzZXJuYW1lIiwiYm9keSIsInN1Y2Nlc3MiLCJwb3N0IiwicG9zdHMiLCJ1bnNoaWZ0IiwiZmV0Y2giLCJzZXJ2aWNlIiwiJGh0dHAiLCJ0aGlzIiwiZ2V0Il0sIm1hcHBpbmdzIjoiQUFBQUEsUUFBQUMsT0FBQSxVQ0FBRCxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsYUFBQSxTQUFBLFdBQUEsU0FBQUMsRUFBQUMsR0FDQUQsRUFBQUUsUUFBQSxXQUNBRixFQUFBRyxVQUNBRixFQUFBRyxRQUNBQyxTQUFBLFlBQ0FDLEtBQUFOLEVBQUFHLFdBRUFJLFFBQUEsU0FBQUMsR0FDQVIsRUFBQVMsTUFBQUMsUUFBQUYsR0FDQVIsRUFBQUcsU0FBQSxRQUtBRixFQUFBVSxRQUNBSixRQUFBLFNBQUFFLEdBQ0FULEVBQUFTLE1BQUFBLE9DakJBWixRQUFBQyxPQUFBLE9BQ0FjLFFBQUEsWUFBQSxRQUFBLFNBQUFDLEdBQ0FDLEtBQUFILE1BQUEsV0FDQSxNQUFBRSxHQUFBRSxJQUFBLGVBRUFELEtBQUFWLE9BQUEsU0FBQUksR0FDQSxNQUFBSyxHQUFBTCxLQUFBLGFBQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ1Bvc3RzQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIFBvc3RzU3ZjKSB7XG4gICRzY29wZS5hZGRQb3N0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICgkc2NvcGUucG9zdEJvZHkpIHtcbiAgICAgIFBvc3RzU3ZjLmNyZWF0ZSh7XG4gICAgICAgIHVzZXJuYW1lOiAnZGlja2V5eHh4JyxcbiAgICAgICAgYm9keTogICAgICRzY29wZS5wb3N0Qm9keVxuICAgICAgfSlcbiAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAgICRzY29wZS5wb3N0cy51bnNoaWZ0KHBvc3QpXG4gICAgICAgICRzY29wZS5wb3N0Qm9keSA9IG51bGxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgUG9zdHNTdmMuZmV0Y2goKVxuICAuc3VjY2VzcyhmdW5jdGlvbiAocG9zdHMpIHtcbiAgICAkc2NvcGUucG9zdHMgPSBwb3N0c1xuICB9KVxufSkiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5zZXJ2aWNlKCdQb3N0c1N2YycsIGZ1bmN0aW9uICgkaHR0cCkge1xuICB0aGlzLmZldGNoID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvcG9zdHMnKVxuICB9XG4gIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHBvc3QpIHtcbiAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wb3N0cycsIHBvc3QpXG4gIH1cbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
