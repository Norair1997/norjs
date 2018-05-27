# Changelog

# v0.0.3 - 2018-05-27

## Added 


## Changed

- nor.createObject(type, config)
-- The <style> attribute can be written inside the config object

- Pass an array of selectors like =>
```javascript
	nor.event([myDiv, "#foo", ".bar"], ["clicl", "focus"], [clickFunction, whateverFunc]);
```