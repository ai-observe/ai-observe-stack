"use strict";
(self["webpackChunkvelodb_doris_app"] = self["webpackChunkvelodb_doris_app"] || []).push([[749],{

/***/ 6472
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ withErrorHandler)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2149);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7045);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7708);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1712);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9071);
/* harmony import */ var _utils_query_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8957);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}







const GLOBAL_ERROR_KEY = 'global_request_error';
function showGlobalError(msg) {
    antd__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Ay.error({
        content: msg,
        key: GLOBAL_ERROR_KEY,
        duration: 3
    });
}
function getFirstResultError(data) {
    const results = data === null || data === void 0 ? void 0 : data.results;
    if (!results) {
        return undefined;
    }
    const refId = Object.keys(results).find((key)=>{
        var _results_key, _results_key1;
        return ((_results_key = results[key]) === null || _results_key === void 0 ? void 0 : _results_key.error) || ((_results_key1 = results[key]) === null || _results_key1 === void 0 ? void 0 : _results_key1.status) >= 400;
    });
    if (!refId) {
        return undefined;
    }
    return _object_spread({
        refId
    }, results[refId]);
}
function createBackendError(res, defaultMessage) {
    const resultError = getFirstResultError(res === null || res === void 0 ? void 0 : res.data);
    const err = new Error((0,_utils_query_error__WEBPACK_IMPORTED_MODULE_7__/* .getQueryErrorMessage */ .p)({
        data: res === null || res === void 0 ? void 0 : res.data,
        statusText: res === null || res === void 0 ? void 0 : res.statusText,
        message: defaultMessage
    }));
    err.name = 'BackendQueryError';
    err.data = res === null || res === void 0 ? void 0 : res.data;
    err.status = res === null || res === void 0 ? void 0 : res.status;
    err.statusText = res === null || res === void 0 ? void 0 : res.statusText;
    err.backendError = resultError === null || resultError === void 0 ? void 0 : resultError.error;
    err.backendStatus = resultError === null || resultError === void 0 ? void 0 : resultError.status;
    err.errorSource = resultError === null || resultError === void 0 ? void 0 : resultError.errorSource;
    err.refId = resultError === null || resultError === void 0 ? void 0 : resultError.refId;
    return err;
}
function isFailedResponse(res) {
    var _res_data, _res_data1;
    const status = Number(res === null || res === void 0 ? void 0 : res.status);
    const responseError = res === null || res === void 0 ? void 0 : (_res_data = res.data) === null || _res_data === void 0 ? void 0 : _res_data.error;
    return (res === null || res === void 0 ? void 0 : res.ok) === false || Number.isFinite(status) && status >= 400 || Boolean(responseError && !(res === null || res === void 0 ? void 0 : (_res_data1 = res.data) === null || _res_data1 === void 0 ? void 0 : _res_data1.results));
}
function withErrorHandler(source$, options) {
    const { showBackendError = true, defaultMessage = (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Request failed'), generatedSql } = options || {};
    return source$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__/* .map */ .T)((res)=>{
        const resultError = getFirstResultError(res === null || res === void 0 ? void 0 : res.data);
        if (isFailedResponse(res) || resultError) {
            throw createBackendError(res, defaultMessage);
        }
        return res;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__/* .catchError */ .W)((err)=>{
        const queryError = err instanceof Error ? err : Object.assign((0,_utils_errors__WEBPACK_IMPORTED_MODULE_6__/* .toError */ .i)(err), err && typeof err === 'object' ? err : {});
        if (generatedSql) {
            queryError.generatedSql = generatedSql;
        }
        (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_6__/* .toError */ .i)(queryError), {
            source: 'withErrorHandler'
        });
        if (showBackendError) {
            showGlobalError((0,_utils_query_error__WEBPACK_IMPORTED_MODULE_7__/* .getQueryErrorMessage */ .p)(queryError));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)(()=>queryError);
    }));
}


/***/ },

/***/ 2307
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useDatabaseTableSelection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7781);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_metaservice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8161);
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9071);






function readOptions(response, query) {
    var _response_data_results_query_frames, _response_data_results_query, _response_data_results, _response_data, _toDataFrame_fields_;
    const frame = response.ok && ((_response_data = response.data) === null || _response_data === void 0 ? void 0 : (_response_data_results = _response_data.results) === null || _response_data_results === void 0 ? void 0 : (_response_data_results_query = _response_data_results[query]) === null || _response_data_results_query === void 0 ? void 0 : (_response_data_results_query_frames = _response_data_results_query.frames) === null || _response_data_results_query_frames === void 0 ? void 0 : _response_data_results_query_frames[0]);
    if (!frame) {
        return [];
    }
    return Array.from(((_toDataFrame_fields_ = (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.toDataFrame)(frame).fields[0]) === null || _toDataFrame_fields_ === void 0 ? void 0 : _toDataFrame_fields_.values) || [], (value)=>({
            label: String(value),
            value: String(value)
        }));
}
// All list requests share a generation so an earlier datasource/database cannot
// restore its selections after the user has moved on.
function useDatabaseTableSelection(callbacks) {
    const latest = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(callbacks);
    latest.current = callbacks;
    const generation = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    const requests = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription());
    const [databasesLoading, setDatabasesLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [tablesLoading, setTablesLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const cancel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        generation.current += 1;
        requests.current.unsubscribe();
        requests.current = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription();
        return generation.current;
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>()=>{
            cancel();
        }, [
        cancel
    ]);
    const loadTables = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((datasource, database, request, preferences)=>{
        if (!database || !datasource) {
            return;
        }
        setTablesLoading(true);
        requests.current.add((0,_services_metaservice__WEBPACK_IMPORTED_MODULE_4__/* .getTablesService */ .Rw)({
            selectdbDS: datasource,
            database
        }).subscribe({
            next: (response)=>{
                var _options_find, _options_;
                if (generation.current !== request) {
                    return;
                }
                const options = readOptions(response, 'getTables');
                latest.current.setTables(options);
                const table = ((_options_find = options.find((option)=>option.value === preferences.table)) === null || _options_find === void 0 ? void 0 : _options_find.value) || ((_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value) || '';
                latest.current.onTableChange(datasource, database, table, preferences.timeField);
                setTablesLoading(false);
            },
            error: (error)=>{
                if (generation.current === request) {
                    setTablesLoading(false);
                    (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_5__/* .toError */ .i)(error), {
                        source: 'useDatabaseTableSelection',
                        action: 'getTables'
                    });
                }
            }
        }));
    }, []);
    const selectDatabase = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((datasource, database)=>{
        const request = cancel();
        setDatabasesLoading(false);
        setTablesLoading(false);
        latest.current.setTables([]);
        latest.current.onDatabaseChange(database);
        latest.current.onTableChange(datasource, database, '');
        loadTables(datasource, database, request, {});
    }, [
        cancel,
        loadTables
    ]);
    const selectDatasource = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((datasource, preferences = {})=>{
        const request = cancel();
        setDatabasesLoading(Boolean(datasource));
        setTablesLoading(false);
        latest.current.setDatabases([]);
        latest.current.setTables([]);
        latest.current.onDatabaseChange('');
        latest.current.onTableChange(datasource, '', '');
        if (!datasource) {
            return;
        }
        requests.current.add((0,_services_metaservice__WEBPACK_IMPORTED_MODULE_4__/* .getDatabases */ .Hm)(datasource).subscribe({
            next: (response)=>{
                var _options_find, _options_find1, _options_;
                if (generation.current !== request) {
                    return;
                }
                const options = readOptions(response, 'getDatabases');
                latest.current.setDatabases(options);
                const database = ((_options_find = options.find((option)=>option.value === preferences.database)) === null || _options_find === void 0 ? void 0 : _options_find.value) || ((_options_find1 = options.find((option)=>{
                    var _datasource_jsonData;
                    return option.value === ((_datasource_jsonData = datasource.jsonData) === null || _datasource_jsonData === void 0 ? void 0 : _datasource_jsonData.database);
                })) === null || _options_find1 === void 0 ? void 0 : _options_find1.value) || ((_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value) || '';
                latest.current.onDatabaseChange(database);
                setDatabasesLoading(false);
                loadTables(datasource, database, request, preferences);
            },
            error: (error)=>{
                if (generation.current === request) {
                    setDatabasesLoading(false);
                    (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_5__/* .toError */ .i)(error), {
                        source: 'useDatabaseTableSelection',
                        action: 'getDatabases'
                    });
                }
            }
        }));
    }, [
        cancel,
        loadTables
    ]);
    const cancelSelection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        cancel();
        setDatabasesLoading(false);
        setTablesLoading(false);
    }, [
        cancel
    ]);
    return {
        selectDatasource,
        selectDatabase,
        databasesLoading,
        tablesLoading,
        cancelSelection
    };
}


/***/ },

/***/ 7116
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bR: () => (/* binding */ SUPPORTED_DATASOURCE_TYPES),
/* harmony export */   ho: () => (/* binding */ filterDatasourcesByTeamPermissions),
/* harmony export */   jS: () => (/* binding */ fetchTeams),
/* harmony export */   lp: () => (/* binding */ fetchCurrentUserTeams),
/* harmony export */   qE: () => (/* binding */ isSupportedDatasourceType),
/* harmony export */   tH: () => (/* binding */ getMysqlDatasources),
/* harmony export */   vE: () => (/* binding */ DORIS_DATASOURCE_TYPE)
/* harmony export */ });
/* unused harmony export MYSQL_DATASOURCE_TYPE */
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_1__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}


const DORIS_DATASOURCE_TYPE = 'velodb-doris-datasource';
const MYSQL_DATASOURCE_TYPE = 'mysql';
const SUPPORTED_DATASOURCE_TYPES = [
    DORIS_DATASOURCE_TYPE,
    MYSQL_DATASOURCE_TYPE
];
function fetchCurrentUserTeams() {
    return _async_to_generator(function*() {
        const response = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.lastValueFrom)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.getBackendSrv)().fetch({
            url: '/api/user/teams',
            method: 'GET'
        }));
        return Array.isArray(response.data) ? response.data : [];
    })();
}
function fetchTeams() {
    return _async_to_generator(function*() {
        var _response_data;
        const response = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.lastValueFrom)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__.getBackendSrv)().fetch({
            url: '/api/teams/search?perpage=100&page=1',
            method: 'GET'
        }));
        return Array.isArray((_response_data = response.data) === null || _response_data === void 0 ? void 0 : _response_data.teams) ? response.data.teams : [];
    })();
}
function isSupportedDatasourceType(type) {
    return type !== undefined && SUPPORTED_DATASOURCE_TYPES.includes(type);
}
function getMysqlDatasources(datasources) {
    return datasources.filter((ds)=>isSupportedDatasourceType(ds.type));
}
function filterDatasourcesByTeamPermissions(datasources, teams, permissions = []) {
    const mysqlDatasources = getMysqlDatasources(datasources);
    if (teams.length === 0) {
        return mysqlDatasources;
    }
    const teamIds = new Set(teams.map((team)=>team.id));
    const allowedDatasourceUids = new Set();
    permissions.forEach((permission)=>{
        if (!teamIds.has(permission.teamId)) {
            return;
        }
        permission.datasourceUids.forEach((uid)=>{
            if (uid) {
                allowedDatasourceUids.add(uid);
            }
        });
    });
    return mysqlDatasources.filter((ds)=>allowedDatasourceUids.has(ds.uid));
}


/***/ },

/***/ 8161
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dr: () => (/* binding */ getInvertedIndexColumns),
/* harmony export */   GM: () => (/* binding */ getVariantPathSampleService),
/* harmony export */   H1: () => (/* binding */ getFieldsService),
/* harmony export */   Hm: () => (/* binding */ getDatabases),
/* harmony export */   RJ: () => (/* binding */ supportsJsonSearch),
/* harmony export */   Rw: () => (/* binding */ getTablesService),
/* harmony export */   U1: () => (/* binding */ getVariantFieldsService),
/* harmony export */   UD: () => (/* binding */ getApplicationValuesService),
/* harmony export */   bf: () => (/* binding */ getColumn),
/* harmony export */   pm: () => (/* binding */ supportsSearch),
/* harmony export */   rp: () => (/* binding */ supportsTryCast),
/* harmony export */   s1: () => (/* binding */ getIndexesService)
/* harmony export */ });
/* unused harmony exports getApplicationValuesSQL, getColumnFromFieldService */
/* harmony import */ var _utils_query_parser_column_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1945);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7781);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6472);
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9071);
/* harmony import */ var _utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2721);
/* harmony import */ var _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7116);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys, key, i;
    if (typeof Reflect !== "undefined" && Reflect.ownKeys) {
        sourceKeys = Reflect.ownKeys(Object(source));
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
        return target;
    }
    target = _object_without_properties_loose(source, excluded);
    if (Object.getOwnPropertySymbols) {
        sourceKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys = Object.getOwnPropertyNames(source), key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
    }
    return target;
}








