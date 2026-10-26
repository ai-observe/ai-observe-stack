"use strict";
(self["webpackChunkvelodb_doris_app"] = self["webpackChunkvelodb_doris_app"] || []).push([[100],{

/***/ 8078
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ timeRangeFieldClass)
/* harmony export */ });
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6089);
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_css__WEBPACK_IMPORTED_MODULE_0__);

const timeRangeFieldClass = (0,_emotion_css__WEBPACK_IMPORTED_MODULE_0__.css)`
    /* Grafana's time popup uses a transformed floating container. A nested,
       non-portaled Select must use local coordinates instead of viewport ones. */
    #TimePickerContent div:has(> div > [role='listbox']) {
        position: absolute;
        inset: 100% 0 auto;
        width: 100%;
    }
`;


/***/ },

/***/ 879
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ TraceDetail)
});

// EXTERNAL MODULE: ./i18n/index.ts
var i18n = __webpack_require__(2149);
// EXTERNAL MODULE: ./utils/time.ts
var time = __webpack_require__(1157);
// EXTERNAL MODULE: external "@grafana/data"
var data_ = __webpack_require__(7781);
// EXTERNAL MODULE: external "@grafana/runtime"
var runtime_ = __webpack_require__(8531);
// EXTERNAL MODULE: external "@grafana/ui"
var ui_ = __webpack_require__(2007);
// EXTERNAL MODULE: ../node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(5285);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);
// EXTERNAL MODULE: ../node_modules/dayjs/plugin/utc.js
var utc = __webpack_require__(4486);
var utc_default = /*#__PURE__*/__webpack_require__.n(utc);
// EXTERNAL MODULE: ../node_modules/jotai/esm/react.mjs
var react = __webpack_require__(3689);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(5959);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./constants.ts + 1 modules
var constants = __webpack_require__(2351);
// EXTERNAL MODULE: ./services/traces.ts + 1 modules
var traces = __webpack_require__(3764);
// EXTERNAL MODULE: ./store/discover.ts
var discover = __webpack_require__(6247);
// EXTERNAL MODULE: ./store/traces.ts
var store_traces = __webpack_require__(3982);
// EXTERNAL MODULE: ./types/plugin-settings.ts
var plugin_settings = __webpack_require__(325);
// EXTERNAL MODULE: ./utils/data.ts
var utils_data = __webpack_require__(6700);
// EXTERNAL MODULE: ./utils/errors.ts
var errors = __webpack_require__(9071);
;// ./utils/utils.routing.ts

// Prefixes the route with the base URL of the plugin
function prefixRoute(route) {
    return `${constants/* PLUGIN_BASE_URL */.Gy}/${route}`;
}

;// ./components/trace-detail/index.tsx
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

















