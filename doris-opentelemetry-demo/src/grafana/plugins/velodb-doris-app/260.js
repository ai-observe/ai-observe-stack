"use strict";
(self["webpackChunkvelodb_doris_app"] = self["webpackChunkvelodb_doris_app"] || []).push([[260],{

/***/ 8260
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ PageTrace)
});

// EXTERNAL MODULE: ./i18n/index.ts
var i18n = __webpack_require__(2149);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(5959);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// ../node_modules/lucide-react/dist/esm/shared/src/utils.js
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};


//# sourceMappingURL=utils.js.map

;// ../node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.js.map

;// ../node_modules/lucide-react/dist/esm/Icon.js
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */





const Icon = (0,external_react_.forwardRef)(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => (0,external_react_.createElement)(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => (0,external_react_.createElement)(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);


//# sourceMappingURL=Icon.js.map

;// ../node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */





const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,external_react_.forwardRef)(
    ({ className, ...props }, ref) => (0,external_react_.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};


//# sourceMappingURL=createLucideIcon.js.map

;// ../node_modules/lucide-react/dist/esm/icons/circle-help.js
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode);


//# sourceMappingURL=circle-help.js.map

// EXTERNAL MODULE: external "@grafana/ui"
var ui_ = __webpack_require__(2007);
// EXTERNAL MODULE: ../node_modules/jotai/esm/react.mjs
var react = __webpack_require__(3689);
// EXTERNAL MODULE: ../node_modules/antd/es/tooltip/index.js + 91 modules
var tooltip = __webpack_require__(838);
// EXTERNAL MODULE: ./store/traces.ts
var store_traces = __webpack_require__(3982);
// EXTERNAL MODULE: external "@emotion/css"
var css_ = __webpack_require__(6089);
// EXTERNAL MODULE: ./store/discover.ts
var discover = __webpack_require__(6247);
// EXTERNAL MODULE: ./utils/utils.ts
var utils = __webpack_require__(2551);
;// ./components/traces/search-sidebar/index.tsx
'use client';










function SearchSidebar(props) {
    const tracesServices = (0,react/* useAtomValue */.md)(store_traces/* tracesServicesAtom */.E);
    const traceOperations = (0,react/* useAtomValue */.md)(store_traces/* traceOperationsAtom */.VA);
    const [currentService, setCurrentService] = (0,react/* useAtom */.fp)(store_traces/* currentServiceAtom */.gL);
    const [currentOperation, setCurrentOperation] = (0,react/* useAtom */.fp)(store_traces/* currentOperationAtom */.mH);
    const [tags, setTags] = (0,react/* useAtom */.fp)(store_traces/* tagsAtom */.jB);
    const currentTimeField = (0,react/* useAtomValue */.md)(discover/* currentTimeFieldAtom */.CA);
    const [minDuration, setMinDuration] = (0,react/* useAtom */.fp)(store_traces/* minDurationAtom */.oC);
    const [maxDuration, setMaxDuration] = (0,react/* useAtom */.fp)(store_traces/* maxDurationAtom */.uS);
    (0,external_react_.useEffect)(()=>{
        setCurrentService({
            value: 'all',
            label: (0,i18n.t)('All')
        });
    }, [
        currentTimeField,
        setCurrentService
    ]);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: "space-y-6"
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: "space-y-4"
    }, /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Service'),
        style: {
            marginLeft: 8
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        width: 15,
        options: tracesServices,
        value: currentService,
        onChange: (selectedService)=>{
            // Handle service change
            setCurrentService(selectedService);
            setCurrentOperation({
                value: 'all',
                label: (0,i18n.t)('All')
            });
        }
    }))), /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Operation'),
        style: {
            marginLeft: 8
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        width: 15,
        options: traceOperations,
        value: currentOperation,
        onChange: (selectedOperation)=>{
            setCurrentOperation(selectedOperation);
        }
    }))), /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: /*#__PURE__*/ external_react_default().createElement("span", {
            className: (0,css_.css)`
                                    display: flex;
                                    align-items: center;
                                `
        }, (0,i18n.t)('Tags'), /*#__PURE__*/ external_react_default().createElement(tooltip/* default */.A, {
            title: /*#__PURE__*/ external_react_default().createElement("div", null, (0,i18n.t)('Filter traces using'), " ", /*#__PURE__*/ external_react_default().createElement("a", {
                className: (0,css_.css)`font-weight:500px;color:#3D71D9;`,
                href: "https://brandur.org/logfmt",
                target: "_blank",
                rel: "noreferrer"
            }, "logfmt"), " ", (0,i18n.t)('syntax:'), /*#__PURE__*/ external_react_default().createElement("br", null), /*#__PURE__*/ external_react_default().createElement("ul", {
                className: (0,css_.css)`list-style-type: disc;list-style-position: inside;`
            }, /*#__PURE__*/ external_react_default().createElement("li", null, (0,i18n.t)('Equality: http.status_code=200')), /*#__PURE__*/ external_react_default().createElement("li", null, (0,i18n.t)('Inequality: error!=true')), /*#__PURE__*/ external_react_default().createElement("li", null, (0,i18n.t)('Contains: message~="timeout"')), /*#__PURE__*/ external_react_default().createElement("li", null, (0,i18n.t)('Multiple (AND): method=POST duration>1000')), /*#__PURE__*/ external_react_default().createElement("li", null, (0,i18n.t)('OR conditions: error=true OR status>=500'))))
        }, /*#__PURE__*/ external_react_default().createElement(CircleHelp, {
            size: 16,
            className: (0,css_.css)`
                                        margin-left: 4px;
                                    `
        }))),
        style: {
            marginLeft: 8
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, {
        id: "tags",
        placeholder: "http.status_code=200 error=true",
        className: "mt-1",
        value: tags,
        onChange: (e)=>{
            var _e_target;
            const value = (0,utils/* trimSpacesAroundEquals */.gw)((_e_target = e.target) === null || _e_target === void 0 ? void 0 : _e_target.value);
            setTags(value);
        }
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: "grid grid-cols-2 gap-4"
    }, /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Min Duration'),
        style: {
            marginLeft: 8
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, {
        id: "min-duration",
        placeholder: (0,i18n.t)('e.g. 1.2s, 100ms, 500us'),
        className: "mt-1",
        value: minDuration,
        onChange: (e)=>{
            var _e_target, _e_target1, _props_onMinDurationChange;
            setMinDuration((_e_target = e.target) === null || _e_target === void 0 ? void 0 : _e_target.value);
            props === null || props === void 0 ? void 0 : (_props_onMinDurationChange = props.onMinDurationChange) === null || _props_onMinDurationChange === void 0 ? void 0 : _props_onMinDurationChange.call(props, (_e_target1 = e.target) === null || _e_target1 === void 0 ? void 0 : _e_target1.value);
        }
    }))), /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Max Duration'),
        style: {
            marginLeft: 8
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, {
        id: "max-duration",
        placeholder: (0,i18n.t)('e.g. 1.2s, 100ms, 500us'),
        className: "mt-1",
        value: maxDuration,
        onChange: (e)=>{
            var _e_target, _e_target1, _props_onMaxDurationChange;
            setMaxDuration((_e_target = e.target) === null || _e_target === void 0 ? void 0 : _e_target.value);
            props === null || props === void 0 ? void 0 : (_props_onMaxDurationChange = props.onMaxDurationChange) === null || _props_onMaxDurationChange === void 0 ? void 0 : _props_onMaxDurationChange.call(props, (_e_target1 = e.target) === null || _e_target1 === void 0 ? void 0 : _e_target1.value);
        }
    })))), /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        onClick: ()=>{
            var _props_onQuerying;
            props === null || props === void 0 ? void 0 : (_props_onQuerying = props.onQuerying) === null || _props_onQuerying === void 0 ? void 0 : _props_onQuerying.call(props);
        },
        style: {
            marginLeft: 8
        }
    }, (0,i18n.t)('Find Traces'))));
}

// EXTERNAL MODULE: ./utils/time.ts
var time = __webpack_require__(1157);
;// ./components/traces/traces-viewer/trace-item.tsx