const escapeSqlLiteral = (value)=>value.replace(/'/g, "''");
// Cache capability probes during a Grafana session. SEARCH results are scoped
// to the table and expression because its referenced fields need indexes.
const tryCastSupportCache = new Map();
const jsonSearchSupportCache = new Map();
const searchSupportCache = new Map();
function querySucceeded(data, refId) {
    var _data_results, _result_frames;
    const result = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : _data_results[refId];
    // Grafana can return an HTTP-success response containing a per-query error.
    // Treat that as an unsupported capability instead of trusting frames alone.
    return Boolean(result && !result.error && ((_result_frames = result.frames) === null || _result_frames === void 0 ? void 0 : _result_frames.length));
}
function supportsTryCast(_0) {
    return _async_to_generator(function*({ connectionId, datasourceType = _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE }) {
        if (!connectionId) {
            return false;
        }
        const cacheKey = `${datasourceType}:${connectionId}`;
        const cached = tryCastSupportCache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const supportPromise = (()=>_async_to_generator(function*() {
                const response$ = (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
                    url: '/api/ds/query',
                    method: 'POST',
                    data: {
                        queries: [
                            {
                                refId: 'probeTryCast',
                                datasource: {
                                    type: datasourceType,
                                    uid: connectionId
                                },
                                rawSql: 'SELECT TRY_CAST(1 AS BIGINT) AS try_cast_supported',
                                format: 'table'
                            }
                        ]
                    }
                }));
                try {
                    const { data, ok } = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.lastValueFrom)(response$);
                    return Boolean(ok && querySucceeded(data, 'probeTryCast'));
                } catch (unused) {
                    return false;
                }
            })())();
        tryCastSupportCache.set(cacheKey, supportPromise);
        return supportPromise;
    }).apply(this, arguments);
}
/** JSON_SEARCH is required to preserve Lucene text semantics for JSON arrays. */ function supportsJsonSearch(_0) {
    return _async_to_generator(function*({ connectionId, datasourceType = _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE }) {
        if (!connectionId) {
            return false;
        }
        const cacheKey = `${datasourceType}:${connectionId}`;
        const cached = jsonSearchSupportCache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const supportPromise = (()=>_async_to_generator(function*() {
                const response$ = (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
                    url: '/api/ds/query',
                    method: 'POST',
                    data: {
                        queries: [
                            {
                                refId: 'probeJsonSearch',
                                datasource: {
                                    type: datasourceType,
                                    uid: connectionId
                                },
                                rawSql: "SELECT JSON_SEARCH(CAST('[\"x\"]' AS JSON), 'one', 'x') AS json_search_supported",
                                format: 'table'
                            }
                        ]
                    }
                }));
                try {
                    const { data, ok } = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.lastValueFrom)(response$);
                    return Boolean(ok && querySucceeded(data, 'probeJsonSearch'));
                } catch (unused) {
                    return false;
                }
            })())();
        jsonSearchSupportCache.set(cacheKey, supportPromise);
        return supportPromise;
    }).apply(this, arguments);
}
/** Probe SEARCH against the current table and query because the function is a
 * WHERE predicate and each referenced field must have an inverted index. */ function supportsSearch(_0) {
    return _async_to_generator(function*({ connectionId, datasourceType = _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE, databaseName, tableName, query }) {
        if (!connectionId || !databaseName || !tableName || !query) {
            return false;
        }
        const cacheKey = JSON.stringify([
            datasourceType,
            connectionId,
            databaseName,
            tableName,
            query
        ]);
        const cached = searchSupportCache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const supportPromise = (()=>_async_to_generator(function*() {
                const response$ = (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
                    url: '/api/ds/query',
                    method: 'POST',
                    data: {
                        queries: [
                            {
                                refId: 'probeSearch',
                                datasource: {
                                    type: datasourceType,
                                    uid: connectionId
                                },
                                // SEARCH is a WHERE predicate and requires indexed fields in the scanned table.
                                // EXPLAIN validates the actual query without reading rows.
                                rawSql: `EXPLAIN SELECT 1 FROM ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)(databaseName)}.${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)(tableName)} WHERE SEARCH(${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .quoteSqlLiteral */ .Ck)(query)}, '{"mode":"lucene"}')`,
                                format: 'table'
                            }
                        ]
                    }
                }), {
                    showBackendError: false
                });
                try {
                    const { data, ok } = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.lastValueFrom)(response$);
                    return Boolean(ok && querySucceeded(data, 'probeSearch'));
                } catch (unused) {
                    return false;
                }
            })())();
        searchSupportCache.set(cacheKey, supportPromise);
        return supportPromise;
    }).apply(this, arguments);
}
function getColumn(_0) {
    return _async_to_generator(function*({ connectionId, database, table, column, datasourceType = _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE }) {
        if (!connectionId || !database || !table || !column) {
            return null;
        }
        const query = `
SELECT
  COLUMN_NAME AS Field,
  DATA_TYPE AS DataType,
  COLUMN_TYPE AS ColumnType
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = '${escapeSqlLiteral(database)}'
  AND TABLE_NAME = '${escapeSqlLiteral(table)}'
  AND COLUMN_NAME = '${escapeSqlLiteral(column)}'
LIMIT 1;
`;
        const response$ = (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
            url: '/api/ds/query',
            method: 'POST',
            data: {
                queries: [
                    {
                        refId: 'getColumn',
                        datasource: {
                            type: datasourceType,
                            uid: connectionId
                        },
                        rawSql: query,
                        format: 'table'
                    }
                ]
            }
        }));
        try {
            var _dataFrame_fields_find;
            var _resultData_results_getColumn_frames, _resultData_results_getColumn, _resultData_results, _nameField_values_get, _nameField_values, _dataTypeField_values_get, _dataTypeField_values, _columnTypeField_values_get, _columnTypeField_values;
            const { data, ok } = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.lastValueFrom)(response$);
            if (!ok) {
                return null;
            }
            const resultData = data;
            const frame = resultData === null || resultData === void 0 ? void 0 : (_resultData_results = resultData.results) === null || _resultData_results === void 0 ? void 0 : (_resultData_results_getColumn = _resultData_results.getColumn) === null || _resultData_results_getColumn === void 0 ? void 0 : (_resultData_results_getColumn_frames = _resultData_results_getColumn.frames) === null || _resultData_results_getColumn_frames === void 0 ? void 0 : _resultData_results_getColumn_frames[0];
            if (!frame) {
                return null;
            }
            const dataFrame = (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.toDataFrame)(frame);
            const nameField = (_dataFrame_fields_find = dataFrame.fields.find((field)=>field.name === 'Field')) !== null && _dataFrame_fields_find !== void 0 ? _dataFrame_fields_find : dataFrame.fields[0];
            const dataTypeField = dataFrame.fields.find((field)=>field.name === 'DataType');
            const columnTypeField = dataFrame.fields.find((field)=>field.name === 'ColumnType');
            const name = nameField === null || nameField === void 0 ? void 0 : (_nameField_values = nameField.values) === null || _nameField_values === void 0 ? void 0 : (_nameField_values_get = _nameField_values.get) === null || _nameField_values_get === void 0 ? void 0 : _nameField_values_get.call(_nameField_values, 0);
            if (!name) {
                return null;
            }
            const dataTypeValue = dataTypeField === null || dataTypeField === void 0 ? void 0 : (_dataTypeField_values = dataTypeField.values) === null || _dataTypeField_values === void 0 ? void 0 : (_dataTypeField_values_get = _dataTypeField_values.get) === null || _dataTypeField_values_get === void 0 ? void 0 : _dataTypeField_values_get.call(_dataTypeField_values, 0);
            const columnTypeValue = columnTypeField === null || columnTypeField === void 0 ? void 0 : (_columnTypeField_values = columnTypeField.values) === null || _columnTypeField_values === void 0 ? void 0 : (_columnTypeField_values_get = _columnTypeField_values.get) === null || _columnTypeField_values_get === void 0 ? void 0 : _columnTypeField_values_get.call(_columnTypeField_values, 0);
            const columnInfo = {
                name: String(name),
                dataType: dataTypeValue != null ? String(dataTypeValue) : undefined,
                columnType: columnTypeValue != null ? String(columnTypeValue) : undefined
            };
            const normalizedType = (0,_utils_query_parser_column_types__WEBPACK_IMPORTED_MODULE_0__/* .normalizeColumnType */ .a)({
                dataType: columnInfo.dataType,
                columnType: columnInfo.columnType
            });
            return _object_spread_props(_object_spread({}, columnInfo), {
                normalizedType
            });
        } catch (error) {
            (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_5__/* .toError */ .i)(error), {
                source: 'metaservice',
                action: 'getColumnInfo'
            });
            return null;
        }
    }).apply(this, arguments);
}
function getInvertedIndexColumns(_0) {
    return _async_to_generator(function*({ connectionId, database, table, datasourceType = _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE }) {
        if (!connectionId || !database || !table) {
            return [];
        }
        const query = `SHOW INDEXES FROM \`${database}\`.\`${table}\``;
        const response$ = (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
            url: '/api/ds/query',
            method: 'POST',
            data: {
                queries: [
                    {
                        refId: 'getInvertedIndexes',
                        datasource: {
                            type: datasourceType,
                            uid: connectionId
                        },
                        rawSql: query,
                        format: 'table'
                    }
                ]
            }
        }));
        try {
            var _ref, _dataFrame_fields_find, _dataFrame_fields_find1, _columnNameField_values, _indexTypeField_values;
            var _resultData_results_getInvertedIndexes_frames, _resultData_results_getInvertedIndexes, _resultData_results, _resultData_results_getIndexes_frames, _resultData_results_getIndexes, _resultData_results1;
            const { data, ok } = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.lastValueFrom)(response$);
            if (!ok) {
                return [];
            }
            const resultData = data;
            const frame = (_ref = resultData === null || resultData === void 0 ? void 0 : (_resultData_results = resultData.results) === null || _resultData_results === void 0 ? void 0 : (_resultData_results_getInvertedIndexes = _resultData_results.getInvertedIndexes) === null || _resultData_results_getInvertedIndexes === void 0 ? void 0 : (_resultData_results_getInvertedIndexes_frames = _resultData_results_getInvertedIndexes.frames) === null || _resultData_results_getInvertedIndexes_frames === void 0 ? void 0 : _resultData_results_getInvertedIndexes_frames[0]) !== null && _ref !== void 0 ? _ref : resultData === null || resultData === void 0 ? void 0 : (_resultData_results1 = resultData.results) === null || _resultData_results1 === void 0 ? void 0 : (_resultData_results_getIndexes = _resultData_results1.getIndexes) === null || _resultData_results_getIndexes === void 0 ? void 0 : (_resultData_results_getIndexes_frames = _resultData_results_getIndexes.frames) === null || _resultData_results_getIndexes_frames === void 0 ? void 0 : _resultData_results_getIndexes_frames[0];
            if (!frame) {
                return [];
            }
            const dataFrame = (0,_grafana_data__WEBPACK_IMPORTED_MODULE_1__.toDataFrame)(frame);
            const columnNameField = (_dataFrame_fields_find = dataFrame.fields.find((field)=>field.name === 'Column_name')) !== null && _dataFrame_fields_find !== void 0 ? _dataFrame_fields_find : dataFrame.fields.find((field)=>field.name === 'COLUMN_NAME');
            const indexTypeField = (_dataFrame_fields_find1 = dataFrame.fields.find((field)=>field.name === 'Index_type')) !== null && _dataFrame_fields_find1 !== void 0 ? _dataFrame_fields_find1 : dataFrame.fields.find((field)=>field.name === 'INDEX_TYPE');
            if (!columnNameField || !indexTypeField) {
                return [];
            }
            const columnNames = Array.from((_columnNameField_values = columnNameField.values) !== null && _columnNameField_values !== void 0 ? _columnNameField_values : []);
            const indexTypes = Array.from((_indexTypeField_values = indexTypeField.values) !== null && _indexTypeField_values !== void 0 ? _indexTypeField_values : []);
            const indexedColumns = new Set();
            for(let i = 0; i < columnNames.length; i += 1){
                const columnName = columnNames[i];
                const indexType = indexTypes[i];
                if (typeof columnName !== 'string' || columnName.length === 0) {
                    continue;
                }
                if (typeof indexType !== 'string') {
                    continue;
                }
                if (indexType.toUpperCase().includes('INVERT')) {
                    indexedColumns.add(columnName);
                }
            }
            return Array.from(indexedColumns);
        } catch (error) {
            (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_5__/* .toError */ .i)(error), {
                source: 'metaservice',
                action: 'getInvertedIndexColumns'
            });
            return [];
        }
    }).apply(this, arguments);
}
function getDatabases(selectdbDS) {
    const response$ = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getDatabases',
                    datasource: {
                        type: selectdbDS.type || _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE,
                        uid: selectdbDS.uid
                    },
                    rawSql: 'SHOW DATABASES',
                    format: 'table'
                }
            ]
        }
    });
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)(response$);
}
function getTablesService({ selectdbDS, database }) {
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTables',
                    datasource: {
                        type: selectdbDS.type || _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE,
                        uid: selectdbDS.uid
                    },
                    rawSql: `SHOW TABLES FROM \`${database}\``,
                    format: 'table'
                }
            ]
        }
    }));
}
const tableMetadataRequests = new Map();
function sharedMetadataRequest(key, request) {
    const existing = tableMetadataRequests.get(key);
    if (existing) {
        return existing;
    }
    const response = request().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.finalize)(()=>tableMetadataRequests.delete(key)), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.shareReplay)({
        bufferSize: 1,
        refCount: true
    }));
    tableMetadataRequests.set(key, response);
    return response;
}
function getFieldsService({ selectdbDS, database, table }) {
    return sharedMetadataRequest(JSON.stringify([
        'fields',
        selectdbDS.uid,
        database,
        table
    ]), ()=>(0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
            url: '/api/ds/query',
            method: 'POST',
            data: {
                queries: [
                    {
                        refId: 'getFields',
                        datasource: {
                            type: selectdbDS.type || _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE,
                            uid: selectdbDS.uid
                        },
                        rawSql: `SHOW COLUMNS FROM \`${database}\`.\`${table}\``,
                        format: 'table'
                    }
                ]
            }
        })));
}
function getVariantFieldsService({ selectdbDS, database, table }) {
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getVariantFields',
                    datasource: {
                        type: selectdbDS.type || _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE,
                        uid: selectdbDS.uid
                    },
                    rawSql: `DESC \`${database}\`.\`${table}\``,
                    format: 'table',
                    // The datasource executes this setting and DESC through the
                    // same Doris connection. A standalone SET would be lost,
                    // because normal datasource queries use fresh connections.
                    describeExtendVariantColumn: true
                }
            ]
        }
    }));
}
function getVariantPathSampleService(params) {
    const { selectdbDS, database, table, timeField, startDate, endDate, columns } = params;
    const projections = columns.map((column, index)=>`CAST(${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)(column)} AS STRING) AS c${index + 1}`);
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'sampleVariantPaths',
                    datasource: {
                        type: selectdbDS.type || _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE,
                        uid: selectdbDS.uid
                    },
                    rawSql: `SELECT ${projections.join(', ')} FROM ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)(database)}.${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)(table)} WHERE ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)(timeField)} BETWEEN ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .quoteSqlLiteral */ .Ck)(startDate)} AND ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .quoteSqlLiteral */ .Ck)(endDate)} ORDER BY rand() LIMIT 5000`,
                    format: 'table'
                }
            ]
        }
    }));
}
function getApplicationValuesSQL({ database, table, timeField, startDate, endDate, attributeKey }) {
    const resourceAttributes = (0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)('resource_attributes');
    const applicationExpression = `CAST(${resourceAttributes}[${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .quoteSqlLiteral */ .Ck)(attributeKey)}] AS STRING)`;
    return `
SELECT ${applicationExpression} AS application
FROM ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)(database)}.${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)(table)}
WHERE ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .escapeSqlIdentifier */ .LT)(timeField)} BETWEEN ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .quoteSqlLiteral */ .Ck)(startDate)} AND ${(0,_utils_sql_filter__WEBPACK_IMPORTED_MODULE_6__/* .quoteSqlLiteral */ .Ck)(endDate)}
  AND ${applicationExpression} IS NOT NULL
  AND ${applicationExpression} != ''
GROUP BY application
ORDER BY application
LIMIT 200;
`;
}
function getApplicationValuesService(params) {
    const { selectdbDS } = params, queryParams = _object_without_properties(params, [
        "selectdbDS"
    ]);
    return (0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getApplicationValues',
                    datasource: {
                        type: selectdbDS.type || _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE,
                        uid: selectdbDS.uid
                    },
                    rawSql: getApplicationValuesSQL(queryParams),
                    format: 'table'
                }
            ]
        }
    }));
}
function getColumnFromFieldService({ selectdbDS, database, table }) {
// return getBackendSrv().fetch({
//     url: '/api/ds/query',
//     method: 'POST',
//     data: {
//         queries: [
//             {
//                 refId: 'getColumnFromFieldService',
//                 datasource: { type: 'mysql', uid: selectdbDS.uid },
//                 rawSql: `SHOW COLUMNS FROM \`${database}\`.\`${table}\``,
//                 format: 'table',
//             },
//         ],
//     },
// });
}
function getIndexesService({ selectdbDS, database, table }) {
    return sharedMetadataRequest(JSON.stringify([
        'indexes',
        selectdbDS.uid,
        database,
        table
    ]), ()=>(0,_components_with_error_handler_withErrorHandler__WEBPACK_IMPORTED_MODULE_4__/* .withErrorHandler */ .F)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__.getBackendSrv)().fetch({
            url: '/api/ds/query',
            method: 'POST',
            data: {
                queries: [
                    {
                        refId: 'getIndexes',
                        datasource: {
                            type: selectdbDS.type || _grafana_permissions__WEBPACK_IMPORTED_MODULE_7__/* .DORIS_DATASOURCE_TYPE */ .vE,
                            uid: selectdbDS.uid
                        },
                        rawSql: `SHOW INDEXES FROM \`${database}\`.\`${table}\``,
                        format: 'table'
                    }
                ]
            }
        })));
}


