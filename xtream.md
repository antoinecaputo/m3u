# Xtream Code API Specifications

## Authentication
```
player_api.php?username=USERNAME&password=PASSWORD
```

## Live

### Categories
```
player_api.php?action=get_live_categories
```

### Streams
```
player_api.php?action=get_live_streams&category_id=CATEGORY_ID
```
or
```
player_api.php?action=get_live_streams
```

### Short EPG
```
player_api.php?action=get_short_epg&stream_id=STREAM_ID
```
or
```
player_api.php?action=get_short_epg&stream_id=STREAM_ID&limit=LIMIT
```

### All EPG
```
player_api.php?action=get_simple_data_table&stream_id=STREAM_ID
```
or full list for all streams
```
xmltv.php?
```

## VOD

### Categories
```
player_api.php?action=get_vod_categories
```

### Streams
```
player_api.php?action=get_vod_streams
```
or
```
player_api.php?action=get_vod_streams&category_id=CATEGORY_ID
```

### Info
This will get info such as video codecs, duration, description, directors for 1 VOD
```
player_api.php?action=get_vod_info&vod_id=VOD_ID
```


## Series

### Categories
```
player_api.php?action=get_series_categories
```

### Streams
```
player_api.php?action=get_series
```
or
```
player_api.php?action=get_series&category_id=CATEGORY_ID
```

### Info
```
player_api.php?action=get_series_info&series_id=SERIES_ID
```




---
Source: https://xtream-ui.org/api-xtreamui-xtreamcode/

https://github.com/AndreyPavlenko/Fermata/discussions/434
