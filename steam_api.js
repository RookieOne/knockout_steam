
SteamApi = {
  base: "http://api.steampowered.com/",
  getAppList: function(fx) {
    $.get(SteamApi.base + "ISteamApps/GetAppList/v0001", function(response) {
      fx(response);
    });
  }
};