/***/ },

/***/ 6247
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $w: () => (/* binding */ currentTableAtom),
/* harmony export */   AW: () => (/* binding */ settingDatabasesAtom),
/* harmony export */   CA: () => (/* binding */ currentTimeFieldAtom),
/* harmony export */   CK: () => (/* binding */ variantSamplingWarningAtom),
/* harmony export */   CL: () => (/* binding */ tableFieldValuesAtom),
/* harmony export */   Cf: () => (/* binding */ currentDatabaseAtom),
/* harmony export */   D$: () => (/* binding */ topNPreferencesAtom),
/* harmony export */   D_: () => (/* binding */ tableFieldsAtom),
/* harmony export */   EA: () => (/* binding */ dataFilterAtom),
/* harmony export */   Eq: () => (/* binding */ indexesAtom),
/* harmony export */   G9: () => (/* binding */ discoverSharedColumnOrderAtom),
/* harmony export */   Gg: () => (/* binding */ timeFieldsAtom),
/* harmony export */   HC: () => (/* binding */ tableTotalCountAtom),
/* harmony export */   IH: () => (/* binding */ disabledOptionsAtom),
/* harmony export */   IQ: () => (/* binding */ discoverColumnLayoutsAtom),
/* harmony export */   IY: () => (/* binding */ tableEChartsDataAtom),
/* harmony export */   JC: () => (/* binding */ topNRunRequestAtom),
/* harmony export */   JT: () => (/* binding */ locationAtom),
/* harmony export */   Jf: () => (/* binding */ topNResultFieldsAtom),
/* harmony export */   K0: () => (/* binding */ currentCatalogAtom),
/* harmony export */   L: () => (/* binding */ settingTablesAtom),
/* harmony export */   MM: () => (/* binding */ searchFocusAtom),
/* harmony export */   Mb: () => (/* binding */ searchableAtom),
/* harmony export */   NJ: () => (/* binding */ afterTimeFieldPageSizeAtom),
/* harmony export */   Ol: () => (/* binding */ pageSizeAtom),
/* harmony export */   P8: () => (/* binding */ searchValueAtom),
/* harmony export */   Ps: () => (/* binding */ discoverRowsExpandedAtom),
/* harmony export */   SK: () => (/* binding */ databasesAtom),
/* harmony export */   SW: () => (/* binding */ selectedDatasourceAtom),
/* harmony export */   TY: () => (/* binding */ currentIndexAtom),
/* harmony export */   U9: () => (/* binding */ timeRangeAtom),
/* harmony export */   UB: () => (/* binding */ tableTracesDataAtom),
/* harmony export */   UR: () => (/* binding */ aggregatableAtom),
/* harmony export */   V3: () => (/* binding */ discoverSortAtom),
/* harmony export */   V_: () => (/* binding */ fieldStatisticsFieldAtom),
/* harmony export */   WM: () => (/* binding */ searchTypeAtom),
/* harmony export */   WN: () => (/* binding */ discoverCurrentAtom),
/* harmony export */   Wg: () => (/* binding */ selectedFieldsAtom),
/* harmony export */   Zb: () => (/* binding */ currentDateAtom),
/* harmony export */   Zs: () => (/* binding */ discoverShareReadyAtom),
/* harmony export */   aB: () => (/* binding */ discoverRowLineCountAtom),
/* harmony export */   b9: () => (/* binding */ tablesAtom),
/* harmony export */   bP: () => (/* binding */ currentClusterAtom),
/* harmony export */   cE: () => (/* binding */ variantFieldsAtom),
/* harmony export */   cn: () => (/* binding */ beforeCountAtom),
/* harmony export */   dR: () => (/* binding */ variantMetadataFieldsAtom),
/* harmony export */   f5: () => (/* binding */ afterCountAtom),
/* harmony export */   fs: () => (/* binding */ pageAtom),
/* harmony export */   g_: () => (/* binding */ discoverQueryStateAtom),
/* harmony export */   h2: () => (/* binding */ discoverRowsWrappedAtom),
/* harmony export */   hX: () => (/* binding */ tableMetadataAtom),
/* harmony export */   iG: () => (/* binding */ variantPathFrequenciesAtom),
/* harmony export */   jU: () => (/* binding */ discoverLoadingAtom),
/* harmony export */   l_: () => (/* binding */ topDataAtom),
/* harmony export */   le: () => (/* binding */ intervalAtom),
/* harmony export */   li: () => (/* binding */ topNConfigurationFieldAtom),
/* harmony export */   m5: () => (/* binding */ fieldTypeAtom),
/* harmony export */   m_: () => (/* binding */ activeShortcutAtom),
/* harmony export */   md: () => (/* binding */ variantImplicitPathsAtom),
/* harmony export */   mj: () => (/* binding */ surroundingTableDataAtom),
/* harmony export */   n: () => (/* binding */ fieldStatisticsErrorAtom),
/* harmony export */   nL: () => (/* binding */ fieldStatisticsLoadingAtom),
/* harmony export */   nn: () => (/* binding */ selectedRowAtom),
/* harmony export */   pB: () => (/* binding */ tableDataChartsAtom),
/* harmony export */   pG: () => (/* binding */ selectedIndexesAtom),
/* harmony export */   ps: () => (/* binding */ afterTimeAtom),
/* harmony export */   q1: () => (/* binding */ topNRowsAtom),
/* harmony export */   q3: () => (/* binding */ tableDataAtom),
/* harmony export */   qX: () => (/* binding */ beforeTimeFieldPageSizeAtom),
/* harmony export */   tF: () => (/* binding */ timeZoneAtom),
/* harmony export */   ui: () => (/* binding */ datasourcesAtom),
/* harmony export */   uz: () => (/* binding */ beforeTimeAtom),
/* harmony export */   vr: () => (/* binding */ topNConfigAtom),
/* harmony export */   w: () => (/* binding */ topNEnabledAtom),
/* harmony export */   wV: () => (/* binding */ fieldStatisticsResultAtom)
/* harmony export */ });
/* unused harmony exports dorisInfoAtom, surroundingTableFieldsAtom */
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4945);
/* harmony import */ var jotai_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6303);
/* harmony import */ var jotai_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7264);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7781);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _types_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7944);
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6700);
/* harmony import */ var _utils_time__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1157);


