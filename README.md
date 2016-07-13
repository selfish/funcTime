# funcTime

funcTime is a debug utility that wraps around a method and utilizes `console.time/End()`
in order to provide a more sophisticated timing functionality.

    npm install functime --save-dev

## Quick Examples

####Internal flow (wrapping the callback from within the caller):
```javascript

function doStuffWithFiles(['file1','file2','file3'], callback){
    callback = callback.time("FilesProcess");

    // Do some async operations..

    // Callback will be called normally.
    callback(err, result);
}

// Console shows:
// → [INFO] console - FilesProcess: 330ms (avg: 295ms across 6 calls)
// Also: callback.$execTime is 330.

```

####External flow (wrapping from outside, when calling):
```javascript

var pkg = require('somePackage');
// Assume pkg has a function 'func' that gets a callback:

function callback(){...}

pkg.func(callback.time("Timing package.func"));
//OR Annonymously:

pkg.func(function(){
    //...
}.time("Timing package.func"));

```


## Documentation

### Methods

* [`time`](#time)

#### Wrapped function methods

* [`$execTime`](#execTime)
* [`$execTimeAvg`](#execTimeAvg)
* [`$execTimeMax`](#execTimeMax)
* [`$execTimeMin`](#execTimeMin)
* [`$execCount`](#execCount)


<a name="time" />
### Function.time([label])

Times and logs time passed until execution of callback.
Keeps stats across calls as well.

__Arguments__

* `label` - (optional) The label to print when reporting time. If not provided, function name will be used.
* `callback` - A callback to report to log when called.

__Example__


```js
function getAppIDs(cb) {
    // Callback is called normally:
    cb = cb.time("getApps execution measure");

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

<a name="execTime" />
### Function.$execTime()

Returns last call logged time.

__Example__


```js
function do(){}
do = do.time("Do!");
do();

console.log("Method do() took: %sms", do.$execTime())
// → "Method do() took: 550ms"

```

---------------------------------------

<a name="execTimeAvg" />
### Function.$execTimeAvg()

Returns average logged time.

__Example__


```js
function do(){}
do = do.time("Do!");
do();

console.log("Method do() took %sms on average", do.$execTimeAvg())
// → "Method do() took: 550ms on average"

```

---------------------------------------

<a name="execTimeMax" />
### Function.$execTimeMax()

Returns maximal logged time.

__Example__


```js
function do(){}
do = do.time("Do!");
do();

console.log("Method do() took: %sms on it's longest run.", do.$execTimeMin())
// → "Method do() took: 2345ms on it's longest run."

```

---------------------------------------

<a name="execTimeMin" />
### Function.$execTimeMin()

Returns minimal logged time.

__Example__


```js
function do(){}
do = do.time("Do!");
do();

console.log("Method do() took: %sms on it's shortest run.", do.$execTimeMin())
// → "Method do() took: 2ms on it's shortest run."

```

---------------------------------------

<a name="execCount" />
### Function.$execCount()

Returns amount of times function was called (amount of executions).

__Example__


```js
function do(){}
do = do.time("Do!");
do();

console.log("Method do() called %s times", do.$execCount())
// → "Method do() called 5 times"

```

---------------------------------------


## Coming Up (TDL)

1. Config object:
   * `silent`: (_false_)
   * `logLevel`: (_debug_) warn-trace
   * `rounding`: (_2_) errParam:0
   * Completely turn off
2. Support for annonymous functions
3. Add flush method & label clear.
4. Full report printing.
5. Parallel calls support.
