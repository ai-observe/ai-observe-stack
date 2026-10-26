"use strict";
(self["webpackChunkvelodb_doris_app"] = self["webpackChunkvelodb_doris_app"] || []).push([[170],{

/***/ 202
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_LOGS_CONFIG: () => (/* reexport safe */ _types_plugin_settings__WEBPACK_IMPORTED_MODULE_10__.TO),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   mergeLogsConfig: () => (/* reexport safe */ _types_plugin_settings__WEBPACK_IMPORTED_MODULE_10__.oW)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2149);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1269);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6089);
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2007);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3689);
/* harmony import */ var _hooks_useDatabaseTableSelection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2307);
/* harmony import */ var _testIds__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5611);
/* harmony import */ var _store_discover__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6247);
/* harmony import */ var _types_plugin_settings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(325);
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9071);
/* harmony import */ var _services_grafana_permissions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7116);
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














const AppConfig = ({ plugin })=>{
    var _ref;
    var _currentLogsConfig_applicationAttributeKey, _jsonData_logsConfig;
    const s = (0,_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.useStyles2)(getStyles);
    const { enabled, pinned, jsonData, secureJsonFields } = plugin.meta;
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        apiUrl: (jsonData === null || jsonData === void 0 ? void 0 : jsonData.apiUrl) || '',
        apiKey: '',
        isApiKeySet: Boolean(secureJsonFields === null || secureJsonFields === void 0 ? void 0 : secureJsonFields.apiKey)
    });
    const logsConfig = (0,_types_plugin_settings__WEBPACK_IMPORTED_MODULE_10__/* .mergeLogsConfig */ .oW)(jsonData === null || jsonData === void 0 ? void 0 : jsonData.logsConfig);
    const [currentLogsConfig, setCurrentLogsConfig] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(logsConfig);
    const [teamDatasourcePermissions, setTeamDatasourcePermissions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((_ref = jsonData === null || jsonData === void 0 ? void 0 : jsonData.teamDatasourcePermissions) !== null && _ref !== void 0 ? _ref : []);
    const [teams, setTeams] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [databases, setDatabases] = (0,jotai__WEBPACK_IMPORTED_MODULE_6__/* .useAtom */ .fp)(_store_discover__WEBPACK_IMPORTED_MODULE_9__/* .settingDatabasesAtom */ .AW);
    const [tables, setTables] = (0,jotai__WEBPACK_IMPORTED_MODULE_6__/* .useAtom */ .fp)(_store_discover__WEBPACK_IMPORTED_MODULE_9__/* .settingTablesAtom */ .L);
    const applicationAttributeKey = ((_currentLogsConfig_applicationAttributeKey = currentLogsConfig.applicationAttributeKey) === null || _currentLogsConfig_applicationAttributeKey === void 0 ? void 0 : _currentLogsConfig_applicationAttributeKey.trim()) || '';
    const isSubmitDisabled = Boolean(!state.apiUrl || !state.isApiKeySet && !state.apiKey);
    const resolveDatasource = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback((ds)=>{
        var _getDataSourceSrv_getList_find;
        if (!ds) {
            return undefined;
        }
        if (typeof ds === 'string') {
            return (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__.getDataSourceSrv)().getList().find((item)=>item.uid === ds || item.name === ds);
        }
        return (_getDataSourceSrv_getList_find = (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__.getDataSourceSrv)().getList().find((item)=>item.uid === ds.uid)) !== null && _getDataSourceSrv_getList_find !== void 0 ? _getDataSourceSrv_getList_find : ds;
    }, []);
    const datasourceOptions = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(()=>{
        try {
            return (0,_services_grafana_permissions__WEBPACK_IMPORTED_MODULE_12__/* .getMysqlDatasources */ .tH)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__.getDataSourceSrv)().getList()).map((ds)=>({
                    label: ds.name,
                    value: ds.uid
                }));
        } catch (unused) {
            return [];
        }
    }, []);
    const teamOptions = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(()=>{
        return teams.map((team)=>({
                label: team.name,
                value: team.id
            }));
    }, [
        teams
    ]);
    const updatePermission = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback((index, patch)=>{
        setTeamDatasourcePermissions((current)=>current.map((permission, permissionIndex)=>permissionIndex === index ? _object_spread({}, permission, patch) : permission));
    }, []);
    const addPermission = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback(()=>{
        const firstTeam = teams.find((team)=>!teamDatasourcePermissions.some((permission)=>permission.teamId === team.id));
        setTeamDatasourcePermissions((current)=>{
            var _ref, _ref1;
            return [
                ...current,
                {
                    teamId: (_ref = firstTeam === null || firstTeam === void 0 ? void 0 : firstTeam.id) !== null && _ref !== void 0 ? _ref : 0,
                    teamName: (_ref1 = firstTeam === null || firstTeam === void 0 ? void 0 : firstTeam.name) !== null && _ref1 !== void 0 ? _ref1 : '',
                    datasourceUids: []
                }
            ];
        });
    }, [
        teamDatasourcePermissions,
        teams
    ]);
    const removePermission = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback((index)=>{
        setTeamDatasourcePermissions((current)=>current.filter((_, permissionIndex)=>permissionIndex !== index));
    }, []);
    const initialLogsConfig = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(_object_spread_props(_object_spread({}, logsConfig), {
        database: jsonData === null || jsonData === void 0 ? void 0 : (_jsonData_logsConfig = jsonData.logsConfig) === null || _jsonData_logsConfig === void 0 ? void 0 : _jsonData_logsConfig.database
    }));
    const preferredTraceTable = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(logsConfig.targetTraceTable);
    const { selectDatasource, selectDatabase, databasesLoading, tablesLoading } = (0,_hooks_useDatabaseTableSelection__WEBPACK_IMPORTED_MODULE_7__/* .useDatabaseTableSelection */ .H)({
        setDatabases,
        setTables: (options)=>{
            var _options_find, _options_;
            setTables(options);
            const targetTraceTable = ((_options_find = options.find((option)=>option.value === preferredTraceTable.current)) === null || _options_find === void 0 ? void 0 : _options_find.value) || ((_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value) || '';
            setCurrentLogsConfig((prev)=>_object_spread_props(_object_spread({}, prev), {
                    targetTraceTable
                }));
        },
        onDatabaseChange: (database)=>setCurrentLogsConfig((prev)=>_object_spread_props(_object_spread({}, prev), {
                    database,
                    logsTable: '',
                    targetTraceTable: ''
                })),
        onTableChange: (_datasource, _database, logsTable)=>setCurrentLogsConfig((prev)=>_object_spread_props(_object_spread({}, prev), {
                    logsTable
                }))
    });
    const onResetApiKey = ()=>setState(_object_spread_props(_object_spread({}, state), {
            apiKey: '',
            isApiKeySet: false
        }));
    const onChange = (event)=>{
        setState(_object_spread_props(_object_spread({}, state), {
            [event.target.name]: event.target.value.trim()
        }));
    };
    const onSubmit = ()=>{
        if (isSubmitDisabled) {
            return;
        }
        updatePluginAndReload(plugin.meta.id, {
            enabled,
            pinned,
            jsonData: _object_spread_props(_object_spread({}, jsonData), {
                apiUrl: state.apiUrl
            }),
            // This cannot be queried later by the frontend.
            // We don't want to override it in case it was set previously and left untouched now.
            secureJsonData: state.isApiKeySet ? undefined : {
                apiKey: state.apiKey
            }
        });
    };
    const submitLogConfig = ()=>{
        updatePluginAndReload(plugin.meta.id, {
            enabled,
            pinned,
            jsonData: _object_spread_props(_object_spread({}, jsonData), {
                apiUrl: state.apiUrl,
                logsConfig: _object_spread_props(_object_spread({}, currentLogsConfig), {
                    applicationAttributeKey
                }),
                teamDatasourcePermissions: teamDatasourcePermissions.filter((permission)=>permission.teamId > 0)
            }),
            // This cannot be queried later by the frontend.
            // We don't want to override it in case it was set previously and left untouched now.
            secureJsonData: state.isApiKeySet ? undefined : {
                apiKey: state.apiKey
            }
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void (0,_services_grafana_permissions__WEBPACK_IMPORTED_MODULE_12__/* .fetchTeams */ .jS)().then(setTeams).catch((err)=>(0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_11__/* .toError */ .i)(err), {
                source: 'AppConfig',
                action: 'fetchTeams'
            }));
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const initial = initialLogsConfig.current;
        const datasource = resolveDatasource(initial.datasource);
        setCurrentLogsConfig((prev)=>_object_spread_props(_object_spread({}, prev), {
                datasource: datasource || ''
            }));
        selectDatasource(datasource, {
            database: initial.database,
            table: initial.logsTable
        });
    }, [
        resolveDatasource,
        selectDatasource
    ]);
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
        onSubmit: onSubmit
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.FieldSet, {
        label: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('API Settings')
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('API Key'),
        description: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('A secret key for authenticating to our custom API')
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.SecretInput, {
        width: 60,
        id: "config-api-key",
        "data-testid": _testIds__WEBPACK_IMPORTED_MODULE_8__/* .testIds */ .b.appConfig.apiKey,
        name: "apiKey",
        value: state.apiKey,
        isConfigured: state.isApiKeySet,
        placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Your secret API key'),
        onChange: onChange,
        onReset: onResetApiKey
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('API Url'),
        description: "",
        className: s.marginTop
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Input, {
        width: 60,
        name: "apiUrl",
        id: "config-api-url",
        "data-testid": _testIds__WEBPACK_IMPORTED_MODULE_8__/* .testIds */ .b.appConfig.apiUrl,
        value: state.apiUrl,
        placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('E.g.: http://mywebsite.com/api/v1'),
        onChange: onChange
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: s.marginTop
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
        type: "submit",
        "data-testid": _testIds__WEBPACK_IMPORTED_MODULE_8__/* .testIds */ .b.appConfig.submit,
        disabled: isSubmitDisabled
    }, (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Save API settings'))))), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
        className: s.marginTop,
        onSubmit: submitLogConfig
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.FieldSet, null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Default Datasource')
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__.DataSourcePicker, {
        width: 20,
        type: _services_grafana_permissions__WEBPACK_IMPORTED_MODULE_12__/* .SUPPORTED_DATASOURCE_TYPES */ .bR,
        current: currentLogsConfig.datasource,
        placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Choose'),
        noDefault: true,
        filter: (ds)=>(0,_services_grafana_permissions__WEBPACK_IMPORTED_MODULE_12__/* .isSupportedDatasourceType */ .qE)(ds.type),
        onChange: (item)=>{
            preferredTraceTable.current = '';
            setCurrentLogsConfig((prev)=>_object_spread_props(_object_spread({}, prev), {
                    datasource: item
                }));
            selectDatasource(item);
        }
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Default Database')
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Select, {
        placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Choose'),
        width: 60,
        options: databases,
        value: currentLogsConfig.database,
        disabled: databasesLoading || !currentLogsConfig.datasource || databases.length === 0,
        isLoading: databasesLoading,
        onChange: (selectedDatabase)=>{
            preferredTraceTable.current = '';
            selectDatabase(resolveDatasource(currentLogsConfig.datasource), selectedDatabase.value);
        }
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Default Logs Table')
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Select, {
        placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Choose'),
        options: tables,
        disabled: databasesLoading || tablesLoading || !currentLogsConfig.database || tables.length === 0,
        isLoading: tablesLoading,
        width: 60,
        value: currentLogsConfig.logsTable,
        onChange: (selectedTable)=>{
            setCurrentLogsConfig(_object_spread_props(_object_spread({}, currentLogsConfig), {
                logsTable: selectedTable.value
            }));
        }
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Default Trace Table')
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Select, {
        placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Choose'),
        options: tables,
        disabled: databasesLoading || tablesLoading || !currentLogsConfig.database || tables.length === 0,
        isLoading: tablesLoading,
        width: 60,
        value: currentLogsConfig.targetTraceTable,
        onChange: (selectedTable)=>{
            setCurrentLogsConfig(_object_spread_props(_object_spread({}, currentLogsConfig), {
                targetTraceTable: selectedTable.value
            }));
        }
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Application resource attribute key'),
        description: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Optional. Resource attribute used by the Discover Application filter, for example app or k8s.pod.label.app. Leave empty to disable the filter.')
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Input, {
        width: 60,
        "data-testid": _testIds__WEBPACK_IMPORTED_MODULE_8__/* .testIds */ .b.appConfig.applicationAttributeKey,
        value: currentLogsConfig.applicationAttributeKey || '',
        placeholder: "app",
        onChange: (event)=>{
            setCurrentLogsConfig(_object_spread_props(_object_spread({}, currentLogsConfig), {
                applicationAttributeKey: event.target.value
            }));
        }
    })), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Field, {
        label: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Team Datasource Permissions'),
        description: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Users with no teams can view all MySQL datasources. Users in teams can only view datasources configured here.')
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, teamDatasourcePermissions.map((permission, index)=>{
        const selectedDatasourceOptions = datasourceOptions.filter((option)=>{
            var _option_value;
            return permission.datasourceUids.includes((_option_value = option.value) !== null && _option_value !== void 0 ? _option_value : '');
        });
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
            className: s.permissionRow,
            key: `${permission.teamId}-${index}`
        }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Select, {
            width: 30,
            options: teamOptions,
            value: permission.teamId || undefined,
            placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Choose team'),
            onChange: (selectedTeam)=>{
                var _selectedTeam_value, _selectedTeam_label;
                updatePermission(index, {
                    teamId: (_selectedTeam_value = selectedTeam.value) !== null && _selectedTeam_value !== void 0 ? _selectedTeam_value : 0,
                    teamName: (_selectedTeam_label = selectedTeam.label) !== null && _selectedTeam_label !== void 0 ? _selectedTeam_label : ''
                });
            }
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.MultiSelect, {
            width: 45,
            options: datasourceOptions,
            value: selectedDatasourceOptions,
            placeholder: (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Choose datasources'),
            onChange: (selectedDatasources)=>{
                updatePermission(index, {
                    datasourceUids: selectedDatasources.map((datasource)=>datasource.value).filter((uid)=>Boolean(uid))
                });
            }
        }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
            type: "button",
            variant: "destructive",
            onClick: ()=>removePermission(index)
        }, (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Remove')));
    }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
        type: "button",
        variant: "secondary",
        onClick: addPermission
    }, (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Add team permission')))), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: s.marginTop
    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
        type: "submit"
    }, (0,_i18n__WEBPACK_IMPORTED_MODULE_0__.t)('Save plugin settings'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppConfig);
const getStyles = (theme)=>({
        colorWeak: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_3__.css)`
    color: ${theme.colors.text.secondary};
  `,
        marginTop: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_3__.css)`
    margin-top: ${theme.spacing(3)};
  `,
        permissionRow: (0,_emotion_css__WEBPACK_IMPORTED_MODULE_3__.css)`
    display: flex;
    gap: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
    align-items: flex-start;
  `
    });
const updatePluginAndReload = (pluginId, data)=>_async_to_generator(function*() {
        try {
            yield updatePlugin(pluginId, data);
            // Reloading the page as the changes made here wouldn't be propagated to the actual plugin otherwise.
            // This is not ideal, however unfortunately currently there is no supported way for updating the plugin state.
            window.location.reload();
        } catch (e) {
            (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__.logError)((0,_utils_errors__WEBPACK_IMPORTED_MODULE_11__/* .toError */ .i)(e), {
                source: 'AppConfig',
                action: 'updatePluginAndReload'
            });
        }
    })();
const updatePlugin = (pluginId, data)=>_async_to_generator(function*() {
        const response = yield (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__.getBackendSrv)().fetch({
            url: `/api/plugins/${pluginId}/settings`,
            method: 'POST',
            data
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.lastValueFrom)(response);
    })();


/***/ },

/***/ 5611
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ testIds)
/* harmony export */ });
const testIds = {
    appConfig: {
        apiKey: 'data-testid ac-api-key',
        apiUrl: 'data-testid ac-api-url',
        applicationAttributeKey: 'data-testid application-attribute-key',
        submit: 'data-testid ac-submit-form'
    },
    pageOne: {
        container: 'data-testid pg-one-container',
        navigateToFour: 'data-testid navigate-to-four'
    },
    pageTwo: {
        container: 'data-testid pg-two-container'
    },
    pageThree: {
        container: 'data-testid pg-three-container'
    },
    pageFour: {
        container: 'data-testid pg-four-container',
        navigateBack: 'data-testid navigate-back'
    }
};


/***/ },

/***/ 2351
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  UB: () => (/* binding */ DEFAULT_OPERATION),
  aR: () => (/* binding */ DEFAULT_SERVICE),
  fU: () => (/* binding */ FORMAT_DATE),
  Bg: () => (/* binding */ IntervalEnum),
  Gy: () => (/* binding */ PLUGIN_BASE_URL),
  bw: () => (/* binding */ ROUTES),
  Vy: () => (/* binding */ getAutoInterval),
  VA: () => (/* binding */ translationDateIntervalType)
});