// import { focusAtom } from 'jotai-optics'





const locationAtom = (0,jotai_location__WEBPACK_IMPORTED_MODULE_2__/* .atomWithLocation */ .N)();
const dataFilterAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const discoverCurrentAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-current', _utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_DEFAULT_STATUS */ .lv);
// databases
const databasesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const settingDatabasesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const tablesAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-tables', []);
const settingTablesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const currentCatalogAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-current-catalog', 'internal');
const searchTypeAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-search-type', 'Lucene');
const currentDatabaseAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .selectAtom */ .mg)(discoverCurrentAtom, (current)=>current.database);
const currentTableAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-current-table', '');
const currentClusterAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)('');
const currentTimeFieldAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .selectAtom */ .mg)(discoverCurrentAtom, (current)=>current.timeField);
const currentDateAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3].range());
const currentIndexAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const selectedIndexesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const searchValueAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)('');
const searchFocusAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(false);
const activeShortcutAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3]);
const dorisInfoAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({});
const disabledOptionsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const selectedFieldsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const tableFieldsAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-table-fields', []);
const variantMetadataFieldsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
// Sample-derived children of physical VARIANT columns. Kept separate so result
// decoding always uses the physical Doris schema only.
const variantFieldsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const variantImplicitPathsAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-variant-implicit-paths', {});
const discoverRowsExpandedAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-rows-expanded', false);
const discoverRowsWrappedAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-rows-wrapped', true);
const discoverRowLineCountAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-row-line-count', 3);
const discoverColumnLayoutsAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-column-layouts', {});
const discoverSortAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({
    field: '',
    direction: 'DESC'
});
const topNEnabledAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(false);
const topNConfigAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({
    groupField: '',
    metric: 'COUNT',
    metricField: '',
    direction: 'DESC',
    limit: 5
});
const topNPreferencesAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-top-n-preferences-v1', {}, undefined, {
    getOnInit: true
});
const topNResultFieldsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const topNRowsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
/** Increments when a field-side Top N action should execute immediately. */ const topNRunRequestAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(0);
const topNConfigurationFieldAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(undefined);
const fieldStatisticsFieldAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(undefined);
const fieldStatisticsResultAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(undefined);
const fieldStatisticsLoadingAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(false);
const fieldStatisticsErrorAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(undefined);
const discoverSharedColumnOrderAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
// URL synchronization starts only after header initialization has applied a shared state.
const discoverShareReadyAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(false);
const discoverQueryStateAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({
    status: 'idle',
    rowCount: 0,
    auxiliaryErrors: []
});
const timeFieldsAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-time-fields', []);
const tableDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const topDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const surroundingTableDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const tableDataChartsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const intervalAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_types_type__WEBPACK_IMPORTED_MODULE_4__/* .IntervalEnum */ .B.Auto);
const tableTotalCountAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(0);
const tableEChartsDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const tableTracesDataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)();
// Filter Content Atom
const searchableAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .SearchableEnum */ .Yp.ANY);
const aggregatableAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .AggregatableEnum */ .SY.ANY);
const fieldTypeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .FieldTypeEnum */ .wI.ANY);
const indexesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const selectedRowAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({});
const tableFieldValuesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const pageAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(1);
const pageSizeAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-pagination-size', 50);
// Surrounding Data Atoms
const beforeTimeFieldPageSizeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(5);
const afterTimeFieldPageSizeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(5);
const beforeTimeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)('');
const afterTimeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)('');
const beforeCountAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(0);
const afterCountAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)(0);
const surroundingTableFieldsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const datasourcesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)([]);
const selectedDatasourceAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-selected-datasource', undefined);
const timeZoneOverrideAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-time-zone', null);
const timeZoneAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)((get)=>get(timeZoneOverrideAtom) || (0,_utils_time__WEBPACK_IMPORTED_MODULE_6__/* .getGrafanaUserTimeZone */ .XP)(), (_get, set, value)=>set(timeZoneOverrideAtom, value));
const timeRangeAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({
    from: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_3__.dateTime)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3].range()[0].toDate()),
    to: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_3__.dateTime)(_utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3].range()[1].toDate()),
    raw: _utils_data__WEBPACK_IMPORTED_MODULE_5__/* .DISCOVER_SHORTCUTS */ .oU[3].raw
});
const discoverLoadingAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({
    getTableData: false,
    getTopData: false,
    getSurroundingData: false,
    getTableDataCharts: false,
    getTableFieldValues: false,
    getIndexes: false,
    getTimeFields: false,
    getTableFields: false
});
// Physical metadata is scoped independently of persisted UI field selections.
const tableMetadataAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({});
const variantPathFrequenciesAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_1__/* .atomWithStorage */ .tG)('discover-variant-path-frequencies-v1', {});
const variantSamplingWarningAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__/* .atom */ .eU)({});


/***/ },

/***/ 325
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TO: () => (/* binding */ DEFAULT_LOGS_CONFIG),
/* harmony export */   oW: () => (/* binding */ mergeLogsConfig)
/* harmony export */ });
/* unused harmony export normalizeApplicationAttributeKey */
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
const DEFAULT_LOGS_CONFIG = {
    datasource: 'doris',
    database: 'otel',
    logsTable: 'otel_logs',
    targetTraceTable: 'otel_traces',
    applicationAttributeKey: 'app'
};
function normalizeApplicationAttributeKey(value) {
    return value === undefined ? DEFAULT_LOGS_CONFIG.applicationAttributeKey || 'app' : value.trim();
}
function mergeLogsConfig(logsConfig) {
    return _object_spread_props(_object_spread({}, DEFAULT_LOGS_CONFIG, logsConfig !== null && logsConfig !== void 0 ? logsConfig : {}), {
        applicationAttributeKey: normalizeApplicationAttributeKey(logsConfig === null || logsConfig === void 0 ? void 0 : logsConfig.applicationAttributeKey)
    });
}


/***/ },

/***/ 7944
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ IntervalEnum)
/* harmony export */ });
var IntervalEnum = /*#__PURE__*/ function(IntervalEnum) {
    IntervalEnum["Auto"] = "auto";
    IntervalEnum["Day"] = "day";
    IntervalEnum["Week"] = "week";
    IntervalEnum["Month"] = "month";
    IntervalEnum["Year"] = "year";
    IntervalEnum["Hour"] = "hour";
    IntervalEnum["Minute"] = "minute";
    IntervalEnum["Second"] = "second";
    return IntervalEnum;
}({});


/***/ },

/***/ 6700
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $X: () => (/* binding */ SEARCHABLE),
/* harmony export */   F9: () => (/* binding */ generateHighlightedResults),
/* harmony export */   HL: () => (/* binding */ convertColumnToRow),
/* harmony export */   Ml: () => (/* binding */ isStructuredJsonType),
/* harmony export */   My: () => (/* binding */ formatTimestampToDateTime),
/* harmony export */   NG: () => (/* binding */ TIME_INTERVALS),
/* harmony export */   O1: () => (/* binding */ formatTracesResData),
/* harmony export */   Q3: () => (/* binding */ isValidTimeFieldType),
/* harmony export */   Re: () => (/* binding */ getFieldType),
/* harmony export */   SY: () => (/* binding */ AggregatableEnum),
/* harmony export */   WG: () => (/* binding */ encodeBase64),
/* harmony export */   Wd: () => (/* binding */ getChartsData),
/* harmony export */   YN: () => (/* binding */ formatRecordDisplayValue),
/* harmony export */   Yp: () => (/* binding */ SearchableEnum),
/* harmony export */   ZD: () => (/* binding */ escapeHtml),
/* harmony export */   cE: () => (/* binding */ getIndexesStatement),
/* harmony export */   d$: () => (/* binding */ formatRecordTimes),
/* harmony export */   hC: () => (/* binding */ getLatestTime),
/* harmony export */   hO: () => (/* binding */ AGGREGATABLE),
/* harmony export */   lv: () => (/* binding */ DISCOVER_DEFAULT_STATUS),
/* harmony export */   ml: () => (/* binding */ convertColumnToRowViaFieldsType),
/* harmony export */   mt: () => (/* binding */ parseJsonLikeValue),
/* harmony export */   oU: () => (/* binding */ DISCOVER_SHORTCUTS),
/* harmony export */   t9: () => (/* reexport safe */ _sql_filter__WEBPACK_IMPORTED_MODULE_7__.t9),
/* harmony export */   tF: () => (/* binding */ isComplexType),
/* harmony export */   wI: () => (/* binding */ FieldTypeEnum),
/* harmony export */   we: () => (/* binding */ OPERATORS),
/* harmony export */   xW: () => (/* binding */ formatFieldDisplayValue)
/* harmony export */ });
/* unused harmony exports SQL_OPERATORS, TIME_FIELD_TYPES, CAN_SEARCH_FIELD_TYPE, ENABLE_SEARCH_FIELD_TYPE, isVariantType, ParamsKeyEnum, SURROUNDING_LOGS_OPERATORS, PAGESIZE_OPTIONS, FIELD_TYPES, decodeBase64, formatDate, resetDate, getDateRange, QUERY_TRACE_FIELDS */
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2149);
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1157);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2351);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5285);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8880);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1163);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8987);
/* harmony import */ var _sql_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2721);
/* harmony import */ var js_tokens__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4132);
/* harmony import */ var js_tokens__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(js_tokens__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(892);
/* harmony import */ var dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7781);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4486);
/* harmony import */ var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_11__);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}











