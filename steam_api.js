
SteamApi = {
  base: "http://api.steampowered.com/",
  getApps: function(fx) {
    $.get(SteamApi.base + "ISteamApps/GetAppList/v0001", function(response) {
      fx(response.applist.apps.app.slice(0, 10));
    });
  },
  searchApps: function(searchText, fx) {
    $.get(SteamApi.base + "ISteamApps/GetAppList/v0001", function(response) {
      var regExp = new RegExp(searchText);      
      apps = _.filter(response.applist.apps.app, function(app) {
        return regExp.test(app.name);
      });
      fx(apps);
    });    
  },
  getNews: function(id, fx) {
    $.get(SteamApi.base + "ISteamNews/GetNewsForApp/v0002/?appid=" + id + "&count=5&maxlength=300", function(response) {
      fx(response.appnews.newsitems);
    });
  },
  getCurrentPlayers: function(id, fx) {
    $.get(SteamApi.base + "ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=" + id, function(response) {      
      fx(response.response);
    });
  },
  getAchievements: function(id, fx) {
    $.get(SteamApi.base + "ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=" + id + "&xml=1", function(response) {      
      fx(response.achievementpercentages.achievements.slice(0, 10));
    });
  }
};