const SPAN_LOGS_WINDOW_PADDING_MS = 30 * 1000;
dayjs_min_default().extend((utc_default()));
function escapeLucenePhrase(value) {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
function getSpanTimeRange(span) {
    const spanStartTimeMs = Math.floor(Number(span.startTime || 0) / 1000);
    const spanDurationMs = Math.ceil(Number(span.duration || 0) / 1000);
    const start = dayjs_min_default().utc(spanStartTimeMs - SPAN_LOGS_WINDOW_PADDING_MS);
    const end = dayjs_min_default().utc(spanStartTimeMs + Math.max(spanDurationMs, 0) + SPAN_LOGS_WINDOW_PADDING_MS);
    return {
        start,
        end
    };
}
function buildDiscoverLogsUrl(params) {
    const searchParams = new URLSearchParams();
    const traceQuery = `trace_id:"${escapeLucenePhrase(params.traceId)}"`;
    const spanScopeQuery = [
        params.spanId ? `span_id:"${escapeLucenePhrase(params.spanId)}"` : '',
        params.serviceName ? `service_name:"${escapeLucenePhrase(params.serviceName)}"` : ''
    ].filter(Boolean);
    if (params.datasource) {
        searchParams.set('datasource', params.datasource);
    }
    if (params.database) {
        searchParams.set('database', params.database);
    }
    if (params.table) {
        searchParams.set('table', params.table);
    }
    searchParams.set('mode', 'Lucene');
    searchParams.set('query', spanScopeQuery.length > 0 ? `${traceQuery} AND (${spanScopeQuery.join(' OR ')})` : traceQuery);
    searchParams.set('timeField', params.timeField || 'timestamp');
    if (params.timeZone) {
        searchParams.set('timeZone', params.timeZone);
    }
    searchParams.set('startTime', (0,time/* formatShareTime */.yK)(params.start));
    searchParams.set('endTime', (0,time/* formatShareTime */.yK)(params.end));
    return `${prefixRoute(constants/* ROUTES */.bw.Discover)}?${searchParams.toString()}`;
}
function TraceDetail(props) {
    var _context_meta_jsonData;
    const timeZone = (0,react/* useAtomValue */.md)(discover/* timeZoneAtom */.tF);
    const currentTable = (0,react/* useAtomValue */.md)(store_traces/* currentTraceTableAtom */.AZ);
    const currentCatalog = (0,react/* useAtomValue */.md)(discover/* currentCatalogAtom */.K0);
    const currentDatabase = (0,react/* useAtomValue */.md)(discover/* currentDatabaseAtom */.Cf);
    const [traceData, setTraceData] = (0,react/* useAtom */.fp)(discover/* tableTracesDataAtom */.UB);
    const selectedRow = (0,react/* useAtomValue */.md)(discover/* selectedRowAtom */.nn);
    const selectdbDS = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const traceTable = (props === null || props === void 0 ? void 0 : props.traceTable) || currentTable || 'otel_traces';
    const [loading, setLoading] = external_react_default().useState(false);
    const context = (0,data_.usePluginContext)();
    const logsConfig = (0,plugin_settings/* mergeLogsConfig */.oW)((_context_meta_jsonData = context.meta.jsonData) === null || _context_meta_jsonData === void 0 ? void 0 : _context_meta_jsonData.logsConfig);
    const { open, traceId } = props;
    const createSpanLink = external_react_default().useCallback((span)=>{
        var _span_process;
        const traceId = span.traceID || props.traceId || '';
        const spanId = span.spanID || '';
        const serviceName = ((_span_process = span.process) === null || _span_process === void 0 ? void 0 : _span_process.serviceName) || '';
        if (!traceId) {
            return undefined;
        }
        const { start, end } = getSpanTimeRange(span);
        const href = buildDiscoverLogsUrl({
            datasource: (selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.uid) || (selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.name) || '',
            database: logsConfig.database || currentDatabase,
            table: logsConfig.logsTable || 'otel_logs',
            timeField: 'timestamp',
            timeZone,
            traceId,
            spanId,
            serviceName,
            start,
            end
        });
        return [
            {
                href,
                content: 'Logs',
                title: (0,i18n.t)('Logs for this span'),
                type: 'log',
                field: {
                    name: 'span_id',
                    type: data_.FieldType.string,
                    config: {},
                    values: []
                },
                onClick: ()=>{
                    window.location.assign(href);
                }
            }
        ];
    }, [
        currentDatabase,
        logsConfig.database,
        logsConfig.logsTable,
        props.traceId,
        selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.name,
        selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.uid,
        timeZone
    ]);
    const getTraceData = external_react_default().useCallback(()=>{
        let payload = {
            catalog: currentCatalog,
            database: currentDatabase,
            table: traceTable,
            cluster: '',
            sort: 'DESC',
            trace_id: traceId || ''
        };
        setLoading(true);
        return (0,traces/* getTableDataTraceService */.hA)(_object_spread({
            selectdbDS
        }, payload)).subscribe({
            next: ({ data, ok })=>{
                setLoading(false);
                if (ok) {
                    const formatedData = (0,utils_data/* formatTracesResData */.O1)(data.results.getTableDataTrace.frames[0]);
                    setTraceData(formatedData);
                }
            },
            error: (err)=>{
                setLoading(false);
                (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                    source: 'TraceDetail',
                    action: 'getTraceData'
                });
            }
        });
    }, [
        currentCatalog,
        currentDatabase,
        traceTable,
        selectdbDS,
        setTraceData,
        traceId
    ]);
    (0,external_react_.useEffect)(()=>{
        if (open && traceId) {
            const subscription = getTraceData();
            return ()=>subscription.unsubscribe();
        }
        return undefined;
    }, [
        selectedRow.trace_id,
        currentCatalog,
        currentDatabase,
        selectdbDS,
        setTraceData,
        getTraceData,
        traceId,
        open
    ]);
    function renderTracePanel() {
        if (traceData) {
            var _traceData_fields_find, _traceData_fields_find1;
            const starts = ((_traceData_fields_find = traceData.fields.find((field)=>field.name === 'startTime')) === null || _traceData_fields_find === void 0 ? void 0 : _traceData_fields_find.values) || [];
            const durations = ((_traceData_fields_find1 = traceData.fields.find((field)=>field.name === 'duration')) === null || _traceData_fields_find1 === void 0 ? void 0 : _traceData_fields_find1.values) || [];
            const finiteStarts = Array.from(starts).map(Number).filter(Number.isFinite);
            const start = finiteStarts.length ? Math.min(...finiteStarts) : Date.now() - 15 * 60 * 1000;
            const end = finiteStarts.length ? Math.max(...Array.from(starts).map((value, index)=>Number(value) + Number(durations[index] || 0))) : Date.now();
            return /*#__PURE__*/ external_react_default().createElement(runtime_.PanelRenderer, {
                title: (0,i18n.t)('Trace panel'),
                width: 200,
                height: 300,
                pluginId: "traces",
                timeZone: timeZone,
                options: {
                    createSpanLink
                },
                data: {
                    state: loading ? data_.LoadingState.Loading : data_.LoadingState.Done,
                    series: [
                        traceData
                    ],
                    timeRange: (0,time/* buildAbsoluteTimeRange */.kh)(dayjs_min_default().utc(start), dayjs_min_default().utc(end))
                }
            });
        }
        return null;
    }
    return /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, open && /*#__PURE__*/ external_react_default().createElement(ui_.Drawer, {
        title: (0,i18n.t)('Trace Panel'),
        onClose: ()=>{
            var _props_onClose;
            props === null || props === void 0 ? void 0 : (_props_onClose = props.onClose) === null || _props_onClose === void 0 ? void 0 : _props_onClose.call(props);
        },
        size: "lg"
    }, loading ? /*#__PURE__*/ external_react_default().createElement(ui_.LoadingPlaceholder, {
        text: (0,i18n.t)('Loading')
    }) : renderTracePanel()));
}


/***/ },

/***/ 9693
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ useDatasourcePermissions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8531);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_grafana_permissions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7116);
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9071);
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