dayjs__WEBPACK_IMPORTED_MODULE_3___default().extend((dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_11___default()));
dayjs__WEBPACK_IMPORTED_MODULE_3___default().extend((dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_9___default()));
const OPERATORS = [
    '=',
    '!=',
    'in',
    'not in',
    'is null',
    'is not null',
    'like',
    'not like',
    'between',
    'not between',
    'match_any',
    'match_all',
    'match_phrase',
    'match_phrase_prefix'
];
const SQL_OPERATORS = (/* unused pure expression or super */ null && ([
    '=',
    '!=',
    '>',
    '<',
    '>=',
    '<=',
    'LIKE',
    'IN',
    'AND',
    'OR',
    'BETWEEN'
]));
const TIME_FIELD_TYPES = [
    'DATETIME',
    'DATE',
    'DATETIMEV2',
    'DATEV2',
    'TIME'
];
function isValidTimeFieldType(fieldType) {
    // 提取基础字段类型（移除括号及其内容）
    const baseFieldType = fieldType.split('(')[0];
    return TIME_FIELD_TYPES.includes(baseFieldType);
}
const CAN_SEARCH_FIELD_TYPE = [
    'STRING',
    'ARRAY',
    'NUMBER',
    'VARIANT'
];
const ENABLE_SEARCH_FIELD_TYPE = (/* unused pure expression or super */ null && ([
    'DATETIME',
    'TIMESTAMP',
    'TIME'
]));
const getFieldType = (columnType)=>{
    if (!columnType) {
        return '';
    }
    const currentColumnType = FIELD_TYPES.find((item)=>item.value.some((val)=>columnType.toLocaleUpperCase().includes(val)));
    return currentColumnType === null || currentColumnType === void 0 ? void 0 : currentColumnType.key;
};
const isVariantType = (columnType)=>{
    return String(columnType || '').toLocaleUpperCase().includes('VARIANT');
};
/** JSON/JSONB fields use the same nested-value shape as Doris VARIANT values in the sidebar. */ const isStructuredJsonType = (columnType)=>{
    const normalizedType = String(columnType || '').toLocaleUpperCase();
    return normalizedType.includes('VARIANT') || normalizedType.includes('JSON');
};
function parseJsonLikeValue(value) {
    if (typeof value !== 'string') {
        if (Array.isArray(value)) {
            return value.map((item)=>parseJsonLikeValue(item));
        }
        if (value && typeof value === 'object') {
            return Object.entries(value).reduce((result, [key, item])=>{
                result[key] = parseJsonLikeValue(item);
                return result;
            }, {});
        }
        return value;
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return value;
    }
    let normalized = trimmed;
    if (normalized.includes('\\"')) {
        try {
            normalized = JSON.parse(`"${normalized}"`);
        } catch (unused) {
            normalized = trimmed;
        }
    }
    const looksJsonLike = normalized.startsWith('{') && normalized.endsWith('}') || normalized.startsWith('[') && normalized.endsWith(']') || normalized.startsWith('"') && normalized.endsWith('"');
    if (!looksJsonLike) {
        return value;
    }
    try {
        return parseJsonLikeValue(JSON.parse(normalized));
    } catch (unused) {
        return value;
    }
}
function formatFieldDisplayValue(value, mode = 'compact') {
    if (value === null || value === undefined) {
        return '-';
    }
    const parsedValue = parseJsonLikeValue(value);
    if (parsedValue === null || parsedValue === undefined) {
        return '-';
    }
    if (typeof parsedValue === 'object') {
        try {
            return JSON.stringify(parsedValue, null, mode === 'pretty' ? 2 : 0);
        } catch (unused) {
            return String(parsedValue);
        }
    }
    return String(parsedValue);
}
/** Formats a row for plain-text previews and clipboard use without leaking rendered HTML. */ function formatRecordDisplayValue(record) {
    if (!record || typeof record !== 'object') {
        return '-';
    }
    return Object.entries(record).map(([key, value])=>`${key}: ${formatFieldDisplayValue(value, 'compact')}`).join(' ');
}
function escapeHtml(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
const DISCOVER_DEFAULT_STATUS = {
    catalog: 'internal',
    database: '',
    table: '',
    cluster: '',
    timeField: '',
    date: []
};
var SearchableEnum = /*#__PURE__*/ function(SearchableEnum) {
    SearchableEnum["ANY"] = "ANY";
    SearchableEnum["YES"] = "YES";
    SearchableEnum["NO"] = "NO";
    return SearchableEnum;
}({});
var AggregatableEnum = /*#__PURE__*/ function(AggregatableEnum) {
    AggregatableEnum["ANY"] = "ANY";
    AggregatableEnum["YES"] = "YES";
    AggregatableEnum["NO"] = "NO";
    return AggregatableEnum;
}({});
const SEARCHABLE = [
    {
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Any');
        },
        value: "ANY"
    },
    {
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Yes');
        },
        value: "YES"
    },
    {
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('No');
        },
        value: "NO"
    }
];
const AGGREGATABLE = [
    {
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Any');
        },
        value: "ANY"
    },
    {
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Yes');
        },
        value: "YES"
    },
    {
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('No');
        },
        value: "NO"
    }
];
var FieldTypeEnum = /*#__PURE__*/ function(FieldTypeEnum) {
    FieldTypeEnum["ANY"] = "ANY";
    FieldTypeEnum["STRING"] = "STRING";
    FieldTypeEnum["NUMBER"] = "NUMBER";
    FieldTypeEnum["DATE"] = "DATE";
    FieldTypeEnum["VARIANT"] = "VARIANT";
    return FieldTypeEnum;
}({});
var ParamsKeyEnum = /*#__PURE__*/ function(ParamsKeyEnum) {
    ParamsKeyEnum["sqlCatalog"] = "sqlCatalog";
    ParamsKeyEnum["sqlDatabase"] = "sqlDatabase";
    ParamsKeyEnum["startDate"] = "startDateRange";
    ParamsKeyEnum["endDate"] = "endDateRange";
    ParamsKeyEnum["sqlSearch"] = "sqlSearch";
    ParamsKeyEnum["selectedTable"] = "selectedTable";
    ParamsKeyEnum["dateInterval"] = "dateInterval";
    ParamsKeyEnum["selectedField"] = "selectedField";
    ParamsKeyEnum["dataFilter"] = "dataFilter";
    ParamsKeyEnum["selectedTimeField"] = "selectedTimeField";
    ParamsKeyEnum["sortedField"] = "sortedField";
    ParamsKeyEnum["searchType"] = "searchType";
    ParamsKeyEnum["selectedIndex"] = "selectedIndex";
    ParamsKeyEnum["selectedCluster"] = "selectedCluster";
    return ParamsKeyEnum;
}({});
function isWrappedInQuotes(inputString) {
    const pattern = /(["'])(.*?)\1/;
    return pattern.test(inputString);
}
function getIndexesStatement(indexes, allField, keywords) {
    let operator = 'MATCH_ANY';
    let searchValue = keywords.trim();
    if (!searchValue || !indexes) {
        return '';
    }
    if (isWrappedInQuotes(keywords)) {
        operator = 'MATCH_PHRASE';
    } else {
        searchValue = `'${searchValue}'`;
    }
    const indexesNames = indexes.map((item)=>item.columnName);
    return indexesNames.reduce((prevValue, currValue)=>{
        var _getFieldType;
        const currentField = allField.find((field)=>`${field.value}` === currValue);
        const currentFieldType = (_getFieldType = getFieldType(currentField.Type)) === null || _getFieldType === void 0 ? void 0 : _getFieldType.toUpperCase();
        if (currentFieldType === 'NUMBER') {
            operator = '=';
        }
        if (currentFieldType === 'STRING' || currentFieldType === 'ARRAY') {
            if (isWrappedInQuotes(keywords)) {
                operator = 'MATCH_PHRASE';
            } else {
                operator = 'MATCH_ANY';
            }
        }
        const canSearchField = CAN_SEARCH_FIELD_TYPE.includes(currentFieldType);
        if (canSearchField) {
            if (prevValue) {
                return `${prevValue} OR \`${currValue}\` ${operator} ${searchValue}`;
            } else {
                return `\`${currValue}\` ${operator} ${searchValue}`;
            }
        }
        return prevValue;
    }, '');
}
const DISCOVER_SHORTCUTS = [
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)(),
        get text () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 5 Minutes');
        },
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 5 Minutes');
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_3___default()())=>[
                now.add(-5, 'minute').startOf('second'),
                now
            ],
        format: 'HH:mm',
        raw: {
            from: 'now-5m',
            to: 'now'
        },
        type: 'minute',
        number: -5
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)(),
        get text () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 15 Minutes');
        },
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 15 Minutes');
        },
        raw: {
            from: 'now-15m',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_3___default()())=>[
                now.add(-15, 'minute').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'minute',
        number: -15
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)(),
        get text () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 1 Hour');
        },
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 1 Hour');
        },
        raw: {
            from: 'now-1h',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_3___default()())=>[
                now.add(-1, 'hour').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'hour',
        number: -1
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)(),
        get text () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 1 Day');
        },
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 1 Day');
        },
        raw: {
            from: 'now-1d',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_3___default()())=>[
                now.add(-1, 'day').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'day',
        number: -1
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)(),
        get text () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 7 Days');
        },
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 1 Days');
        },
        raw: {
            from: 'now-7d',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_3___default()())=>[
                now.add(-7, 'day').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'day',
        number: -7
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)(),
        get text () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 1 Month');
        },
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 1 Month');
        },
        raw: {
            from: 'now-1M',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_3___default()())=>[
                now.add(-1, 'month').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'month',
        number: -1
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)(),
        get text () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 3 Months');
        },
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 3 Months');
        },
        raw: {
            from: 'now-3M',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_3___default()())=>[
                now.add(-3, 'month').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'month',
        number: -3
    },
    {
        key: (0,nanoid__WEBPACK_IMPORTED_MODULE_6__/* .nanoid */ .Ak)(),
        get text () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 1 Year');
        },
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Last 1 Year');
        },
        raw: {
            from: 'now-1y',
            to: 'now'
        },
        range: (now = dayjs__WEBPACK_IMPORTED_MODULE_3___default()())=>[
                now.add(-1, 'year').startOf('second'),
                now
            ],
        format: 'HH:mm',
        type: 'year',
        number: -1
    }
];
const SURROUNDING_LOGS_OPERATORS = [
    {
        label: '5',
        value: '5'
    },
    {
        label: '10',
        value: '10'
    }
];
function getLatestTime(id, timeZone = (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .getGrafanaUserTimeZone */ .XP)()) {
    if (!id) {
        return null;
    }
    const selectedItem = DISCOVER_SHORTCUTS.find((item)=>item.key === id);
    if (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.raw) {
        const range = (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .buildRelativeTimeRange */ .n)(String(selectedItem.raw.from), String(selectedItem.raw.to), timeZone);
        return [
            dayjs__WEBPACK_IMPORTED_MODULE_3___default()(range.from.valueOf()),
            dayjs__WEBPACK_IMPORTED_MODULE_3___default()(range.to.valueOf())
        ];
    }
    return selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.range();
}
const TIME_INTERVALS = [
    {
        value: 'auto',
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Auto');
        }
    },
    {
        value: 'second',
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Second');
        }
    },
    {
        value: 'minute',
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Minute');
        }
    },
    {
        value: 'hour',
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Hour');
        }
    },
    {
        value: 'day',
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Day');
        }
    },
    {
        value: 'week',
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Week');
        }
    },
    {
        value: 'month',
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Month');
        }
    },
    {
        value: 'year',
        get label () {
            return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Year');
        }
    }
];
const PAGESIZE_OPTIONS = (/* unused pure expression or super */ null && ([
    10,
    20,
    50,
    100,
    200
]));
const FIELD_TYPES = [
    {
        key: 'STRING',
        value: [
            'VARCHAR',
            'STRING',
            'CHAR',
            'TEXT'
        ],
        icon: ''
    },
    {
        key: 'NUMBER',
        value: [
            'INT',
            'LARGEINT',
            'SMALLINT',
            'TINYINT',
            'DECIMAL',
            'BIGINT',
            'FLOAT',
            'DOUBLE'
        ],
        icon: ''
    },
    {
        key: 'DATE',
        value: [
            'DATE',
            'DATETIME',
            'DATEV2',
            'DATETIMEV2'
        ],
        icon: ''
    },
    {
        key: 'JSONB',
        value: [
            'JSONB'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'ARRAY',
        value: [
            'ARRAY'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'BOOLEAN',
        value: [
            'BOOLEAN'
        ],
        icon: ''
    },
    {
        key: 'BITMAP',
        value: [
            'BITMAP'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'HLL',
        value: [
            'HLL'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'VARIANT',
        value: [
            'VARIANT'
        ],
        icon: '',
        complex: true
    },
    {
        key: 'JSON',
        value: [
            'JSON'
        ],
        icon: '',
        complex: true
    }
];
function encodeBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1)=>String.fromCharCode(parseInt('0x' + p1, 10))));
}
function decodeBase64(base64) {
    return decodeURIComponent(Array.from(atob(base64)).map((c)=>'%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
}
const isComplexType = (columnType)=>{
    if (!columnType) {
        return false;
    }
    const currentColumnType = FIELD_TYPES.find((item)=>item.value.some((val)=>columnType.toLocaleUpperCase().includes(val)));
    if (currentColumnType) {
        return !!currentColumnType.complex;
    }
    return true;
};
function formatDate(interval) {
    let date_format = 'YYYY-MM-DD HH:mm:ss';
    switch(interval){
        case 'year':
            date_format = 'YYYY';
            break;
        case 'month':
            date_format = 'YYYY-MM';
            break;
        case 'week':
            date_format = 'YYYY-MM-DD';
            break;
        case 'day':
            date_format = 'YYYY-MM-DD';
            break;
        case 'hour':
            date_format = 'YYYY-MM-DD HH:mm:ss';
            break;
        case 'minute':
            date_format = 'YYYY-MM-DD HH:mm:ss';
            break;
        case 'second':
        default:
            date_format = 'YYYY-MM-DD HH:mm:ss';
            break;
    }
    return date_format;
}
function resetDate(date, interval) {
    let date_reset = date;
    switch(interval){
        case 'year':
            date_reset.set('month', 1).set('date', 1).set('hour', 0).set('minute', 0).set('second', 0);
            break;
        case 'month':
            date_reset.set('date', 1).set('hour', 0).set('minute', 0).set('second', 0);
            break;
        case 'week':
            date_reset.set('hour', 0).set('minute', 0).set('second', 0);
            break;
        case 'day':
            date_reset.set('hour', 0).set('minute', 0).set('second', 0);
            break;
        case 'hour':
            date_reset.set('minute', 0).set('second', 0);
            break;
        case 'minute':
            date_reset.set('second', 0);
            break;
        case 'second':
        default:
            break;
    }
    return date_reset;
}
function getDateRange(startDate, endDate, interval, timeZone = (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .getGrafanaUserTimeZone */ .XP)()) {
    const dates = [];
    let date = (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .histogramOrigin */ .Ts)(startDate, interval, timeZone);
    while(date.valueOf() < endDate.valueOf()){
        dates.push(date.valueOf());
        const next = (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .nextHistogramBucket */ .kx)(date, interval, timeZone);
        if (next.valueOf() <= date.valueOf()) {
            break;
        }
        date = next;
    }
    return dates;
}
function getChartsData(tableDataCharts, currentDate, timeZone = (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .getGrafanaUserTimeZone */ .XP)(), interval) {
    const selected = interval || (0,_constants__WEBPACK_IMPORTED_MODULE_2__/* .getAutoInterval */ .Vy)(currentDate);
    const values = new Map(getDateRange(currentDate[0], currentDate[1], selected, timeZone).map((time)=>[
            time,
            null
        ]));
    for (const row of tableDataCharts){
        const key = (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .parseDorisTime */ .sN)(row.TT).valueOf();
        if (Number.isFinite(key)) {
            values.set(key, Number(row['sum(cnt)'] || 0));
        }
    }
    return [
        ...values.entries()
    ].sort(([a], [b])=>a - b).map(([time, count])=>({
            TT: time,
            label: (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .formatDorisTime */ .E)(time, timeZone, 'YYYY-MM-DD HH:mm:ss Z'),
            bucketEnd: (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .nextHistogramBucket */ .kx)(dayjs__WEBPACK_IMPORTED_MODULE_3___default().utc(time), selected, timeZone).valueOf(),
            'sum(cnt)': count
        }));
}
function convertColumnToRow(frame) {
    const fieldNames = frame.schema.fields.map((f)=>f.name);
    const columns = frame.data.values;
    if (columns.length === 0) {
        return [];
    }
    const numRows = columns[0].length;
    const rows = [];
    for(let i = 0; i < numRows; i++){
        const row = {};
        for(let j = 0; j < columns.length; j++){
            row[fieldNames[j]] = columns[j][i];
            if (isValidTimeFieldType(frame.schema.fields[j].type.toUpperCase())) {
                // 如果是时间字段，转换为 Dayjs 对象
                row[fieldNames[j]] = formatTimestampToDateTime(row[fieldNames[j]], frame.schema.fields[j].precision || 3);
            }
            if (isStructuredJsonType(frame.schema.fields[j].type)) {
                // 如果是 VARIANT 类型，转换为 JSON 对象
                row[fieldNames[j]] = parseJsonLikeValue(row[fieldNames[j]]);
            }
        }
        rows.push(row);
    }
    return rows;
}
// 通过查询 Doris 的字段判断类型，不依赖 Grafana 类型
function convertColumnToRowViaFieldsType(frame, fields) {
    const fieldNames = frame.schema.fields.map((f)=>f.name);
    const columns = frame.data.values;
    if (columns.length === 0) {
        return [];
    }
    const numRows = columns[0].length;
    const rows = [];
    const fieldsByName = new Map((Array.isArray(fields) ? fields : []).map((field)=>[
            field === null || field === void 0 ? void 0 : field.Field,
            field
        ]));
    for(let i = 0; i < numRows; i++){
        const row = {};
        for(let j = 0; j < columns.length; j++){
            row[fieldNames[j]] = columns[j][i];
            if (isValidTimeFieldType(frame.schema.fields[j].type.toUpperCase())) {
                // 如果是时间字段，转换为 Dayjs 对象
                row[fieldNames[j]] = formatTimestampToDateTime(row[fieldNames[j]], frame.schema.fields[j].precision || 3);
            // row[fieldNames[j]] = dayjs.utc(row[fieldNames[j]]).locale(currentLocale).format('YYYY-MM-DD HH:mm:ss.SSS');
            }
            const currentFieldInfo = fieldsByName.get(frame.schema.fields[j].name);
            // 如果是 VARIANT 类型，转换为 JSON 对象
            if (currentFieldInfo && isStructuredJsonType(currentFieldInfo.Type)) {
                row[fieldNames[j]] = parseJsonLikeValue(row[fieldNames[j]]);
            }
        }
        rows.push(row);
    }
    return rows;
}
// 格式化时间戳为 DATETIME([number]) 格式
function formatTimestampToDateTime(timestamp, precision = 3, timeZone = 'utc') {
    // 基础格式：YYYY-MM-DD HH:mm:ss
    let formatString = 'YYYY-MM-DD HH:mm:ss';
    // 根据精度添加毫秒部分
    if (precision > 0) {
        formatString += `.${'S'.repeat(precision)}`;
    }
    // 转换时间戳并格式化
    return (0,_time__WEBPACK_IMPORTED_MODULE_1__/* .formatDorisTime */ .E)(timestamp, timeZone, formatString);
}
function parseJsonIfString(item) {
    if (typeof item !== 'string') {
        return item;
    }
    const trimmed = item.trim();
    if (!trimmed) {
        return item;
    }
    try {
        return JSON.parse(trimmed);
    } catch (unused) {
        return item;
    }
}
function normalizeTraceTags(item) {
    const parsed = parseJsonIfString(item);
    if (Array.isArray(parsed)) {
        return parsed.map((tag)=>{
            if (tag && typeof tag === 'object' && 'key' in tag && 'value' in tag) {
                return tag;
            }
            return {
                key: String(tag),
                value: ''
            };
        });
    }
    if (parsed && typeof parsed === 'object') {
        const tags = [];
        const visit = (value, key)=>{
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                Object.entries(value).forEach(([child, nested])=>visit(nested, key ? `${key}.${child}` : child));
            } else {
                var _JSON_stringify;
                tags.push({
                    key,
                    value: typeof value === 'string' ? value : (_JSON_stringify = JSON.stringify(value)) !== null && _JSON_stringify !== void 0 ? _JSON_stringify : ''
                });
            }
        };
        Object.entries(parsed).forEach(([key, value])=>visit(value, key));
        return tags;
    }
    return [];
}
function normalizeTraceLogTimestamp(timestamp) {
    if (typeof timestamp === 'number' && Number.isFinite(timestamp)) {
        return timestamp;
    }
    if (typeof timestamp === 'string') {
        const numericTimestamp = Number(timestamp);
        if (Number.isFinite(numericTimestamp)) {
            return numericTimestamp;
        }
        const parsedTimestamp = dayjs__WEBPACK_IMPORTED_MODULE_3___default().utc(timestamp.replace(' ', 'T'));
        if (parsedTimestamp.isValid()) {
            return parsedTimestamp.valueOf();
        }
    }
    return timestamp;
}
function normalizeTraceLogs(item) {
    const parsed = parseJsonIfString(item);
    if (!Array.isArray(parsed)) {
        return [];
    }
    return parsed.map((event)=>{
        var _ref, _parsedEvent_name, _ref1, _parsedEvent_attributes, _parsedEvent_timestamp;
        const parsedEvent = parseJsonIfString(event);
        if (!parsedEvent || typeof parsedEvent !== 'object') {
            return {
                timestamp: 0,
                fields: [
                    {
                        key: 'event',
                        value: parsedEvent
                    }
                ]
            };
        }
        const existingFields = Array.isArray(parsedEvent.fields) ? normalizeTraceTags(parsedEvent.fields) : [];
        const eventName = (_ref = (_parsedEvent_name = parsedEvent.name) !== null && _parsedEvent_name !== void 0 ? _parsedEvent_name : parsedEvent.event) !== null && _ref !== void 0 ? _ref : parsedEvent.event_name;
        const eventAttributes = normalizeTraceTags((_ref1 = (_parsedEvent_attributes = parsedEvent.attributes) !== null && _parsedEvent_attributes !== void 0 ? _parsedEvent_attributes : parsedEvent.event_attributes) !== null && _ref1 !== void 0 ? _ref1 : {});
        const extraFields = Object.entries(parsedEvent).filter(([key])=>![
                'timestamp',
                'time',
                'name',
                'event',
                'event_name',
                'attributes',
                'event_attributes',
                'fields'
            ].includes(key)).map(([key, value])=>({
                key,
                value
            }));
        return {
            timestamp: normalizeTraceLogTimestamp((_parsedEvent_timestamp = parsedEvent.timestamp) !== null && _parsedEvent_timestamp !== void 0 ? _parsedEvent_timestamp : parsedEvent.time),
            fields: [
                ...eventName !== undefined ? [
                    {
                        key: 'event',
                        value: eventName
                    }
                ] : [],
                ...existingFields,
                ...eventAttributes,
                ...extraFields
            ]
        };
    });
}
function formatTracesResData(frame) {
    var _frame_schema, _frame_schema1;
    const { data } = frame;
    const traceDataFrame = {
        name: 'Trace ID',
        refId: ((_frame_schema = frame.schema) === null || _frame_schema === void 0 ? void 0 : _frame_schema.refId) || 'Trace ID',
        fields: (_frame_schema1 = frame.schema) === null || _frame_schema1 === void 0 ? void 0 : _frame_schema1.fields.map((f, i)=>({
                name: f.name,
                type: f.type,
                values: data.values[i],
                typeInfo: f.typeInfo,
                config: {}
            })),
        length: data.values[0].length
    };
    traceDataFrame.fields.forEach((f)=>{
        if (f.name === 'serviceTags' || f.name === 'tags') {
            f.type = _grafana_data__WEBPACK_IMPORTED_MODULE_10__.FieldType.other;
            f.values = f.values.map((item)=>normalizeTraceTags(item));
        }
        if (f.name === 'logs') {
            f.type = _grafana_data__WEBPACK_IMPORTED_MODULE_10__.FieldType.other;
            f.values = f.values.map((item)=>normalizeTraceLogs(item));
        }
    });
    return traceDataFrame;
}
function getSearchTableData(tokenizeFields, tableResult) {
    const result = [
        ...tokenizeFields
    ];
    tableResult.forEach((tableItem)=>{
        result.forEach((token)=>{
            token['searchValue'] = tableItem[token.columnName];
        });
    });
    return result;
}
function searchField(data, searchString) {
    return (0,lodash_es__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(data, (item)=>item.columnName === searchString);
}
function parseKeywords(keyword) {
    if (keyword.length >= 2 && keyword[0] === keyword[keyword.length - 1] && (keyword[0] === `'` || keyword[0] === `"`)) {
        keyword = keyword.substring(1, keyword.length - 1);
    }
    return keyword;
}
function insertUnderscore(arr) {
    return arr.reduce((result, item, index)=>{
        result.push(item);
        if (index < arr.length - 1) {
            result.push('_');
        }
        return result;
    }, []);
}
function generateHighlightedResults(data, result) {
    const keyword = data.search_value || '';
    const searchTableData = getSearchTableData(data.indexes, result);
    // Detect simple Lucene "field:value" pattern so we can highlight the specified field
    // even when `indexes` (tokenizeFields) is empty. Example: "service_name:frontend"
    const luceneFieldMatch = keyword && keyword.match(/^\s*([^\s:]+)\s*:/);
    const luceneField = luceneFieldMatch ? luceneFieldMatch[1].replace(/['"]+/g, '') : null;
    const _sourceResult = result.map((item)=>{
        let itemSource = '';
        for(const key in item){
            let highlightValue = formatFieldDisplayValue(item[key], 'compact');
            let itemValue = highlightValue;
            if (keyword && (searchField(searchTableData, key) || luceneField && key === luceneField)) {
                const strValue = typeof itemValue === 'string' ? itemValue : itemValue + '';
                if (isWrappedInQuotes(keyword)) {
                    const parsedKeyword = parseKeywords(keyword);
                    if (parsedKeyword === strValue) {
                        // highlightValue = `<mark>${itemValue}</mark>`;
                        highlightValue = itemValue;
                    } else if (strValue.includes(parsedKeyword)) {
                        // highlightValue = highlightDelimiter(strValue, parsedKeyword);
                        highlightValue = strValue;
                    }
                } else {
                    const tokenizedAns = Array.from(js_tokens__WEBPACK_IMPORTED_MODULE_8___default()(strValue)).map((item)=>item.value);
                    let ans = [];
                    if (tokenizedAns.includes(keyword)) {
                        ans = tokenizedAns;
                    } else {
                        const ansWithUnderscore = (0,lodash_es__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A)(tokenizedAns.map((item)=>{
                            if (item.includes('_')) {
                                return insertUnderscore(item.split('_'));
                            }
                            return item;
                        }));
                        ans = ansWithUnderscore;
                    }
                    if (ans.length > 0) {
                        highlightValue = ans.reduce((acc, curr)=>{
                            // if (
                            //     keywordsTokens.filter(token => !isIgnorableHighlightToken(token)).find(token => compare_ignore_quotes(token, curr.toLowerCase())) ||
                            //     compare_ignore_quotes(keyword.toLowerCase(), curr.toLowerCase())
                            // ) {
                            //     return acc + `<mark>${curr}</mark>`;
                            // }
                            return acc + curr;
                        }, '');
                    }
                }
            }
            // ✅ 这里改成用 data-trace-id + class，方便事件委托识别
            if (key === 'trace_id') {
                const traceId = typeof itemValue === 'string' ? itemValue : String(itemValue);
                const content = highlightValue || traceId;
                highlightValue = `<a 
                href="javascript:void(0)" 
                class="trace-link" 
                data-trace-id="${escapeHtml(traceId)}"
            >${escapeHtml(content)}</a>`;
            } else {
                highlightValue = escapeHtml(highlightValue);
            }
            itemSource += `<span class="field-pair"><span class="field-key">${escapeHtml(key)}:</span><span class="field-value">${highlightValue}</span></span>`;
        }
        return {
            _original: item,
            _source: itemSource.trim()
        };
    });
    return _sourceResult;
}
const QUERY_TRACE_FIELDS = (/* unused pure expression or super */ null && ([
    'trace_id',
    'span_id',
    'parent_span_id',
    'span_name',
    'service_name'
]));
/** Presentation copy; query cursors and filter values always use the original row. */ function formatRecordTimes(record, fields, timeZone) {
    const displayed = _object_spread({}, record);
    for (const field of fields){
        if (isValidTimeFieldType(String(field.Type || '').toUpperCase()) && displayed[field.Field] != null) {
            displayed[field.Field] = formatTimestampToDateTime(displayed[field.Field], 3, timeZone);
        }
    }
    return displayed;
}


/***/ },

/***/ 9071
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ toError)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2149);

function toError(value) {
    if (value instanceof Error) {
        return value;
    }
    if (typeof value === 'string') {
        return new Error(value);
    }
    if (value && typeof value === 'object') {
        const maybeMessage = value.message;
        if (typeof maybeMessage === 'string' && maybeMessage.trim().length > 0) {
            return new Error(maybeMessage);
        }
    }
    return new Error((0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Unknown error'));
}


/***/ },

/***/ 8957
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ createDiscoverQueryError),
/* harmony export */   p: () => (/* binding */ getQueryErrorMessage)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2149);