// UNUSED EXPORTS: AUTO_INTERVALS, CAN_SEARCH_FIELD_TYPE, ENABLE_SEARCH_FIELD_TYPE

// EXTERNAL MODULE: ./i18n/index.ts
var i18n = __webpack_require__(2149);
;// ./plugin.json
const plugin_namespaceObject = /*#__PURE__*/JSON.parse('{"id":"velodb-doris-app"}');
// EXTERNAL MODULE: ../node_modules/lodash-es/groupBy.js + 4 modules
var groupBy = __webpack_require__(35);
;// ./constants.ts



const PLUGIN_BASE_URL = `/a/${plugin_namespaceObject.id}`;
var ROUTES = /*#__PURE__*/ function(ROUTES) {
    ROUTES["One"] = "one";
    ROUTES["Discover"] = "discover";
    ROUTES["Traces"] = "traces";
    ROUTES["Dashboard"] = "dashboard";
    return ROUTES;
}({});
const FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss';
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
const DEFAULT_SERVICE = {
    value: 'all',
    get label () {
        return (0,i18n.t)('All');
    }
};
const DEFAULT_OPERATION = {
    value: 'all',
    get label () {
        return (0,i18n.t)('All');
    }
};
const AUTO_INTERVALS = [
    {
        current_date_range: 3,
        current_type: 'year',
        interval_unit: 'month',
        interval_value: 1
    },
    {
        current_date_range: 1,
        current_type: 'year',
        interval_unit: 'week',
        interval_value: 1
    },
    {
        current_date_range: 1,
        current_type: 'month',
        interval_unit: 'day',
        interval_value: 1
    },
    {
        current_date_range: 1,
        current_type: 'week',
        interval_unit: 'hour',
        interval_value: 12
    },
    {
        current_date_range: 4,
        current_type: 'day',
        interval_unit: 'hour',
        interval_value: 3
    },
    {
        current_date_range: 1,
        current_type: 'day',
        interval_unit: 'hour',
        interval_value: 1
    },
    {
        current_date_range: 16,
        current_type: 'hour',
        interval_unit: 'minute',
        interval_value: 30
    },
    {
        current_date_range: 8,
        current_type: 'hour',
        interval_unit: 'minute',
        interval_value: 10
    },
    {
        current_date_range: 2,
        current_type: 'hour',
        interval_unit: 'minute',
        interval_value: 5
    },
    {
        current_date_range: 38,
        current_type: 'minute',
        interval_unit: 'minute',
        interval_value: 1
    },
    {
        current_date_range: 13,
        current_type: 'minute',
        interval_unit: 'second',
        interval_value: 30
    },
    {
        current_date_range: 6,
        current_type: 'minute',
        interval_unit: 'second',
        interval_value: 10
    },
    {
        current_date_range: 4,
        current_type: 'minute',
        interval_unit: 'second',
        interval_value: 5
    },
    {
        current_date_range: 1,
        current_type: 'minute',
        interval_unit: 'second',
        interval_value: 1
    }
];
const CAN_SEARCH_FIELD_TYPE = (/* unused pure expression or super */ null && ([
    'STRING',
    'ARRAY',
    'NUMBER',
    'VARIANT'
]));
const ENABLE_SEARCH_FIELD_TYPE = (/* unused pure expression or super */ null && ([
    'DATETIME',
    'TIMESTAMP',
    'TIME'
]));
function getAutoInterval(currentDate) {
    const AUTO_INTERVALS_OBJ = (0,groupBy/* default */.A)(AUTO_INTERVALS, ({ current_type })=>current_type);
    const [startDate, endDate] = currentDate;
    const diffYear = endDate === null || endDate === void 0 ? void 0 : endDate.diff(startDate, 'year');
    const diffMonth = endDate === null || endDate === void 0 ? void 0 : endDate.diff(startDate, 'month');
    const diffWeek = endDate === null || endDate === void 0 ? void 0 : endDate.diff(startDate, 'week');
    const diffDay = endDate === null || endDate === void 0 ? void 0 : endDate.diff(startDate, 'day');
    const diffHour = endDate === null || endDate === void 0 ? void 0 : endDate.diff(startDate, 'hour');
    const diffMinute = endDate === null || endDate === void 0 ? void 0 : endDate.diff(startDate, 'minute');
    let intervalInfo = {};
    if (diffYear >= 3) {
        intervalInfo = AUTO_INTERVALS_OBJ['year'].find((item)=>{
            return item.current_date_range === 3;
        });
        return intervalInfo;
    }
    if (diffYear < 3 && diffYear >= 1) {
        intervalInfo = AUTO_INTERVALS_OBJ['year'].find((item)=>{
            return item.current_date_range === 1;
        });
        return intervalInfo;
    }
    if (diffMonth >= 1) {
        intervalInfo = AUTO_INTERVALS_OBJ['month'].find((item)=>{
            return item.current_date_range === 1;
        });
        return intervalInfo;
    }
    if (diffWeek >= 1) {
        intervalInfo = AUTO_INTERVALS_OBJ['week'].find((item)=>{
            return item.current_date_range === 1;
        });
        return intervalInfo;
    }
    if (diffDay >= 4) {
        intervalInfo = AUTO_INTERVALS_OBJ['day'].find((item)=>{
            return item.current_date_range === 4;
        });
        return intervalInfo;
    }
    if (diffDay >= 1 && diffDay < 4) {
        intervalInfo = AUTO_INTERVALS_OBJ['day'].find((item)=>{
            return item.current_date_range === 1;
        });
        return intervalInfo;
    }
    if (diffHour >= 16) {
        intervalInfo = AUTO_INTERVALS_OBJ['hour'].find((item)=>{
            return item.current_date_range === 16;
        });
        return intervalInfo;
    }
    if (diffHour >= 8) {
        intervalInfo = AUTO_INTERVALS_OBJ['hour'].find((item)=>{
            return item.current_date_range === 8;
        });
        return intervalInfo;
    }
    if (diffHour >= 2) {
        intervalInfo = AUTO_INTERVALS_OBJ['hour'].find((item)=>{
            return item.current_date_range === 2;
        });
        return intervalInfo;
    }
    if (diffMinute >= 38) {
        intervalInfo = AUTO_INTERVALS_OBJ['minute'].find((item)=>{
            return item.current_date_range === 38;
        });
        return intervalInfo;
    }
    if (diffMinute >= 13) {
        intervalInfo = AUTO_INTERVALS_OBJ['minute'].find((item)=>{
            return item.current_date_range === 13;
        });
        return intervalInfo;
    }
    if (diffMinute >= 6) {
        intervalInfo = AUTO_INTERVALS_OBJ['minute'].find((item)=>{
            return item.current_date_range === 6;
        });
        return intervalInfo;
    }
    if (diffMinute >= 4) {
        intervalInfo = AUTO_INTERVALS_OBJ['minute'].find((item)=>{
            return item.current_date_range === 4;
        });
        return intervalInfo;
    }
    if (diffMinute >= 1) {
        intervalInfo = AUTO_INTERVALS_OBJ['minute'].find((item)=>{
            return item.current_date_range === 1;
        });
        return intervalInfo;
    } else {
        intervalInfo = AUTO_INTERVALS_OBJ['minute'].find((item)=>{
            return item.current_date_range === 1;
        });
        return intervalInfo;
    }
}
function translationDateIntervalType(type) {
    if (type === 'auto') {
        return (0,i18n.t)('Auto');
    } else if (type === 'second') {
        return (0,i18n.t)('Second');
    } else if (type === 'minute') {
        return (0,i18n.t)('Minute');
    } else if (type === 'hour') {
        return (0,i18n.t)('Hour');
    } else if (type === 'day') {
        return (0,i18n.t)('Day');
    } else if (type === 'week') {
        return (0,i18n.t)('Week');
    } else if (type === 'month') {
        return (0,i18n.t)('Month');
    }
    return (0,i18n.t)('Year');
}


/***/ }

}]);
//# sourceMappingURL=170.js.map?_cache=5e6d014db235204e1287