const EMPTY_PERMISSIONS = [];
function useDatasourcePermissions(permissions = EMPTY_PERMISSIONS, source) {
    const permissionRules = permissions !== null && permissions !== void 0 ? permissions : EMPTY_PERMISSIONS;
    const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0___default().useState({
        allowedDatasources: [],
        allowedDatasourceUids: new Set(),
        loading: true
    });
    react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(()=>{
        let isMounted = true;
        // An empty permission configuration means that no team-level restriction is
        // configured. Do not make the datasource picker depend on the user-teams API
        // in that case: the endpoint may be unavailable behind a reverse proxy or
        // for Grafana deployments that do not use teams at all.
        if (permissionRules.length === 0) {
            const allowedDatasources = (0,_services_grafana_permissions__WEBPACK_IMPORTED_MODULE_2__/* .filterDatasourcesByTeamPermissions */ .ho)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getDataSourceSrv)().getList(), [], EMPTY_PERMISSIONS);
            setState({
                allowedDatasources,
                allowedDatasourceUids: new Set(allowedDatasources.map((ds)=>ds.uid)),
                loading: false
            });
            return ()=>{
                isMounted = false;
            };
        }
        function loadPermissions() {
            return _async_to_generator(function*() {
                try {
                    const teams = yield (0,_services_grafana_permissions__WEBPACK_IMPORTED_MODULE_2__/* .fetchCurrentUserTeams */ .lp)();
                    const allowedDatasources = (0,_services_grafana_permissions__WEBPACK_IMPORTED_MODULE_2__/* .filterDatasourcesByTeamPermissions */ .ho)((0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.getDataSourceSrv)().getList(), teams, permissionRules);
                    if (!isMounted) {
                        return;
                    }
                    setState({
                        allowedDatasources,
                        allowedDatasourceUids: new Set(allowedDatasources.map((ds)=>ds.uid)),
                        loading: false
                    });
                } catch (error) {
                    const err = (0,_utils_errors__WEBPACK_IMPORTED_MODULE_3__/* .toError */ .i)(error);
                    (0,_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__.logError)(err, {
                        source,
                        action: 'loadDatasourcePermissions'
                    });
                    if (!isMounted) {
                        return;
                    }
                    setState({
                        allowedDatasources: [],
                        allowedDatasourceUids: new Set(),
                        loading: false,
                        error: err
                    });
                }
            })();
        }
        void loadPermissions();
        return ()=>{
            isMounted = false;
        };
    }, [
        permissionRules,
        source
    ]);
    return state;
}


/***/ },

/***/ 3764
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  jo: () => (/* binding */ getOperationListService),
  FC: () => (/* binding */ getServiceListService),
  hA: () => (/* binding */ getTableDataTraceService),
  Cy: () => (/* binding */ getTracesService),
  hl: () => (/* binding */ traceCapabilityKey)
});

// EXTERNAL MODULE: ./i18n/index.ts
var i18n = __webpack_require__(2149);
// EXTERNAL MODULE: external "rxjs"
var external_rxjs_ = __webpack_require__(1269);
// EXTERNAL MODULE: ../node_modules/sqlstring/index.js
var sqlstring = __webpack_require__(1194);
var sqlstring_default = /*#__PURE__*/__webpack_require__.n(sqlstring);
// EXTERNAL MODULE: ./utils/data.ts
var data = __webpack_require__(6700);
// EXTERNAL MODULE: ./utils/time.ts
var time = __webpack_require__(1157);
// EXTERNAL MODULE: external "@grafana/runtime"
var runtime_ = __webpack_require__(8531);
;// ./services/traces.sql.ts