function getFirstResultError(data) {
    const results = data === null || data === void 0 ? void 0 : data.results;
    if (!results) {
        return undefined;
    }
    const refId = Object.keys(results).find((key)=>{
        var _results_key, _results_key1;
        return ((_results_key = results[key]) === null || _results_key === void 0 ? void 0 : _results_key.error) || ((_results_key1 = results[key]) === null || _results_key1 === void 0 ? void 0 : _results_key1.status) >= 400;
    });
    return refId ? results[refId] : undefined;
}
function getQueryErrorMessage(error) {
    var _error_response, _responseData_error;
    const responseData = (error === null || error === void 0 ? void 0 : error.data) || (error === null || error === void 0 ? void 0 : (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.data);
    const resultError = getFirstResultError(responseData);
    return String((error === null || error === void 0 ? void 0 : error.backendError) || (resultError === null || resultError === void 0 ? void 0 : resultError.error) || (responseData === null || responseData === void 0 ? void 0 : (_responseData_error = responseData.error) === null || _responseData_error === void 0 ? void 0 : _responseData_error.message) || (typeof (responseData === null || responseData === void 0 ? void 0 : responseData.error) === 'string' ? responseData.error : undefined) || (responseData === null || responseData === void 0 ? void 0 : responseData.message) || (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.statusText) || (typeof error === 'string' ? error : undefined) || (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Request failed'));
}
function getAbsolutePosition(sql, line, column) {
    if (!line || !column || line < 1 || column < 1) {
        return undefined;
    }
    const lines = sql.split('\n');
    if (line > lines.length) {
        return undefined;
    }
    let offset = 0;
    for(let index = 0; index < line - 1; index += 1){
        offset += lines[index].length + 1;
    }
    return offset + column;
}
function getInputLineAndColumn(input, position) {
    var _lines_;
    const before = input.slice(0, Math.max(position - 1, 0));
    const lines = before.split('\n');
    return {
        inputLine: lines.length,
        inputColumn: (((_lines_ = lines[lines.length - 1]) === null || _lines_ === void 0 ? void 0 : _lines_.length) || 0) + 1
    };
}
function extractLocation(error, message, generatedSql, searchValue) {
    var _error_location;
    const nativeLocation = (error === null || error === void 0 ? void 0 : (_error_location = error.location) === null || _error_location === void 0 ? void 0 : _error_location.start) || (error === null || error === void 0 ? void 0 : error.location);
    const location = {};
    if (nativeLocation === null || nativeLocation === void 0 ? void 0 : nativeLocation.line) {
        location.line = Number(nativeLocation.line);
        location.column = Number(nativeLocation.column || 1);
        location.inputLine = location.line;
        location.inputColumn = location.column;
    } else {
        const lineColumnMatch = message.match(/line\s+(\d+)\s*(?:,|:)?\s*(?:column|col)\s+(\d+)/i);
        const compactLineMatch = message.match(/line\s+(\d+)\s*[:]\s*(\d+)/i);
        const matchedLocation = lineColumnMatch || compactLineMatch;
        if (matchedLocation) {
            location.line = Number(matchedLocation[1]);
            location.column = Number(matchedLocation[2]);
        } else {
            const lineOnlyMatch = message.match(/(?:syntax error in|at)\s+line\s+(\d+)/i);
            if (lineOnlyMatch) {
                location.line = Number(lineOnlyMatch[1]);
            }
        }
        const messageLines = message.split('\n');
        const syntaxLineIndex = messageLines.findIndex((line)=>/syntax error in line\s+\d+/i.test(line));
        if (syntaxLineIndex >= 0) {
            const caretLine = messageLines.slice(syntaxLineIndex + 1, syntaxLineIndex + 5).find((line)=>line.includes('^'));
            const caretColumn = caretLine === null || caretLine === void 0 ? void 0 : caretLine.indexOf('^');
            if (caretColumn !== undefined && caretColumn >= 0) {
                location.column = caretColumn + 1;
            }
        }
    }
    const positionMatch = message.match(/(?:position|pos)\s*[:=]?\s*(\d+)/i);
    if (positionMatch) {
        location.position = Number(positionMatch[1]);
    }
    const nearMatch = message.match(/near\s+['"`]?([^'"`\n]{1,80})/i);
    if (nearMatch) {
        location.near = nearMatch[1].trim().replace(/\s+at\s+line.*$/i, '');
    }
    if (generatedSql && searchValue) {
        const inputStart = generatedSql.indexOf(searchValue);
        const absolutePosition = location.position || getAbsolutePosition(generatedSql, location.line, location.column);
        let inputPosition;
        if (inputStart >= 0 && absolutePosition && absolutePosition > inputStart && absolutePosition <= inputStart + searchValue.length + 1) {
            inputPosition = absolutePosition - inputStart;
        } else if (location.near) {
            const nearPosition = searchValue.indexOf(location.near);
            if (nearPosition >= 0) {
                inputPosition = nearPosition + 1;
            }
        }
        if (inputPosition) {
            location.inputPosition = inputPosition;
            Object.assign(location, getInputLineAndColumn(searchValue, inputPosition));
        }
    }
    return Object.keys(location).length > 0 ? location : undefined;
}
function getLikelyCause(message) {
    const normalized = message.toLowerCase();
    if (normalized.includes('an error occurred within the plugin')) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Grafana did not return the underlying plugin error. Check the Grafana server/plugin logs for the cause, or ask your administrator.');
    }
    if (normalized.includes('oidc id token is required')) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Sign in with OIDC and enable Forward OAuth Identity for this datasource, then retry the query.');
    }
    if (/oidc id token validation failed/.test(normalized)) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Sign in again to refresh your OIDC session. If the error persists, check the identity provider issuer, audience, and signing keys.');
    }
    if (/sso profile|jwks|oidc|keyrock|identity provider/.test(normalized)) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Check the Doris SSO Profile and identity provider configuration using the backend message.');
    }
    if (/syntax|parse|mismatched|unexpected|unterminated|no viable|expected/.test(normalized)) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Check SQL/Lucene keywords, operators, quotes, and matching parentheses near the reported position.');
    }
    if (/unknown column|column .* not found|cannot resolve|unresolved column/.test(normalized)) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('A referenced field may not exist in the selected table, or its name/case may be incorrect.');
    }
    if (/cast|type mismatch|incompatible|invalid type|cannot convert/.test(normalized)) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('The expression may compare or convert incompatible data types.');
    }
    if (/permission|access denied|not authorized|unauthorized|forbidden/.test(normalized)) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('The selected datasource user may not have permission to query this table or field.');
    }
    if (/timeout|timed out|deadline/.test(normalized)) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('The query exceeded its time limit. Narrow the time range or simplify the filters.');
    }
    if (/network|failed to fetch|connection|gateway|unavailable/.test(normalized)) {
        return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('The datasource or Grafana backend could not be reached. Check connectivity and datasource health.');
    }
    return (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Review the backend message and generated query for invalid fields, expressions, or datasource-specific syntax.');
}
function createDiscoverQueryError(error, context) {
    const message = getQueryErrorMessage(error);
    const generatedSql = typeof (error === null || error === void 0 ? void 0 : error.generatedSql) === 'string' ? error.generatedSql : undefined;
    const sourceLabel = context.source === 'results' ? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Query') : context.source === 'lucene' ? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Lucene query') : context.source === 'histogram' ? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Histogram') : context.source === 'count' ? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Count') : context.source === 'topData' ? (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Top values') : (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Field statistics');
    return {
        source: context.source,
        summary: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('{{source}} failed', {
            source: sourceLabel
        }),
        message,
        likelyCause: getLikelyCause(message),
        location: extractLocation(error, message, generatedSql, context.searchValue),
        generatedSql
    };
}