const TraceItem = ({ trace, onClick })=>{
    const theme = (0,ui_.useTheme2)();
    return /*#__PURE__*/ external_react_default().createElement("div", {
        onClick: onClick,
        className: (0,css_.css)`
                display: flex;
                align-items: center;
                background: ${theme.colors.background.primary};
                border: 1px solid ${theme.colors.border.weak};
                border-radius: ${theme.shape.borderRadius()};
                padding: ${theme.spacing(1.5)};
                position: relative;
                overflow: hidden;
                box-shadow: ${theme.shadows.z1};

                &:hover {
                    background-color: rgb(34, 37, 43);
                    cursor: pointer;
                }
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: ${trace.progress}%;
                    background: ${theme.colors.primary.main};
                    opacity: 0.1;
                `
    }), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    flex: 1;
                    display: grid;
                    gap: ${theme.spacing(0.5)};
                    z-index: 10;
                `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        display: flex;
                        justify-content: space-between;
                        font-weight: ${theme.typography.fontWeightMedium};
                        color: ${theme.colors.text.primary};
                    `
    }, /*#__PURE__*/ external_react_default().createElement("span", null, trace.root_service, ":", trace.operation, ' ', /*#__PURE__*/ external_react_default().createElement("span", {
        className: (0,css_.css)`
                                color: ${theme.colors.text.secondary};
                            `
    }, trace.trace_id)), /*#__PURE__*/ external_react_default().createElement("span", null, trace.trace_duration_ms, " ms")), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        display: flex;
                        justify-content: space-between;
                        font-size: ${theme.typography.size.sm};
                        color: ${theme.colors.text.secondary};
                    `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                            display: flex;
                            align-items: center;
                            gap: ${theme.spacing(1)};
                        `
    }, /*#__PURE__*/ external_react_default().createElement("span", null, (0,i18n.t)('{{count}} spans', {
        count: trace.spans
    })), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                                display: flex;
                                gap: ${theme.spacing(0.5)};
                            `
    }, JSON.parse(trace.services).map((service, index)=>/*#__PURE__*/ external_react_default().createElement("span", {
            key: index,
            className: (0,css_.css)`
                                        padding: 2px 6px;
                                        border-radius: 9999px;
                                        font-size: ${theme.typography.size.xs};
                                        color: ${theme.colors.text.secondary};
                                    `
        }, service)))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                            text-align: right;
                        `
    }, /*#__PURE__*/ external_react_default().createElement("div", null, trace.time), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                                font-size: ${theme.typography.size.xs};
                                color: ${theme.colors.text.disabled};
                            `
    }, trace.timeAgo)))));
};

// EXTERNAL MODULE: ../node_modules/echarts-for-react/esm/index.js + 557 modules
var esm = __webpack_require__(1244);
// EXTERNAL MODULE: ./components/trace-detail/index.tsx + 1 modules
var trace_detail = __webpack_require__(879);
;// ./components/traces/traces-viewer/index.tsx
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











const TraceView = /*#__PURE__*/ external_react_default().memo(({ traces: propTraces, total = 0, onSortByChange, onPageChange })=>{
    const theme = (0,ui_.useTheme2)();
    const [page, setPage] = (0,react/* useAtom */.fp)(discover/* pageAtom */.fs);
    const pageSize = (0,react/* useAtomValue */.md)(discover/* pageSizeAtom */.Ol);
    const timeZone = (0,react/* useAtomValue */.md)(discover/* timeZoneAtom */.tF);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const traces = propTraces || [];
    const [sort, setSort] = (0,react/* useAtom */.fp)(store_traces/* currentSortAtom */.fy);
    const [drawerOpen, setDrawerOpen] = external_react_default().useState(false);
    const [traceId, setTraceId] = external_react_default().useState('');
    // 预处理 series 数据，计算 symbolSize
    const seriesData = (0,external_react_.useMemo)(()=>{
        return traces.map((s)=>({
                name: `${s.root_service}:${s.operation}`,
                spans: s.spans,
                value: s.trace_duration_ms,
                trace_id: s.trace_id,
                symbolSize: Math.max(12, Math.min(30, s.spans || 1))
            }));
    }, [
        traces
    ]);
    const option = (0,external_react_.useMemo)(()=>{
        return {
            tooltip: {
                trigger: 'item',
                padding: 0,
                borderWidth: 0,
                backgroundColor: theme.isLight ? '#ffffff' : 'rgba(63, 63, 69, 0.64)',
                formatter: function(params) {
                    const html = `<div
                       style="
                          padding: 8px;
                          min-width: 120px;
                          border-radius: 6px;
                          backdrop-filter: blur(12px);
                          color: ${theme.isLight ? '#1F1F26' : '#EFEFF0'};
                        ">
                      <div style="padding-bottom: 4px; border-bottom: 1px solid ${theme.isLight ? '#DFDFE0' : '#3F3F45'};">${[
                        params.name
                    ]}</div>
                      <div style="padding-top:4px;display: flex;justify-content: space-between;"><span>Durations：</span><span style="font-family:DIN Alternate;font-size:14;font-weight:500;">${[
                        `${params.value} ms` || (0,i18n.t)('No Data')
                    ]}</span></div>
                      <div style="padding-top:4px;display: flex;justify-content: space-between;"><span>Spans：</span><span style="font-family:DIN Alternate;font-size:14;font-weight:500;">${[
                        params.data.spans || (0,i18n.t)('No Data')
                    ]}</span></div>
                  </div>`;
                    return html;
                }
            },
            xAxis: {
                type: 'category',
                name: (0,i18n.t)('Time'),
                data: traces.map((s)=>(0,time/* formatDorisTime */.E)(Number(s.time) * 1000, timeZone)),
                axisLabel: {
                    color: theme.colors.text.primary
                }
            },
            yAxis: {
                type: 'value',
                name: (0,i18n.t)('Duration (ms)'),
                axisLabel: {
                    color: theme.colors.text.primary
                },
                axisLine: {
                    lineStyle: {
                        color: theme.colors.text.secondary
                    }
                }
            },
            series: [
                {
                    type: 'scatter',
                    data: seriesData,
                    symbolSize: (data)=>data.symbolSize
                }
            ]
        };
    }, [
        seriesData,
        traces,
        theme,
        timeZone
    ]);
    const onEvents = {
        click: (params)=>{
            setTraceId(params.data.trace_id);
            setDrawerOpen(true);
        }
    };
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                display: flex;
                flex-direction: column;
                gap: 16px;
                background: ${theme.colors.background.primary};
                color: ${theme.colors.text.primary};
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    margin-top: -20px;
                    height: 300px;
                `
    }, /*#__PURE__*/ external_react_default().createElement(esm/* default */.A, {
        option: option,
        notMerge: false,
        lazyUpdate: true,
        style: {
            height: '100%'
        },
        onEvents: onEvents
    })), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        display: flex;
                        gap: 8px;
                        align-items: center;
                    `
    }, /*#__PURE__*/ external_react_default().createElement("span", null, (0,i18n.t)('Sort:')), /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        options: [
            {
                label: (0,i18n.t)('Most Recent'),
                value: 'most-recent'
            },
            {
                label: (0,i18n.t)('Longest Duration'),
                value: 'longest-duration'
            },
            {
                label: (0,i18n.t)('Shortest Duration'),
                value: 'shortest-duration'
            },
            {
                label: (0,i18n.t)('Most Spans'),
                value: 'most-spans'
            },
            {
                label: (0,i18n.t)('Least Spans'),
                value: 'least-spans'
            }
        ],
        value: sort,
        onChange: (option)=>{
            setPage(1);
            setSort(option.value);
            onSortByChange === null || onSortByChange === void 0 ? void 0 : onSortByChange(option.value);
        }
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 20px;
                `
    }, /*#__PURE__*/ external_react_default().createElement("h3", {
        className: (0,css_.css)`
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 8px;
                    `
    }, /*#__PURE__*/ external_react_default().createElement("div", null, (0,i18n.t)('{{count}} traces', {
        count: traces.length
    })), /*#__PURE__*/ external_react_default().createElement("div", null, (0,i18n.t)('Total {{count}}', {
        count: total
    }))), /*#__PURE__*/ external_react_default().createElement(ui_.Pagination, {
        currentPage: page,
        numberOfPages: Math.ceil(total / pageSize) || 1,
        onNavigate: (toPage)=>{
            setPage(toPage);
            onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(toPage);
        }
    })), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                `
    }, traces.map((trace)=>/*#__PURE__*/ external_react_default().createElement(TraceItem, {
            key: trace.trace_id,
            trace: _object_spread_props(_object_spread({}, trace), {
                time: (0,time/* formatDorisTime */.E)(Number(trace.time) * 1000, timeZone)
            }),
            onClick: ()=>{
                setTraceId(trace.trace_id);
                setDrawerOpen(true);
            }
        }))), /*#__PURE__*/ external_react_default().createElement(trace_detail/* default */.A, {
        onClose: ()=>setDrawerOpen(false),
        open: drawerOpen,
        traceId: traceId
    }));
});
TraceView.displayName = 'TraceView';

// EXTERNAL MODULE: ../node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(5285);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);
// EXTERNAL MODULE: ../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js + 8 modules
var emotion_styled_browser_esm = __webpack_require__(2742);
;// ./components/traces/traces-header/discover-header.style.ts


const DiscoverHeaderSearch = emotion_styled_browser_esm/* default */.A.div`
    flex: 2;
    display: flex;
    border-radius: 6px;
    align-items: center;
    margin-right: 8px;
    .ant-select-open {
        .ant-select-arrow {
            .anticon {
                transform: rotate(-180deg);
            }
        }
    }
    .select-database {
        width: 160px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .ant-select-single {
        height: 30px;
    }
`;
const DiscoverHeaderTimeSelect = emotion_styled_browser_esm/* default */.A.div`
    flex: 1;
    display: flex;
    border-radius: 6px;
    align-items: center;
    margin-right: 8px;

    div.trp-time-label {
        border: 0px;
    }
`;
const CascaderStyle = (0,css_.css)`
    width: 184px;
    .ant-select-selector {
        padding: 0 16px 0 40px !important;
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
        margin-top: 2px;
    }
    .ant-select-selector>.ant-select-selection-search>.ant-select-selection-search-input {
        margin-left: 1.8rem;
    }
`;

// EXTERNAL MODULE: external "@grafana/runtime"
var runtime_ = __webpack_require__(8531);
// EXTERNAL MODULE: external "@grafana/data"
var data_ = __webpack_require__(7781);
// EXTERNAL MODULE: ./types/plugin-settings.ts
var plugin_settings = __webpack_require__(325);
// EXTERNAL MODULE: ./utils/data.ts
var utils_data = __webpack_require__(6700);
// EXTERNAL MODULE: ./services/metaservice.ts
var metaservice = __webpack_require__(8161);
// EXTERNAL MODULE: ./hooks/useDatabaseTableSelection.ts
var useDatabaseTableSelection = __webpack_require__(2307);
// EXTERNAL MODULE: ./utils/errors.ts
var errors = __webpack_require__(9071);
// EXTERNAL MODULE: ./hooks/useDatasourcePermissions.ts
var useDatasourcePermissions = __webpack_require__(9693);
// EXTERNAL MODULE: ./services/grafana-permissions.ts
var grafana_permissions = __webpack_require__(7116);
// EXTERNAL MODULE: ./components/time-range-input/time-range-input.styles.ts
var time_range_input_styles = __webpack_require__(8078);
;// ./components/traces/traces-header/index.tsx
'use client';
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
function traces_header_define_property(obj, key, value) {
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
function traces_header_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            traces_header_define_property(target, key, source[key]);
        });
    }
    return target;
}
function traces_header_ownKeys(object, enumerableOnly) {
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
function traces_header_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        traces_header_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}




















function getStoredValue(key) {
    if (typeof window === 'undefined') {
        return undefined;
    }
    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) {
            return undefined;
        }
        return JSON.parse(raw);
    } catch (unused) {
        return undefined;
    }
}
function resolveDatasourceUid(dataSource, datasources = (0,runtime_.getDataSourceSrv)().getList()) {
    if (!dataSource) {
        return '';
    }
    if (typeof dataSource === 'string') {
        const matched = datasources.find((ds)=>ds.uid === dataSource || ds.name === dataSource);
        return (matched === null || matched === void 0 ? void 0 : matched.uid) || dataSource;
    }
    if (typeof dataSource === 'object') {
        if (dataSource.uid) {
            return dataSource.uid;
        }
        if (dataSource.name) {
            const matched = datasources.find((ds)=>ds.name === dataSource.name);
            return (matched === null || matched === void 0 ? void 0 : matched.uid) || '';
        }
    }
    return '';
}
function resolveDatasourceFromParam(datasourceParam, datasources = (0,runtime_.getDataSourceSrv)().getList()) {
    if (!datasourceParam) {
        return undefined;
    }
    const normalizedDatasource = datasourceParam.trim();
    if (!normalizedDatasource) {
        return undefined;
    }
    return datasources.find((ds)=>ds.uid === normalizedDatasource || ds.name === normalizedDatasource);
}
function parseUrlDate(value) {
    if (!value) {
        return undefined;
    }
    const parsedDate = (0,time/* parseTimeInZone */.mk)(value, 'browser');
    return (parsedDate === null || parsedDate === void 0 ? void 0 : parsedDate.isValid()) ? parsedDate : undefined;
}
function buildAbsoluteTimeRange(start, end) {
    return {
        from: (0,data_.dateTime)(start.toDate()),
        to: (0,data_.dateTime)(end.toDate()),
        raw: {
            from: (0,data_.dateTime)(start.toDate()),
            to: (0,data_.dateTime)(end.toDate())
        }
    };
}
function buildRelativeTimeRange(rawFrom, rawTo, zone = (0,time/* getGrafanaUserTimeZone */.XP)()) {
    const relativeRange = data_.rangeUtil.convertRawToRange({
        from: rawFrom,
        to: rawTo
    }, zone);
    return {
        from: relativeRange.from,
        to: relativeRange.to,
        raw: {
            from: rawFrom,
            to: rawTo
        }
    };
}
function normalizeRawTimeValue(value) {
    if (typeof value !== 'string') {
        return undefined;
    }
    const normalizedValue = value.trim();
    return normalizedValue || undefined;
}
function isRelativeRawRange(raw) {
    const from = normalizeRawTimeValue(raw === null || raw === void 0 ? void 0 : raw.from);
    const to = normalizeRawTimeValue(raw === null || raw === void 0 ? void 0 : raw.to);
    return Boolean((from === null || from === void 0 ? void 0 : from.startsWith('now')) && (to === null || to === void 0 ? void 0 : to.startsWith('now')));
}
function TracesHeader() {
    var _ref;
    var _loc_searchParams;
    // const catalogs = useAtomValue(catalogAtom);
    const setIndexes = (0,react/* useSetAtom */.Xr)(discover/* indexesAtom */.Eq);
    const setTableMetadata = (0,react/* useSetAtom */.Xr)(discover/* tableMetadataAtom */.hX);
    const requestedFieldsKey = external_react_default().useRef('');
    const requestedIndexesKey = external_react_default().useRef('');
    const metadataGeneration = external_react_default().useRef(0);
    (0,external_react_.useEffect)(()=>()=>{
            metadataGeneration.current += 1;
        }, []);
    const [discoverCurrent, setDiscoverCurrent] = (0,react/* useAtom */.fp)(discover/* discoverCurrentAtom */.WN);
    if (false) // removed by dead control flow
{}
    const [loc, setLoc] = (0,react/* useAtom */.fp)(discover/* locationAtom */.JT);
    const setTableFields = (0,react/* useSetAtom */.Xr)(discover/* tableFieldsAtom */.D_);
    const [timeFields, setTimeFields] = (0,react/* useAtom */.fp)(discover/* timeFieldsAtom */.Gg);
    const [_currentDate, setCurrentDate] = (0,react/* useAtom */.fp)(discover/* currentDateAtom */.Zb);
    const currentTimeField = (0,react/* useAtomValue */.md)(discover/* currentTimeFieldAtom */.CA);
    const [currentIndex, setCurrentIndex] = (0,react/* useAtom */.fp)(discover/* currentIndexAtom */.TY);
    const searchFocus = (0,react/* useAtomValue */.md)(discover/* searchFocusAtom */.MM);
    const [selectedDatasource, setSelectedDatasource] = (0,react/* useAtom */.fp)(discover/* selectedDatasourceAtom */.SW);
    const [timeRange, setTimeRange] = (0,react/* useAtom */.fp)(discover/* timeRangeAtom */.U9);
    const [currentTable, setCurrentTable] = (0,react/* useAtom */.fp)(store_traces/* currentTraceTableAtom */.AZ);
    const [databases, setDatabases] = (0,react/* useAtom */.fp)(discover/* databasesAtom */.SK);
    const [tables, setTables] = (0,react/* useAtom */.fp)(discover/* tablesAtom */.b9);
    const [_datasources, setDataSource] = (0,react/* useAtom */.fp)(discover/* datasourcesAtom */.ui);
    const setDisabledOptions = (0,react/* useSetAtom */.Xr)(discover/* disabledOptionsAtom */.IH);
    const selectdbDS = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const context = (0,data_.usePluginContext)();
    const jsonData = context.meta.jsonData || {};
    const configuredLogsConfig = jsonData.logsConfig;
    const logsConfig = (0,plugin_settings/* mergeLogsConfig */.oW)(configuredLogsConfig);
    const { allowedDatasources, allowedDatasourceUids, loading: datasourcePermissionsLoading, error: datasourcePermissionsError } = (0,useDatasourcePermissions/* useDatasourcePermissions */.R)(jsonData.teamDatasourcePermissions, 'TracesHeader');
    const hasInitializedUrlSyncRef = external_react_default().useRef(false);
    const locSearch = (_ref = loc === null || loc === void 0 ? void 0 : (_loc_searchParams = loc.searchParams) === null || _loc_searchParams === void 0 ? void 0 : _loc_searchParams.toString()) !== null && _ref !== void 0 ? _ref : '';
    const updateShareParams = external_react_default().useCallback((updates)=>{
        setLoc((prev)=>{
            var _ref;
            var _prev_searchParams;
            const currentSearch = (_ref = prev === null || prev === void 0 ? void 0 : (_prev_searchParams = prev.searchParams) === null || _prev_searchParams === void 0 ? void 0 : _prev_searchParams.toString()) !== null && _ref !== void 0 ? _ref : '';
            const searchParams = new URLSearchParams(currentSearch);
            Object.entries(updates).forEach(([key, value])=>{
                const normalizedValue = value === null || value === void 0 ? void 0 : value.trim();
                if (normalizedValue) {
                    searchParams.set(key, normalizedValue);
                } else {
                    searchParams.delete(key);
                }
            });
            if (searchParams.toString() === currentSearch) {
                return prev;
            }
            return traces_header_object_spread_props(traces_header_object_spread({}, prev), {
                searchParams
            });
        });
    }, [
        setLoc
    ]);
    (0,external_react_.useEffect)(()=>{
        setDataSource(allowedDatasources);
    }, [
        allowedDatasources,
        setDataSource
    ]);
    (0,external_react_.useEffect)(()=>{
        if (currentIndex.length > 0) {
            setDisabledOptions([]);
        } else {
            setDisabledOptions([
                'Search'
            ]);
        }
    }, [
        currentIndex,
        setDisabledOptions
    ]);
    const theme = (0,ui_.useTheme2)();
    const [timeZone, setTimeZone] = (0,react/* useAtom */.fp)(discover/* timeZoneAtom */.tF);
    function getFields(selectedTable, initOptions) {
        var _ref, _ref1;
        const effectiveDatasource = (_ref = initOptions === null || initOptions === void 0 ? void 0 : initOptions.datasource) !== null && _ref !== void 0 ? _ref : selectdbDS;
        const effectiveDatabase = (_ref1 = initOptions === null || initOptions === void 0 ? void 0 : initOptions.database) !== null && _ref1 !== void 0 ? _ref1 : discoverCurrent.database;
        if (!effectiveDatasource || !effectiveDatabase || !(selectedTable === null || selectedTable === void 0 ? void 0 : selectedTable.value)) {
            return;
        }
        const generation = metadataGeneration.current;
        const metadataKey = JSON.stringify([
            effectiveDatasource.uid,
            effectiveDatabase,
            selectedTable.value
        ]);
        requestedFieldsKey.current = metadataKey;
        (0,metaservice/* getFieldsService */.H1)({
            selectdbDS: effectiveDatasource,
            database: effectiveDatabase,
            table: selectedTable.value
        }).subscribe({
            next: ({ data, ok })=>{
                if (requestedFieldsKey.current !== metadataKey || metadataGeneration.current !== generation) {
                    return;
                }
                if (ok) {
                    const frame = (0,data_.toDataFrame)(data.results.getFields.frames[0]);
                    const values = Array.from(frame.fields[0].values);
                    const fieldTypes = Array.from(frame.fields[1].values);
                    const tableFields = values.map((item, index)=>{
                        return {
                            label: item,
                            Field: item,
                            value: item,
                            Type: fieldTypes[index]
                        };
                    });
                    setTableMetadata((previous)=>traces_header_object_spread_props(traces_header_object_spread({}, previous), {
                            [metadataKey]: traces_header_object_spread_props(traces_header_object_spread({}, previous[metadataKey]), {
                                fields: tableFields
                            })
                        }));
                    setTableFields(tableFields);
                    if (values) {
                        var _ref;
                        var _options_find, _options_;
                        const options = values.filter((field, index)=>{
                            return (0,utils_data/* isValidTimeFieldType */.Q3)(fieldTypes[index].toUpperCase());
                        }).map((item)=>{
                            return {
                                label: item,
                                value: item
                            };
                        });
                        const preferredTimeField = (_ref = initOptions === null || initOptions === void 0 ? void 0 : initOptions.preferredTimeField) !== null && _ref !== void 0 ? _ref : currentTimeField;
                        const targetTimeField = ((_options_find = options.find((option)=>option.value === preferredTimeField)) === null || _options_find === void 0 ? void 0 : _options_find.value) || ((_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value) || '';
                        setDiscoverCurrent((prev)=>traces_header_object_spread_props(traces_header_object_spread({}, prev), {
                                database: effectiveDatabase,
                                table: selectedTable.value,
                                timeField: targetTimeField
                            }));
                        setTimeFields(options);
                    }
                }
            },
            error: (err)=>{
                (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                    source: 'TracesHeader',
                    action: 'getFields'
                });
            }
        });
    }
    function getIndexes(selectedTable, initOptions) {
        var _ref, _ref1;
        const effectiveDatasource = (_ref = initOptions === null || initOptions === void 0 ? void 0 : initOptions.datasource) !== null && _ref !== void 0 ? _ref : selectdbDS;
        const effectiveDatabase = (_ref1 = initOptions === null || initOptions === void 0 ? void 0 : initOptions.database) !== null && _ref1 !== void 0 ? _ref1 : discoverCurrent.database;
        if (!effectiveDatasource || !effectiveDatabase || !(selectedTable === null || selectedTable === void 0 ? void 0 : selectedTable.value)) {
            return;
        }
        const generation = metadataGeneration.current;
        const metadataKey = JSON.stringify([
            effectiveDatasource.uid,
            effectiveDatabase,
            selectedTable.value
        ]);
        requestedIndexesKey.current = metadataKey;
        (0,metaservice/* getIndexesService */.s1)({
            selectdbDS: effectiveDatasource,
            database: effectiveDatabase,
            table: selectedTable.value
        }).subscribe({
            next: ({ data, ok })=>{
                if (requestedIndexesKey.current !== metadataKey || metadataGeneration.current !== generation) {
                    return;
                }
                if (ok) {
                    var _frame_fields_, _frame_fields_1, _frame_fields_2;
                    const frame = (0,data_.toDataFrame)(data.results.getIndexes.frames[0]);
                    const values = Array.from(((_frame_fields_ = frame.fields[2]) === null || _frame_fields_ === void 0 ? void 0 : _frame_fields_.values) || []);
                    const columnNames = Array.from(((_frame_fields_1 = frame.fields[4]) === null || _frame_fields_1 === void 0 ? void 0 : _frame_fields_1.values) || []);
                    const indexesTypes = Array.from(((_frame_fields_2 = frame.fields[10]) === null || _frame_fields_2 === void 0 ? void 0 : _frame_fields_2.values) || []);
                    if (!values || values.length === 0) {
                        setTableMetadata((previous)=>traces_header_object_spread_props(traces_header_object_spread({}, previous), {
                                [metadataKey]: traces_header_object_spread_props(traces_header_object_spread({}, previous[metadataKey]), {
                                    indexes: []
                                })
                            }));
                        setIndexes([]);
                        setCurrentIndex([]);
                        return;
                    }
                    const tableIndexes = values === null || values === void 0 ? void 0 : values.map((item, index)=>{
                        return {
                            label: item,
                            value: item,
                            type: indexesTypes[index],
                            columnName: columnNames[index]
                        };
                    });
                    setTableMetadata((previous)=>traces_header_object_spread_props(traces_header_object_spread({}, previous), {
                            [metadataKey]: traces_header_object_spread_props(traces_header_object_spread({}, previous[metadataKey]), {
                                indexes: tableIndexes
                            })
                        }));
                    setIndexes(tableIndexes);
                    if (tableIndexes) {
                        setCurrentIndex(tableIndexes);
                    }
                }
            },
            error: (err)=>{
                (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                    source: 'TracesHeader',
                    action: 'getIndexes'
                });
            }
        });
    }
    const applyTableSelection = (datasource, database, table, timeField)=>{
        metadataGeneration.current += 1;
        requestedFieldsKey.current = '';
        requestedIndexesKey.current = '';
        setTableFields([]);
        setTimeFields([]);
        setIndexes([]);
        setCurrentIndex([]);
        setCurrentTable(table);
        setDiscoverCurrent((prev)=>traces_header_object_spread_props(traces_header_object_spread({}, prev), {
                database,
                table,
                timeField: ''
            }));
        if (table) {
            getFields({
                value: table
            }, {
                datasource,
                database,
                preferredTimeField: timeField !== null && timeField !== void 0 ? timeField : ''
            });
            getIndexes({
                value: table
            }, {
                datasource,
                database
            });
        }
    };
    const { selectDatasource, selectDatabase, databasesLoading, tablesLoading } = (0,useDatabaseTableSelection/* useDatabaseTableSelection */.H)({
        setDatabases,
        setTables,
        onDatabaseChange: (database)=>setDiscoverCurrent((prev)=>traces_header_object_spread_props(traces_header_object_spread({}, prev), {
                    database,
                    table: '',
                    timeField: ''
                })),
        onTableChange: applyTableSelection
    });
    function initHeaderData() {
        return _async_to_generator(function*() {
            var _urlSearchParams_get, _urlSearchParams_get1, _urlSearchParams_get2, _urlSearchParams_get3, _urlSearchParams_get4, _allowedDatasources_;
            const urlSearchParams = (loc === null || loc === void 0 ? void 0 : loc.searchParams) instanceof URLSearchParams ? loc.searchParams : new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
            const persistedDatasourceStorage = getStoredValue('discover-selected-datasource');
            const persistedDiscoverCurrentStorage = getStoredValue('discover-current');
            const persistedTraceTableStorage = getStoredValue('trace-current-table');
            const urlDatasource = resolveDatasourceFromParam(urlSearchParams.get('datasource'), allowedDatasources);
            const urlDatabase = ((_urlSearchParams_get = urlSearchParams.get('database')) === null || _urlSearchParams_get === void 0 ? void 0 : _urlSearchParams_get.trim()) || '';
            const urlTable = ((_urlSearchParams_get1 = urlSearchParams.get('table')) === null || _urlSearchParams_get1 === void 0 ? void 0 : _urlSearchParams_get1.trim()) || '';
            const urlTimeField = ((_urlSearchParams_get2 = urlSearchParams.get('timeField')) === null || _urlSearchParams_get2 === void 0 ? void 0 : _urlSearchParams_get2.trim()) || '';
            const urlTimeZone = (0,time/* normalizeTimeZone */.F9)(urlSearchParams.get('timeZone')) || timeZone;
            if (urlTimeZone !== timeZone) {
                setTimeZone(urlTimeZone);
            }
            const urlStartTime = parseUrlDate(urlSearchParams.get('startTime'));
            const urlEndTime = parseUrlDate(urlSearchParams.get('endTime'));
            const urlTimeRawFrom = ((_urlSearchParams_get3 = urlSearchParams.get('timeRawFrom')) === null || _urlSearchParams_get3 === void 0 ? void 0 : _urlSearchParams_get3.trim()) || '';
            const urlTimeRawTo = ((_urlSearchParams_get4 = urlSearchParams.get('timeRawTo')) === null || _urlSearchParams_get4 === void 0 ? void 0 : _urlSearchParams_get4.trim()) || '';
            const configuredDatasourceUid = resolveDatasourceUid(logsConfig.datasource, allowedDatasources);
            const persistedDatasourceUid = (urlDatasource === null || urlDatasource === void 0 ? void 0 : urlDatasource.uid) || (selectedDatasource === null || selectedDatasource === void 0 ? void 0 : selectedDatasource.uid) || (persistedDatasourceStorage === null || persistedDatasourceStorage === void 0 ? void 0 : persistedDatasourceStorage.uid);
            const persistedDatabase = urlDatabase || discoverCurrent.database || (persistedDiscoverCurrentStorage === null || persistedDiscoverCurrentStorage === void 0 ? void 0 : persistedDiscoverCurrentStorage.database) || '';
            const persistedTable = urlTable || currentTable || persistedTraceTableStorage || '';
            const persistedTimeField = urlTimeField || discoverCurrent.timeField || (persistedDiscoverCurrentStorage === null || persistedDiscoverCurrentStorage === void 0 ? void 0 : persistedDiscoverCurrentStorage.timeField) || '';
            const requestedDatasourceUid = persistedDatasourceUid || configuredDatasourceUid || '';
            const defaultDatasourceUid = requestedDatasourceUid && allowedDatasourceUids.has(requestedDatasourceUid) ? requestedDatasourceUid : ((_allowedDatasources_ = allowedDatasources[0]) === null || _allowedDatasources_ === void 0 ? void 0 : _allowedDatasources_.uid) || '';
            const defaultDatabase = persistedDatabase || (configuredLogsConfig === null || configuredLogsConfig === void 0 ? void 0 : configuredLogsConfig.database) || '';
            const defaultTraceTable = persistedTable || logsConfig.targetTraceTable || logsConfig.logsTable || '';
            if (urlTimeRawFrom && urlTimeRawTo) {
                const relativeTimeRange = buildRelativeTimeRange(urlTimeRawFrom, urlTimeRawTo, urlTimeZone);
                setCurrentDate([
                    dayjs_min_default()(relativeTimeRange.from.toDate()),
                    dayjs_min_default()(relativeTimeRange.to.toDate())
                ]);
                setTimeRange((prev)=>traces_header_object_spread({}, prev, relativeTimeRange));
            } else if (urlStartTime && urlEndTime) {
                setCurrentDate([
                    urlStartTime,
                    urlEndTime
                ]);
                setTimeRange((prev)=>traces_header_object_spread({}, prev, buildAbsoluteTimeRange(urlStartTime, urlEndTime)));
            }
            if (allowedDatasources.length === 0) {
                setSelectedDatasource(undefined);
                setDatabases([]);
                setTables([]);
                setCurrentTable('');
                setDiscoverCurrent((prev)=>traces_header_object_spread_props(traces_header_object_spread({}, prev), {
                        database: '',
                        table: '',
                        timeField: ''
                    }));
                hasInitializedUrlSyncRef.current = true;
                return;
            }
            if (!defaultDatasourceUid) {
                hasInitializedUrlSyncRef.current = true;
                return;
            }
            try {
                var _allowedDatasources_find;
                const ds = (_allowedDatasources_find = allowedDatasources.find((datasource)=>datasource.uid === defaultDatasourceUid)) !== null && _allowedDatasources_find !== void 0 ? _allowedDatasources_find : yield (0,runtime_.getDataSourceSrv)().get({
                    uid: defaultDatasourceUid
                });
                if (!ds) {
                    return;
                }
                setSelectedDatasource(ds);
                selectDatasource(ds, {
                    database: defaultDatabase,
                    table: defaultTraceTable,
                    timeField: persistedTimeField
                });
            } catch (error) {
                (0,runtime_.logError)((0,errors/* toError */.i)(error), {
                    source: 'TracesHeader',
                    action: 'initHeaderData'
                });
            } finally{
                hasInitializedUrlSyncRef.current = true;
            }
        })();
    }
    (0,external_react_.useEffect)(()=>{
        if (datasourcePermissionsLoading || hasInitializedUrlSyncRef.current) {
            return;
        }
        void initHeaderData();
    // Initialize once: keep persisted values if they exist; otherwise apply config defaults.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        datasourcePermissionsLoading
    ]);
    (0,external_react_.useEffect)(()=>{
        var _urlSearchParams_get, _urlSearchParams_get1, _timeRange_raw, _timeRange_raw1;
        if (!hasInitializedUrlSyncRef.current) {
            return;
        }
        const urlSearchParams = new URLSearchParams(locSearch);
        const urlTimeRawFrom = ((_urlSearchParams_get = urlSearchParams.get('timeRawFrom')) === null || _urlSearchParams_get === void 0 ? void 0 : _urlSearchParams_get.trim()) || '';
        const urlTimeRawTo = ((_urlSearchParams_get1 = urlSearchParams.get('timeRawTo')) === null || _urlSearchParams_get1 === void 0 ? void 0 : _urlSearchParams_get1.trim()) || '';
        const urlStartTime = parseUrlDate(urlSearchParams.get('startTime'));
        const urlEndTime = parseUrlDate(urlSearchParams.get('endTime'));
        const rawFrom = normalizeRawTimeValue(timeRange === null || timeRange === void 0 ? void 0 : (_timeRange_raw = timeRange.raw) === null || _timeRange_raw === void 0 ? void 0 : _timeRange_raw.from);
        const rawTo = normalizeRawTimeValue(timeRange === null || timeRange === void 0 ? void 0 : (_timeRange_raw1 = timeRange.raw) === null || _timeRange_raw1 === void 0 ? void 0 : _timeRange_raw1.to);
        const shouldShareRelativeRaw = isRelativeRawRange(timeRange === null || timeRange === void 0 ? void 0 : timeRange.raw);
        const currentStartTime = _currentDate[0] ? (0,time/* formatShareTime */.yK)(_currentDate[0]) : undefined;
        const currentEndTime = _currentDate[1] ? (0,time/* formatShareTime */.yK)(_currentDate[1]) : undefined;
        const hasRelativeTimeParams = Boolean(urlTimeRawFrom && urlTimeRawTo);
        const hasAbsoluteTimeParams = Boolean(urlStartTime && urlEndTime);
        const isRelativeTimeSynced = hasRelativeTimeParams && rawFrom === urlTimeRawFrom && rawTo === urlTimeRawTo;
        const isAbsoluteTimeSynced = hasAbsoluteTimeParams && !shouldShareRelativeRaw && currentStartTime === (urlStartTime ? (0,time/* formatShareTime */.yK)(urlStartTime) : undefined) && currentEndTime === (urlEndTime ? (0,time/* formatShareTime */.yK)(urlEndTime) : undefined);
        if ((hasRelativeTimeParams || hasAbsoluteTimeParams) && !isRelativeTimeSynced && !isAbsoluteTimeSynced) {
            return;
        }
        updateShareParams({
            datasource: (selectedDatasource === null || selectedDatasource === void 0 ? void 0 : selectedDatasource.uid) || (selectedDatasource === null || selectedDatasource === void 0 ? void 0 : selectedDatasource.name) || '',
            database: discoverCurrent.database,
            table: currentTable || discoverCurrent.table,
            timeField: currentTimeField,
            timeZone,
            startTime: shouldShareRelativeRaw ? undefined : currentStartTime,
            endTime: shouldShareRelativeRaw ? undefined : currentEndTime,
            timeRawFrom: shouldShareRelativeRaw ? rawFrom : undefined,
            timeRawTo: shouldShareRelativeRaw ? rawTo : undefined
        });
    }, [
        currentTable,
        currentTimeField,
        _currentDate,
        discoverCurrent.database,
        discoverCurrent.table,
        locSearch,
        selectedDatasource,
        timeRange === null || timeRange === void 0 ? void 0 : timeRange.raw,
        updateShareParams,
        timeZone
    ]);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                padding: 1rem;
                padding-top: 1.5rem;
                background-color: ${theme.isDark ? 'rgb(24, 27, 31)' : '#FFF'};
                display: flex;
                border-radius: 0.25rem 0.25rem 0 0;
                border-bottom: 1px solid ${theme.colors.border.medium};
            `
    }, /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderSearch, null, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Datasource'),
        description: datasourcePermissionsError ? (0,i18n.t)('Failed to load team datasource permissions') : undefined
    }, /*#__PURE__*/ external_react_default().createElement(runtime_.DataSourcePicker, {
        width: 20,
        type: grafana_permissions/* SUPPORTED_DATASOURCE_TYPES */.bR,
        current: selectedDatasource,
        placeholder: (0,i18n.t)('Choose'),
        noDefault: true,
        disabled: datasourcePermissionsLoading || allowedDatasources.length === 0,
        isLoading: datasourcePermissionsLoading,
        filter: (ds)=>(0,grafana_permissions/* isSupportedDatasourceType */.qE)(ds.type) && allowedDatasourceUids.has(ds.uid),
        onChange: (item)=>{
            if (!allowedDatasourceUids.has(item.uid)) {
                return;
            }
            setSelectedDatasource(item);
            selectDatasource(item);
        }
    })), /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Database'),
        style: {
            marginLeft: 8
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        width: 15,
        options: databases,
        value: discoverCurrent.database,
        disabled: databasesLoading || !selectedDatasource || databases.length === 0,
        isLoading: databasesLoading,
        onChange: (selectedDatabase)=>{
            selectDatabase(selectdbDS, selectedDatabase.value);
        }
    })), /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Table'),
        style: {
            marginLeft: 8
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        options: tables,
        width: 15,
        value: currentTable,
        disabled: databasesLoading || tablesLoading || !discoverCurrent.database || tables.length === 0,
        isLoading: tablesLoading,
        onChange: (selectedTable)=>{
            applyTableSelection(selectdbDS, discoverCurrent.database, selectedTable.value);
        }
    }))), !searchFocus && /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Time Field')
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        value: currentTimeField,
        options: timeFields,
        onChange: (selectdbTimeFiled)=>{
            setDiscoverCurrent(traces_header_object_spread_props(traces_header_object_spread({}, discoverCurrent), {
                timeField: selectdbTimeFiled.value
            }));
            updateShareParams({
                timeField: selectdbTimeFiled.value
            });
        },
        placeholder: (0,i18n.t)('Time Field')
    })), /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Time Range'),
        className: time_range_input_styles/* timeRangeFieldClass */.Z,
        style: {
            marginLeft: 8,
            marginRight: 8
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.TimeRangeInput, {
        hideTimeZone: false,
        timeZone: timeZone,
        onChangeTimeZone: (zone)=>{
            setTimeZone(zone);
            updateShareParams({
                timeZone: zone
            });
        },
        isReversed: false,
        onChange: (timeRange)=>{
            var _timeRange_raw, _timeRange_raw1;
            const start = dayjs_min_default()(timeRange.from.toDate());
            const end = dayjs_min_default()(timeRange.to.toDate());
            const rawFrom = normalizeRawTimeValue((_timeRange_raw = timeRange.raw) === null || _timeRange_raw === void 0 ? void 0 : _timeRange_raw.from);
            const rawTo = normalizeRawTimeValue((_timeRange_raw1 = timeRange.raw) === null || _timeRange_raw1 === void 0 ? void 0 : _timeRange_raw1.to);
            const hasRelativeRaw = isRelativeRawRange(timeRange.raw);
            setCurrentDate([
                start,
                end
            ]);
            setTimeRange({
                from: (0,data_.dateTime)(timeRange.from.toDate()),
                to: (0,data_.dateTime)(timeRange.to.toDate()),
                raw: hasRelativeRaw && rawFrom && rawTo ? {
                    from: rawFrom,
                    to: rawTo
                } : {
                    from: (0,data_.dateTime)(timeRange.from.toDate()),
                    to: (0,data_.dateTime)(timeRange.to.toDate())
                }
            });
            updateShareParams({
                startTime: hasRelativeRaw ? undefined : (0,time/* formatShareTime */.yK)(start),
                endTime: hasRelativeRaw ? undefined : (0,time/* formatShareTime */.yK)(end),
                timeRawFrom: hasRelativeRaw ? rawFrom : undefined,
                timeRawTo: hasRelativeRaw ? rawTo : undefined
            });
        },
        value: timeRange
    }))));
}