function getQueryTableTraceSQL(params) {
    const { table, trace_id, database } = params;
    const sql = `
      SELECT
      trace_id AS traceID,
      span_id AS spanID,
      parent_span_id AS parentSpanID,
      span_name AS operationName,
      service_name AS serviceName,

      CAST(resource_attributes AS TEXT) AS serviceTags,

      milliseconds_diff(timestamp, '1970-01-01 00:00:00') AS startTime,
      duration / 1000 AS duration,

      CAST(span_attributes AS TEXT) AS tags,
      CAST(ARRAY_MAP(e -> NAMED_STRUCT(
        'timestamp', CAST(milliseconds_diff(STRUCT_ELEMENT(e, 'timestamp'), '1970-01-01 00:00:00') AS BIGINT),
        'name', STRUCT_ELEMENT(e, 'name'),
        'attributes', STRUCT_ELEMENT(e, 'attributes')
      ), events) AS JSON) AS logs,

      span_kind AS kind,
      CASE
        WHEN status_code IN ('STATUS_CODE_ERROR', 'ERROR') THEN 2
        WHEN status_code IN ('STATUS_CODE_OK', 'OK') THEN 1
        ELSE 0
      END AS statusCode,
      status_message AS statusMessage,
      scope_name AS instrumentationLibraryName,
      scope_version AS instrumentationLibraryVersion,
      trace_state AS traceState
    FROM ${sqlstring_default().escapeId(database)}.${sqlstring_default().escapeId(table)}
    WHERE trace_id = ${sqlstring_default().escape(trace_id)};
    `;
    return sql;
}
function parseDuration(input) {
    if (!input) {
        return 0;
    }
    const normalizedInput = input.trim().toLowerCase();
    if (!normalizedInput) {
        return 0;
    }
    if (normalizedInput.endsWith('ms')) {
        return parseFloat(normalizedInput.replace('ms', ''));
    } else if (normalizedInput.endsWith('us')) {
        return parseFloat(normalizedInput.replace('us', '')) / 1000;
    } else if (normalizedInput.endsWith('s')) {
        return parseFloat(normalizedInput.replace('s', '')) * 1000;
    }
    // Treat bare numeric input as milliseconds for simpler filtering.
    const numericDuration = parseFloat(normalizedInput);
    return Number.isFinite(numericDuration) ? numericDuration : 0;
}
function tagsToDorisSQLConditions(tags, tableAlias) {
    const conditions = [];
    const regex = /([\w.]+)=(?:"([^"]+)"|'([^']+)'|([^\s]+))/g;
    let match;
    while((match = regex.exec(tags || '')) !== null){
        const root = tableAlias ? `${tableAlias}.span_attributes` : 'span_attributes';
        const path = match[1].split('.').map((key)=>`[${sqlstring_default().escape(key)}]`).join('');
        conditions.push(`${root}${path} = ${sqlstring_default().escape(match[2] || match[3] || match[4])}`);
    }
    return conditions.length ? conditions.join(' AND ') : '1=1';
}
function tableName(params) {
    return `${sqlstring_default().escapeId(params.database)}.${sqlstring_default().escapeId(params.table)}`;
}
function spanFilter(params) {
    return [
        params.service_name && params.service_name !== 'all' ? `service_name = ${sqlstring_default().escape(params.service_name)}` : '',
        params.operation && params.operation !== 'all' ? `span_name = ${sqlstring_default().escape(params.operation)}` : '',
        params.statusCode && params.statusCode !== 'all' ? `status_code = ${sqlstring_default().escape(params.statusCode)}` : '',
        params.tags ? tagsToDorisSQLConditions(params.tags) : ''
    ].filter(Boolean).join(' AND ');
}
function durationFilter(params, expression = 'trace_duration_ms') {
    const min = parseDuration(params.minDuration);
    const max = parseDuration(params.maxDuration);
    return [
        min > 0 ? `${expression} >= ${min}` : '',
        max > 0 ? `${expression} <= ${max}` : ''
    ].filter(Boolean).join(' AND ');
}
function orderBy(params, summary = false) {
    const columns = {
        'most-recent': summary ? 'start_time DESC' : 'time DESC',
        'longest-duration': 'trace_duration_ms DESC',
        'shortest-duration': 'trace_duration_ms ASC',
        'most-spans': summary ? 'span_count DESC' : 'spans DESC',
        'least-spans': summary ? 'span_count ASC' : 'spans ASC'
    };
    return `${columns[params.sortBy || 'most-recent'] || columns['most-recent']}, trace_id DESC`;
}
function pagination(params) {
    const limit = Math.max(1, Math.floor(params.page_size || 50));
    const offset = Math.max(0, (Math.floor(params.page || 1) - 1) * limit);
    return `LIMIT ${limit} OFFSET ${offset}`;
}
function legacyTraceCTEs(params) {
    const table = tableName(params);
    const time = sqlstring_default().escapeId(params.timeField);
    const start = sqlstring_default().escape(params.startDate);
    const end = sqlstring_default().escape(params.endDate);
    const filters = spanFilter(params);
    return `WITH
  matching_trace_ids AS (
    SELECT DISTINCT trace_id FROM ${table}
    WHERE ${time} >= ${start} AND ${time} < ${end}${filters ? ` AND ${filters}` : ''}
  ),
  root_candidates AS (
    SELECT trace_id, ${time} AS root_time, span_name AS operation, service_name AS root_service,
      duration AS root_duration,
      ROW_NUMBER() OVER (PARTITION BY trace_id ORDER BY ${time} ASC, span_id ASC) AS root_rank
    FROM ${table}
    WHERE (parent_span_id IS NULL OR parent_span_id = '')
      AND ${time} >= ${start} AND ${time} < ${end}
      AND trace_id IN (SELECT trace_id FROM matching_trace_ids)
  ),
  selected_roots AS (
    SELECT * FROM root_candidates WHERE root_rank = 1
  ),
  trace_metrics AS (
    SELECT t.trace_id, milliseconds_diff(r.root_time, '1970-01-01 00:00:00') / 1000 AS time, r.operation, r.root_service,
      COLLECT_SET(t.service_name) AS services, COUNT(*) AS spans,
      SUM(IF(t.status_code IN ('STATUS_CODE_ERROR', 'ERROR'), 1, 0)) AS error_spans,
      MAX(t.duration) / 1000 AS max_span_duration_ms,
      MAX(milliseconds_diff(t.${time}, '1970-01-01 00:00:00') + t.duration / 1000)
        - MIN(milliseconds_diff(t.${time}, '1970-01-01 00:00:00')) AS trace_duration_ms,
      r.root_duration / 1000 AS root_span_duration_ms
    FROM ${table} t JOIN selected_roots r ON t.trace_id = r.trace_id
    WHERE t.${time} >= ${start} - INTERVAL 2 DAY AND t.${time} < ${end} + INTERVAL 2 DAY
    GROUP BY t.trace_id, r.root_time, r.operation, r.root_service, r.root_duration
  ),
  eligible_traces AS (
    SELECT * FROM trace_metrics${durationFilter(params) ? ` WHERE ${durationFilter(params)}` : ''}
  )`;
}
function buildTraceAggSQLFromParams(params) {
    return `${legacyTraceCTEs(params)}
SELECT * FROM eligible_traces ORDER BY ${orderBy(params)} ${pagination(params)};`;
}
function buildTraceCountSQLFromParams(params) {
    return `${legacyTraceCTEs(params)} SELECT COUNT(*) AS total FROM ${durationFilter(params) ? 'eligible_traces' : 'selected_roots'};`;
}
/** Keep the inner grouping/aggregates identical to the synchronous exporter MV.
 * Roll up BEFORE HAVING, ordering or pagination so midnight cannot split a trace.
 * Probe this exact shape with EXPLAIN; unsupported rewrites use the legacy path.
 */ function traceSummarySQL(params) {
    const table = tableName(params);
    const start = sqlstring_default().escape(params.startDate);
    const end = sqlstring_default().escape(params.endDate);
    const filters = spanFilter(params);
    const duration = durationFilter(params, 'milliseconds_diff(MAX(end_time), MIN(start_time))');
    return `SELECT trace_id, MIN(start_time) AS start_time, MAX(end_time) AS end_time,
    SUM(span_count) AS span_count, SUM(error_count) AS error_count,
    MIN(first_root) AS first_root, MAX(max_span_duration) AS max_span_duration,
    milliseconds_diff(MAX(end_time), MIN(start_time)) AS trace_duration_ms
FROM (
  SELECT trace_id, MIN(\`timestamp\`) AS start_time, MAX(end_time) AS end_time,
    COUNT(*) AS span_count,
    SUM(CASE WHEN status_code = 'STATUS_CODE_ERROR' THEN 1 ELSE 0 END) AS error_count,
    MIN(CASE WHEN is_root = 1 THEN CONCAT(DATE_FORMAT(\`timestamp\`, '%Y%m%d%H%i%s%f'), '|', service_name, '|', span_name) END) AS first_root,
    MAX(duration) AS max_span_duration
  FROM ${table}
  WHERE date_trunc(\`timestamp\`, 'day') >= date_trunc(${start}, 'day') - INTERVAL 2 DAY
    AND date_trunc(\`timestamp\`, 'day') <= date_trunc(${end}, 'day') + INTERVAL 2 DAY
    ${filters ? `AND trace_id IN (SELECT trace_id FROM ${table} WHERE \`timestamp\` >= ${start} AND \`timestamp\` < ${end} AND ${filters})` : ''}
  GROUP BY trace_id, date_trunc(\`timestamp\`, 'day')
) daily
GROUP BY trace_id
HAVING MIN(start_time) >= ${start} AND MIN(start_time) < ${end}
  AND MIN(first_root) IS NOT NULL${duration ? ` AND ${duration}` : ''}`;
}
function buildTraceSummaryListSQL(params) {
    return `${traceSummarySQL(params)} ORDER BY ${orderBy(params, true)} ${pagination(params)};`;
}
function buildTraceSummaryCountSQL(params) {
    return `SELECT COUNT(*) AS total, SUM(span_count) AS total_spans FROM (${traceSummarySQL(params)}) traces;`;
}
function buildTraceSupplementSQL(params, traceIds) {
    // Fetch only this page. Earliest root uses span_id for deterministic ties,
    // which cannot be recovered from the MV's first_root string alone.
    return `WITH spans AS (
    SELECT * FROM ${tableName(params)}
    WHERE \`${params.timeField.replace(/`/g, '``')}\` >= ${sqlstring_default().escape(params.startDate)} - INTERVAL 2 DAY
      AND \`${params.timeField.replace(/`/g, '``')}\` < ${sqlstring_default().escape(params.endDate)} + INTERVAL 2 DAY
      AND trace_id IN (${traceIds.map((id)=>sqlstring_default().escape(id)).join(', ') || 'NULL'})
  ), roots AS (
    SELECT trace_id, service_name, span_name, duration,
      ROW_NUMBER() OVER (PARTITION BY trace_id ORDER BY \`timestamp\` ASC, span_id ASC) AS root_rank
    FROM spans WHERE is_root = 1
  )
  SELECT s.trace_id, COLLECT_SET(s.service_name) AS services,
    r.service_name AS root_service, r.span_name AS operation, r.duration / 1000 AS root_span_duration_ms
  FROM spans s LEFT JOIN roots r ON s.trace_id = r.trace_id AND r.root_rank = 1
  GROUP BY s.trace_id, r.service_name, r.span_name, r.duration;`;
}
function getServiceListSQL(params) {
    return `SELECT DISTINCT service_name FROM ${params.database ? sqlstring_default().escapeId(params.database) + '.' : ''}${sqlstring_default().escapeId(params.table)}
    WHERE ${sqlstring_default().escapeId(params.timeField)} >= ${sqlstring_default().escape(params.startDate)}
      AND ${sqlstring_default().escapeId(params.timeField)} < ${sqlstring_default().escape(params.endDate)} ORDER BY service_name ASC`;
}
function getOperationListSQL(params) {
    return `SELECT DISTINCT span_name FROM ${params.database ? sqlstring_default().escapeId(params.database) + '.' : ''}${sqlstring_default().escapeId(params.table)}
    WHERE ${sqlstring_default().escapeId(params.timeField)} >= ${sqlstring_default().escape(params.startDate)}
      AND ${sqlstring_default().escapeId(params.timeField)} < ${sqlstring_default().escape(params.endDate)}
      AND service_name = ${sqlstring_default().escape(params.service_name)} ORDER BY span_name ASC`;
}