/***/ },

/***/ 1945
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ normalizeColumnType)
/* harmony export */ });
const normalizeColumnType = ({ dataType, columnType })=>{
    const source = (columnType || dataType || '').trim();
    if (!source) {
        return '';
    }
    const lower = source.toLowerCase();
    if (lower.startsWith('nullable(') && lower.endsWith(')')) {
        const inner = source.slice(9, -1);
        const normalizedInner = normalizeColumnType({
            dataType: inner,
            columnType: undefined
        });
        return normalizedInner ? `Nullable(${normalizedInner})` : source;
    }
    if (lower.startsWith('map')) {
        return source.replace(/^map/i, 'Map');
    }
    if (lower.startsWith('array')) {
        return source.replace(/^array/i, 'Array');
    }
    if (lower.startsWith('json')) {
        return 'JSON';
    }
    if (lower.startsWith('variant')) {
        return 'Variant';
    }
    if (lower === 'bool' || lower === 'boolean' || lower.startsWith('tinyint(1)')) {
        return 'Bool';
    }
    if (lower.startsWith('tinyint')) {
        return 'Int8';
    }
    if (lower.startsWith('smallint')) {
        return 'Int16';
    }
    if (lower.startsWith('mediumint')) {
        return 'Int32';
    }
    if (lower.startsWith('bigint') || lower.startsWith('int') || lower.startsWith('integer')) {
        return 'Int64';
    }
    if (lower.startsWith('float') || lower.startsWith('double') || lower.startsWith('real')) {
        return 'Float64';
    }
    if (lower.startsWith('decimal') || lower.startsWith('numeric')) {
        return 'Float64';
    }
    if (lower.startsWith('date')) {
        return source.replace(/^date/i, 'Date');
    }
    if (lower.startsWith('timestamp') || lower.startsWith('datetime')) {
        return 'DateTime';
    }
    if (lower.startsWith('enum')) {
        return source.replace(/^enum/i, 'Enum');
    }
    if (lower.startsWith('uuid')) {
        return 'UUID';
    }
    if (lower.startsWith('ipv4')) {
        return 'IPv4';
    }
    if (lower.startsWith('ipv6')) {
        return 'IPv6';
    }
    if (lower.startsWith('tuple')) {
        return source.replace(/^tuple/i, 'Tuple');
    }
    if (lower.startsWith('struct')) {
        return source.replace(/^struct/i, 'Tuple');
    }
    if (lower.startsWith('char') || lower.startsWith('varchar') || lower.startsWith('text') || lower.startsWith('string')) {
        return 'String';
    }
    return source;
};


