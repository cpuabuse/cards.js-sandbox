## Modules

<dl>
<dt><a href="#module_system">system</a></dt>
<dd><p>system/system.js</p>
</dd>
<dt><a href="#module_app">app</a></dt>
<dd><p>server/app.js</p>
</dd>
<dt><a href="#module_server">server</a></dt>
<dd><p>Server pipeline</p>
</dd>
</dl>

<a name="module_system"></a>

## system
system/system.js


* [system](#module_system)
    * [~System](#module_system..System) ⇐ [<code>Loader</code>](#module_system..Loader)
        * [new System(id, rootDir, relativeInitDir, initFilename, [behaviors])](#new_module_system..System_new)
        * _instance_
            * *[.events](#module_system..System+events)*
            * [.system](#module_system..System+system)
                * [.id](#module_system..System+system.id)
                * [.rootDir](#module_system..System+system.rootDir)
                * [.initFilename](#module_system..System+system.initFilename)
                * [.relativeInitDir](#module_system..System+system.relativeInitDir)
                * [.behavior](#module_system..System+system.behavior) ℗
            * [.addBehaviors(behaviors)](#module_system..System+addBehaviors)
            * [.log(text)](#module_system..System+log)
            * [.fire(name, [message])](#module_system..System+fire)
            * [.processNewSystemError(code, message)](#module_system..System+processNewSystemError)
            * [.processError(error)](#module_system..System+processError)
            * [.behave(event)](#module_system..System+behave)
        * _inner_
            * [~error(text)](#module_system..System..error)
            * [~log(text)](#module_system..System..log)
    * [~Loader](#module_system..Loader) ℗
        * [new Loader(rootDir, relativeInitDir, initFilename)](#new_module_system..Loader_new)
        * [~initRecursion(rootDir, sourceObject, sourceKey, targetObject)](#module_system..Loader..initRecursion)
        * [~initSettings(initPath, filename)](#module_system..Loader..initSettings) ⇒ <code>object</code>
    * [~SystemError](#module_system..SystemError) ⇐ <code>Error</code> ℗
        * [new SystemError()](#new_module_system..SystemError_new)

<a name="module_system..System"></a>

### system~System ⇐ [<code>Loader</code>](#module_system..Loader)
Provides wide range of functionality for file loading and event exchange.

**Kind**: inner class of [<code>system</code>](#module_system)  
**Extends**: [<code>Loader</code>](#module_system..Loader)  
**Emits**: <code>event:system_load</code>  

* [~System](#module_system..System) ⇐ [<code>Loader</code>](#module_system..Loader)
    * [new System(id, rootDir, relativeInitDir, initFilename, [behaviors])](#new_module_system..System_new)
    * _instance_
        * *[.events](#module_system..System+events)*
        * [.system](#module_system..System+system)
            * [.id](#module_system..System+system.id)
            * [.rootDir](#module_system..System+system.rootDir)
            * [.initFilename](#module_system..System+system.initFilename)
            * [.relativeInitDir](#module_system..System+system.relativeInitDir)
            * [.behavior](#module_system..System+system.behavior) ℗
        * [.addBehaviors(behaviors)](#module_system..System+addBehaviors)
        * [.log(text)](#module_system..System+log)
        * [.fire(name, [message])](#module_system..System+fire)
        * [.processNewSystemError(code, message)](#module_system..System+processNewSystemError)
        * [.processError(error)](#module_system..System+processError)
        * [.behave(event)](#module_system..System+behave)
    * _inner_
        * [~error(text)](#module_system..System..error)
        * [~log(text)](#module_system..System..log)

<a name="new_module_system..System_new"></a>

#### new System(id, rootDir, relativeInitDir, initFilename, [behaviors])
The constructor will perform necessary preparations, so that failures can be processed with system events. Up until these preparations are complete, the failure will result in thrown standard Error.

**Throws**:

- <code>Error</code> Throws standard error if failed to perform basic initializations, or system failure that cannot be reported otherwise has occured


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | System instace internal ID |
| rootDir | <code>string</code> | The root directory for the System instance |
| relativeInitDir | <code>string</code> | The relative directory to root of the location of the initialization file |
| initFilename | <code>string</code> | Initialization file filename |
| [behaviors] | <code>object</code> | [Optional] Behaviors to add in format `{"behavior_name":()=>{function_body}}`. |

<a name="module_system..System+events"></a>

#### *system.events*
Events to be populated by loader.

**Kind**: instance abstract property of [<code>System</code>](#module_system..System)  
<a name="module_system..System+system"></a>

#### system.system
Contains system info.

**Kind**: instance property of [<code>System</code>](#module_system..System)  

* [.system](#module_system..System+system)
    * [.id](#module_system..System+system.id)
    * [.rootDir](#module_system..System+system.rootDir)
    * [.initFilename](#module_system..System+system.initFilename)
    * [.relativeInitDir](#module_system..System+system.relativeInitDir)
    * [.behavior](#module_system..System+system.behavior) ℗

<a name="module_system..System+system.id"></a>

##### system.id
Instance identifier.

**Kind**: static property of [<code>system</code>](#module_system..System+system)  
<a name="module_system..System+system.rootDir"></a>

##### system.rootDir
Root directory; In general, expecting an absolute path.

**Kind**: static property of [<code>system</code>](#module_system..System+system)  
<a name="module_system..System+system.initFilename"></a>

##### system.initFilename
Initial filename.

**Kind**: static property of [<code>system</code>](#module_system..System+system)  
<a name="module_system..System+system.relativeInitDir"></a>

##### system.relativeInitDir
Relative directory for the settings file.

**Kind**: static property of [<code>system</code>](#module_system..System+system)  
<a name="module_system..System+system.behavior"></a>

##### system.behavior ℗
Event emitter for the behaviors.

**Kind**: static property of [<code>system</code>](#module_system..System+system)  
**Access**: private  
<a name="module_system..System+addBehaviors"></a>

#### system.addBehaviors(behaviors)
Adds behaviors to the system, and fires post-addtion events.
Firstly, this function attempts to add the behaviors.
When the behavior addition has been processed, the function will attempt to fire post-addition events, depending on success/failure of behavior additions.
Logically the two stage separation should be done with promises, but due to huge overhead of promises and low total processing required, it will be simplified to syncronous.

**Kind**: instance method of [<code>System</code>](#module_system..System)  
**Emits**: <code>event:behavior_attach</code>, <code>event:behavior_attach_fail</code>, <code>event:behavior_attach_request_fail</code>  

| Param | Type |
| --- | --- |
| behaviors | <code>array</code> | 

<a name="module_system..System+log"></a>

#### system.log(text)
Log message from the System context

**Kind**: instance method of [<code>System</code>](#module_system..System)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Message |

<a name="module_system..System+fire"></a>

#### system.fire(name, [message])
Fires a system event

**Kind**: instance method of [<code>System</code>](#module_system..System)  
**Throws**:

- <code>Error</code> Will throw "error_hell". The inability to process error - if event_fail event fails.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| [message] | <code>string</code> | [Optional] Message is not strictly required, but preferred. If not specified, will assume value of the name |

<a name="module_system..System+processNewSystemError"></a>

#### system.processNewSystemError(code, message)
Create and process an error

**Kind**: instance method of [<code>System</code>](#module_system..System)  

| Param | Type |
| --- | --- |
| code | <code>string</code> | 
| message | <code>string</code> | 

<a name="module_system..System+processError"></a>

#### system.processError(error)
Process a system error - log, behavior or further throw

**Kind**: instance method of [<code>System</code>](#module_system..System)  

| Param | Type | Description |
| --- | --- | --- |
| error | [<code>SystemError</code>](#module_system..SystemError) \| <code>string</code> | SystemError error or error text |

<a name="module_system..System+behave"></a>

#### system.behave(event)
Emit an event as a behavior.

**Kind**: instance method of [<code>System</code>](#module_system..System)  

| Param | Type |
| --- | --- |
| event | <code>event</code> | 

<a name="module_system..System..error"></a>

#### System~error(text)
Access stderr

**Kind**: inner method of [<code>System</code>](#module_system..System)  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="module_system..System..log"></a>

#### System~log(text)
Access stdout

**Kind**: inner method of [<code>System</code>](#module_system..System)  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="module_system..Loader"></a>

### system~Loader ℗
**Kind**: inner class of [<code>system</code>](#module_system)  
**Access**: private  

* [~Loader](#module_system..Loader) ℗
    * [new Loader(rootDir, relativeInitDir, initFilename)](#new_module_system..Loader_new)
    * [~initRecursion(rootDir, sourceObject, sourceKey, targetObject)](#module_system..Loader..initRecursion)
    * [~initSettings(initPath, filename)](#module_system..Loader..initSettings) ⇒ <code>object</code>

<a name="new_module_system..Loader_new"></a>

#### new Loader(rootDir, relativeInitDir, initFilename)
Required by system to perform file carcass initialization

**Throws**:

- <code>Error</code> Standard error with message


| Param | Type |
| --- | --- |
| rootDir | <code>string</code> | 
| relativeInitDir | <code>string</code> | 
| initFilename | <code>string</code> | 

<a name="module_system..Loader..initRecursion"></a>

#### Loader~initRecursion(rootDir, sourceObject, sourceKey, targetObject)
**Kind**: inner method of [<code>Loader</code>](#module_system..Loader)  

| Param | Type |
| --- | --- |
| rootDir | <code>string</code> | 
| sourceObject | <code>object</code> | 
| sourceKey | <code>string</code> | 
| targetObject | <code>object</code> | 

**Example** *(Default filename - null)*  
```yaml
# Variable settings to be populated with data from "./settings.yml"
[settings:]
```
**Example** *(Default filename - empty string)*  
```yaml
# Variable settings to be populated with data from "./settings.yml"
[settings: ""] 
```
**Example** *(Specified filename)*  
```yaml
# Variable settings to be populated with data from ".\xxx.yml"
[settings: "xxx"]
```
**Example** *(Default extension)*  
```yaml
# The "extension"(recursion) with default variables will be assumed, so that variable "settings" will be recursively populated with files located in "settings/settings.yml"
settings:
  folder:
  file:
  name:
  path: # Note: path may be either absolute(default) or relative(relative to the folder from which the file containing instructions is read), the system will not read files outside of system_root_dir tree.
```
**Example** *(Specified extension)*  
```yaml
# The  "extension"(recursion) with only specified variables will be performed, in this example "settings" variable will be populated with the files described in the "system_root_dir/hello/settings.yml"
settings:
  folder: "hello"
  file:
  name:
  path: # Note: path may be either absolute(default) or relative(relative to the folder from which the file containing instructions is read), the system will not read files outside of system_root_dir tree.
```
<a name="module_system..Loader..initSettings"></a>

#### Loader~initSettings(initPath, filename) ⇒ <code>object</code>
Init and populate globalspace with settings - specific global object member per file

**Kind**: inner method of [<code>Loader</code>](#module_system..Loader)  

| Param | Type |
| --- | --- |
| initPath | <code>string</code> | 
| filename | <code>string</code> | 

<a name="module_system..SystemError"></a>

### system~SystemError ⇐ <code>Error</code> ℗
**Kind**: inner class of [<code>system</code>](#module_system)  
**Extends**: <code>Error</code>  
**Access**: private  
<a name="new_module_system..SystemError_new"></a>

#### new SystemError()
Extended system error class

<a name="module_app"></a>

## app
server/app.js


* [app](#module_app)
    * [~App](#module_app..App) ⇐ [<code>System</code>](#module_system..System)
        * [new App(id, rootDir)](#new_module_app..App_new)
        * *[.events](#module_system..System+events)*
        * [.system](#module_system..System+system)
        * [.addBehaviors(behaviors)](#module_system..System+addBehaviors)
        * [.log(text)](#module_system..System+log)
        * [.fire(name, [message])](#module_system..System+fire)
        * [.processNewSystemError(code, message)](#module_system..System+processNewSystemError)
        * [.processError(error)](#module_system..System+processError)
        * [.behave(event)](#module_system..System+behave)

<a name="module_app..App"></a>

### app~App ⇐ [<code>System</code>](#module_system..System)
**Kind**: inner class of [<code>app</code>](#module_app)  
**Extends**: [<code>System</code>](#module_system..System)  

* [~App](#module_app..App) ⇐ [<code>System</code>](#module_system..System)
    * [new App(id, rootDir)](#new_module_app..App_new)
    * *[.events](#module_system..System+events)*
    * [.system](#module_system..System+system)
    * [.addBehaviors(behaviors)](#module_system..System+addBehaviors)
    * [.log(text)](#module_system..System+log)
    * [.fire(name, [message])](#module_system..System+fire)
    * [.processNewSystemError(code, message)](#module_system..System+processNewSystemError)
    * [.processError(error)](#module_system..System+processError)
    * [.behave(event)](#module_system..System+behave)

<a name="new_module_app..App_new"></a>

#### new App(id, rootDir)

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| rootDir | <code>string</code> | 

<a name="module_system..System+events"></a>

#### *app.events*
Events to be populated by loader.

**Kind**: instance abstract property of [<code>App</code>](#module_app..App)  
<a name="module_system..System+system"></a>

#### app.system
Contains system info.

**Kind**: instance property of [<code>App</code>](#module_app..App)  
<a name="module_system..System+addBehaviors"></a>

#### app.addBehaviors(behaviors)
Adds behaviors to the system, and fires post-addtion events.
Firstly, this function attempts to add the behaviors.
When the behavior addition has been processed, the function will attempt to fire post-addition events, depending on success/failure of behavior additions.
Logically the two stage separation should be done with promises, but due to huge overhead of promises and low total processing required, it will be simplified to syncronous.

**Kind**: instance method of [<code>App</code>](#module_app..App)  
**Emits**: <code>event:behavior_attach</code>, <code>event:behavior_attach_fail</code>, <code>event:behavior_attach_request_fail</code>  

| Param | Type |
| --- | --- |
| behaviors | <code>array</code> | 

<a name="module_system..System+log"></a>

#### app.log(text)
Log message from the System context

**Kind**: instance method of [<code>App</code>](#module_app..App)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Message |

<a name="module_system..System+fire"></a>

#### app.fire(name, [message])
Fires a system event

**Kind**: instance method of [<code>App</code>](#module_app..App)  
**Throws**:

- <code>Error</code> Will throw "error_hell". The inability to process error - if event_fail event fails.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| [message] | <code>string</code> | [Optional] Message is not strictly required, but preferred. If not specified, will assume value of the name |

<a name="module_system..System+processNewSystemError"></a>

#### app.processNewSystemError(code, message)
Create and process an error

**Kind**: instance method of [<code>App</code>](#module_app..App)  

| Param | Type |
| --- | --- |
| code | <code>string</code> | 
| message | <code>string</code> | 

<a name="module_system..System+processError"></a>

#### app.processError(error)
Process a system error - log, behavior or further throw

**Kind**: instance method of [<code>App</code>](#module_app..App)  

| Param | Type | Description |
| --- | --- | --- |
| error | [<code>SystemError</code>](#module_system..SystemError) \| <code>string</code> | SystemError error or error text |

<a name="module_system..System+behave"></a>

#### app.behave(event)
Emit an event as a behavior.

**Kind**: instance method of [<code>App</code>](#module_app..App)  

| Param | Type |
| --- | --- |
| event | <code>event</code> | 

<a name="module_server"></a>

## server
Server pipeline


* [server](#module_server)
    * [~Server](#module_server..Server)
        * [new Server([app])](#new_module_server..Server_new)
        * [.startServer()](#module_server..Server+startServer)
        * [.addApp(app)](#module_server..Server+addApp)
        * [.removeApp(app)](#module_server..Server+removeApp)
        * [.startApp(app)](#module_server..Server+startApp)
        * [.stopApp(app)](#module_server..Server+stopApp)
        * [.reconstructRouteTable()](#module_server..Server+reconstructRouteTable)
    * [~pathToArray(url)](#module_server..pathToArray) ⇒ <code>Array</code> ℗
    * [~processRequest(request, response, server)](#module_server..processRequest) ℗

<a name="module_server..Server"></a>

### server~Server
Server or "listener"

**Kind**: inner class of [<code>server</code>](#module_server)  

* [~Server](#module_server..Server)
    * [new Server([app])](#new_module_server..Server_new)
    * [.startServer()](#module_server..Server+startServer)
    * [.addApp(app)](#module_server..Server+addApp)
    * [.removeApp(app)](#module_server..Server+removeApp)
    * [.startApp(app)](#module_server..Server+startApp)
    * [.stopApp(app)](#module_server..Server+stopApp)
    * [.reconstructRouteTable()](#module_server..Server+reconstructRouteTable)

<a name="new_module_server..Server_new"></a>

#### new Server([app])

| Param | Type | Description |
| --- | --- | --- |
| [app] | [<code>App</code>](#module_app..App) | [Optional] App to instantiate on server creation |

<a name="module_server..Server+startServer"></a>

#### server.startServer()
Start the server

**Kind**: instance method of [<code>Server</code>](#module_server..Server)  
<a name="module_server..Server+addApp"></a>

#### server.addApp(app)
Add an app to the server app pool

**Kind**: instance method of [<code>Server</code>](#module_server..Server)  

| Param | Type |
| --- | --- |
| app | [<code>App</code>](#module_app..App) | 

<a name="module_server..Server+removeApp"></a>

#### server.removeApp(app)
Stop and remove the app from the app pool, then reconstruct the routing table

**Kind**: instance method of [<code>Server</code>](#module_server..Server)  

| Param | Type |
| --- | --- |
| app | [<code>App</code>](#module_app..App) | 

<a name="module_server..Server+startApp"></a>

#### server.startApp(app)
Start the app from the pool

**Kind**: instance method of [<code>Server</code>](#module_server..Server)  

| Param | Type |
| --- | --- |
| app | [<code>App</code>](#module_app..App) | 

<a name="module_server..Server+stopApp"></a>

#### server.stopApp(app)
Stop the app from the pool

**Kind**: instance method of [<code>Server</code>](#module_server..Server)  

| Param | Type |
| --- | --- |
| app | [<code>App</code>](#module_app..App) | 

<a name="module_server..Server+reconstructRouteTable"></a>

#### server.reconstructRouteTable()
Reconstruct the routing table to correspond to the modified app pool

**Kind**: instance method of [<code>Server</code>](#module_server..Server)  
<a name="module_server..pathToArray"></a>

### server~pathToArray(url) ⇒ <code>Array</code> ℗
**Kind**: inner method of [<code>server</code>](#module_server)  
**Access**: private  

| Param | Type |
| --- | --- |
| url | <code>any</code> | 

<a name="module_server..processRequest"></a>

### server~processRequest(request, response, server) ℗
Processes the request; currently is performing a role of a route table as well

**Kind**: inner method of [<code>server</code>](#module_server)  
**Access**: private  

| Param | Type |
| --- | --- |
| request | <code>any</code> | 
| response | <code>any</code> | 
| server | <code>any</code> | 