// EXTERNAL MODULE: ./components/with-error-handler/withErrorHandler.tsx
var withErrorHandler = __webpack_require__(6472);
;// ./services/traces.ts
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








// 获取table的Trace数据
function getTableDataTraceService(payload, options) {
    const { selectdbDS } = payload, rest = _object_without_properties(payload, [
        "selectdbDS"
    ]);
    const traceSQL = getQueryTableTraceSQL(rest);
    return (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTableDataTrace',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: traceSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), options);
}
function traceRows(response, refId) {
    var _response_data_results, _response_data, _result_frames;
    const result = response === null || response === void 0 ? void 0 : (_response_data = response.data) === null || _response_data === void 0 ? void 0 : (_response_data_results = _response_data.results) === null || _response_data_results === void 0 ? void 0 : _response_data_results[refId];
    if (!(response === null || response === void 0 ? void 0 : response.ok) || (result === null || result === void 0 ? void 0 : result.error) || (result === null || result === void 0 ? void 0 : result.status) >= 400) {
        throw new Error((result === null || result === void 0 ? void 0 : result.error) || (response === null || response === void 0 ? void 0 : response.statusText) || (0,i18n.t)('Trace query failed'));
    }
    return (result === null || result === void 0 ? void 0 : (_result_frames = result.frames) === null || _result_frames === void 0 ? void 0 : _result_frames.length) ? result.frames.flatMap((frame)=>(0,data/* convertColumnToRow */.HL)(frame)) : [];
}
function runTraceSQL(selectdbDS, queries, options) {
    return _async_to_generator(function*() {
        return (0,external_rxjs_.lastValueFrom)((0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
            url: '/api/ds/query',
            method: 'POST',
            credentials: 'include',
            data: {
                queries: queries.map((query)=>_object_spread_props(_object_spread({}, query), {
                        datasource: {
                            type: selectdbDS.type,
                            uid: selectdbDS.uid
                        },
                        format: 'table'
                    }))
            }
        }), options));
    })();
}
function traceCapabilityKey(payload) {
    return JSON.stringify([
        payload.selectdbDS.uid,
        payload.database,
        payload.table
    ]);
}
const capabilityRequests = new Map();
function detectTraceCapability(payload) {
    return _async_to_generator(function*() {
        const key = traceCapabilityKey(payload);
        const existing = capabilityRequests.get(key);
        if (existing) {
            return existing;
        }
        const promise = (()=>_async_to_generator(function*() {
                try {
                    const table = `${sqlstring_default().escapeId(payload.database)}.${sqlstring_default().escapeId(payload.table)}`;
                    const response = yield runTraceSQL(payload.selectdbDS, [
                        {
                            refId: 'traceFields',
                            rawSql: `DESC ${table}`
                        },
                        {
                            refId: 'traceIndexes',
                            rawSql: `DESC ${table} ALL`
                        }
                    ], {
                        showBackendError: false
                    });
                    const fields = traceRows(response, 'traceFields');
                    const indexes = traceRows(response, 'traceIndexes');
                    // DESC ALL lists installed synchronous indexes; incomplete builds
                    // are absent. IndexName is only set on the first row of an index.
                    return {
                        hasSummary: fields.some((row)=>row.Field === 'is_root') && indexes.some((row)=>row.IndexName === `${payload.table}_summary`),
                        rewrites: {}
                    };
                } catch (unused) {
                    return {
                        hasSummary: false,
                        rewrites: {}
                    };
                }
            })())();
        capabilityRequests.set(key, promise);
        try {
            return yield promise;
        } finally{
            capabilityRequests.delete(key);
        }
    })();
}
/** Normalize both storage generations at the service boundary. */ function getTracesService(payload, options) {
    return (0,external_rxjs_.defer)(()=>_async_to_generator(function*() {
            const { selectdbDS } = payload, params = _object_without_properties(payload, [
                "selectdbDS"
            ]);
            const backendOptions = {
                showBackendError: options === null || options === void 0 ? void 0 : options.showBackendError,
                defaultMessage: options === null || options === void 0 ? void 0 : options.defaultMessage
            };
            let capability = options === null || options === void 0 ? void 0 : options.capability;
            let useSummary = false;
            if (params.timeField === 'timestamp') {
                var _options_onCapability;
                capability = capability || (yield detectTraceCapability(payload));
                if (capability.hasSummary) {
                    const listSQL = buildTraceSummaryListSQL(params);
                    const countSQL = buildTraceSummaryCountSQL(params);
                    // Literal values do not change rewrite eligibility, but filter
                    // structure, sort and grouping do. Avoid EXPLAIN on every page.
                    const shape = [
                        listSQL,
                        countSQL
                    ].join('\n').replace(/'(?:[^'\\]|\\.)*'/g, '?').replace(/\b\d+\b/g, '#');
                    let rewrites = capability.rewrites[shape];
                    if (rewrites === undefined) {
                        try {
                            const explain = yield runTraceSQL(selectdbDS, [
                                {
                                    refId: 'explainTraceList',
                                    rawSql: `EXPLAIN ${listSQL}`
                                },
                                {
                                    refId: 'explainTraceCount',
                                    rawSql: `EXPLAIN ${countSQL}`
                                }
                            ], {
                                showBackendError: false
                            });
                            const index = `${params.table}_summary`.toLowerCase();
                            rewrites = [
                                'explainTraceList',
                                'explainTraceCount'
                            ].every((refId)=>traceRows(explain, refId).some((row)=>Object.values(row).some((value)=>String(value).toLowerCase().includes(`(${index})`))));
                        } catch (unused) {
                            rewrites = false;
                        }
                        capability = _object_spread_props(_object_spread({}, capability), {
                            rewrites: _object_spread_props(_object_spread({}, capability.rewrites), {
                                [shape]: rewrites
                            })
                        });
                    }
                    useSummary = rewrites;
                }
                options === null || options === void 0 ? void 0 : (_options_onCapability = options.onCapability) === null || _options_onCapability === void 0 ? void 0 : _options_onCapability.call(options, capability);
            }
            const query = (summary)=>_async_to_generator(function*() {
                    var _traceRows_;
                    // A single HTTP request runs independent list/count targets together.
                    const response = yield runTraceSQL(selectdbDS, [
                        {
                            refId: 'getTraces',
                            rawSql: summary ? buildTraceSummaryListSQL(params) : buildTraceAggSQLFromParams(params)
                        },
                        {
                            refId: 'getTraceCount',
                            rawSql: summary ? buildTraceSummaryCountSQL(params) : buildTraceCountSQLFromParams(params)
                        }
                    ], summary ? {
                        showBackendError: false
                    } : backendOptions);
                    let rows = traceRows(response, 'getTraces');
                    const total = Number(((_traceRows_ = traceRows(response, 'getTraceCount')[0]) === null || _traceRows_ === void 0 ? void 0 : _traceRows_.total) || 0);
                    if (summary && rows.length) {
                        const supplementResponse = yield runTraceSQL(selectdbDS, [
                            {
                                refId: 'traceSupplement',
                                rawSql: buildTraceSupplementSQL(params, rows.map((row)=>row.trace_id))
                            }
                        ], {
                            showBackendError: false
                        });
                        const supplements = new Map(traceRows(supplementResponse, 'traceSupplement').map((row)=>[
                                row.trace_id,
                                row
                            ]));
                        rows = rows.map((row)=>{
                            const root = String(row.first_root || '').split('|');
                            const start = (0,time/* parseDorisTime */.sN)(row.start_time);
                            const end = (0,time/* parseDorisTime */.sN)(row.end_time);
                            return _object_spread(_object_spread_props(_object_spread({}, row), {
                                time: start.valueOf() / 1000,
                                root_service: root[1] || '',
                                operation: root.slice(2).join('|'),
                                spans: Number(row.span_count),
                                error_spans: Number(row.error_count),
                                trace_duration_ms: end.diff(start, 'millisecond', true),
                                max_span_duration_ms: Number(row.max_span_duration) / 1000
                            }), supplements.get(row.trace_id));
                        });
                    }
                    return {
                        rows,
                        total
                    };
                })();
            if (useSummary) {
                try {
                    return yield query(true);
                } catch (unused) {
                    var // Schema/MV can change after detection. Retry once with the
                    // compatible query and expose its real error if that fails too.
                    _options_onCapability1;
                    options === null || options === void 0 ? void 0 : (_options_onCapability1 = options.onCapability) === null || _options_onCapability1 === void 0 ? void 0 : _options_onCapability1.call(options, {
                        hasSummary: false,
                        rewrites: {}
                    });
                }
            }
            return query(false);
        })());
}
// 查询Trace Services
function getServiceListService(payload, options) {
    const { selectdbDS } = payload, rest = _object_without_properties(payload, [
        "selectdbDS"
    ]);
    const serviceListSQL = getServiceListSQL(rest);
    return (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getServiceList',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: serviceListSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), options);
}
// 查询Trace Operations
function getOperationListService(payload, options) {
    const { selectdbDS } = payload, rest = _object_without_properties(payload, [
        "selectdbDS"
    ]);
    const operationListSQL = getOperationListSQL(rest);
    return (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getOperationList',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: operationListSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), options);
}


/***/ },

/***/ 3982
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AZ: () => (/* binding */ currentTraceTableAtom),
/* harmony export */   Ap: () => (/* binding */ tracesCapabilityAtom),
/* harmony export */   E: () => (/* binding */ tracesServicesAtom),
/* harmony export */   VA: () => (/* binding */ traceOperationsAtom),
/* harmony export */   fy: () => (/* binding */ currentSortAtom),
/* harmony export */   gL: () => (/* binding */ currentServiceAtom),
/* harmony export */   jB: () => (/* binding */ tagsAtom),
/* harmony export */   mH: () => (/* binding */ currentOperationAtom),
/* harmony export */   oC: () => (/* binding */ minDurationAtom),
/* harmony export */   ok: () => (/* binding */ tracesAtom),
/* harmony export */   uS: () => (/* binding */ maxDurationAtom)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2351);
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4945);
/* harmony import */ var jotai_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6303);



