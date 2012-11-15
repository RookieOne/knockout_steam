
SteamApi = {
  base: "http://api.steampowered.com/",
  getAppList: function(fx) {
    $.get(SteamApi.base + "ISteamApps/GetAppList/v0001", function(response) {
      fx(response);
    });
  },
  getNews: function(id, fx) {
    console.log(id);
    $.get(SteamApi.base + "ISteamNews/GetNewsForApp/v0002/?appid=" + id + "&count=5&maxlength=300", function(response) {
      fx(response);
    });
  }
};