/***/ },

/***/ 2721
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ck: () => (/* binding */ quoteSqlLiteral),
/* harmony export */   LT: () => (/* binding */ escapeSqlIdentifier),
/* harmony export */   MF: () => (/* binding */ getFilterFieldReference),
/* harmony export */   QI: () => (/* binding */ addSqlFilter),
/* harmony export */   a9: () => (/* binding */ enrichStructuredFilterTypes),
/* harmony export */   k8: () => (/* binding */ transformFieldPath),
/* harmony export */   t9: () => (/* binding */ getFilterSQL)
/* harmony export */ });
/* unused harmony export escapeSqlLiteral */
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function escapeSqlIdentifier(identifier) {
    return `\`${String(identifier).replace(/`/g, '``')}\``;
}
function escapeSqlLiteral(value) {
    return String(value).replace(/\\/g, '\\\\').replace(/'/g, "''");
}
function quoteSqlLiteral(value) {
    return `'${escapeSqlLiteral(value)}'`;
}
function transformFieldPath(fieldPath, variantPath) {
    const parts = (variantPath === null || variantPath === void 0 ? void 0 : variantPath.length) ? [
        ...variantPath
    ] : fieldPath.split('.');
    const root = parts.shift() || '';
    return escapeSqlIdentifier(root) + parts.map((part)=>`[${quoteSqlLiteral(part)}]`).join('');
}
function getJsonPath(path) {
    // Quote every member: telemetry attribute names commonly contain dots, and
    // quoted JSON-path members preserve those dots as part of the key.
    return '$' + path.map((part)=>`."${String(part).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join('');
}
function getJsonCastType(fieldType) {
    const type = String(fieldType || '').toUpperCase();
    if (type.includes('BOOL')) return 'BOOLEAN';
    if (/(DOUBLE|FLOAT|DECIMAL|INT|NUMBER)/.test(type)) return 'DOUBLE';
    return 'STRING';
}
function getFilterFieldReference({ fieldName, variantKey, variantPath, variantRootType, fieldType }) {
    const path = (variantPath === null || variantPath === void 0 ? void 0 : variantPath.length) ? variantPath : variantKey !== undefined ? [
        fieldName,
        variantKey
    ] : undefined;
    const rootType = String(variantRootType || '').toUpperCase();
    if ((path === null || path === void 0 ? void 0 : path.length) && rootType.includes('JSON')) {
        const root = path[0];
        return `CAST(JSON_EXTRACT(${escapeSqlIdentifier(root)}, ${quoteSqlLiteral(getJsonPath(path.slice(1)))}) AS ${getJsonCastType(fieldType)})`;
    }
    if (variantPath === null || variantPath === void 0 ? void 0 : variantPath.length) {
        const expression = transformFieldPath(fieldName, variantPath);
        // Doris VARIANT values cannot be used directly in filters or aggregates.
        // Cast the extracted scalar to its discovered leaf type first.
        return rootType.includes('VARIANT') ? `CAST(${expression} AS ${getJsonCastType(fieldType)})` : expression;
    }
    if (variantKey !== undefined) {
        return `${escapeSqlIdentifier(fieldName)}[${quoteSqlLiteral(variantKey)}]`;
    }
    return transformFieldPath(fieldName);
}
function getFilterValue(value) {
    return typeof value === 'string' ? quoteSqlLiteral(value) : String(value);
}
/**
 * Adds schema information to filters restored from local storage or the URL.
 * Older saved filters predate JSON-specific SQL generation, so they do not
 * carry the root type created by the current filter editor.
 */ function enrichStructuredFilterTypes(filters, fields) {
    return filters.map((filter)=>{
        const path = filter.variantPath;
        if (!(path === null || path === void 0 ? void 0 : path.length) || filter.variantRootType) {
            return filter;
        }
        const root = fields.find((field)=>field.Field === path[0]);
        if (!(root === null || root === void 0 ? void 0 : root.Type)) {
            return filter;
        }
        const leaf = fields.find((field)=>field.Field === filter.fieldName);
        return _object_spread_props(_object_spread({}, filter), {
            variantRootType: root.Type,
            fieldType: filter.fieldType || (leaf === null || leaf === void 0 ? void 0 : leaf.Type)
        });
    });
}
function getFilterSQL(filter) {
    const { operator, value } = filter;
    const fieldReference = getFilterFieldReference(filter);
    const values = value.map(getFilterValue);
    if (operator === '=' || operator === '!=' || operator === 'like' || operator === 'not like' || operator === 'match_all' || operator === 'match_any' || operator === 'match_phrase' || operator === 'match_phrase_prefix') {
        return `${fieldReference} ${operator} ${values[0]}`;
    }
    if (operator === 'is null' || operator === 'is not null') {
        return `${fieldReference} ${operator}`;
    }
    if (operator === 'between' || operator === 'not between') {
        return `${fieldReference} ${operator} ${values[0]} AND ${values[1]}`;
    }
    if (operator === 'in' || operator === 'not in') {
        return `${fieldReference} ${operator} (${values.join(', ')})`;
    }
    return '';
}
function addSqlFilter(sql, dataFilterValue) {
    const conjunction = sql.toUpperCase().includes('WHERE') ? ' AND' : ' WHERE';
    return `${sql}${conjunction} (${getFilterSQL(dataFilterValue)})`;
}


/***/ },

/***/ 1157
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ formatDorisTime),
/* harmony export */   F9: () => (/* binding */ normalizeTimeZone),
/* harmony export */   K$: () => (/* binding */ toDayjsRange),
/* harmony export */   Oh: () => (/* binding */ formatTimeInZone),
/* harmony export */   Ts: () => (/* binding */ histogramOrigin),
/* harmony export */   XP: () => (/* binding */ getGrafanaUserTimeZone),
/* harmony export */   h9: () => (/* binding */ formatSqlTime),
/* harmony export */   kh: () => (/* binding */ buildAbsoluteTimeRange),
/* harmony export */   kx: () => (/* binding */ nextHistogramBucket),
/* harmony export */   mk: () => (/* binding */ parseTimeInZone),
/* harmony export */   n: () => (/* binding */ buildRelativeTimeRange),
/* harmony export */   sN: () => (/* binding */ parseDorisTime),
/* harmony export */   yK: () => (/* binding */ formatShareTime)
/* harmony export */ });
/* unused harmony exports DEFAULT_TIME_ZONE, inDisplayTimeZone */
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7781);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5285);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2351);
/* harmony import */ var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4486);
/* harmony import */ var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8037);
/* harmony import */ var dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_4__);





dayjs__WEBPACK_IMPORTED_MODULE_1___default().extend((dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_3___default()));
dayjs__WEBPACK_IMPORTED_MODULE_1___default().extend((dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_4___default()));
const DEFAULT_TIME_ZONE = 'browser';
function getGrafanaUserTimeZone() {
    return (0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.getTimeZone)() || DEFAULT_TIME_ZONE;
}
function normalizeTimeZone(timeZone) {
    const normalized = timeZone === null || timeZone === void 0 ? void 0 : timeZone.trim();
    if (!normalized) {
        return undefined;
    }
    if (normalized === 'browser') {
        return normalized;
    }
    try {
        new Intl.DateTimeFormat('en', {
            timeZone: normalized
        });
        return normalized;
    } catch (unused) {
        return undefined;
    }
}
function parseTimeInZone(value, timeZone = getGrafanaUserTimeZone()) {
    if (!value) {
        return undefined;
    }
    // New links are absolute; legacy links contain a wall-clock time in timeZone.
    if (/(?:Z|[+-]\d{2}:?\d{2})$/i.test(value)) {
        const parsed = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(value);
        return parsed.isValid() ? parsed : undefined;
    }
    const parsedDate = (0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.dateTimeParse)(value, {
        timeZone,
        format: _constants__WEBPACK_IMPORTED_MODULE_2__/* .FORMAT_DATE */ .fU
    });
    return (parsedDate === null || parsedDate === void 0 ? void 0 : parsedDate.isValid()) ? dayjs__WEBPACK_IMPORTED_MODULE_1___default()(parsedDate.toDate()) : undefined;
}
function formatTimeInZone(value, timeZone) {
    return (0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.dateTimeFormat)((0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.dateTime)(value.toDate()), {
        timeZone,
        format: _constants__WEBPACK_IMPORTED_MODULE_2__/* .FORMAT_DATE */ .fU
    });
}
function toDayjsRange(timeRange) {
    return [
        dayjs__WEBPACK_IMPORTED_MODULE_1___default()(timeRange.from.toDate()),
        dayjs__WEBPACK_IMPORTED_MODULE_1___default()(timeRange.to.toDate())
    ];
}
function buildRelativeTimeRange(rawFrom, rawTo, timeZone) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_0__.rangeUtil.convertRawToRange({
        from: rawFrom,
        to: rawTo
    }, timeZone);
}
function buildAbsoluteTimeRange(start, end) {
    return {
        from: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.dateTime)(start.toDate()),
        to: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.dateTime)(end.toDate()),
        raw: {
            from: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.dateTime)(start.toDate()),
            to: (0,_grafana_data__WEBPACK_IMPORTED_MODULE_0__.dateTime)(end.toDate())
        }
    };
}
/** Doris DATETIME values represent UTC, independently of the display zone. */ function formatSqlTime(value) {
    return dayjs__WEBPACK_IMPORTED_MODULE_1___default()(value).utc().format(_constants__WEBPACK_IMPORTED_MODULE_2__/* .FORMAT_DATE */ .fU);
}
function formatShareTime(value) {
    return value.utc().toISOString();
}
function parseDorisTime(value) {
    return dayjs__WEBPACK_IMPORTED_MODULE_1___default().utc(value);
}
function inDisplayTimeZone(value, timeZone = getGrafanaUserTimeZone()) {
    return timeZone === 'browser' ? value.local() : value.tz(timeZone);
}
function formatDorisTime(value, timeZone, format = 'YYYY-MM-DD HH:mm:ss.SSS') {
    return inDisplayTimeZone(parseDorisTime(value), timeZone).format(format);
}
function histogramOrigin(start, interval, zone) {
    return inDisplayTimeZone(start, zone).startOf(interval.interval_unit);
}
function nextHistogramBucket(start, interval, zone) {
    if ([
        'second',
        'minute',
        'hour'
    ].includes(interval.interval_unit)) {
        return start.utc().add(interval.interval_value, interval.interval_unit);
    }
    const local = inDisplayTimeZone(start, zone).add(interval.interval_value, interval.interval_unit);
    // Re-resolve the wall clock after a calendar increment; a day may be 23/25 hours.
    return zone === 'browser' ? dayjs__WEBPACK_IMPORTED_MODULE_1___default()(local.format('YYYY-MM-DD HH:mm:ss')) : dayjs__WEBPACK_IMPORTED_MODULE_1___default().tz(local.format('YYYY-MM-DD HH:mm:ss'), zone);
}


/***/ }

}]);
//# sourceMappingURL=749.js.map?_cache=74b4728322fa0f7b5115