const currentTraceTableAtom = (0,jotai_utils__WEBPACK_IMPORTED_MODULE_2__/* .atomWithStorage */ .tG)('trace-current-table', '');
const currentServiceAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)(_constants__WEBPACK_IMPORTED_MODULE_0__/* .DEFAULT_SERVICE */ .aR);
const currentOperationAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)(_constants__WEBPACK_IMPORTED_MODULE_0__/* .DEFAULT_OPERATION */ .UB);
const currentSortAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)('most-recent');
const tagsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)('');
const tracesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)([]);
const tracesServicesAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)([]);
const traceOperationsAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)([]);
const minDurationAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)('');
const maxDurationAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)('');
const tracesCapabilityAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_1__/* .atom */ .eU)({});


/***/ },

/***/ 2551
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gw: () => (/* binding */ trimSpacesAroundEquals),
/* harmony export */   sd: () => (/* binding */ generateTableDataUID)
/* harmony export */ });
/* unused harmony exports generateUid, isIgnorableHighlightToken */
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
// --- stable stringify: 递归排序键，避免循环引用导致崩溃 ---
function stableStringify(value) {
    const seen = new WeakSet();
    const recur = (v)=>{
        if (v === null) {
            return 'null';
        }
        const t = typeof v;
        if (t === 'number') {
            return Number.isFinite(v) ? String(v) : 'null';
        }
        if (t === 'boolean') {
            return v ? 'true' : 'false';
        }
        if (t === 'string') {
            return JSON.stringify(v);
        }
        if (t === 'bigint') {
            return JSON.stringify(v.toString());
        }
        if (t === 'undefined' || t === 'function' || t === 'symbol') {
            return 'null';
        }
        // object / array
        if (seen.has(v)) {
            return '"[Circular]"';
        }
        seen.add(v);
        if (Array.isArray(v)) {
            return '[' + v.map(recur).join(',') + ']';
        }
        const keys = Object.keys(v).sort();
        const body = keys.map((k)=>JSON.stringify(k) + ':' + recur(v[k])).join(',');
        return '{' + body + '}';
    };
    return recur(value);
}
// --- 小工具 ---
function u8ToHex(u8) {
    let out = '';
    for(let i = 0; i < u8.length; i++){
        out += u8[i].toString(16).padStart(2, '0');
    }
    return out;
}
function hasSubtle() {
    var _window_crypto_subtle;
    return typeof window !== 'undefined' && !!window.crypto && !!window.isSecureContext && typeof ((_window_crypto_subtle = window.crypto.subtle) === null || _window_crypto_subtle === void 0 ? void 0 : _window_crypto_subtle.digest) === 'function';
}
// --- 纯 JS 的 SHA-256 fallback（简实现，无依赖） ---
function sha256HexJS(data) {
    // 常量
    const K = new Uint32Array([
        0x428a2f98,
        0x71374491,
        0xb5c0fbcf,
        0xe9b5dba5,
        0x3956c25b,
        0x59f111f1,
        0x923f82a4,
        0xab1c5ed5,
        0xd807aa98,
        0x12835b01,
        0x243185be,
        0x550c7dc3,
        0x72be5d74,
        0x80deb1fe,
        0x9bdc06a7,
        0xc19bf174,
        0xe49b69c1,
        0xefbe4786,
        0x0fc19dc6,
        0x240ca1cc,
        0x2de92c6f,
        0x4a7484aa,
        0x5cb0a9dc,
        0x76f988da,
        0x983e5152,
        0xa831c66d,
        0xb00327c8,
        0xbf597fc7,
        0xc6e00bf3,
        0xd5a79147,
        0x06ca6351,
        0x14292967,
        0x27b70a85,
        0x2e1b2138,
        0x4d2c6dfc,
        0x53380d13,
        0x650a7354,
        0x766a0abb,
        0x81c2c92e,
        0x92722c85,
        0xa2bfe8a1,
        0xa81a664b,
        0xc24b8b70,
        0xc76c51a3,
        0xd192e819,
        0xd6990624,
        0xf40e3585,
        0x106aa070,
        0x19a4c116,
        0x1e376c08,
        0x2748774c,
        0x34b0bcb5,
        0x391c0cb3,
        0x4ed8aa4a,
        0x5b9cca4f,
        0x682e6ff3,
        0x748f82ee,
        0x78a5636f,
        0x84c87814,
        0x8cc70208,
        0x90befffa,
        0xa4506ceb,
        0xbef9a3f7,
        0xc67178f2
    ]);
    // 初始哈希
    let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a, h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
    // 预处理：填充
    const l = data.length;
    const bitLenHi = l >>> 29 >>> 0;
    const bitLenLo = l << 3 >>> 0;
    const nBlocks = (l + 9 >> 6) + 1 << 4; // 以 16 个 32bit 为一组
    const M = new Uint32Array(nBlocks);
    for(let i = 0; i < l; i++){
        M[i >> 2] |= data[i] << (3 - (i & 3) << 3);
    }
    M[l >> 2] |= 0x80 << (3 - (l & 3) << 3);
    M[nBlocks - 2] = bitLenHi;
    M[nBlocks - 1] = bitLenLo;
    const W = new Uint32Array(64);
    const rotr = (x, n)=>x >>> n | x << 32 - n;
    for(let i = 0; i < nBlocks; i += 16){
        for(let t = 0; t < 16; t++){
            W[t] = M[i + t];
        }
        for(let t = 16; t < 64; t++){
            const s0 = (rotr(W[t - 15], 7) ^ rotr(W[t - 15], 18) ^ W[t - 15] >>> 3) >>> 0;
            const s1 = (rotr(W[t - 2], 17) ^ rotr(W[t - 2], 19) ^ W[t - 2] >>> 10) >>> 0;
            W[t] = W[t - 16] + s0 + W[t - 7] + s1 >>> 0;
        }
        let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
        for(let t = 0; t < 64; t++){
            const S1 = (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) >>> 0;
            const ch = (e & f ^ ~e & g) >>> 0;
            const T1 = h + S1 + ch + K[t] + W[t] >>> 0;
            const S0 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) >>> 0;
            const maj = (a & b ^ a & c ^ b & c) >>> 0;
            const T2 = S0 + maj >>> 0;
            h = g;
            g = f;
            f = e;
            e = d + T1 >>> 0;
            d = c;
            c = b;
            b = a;
            a = T1 + T2 >>> 0;
        }
        h0 = h0 + a >>> 0;
        h1 = h1 + b >>> 0;
        h2 = h2 + c >>> 0;
        h3 = h3 + d >>> 0;
        h4 = h4 + e >>> 0;
        h5 = h5 + f >>> 0;
        h6 = h6 + g >>> 0;
        h7 = h7 + h >>> 0;
    }
    const out = new Uint8Array(32);
    const H = [
        h0,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        h7
    ];
    for(let i = 0; i < 8; i++){
        out[i * 4 + 0] = H[i] >>> 24 & 0xff;
        out[i * 4 + 1] = H[i] >>> 16 & 0xff;
        out[i * 4 + 2] = H[i] >>> 8 & 0xff;
        out[i * 4 + 3] = H[i] & 0xff;
    }
    return u8ToHex(out);
}
// --- 通用 SHA-256（浏览器优先，fallback 到纯 JS） ---
function sha256Hex(input) {
    return _async_to_generator(function*() {
        const data = new TextEncoder().encode(input);
        if (hasSubtle()) {
            const buf = yield window.crypto.subtle.digest('SHA-256', data);
            return u8ToHex(new Uint8Array(buf));
        }
        // 非 https 或老环境：走纯 JS
        return sha256HexJS(data);
    })();
}
// --- 你的两个导出函数 ---
function generateUid(obj) {
    return _async_to_generator(function*() {
        const json = stableStringify(obj);
        return sha256Hex(json);
    })();
}
function generateTableDataUID(items) {
    return _async_to_generator(function*() {
        // 允许 _original 缺失时退回整个 item；并发计算，更快
        const sources = items.map((it)=>{
            var _ref;
            return (_ref = it && it._original) !== null && _ref !== void 0 ? _ref : it;
        });
        const uids = yield Promise.all(sources.map(generateUid));
        return items.map((it, i)=>_object_spread_props(_object_spread({}, it), {
                _uid: uids[i]
            }));
    })();
}
function isIgnorableHighlightToken(token) {
    const ignoreChars = new Set([
        ',',
        '.',
        ';',
        ':',
        '(',
        ')',
        '{',
        '}',
        '[',
        ']',
        '+',
        '-',
        '*',
        '/',
        '=',
        '<',
        '>',
        '!',
        '?',
        '|',
        '&',
        '%',
        '^',
        '$',
        '#',
        '@',
        '~',
        '`',
        '\\',
        "'",
        '"'
    ]);
    // 全是空格或换行
    if (!token.trim()) {
        return true;
    }
    // 单个字符且在 ignoreChars 中
    if (token.length === 1 && ignoreChars.has(token)) {
        return true;
    }
    // 多个字符但全是标点符号
    if (/^[\u2000-\u206F\u2E00-\u2E7F!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/.test(token)) {
        return true;
    }
    return false;
}
function trimSpacesAroundEquals(str) {
    // 去掉等于号两边所有空格
    return str.replace(/\s*=\s*/g, '=');
}


/***/ }

}]);
//# sourceMappingURL=100.js.map?_cache=aeba15e3da387130f6f9