
# 1 Title

```javascript
var SteamApp = function() {
  var self = this;
  self.title = ko.observable("Knockout Steam");
  return self;
}
```

```javascript
$(function() {
  var viewModel = new SteamApp();
  ko.applyBindings(viewModel);
})
```

```html
<body>
  <div class="container">
    <div class="row">
      <div class="span12">
        <h1 data-bind="text: title"></h1>
      </div>
    </div>
  </div>
</body>
```

# 2 App List

```javascript
// inside SteamApp
self.apps = ko.observableArray([]);

SteamApi.getApps(function(data) {
  apps = _.map(data, function(d) { return { id: d.appid, name: d.name }});
  self.apps(apps);
});
```

```html
<!-- below title -->
<ul class="unstyled" data-bind="foreach: apps">
  <li class="row">
    <h3 data-bind="text: name"></h2>
  </li>
</ul>
```

# 3 Search

```javascript
// inside SteamApp
self.searchText = ko.observable();
self.searchApps = function() {
  SteamApi.searchApps(self.searchText(), function(data) {
    apps = _.map(data, function(d) { return { id: d.appid, name: d.name }});
    self.apps(apps);        
  });
}
```

```html
<!-- above apps ul and below title -->
<form data-bind="submit: searchApps">
  <input type="text" class="input-xxlarge" data-bind="value: searchText"></input>
</form>
```

# 4 Refactor

```javascript
// inside SteamApp
self.setApps = function(data) {
  apps = _.map(data, function(d) { return { id: d.appid, name: d.name }});
  self.apps(apps);
}

SteamApi.getApps(self.setApps);

self.searchApps = function() {
  SteamApi.searchApps(self.searchText(), self.setApps);
}
```

# 5 App View Model

```javascript
var App = function(data) {
  var self = this;
  self.id = ko.observable(data.appid);
  self.name = ko.observable(data.name);
  self.currentPlayers = ko.observable();

  SteamApi.getCurrentPlayers(self.id(), function(data) {
    self.currentPlayers(data.player_count);
  });

  return self;
}
```

```javascript
// inside SteamApp
self.setApps = function(data) {
  apps = _.map(data, function(d) { return new App(d); });
  self.apps(apps);
}
```

```html
<!-- inside App li -->
<h3>
  <span data-bind="text: name"></span>
  <small>
    <span data-bind="text: currentPlayers"></span>
  </small>
</h3>
```

# 5 Sort by Name

```javascript
// inside SteamApp
self.sortByName = function() {
  self.apps.sort(function(left, right) {
    if (left.name() == right.name())
      return 0;
    else
      if (left.name() < right.name())
        return -1;
      else
        return 1;
  });
}
```

```html
<!-- above form -->
<button class="btn pull-right" data-bind="click: sortByName">
  Sort by Name
</button>
```

# 6 Sort by Current Players

```javascript
// inside SteamApp
self.sortByCurrentPlayers = function() {
  self.apps.sort(function(left, right) {
    if (left.currentPlayers() == right.currentPlayers())
      return 0;
    else
      if (left.currentPlayers() < right.currentPlayers())
        return 1;
      else
        return -1;        
  })
}
```

```html
<!-- above form and below Sort By Name -->
<button style="margin-right: 4px" 
        class="btn pull-right" 
        data-bind="click: sortByCurrentPlayers">
  Sort by Current Players
</button>
```

# 7 News 

```javascript
// inside SteamApp
self.newsItems = ko.observableArray([]);
self.getMoreDetails = function() {
  SteamApi.getNews(self.id(), function(data) {
    var news = _.map(data, function(d) { return new NewsItem(d); });
    self.newsItems(news);
  });
}
```

```html
<!-- add click binding to name -->
<h3>
  <span data-bind="text: name, click: getMoreDetails"></span>
  <small>
    <span data-bind="text: currentPlayers"></span>
  </small>
</h3>

<!-- News section -->
<div class="span6" data-bind="visible: newsItems().length > 0">
  <h4>News</h4>
  <ul class="unstyled" data-bind="foreach: newsItems">
    <li>
      <a data-bind="text: title, attr: { href: url }"></a>                
      <p data-bind="html: contents"></p>
    </li>
  </ul>
</div>
```

# 8 Achievements

```javascript
var Achievement = function(data) {
  var self = this;
  self.name = ko.observable(data.name);
  self.percent = ko.observable(data.percent);
  self.progress = ko.computed(function() {
    return Math.round(self.percent()) + "%";
  });

  return self;
}
```

```javascript
// inside SteamApp
self.newsItems = ko.observableArray([]);
self.achievements = ko.observableArray([]);
self.getMoreDetails = function() {
  SteamApi.getNews(self.id(), function(data) {
    var news = _.map(data, function(d) { return new NewsItem(d); });
    self.newsItems(news);
  });
  SteamApi.getAchievements(self.id(), function(data) {
    var achievements = _.map(data, function(d) { return new Achievement(d); });
    self.achievements(achievements);
  })
}
```

```html
<!-- below News section -->
<div class="span4" data-bind="visible: achievements().length > 0">
  <h4>Achievements</h4>
  <ul class="unstyled" data-bind="foreach: achievements">
    <li>
      <span data-bind="text: name"></span>                  
      <span class="pull-right" data-bind="text: progress"></span>                  
      <div class="progress">
        <div class="bar" data-bind="style: { width: progress }"></div>
      </div>
    </li>
  <ul>
</div>
```