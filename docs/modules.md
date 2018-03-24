## Modules

<dl>
<dt><a href="#module_system">system</a></dt>
<dd><p>system/system.js</p>
</dd>
<dt><a href="#module_app">app</a></dt>
<dd></dd>
<dt><a href="#module_server">server</a></dt>
<dd><p>Server pipeline</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#initRecursion">initRecursion(rootDir, sourceObject, sourceKey, targetObject)</a> ℗</dt>
<dd></dd>
</dl>

<a name="module_system"></a>

## system
system/system.js


* [system](#module_system)
    * [~System](#module_system..System) ⇐ [<code>Loader</code>](#module_system..Loader)
        * [new System(id, rootDir, relativeInitDir, initFilename, [behaviors])](#new_module_system..System_new)
        * _instance_
            * [.systemErrorLevel](#module_system..System+systemErrorLevel)
            * [._addBehaviors([behaviors])](#module_system..System+_addBehaviors) ℗
            * [.log(text)](#module_system..System+log)
            * [.fire(name, [message])](#module_system..System+fire)
            * [.processNewSystemError(code, message)](#module_system..System+processNewSystemError)
            * [.processError(error)](#module_system..System+processError)
        * _static_
            * [.error(text)](#module_system..System.error)
            * [.log(text)](#module_system..System.log)
    * [~Loader](#module_system..Loader)
        * [new Loader(rootDir, relativeInitDir, initFilename)](#new_module_system..Loader_new)
    * [~SystemError](#module_system..SystemError) ⇐ <code>Error</code> ℗
        * [new SystemError()](#new_module_system..SystemError_new)

<a name="module_system..System"></a>

### system~System ⇐ [<code>Loader</code>](#module_system..Loader)
Provides wide range of functionality

**Kind**: inner class of [<code>system</code>](#module_system)  
**Extends**: [<code>Loader</code>](#module_system..Loader)  

* [~System](#module_system..System) ⇐ [<code>Loader</code>](#module_system..Loader)
    * [new System(id, rootDir, relativeInitDir, initFilename, [behaviors])](#new_module_system..System_new)
    * _instance_
        * [.systemErrorLevel](#module_system..System+systemErrorLevel)
        * [._addBehaviors([behaviors])](#module_system..System+_addBehaviors) ℗
        * [.log(text)](#module_system..System+log)
        * [.fire(name, [message])](#module_system..System+fire)
        * [.processNewSystemError(code, message)](#module_system..System+processNewSystemError)
        * [.processError(error)](#module_system..System+processError)
    * _static_
        * [.error(text)](#module_system..System.error)
        * [.log(text)](#module_system..System.log)

<a name="new_module_system..System_new"></a>

#### new System(id, rootDir, relativeInitDir, initFilename, [behaviors])
The constructor will perform necessary preparations, so that failures can be processed with system events. Up until these preparations are complete, the failure will result in thrown standard Error.

**Throws**:

- <code>Error</code> Throws standard error if failed to perform basic initializations, or system failure that cannot be reported has occured


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | System instace internal ID |
| rootDir | <code>string</code> | The root directory for the System instance |
| relativeInitDir | <code>string</code> | The relative directory to root of the location of the initialization file |
| initFilename | <code>string</code> | Initialization file filename |
| [behaviors] | <code>object</code> | [Optional] Behaviors to add in format `{"behavior_name":()=>{function_body}}`. |

<a name="module_system..System+systemErrorLevel"></a>

#### system.systemErrorLevel
**Kind**: instance property of [<code>System</code>](#module_system..System)  
<a name="module_system..System+_addBehaviors"></a>

#### system._addBehaviors([behaviors]) ℗
Attempts to add behaviors

**Kind**: instance method of [<code>System</code>](#module_system..System)  
**Throws**:

- <code>Error</code> Standard error

**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| [behaviors] | <code>object</code> | [Optional] Object with behaviors, if not provided, nothing will be done |

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

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| [message] | <code>string</code> | 

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

<a name="module_system..System.error"></a>

#### System.error(text)
Static System function to access stderr

**Kind**: static method of [<code>System</code>](#module_system..System)  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="module_system..System.log"></a>

#### System.log(text)
**Kind**: static method of [<code>System</code>](#module_system..System)  
**Read only**: true  

| Param | Type |
| --- | --- |
| text | <code>any</code> | 

<a name="module_system..Loader"></a>

### system~Loader
**Kind**: inner class of [<code>system</code>](#module_system)  
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
**See**: module:system  

* [app](#module_app)
    * [~App](#module_app..App) ⇐ [<code>System</code>](#module_system..System)
        * [new App(id, rootDir)](#new_module_app..App_new)
        * [.systemErrorLevel](#module_system..System+systemErrorLevel)
        * [._addBehaviors([behaviors])](#module_system..System+_addBehaviors) ℗
        * [.log(text)](#module_system..System+log)
        * [.fire(name, [message])](#module_system..System+fire)
        * [.processNewSystemError(code, message)](#module_system..System+processNewSystemError)
        * [.processError(error)](#module_system..System+processError)

<a name="module_app..App"></a>

### app~App ⇐ [<code>System</code>](#module_system..System)
**Kind**: inner class of [<code>app</code>](#module_app)  
**Extends**: [<code>System</code>](#module_system..System)  

* [~App](#module_app..App) ⇐ [<code>System</code>](#module_system..System)
    * [new App(id, rootDir)](#new_module_app..App_new)
    * [.systemErrorLevel](#module_system..System+systemErrorLevel)
    * [._addBehaviors([behaviors])](#module_system..System+_addBehaviors) ℗
    * [.log(text)](#module_system..System+log)
    * [.fire(name, [message])](#module_system..System+fire)
    * [.processNewSystemError(code, message)](#module_system..System+processNewSystemError)
    * [.processError(error)](#module_system..System+processError)

<a name="new_module_app..App_new"></a>

#### new App(id, rootDir)

| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| rootDir | <code>string</code> | 

<a name="module_system..System+systemErrorLevel"></a>

#### app.systemErrorLevel
**Kind**: instance property of [<code>App</code>](#module_app..App)  
<a name="module_system..System+_addBehaviors"></a>

#### app._addBehaviors([behaviors]) ℗
Attempts to add behaviors

**Kind**: instance method of [<code>App</code>](#module_app..App)  
**Throws**:

- <code>Error</code> Standard error

**Access**: private  

| Param | Type | Description |
| --- | --- | --- |
| [behaviors] | <code>object</code> | [Optional] Object with behaviors, if not provided, nothing will be done |

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

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| [message] | <code>string</code> | 

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

<a name="initRecursion"></a>

## initRecursion(rootDir, sourceObject, sourceKey, targetObject) ℗
**Kind**: global function  
**Access**: private  

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
