# funcTime

funcTime is a debug utility that wraps around a method and utilizes `console.time/End()`
in order to provide a more sophisticated timing functionality.
Recommended to install globally:

    npm install -g functime

## Quick Example

```javascript

function doStuffWithFiles(['file1','file2','file3'], callback){
    callback = callback.time("FilesProcess");

    // Do some async operations..

    // Callback will be called normally, console will log execution time for doStuffWithFiles().
    callback(err, result);
}

// Console will show:
// → [INFO] console - FilesProcess: 330ms (avg: 295ms across 6 calls)
// Also: callback.$execTime is 330.

```


## Documentation

### Methods

* [`cb`](#cb)

<a name="cb" />
### cb(label, callback)

Times and logs time passed until execution of callback.
Keeps stats across calls as well.

__Arguments__

* `label` - The label to print when reporting time.
* `callback` - A callback to report to log when called.

__Example__


```js
function getAppIDs(cb) {
    // Callback is called normally:
    cb = functime.cb("getApps execution measure", cb);

    sqlGet("SELECT `app_id` FROM `apps` ", function (err, rows) {
        if (err) {
            cb(err);
            return;
        }
        var result = [];
        rows.forEach(function(row){
          result.push(row.app_id);
        });
        // Callback is called normally:
        cb(null, result);
    });
}

// Console will show:
// → [INFO] console - getApps execution measure: 330ms (avg: 295ms across 6 calls)
// Also: callback.$execTime is now 330.

```

---------------------------------------

## Coming Up (TDL)

1. Analytic tools:
   * get last execution result for label.
   * Get avg for label.
   * Get calls for label.
2. Implement functime.cb(obj, "function", function stub(){})
3. Config object: {
   * `silent`: _false_,
   * `logLevel`: _debug_, warn-trace
   * `rounding`: _2_, errParam:0
}
4. Poo