// EXTERNAL MODULE: ./constants.ts + 1 modules
var constants = __webpack_require__(2351);
// EXTERNAL MODULE: ./services/traces.ts + 1 modules
var services_traces = __webpack_require__(3764);
;// ../node_modules/lucide-react/dist/esm/icons/x.js
/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const x_iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", x_iconNode);


//# sourceMappingURL=x.js.map

;// ./pages/PageTrace.tsx
function PageTrace_define_property(obj, key, value) {
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
function PageTrace_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            PageTrace_define_property(target, key, source[key]);
        });
    }
    return target;
}
function PageTrace_ownKeys(object, enumerableOnly) {
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
function PageTrace_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        PageTrace_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}


















function getFirstResultError(error) {
    var _error_data, _error_response_data, _error_response;
    const results = (error === null || error === void 0 ? void 0 : (_error_data = error.data) === null || _error_data === void 0 ? void 0 : _error_data.results) || (error === null || error === void 0 ? void 0 : (_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.results);
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
    return PageTrace_object_spread({
        refId
    }, results[refId]);
}
function getErrorText(error) {
    var _error_data, _error_response_data, _error_response;
    const resultError = getFirstResultError(error);
    return (error === null || error === void 0 ? void 0 : error.backendError) || (resultError === null || resultError === void 0 ? void 0 : resultError.error) || (error === null || error === void 0 ? void 0 : (_error_data = error.data) === null || _error_data === void 0 ? void 0 : _error_data.message) || (error === null || error === void 0 ? void 0 : (_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || (error === null || error === void 0 ? void 0 : error.statusText) || (error === null || error === void 0 ? void 0 : error.message) || (0,i18n.t)('Request failed');
}
function hasQueryResultError(data) {
    return getFirstResultError({
        data
    });
}
function PageTrace() {
    const theme = (0,ui_.useTheme2)();
    const currentTimeField = (0,react/* useAtomValue */.md)(discover/* currentTimeFieldAtom */.CA);
    const currentTable = (0,react/* useAtomValue */.md)(store_traces/* currentTraceTableAtom */.AZ);
    const currentCatalog = (0,react/* useAtomValue */.md)(discover/* currentCatalogAtom */.K0);
    const currentDatabase = (0,react/* useAtomValue */.md)(discover/* currentDatabaseAtom */.Cf);
    const currentDate = (0,react/* useAtomValue */.md)(discover/* currentDateAtom */.Zb);
    const selectdbDS = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const [page, setPage] = (0,react/* useAtom */.fp)(discover/* pageAtom */.fs);
    const pageSize = (0,react/* useAtomValue */.md)(discover/* pageSizeAtom */.Ol);
    const [traces, setTraces] = (0,react/* useAtom */.fp)(store_traces/* tracesAtom */.ok);
    const [total, setTotal] = external_react_default().useState(0);
    const [capabilities, setCapabilities] = (0,react/* useAtom */.fp)(store_traces/* tracesCapabilityAtom */.Ap);
    const traceGeneration = external_react_default().useRef(0);
    const tableContext = JSON.stringify([
        selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.uid,
        currentDatabase,
        currentTable,
        currentTimeField
    ]);
    const tableContextRef = external_react_default().useRef(tableContext);
    tableContextRef.current = tableContext;
    external_react_default().useEffect(()=>{
        traceGeneration.current += 1;
        setTraces([]);
        setTotal(0);
        setLoading(false);
        return ()=>{
            traceGeneration.current += 1;
        };
    }, [
        selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.uid,
        currentDatabase,
        currentTable,
        setTraces
    ]);
    const setTracesServices = (0,react/* useSetAtom */.Xr)(store_traces/* tracesServicesAtom */.E);
    const setTraceOperations = (0,react/* useSetAtom */.Xr)(store_traces/* traceOperationsAtom */.VA);
    const [loading, setLoading] = external_react_default().useState(false);
    const [traceError, setTraceError] = external_react_default().useState('');
    const currentService = (0,react/* useAtomValue */.md)(store_traces/* currentServiceAtom */.gL);
    const currentOperation = (0,react/* useAtomValue */.md)(store_traces/* currentOperationAtom */.mH);
    const tags = (0,react/* useAtomValue */.md)(store_traces/* tagsAtom */.jB);
    const minDuration = (0,react/* useAtomValue */.md)(store_traces/* minDurationAtom */.oC);
    const maxDuration = (0,react/* useAtomValue */.md)(store_traces/* maxDurationAtom */.uS);
    const sort = (0,react/* useAtomValue */.md)(store_traces/* currentSortAtom */.fy);
    const context = (0,data_.usePluginContext)();
    const jsonData = context.meta.jsonData || {};
    const rawLogsConfig = jsonData.logsConfig;
    const logsConfig = (0,plugin_settings/* mergeLogsConfig */.oW)(rawLogsConfig);
    const configuredTraceTable = logsConfig.targetTraceTable || '';
    const hasExplicitTraceTableConfig = Boolean(rawLogsConfig === null || rawLogsConfig === void 0 ? void 0 : rawLogsConfig.targetTraceTable);
    const showTraceError = external_react_default().useCallback((content, duration = 5)=>{
        setTraceError(content);
        if (duration > 0) {
            window.setTimeout(()=>{
                setTraceError((currentError)=>currentError === content ? '' : currentError);
            }, duration * 1000);
        }
    }, []);
    const showTraceSetupError = external_react_default().useCallback((action)=>{
        if (!selectdbDS) {
            showTraceError((0,i18n.t)('Cannot {{action}}: no Doris datasource is selected. Select a datasource first.', {
                action: action
            }));
            return true;
        }
        if (!currentDatabase) {
            showTraceError((0,i18n.t)('Cannot {{action}}: no database is selected. Select a database first.', {
                action: action
            }));
            return true;
        }
        if (!currentTable) {
            showTraceError(hasExplicitTraceTableConfig ? (0,i18n.t)('Cannot {{action}}: the configured trace table "{{table}}" is not selected. Switch to that table before querying.', {
                action: action,
                table: configuredTraceTable
            }) : (0,i18n.t)('Cannot {{action}}: no trace table is selected. Select a trace table, or configure a default trace table in app settings.', {
                action: action
            }));
            return true;
        }
        if (!currentTimeField) {
            showTraceError((0,i18n.t)('Cannot {{action}}: no time field is selected. Select a time field first.', {
                action: action
            }));
            return true;
        }
        return false;
    }, [
        configuredTraceTable,
        currentDatabase,
        currentTable,
        currentTimeField,
        hasExplicitTraceTableConfig,
        selectdbDS,
        showTraceError
    ]);
    const showTraceQueryError = external_react_default().useCallback((err, requestKind)=>{
        if (showTraceSetupError(requestKind === 'traces' ? (0,i18n.t)('query traces') : requestKind === 'services' ? (0,i18n.t)('load trace services') : (0,i18n.t)('load trace operations'))) {
            return;
        }
        if (hasExplicitTraceTableConfig && currentTable !== configuredTraceTable) {
            showTraceError((0,i18n.t)('Cannot query traces from "{{table}}": the configured trace table is "{{configuredTable}}". Switch to the configured trace table and try again.', {
                table: currentTable,
                configuredTable: configuredTraceTable
            }));
            return;
        }
        const backendMessage = getErrorText(err);
        const tableContext = `"${currentDatabase}.${currentTable}"`;
        if (requestKind === 'services') {
            showTraceError((0,i18n.t)('Failed to load trace services from {{table}}. Verify the table, time field, and Doris permissions. Backend: {{message}}', {
                table: tableContext,
                message: backendMessage
            }));
            return;
        }
        if (requestKind === 'operations') {
            showTraceError((0,i18n.t)('Failed to load trace operations from {{table}}. Verify the table, time field, service filter, and Doris permissions. Backend: {{message}}', {
                table: tableContext,
                message: backendMessage
            }));
            return;
        }
        showTraceError((0,i18n.t)('Trace query failed for {{table}}. Verify the trace schema includes required columns such as trace_id, span_id, parent_span_id, span_name, service_name, timestamp, duration, and status_code. Backend: {{message}}', {
            table: tableContext,
            message: backendMessage
        }), 6);
    }, [
        configuredTraceTable,
        currentDatabase,
        currentTable,
        hasExplicitTraceTableConfig,
        showTraceError,
        showTraceSetupError
    ]);
    const getTraces = external_react_default().useCallback((nextPage = page, nextSort = sort)=>{
        if (showTraceSetupError((0,i18n.t)('query traces'))) {
            return;
        }
        const requestId = ++traceGeneration.current;
        setLoading(true);
        const payload = {
            catalog: currentCatalog,
            database: currentDatabase,
            table: currentTable,
            timeField: currentTimeField,
            startDate: currentDate[0] ? (0,time/* formatSqlTime */.h9)(currentDate[0]) : '',
            endDate: (0,time/* formatSqlTime */.h9)(currentDate[1]),
            cluster: '',
            page: nextPage,
            page_size: pageSize,
            service_name: currentService.value,
            operation: currentOperation.value,
            sortBy: nextSort
        };
        if (minDuration) {
            payload.minDuration = minDuration;
        }
        if (maxDuration) {
            payload.maxDuration = maxDuration;
        }
        if (tags && tags.length > 0) {
            payload.tags = tags;
        }
        const capabilityKey = (0,services_traces/* traceCapabilityKey */.hl)({
            selectdbDS: selectdbDS,
            database: currentDatabase,
            table: currentTable
        });
        (0,services_traces/* getTracesService */.Cy)(PageTrace_object_spread({
            selectdbDS
        }, payload), {
            showBackendError: false,
            capability: capabilities[capabilityKey],
            onCapability: (capability)=>setCapabilities((previous)=>PageTrace_object_spread_props(PageTrace_object_spread({}, previous), {
                        [capabilityKey]: capability
                    }))
        }).subscribe({
            next: ({ rows, total: nextTotal })=>{
                if (traceGeneration.current !== requestId) {
                    return;
                }
                setLoading(false);
                setTotal(nextTotal);
                setTraces(rows.map((item)=>PageTrace_object_spread_props(PageTrace_object_spread({}, item), {
                        trace_duration_ms: Number(item.trace_duration_ms || 0).toFixed(2)
                    })));
            },
            error: (err)=>{
                if (traceGeneration.current !== requestId) {
                    return;
                }
                setLoading(false);
                setTraces([]);
                setTotal(0);
                (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                    source: 'PageTrace',
                    action: 'getTraces'
                });
                showTraceQueryError(err, 'traces');
            }
        });
    }, [
        capabilities,
        setCapabilities,
        currentCatalog,
        currentDatabase,
        currentTable,
        currentTimeField,
        currentDate,
        page,
        pageSize,
        currentService.value,
        currentOperation.value,
        sort,
        minDuration,
        maxDuration,
        tags,
        selectdbDS,
        setTraces,
        showTraceSetupError,
        showTraceQueryError
    ]);
    const getTracesServices = external_react_default().useCallback(()=>{
        if (!currentTable || !currentDatabase || !selectdbDS || !currentTimeField) {
            return;
        }
        const requestedContext = tableContext;
        let payload = {
            catalog: currentCatalog,
            database: currentDatabase,
            table: currentTable,
            timeField: currentTimeField,
            startDate: currentDate[0] ? (0,time/* formatSqlTime */.h9)(currentDate[0]) : '',
            endDate: (0,time/* formatSqlTime */.h9)(currentDate[1]),
            cluster: ''
        };
        (0,services_traces/* getServiceListService */.FC)(PageTrace_object_spread({
            selectdbDS
        }, payload), {
            showBackendError: false
        }).subscribe({
            next: ({ data, ok })=>{
                if (requestedContext !== tableContextRef.current) {
                    return;
                }
                const resultError = hasQueryResultError(data);
                if (!ok || resultError) {
                    showTraceQueryError({
                        data,
                        backendError: resultError === null || resultError === void 0 ? void 0 : resultError.error,
                        backendStatus: resultError === null || resultError === void 0 ? void 0 : resultError.status,
                        errorSource: resultError === null || resultError === void 0 ? void 0 : resultError.errorSource,
                        refId: resultError === null || resultError === void 0 ? void 0 : resultError.refId
                    }, 'services');
                    return;
                }
                if (ok) {
                    var _frame_fields_;
                    const frame = (0,data_.toDataFrame)(data.results.getServiceList.frames[0]);
                    const values = Array.from(((_frame_fields_ = frame.fields[0]) === null || _frame_fields_ === void 0 ? void 0 : _frame_fields_.values) || []);
                    if (values) {
                        const options = values.map((item)=>{
                            return {
                                label: item,
                                value: item
                            };
                        });
                        setTracesServices([
                            constants/* DEFAULT_SERVICE */.aR,
                            ...options
                        ]);
                    }
                }
            },
            error: (err)=>{
                if (requestedContext !== tableContextRef.current) {
                    return;
                }
                (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                    source: 'PageTrace',
                    action: 'getTracesServices'
                });
                showTraceQueryError(err, 'services');
            }
        });
    }, [
        tableContext,
        currentCatalog,
        currentDatabase,
        currentDate,
        currentTable,
        currentTimeField,
        selectdbDS,
        setTracesServices,
        showTraceQueryError
    ]);
    const getTracesOperations = external_react_default().useCallback(()=>{
        if (!currentTable || !currentDatabase || !selectdbDS || !currentTimeField) {
            return;
        }
        const requestedContext = tableContext;
        let payload = {
            catalog: currentCatalog,
            database: currentDatabase,
            table: currentTable,
            timeField: currentTimeField,
            startDate: currentDate[0] ? (0,time/* formatSqlTime */.h9)(currentDate[0]) : '',
            endDate: (0,time/* formatSqlTime */.h9)(currentDate[1]),
            service_name: currentService.value,
            cluster: ''
        };
        (0,services_traces/* getOperationListService */.jo)(PageTrace_object_spread({
            selectdbDS
        }, payload), {
            showBackendError: false
        }).subscribe({
            next: ({ data, ok })=>{
                if (requestedContext !== tableContextRef.current) {
                    return;
                }
                const resultError = hasQueryResultError(data);
                if (!ok || resultError) {
                    showTraceQueryError({
                        data,
                        backendError: resultError === null || resultError === void 0 ? void 0 : resultError.error,
                        backendStatus: resultError === null || resultError === void 0 ? void 0 : resultError.status,
                        errorSource: resultError === null || resultError === void 0 ? void 0 : resultError.errorSource,
                        refId: resultError === null || resultError === void 0 ? void 0 : resultError.refId
                    }, 'operations');
                    return;
                }
                if (ok) {
                    var _data_results_getOperationList_frames__data_values, _data_results_getOperationList_frames__data, _data_results_getOperationList_frames_;
                    // const frame = toDataFrame(data.results.getOperationList.frames[0]);
                    // const values = Array.from(frame.fields[0].values);
                    // const values = frame.data.values
                    const values = ((_data_results_getOperationList_frames_ = data.results.getOperationList.frames[0]) === null || _data_results_getOperationList_frames_ === void 0 ? void 0 : (_data_results_getOperationList_frames__data = _data_results_getOperationList_frames_.data) === null || _data_results_getOperationList_frames__data === void 0 ? void 0 : (_data_results_getOperationList_frames__data_values = _data_results_getOperationList_frames__data.values) === null || _data_results_getOperationList_frames__data_values === void 0 ? void 0 : _data_results_getOperationList_frames__data_values[0]) || [];
                    if (values) {
                        const options = values.map((item)=>{
                            return {
                                label: item,
                                value: item
                            };
                        });
                        setTraceOperations([
                            constants/* DEFAULT_OPERATION */.UB,
                            ...options
                        ]);
                    } else {
                        setTraceOperations([
                            constants/* DEFAULT_OPERATION */.UB
                        ]);
                    }
                }
            },
            error: (err)=>{
                if (requestedContext !== tableContextRef.current) {
                    return;
                }
                (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                    source: 'PageTrace',
                    action: 'getTracesOperations'
                });
                showTraceQueryError(err, 'operations');
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        tableContext,
        currentCatalog,
        currentDatabase,
        currentDate,
        currentService,
        currentTable,
        currentTimeField,
        selectdbDS,
        setTraceOperations,
        showTraceQueryError
    ]);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                height: 100%;
                width: 100%;
                overflow: hidden;
                & > div {
                    height: 100%;
                }
                & > div > div {
                    padding: 0 1rem;
                    height: 100%;
                }
            `
    }, /*#__PURE__*/ external_react_default().createElement(runtime_.PluginPage, {
        pageNav: {
            text: ''
        }
    }, /*#__PURE__*/ external_react_default().createElement(TracesHeader, null), traceError && /*#__PURE__*/ external_react_default().createElement("div", {
        role: "alert",
        className: (0,css_.css)`
                            position: fixed;
                            top: 72px;
                            right: 24px;
                            z-index: 1000;
                            display: flex;
                            align-items: flex-start;
                            gap: 12px;
                            width: min(520px, calc(100vw - 48px));
                            padding: 12px 12px 12px 16px;
                            border-radius: 4px;
                            background: ${theme.colors.error.main};
                            color: ${theme.colors.error.contrastText};
                            box-shadow: ${theme.shadows.z3};
                            font-size: 14px;
                            line-height: 20px;
                        `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                                flex: 1;
                                min-width: 0;
                                overflow-wrap: anywhere;
                            `
    }, traceError), /*#__PURE__*/ external_react_default().createElement("button", {
        type: "button",
        "aria-label": (0,i18n.t)('Close trace error'),
        onClick: ()=>setTraceError(''),
        className: (0,css_.css)`
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                width: 24px;
                                height: 24px;
                                flex: 0 0 24px;
                                border: 0;
                                border-radius: 4px;
                                padding: 0;
                                background: transparent;
                                color: ${theme.colors.error.contrastText};
                                cursor: pointer;

                                &:hover {
                                    background: ${theme.colors.action.hover};
                                }
                            `
    }, /*#__PURE__*/ external_react_default().createElement(X, {
        size: 16,
        "aria-hidden": "true"
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        display: flex;
                        height: calc(100% - 103px);
                        width: 100%;
                        overflow: hidden;
                        background-color: ${theme.colors.background.primary};
                        color: ${theme.colors.text.primary};
                    `
    }, /*#__PURE__*/ external_react_default().createElement("aside", {
        className: (0,css_.css)`
                            width: 320px;
                            flex-shrink: 0;
                            border-right: 1px solid ${theme.colors.border.medium};
                            padding: 16px;
                        `
    }, /*#__PURE__*/ external_react_default().createElement(SearchSidebar, {
        onQuerying: ()=>{
            setPage(1);
            getTracesServices();
            getTracesOperations();
            getTraces(1);
        }
    })), /*#__PURE__*/ external_react_default().createElement("main", {
        className: (0,css_.css)`
                            flex: 1;
                            height: 100%;
                            padding: 24px;
                            overflow-y: auto;
                        `
    }, loading && /*#__PURE__*/ external_react_default().createElement(ui_.LoadingBar, {
        width: 100
    }), /*#__PURE__*/ external_react_default().createElement(TraceView, {
        traces: traces,
        total: total,
        onPageChange: (nextPage)=>{
            setPage(nextPage);
            getTraces(nextPage);
        },
        onSortByChange: (nextSort)=>{
            setPage(1);
            getTraces(1, nextSort);
        }
    })))));
}


/***/ }

}]);
//# sourceMappingURL=260.js.map?_cache=1430b240c227e5484e66