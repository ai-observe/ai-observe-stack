"use strict";
(self["webpackChunkvelodb_doris_app"] = self["webpackChunkvelodb_doris_app"] || []).push([[421],{

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

/***/ 1421
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ PageDiscover)
});

// EXTERNAL MODULE: ./i18n/index.ts
var i18n = __webpack_require__(2149);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(5959);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "@emotion/css"
var css_ = __webpack_require__(6089);
// EXTERNAL MODULE: external "@grafana/runtime"
var runtime_ = __webpack_require__(8531);
// EXTERNAL MODULE: external "@grafana/ui"
var ui_ = __webpack_require__(2007);
;// ./components/discover-header/application-filter.ts

const APPLICATION_FILTER_ID = 'application-filter';
function getConfiguredApplicationAttributeKey(value) {
    return (value === null || value === void 0 ? void 0 : value.trim()) || '';
}
function getCommittedApplication(filters, attributeKey) {
    const filter = filters.find((item)=>item.id === APPLICATION_FILTER_ID);
    if ((filter === null || filter === void 0 ? void 0 : filter.variantKey) !== attributeKey || filter.value[0] == null) {
        return '';
    }
    return String(filter.value[0]);
}
function applyApplicationFilter(filters, application, attributeKey) {
    const current = filters.find((filter)=>filter.id === APPLICATION_FILTER_ID);
    const isCurrent = application ? (current === null || current === void 0 ? void 0 : current.fieldName) === 'resource_attributes' && current.variantKey === attributeKey && current.operator === '=' && current.value.length === 1 && String(current.value[0]) === application : !current;
    if (isCurrent) {
        return {
            changed: false,
            filters
        };
    }
    const remaining = filters.filter((filter)=>filter.id !== APPLICATION_FILTER_ID);
    if (!application) {
        return {
            changed: true,
            filters: remaining
        };
    }
    return {
        changed: true,
        filters: [
            ...remaining,
            {
                id: APPLICATION_FILTER_ID,
                fieldName: 'resource_attributes',
                variantKey: attributeKey,
                operator: '=',
                value: [
                    application
                ],
                label: `Application: ${application}`
            }
        ]
    };
}
/** Translate only the generated application label; preserve custom and persisted labels. */ function getFilterDisplayLabel(filter) {
    if (filter.id === APPLICATION_FILTER_ID && filter.label === `Application: ${filter.value[0]}`) {
        return (0,i18n.t)('Application: {{application}}', {
            application: filter.value[0]
        });
    }
    return filter.label;
}

// EXTERNAL MODULE: ../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js + 8 modules
var emotion_styled_browser_esm = __webpack_require__(2742);
;// ./components/discover-filter/discover-filter.style.ts


const DiscoverFilterWrapper = emotion_styled_browser_esm/* default */.A.div`
    display: flex;
    align-items: center;
    .filter {
        align-self: flex-start;
        margin-top: 3px;
        margin-right: 8px;
        font-weight: 500;
        font-size: 14px;
        font-style: normal;
        line-height: 18px;
    }
    .filter-tag {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        align-items: center;
        row-gap: 8px;
        column-gap: 8px;
        padding: 0 8px;
        .tag {
            display: flex;
            align-items: center;
            max-width: 400px;
            height: 24px;
            padding: 2px 8px;
            font-weight: 400;
            font-size: 12px;
            font-style: normal;
            line-height: 18px;
            border: 0px;
            border-radius: 6px;
            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
`;
const containerStyle = (0,css_.css)`
    width: 320px;
`;
const rowStyle = (0,css_.css)`
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
`;
const colStyle = (0,css_.css)`
    flex: 1;
`;
const footerStyle = (0,css_.css)`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;

    & button {
        flex: 1;
        display: block;
        text-align: center;
        
        span {
            display: inline;
        }
    }
`;

// EXTERNAL MODULE: ../node_modules/jotai/esm/react.mjs
var react = __webpack_require__(3689);
// EXTERNAL MODULE: ../node_modules/nanoid/index.browser.js + 1 modules
var index_browser = __webpack_require__(8987);
// EXTERNAL MODULE: ./store/discover.ts
var discover = __webpack_require__(6247);
// EXTERNAL MODULE: ./utils/data.ts
var utils_data = __webpack_require__(6700);
// EXTERNAL MODULE: ../node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(9215);
// EXTERNAL MODULE: ../node_modules/lodash-es/uniqBy.js + 9 modules
var uniqBy = __webpack_require__(9851);
// EXTERNAL MODULE: ../node_modules/lodash-es/get.js
var get = __webpack_require__(7230);
;// ./utils/variant-fields.ts
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


function typeForValues(values) {
    const concrete = values.filter((value)=>value !== null && value !== undefined);
    if (concrete.length === 0) {
        return 'VARIANT';
    }
    if (concrete.every((value)=>typeof value === 'string')) {
        return 'VARCHAR';
    }
    if (concrete.every((value)=>typeof value === 'number')) {
        return 'DOUBLE';
    }
    if (concrete.every((value)=>typeof value === 'boolean')) {
        return 'BOOLEAN';
    }
    if (concrete.every((value)=>Array.isArray(value))) {
        return 'ARRAY';
    }
    return 'VARIANT';
}
function buildLeafField(leaf, root) {
    const fieldName = leaf.path.join('.');
    return {
        Field: fieldName,
        value: fieldName,
        // Sidebar has a single expansion level: show the full path under the
        // VARIANT root instead of exposing intermediate object nodes.
        label: leaf.path.slice(1).join('.'),
        Type: typeForValues(leaf.values),
        variantPath: leaf.path,
        variantParent: root
    };
}
/**
 * Derives one parent node per VARIANT and a flat list of leaves below it. Paths
 * remain arrays because telemetry attribute names commonly contain literal dots.
 */ function deriveVariantFields(tableFields, rows) {
    return tableFields.filter((field)=>(0,utils_data/* isStructuredJsonType */.Ml)((field === null || field === void 0 ? void 0 : field.Type) || '')).map((field)=>{
        const root = String(field.Field);
        const leaves = new Map();
        rows.forEach((row)=>{
            const value = row[root];
            collectLeaves(value, [
                root
            ], leaves);
        });
        const children = Array.from(leaves.values()).map((leaf)=>buildLeafField(leaf, root));
        return _object_spread_props(_object_spread({}, field), {
            Field: root,
            value: root,
            label: root,
            children,
            leafCount: children.length
        });
    });
}
function deriveVariantFieldsFromMetadata(tableFields, metadataFields) {
    return tableFields.filter((field)=>(0,utils_data/* isStructuredJsonType */.Ml)((field === null || field === void 0 ? void 0 : field.Type) || '')).map((rootField)=>{
        const root = String(rootField.Field);
        const children = metadataFields.map((field)=>metadataFieldToLeaf(root, field)).filter((field)=>Boolean(field));
        return _object_spread_props(_object_spread({}, rootField), {
            Field: root,
            value: root,
            label: root,
            children,
            leafCount: children.length
        });
    });
}
function metadataFieldToLeaf(root, field) {
    var _ref, _ref1, _ref2, _ref3, _ref4;
    const name = String((_ref = (_ref1 = (_ref2 = field === null || field === void 0 ? void 0 : field.Field) !== null && _ref2 !== void 0 ? _ref2 : field === null || field === void 0 ? void 0 : field.field) !== null && _ref1 !== void 0 ? _ref1 : field === null || field === void 0 ? void 0 : field.name) !== null && _ref !== void 0 ? _ref : '');
    if (!name || name === root || !name.startsWith(root)) return undefined;
    const suffix = name.slice(root.length);
    if (!suffix.startsWith('.') && !suffix.startsWith('[')) return undefined;
    const path = [
        root,
        ...parseMetadataPath(suffix)
    ];
    if (path.length === 1) return undefined;
    return {
        Field: path.join('.'),
        value: path.join('.'),
        label: path.slice(1).join('.'),
        Type: String((_ref3 = (_ref4 = field === null || field === void 0 ? void 0 : field.Type) !== null && _ref4 !== void 0 ? _ref4 : field === null || field === void 0 ? void 0 : field.type) !== null && _ref3 !== void 0 ? _ref3 : 'VARIANT'),
        variantPath: path,
        variantParent: root
    };
}
function parseMetadataPath(suffix) {
    var _match_;
    const path = [];
    const segment = /(?:\.([^.[\]]+)|\[['"]([^'"]+)['"]\])/g;
    let match;
    while(match = segment.exec(suffix))path.push((_match_ = match[1]) !== null && _match_ !== void 0 ? _match_ : match[2]);
    return path;
}
function mergeVariantFields(metadata, sampled) {
    const sampledByRoot = new Map(sampled.map((field)=>[
            field.Field,
            field
        ]));
    const metadataByRoot = new Map(metadata.map((field)=>[
            field.Field,
            field
        ]));
    const roots = new Set([
        ...metadataByRoot.keys(),
        ...sampledByRoot.keys()
    ]);
    return Array.from(roots).map((root)=>{
        const metadataRoot = metadataByRoot.get(root);
        const sampleRoot = sampledByRoot.get(root);
        const base = metadataRoot || sampleRoot;
        const childrenByPath = new Map();
        ((metadataRoot === null || metadataRoot === void 0 ? void 0 : metadataRoot.children) || []).forEach((child)=>childrenByPath.set(JSON.stringify(child.variantPath || [
                child.Field
            ]), child));
        ((sampleRoot === null || sampleRoot === void 0 ? void 0 : sampleRoot.children) || []).forEach((child)=>{
            const path = JSON.stringify(child.variantPath || [
                child.Field
            ]);
            if (!childrenByPath.has(path)) {
                childrenByPath.set(path, child);
            }
        });
        const children = Array.from(childrenByPath.values());
        return _object_spread_props(_object_spread({}, base), {
            children,
            leafCount: children.length
        });
    });
}
function collectLeaves(value, path, leaves) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([key, childValue])=>collectLeaves(childValue, [
                ...path,
                key
            ], leaves));
        return;
    }
    if (path.length === 1) return;
    const key = JSON.stringify(path);
    const leaf = leaves.get(key) || {
        path,
        values: []
    };
    leaf.values.push(value);
    leaves.set(key, leaf);
}
function getVariantFieldValue(row, field) {
    return (0,get/* default */.A)(row, field.variantPath || field.Field);
}
function flattenVariantLeaves(fields) {
    const leaves = [];
    const visit = (field)=>{
        var _field_children;
        if ((_field_children = field.children) === null || _field_children === void 0 ? void 0 : _field_children.length) {
            field.children.forEach(visit);
        } else if (field.variantPath) {
            leaves.push(field);
        }
    };
    fields.forEach((field)=>{
        var _field_children;
        return (_field_children = field.children) === null || _field_children === void 0 ? void 0 : _field_children.forEach(visit);
    });
    return leaves;
}
function collectStringVariantPaths(value, path = [], output = []) {
    if (typeof value === 'string') {
        if (path.length) output.push(path);
        return output;
    }
    if (Array.isArray(value)) {
        value.forEach((child, index)=>collectStringVariantPaths(child, [
                ...path,
                String(index)
            ], output));
        return output;
    }
    if (value && typeof value === 'object') {
        Object.entries(value).forEach(([key, child])=>collectStringVariantPaths(child, [
                ...path,
                key
            ], output));
    }
    return output;
}

;// ./components/discover-filter/filter-content.tsx
function filter_content_define_property(obj, key, value) {
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
function filter_content_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            filter_content_define_property(target, key, source[key]);
        });
    }
    return target;
}
function filter_content_ownKeys(object, enumerableOnly) {
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
function filter_content_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        filter_content_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}











function FilterContent({ onHide, dataFilterValue }) {
    var _errors_field, _errors_operator, _errors_label;
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const variantFields = (0,react/* useAtomValue */.md)(discover/* variantFieldsAtom */.cE);
    const [dataFilter, setDataFilter] = (0,react/* useAtom */.fp)(discover/* dataFilterAtom */.EA);
    const [tableFieldValue, setTableFieldValue] = (0,react/* useAtom */.fp)(discover/* tableFieldValuesAtom */.CL);
    const tableData = (0,react/* useAtomValue */.md)(discover/* tableDataAtom */.q3);
    const indexes = (0,react/* useAtomValue */.md)(discover/* indexesAtom */.Eq);
    const allFields = external_react_default().useMemo(()=>[
            ...tableFields,
            ...flattenVariantLeaves(variantFields)
        ], [
        tableFields,
        variantFields
    ]);
    const { control, handleSubmit, watch, register, setValue, formState: { errors } } = (0,index_esm/* useForm */.mN)({
        defaultValues: {
            field: {
                label: dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.fieldName,
                value: dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.fieldName
            },
            operator: {
                label: dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.operator,
                value: dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.operator
            },
            value: dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.value,
            minValue: Array.isArray(dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.value) ? dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.value[0] : '',
            maxValue: Array.isArray(dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.value) ? dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.value[1] : '',
            label: (dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.label) || '',
            showLabel: !!(dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.label)
        }
    });
    const field = watch('field');
    const operator = watch('operator');
    const showLabel = watch('showLabel');
    // When user turns off the Custom Label switch, clear the label form value so it won't persist.
    external_react_default().useEffect(()=>{
        if (!showLabel) {
            // Clear the label in the form state so it won't be saved or re-displayed.
            setValue('label', '');
            // If we're editing an existing filter, also remove the label from the stored filter
            // so the filter chip/list updates immediately and the switch remains off when reopened.
            if (dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.id) {
                setDataFilter((prev)=>{
                    let changed = false;
                    const updated = prev.map((f)=>{
                        if (f.id === dataFilterValue.id) {
                            if (f.label) {
                                changed = true;
                                return filter_content_object_spread_props(filter_content_object_spread({}, f), {
                                    label: ''
                                });
                            }
                            return f;
                        }
                        return f;
                    });
                    return changed ? updated : prev;
                });
            }
        }
    }, [
        showLabel,
        setValue,
        dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.id,
        setDataFilter
    ]);
    // use centralized getFieldType from utils
    const selectedFieldType = external_react_default().useMemo(()=>{
        const fieldName = typeof field === 'string' ? field : field === null || field === void 0 ? void 0 : field.value;
        if (!fieldName) {
            return '';
        }
        const tf = allFields.find((f)=>f.Field === fieldName);
        return (0,utils_data/* getFieldType */.Re)(tf === null || tf === void 0 ? void 0 : tf.Type);
    }, [
        allFields,
        field
    ]);
    const isNumberField = selectedFieldType === 'NUMBER';
    const isBooleanField = selectedFieldType === 'BOOLEAN';
    const isTimeField = selectedFieldType === 'DATE';
    // Normalize OPERATORS to the form {label, value} and filter out inapplicable operators based on field type.
    const operatorOptions = external_react_default().useMemo(()=>{
        const normalized = (utils_data/* OPERATORS */.we || []).map((op)=>({
                label: op && op.label || op,
                value: op && op.value || op
            }));
        // match_* operators require doris inverted index. Keep LIKE/NOT LIKE available for string-like fields
        const matchOnlyOps = [
            'match_all',
            'match_any',
            'match_phrase',
            'match_phrase_prefix'
        ];
        if (isBooleanField) {
            // BOOLEAN should only allow equality and null checks
            const allowed = new Set([
                '=',
                '!=',
                'is null',
                'is not null'
            ]);
            return normalized.filter((opItem)=>allowed.has(String(opItem.value)));
        }
        const isNumberOrTime = isNumberField || isTimeField;
        if (isNumberOrTime) {
            // remove text match ops (including LIKE/NOT LIKE and match_*) for number or time fields
            return normalized.filter((opItem)=>{
                const v = String(opItem.value).toLowerCase();
                return !(v === 'like' || v === 'not like' || matchOnlyOps.includes(v));
            });
        }
        // non-number, non-boolean, non-time fields: keep full list
        // For string-like fields, only allow doris inverted-index text operators when the field has an inverted index
        try {
            const fieldName = typeof field === 'string' ? field : field === null || field === void 0 ? void 0 : field.value;
            // If the user hasn't selected a field yet, show the full list (no gating)
            if (!fieldName) {
                return normalized;
            }
            // treat "string" here as any type except NUMBER, BOOLEAN, DATE
            if (!isNumberField && !isBooleanField && !isTimeField) {
                const hasInverted = Array.isArray(indexes) && indexes.some((idx)=>{
                    if (!idx || !idx.columnName) {
                        return false;
                    }
                    const t = idx.type || '';
                    return String(idx.columnName) === String(fieldName) && t.toUpperCase().includes('INVERT');
                });
                if (!hasInverted) {
                    // remove only the match_* operators; allow LIKE/NOT LIKE to remain because they work without inverted index
                    return normalized.filter((opItem)=>{
                        const v = String(opItem.value).toLowerCase();
                        return !matchOnlyOps.includes(v);
                    });
                }
            }
        } catch (e) {
        // swallow any unexpected errors and fall back to returning full list
        }
        return normalized;
    }, [
        isNumberField,
        isBooleanField,
        isTimeField,
        field,
        indexes
    ]);
    const getValue = (value)=>isNaN(+value) ? value : +value;
    // Convert an input value according to current field type.
    // Preserve explicit empty string ('') so users can set an empty-string value.
    const convertValue = (v)=>{
        // Preserve explicit empty string so the user can set ''
        if (v === '') {
            return '';
        }
        if (v === undefined || v === null) {
            return v;
        }
        // If array, convert each element
        if (Array.isArray(v)) {
            return v.map(convertValue);
        }
        // Handle booleans
        if (v === true || v === 'true') {
            return true;
        }
        if (v === false || v === 'false') {
            return false;
        }
        // Prefer field-type-based conversion when possible
        if (isNumberField) {
            return getValue(String(v));
        }
        // NOTE: removed previous fallback that converted numeric-looking strings to Number for
        // non-number fields. Now we only convert to Number when the field type is numeric.
        return v;
    };
    const onSubmit = (formValues)=>{
        const { field, operator: opField, value, minValue, maxValue, label, showLabel } = formValues;
        const current = dataFilter.find((f)=>f.id === (dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.id));
        const id = (dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.id) || (0,index_browser/* nanoid */.Ak)();
        // The compatible operator could be string or {label, value}.
        const opValue = typeof opField === 'string' ? opField : opField === null || opField === void 0 ? void 0 : opField.value;
        let newValue = [];
        if (opValue === 'between' || opValue === 'not between') {
            // Use convertValue so numbers/booleans are properly typed; preserve empty strings if provided
            if (minValue !== undefined && minValue !== '' && maxValue !== undefined && maxValue !== '') {
                newValue = [
                    convertValue(minValue),
                    convertValue(maxValue)
                ];
            }
        } else if (value !== undefined) {
            // accept empty string, 0 and other falsy numeric values.
            if (Array.isArray(value)) {
                newValue = value.map((v)=>convertValue(v));
            } else {
                newValue = [
                    convertValue(value)
                ];
            }
        }
        const selectedField = allFields.find((item)=>item.Field === field.value);
        const variantPath = selectedField === null || selectedField === void 0 ? void 0 : selectedField.variantPath;
        const structuredRoot = (variantPath === null || variantPath === void 0 ? void 0 : variantPath[0]) ? allFields.find((item)=>item.Field === variantPath[0]) : undefined;
        const newItem = {
            id,
            fieldName: field.value,
            variantKey: field.value === (dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.fieldName) ? dataFilterValue === null || dataFilterValue === void 0 ? void 0 : dataFilterValue.variantKey : undefined,
            variantPath,
            variantRootType: structuredRoot === null || structuredRoot === void 0 ? void 0 : structuredRoot.Type,
            fieldType: selectedField === null || selectedField === void 0 ? void 0 : selectedField.Type,
            operator: opValue,
            // Only persist label when showLabel is true. Otherwise ensure it's empty.
            label: showLabel ? label : '',
            value: newValue
        };
        if (current) {
            const updated = dataFilter.map((f)=>f.id === id ? newItem : f);
            setDataFilter(updated);
        } else {
            setDataFilter([
                ...dataFilter,
                newItem
            ]);
        }
        onHide();
    };
    function renderFiledComponent() {
        // const currentField = field.value;
        const currentOperator = typeof operator === 'string' ? operator : operator === null || operator === void 0 ? void 0 : operator.value;
        if (currentOperator && currentOperator !== 'is null' && currentOperator !== 'is not null' && (currentOperator === 'between' || currentOperator === 'not between')) {
            var _errors_minValue, _errors_maxValue;
            return /*#__PURE__*/ external_react_default().createElement("div", {
                className: rowStyle
            }, /*#__PURE__*/ external_react_default().createElement("div", {
                className: colStyle
            }, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
                label: (0,i18n.t)('Min Value'),
                invalid: !!errors.minValue,
                error: (_errors_minValue = errors.minValue) === null || _errors_minValue === void 0 ? void 0 : _errors_minValue.message
            }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, register('minValue', {
                required: 'Enter the minValue'
            })))), /*#__PURE__*/ external_react_default().createElement("div", {
                className: colStyle
            }, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
                label: (0,i18n.t)('Max Value'),
                invalid: !!errors.maxValue,
                error: (_errors_maxValue = errors.maxValue) === null || _errors_maxValue === void 0 ? void 0 : _errors_maxValue.message
            }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, register('maxValue', {
                required: 'Enter the maxValue'
            })))));
        }
        if (currentOperator === '=' || currentOperator === '!=' || currentOperator === 'like' || currentOperator === 'not like' || currentOperator === 'match_all' || currentOperator === 'match_any' || currentOperator === 'match_phrase' || currentOperator === 'match_phrase_prefix') {
            var _errors_value;
            return /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
                label: (0,i18n.t)('Value'),
                invalid: !!errors.value,
                error: (_errors_value = errors.value) === null || _errors_value === void 0 ? void 0 : _errors_value.message
            }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, register('value', {
                validate: (v)=>v !== undefined || (0,i18n.t)('Enter the value')
            }))));
        }
        if (currentOperator === 'in' || currentOperator === 'not in') {
            var _errors_value1;
            return /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
                label: (0,i18n.t)('Value'),
                invalid: !!errors.value,
                error: (_errors_value1 = errors.value) === null || _errors_value1 === void 0 ? void 0 : _errors_value1.message
            }, /*#__PURE__*/ external_react_default().createElement(index_esm/* Controller */.xI, {
                name: "value",
                control: control,
                rules: {
                    required: 'Enter the value'
                },
                render: ({ field })=>/*#__PURE__*/ external_react_default().createElement(ui_.Select, filter_content_object_spread_props(filter_content_object_spread({}, field), {
                        isMulti: true,
                        options: tableFieldValue.map((item)=>({
                                label: item.value,
                                value: item.value
                            })),
                        placeholder: (0,i18n.t)('Select value'),
                        onChange: (selected)=>field.onChange(selected ? selected.map((s)=>s.value) : []),
                        value: tableFieldValue.filter((item)=>Array.isArray(field.value) && field.value.includes(item.value)).map((item)=>({
                                label: item.value,
                                value: item.value
                            }))
                    }))
            }));
        }
        return /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null);
    }
    return /*#__PURE__*/ external_react_default().createElement("form", {
        onSubmit: handleSubmit(onSubmit),
        className: containerStyle
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: rowStyle
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: colStyle
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Columns'),
        invalid: !!errors.field,
        error: (_errors_field = errors.field) === null || _errors_field === void 0 ? void 0 : _errors_field.message
    }, /*#__PURE__*/ external_react_default().createElement(index_esm/* Controller */.xI, {
        name: "field",
        control: control,
        rules: {
            required: 'Select Field'
        },
        render: ({ field })=>/*#__PURE__*/ external_react_default().createElement(ui_.Select, filter_content_object_spread_props(filter_content_object_spread({
                placeholder: (0,i18n.t)('Choose')
            }, field), {
                onChange: (selected)=>{
                    // Only update tableFieldValue when we actually have table data and a selected field
                    if ((selected === null || selected === void 0 ? void 0 : selected.value) && Array.isArray(tableData) && tableData.length > 0) {
                        setTableFieldValue((0,uniqBy/* default */.A)(tableData.map((item)=>({
                                label: selected.value,
                                value: item._original[selected.value]
                            })), 'value'));
                    } else {
                        setTableFieldValue([]);
                    }
                    field.onChange(selected);
                },
                options: allFields.map((f)=>({
                        label: f.Field,
                        value: f.Field
                    }))
            }))
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: colStyle
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Operator'),
        invalid: !!errors.operator,
        error: (_errors_operator = errors.operator) === null || _errors_operator === void 0 ? void 0 : _errors_operator.message
    }, /*#__PURE__*/ external_react_default().createElement(index_esm/* Controller */.xI, {
        name: "operator",
        control: control,
        rules: {
            required: 'Select Operator'
        },
        render: ({ field })=>/*#__PURE__*/ external_react_default().createElement(ui_.Select, filter_content_object_spread_props(filter_content_object_spread({
                placeholder: (0,i18n.t)('Choose')
            }, field), {
                options: operatorOptions
            }))
    })))), renderFiledComponent(), /*#__PURE__*/ external_react_default().createElement(ui_.InlineFieldRow, null, /*#__PURE__*/ external_react_default().createElement(ui_.InlineField, {
        label: (0,i18n.t)('Custom Label')
    }, /*#__PURE__*/ external_react_default().createElement(index_esm/* Controller */.xI, {
        name: "showLabel",
        control: control,
        render: ({ field })=>/*#__PURE__*/ external_react_default().createElement(ui_.InlineSwitch, field)
    }))), showLabel && /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        invalid: !!errors.label,
        error: (_errors_label = errors.label) === null || _errors_label === void 0 ? void 0 : _errors_label.message
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, register('label', {
        required: 'Please enter label'
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: footerStyle
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        variant: "secondary",
        onClick: (e)=>{
            e.preventDefault();
            onHide();
        }
    }, (0,i18n.t)('Cancel')), /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        type: "submit"
    }, (0,i18n.t)('Confirm'))));
}

// EXTERNAL MODULE: ./utils/sql-filter.ts
var sql_filter = __webpack_require__(2721);
;// ./components/discover-filter/index.tsx
function discover_filter_define_property(obj, key, value) {
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
function discover_filter_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            discover_filter_define_property(target, key, source[key]);
        });
    }
    return target;
}
function discover_filter_ownKeys(object, enumerableOnly) {
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
function discover_filter_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        discover_filter_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}












// import { set } from 'lodash-es';
function DiscoverFilter() {
    const [dataFilter, setDataFilter] = (0,react/* useAtom */.fp)(discover/* dataFilterAtom */.EA);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const variantFields = (0,react/* useAtomValue */.md)(discover/* variantFieldsAtom */.cE);
    const [open, setOpen] = (0,external_react_.useState)(false);
    const [dataFilterOpen, setDataFilterOpen] = (0,external_react_.useState)({});
    const discoverFilterRef = (0,external_react_.useRef)(null);
    const [_loc, setLoc] = (0,react/* useAtom */.fp)(discover/* locationAtom */.JT);
    const theme = (0,ui_.useTheme2)();
    return(//  className="mt-px rounded-b-sm bg-n8 p-4 pb-6"
    /*#__PURE__*/ external_react_default().createElement(DiscoverFilterWrapper, {
        ref: discoverFilterRef,
        className: (0,css_.css)`
                background-color: ${theme.isDark ? 'rgb(24, 27, 31)' : '#FFF'};
                padding: 1rem;
                padding-bottom: 1.5rem;
                margin-top: 1px;
                border-radius: 0 0 0.25rem 0.25rem;
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: "text-xs font-medium"
    }, (0,i18n.t)('Filter')), /*#__PURE__*/ external_react_default().createElement("div", {
        className: "filter-tag"
    }, dataFilter.map((dataFilterValue, index)=>{
        const displayFilter = (0,sql_filter/* enrichStructuredFilterTypes */.a9)([
            dataFilterValue
        ], [
            ...tableFields,
            ...flattenVariantLeaves(variantFields)
        ])[0];
        return /*#__PURE__*/ external_react_default().createElement("div", {
            key: index.toString(),
            className: (0,css_.css)`
                                margin: '0 4px';
                            `
        }, /*#__PURE__*/ external_react_default().createElement(ui_.Toggletip, {
            show: dataFilterOpen[dataFilterValue.id],
            onOpen: ()=>{
                setDataFilterOpen(discover_filter_object_spread_props(discover_filter_object_spread({}, dataFilterOpen), {
                    [dataFilterValue.id]: true
                }));
            },
            onClose: ()=>{
                setDataFilterOpen(discover_filter_object_spread_props(discover_filter_object_spread({}, dataFilterOpen), {
                    [dataFilterValue.id]: false
                }));
            },
            closeButton: true,
            content: /*#__PURE__*/ external_react_default().createElement(FilterContent, {
                onHide: ()=>{
                    setDataFilterOpen(discover_filter_object_spread_props(discover_filter_object_spread({}, dataFilterOpen), {
                        [dataFilterValue.id]: false
                    }));
                },
                dataFilterValue: dataFilterValue
            }),
            placement: "bottom"
        }, /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement(ui_.Badge, {
            // className="mx-1 rounded px-2 py-[2px] text-xs leading-[18px] text-n3 first:ml-2 hover:border-b7 group-data-[state=open]:border-b7 dark:hover:border-b3 dark:group-data-[state=open]:border-b3"
            key: index,
            text: /*#__PURE__*/ external_react_default().createElement("div", {
                className: (0,css_.css)`
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: space-between;
                                                `
            }, /*#__PURE__*/ external_react_default().createElement("span", null, dataFilterValue.label ? /*#__PURE__*/ external_react_default().createElement("span", null, getFilterDisplayLabel(dataFilterValue)) : /*#__PURE__*/ external_react_default().createElement("span", null, (0,utils_data/* getFilterSQL */.t9)(displayFilter))), /*#__PURE__*/ external_react_default().createElement("div", {
                className: (0,css_.css)`
                                                        margin-left: 0.5rem;
                                                        cursor: pointer;
                                                    `,
                onClick: ()=>{
                    const data_filters = dataFilter.filter((e)=>e !== dataFilterValue);
                    setDataFilter(data_filters);
                    setLoc((prev)=>{
                        const searchParams = prev.searchParams;
                        searchParams === null || searchParams === void 0 ? void 0 : searchParams.set('data_filters', JSON.stringify(data_filters));
                        return discover_filter_object_spread_props(discover_filter_object_spread({}, prev), {
                            searchParams
                        });
                    });
                }
            }, /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
                name: "times"
            }))),
            color: "blue"
        }))));
    }), /*#__PURE__*/ external_react_default().createElement(ui_.Toggletip, {
        show: open,
        closeButton: false,
        onOpen: ()=>{
            setOpen(true);
        },
        content: /*#__PURE__*/ external_react_default().createElement(FilterContent, {
            onHide: ()=>{
                setOpen(false);
            }
        }),
        placement: "bottom"
    }, /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "plus",
        tooltip: (0,i18n.t)('Add filter'),
        style: {
            marginLeft: 10
        }
    })))));
}

;// ./utils/icon.tsx


const FIELD_TYPES = [
    {
        key: 'STRING',
        value: [
            'VARCHAR',
            'STRING',
            'CHAR',
            'TEXT'
        ],
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "text-fields"
        })
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
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "list-ol"
        })
    },
    {
        key: 'DATE',
        value: [
            'DATE',
            'DATETIME',
            'DATEV2',
            'DATETIMEV2'
        ],
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "clock-nine"
        })
    },
    {
        key: 'JSONB',
        value: [
            'JSONB'
        ],
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "brackets-curly"
        }),
        complex: true
    },
    {
        key: 'ARRAY',
        value: [
            'ARRAY'
        ],
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "list-ul"
        }),
        complex: true
    },
    {
        key: 'BOOLEAN',
        value: [
            'BOOLEAN'
        ],
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "toggle-on"
        })
    },
    {
        key: 'BITMAP',
        value: [
            'BITMAP'
        ],
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "building"
        }),
        complex: true
    },
    {
        key: 'HLL',
        value: [
            'HLL'
        ],
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "draggabledots"
        }),
        complex: true
    },
    {
        key: 'VARIANT',
        value: [
            'VARIANT'
        ],
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "brackets-curly"
        }),
        complex: true
    },
    {
        key: 'JSON',
        value: [
            'JSON'
        ],
        icon: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "brackets-curly"
        }),
        complex: true
    }
];
const getFieldIcon = (columnType)=>{
    const currentColumnType = FIELD_TYPES.find((item)=>item.value.some((val)=>columnType.toLocaleUpperCase().includes(val)));
    return currentColumnType === null || currentColumnType === void 0 ? void 0 : currentColumnType.icon;
};

// EXTERNAL MODULE: ../node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(1750);
// EXTERNAL MODULE: ../node_modules/tailwind-merge/dist/bundle-mjs.mjs
var bundle_mjs = __webpack_require__(8890);
;// ./utils/tailwind.ts


function cn(...inputs) {
    return (0,bundle_mjs/* twMerge */.QP)((0,clsx/* clsx */.$)(inputs));
}

;// ./utils/count.ts
/** Converts backend count values to a safe non-negative integer for UI state. */ function normalizeCount(value) {
    const count = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : Number.NaN;
    return Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
}

;// ./components/discover-sidebar/field-item/top-data/top-data.tsx











function normalizeTopDataValue(value) {
    return (0,utils_data/* formatFieldDisplayValue */.xW)(value, 'compact');
}
function countValueDistribution(jsonArray, field) {
    const valueCountMap = new Map();
    jsonArray.forEach((obj)=>{
        var _field_variantPath;
        const value = ((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath.length) ? getVariantFieldValue(obj, field) : (0,get/* default */.A)(obj, field.Field);
        // A missing nested key is not a real "-" value and must not be offered
        // as a filter value.
        if (value === undefined || value === null) {
            return;
        }
        const key = JSON.stringify([
            typeof value,
            value
        ]);
        const entry = valueCountMap.get(key);
        if (entry) {
            entry.count += 1;
        } else {
            valueCountMap.set(key, {
                value,
                count: 1
            });
        }
    });
    return Array.from(valueCountMap.values()).map(({ value, count })=>[
            value,
            count
        ]);
}
function DistributionRows({ field, rows, total, onFilter }) {
    const theme = (0,ui_.useTheme2)();
    return /*#__PURE__*/ external_react_default().createElement("div", {
        role: "list",
        className: (0,css_.css)`
                display: grid;
                gap: 12px;
                margin-top: 12px;
            `
    }, rows.length ? rows.map(([rawValue, count], index)=>{
        const value = normalizeTopDataValue(rawValue);
        const percent = total ? Math.min(100, count * 100 / total) : 0;
        const canFilter = !(0,utils_data/* isComplexType */.tF)(field.Type) && rawValue !== undefined && rawValue !== null && value !== '-';
        return /*#__PURE__*/ external_react_default().createElement("div", {
            key: index,
            role: "listitem",
            className: (0,css_.css)`
                                display: flex;
                                align-items: center;
                                gap: 12px;
                            `
        }, /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`
                                    flex: 1;
                                    min-width: 0;
                                `
        }, /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`
                                        display: flex;
                                        align-items: center;
                                        gap: 12px;
                                    `
        }, /*#__PURE__*/ external_react_default().createElement("span", {
            title: value,
            className: (0,css_.css)`
                                            flex: 1;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                        `
        }, value), /*#__PURE__*/ external_react_default().createElement("span", {
            title: total !== undefined ? (0,i18n.t)('{{count}} / {{total}} records', {
                count: count.toLocaleString(),
                total: total.toLocaleString()
            }) : String(count)
        }, total !== undefined ? `${+percent.toFixed(1)}%` : count.toLocaleString())), total !== undefined && /*#__PURE__*/ external_react_default().createElement("div", {
            "aria-hidden": "true",
            className: (0,css_.css)`
                                            height: 4px;
                                            margin-top: 5px;
                                            background: ${theme.colors.background.secondary};
                                            border-radius: 2px;
                                        `
        }, /*#__PURE__*/ external_react_default().createElement("div", {
            style: {
                width: `${percent}%`
            },
            className: (0,css_.css)`
                                                height: 100%;
                                                background: ${theme.colors.primary.main};
                                                border-radius: 2px;
                                            `
        }))), canFilter && /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`
                                        display: flex;
                                        flex: none;
                                        gap: 4px;
                                    `
        }, /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
            name: "plus-circle",
            tooltip: (0,i18n.t)('Include value'),
            onClick: (event)=>{
                event.stopPropagation();
                onFilter(rawValue, '=');
            }
        }), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
            name: "minus-circle",
            tooltip: (0,i18n.t)('Exclude value'),
            onClick: (event)=>{
                event.stopPropagation();
                onFilter(rawValue, '!=');
            }
        })));
    }) : /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        color: ${theme.colors.text.secondary};
                    `
    }, (0,i18n.t)('No non-null field values')));
}
function TopData({ field, onTopN, canRunTopN = true, canShowStatistics = false, onFieldStatistics, onPointerEnter, onPointerLeave }) {
    const theme = (0,ui_.useTheme2)();
    const topData = (0,react/* useAtomValue */.md)(discover/* topDataAtom */.l_);
    const tableTotalCount = normalizeCount((0,react/* useAtomValue */.md)(discover/* tableTotalCountAtom */.HC));
    const [, setDataFilter] = (0,react/* useAtom */.fp)(discover/* dataFilterAtom */.EA);
    const sampleRows = countValueDistribution(topData, field).sort((a, b)=>b[1] - a[1]).slice(0, 5);
    const addFilter = (value, operator)=>{
        setDataFilter((current)=>[
                ...current,
                {
                    fieldName: field.Field,
                    variantPath: field.variantPath,
                    variantRootType: field.variantRootType,
                    fieldType: field.Type,
                    operator,
                    value: [
                        value
                    ],
                    id: (0,index_browser/* nanoid */.Ak)()
                }
            ]);
    };
    const sectionHeader = (0,css_.css)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    `;
    const description = (0,css_.css)`
        color: ${theme.colors.text.secondary};
        font-size: 12px;
        line-height: 1.5;
        margin-top: 6px;
    `;
    return /*#__PURE__*/ external_react_default().createElement("div", {
        role: "region",
        "aria-label": (0,i18n.t)('{{field}} field card', {
            field: field.Field
        }),
        onPointerEnter: onPointerEnter,
        onPointerLeave: onPointerLeave,
        className: (0,css_.css)`
                width: 340px;
                max-width: min(340px, calc(100vw - 24px));
                max-height: min(560px, calc(100vh - 32px));
                box-sizing: border-box;
                overflow-y: auto;
                padding: 8px;
                color: ${theme.colors.text.primary};
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    overflow-wrap: anywhere;
                    margin-bottom: 16px;
                `
    }, /*#__PURE__*/ external_react_default().createElement("strong", null, field.Field), " ", /*#__PURE__*/ external_react_default().createElement("span", {
        className: description
    }, "(", field.Type, ")")), /*#__PURE__*/ external_react_default().createElement("section", {
        "aria-label": (0,i18n.t)('Current query results')
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: sectionHeader
    }, /*#__PURE__*/ external_react_default().createElement("strong", null, (0,i18n.t)('Current query results')), /*#__PURE__*/ external_react_default().createElement("small", null, (0,i18n.t)('{{count}} samples', {
        count: topData.length
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: description
    }, (0,i18n.t)('Based on up to 500 records returned by the current query. Shows the top 5 values; percentages use the sample record count.')), /*#__PURE__*/ external_react_default().createElement(DistributionRows, {
        field: field,
        rows: sampleRows,
        total: topData.length,
        onFilter: addFilter
    })), (canRunTopN || canShowStatistics) && /*#__PURE__*/ external_react_default().createElement("section", {
        "aria-label": (0,i18n.t)('All matching data'),
        className: (0,css_.css)`
                        margin-top: 16px;
                        padding-top: 16px;
                        border-top: 1px solid ${theme.colors.border.weak};
                    `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: sectionHeader
    }, /*#__PURE__*/ external_react_default().createElement("strong", null, (0,i18n.t)('All matching data')), /*#__PURE__*/ external_react_default().createElement("small", null, (0,i18n.t)('{{count}} matching records', {
        count: tableTotalCount
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: description
    }, (0,i18n.t)('Statistics cover all matching records in the current time range and query, without the 500-record sample limit.')), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                            display: flex;
                            flex-wrap: wrap;
                            gap: 8px;
                            margin-top: 12px;
                        `
    }, canShowStatistics && /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        size: "sm",
        variant: "secondary",
        icon: "info-circle",
        onClick: ()=>onFieldStatistics === null || onFieldStatistics === void 0 ? void 0 : onFieldStatistics(field)
    }, (0,i18n.t)('Field statistics')), canRunTopN && /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        size: "sm",
        variant: "secondary",
        onClick: ()=>onTopN === null || onTopN === void 0 ? void 0 : onTopN(field),
        title: (0,i18n.t)('Configure count, aggregation, and sort order for all matching records')
    }, (0,i18n.t)('Top N configuration'))), canShowStatistics && /*#__PURE__*/ external_react_default().createElement("div", {
        className: description
    }, (0,i18n.t)('Click “Field statistics” to view non-null values, unique counts, and distributions in the sidebar.'))));
}

;// ./components/discover-sidebar/field-item/field-item.tsx
function field_item_define_property(obj, key, value) {
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
function field_item_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            field_item_define_property(target, key, source[key]);
        });
    }
    return target;
}
function field_item_ownKeys(object, enumerableOnly) {
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
function field_item_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        field_item_ownKeys(Object(source)).forEach(function(key) {
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








function matches(field, query) {
    var _field_children;
    if (!query) {
        return true;
    }
    const needle = query.toLowerCase();
    return String(field.Field || '').toLowerCase().includes(needle) || ((_field_children = field.children) === null || _field_children === void 0 ? void 0 : _field_children.some((child)=>matches(child, query)));
}
function FieldItem(_0) {
    let { depth = 0, searchActive = '', showChildren = true } = _0, props = _object_without_properties(_0, [
        "depth",
        "searchActive",
        "showChildren"
    ]);
    var _field_children, _props_isSelected, _field_variantPath, _field_children1;
    const theme = (0,ui_.useTheme2)();
    const { field } = props;
    const [expanded, setExpanded] = (0,external_react_.useState)(false);
    const [topDataVisible, setTopDataVisible] = (0,external_react_.useState)(false);
    const showTimer = (0,external_react_.useRef)(undefined);
    const hideTimer = (0,external_react_.useRef)(undefined);
    const hasChildren = showChildren && (Boolean((_field_children = field.children) === null || _field_children === void 0 ? void 0 : _field_children.length) || depth === 0 && (0,utils_data/* isStructuredJsonType */.Ml)(field.Type));
    const isExpanded = searchActive || expanded;
    const selected = ((_props_isSelected = props.isSelected) === null || _props_isSelected === void 0 ? void 0 : _props_isSelected.call(props, field)) || false;
    const canShowStatistics = props.type === 'add' && !hasChildren && !(0,utils_data/* isStructuredJsonType */.Ml)(field.Type);
    const showTopData = !hasChildren && props.type === 'add';
    const canRunTopN = showTopData && !(0,utils_data/* isStructuredJsonType */.Ml)(field.Type) && !((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath.length);
    const clearTimer = (timer)=>{
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = undefined;
        }
    };
    const scheduleHide = ()=>{
        clearTimer(showTimer);
        clearTimer(hideTimer);
        hideTimer.current = setTimeout(()=>{
            setTopDataVisible(false);
            hideTimer.current = undefined;
        }, 250);
    };
    const enterTopDataRegion = ()=>{
        clearTimer(hideTimer);
        if (!topDataVisible && !showTimer.current) {
            showTimer.current = setTimeout(()=>{
                setTopDataVisible(true);
                showTimer.current = undefined;
            }, 200);
        }
    };
    (0,external_react_.useEffect)(()=>()=>{
            clearTimer(showTimer);
            clearTimer(hideTimer);
        }, []);
    if (searchActive && !matches(field, searchActive)) {
        return null;
    }
    const item = /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": "field-item-row",
        onPointerEnter: showTopData ? enterTopDataRegion : undefined,
        onPointerLeave: showTopData ? scheduleHide : undefined,
        className: (0,css_.css)`
                    width: 100%; text-align: left; display: flex; align-items: center;
                    justify-content: space-between; height: 32px;
                    padding: 0 8px 0 ${8 + depth * 16}px;
                    &:hover { background-color: ${theme.colors.background.secondary}; }
                `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: "flex min-w-0 items-center"
    }, hasChildren ? /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: isExpanded ? 'angle-down' : 'angle-right',
        size: "sm",
        tooltip: isExpanded ? (0,i18n.t)('Collapse') : (0,i18n.t)('Expand'),
        onClick: ()=>setExpanded((value)=>!value)
    }) : depth > 0 ? /*#__PURE__*/ external_react_default().createElement("span", {
        className: "w-6"
    }) : null, /*#__PURE__*/ external_react_default().createElement("div", null, getFieldIcon(field.Type)), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`display:flex; margin-left:4px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:${depth ? 170 : 150}px;`
    }, depth ? field.label || field.Field : field.Field)), hasChildren ? /*#__PURE__*/ external_react_default().createElement("span", {
        className: (0,css_.css)`margin-left:8px; color:${theme.colors.text.secondary}; font-size:12px;`
    }, field.leafCount || 0) : null, !selected && /*#__PURE__*/ external_react_default().createElement("div", {
        className: cn('icon-wrapper', (0,css_.css)`margin-left:auto; display:flex; align-items:center; color:${theme.colors.text.secondary}; &:hover { color:${theme.colors.text.primary}; }`)
    }, props.type === 'add' ? /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "plus",
        tooltip: (0,i18n.t)('Add to table'),
        onClick: (e)=>{
            var _props_onAdd;
            (_props_onAdd = props.onAdd) === null || _props_onAdd === void 0 ? void 0 : _props_onAdd.call(props, field);
            e.stopPropagation();
        }
    })) : /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "minus",
        tooltip: (0,i18n.t)('Delete from table'),
        onClick: (e)=>{
            var _props_onRemove;
            (_props_onRemove = props.onRemove) === null || _props_onRemove === void 0 ? void 0 : _props_onRemove.call(props, field);
            e.stopPropagation();
        }
    }))));
    return /*#__PURE__*/ external_react_default().createElement("div", null, showTopData ? /*#__PURE__*/ external_react_default().createElement(ui_.Tooltip, {
        show: topDataVisible,
        placement: "right",
        interactive: true,
        content: /*#__PURE__*/ external_react_default().createElement(TopData, {
            field: field,
            onTopN: (selectedField)=>{
                var _props_onTopN;
                clearTimer(showTimer);
                clearTimer(hideTimer);
                setTopDataVisible(false);
                (_props_onTopN = props.onTopN) === null || _props_onTopN === void 0 ? void 0 : _props_onTopN.call(props, selectedField);
            },
            canRunTopN: canRunTopN,
            canShowStatistics: canShowStatistics,
            onFieldStatistics: (selectedField)=>{
                var _props_onFieldStatistics;
                clearTimer(showTimer);
                clearTimer(hideTimer);
                setTopDataVisible(false);
                (_props_onFieldStatistics = props.onFieldStatistics) === null || _props_onFieldStatistics === void 0 ? void 0 : _props_onFieldStatistics.call(props, selectedField);
            },
            onPointerEnter: enterTopDataRegion,
            onPointerLeave: scheduleHide
        })
    }, item) : item, hasChildren && isExpanded && (((_field_children1 = field.children) === null || _field_children1 === void 0 ? void 0 : _field_children1.length) ? field.children.map((child)=>{
        var _child_variantPath;
        return /*#__PURE__*/ external_react_default().createElement(FieldItem, field_item_object_spread_props(field_item_object_spread({
            key: ((_child_variantPath = child.variantPath) === null || _child_variantPath === void 0 ? void 0 : _child_variantPath.join('\u0000')) || child.Field
        }, props), {
            field: child,
            depth: depth + 1,
            searchActive: searchActive
        }));
    }) : /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        padding: 4px 8px 8px 48px;
                        color: ${theme.colors.text.secondary};
                        font-size: 12px;
                    `
    }, (0,i18n.t)('No discoverable nested fields'))));
}

;// ./components/discover-sidebar/filter-content/filter-content.tsx







function filter_content_FilterContent() {
    const [searchable, setSearchable] = (0,react/* useAtom */.fp)(discover/* searchableAtom */.Mb);
    const [aggregatable, setAggregatable] = (0,react/* useAtom */.fp)(discover/* aggregatableAtom */.UR);
    const [fieldType, setFieldType] = (0,react/* useAtom */.fp)(discover/* fieldTypeAtom */.m5);
    return(//  className="w-auto divide-y rounded-md dark:divide-gray-700"
    /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
      width: auto;
      border-radius: 0.375rem;
    `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
        font-size: 1.125rem;
        font-weight: 500;
        `
    }, (0,i18n.t)('Field Filter')), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
          margin-top: 1rem;
          border: none;
        `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          `
    }, (0,i18n.t)('Aggregatable')), /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement(ui_.RadioButtonGroup, {
        //   name="aggregatable"
        options: utils_data/* AGGREGATABLE */.hO,
        value: aggregatable,
        onChange: (val)=>{
            setAggregatable(val);
        }
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
          margin-top: 1rem;
          border: none;
        `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          `
    }, (0,i18n.t)('Searchable')), /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement(ui_.RadioButtonGroup, {
        //   name="searchable"
        options: utils_data/* SEARCHABLE */.$X,
        value: searchable,
        onChange: (val)=>{
            setSearchable(val);
        }
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
          margin-top: 1rem;
          border: none;
        `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          `
    }, (0,i18n.t)('Type')), /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        value: fieldType,
        onChange: (value)=>{
            setFieldType(value);
        },
        options: [
            {
                value: 'ANY',
                label: (0,i18n.t)('Any')
            },
            {
                value: 'STRING',
                label: (0,i18n.t)('String')
            },
            {
                value: 'NUMBER',
                label: (0,i18n.t)('Number')
            },
            {
                value: 'DATE',
                label: (0,i18n.t)('Date')
            },
            {
                value: 'VARIANT',
                label: (0,i18n.t)('Variant')
            }
        ]
    }))));
}

;// ./components/discover-sidebar/index.tsx









function DiscoverSidebar() {
    const [selectedFields, setSelectedFields] = (0,react/* useAtom */.fp)(discover/* selectedFieldsAtom */.Wg);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const variantFields = (0,react/* useAtomValue */.md)(discover/* variantFieldsAtom */.cE);
    const [searchable, _setSearchable] = (0,react/* useAtom */.fp)(discover/* searchableAtom */.Mb);
    const [aggregatable, _setAggregatable] = (0,react/* useAtom */.fp)(discover/* aggregatableAtom */.UR);
    const [fieldType, _setFieldType] = (0,react/* useAtom */.fp)(discover/* fieldTypeAtom */.m5);
    const [searchValue, setSearchValue] = (0,external_react_.useState)('');
    const indexes = (0,react/* useAtomValue */.md)(discover/* indexesAtom */.Eq);
    const theme = (0,ui_.useTheme2)();
    const [, setFieldStatisticsField] = (0,react/* useAtom */.fp)(discover/* fieldStatisticsFieldAtom */.V_);
    const [, setTopNConfigurationField] = (0,react/* useAtom */.fp)(discover/* topNConfigurationFieldAtom */.li);
    const filteredFields = tableFields.filter((field)=>{
        if (aggregatable === utils_data/* AggregatableEnum */.SY.ANY) {
            return true;
        }
        if (aggregatable === utils_data/* AggregatableEnum */.SY.YES) {
            return (0,utils_data/* getFieldType */.Re)(field.Type) === 'NUMBER';
        }
        if (aggregatable === utils_data/* AggregatableEnum */.SY.NO) {
            return (0,utils_data/* getFieldType */.Re)(field.Type) !== 'NUMBER';
        }
        return false;
    }).filter((field)=>{
        if (searchable === utils_data/* SearchableEnum */.Yp.ANY) {
            return true;
        }
        if (searchable === utils_data/* SearchableEnum */.Yp.YES) {
            return indexes.some((index)=>field.Field === index.Field);
        }
        if (searchable === utils_data/* SearchableEnum */.Yp.NO) {
            return !indexes.some((index)=>field.Field === index.Field);
        }
        return false;
    }).filter((field)=>{
        if (fieldType === utils_data/* FieldTypeEnum */.wI.ANY) {
            return true;
        }
        return (0,utils_data/* getFieldType */.Re)(field.Type) === fieldType;
    });
    const hasSelectedFields = selectedFields.length > 0;
    const selectedFieldNames = (0,external_react_.useMemo)(()=>new Set(selectedFields.map((field)=>field.Field)), [
        selectedFields
    ]);
    const availableFields = (0,external_react_.useMemo)(()=>{
        const treeByRoot = new Map(variantFields.map((field)=>[
                field.Field,
                field
            ]));
        return filteredFields.map((field)=>(0,utils_data/* isStructuredJsonType */.Ml)(field.Type) ? treeByRoot.get(field.Field) || field : field).filter((field)=>{
            var _field_children;
            if (!((_field_children = field.children) === null || _field_children === void 0 ? void 0 : _field_children.length)) {
                return !selectedFieldNames.has(field.Field);
            }
            return !selectedFieldNames.has(field.Field) || field.children.some((child)=>!selectedFieldNames.has(child.Field));
        });
    }, [
        filteredFields,
        selectedFieldNames,
        variantFields
    ]);
    function handleAdd(field) {
        setSelectedFields([
            ...selectedFields,
            field
        ]);
    }
    function handleRemove(field) {
        setSelectedFields((current)=>current.filter((item)=>item.Field !== field.Field));
    }
    function handleFieldStatistics(field) {
        var _field_variantPath, _tableFields_find;
        const rootType = ((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath.length) ? (_tableFields_find = tableFields.find((item)=>item.Field === field.variantPath[0])) === null || _tableFields_find === void 0 ? void 0 : _tableFields_find.Type : undefined;
        setFieldStatisticsField({
            Field: field.Field,
            Type: field.Type,
            variantPath: field.variantPath,
            variantRootType: rootType
        });
    }
    function handleTopN(field) {
        setTopNConfigurationField({
            Field: field.Field,
            Type: field.Type
        });
    }
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                display: flex;
                flex-direction: column;
                height: 100%;
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    display: flex;
                    background-color: ${theme.isDark ? 'rgb(24, 27, 31)' : '#FFF'};
                    padding: 1rem 0.5rem;
                    border-raduis: 0.25rem 0;
                    align-items: center;
                    column-gap: 0.5rem;
                `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
        name: "search"
    }), /*#__PURE__*/ external_react_default().createElement(ui_.Input, {
        placeholder: (0,i18n.t)('Search'),
        className: (0,css_.css)`
                        border: none;
                    `,
        value: searchValue,
        onChange: (e)=>setSearchValue(e.target.value)
    }), /*#__PURE__*/ external_react_default().createElement(ui_.Toggletip, {
        content: /*#__PURE__*/ external_react_default().createElement(filter_content_FilterContent, null)
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
        name: "filter"
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    margin-top: 1px;
                    flex: 1 1 0;
                    padding: 0.5rem 1rem 0.5rem 1rem;
                    background-color: ${theme.isDark ? 'rgb(24, 27, 31)' : '#FFF'};
                    min-height: 0;
                    height: 0;
                    overflow-x: hidden;
                    overflow-y: auto;
                    overscroll-behavior: contain;
                `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.CollapsableSection, {
        label: /*#__PURE__*/ external_react_default().createElement("span", {
            className: (0,css_.css)`
                        margin-left: 4px;
                        font-size: 14px;
                        line-height: 32px;
                    `
        }, (0,i18n.t)('Selected fields')),
        isOpen: true
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                            width: 100%;
                        `
    }, hasSelectedFields ? /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                                    width: 100%;
                                `
    }, selectedFields.filter((field)=>{
        return field['Field'].toLowerCase().includes(searchValue.toLowerCase());
    }).map((field, index)=>{
        var _field_variantPath;
        return /*#__PURE__*/ external_react_default().createElement(FieldItem, {
            type: "remove",
            key: ((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath.join('\u0000')) || index,
            field: field,
            onRemove: (field)=>handleRemove(field),
            showChildren: false
        });
    })) : /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        icon: "arrow",
        size: "sm",
        variant: "secondary",
        fill: "text",
        fullWidth: true,
        className: (0,css_.css)`
                                    width: 100%;
                                    text-align: left;
                                    justify-content: flex-start;
                                `
    }, "_source"))), /*#__PURE__*/ external_react_default().createElement(ui_.CollapsableSection, {
        label: /*#__PURE__*/ external_react_default().createElement("span", {
            className: (0,css_.css)`
                        margin-left: 4px;
                        font-size: 14px;
                        line-height: 32px;
                    `
        }, (0,i18n.t)('Available fields')),
        isOpen: true
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                            width: 100%;
                        `
    }, availableFields.map((field, index)=>/*#__PURE__*/ external_react_default().createElement(FieldItem, {
            type: "add",
            field: field,
            key: field.Field || index,
            onAdd: (field)=>handleAdd(field),
            onFieldStatistics: handleFieldStatistics,
            onTopN: handleTopN,
            isSelected: (field)=>selectedFieldNames.has(field.Field),
            searchActive: searchValue
        }))))));
}

// EXTERNAL MODULE: ./utils/time.ts
var utils_time = __webpack_require__(1157);
// EXTERNAL MODULE: ../node_modules/echarts-for-react/esm/index.js + 557 modules
var esm = __webpack_require__(1244);
// EXTERNAL MODULE: ../node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(5285);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);
// EXTERNAL MODULE: ./types/type.ts
var type = __webpack_require__(7944);
// EXTERNAL MODULE: ./constants.ts + 1 modules
var constants = __webpack_require__(2351);
;// ./components/discover-histogram/index.tsx
function discover_histogram_define_property(obj, key, value) {
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
function discover_histogram_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            discover_histogram_define_property(target, key, source[key]);
        });
    }
    return target;
}
function discover_histogram_ownKeys(object, enumerableOnly) {
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
function discover_histogram_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        discover_histogram_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}













function DiscoverHistogram({ height = 300, collapsed = false, onToggleCollapsed }) {
    const theme = (0,ui_.useTheme2)().isDark ? 'dark' : 'light';
    const timeZone = (0,react/* useAtomValue */.md)(discover/* timeZoneAtom */.tF);
    const [currentDate, setCurrentDate] = (0,react/* useAtom */.fp)(discover/* currentDateAtom */.Zb);
    const ReactEChartsInstance = (0,external_react_.useRef)(null);
    const [discoverCurrent, setDiscoverCurrent] = (0,react/* useAtom */.fp)(discover/* discoverCurrentAtom */.WN);
    const setActiveItem = (0,react/* useSetAtom */.Xr)(discover/* activeShortcutAtom */.m_);
    const tableDataCharts = (0,react/* useAtomValue */.md)(discover/* tableDataChartsAtom */.pB);
    if (false) // removed by dead control flow
{}
    const [interval_value, setInterval_value] = (0,external_react_.useState)(1);
    const [interval, setInterval] = (0,react/* useAtom */.fp)(discover/* intervalAtom */.le);
    if (false) // removed by dead control flow
{}
    const tableTotalCount = normalizeCount((0,react/* useAtomValue */.md)(discover/* tableTotalCountAtom */.HC));
    const [_timeRange, setTimeRange] = (0,react/* useAtom */.fp)(discover/* timeRangeAtom */.U9);
    const [_pageSize, setPageSize] = (0,react/* useAtom */.fp)(discover/* pageSizeAtom */.Ol);
    const setPage = (0,react/* useSetAtom */.Xr)(discover/* pageAtom */.fs);
    (0,external_react_.useEffect)(()=>{
        const v = (0,constants/* getAutoInterval */.Vy)(currentDate).interval_value;
        setInterval_value(v);
    }, [
        currentDate
    ]);
    const timeInterval = interval === type/* IntervalEnum */.B.Auto ? (0,constants/* translationDateIntervalType */.VA)(interval) : `${interval_value} ${(0,constants/* translationDateIntervalType */.VA)(interval)}`;
    const options = {
        title: {
            subtext: (0,i18n.t)('Time Interval: {{interval}}', {
                interval: timeInterval
            }),
            left: 'right',
            top: 12
        },
        grid: {
            left: '32px',
            right: '32px',
            bottom: '0px',
            containLabel: true
        },
        color: theme === 'light' ? [
            '#608DFF'
        ] : [
            '#608DFF'
        ],
        xAxis: {
            type: 'category',
            data: tableDataCharts.map((e)=>e.label),
            axisLabel: {
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 400,
                color: theme === 'light' ? '#9F9FA2' : '#5F5F64'
            },
            axisLine: {
                lineStyle: {
                    width: 0.5,
                    color: theme === 'light' ? '#BFBFC1' : '#3F3F45'
                }
            },
            axisTick: {
                show: false
            }
        },
        toolbox: {
            show: false
        },
        brush: {
            xAxisIndex: 0
        },
        yAxis: {
            name: (0,i18n.t)('Count'),
            nameTextStyle: {
                align: 'right',
                padding: [
                    5,
                    0
                ]
            },
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    width: 0.5,
                    color: theme === 'light' ? '#BFBFC1' : '#3F3F45'
                }
            },
            axisLabel: {
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 400
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            },
            padding: 0,
            borderWidth: 0,
            backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(63, 63, 69, 0.64)',
            formatter: function(params) {
                const html = `<div className="text-n2"
                                       style="
                                          padding: 8px;
                                          min-width: 120px;
                                          border-radius: 6px;
                                          backdrop-filter: blur(12px);
                                          color: ${theme === 'light' ? '#1F1F26' : '#EFEFF0'};
                                        ">
                                      <div style="padding-bottom: 4px; border-bottom: 1px solid ${theme === 'light' ? '#DFDFE0' : '#3F3F45'};">${[
                    params[0].name
                ]}</div>
                                      <div style="padding-top:4px;display: flex;justify-content: space-between;"><span>Count:</span><span style="font-family:DIN Alternate;font-size:14;font-weight:500;">${[
                    params[0].value || 0
                ]}</span></div>
                                  </div>`;
                return html;
            }
        },
        series: [
            {
                data: tableDataCharts.map((e)=>e['sum(cnt)']),
                type: 'bar',
                barWidth: '99.3%'
            }
        ],
        animation: false
    };
    (0,external_react_.useEffect)(()=>{
        const chart = ReactEChartsInstance.current;
        if (chart && tableDataCharts.length > 0) {
            const handler = ({ areas })=>{
                if (!areas.length) {
                    return;
                }
                setPage(1);
                setPageSize(50);
                setActiveItem(undefined);
                const [startIndex, endIndex] = areas[0].coordRange;
                const chartsStartDate = dayjs_min_default()(tableDataCharts[startIndex].TT);
                const chartsEndDate = dayjs_min_default()(tableDataCharts[endIndex].bucketEnd);
                setDiscoverCurrent(discover_histogram_object_spread_props(discover_histogram_object_spread({}, discoverCurrent), {
                    date: [
                        chartsStartDate,
                        chartsEndDate
                    ]
                }));
                setCurrentDate([
                    chartsStartDate,
                    chartsEndDate
                ]);
                setTimeRange((0,utils_time/* buildAbsoluteTimeRange */.kh)(chartsStartDate, chartsEndDate));
                chart.getEchartsInstance().dispatchAction({
                    type: 'brush',
                    command: 'clear',
                    areas: []
                });
            };
            if (chart.ele) {
                chart.getEchartsInstance().dispatchAction({
                    type: 'takeGlobalCursor',
                    key: 'brush',
                    brushOption: {
                        brushType: 'lineX'
                    }
                });
                chart.getEchartsInstance().on('brushEnd', handler);
                return ()=>{
                    if (chart.ele) {
                        chart.getEchartsInstance().off('brushEnd', handler);
                    }
                };
            }
        }
        return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        tableDataCharts
    ]);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                padding: 0 16px;
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                `
    }, /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement("span", {
        className: (0,css_.css)`
                            font-size: 24px;
                            font-weight: 600;
                        `
    }, tableTotalCount ? tableTotalCount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0'), ' ', /*#__PURE__*/ external_react_default().createElement("span", {
        className: (0,css_.css)`
                            font-size: 12px;
                        `
    }, (0,i18n.t)('hits'))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        font-size: 14px;
                        color: rgb(190, 190, 193);
                    `
    }, currentDate && `${currentDate[0] ? (0,utils_time/* formatTimeInZone */.Oh)(currentDate[0], timeZone) : ''} ~ ${currentDate[1] ? (0,utils_time/* formatTimeInZone */.Oh)(currentDate[1], timeZone) : ''} `), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        width: 160px;
                    `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        value: interval,
        onChange: (selectdbInterval)=>{
            setInterval(selectdbInterval.value);
        },
        options: utils_data/* TIME_INTERVALS */.NG
    })), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        "aria-label": collapsed ? (0,i18n.t)('Expand chart') : (0,i18n.t)('Collapse chart'),
        "data-testid": "discover-chart-toggle",
        name: collapsed ? 'angle-down' : 'angle-up',
        tooltip: collapsed ? (0,i18n.t)('Expand chart') : (0,i18n.t)('Collapse chart'),
        onClick: onToggleCollapsed
    })), !collapsed && /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        height: ${height}px;
                    `
    }, /*#__PURE__*/ external_react_default().createElement(esm/* default */.A, {
        option: options,
        ref: ReactEChartsInstance,
        style: {
            height: '100%'
        }
    })));
}

// EXTERNAL MODULE: ../node_modules/antd/es/tooltip/index.js + 91 modules
var tooltip = __webpack_require__(838);
// EXTERNAL MODULE: ../node_modules/antd/es/button/index.js + 20 modules
var es_button = __webpack_require__(4318);
// EXTERNAL MODULE: ../node_modules/@tanstack/react-table/build/lib/index.mjs
var lib = __webpack_require__(7796);
// EXTERNAL MODULE: ../node_modules/@tanstack/table-core/build/lib/index.mjs
var build_lib = __webpack_require__(6666);
// EXTERNAL MODULE: ../node_modules/@dnd-kit/core/dist/core.esm.js + 1 modules
var core_esm = __webpack_require__(1539);
// EXTERNAL MODULE: ../node_modules/@dnd-kit/sortable/dist/sortable.esm.js
var sortable_esm = __webpack_require__(8775);
// EXTERNAL MODULE: ../node_modules/@dnd-kit/utilities/dist/utilities.esm.js
var utilities_esm = __webpack_require__(9391);
;// ./components/selectdb-ui/sd-collapsible-table/index.tsx
function sd_collapsible_table_define_property(obj, key, value) {
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
function sd_collapsible_table_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            sd_collapsible_table_define_property(target, key, source[key]);
        });
    }
    return target;
}
function sd_collapsible_table_ownKeys(object, enumerableOnly) {
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
function sd_collapsible_table_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        sd_collapsible_table_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}








function SortableHeader({ header, canReorder, renderExpandAllToggle, isAllRowsExpanded, onToggleAll, stickyHeader }) {
    const theme = (0,ui_.useTheme2)();
    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = (0,sortable_esm/* useSortable */.gl)({
        id: header.column.id,
        disabled: !canReorder
    });
    const sorted = header.column.getIsSorted();
    const canSort = header.column.getCanSort();
    const ariaSort = sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none';
    return /*#__PURE__*/ external_react_default().createElement("th", {
        ref: setNodeRef,
        key: header.id,
        colSpan: header.colSpan,
        "aria-sort": canSort ? ariaSort : undefined,
        style: {
            width: header.getSize(),
            transform: utilities_esm/* CSS */.Ks.Translate.toString(transform),
            transition,
            opacity: isDragging ? 0.7 : 1
        },
        className: (0,css_.css)`
                position: ${stickyHeader ? 'sticky' : 'relative'};
                ${stickyHeader ? 'top: 0;' : ''}
                z-index: ${isDragging ? 4 : 2};
                height: 48px;
                white-space: nowrap;
                background-color: ${theme.isLight ? 'hsl(var(--table-header-background))' : 'hsl(var(--table-header-background-dark))'};
                padding: 0 16px;
                text-align: left;
                vertical-align: middle;
                font-size: 14px;
                font-weight: 500;
                color: hsl(var(--n2));

                &:has([role='checkbox']) {
                    padding-right: 0;
                }
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    display: flex;
                    align-items: center;
                    min-width: 0;
                    height: 100%;
                    gap: 4px;
                `
    }, renderExpandAllToggle ? /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: isAllRowsExpanded ? 'arrow-down' : 'arrow-right',
        tooltip: isAllRowsExpanded ? (0,i18n.t)('Collapse all') : (0,i18n.t)('Expand all'),
        onClick: onToggleAll
    }) : null, canReorder ? /*#__PURE__*/ external_react_default().createElement("button", sd_collapsible_table_object_spread_props(sd_collapsible_table_object_spread({
        type: "button",
        "aria-label": (0,i18n.t)('Move column {{column}}', {
            column: header.column.id
        }),
        title: (0,i18n.t)('Drag to reorder column')
    }, attributes, listeners), {
        className: (0,css_.css)`
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            flex: 0 0 20px;
                            width: 20px;
                            height: 28px;
                            padding: 0;
                            border: 0;
                            border-radius: 4px;
                            background: transparent;
                            color: ${theme.colors.text.secondary};
                            cursor: grab;

                            &:hover,
                            &:focus-visible {
                                color: ${theme.colors.text.primary};
                                background: ${theme.colors.action.hover};
                            }

                            &:active {
                                cursor: grabbing;
                            }
                        `
    }), /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
        name: "draggabledots",
        size: "sm"
    })) : null, /*#__PURE__*/ external_react_default().createElement("div", {
        role: canSort ? 'button' : undefined,
        tabIndex: canSort ? 0 : undefined,
        onClick: canSort ? header.column.getToggleSortingHandler() : undefined,
        onKeyDown: canSort ? (event)=>{
            if (event.target !== event.currentTarget) {
                return;
            }
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                header.column.toggleSorting();
            }
        } : undefined,
        className: (0,css_.css)`
                        display: inline-flex;
                        align-items: center;
                        min-width: 0;
                        gap: 6px;
                        padding: 0;
                        border: 0;
                        background: transparent;
                        color: inherit;
                        font: inherit;
                        cursor: ${canSort ? 'pointer' : 'default'};
                    `
    }, /*#__PURE__*/ external_react_default().createElement("span", {
        className: (0,css_.css)`
                            min-width: 0;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        `
    }, header.isPlaceholder ? null : (0,lib/* flexRender */.Kv)(header.column.columnDef.header, header.getContext())), canSort && sorted ? /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
        name: sorted === 'asc' ? 'angle-up' : 'angle-down',
        size: "sm"
    }) : null), header.column.getCanResize() ? /*#__PURE__*/ external_react_default().createElement("div", {
        role: "separator",
        "aria-label": (0,i18n.t)('Resize column {{column}}', {
            column: header.column.id
        }),
        "aria-orientation": "vertical",
        title: (0,i18n.t)('Drag to resize column; double-click to reset'),
        onDoubleClick: ()=>header.column.resetSize(),
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: (0,css_.cx)((0,css_.css)`
                                position: absolute;
                                top: 0;
                                right: 0;
                                z-index: 5;
                                width: 10px;
                                height: 100%;
                                cursor: col-resize;
                                touch-action: none;
                                user-select: none;

                                &::after {
                                    content: '';
                                    position: absolute;
                                    top: 15%;
                                    right: 1px;
                                    width: 2px;
                                    height: 70%;
                                    border-radius: 1px;
                                    background: ${theme.colors.text.secondary};
                                }

                                &:hover::after {
                                    background: ${theme.colors.primary.main};
                                }
                            `, header.column.getIsResizing() ? (0,css_.css)`
                                      &::after {
                                          background: ${theme.colors.primary.main};
                                      }
                                  ` : undefined)
    }) : null));
}
function SDCollapsibleTable(props) {
    const { data, columns, renderSubComponent, getRowCanExpand, className, showExpandAllToggle, allRowsExpanded, onAllRowsExpandedChange, columnOrder, onColumnOrderChange, columnSizing, onColumnSizingChange, sorting, onSortingChange, enableColumnReordering = false, emptyContent, rowVerticalPadding = 0, stickyHeader = true } = props;
    const theme = (0,ui_.useTheme2)();
    const [expanded, setExpanded] = (0,external_react_.useState)(allRowsExpanded ? true : {});
    const sensors = (0,core_esm/* useSensors */.FR)((0,core_esm/* useSensor */.MS)(core_esm/* PointerSensor */.AN, {
        activationConstraint: {
            distance: 5
        }
    }), (0,core_esm/* useSensor */.MS)(core_esm/* KeyboardSensor */.uN, {
        coordinateGetter: sortable_esm/* sortableKeyboardCoordinates */.JR
    }));
    (0,external_react_.useEffect)(()=>{
        if (typeof allRowsExpanded === 'boolean') {
            setExpanded(allRowsExpanded ? true : {});
        }
    }, [
        allRowsExpanded
    ]);
    const table = (0,lib/* useReactTable */.N4)({
        data,
        columns,
        state: sd_collapsible_table_object_spread({
            expanded
        }, columnOrder ? {
            columnOrder
        } : {}, columnSizing ? {
            columnSizing
        } : {}, sorting ? {
            sorting
        } : {}),
        onExpandedChange: setExpanded,
        onColumnOrderChange,
        onColumnSizingChange,
        onSortingChange,
        getRowCanExpand,
        getCoreRowModel: (0,build_lib/* getCoreRowModel */.HT)(),
        getExpandedRowModel: (0,build_lib/* getExpandedRowModel */.D0)(),
        defaultColumn: {
            size: 240,
            minSize: 80,
            maxSize: 800
        },
        columnResizeMode: 'onChange',
        manualSorting: true,
        enableMultiSort: false,
        enableSortingRemoval: false
    });
    const reorderableColumnIds = (0,external_react_.useMemo)(()=>table.getAllLeafColumns().filter((column)=>column.id !== '__expand').map((column)=>column.id), // The table instance is stable; columns is the source that changes available IDs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        columns
    ]);
    const handleDragEnd = (event)=>{
        if (!onColumnOrderChange || !event.over || event.active.id === event.over.id) {
            return;
        }
        const currentOrder = (columnOrder === null || columnOrder === void 0 ? void 0 : columnOrder.length) ? columnOrder : table.getAllLeafColumns().map((column)=>column.id);
        const oldIndex = currentOrder.indexOf(String(event.active.id));
        const newIndex = currentOrder.indexOf(String(event.over.id));
        if (oldIndex < 0 || newIndex < 0) {
            return;
        }
        const nextOrder = (0,sortable_esm/* arrayMove */.be)(currentOrder, oldIndex, newIndex);
        const pinnedOrder = [
            '__expand',
            ...nextOrder.filter((id)=>id !== '__expand')
        ];
        onColumnOrderChange(pinnedOrder);
    };
    return /*#__PURE__*/ external_react_default().createElement(core_esm/* DndContext */.Mp, {
        sensors: sensors,
        collisionDetection: core_esm/* closestCenter */.fp,
        onDragEnd: handleDragEnd
    }, /*#__PURE__*/ external_react_default().createElement("table", {
        className: className,
        style: {
            width: table.getTotalSize(),
            minWidth: '100%',
            tableLayout: 'fixed'
        }
    }, /*#__PURE__*/ external_react_default().createElement("thead", null, table.getHeaderGroups().map((headerGroup)=>/*#__PURE__*/ external_react_default().createElement(sortable_esm/* SortableContext */.gB, {
            key: headerGroup.id,
            items: reorderableColumnIds,
            strategy: sortable_esm/* horizontalListSortingStrategy */.m$
        }, /*#__PURE__*/ external_react_default().createElement("tr", {
            className: (0,css_.css)`
                                    ${theme.isDark ? 'border-bottom: 1px solid hsl(var(--border-dark));' : 'border-bottom: 1px solid hsl(var(--border));'}
                                `
        }, headerGroup.headers.map((header, index)=>{
            const renderExpandAllToggle = Boolean(showExpandAllToggle && index === 0);
            const isAllRowsExpanded = typeof allRowsExpanded === 'boolean' ? allRowsExpanded : table.getIsAllRowsExpanded();
            return /*#__PURE__*/ external_react_default().createElement(SortableHeader, {
                key: header.id,
                header: header,
                canReorder: enableColumnReordering && header.column.id !== '__expand',
                renderExpandAllToggle: renderExpandAllToggle,
                isAllRowsExpanded: isAllRowsExpanded,
                stickyHeader: stickyHeader,
                onToggleAll: ()=>{
                    const nextExpanded = !isAllRowsExpanded;
                    table.toggleAllRowsExpanded(nextExpanded);
                    onAllRowsExpandedChange === null || onAllRowsExpandedChange === void 0 ? void 0 : onAllRowsExpandedChange(nextExpanded);
                }
            });
        }))))), /*#__PURE__*/ external_react_default().createElement("tbody", {
        className: (0,css_.css)`
                        #selected {
                            background-color: #3f3f46cc;
                        }
                    `
    }, table.getRowModel().rows.length > 0 ? table.getRowModel().rows.map((row)=>/*#__PURE__*/ external_react_default().createElement(external_react_.Fragment, {
            key: row.id
        }, /*#__PURE__*/ external_react_default().createElement("tr", {
            id: row.original.selected ? 'selected' : '',
            className: (0,css_.css)`
                                        ${row.getIsExpanded() ? 'border: none;' : theme.isDark ? 'border-bottom: 1px solid hsl(var(--border-dark));' : 'border-bottom: 1px solid hsl(var(--border));'}
                                        ${theme.isLight ? `background-color: ${row.original.selected ? 'hsl(var(--b1) / 0.6)' : 'hsl(val(--n8))'}; &:hover { background-color: hsl(var(--b1) / 0.8); }` : `background-color: ${row.original.selected ? 'hsl(var(--n7))' : 'hsl(val(--n8))'}; &:hover { background-color: hsl(var(--n7) / 0.8); }`}
                                    `
        }, row.getVisibleCells().map((cell)=>/*#__PURE__*/ external_react_default().createElement("td", {
                key: cell.id,
                style: {
                    width: cell.column.getSize()
                },
                className: (0,css_.css)`
                                                height: 48px;
                                                padding: ${rowVerticalPadding}px 16px;
                                                overflow: hidden;
                                                font-size: 14px;
                                            `
            }, cell.getContext().getValue() !== null ? (0,lib/* flexRender */.Kv)(cell.column.columnDef.cell, cell.getContext()) : '-'))), row.getIsExpanded() ? /*#__PURE__*/ external_react_default().createElement("tr", {
            className: (0,css_.css)`
                                            border-bottom: 1px solid rgb(63, 63, 70);
                                            transition: background-color 150ms ease-in-out;

                                            &:hover {
                                                background-color: hsl(var(--muted) / 0.5);
                                            }
                                        `
        }, /*#__PURE__*/ external_react_default().createElement("td", {
            colSpan: row.getVisibleCells().length,
            className: (0,css_.css)`
                                                height: 32px;
                                                padding: 0;
                                            `
        }, renderSubComponent({
            row
        }))) : null)) : /*#__PURE__*/ external_react_default().createElement("tr", null, /*#__PURE__*/ external_react_default().createElement("td", {
        colSpan: Math.max(table.getVisibleLeafColumns().length, 1)
    }, emptyContent || /*#__PURE__*/ external_react_default().createElement(ui_.EmptySearchResult, null, (0,i18n.t)('No Data')))))));
}

;// ./components/discover-content/discover-content.style.ts


const HoverStyle = (0,css_.css)`
    &:hover {
        .filter-content {
            visibility: visible;
        }
    }
`;
const ColumnStyleWrapper = emotion_styled_browser_esm/* default */.A.div`
    .field-pair {
        display: inline-flex;
        align-items: baseline;
        gap: 4px;
        margin: 1px 6px 1px 0;
        max-width: 100%;
    }

    .field-key {
        padding: 0px 4px 2px;
        border-radius: 4px;
        flex-shrink: 0;
        white-space: nowrap;
    }

    .field-value {
        min-width: 0;
    }
`;

;// ./components/discover-content/content-table-actions.tsx







function ContentTableActions({ fieldName, fieldValue }) {
    var _tableFields_find;
    const [selectedFields, setSelectedFields] = (0,react/* useAtom */.fp)(discover/* selectedFieldsAtom */.Wg);
    const [dataFilter, setDataFilter] = (0,react/* useAtom */.fp)(discover/* dataFilterAtom */.EA);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const fieldType = (_tableFields_find = tableFields.find((field)=>field.Field === fieldName)) === null || _tableFields_find === void 0 ? void 0 : _tableFields_find.Type;
    const hasField = selectedFields.some((item)=>item.Field === fieldName);
    const filterValue = typeof fieldValue === 'object' ? JSON.stringify(fieldValue) : fieldValue;
    return /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement("div", {
        className: "icons",
        style: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    }, !(0,utils_data/* isComplexType */.tF)(fieldType) && /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "plus-circle",
        tooltip: (0,i18n.t)('Equivalent filtration'),
        onClick: ()=>{
            setDataFilter([
                ...dataFilter,
                {
                    fieldName: fieldName,
                    operator: '=',
                    value: [
                        filterValue
                    ],
                    id: (0,index_browser/* nanoid */.Ak)()
                }
            ]);
        }
    }), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "minus-circle",
        tooltip: (0,i18n.t)('Nonequivalent filtration'),
        onClick: ()=>{
            setDataFilter([
                ...dataFilter,
                {
                    fieldName: fieldName,
                    operator: '!=',
                    value: [
                        filterValue
                    ],
                    id: (0,index_browser/* nanoid */.Ak)()
                }
            ]);
        }
    })), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "plus",
        tooltip: hasField ? (0,i18n.t)('Delete From Table') : (0,i18n.t)('Add To Table'),
        onClick: ()=>{
            const field = tableFields.find((field)=>field.Field === fieldName);
            if (hasField) {
                const index = selectedFields.findIndex((item)=>item.Field === fieldName);
                selectedFields.splice(index, 1);
                setSelectedFields([
                    ...selectedFields
                ]);
            } else {
                setSelectedFields([
                    ...selectedFields,
                    field
                ]);
            }
        }
    })));
}

;// ./components/discover-content/content-item.tsx








function ContentItem({ fieldName, fieldValue, fieldType }) {
    const [dataFilter, setDataFilter] = (0,react/* useAtom */.fp)(discover/* dataFilterAtom */.EA);
    return /*#__PURE__*/ external_react_default().createElement("div", null, !(0,utils_data/* isComplexType */.tF)(fieldType) && /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    display: flex;
                    alignItems: 'center';
                    margin-left: 10px;
                `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "plus-circle",
        onClick: (e)=>{
            setDataFilter([
                ...dataFilter,
                {
                    fieldName,
                    operator: '=',
                    value: [
                        fieldValue
                    ],
                    id: (0,index_browser/* nanoid */.Ak)()
                }
            ]);
            e.stopPropagation();
        },
        tooltip: (0,i18n.t)('Equivalent filtration')
    }), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "minus-circle",
        style: {
            marginLeft: '4px'
        },
        onClick: (e)=>{
            setDataFilter([
                ...dataFilter,
                {
                    fieldName,
                    operator: '!=',
                    value: [
                        fieldValue
                    ],
                    id: (0,index_browser/* nanoid */.Ak)()
                }
            ]);
            e.stopPropagation();
        },
        tooltip: (0,i18n.t)('Nonequivalent filtration')
    })));
}

// EXTERNAL MODULE: ../node_modules/ahooks/es/useRequest/index.js + 31 modules
var useRequest = __webpack_require__(5494);
;// ./components/surrounding-logs/logs-actions.tsx




function SurroundingLogsActions(props) {
    const { getSurroundingData, getSurroundingDataLoading, time, timeFieldPageSize, tips, count, type } = props;
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                display: flex;
                align-items: center;
                justify-content: flex-start;
            `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        // loading={getSurroundingDataLoading}
        className: "font-normal text-n2 hover:text-b7 hover:no-underline",
        onClick: ()=>{
            getSurroundingData({
                time: time
            });
        },
        type: "reset"
    }, !getSurroundingDataLoading && /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, type === 'before' ? /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "arrow-up",
        "aria-label": (0,i18n.t)('Load After')
    }) : /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "arrow-down",
        "aria-label": (0,i18n.t)('Load Before')
    })), (0,i18n.t)('Load {{count}} items', {
        count: timeFieldPageSize
    })), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    margin-left: 8px;
                `
    }, (0,i18n.t)('{{count}} items', {
        count
    }), ' ', tips));
}

;// ./components/surrounding-logs/discover-filter/index.tsx











/** Optional, read-only projection of the main Discover filters. */ function SurroundingDiscoverFilter({ enabled, onEnabledChange }) {
    const dataFilter = (0,react/* useAtomValue */.md)(discover/* dataFilterAtom */.EA);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const variantFields = (0,react/* useAtomValue */.md)(discover/* variantFieldsAtom */.cE);
    const theme = (0,ui_.useTheme2)();
    return /*#__PURE__*/ external_react_default().createElement(DiscoverFilterWrapper, {
        className: (0,css_.css)`
                background-color: ${theme.isDark ? 'rgb(24, 27, 31)' : '#FFF'};
                padding: 1rem;
                padding-bottom: 1.5rem;
                margin-top: 1px;
                border-radius: 0 0 0.25rem 0.25rem;
            `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Checkbox, {
        label: (0,i18n.t)('Filter'),
        checked: enabled,
        onChange: (event)=>onEnabledChange(event.currentTarget.checked)
    }), /*#__PURE__*/ external_react_default().createElement("div", {
        className: "filter-tag",
        style: {
            opacity: enabled ? 1 : 0.5
        }
    }, dataFilter.map((dataFilterValue, index)=>{
        const displayFilter = (0,sql_filter/* enrichStructuredFilterTypes */.a9)([
            dataFilterValue
        ], [
            ...tableFields,
            ...flattenVariantLeaves(variantFields)
        ])[0];
        return /*#__PURE__*/ external_react_default().createElement("div", {
            key: index.toString(),
            className: (0,css_.css)`
                                margin-left: 8px;
                            `
        }, /*#__PURE__*/ external_react_default().createElement(ui_.Badge, {
            key: index,
            text: getFilterDisplayLabel(dataFilterValue) || (0,utils_data/* getFilterSQL */.t9)(displayFilter),
            color: "blue"
        }));
    })));
}

// EXTERNAL MODULE: ../node_modules/lodash-es/sortBy.js + 12 modules
var sortBy = __webpack_require__(5023);
// EXTERNAL MODULE: external "rxjs"
var external_rxjs_ = __webpack_require__(1269);
// EXTERNAL MODULE: ../node_modules/sqlstring/index.js
var sqlstring = __webpack_require__(1194);
var sqlstring_default = /*#__PURE__*/__webpack_require__.n(sqlstring);
;// ./services/sql.ts





function getVariantSortExpression(fieldPath, variantPath, type) {
    const expression = (0,sql_filter/* transformFieldPath */.k8)(fieldPath, variantPath);
    const normalizedType = type === null || type === void 0 ? void 0 : type.toUpperCase();
    const castType = (normalizedType === null || normalizedType === void 0 ? void 0 : normalizedType.includes('BOOLEAN')) ? 'BOOLEAN' : (normalizedType === null || normalizedType === void 0 ? void 0 : normalizedType.includes('DOUBLE')) || (normalizedType === null || normalizedType === void 0 ? void 0 : normalizedType.includes('FLOAT')) || (normalizedType === null || normalizedType === void 0 ? void 0 : normalizedType.includes('DECIMAL')) || (normalizedType === null || normalizedType === void 0 ? void 0 : normalizedType.includes('INT')) ? 'DOUBLE' : 'STRING';
    return `CAST(${expression} AS ${castType})`;
}
function getQueryOrderBySQL(params) {
    var _params_sortField, _params_sortFieldPath;
    const sortField = ((_params_sortField = params.sortField) === null || _params_sortField === void 0 ? void 0 : _params_sortField.trim()) || params.timeField;
    const direction = params.sort === 'ASC' ? 'ASC' : 'DESC';
    const primaryExpression = ((_params_sortFieldPath = params.sortFieldPath) === null || _params_sortFieldPath === void 0 ? void 0 : _params_sortFieldPath.length) ? getVariantSortExpression(sortField, params.sortFieldPath, params.sortFieldType) : (0,sql_filter/* transformFieldPath */.k8)(sortField);
    const primaryOrder = `${primaryExpression} ${direction}`;
    if (sortField === params.timeField) {
        return primaryOrder;
    }
    return `${primaryOrder}, ${(0,sql_filter/* transformFieldPath */.k8)(params.timeField)} DESC`;
}
function resolveQuerySortField(requestedField, timeField, availableFields) {
    return requestedField && new Set(availableFields).has(requestedField) ? requestedField : timeField;
}
function getQueryTableResultSQL(params) {
    const indexesStatement = params.indexes_statement;
    let statement = `SELECT * FROM \`${params.database}\`.\`${params.table}\` WHERE`;
    if (indexesStatement && params.search_type === 'Search') {
        statement += ` (${indexesStatement}) AND`;
    }
    // timeField 加上反引号
    statement += ` (\`${params.timeField}\` BETWEEN '${params.startDate}' AND '${params.endDate}') `;
    statement = params.data_filters.reduce((prev, curr)=>{
        return (0,sql_filter/* addSqlFilter */.QI)(prev, curr);
    }, statement);
    if (params.search_type === 'SQL' && params.search_value) {
        statement = statement + ` AND ${params.search_value}`;
    }
    if (params.search_type === 'Lucene' && params.lucene_where) {
        statement = statement + ` AND (${params.lucene_where})`;
    }
    // ORDER BY 的 timeField 也加反引号
    statement = statement + ` ORDER BY ${getQueryOrderBySQL(params)} LIMIT ${+params.page_size} OFFSET ${(+(params === null || params === void 0 ? void 0 : params.page) - 1) * params.page_size} `;
    return statement;
}
const NUMERIC_DORIS_TYPE = /(TINYINT|SMALLINT|MEDIUMINT|INT|BIGINT|LARGEINT|FLOAT|DOUBLE|DECIMAL)/i;
function getTopNQuerySQL(params, availableFields) {
    const limit = Number(params.limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > 10000) {
        throw new Error((0,i18n.t)('Top N limit must be an integer between 1 and 10000'));
    }
    const group = availableFields.find((field)=>field.Field === params.groupField);
    if (!group) {
        throw new Error((0,i18n.t)('Top N group field is unavailable'));
    }
    const metric = params.metric || 'COUNT';
    if (![
        'COUNT',
        'SUM',
        'AVG',
        'MIN',
        'MAX'
    ].includes(metric)) {
        throw new Error((0,i18n.t)('Top N aggregation is unsupported'));
    }
    const metricField = metric === 'COUNT' ? undefined : availableFields.find((field)=>field.Field === params.metricField);
    if (metric !== 'COUNT' && (!metricField || !NUMERIC_DORIS_TYPE.test(metricField.Type || ''))) {
        throw new Error((0,i18n.t)('Top N metric requires an available numeric field'));
    }
    const groupExpression = (0,sql_filter/* transformFieldPath */.k8)(group.Field);
    const metricExpression = metric === 'COUNT' ? 'COUNT(*)' : `${metric}(${(0,sql_filter/* transformFieldPath */.k8)(metricField.Field)})`;
    const metricAlias = '__top_n_value';
    let statement = `SELECT ${groupExpression} AS ${(0,sql_filter/* transformFieldPath */.k8)(params.groupField)}, ${metricExpression} AS ${(0,sql_filter/* transformFieldPath */.k8)(metricAlias)} FROM \`${params.database}\`.\`${params.table}\` WHERE`;
    if (params.indexes_statement && params.search_type === 'Search') {
        statement += ` (${params.indexes_statement}) AND`;
    }
    statement += ` (${(0,sql_filter/* transformFieldPath */.k8)(params.timeField)} BETWEEN '${params.startDate}' AND '${params.endDate}')`;
    statement = (params.data_filters || []).reduce((sql, filter)=>(0,sql_filter/* addSqlFilter */.QI)(sql, filter), statement);
    if (params.search_type === 'SQL' && params.search_value) {
        statement += ` AND ${params.search_value}`;
    }
    if (params.search_type === 'Lucene' && params.lucene_where) {
        statement += ` AND (${params.lucene_where})`;
    }
    statement += ` GROUP BY ${groupExpression} ORDER BY ${(0,sql_filter/* transformFieldPath */.k8)(metricAlias)} ${params.direction === 'ASC' ? 'ASC' : 'DESC'}, ${groupExpression} ASC LIMIT ${limit}`;
    return statement;
}
function getFieldStatisticsWhere(params) {
    let statement = `FROM \`${params.database}\`.\`${params.table}\` WHERE`;
    if (params.indexes_statement && params.search_type === 'Search') {
        statement += ` (${params.indexes_statement}) AND`;
    }
    statement += ` (${(0,sql_filter/* transformFieldPath */.k8)(params.timeField)} BETWEEN '${params.startDate}' AND '${params.endDate}')`;
    statement = (params.data_filters || []).reduce((sql, filter)=>(0,sql_filter/* addSqlFilter */.QI)(sql, filter), statement);
    if (params.search_type === 'SQL' && params.search_value) {
        statement += ` AND ${params.search_value}`;
    }
    if (params.search_type === 'Lucene' && params.lucene_where) {
        statement += ` AND (${params.lucene_where})`;
    }
    return statement;
}
function getFieldStatisticsExpression(params) {
    return (0,sql_filter/* getFilterFieldReference */.MF)({
        fieldName: params.field.Field,
        variantPath: params.field.variantPath,
        variantRootType: params.field.variantRootType,
        fieldType: params.field.Type,
        operator: 'is not null',
        value: [],
        id: 'field-statistics'
    });
}
function supportsFieldStatisticsHistogram(type) {
    return /(TINYINT|SMALLINT|MEDIUMINT|INT|BIGINT|LARGEINT|FLOAT|DOUBLE|DECIMAL|DATE|TIME|TIMESTAMP)/i.test(type || '');
}
function getFieldStatisticsSummarySQL(params) {
    const expression = getFieldStatisticsExpression(params);
    const histogram = supportsFieldStatisticsHistogram(params.field.Type) ? `, HISTOGRAM(${expression}, 20) AS \`__field_stats_histogram\`` : '';
    return `SELECT COUNT(*) AS \`__field_stats_total\`, COUNT(${expression}) AS \`__field_stats_non_null\`, APPROX_COUNT_DISTINCT(${expression}) AS \`__field_stats_distinct\`, MIN(${expression}) AS \`__field_stats_min\`, MAX(${expression}) AS \`__field_stats_max\`${histogram} ${getFieldStatisticsWhere(params)}`;
}
function getFieldStatisticsTopValuesSQL(params) {
    const expression = getFieldStatisticsExpression(params);
    return `SELECT ${expression} AS \`__field_stats_value\`, COUNT(*) AS \`__field_stats_count\` ${getFieldStatisticsWhere(params)} AND ${expression} IS NOT NULL GROUP BY ${expression} ORDER BY \`__field_stats_count\` DESC, ${expression} ASC LIMIT 5`;
}
function getQueryTableChartsSQL(params) {
    const indexes = params.indexes;
    const unit = [
        'second',
        'minute',
        'hour',
        'day',
        'week',
        'month',
        'year'
    ].includes(params.interval || '') ? params.interval : 'hour';
    const period = Math.max(1, Math.floor(params.interval_value || 1));
    const zone = params.timeZone === 'browser' ? Intl.DateTimeFormat().resolvedOptions().timeZone : params.timeZone || 'UTC';
    const origin = (0,utils_time/* histogramOrigin */.Ts)((0,utils_time/* parseDorisTime */.sN)(params.startDate), {
        interval_unit: unit,
        interval_value: period
    }, zone);
    const field = sqlstring_default().escapeId(params.timeField);
    // Fixed units stay on the absolute timeline so repeated DST hours remain distinct.
    const fixedUnit = [
        'second',
        'minute',
        'hour'
    ].includes(unit);
    const bucket = fixedUnit ? `${unit}_FLOOR(${field}, ${period}, ${sqlstring_default().escape((0,utils_time/* formatSqlTime */.h9)(origin))})` : `CONVERT_TZ(${unit}_FLOOR(CONVERT_TZ(${field}, 'UTC', ${sqlstring_default().escape(zone)}), ${period}, ${sqlstring_default().escape(origin.format('YYYY-MM-DD HH:mm:ss'))}), ${sqlstring_default().escape(zone)}, 'UTC')`;
    let statement = `SELECT ${bucket} AS TT, COUNT(*) AS \`sum(cnt)\` FROM \`${params.database}\`.\`${params.table}\` WHERE`;
    if (indexes && params.search_type === 'Search') {
        statement += ` (${indexes}) AND`;
    }
    statement += ` (\`${params.timeField}\` between '${params.startDate}' AND '${params.endDate}') `;
    if (params.data_filters.length > 0) {
        statement = params.data_filters.reduce((prev, curr)=>{
            return (0,sql_filter/* addSqlFilter */.QI)(prev, curr);
        }, statement);
    }
    if (params.search_type === 'SQL' && params.search_value) {
        statement = statement + ` ` + `AND ${params.search_value}`;
    }
    if (params.search_type === 'Lucene' && params.lucene_where) {
        statement = statement + ` AND (${params.lucene_where})`;
    }
    statement = statement + ` ` + `GROUP BY TT ORDER BY TT`;
    return statement;
}
function getQueryTableResultCountSQL(params) {
    const indexes = params.indexes;
    let statement = `SELECT SUM(table_per_time.cnt) AS total_count
        FROM (
          SELECT ${params.interval}_FLOOR(${params.timeField}) as T, COUNT(*) as cnt
          FROM \`${params.database}\`.\`${params.table}\`
          WHERE`;
    if (indexes && params.search_type === 'Search') {
        statement += ` (${indexes}) AND`;
    }
    statement += ` (\`${params.timeField}\` between '${params.startDate}' AND '${params.endDate}')`;
    if (params.data_filters.length > 0) {
        statement = params.data_filters.reduce((prev, curr)=>{
            return (0,sql_filter/* addSqlFilter */.QI)(prev, curr);
        }, statement);
    }
    if (params.search_type === 'SQL' && params.search_value) {
        statement = statement + ` ` + `AND ${params.search_value}`;
    }
    if (params.search_type === 'Lucene' && params.lucene_where) {
        statement = statement + ` AND (${params.lucene_where})`;
    }
    statement = statement + ` ` + `GROUP BY T) AS table_per_time;`;
    return statement;
}
function getSurroundingSQL(params) {
    const anchor = (0,utils_time/* parseDorisTime */.sN)(params.time);
    if (!anchor.isValid()) {
        throw new Error((0,i18n.t)('Invalid surrounding log anchor'));
    }
    const hours = [
        1,
        6,
        24
    ].includes(params.windowHours || 1) ? params.windowHours || 1 : 1;
    const anchorLiteral = sqlstring_default().escape(anchor.format('YYYY-MM-DD HH:mm:ss.SSS'));
    const field = sqlstring_default().escapeId(params.timeField);
    const lower = params.operator === '<' ? `${anchorLiteral} - INTERVAL ${hours} HOUR` : anchorLiteral;
    const upper = params.operator === '>' ? `${anchorLiteral} + INTERVAL ${hours} HOUR` : anchorLiteral;
    let statement = `SELECT * FROM ${sqlstring_default().escapeId(params.database)}.${sqlstring_default().escapeId(params.table)} WHERE (${field} BETWEEN ${lower} AND ${upper}) AND (${field} ${params.operator === '<' ? '<' : '>'} ${anchorLiteral})`;
    statement = (params.data_filters || []).reduce((sql, filter)=>(0,sql_filter/* addSqlFilter */.QI)(sql, filter), statement);
    return `${statement} ORDER BY ${field} ${params.operator === '<' ? 'DESC' : 'ASC'} LIMIT ${Math.max(1, Math.floor(+params.pageSize))}`;
}

// EXTERNAL MODULE: ./components/with-error-handler/withErrorHandler.tsx
var withErrorHandler = __webpack_require__(6472);
;// ./services/discover.ts
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
function discover_define_property(obj, key, value) {
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
function discover_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            discover_define_property(target, key, source[key]);
        });
    }
    return target;
}
function discover_ownKeys(object, enumerableOnly) {
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
function discover_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        discover_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function discover_object_without_properties(source, excluded) {
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
    target = discover_object_without_properties_loose(source, excluded);
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
function discover_object_without_properties_loose(source, excluded) {
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





function getTableDataService(payload, options) {
    const { selectdbDS } = payload, rest = discover_object_without_properties(payload, [
        "selectdbDS"
    ]);
    const QueryTableResultSQL = getQueryTableResultSQL(rest);
    const response = (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTableData',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: QueryTableResultSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), discover_object_spread_props(discover_object_spread({}, options), {
        generatedSql: QueryTableResultSQL
    }));
    return response;
}
function getTopNDataService(payload, fields, options) {
    const { selectdbDS } = payload, rest = discover_object_without_properties(payload, [
        "selectdbDS"
    ]);
    const sql = getTopNQuerySQL(rest, fields);
    return (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTopNData',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: sql,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), discover_object_spread_props(discover_object_spread({}, options), {
        generatedSql: sql
    }));
}
function getFieldStatisticsService(payload, options) {
    const { selectdbDS } = payload, params = discover_object_without_properties(payload, [
        "selectdbDS"
    ]);
    const summarySql = getFieldStatisticsSummarySQL(params);
    const topValuesSql = getFieldStatisticsTopValuesSQL(params);
    return (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getFieldStatisticsSummary',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: summarySql,
                    format: 'table'
                },
                {
                    refId: 'getFieldStatisticsTopValues',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: topValuesSql,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), discover_object_spread_props(discover_object_spread({}, options), {
        generatedSql: summarySql
    }));
}
function getTableDataChartsService(payload, options) {
    const { selectdbDS } = payload, rest = discover_object_without_properties(payload, [
        "selectdbDS"
    ]);
    const QueryTableChartsSQL = getQueryTableChartsSQL(rest);
    const response = (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTableDataCharts',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: QueryTableChartsSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), discover_object_spread_props(discover_object_spread({}, options), {
        generatedSql: QueryTableChartsSQL
    }));
    return response;
}
function getTopDataService(payload, options) {
    const { selectdbDS } = payload, rest = discover_object_without_properties(payload, [
        "selectdbDS"
    ]);
    const QueryTableResultSQL = getQueryTableResultSQL(rest);
    const response = (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTableTopData',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: QueryTableResultSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), discover_object_spread_props(discover_object_spread({}, options), {
        generatedSql: QueryTableResultSQL
    }));
    return response;
}
function getTableDataCountService(payload, options) {
    const { selectdbDS } = payload, rest = discover_object_without_properties(payload, [
        "selectdbDS"
    ]);
    const QueryTableResultCountSQL = getQueryTableResultCountSQL(rest);
    const response = (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getTableCountData',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: QueryTableResultCountSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }), discover_object_spread_props(discover_object_spread({}, options), {
        generatedSql: QueryTableResultCountSQL
    }));
    return response;
}
function getSurroundingDataService(payload) {
    const { selectdbDS } = payload, rest = discover_object_without_properties(payload, [
        "selectdbDS"
    ]);
    const surroundingSQL = getSurroundingSQL(rest);
    const response = (0,withErrorHandler/* withErrorHandler */.F)((0,runtime_.getBackendSrv)().fetch({
        url: '/api/ds/query',
        method: 'POST',
        data: {
            queries: [
                {
                    refId: 'getSurroundingData',
                    datasource: {
                        type: selectdbDS.type,
                        uid: selectdbDS.uid
                    },
                    rawSql: surroundingSQL,
                    format: 'table'
                }
            ]
        },
        credentials: 'include'
    }));
    return response;
}
/** Each wider query replaces the preceding result; the anchor never moves. */ function getSurroundingDataWithWindow(payload) {
    return (0,external_rxjs_.defer)(()=>_async_to_generator(function*() {
            let response;
            for (const windowHours of [
                1,
                6,
                24
            ]){
                var _response_data_results, _response_data, _result_frames;
                response = yield (0,external_rxjs_.lastValueFrom)(getSurroundingDataService(discover_object_spread_props(discover_object_spread({}, payload), {
                    windowHours
                })));
                const result = response === null || response === void 0 ? void 0 : (_response_data = response.data) === null || _response_data === void 0 ? void 0 : (_response_data_results = _response_data.results) === null || _response_data_results === void 0 ? void 0 : _response_data_results.getSurroundingData;
                if (!(response === null || response === void 0 ? void 0 : response.ok) || (result === null || result === void 0 ? void 0 : result.error) || (result === null || result === void 0 ? void 0 : result.status) >= 400) {
                    throw new Error((result === null || result === void 0 ? void 0 : result.error) || (0,i18n.t)('Surrounding logs query failed'));
                }
                const count = (result === null || result === void 0 ? void 0 : (_result_frames = result.frames) === null || _result_frames === void 0 ? void 0 : _result_frames.reduce((total, frame)=>{
                    var _frame_data_values_, _frame_data_values, _frame_data;
                    return total + (((_frame_data = frame.data) === null || _frame_data === void 0 ? void 0 : (_frame_data_values = _frame_data.values) === null || _frame_data_values === void 0 ? void 0 : (_frame_data_values_ = _frame_data_values[0]) === null || _frame_data_values_ === void 0 ? void 0 : _frame_data_values_.length) || 0);
                }, 0)) || 0;
                if (count >= Number(payload.pageSize)) {
                    break;
                }
            }
            return response;
        })());
}

// EXTERNAL MODULE: ./utils/utils.ts
var utils = __webpack_require__(2551);
;// ./components/surrounding-logs/column-action.tsx





/** Column selection is deliberately shared with the main Discover table. */ function SurroundingColumnAction({ fieldName }) {
    const [selectedFields, setSelectedFields] = (0,react/* useAtom */.fp)(discover/* selectedFieldsAtom */.Wg);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const selected = selectedFields.some((field)=>field.Field === fieldName);
    return /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "plus",
        tooltip: selected ? (0,i18n.t)('Remove From Table') : (0,i18n.t)('Add To Table'),
        onClick: (event)=>{
            event.stopPropagation();
            if (selected) {
                setSelectedFields((current)=>current.filter((field)=>field.Field !== fieldName));
                return;
            }
            const field = tableFields.find((item)=>item.Field === fieldName);
            if (field) {
                setSelectedFields((current)=>[
                        ...current,
                        field
                    ]);
            }
        }
    });
}

// EXTERNAL MODULE: ./utils/errors.ts
var errors = __webpack_require__(9071);
;// ./components/discover-content/variant-value-viewer.tsx





function isStructuredJsonValue(value) {
    return Array.isArray(value) || typeof value === 'object' && value !== null;
}
function getNodeSummary(value) {
    return Array.isArray(value) ? (0,i18n.t)('Array ({{count}})', {
        count: value.length
    }) : (0,i18n.t)('Object ({{count}})', {
        count: Object.keys(value).length
    });
}
function VariantTreeNode({ value, name, initiallyExpanded, initiallyExpandChildren, depth = 0 }) {
    const theme = (0,ui_.useTheme2)();
    const [expanded, setExpanded] = (0,external_react_.useState)(initiallyExpanded !== null && initiallyExpanded !== void 0 ? initiallyExpanded : false);
    const structured = isStructuredJsonValue(value);
    const textColor = theme.isDark ? '#9cdcfe' : 'hsla(223, 98%, 58%, 1)';
    const keyColor = theme.isDark ? 'rgb(123, 225, 136)' : 'hsla(134, 100%, 35%, 1)';
    if (!structured) {
        return /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`
                    padding-left: ${depth * 16}px;
                    line-height: 1.6;
                    font-family: monospace;
                    font-size: 12px;
                    word-break: break-word;
                `
        }, name !== undefined && /*#__PURE__*/ external_react_default().createElement("span", {
            style: {
                color: keyColor
            }
        }, name, ": "), /*#__PURE__*/ external_react_default().createElement("span", {
            style: {
                color: textColor
            }
        }, (0,utils_data/* formatFieldDisplayValue */.xW)(value, 'compact')));
    }
    const entries = Array.isArray(value) ? value.map((item, index)=>[
            String(index),
            item
        ]) : Object.entries(value);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                font-family: monospace;
                font-size: 12px;
                line-height: 1.6;
            `
    }, /*#__PURE__*/ external_react_default().createElement("button", {
        type: "button",
        "aria-expanded": expanded,
        onClick: ()=>setExpanded((current)=>!current),
        className: (0,css_.css)`
                    padding-left: ${depth * 16}px;
                    border: 0;
                    background: transparent;
                    color: inherit;
                    cursor: pointer;
                    font: inherit;
                    line-height: 1.6;
                `
    }, /*#__PURE__*/ external_react_default().createElement("span", {
        "aria-hidden": "true"
    }, expanded ? '▾' : '▸', " "), name !== undefined && /*#__PURE__*/ external_react_default().createElement("span", {
        style: {
            color: keyColor
        }
    }, name, ": "), /*#__PURE__*/ external_react_default().createElement("span", {
        style: {
            color: textColor
        }
    }, getNodeSummary(value))), expanded ? /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        margin-top: 6px;
                    `
    }, entries.map(([key, item])=>/*#__PURE__*/ external_react_default().createElement(VariantTreeNode, {
            key: key,
            name: key,
            value: item,
            initiallyExpanded: initiallyExpandChildren,
            initiallyExpandChildren: initiallyExpandChildren,
            depth: depth + 1
        }))) : null);
}
/** Displays parsed Doris VARIANT values without adding a second React runtime to Grafana. */ function VariantValueViewer({ value, className, rootName = 'VARIANT' }) {
    const theme = (0,ui_.useTheme2)();
    const [allExpanded, setAllExpanded] = (0,external_react_.useState)(false);
    const parsedValue = (0,external_react_.useMemo)(()=>(0,utils_data/* parseJsonLikeValue */.mt)(value), [
        value
    ]);
    if (!isStructuredJsonValue(parsedValue)) {
        return /*#__PURE__*/ external_react_default().createElement("span", {
            className: className
        }, (0,utils_data/* formatFieldDisplayValue */.xW)(parsedValue, 'compact'));
    }
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: className,
        "data-testid": "variant-value-viewer",
        style: {
            position: 'relative',
            minHeight: 40
        }
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    position: absolute;
                    top: 4px;
                    right: 12px;
                    z-index: 1;
                `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: allExpanded ? 'angle-double-up' : 'angle-double-down',
        size: "md",
        tooltip: allExpanded ? (0,i18n.t)('Collapse all') : (0,i18n.t)('Expand all'),
        "aria-label": allExpanded ? (0,i18n.t)('Collapse all {{field}} fields', {
            field: rootName
        }) : (0,i18n.t)('Expand all {{field}} fields', {
            field: rootName
        }),
        onClick: ()=>setAllExpanded((current)=>!current)
    })), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    width: 100%;
                    max-height: 320px;
                    overflow: auto;
                    word-break: break-word;
                    color: ${theme.isDark ? '#d4d4d4' : 'hsla(240, 5%, 26%, 1)'};
                    background: ${theme.isDark ? '#1e1e1e' : 'hsla(215, 100%, 95%, 0.2)'};
                    border-radius: 4px;
                    padding: 8px;
                    padding-right: 44px;
                `
    }, /*#__PURE__*/ external_react_default().createElement(VariantTreeNode, {
        key: allExpanded ? 'all-expanded' : 'root-expanded',
        name: rootName,
        value: parsedValue,
        initiallyExpanded: true,
        initiallyExpandChildren: allExpanded
    })));
}

;// ./components/long-text-cell/index.tsx




function LongTextCell({ children, copyText, className, maxLines }) {
    const theme = (0,ui_.useTheme2)();
    const contentRef = (0,external_react_.useRef)(null);
    const [isOverflowing, setIsOverflowing] = (0,external_react_.useState)(false);
    const [copyFailed, setCopyFailed] = (0,external_react_.useState)(false);
    const [previewOpen, setPreviewOpen] = (0,external_react_.useState)(false);
    // Wrapping can make a lengthy value fit without making it easy to copy.
    const canCopy = isOverflowing || copyText.length > 120;
    const updateOverflow = (0,external_react_.useCallback)(()=>{
        const element = contentRef.current;
        if (!element) {
            return;
        }
        setIsOverflowing((current)=>{
            const overflows = (node)=>node.scrollWidth > node.clientWidth || node.scrollHeight > node.clientHeight;
            // Selected fields can be ellipsized by a nested span while the
            // outer content container itself still fits.
            const next = overflows(element) || Array.from(element.querySelectorAll('*')).some(overflows);
            return current === next ? current : next;
        });
    }, []);
    (0,external_react_.useEffect)(()=>{
        setCopyFailed(false);
        setPreviewOpen(false);
    }, [
        copyText
    ]);
    (0,external_react_.useEffect)(()=>{
        if (!canCopy) {
            setPreviewOpen(false);
        }
    }, [
        canCopy
    ]);
    (0,external_react_.useEffect)(()=>{
        updateOverflow();
        const element = contentRef.current;
        if (!element || typeof ResizeObserver === 'undefined') {
            return;
        }
        const observer = new ResizeObserver(updateOverflow);
        observer.observe(element);
        return ()=>observer.disconnect();
    }, [
        updateOverflow,
        copyText,
        maxLines
    ]);
    const preview = /*#__PURE__*/ external_react_default().createElement("div", {
        role: "dialog",
        "aria-label": (0,i18n.t)('Full cell content'),
        className: (0,css_.css)`
                width: min(560px, calc(100vw - 64px));
                box-sizing: border-box;
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        tabIndex: 0,
        "aria-label": (0,i18n.t)('Cell value'),
        className: (0,css_.css)`
                    max-height: min(400px, 60vh);
                    overflow: auto;
                    white-space: pre-wrap;
                    overflow-wrap: anywhere;
                    word-break: break-word;
                `
    }, copyText), /*#__PURE__*/ external_react_default().createElement(ui_.ClipboardButton, {
        type: "button",
        "aria-label": (0,i18n.t)('Copy full cell content'),
        variant: "secondary",
        size: "sm",
        icon: "copy",
        getText: ()=>copyText,
        onClipboardCopy: ()=>setCopyFailed(false),
        onClipboardError: ()=>setCopyFailed(true),
        className: (0,css_.css)`
                    margin-top: 12px;
                `
    }, (0,i18n.t)('Copy full cell content')), copyFailed && /*#__PURE__*/ external_react_default().createElement("span", {
        role: "alert",
        style: {
            color: theme.colors.error.text
        }
    }, (0,i18n.t)('Copy failed')));
    return /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": "long-text-cell-container",
        onMouseEnter: updateOverflow,
        onFocusCapture: updateOverflow,
        className: (0,css_.css)`
                position: relative;
                min-width: 0;
                width: 100%;
                flex: 1 1 0;

                &:hover > .cell-copy-action,
                td:hover & > .cell-copy-action,
                &:focus-within > .cell-copy-action {
                    opacity: 1;
                    pointer-events: auto;
                }
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        ref: contentRef,
        className: (0,css_.cx)(className, maxLines !== undefined && (0,css_.css)`
                            display: ${maxLines > 0 ? '-webkit-box' : 'block'};
                            -webkit-box-orient: vertical;
                            ${maxLines > 0 ? `-webkit-line-clamp: ${maxLines};` : ''}
                            max-height: none;
                            overflow: ${maxLines > 0 ? 'hidden' : 'visible'};
                            white-space: pre-wrap;
                            overflow-wrap: anywhere;
                            word-break: break-word;
                            line-height: 20px;
                        `),
        "data-testid": "long-text-cell",
        onMouseEnter: updateOverflow
    }, children), canCopy && /*#__PURE__*/ external_react_default().createElement("div", {
        className: `cell-copy-action ${(0,css_.css)`
                        position: absolute;
                        top: 2px;
                        right: 2px;
                        z-index: 1;
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        opacity: 0;
                        pointer-events: none;
                        border-radius: ${theme.shape.radius.default};
                        background: ${theme.colors.background.primary};

                        @media (hover: none) {
                            opacity: 1;
                            pointer-events: auto;
                        }
                    `}`,
        onPointerDown: (event)=>event.stopPropagation(),
        onClick: (event)=>event.stopPropagation(),
        onDoubleClick: (event)=>event.stopPropagation()
    }, copyFailed && !previewOpen && /*#__PURE__*/ external_react_default().createElement("span", {
        role: "alert",
        style: {
            color: theme.colors.error.text,
            padding: '0 4px',
            fontSize: theme.typography.bodySmall.fontSize
        }
    }, (0,i18n.t)('Copy failed')), /*#__PURE__*/ external_react_default().createElement(ui_.Toggletip, {
        title: (0,i18n.t)('Full content'),
        content: preview,
        placement: "bottom-start",
        show: previewOpen,
        onOpen: ()=>setPreviewOpen(true),
        onClose: ()=>setPreviewOpen(false),
        fitContent: true
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        type: "button",
        "aria-label": (0,i18n.t)('View full cell content'),
        "aria-expanded": previewOpen,
        "aria-haspopup": "dialog",
        title: (0,i18n.t)('View full cell content'),
        variant: "secondary",
        size: "sm",
        icon: "eye"
    })), /*#__PURE__*/ external_react_default().createElement(ui_.ClipboardButton, {
        type: "button",
        "aria-label": (0,i18n.t)('Copy full cell content'),
        title: (0,i18n.t)('Copy full cell content'),
        variant: "secondary",
        size: "sm",
        icon: "copy",
        getText: ()=>copyText,
        onClipboardCopy: ()=>setCopyFailed(false),
        onClipboardError: ()=>setCopyFailed(true)
    })));
}

;// ./components/surrounding-logs/index.tsx
'use client';
function surrounding_logs_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function surrounding_logs_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                surrounding_logs_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                surrounding_logs_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function surrounding_logs_define_property(obj, key, value) {
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
function surrounding_logs_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            surrounding_logs_define_property(target, key, source[key]);
        });
    }
    return target;
}
function surrounding_logs_ownKeys(object, enumerableOnly) {
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
function surrounding_logs_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        surrounding_logs_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}











// import dayjs from 'dayjs';











function SurroundingLogs() {
    const theme = (0,ui_.useTheme2)();
    const timeZone = (0,react/* useAtomValue */.md)(discover/* timeZoneAtom */.tF);
    const selectedRow = (0,react/* useAtomValue */.md)(discover/* selectedRowAtom */.nn);
    const selectdbDS = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const currentTimeField = (0,react/* useAtomValue */.md)(discover/* currentTimeFieldAtom */.CA);
    const [selectedFields, setSelectedFields] = (0,react/* useAtom */.fp)(discover/* selectedFieldsAtom */.Wg);
    const dataFilter = (0,react/* useAtomValue */.md)(discover/* dataFilterAtom */.EA);
    const [filterEnabled, setFilterEnabled] = (0,external_react_.useState)(false);
    const hasSelectedFields = selectedFields.length > 0;
    const [fields, setFields] = (0,external_react_.useState)([]);
    const currentCluster = (0,react/* useAtomValue */.md)(discover/* currentClusterAtom */.bP);
    const currentTable = (0,react/* useAtomValue */.md)(discover/* currentTableAtom */.$w);
    const currentCatalog = (0,react/* useAtomValue */.md)(discover/* currentCatalogAtom */.K0);
    const currentDatabase = (0,react/* useAtomValue */.md)(discover/* currentDatabaseAtom */.Cf);
    const [surroundingTableData, setSurroundingTableData] = (0,react/* useAtom */.fp)(discover/* surroundingTableDataAtom */.mj);
    const [beforeCount, setBeforeCount] = (0,react/* useAtom */.fp)(discover/* beforeCountAtom */.cn);
    const [afterCount, setAfterCount] = (0,react/* useAtom */.fp)(discover/* afterCountAtom */.f5);
    const [beforeTimeFieldPageSize, setBeforeTimeFieldPageSize] = (0,react/* useAtom */.fp)(discover/* beforeTimeFieldPageSizeAtom */.qX);
    const [afterTimeFieldPageSize, setAfterTimeFieldPageSize] = (0,react/* useAtom */.fp)(discover/* afterTimeFieldPageSizeAtom */.NJ);
    const [beforeTime, setBeforeTime] = (0,react/* useAtom */.fp)(discover/* beforeTimeAtom */.uz);
    const [afterTime, setAfterTime] = (0,react/* useAtom */.fp)(discover/* afterTimeAtom */.ps);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const contextKey = JSON.stringify([
        selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.uid,
        currentDatabase,
        currentTable,
        currentTimeField,
        selectedRow._uid,
        selectedRow.time,
        filterEnabled,
        filterEnabled ? dataFilter : []
    ]);
    const contextRef = (0,external_react_.useRef)(contextKey);
    contextRef.current = contextKey;
    const requestSurrounding = (params)=>(0,external_rxjs_.lastValueFrom)(getSurroundingDataWithWindow(surrounding_logs_object_spread({
            selectdbDS
        }, params))).then((response)=>surrounding_logs_object_spread_props(surrounding_logs_object_spread({}, response), {
                surroundingContext: contextKey
            }));
    const [state, updateState] = (0,external_react_.useState)([
        {
            label: (0,i18n.t)('Table'),
            value: 'Table',
            active: true
        },
        {
            label: 'JSON',
            value: 'JSON',
            active: false
        }
    ]);
    function handleRemove(field) {
        setSelectedFields((current)=>current.filter((item)=>item.Field !== field.Field));
    }
    const { loading: getAfterSurroundingDataLoading, run: getAfterSurroundingData } = (0,useRequest/* default */.A)(({ pageSize = afterTimeFieldPageSize, time = afterTime })=>{
        const params = getQueryParams({
            pageSize,
            operator: '>',
            time
        });
        return requestSurrounding(params);
    }, {
        manual: true,
        onSuccess: (res)=>surrounding_logs_async_to_generator(function*() {
                if (res.surroundingContext !== contextRef.current) {
                    return;
                }
                if (res.ok) {
                    const rowsData = (0,utils_data/* convertColumnToRowViaFieldsType */.ml)(res.data.results.getSurroundingData.frames[0], tableFields);
                    const result = generateSurroundingResult(rowsData, currentTimeField);
                    setAfterCount((previous)=>previous + result.length);
                    if (result.length) {
                        setAfterTime(result[result.length - 1]._original[currentTimeField]);
                    }
                    setSurroundingTableData((previous)=>[
                            ...previous,
                            ...result
                        ]);
                // setTimeout(() => {
                //     scrollToSelectedRow();
                // }, 50);
                }
            })()
    });
    function getQueryParams({ pageSize = 5, operator = '>', time = selectedRow.time }) {
        const params = {
            catalog: currentCatalog,
            database: currentDatabase,
            table: currentTable,
            timeField: currentTimeField,
            time,
            data_filters: [],
            pageSize,
            operator,
            cluster: currentCluster,
            theme: theme.isDark ? 'dark' : 'light'
        };
        if (filterEnabled && dataFilter.length > 0) {
            params.data_filters = dataFilter;
        }
        return params;
    }
    const { loading: getBeforeSurroundingDataLoading, run: getBeforeSurroundingData } = (0,useRequest/* default */.A)(({ pageSize = beforeTimeFieldPageSize, time = selectedRow.time })=>{
        const params = getQueryParams({
            pageSize,
            operator: '<',
            time
        });
        return requestSurrounding(params);
    }, {
        manual: true,
        onSuccess: (res)=>surrounding_logs_async_to_generator(function*() {
                if (res.surroundingContext !== contextRef.current) {
                    return;
                }
                if (res.ok) {
                    const rowsData = (0,utils_data/* convertColumnToRowViaFieldsType */.ml)(res.data.results.getSurroundingData.frames[0], tableFields);
                    const result = generateSurroundingResult(rowsData, currentTimeField);
                    setBeforeCount((previous)=>previous + result.length);
                    if (result.length) {
                        setBeforeTime(result[0]._original[currentTimeField]);
                    }
                    setSurroundingTableData((previous)=>[
                            ...result,
                            ...previous
                        ]);
                // setTimeout(() => {
                //     scrollToSelectedRow();
                // }, 50);
                }
            })()
    });
    function scrollToSelectedRow() {
        const selectedElement = document.getElementById('selected');
        if (selectedElement) {
            selectedElement.scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            });
        }
    }
    const { loading: initLoading } = (0,useRequest/* default */.A)(()=>{
        const prevTimeParams = getQueryParams({
            operator: '<'
        });
        const afterTimeParams = getQueryParams({
            operator: '>',
            pageSize: 5
        });
        return Promise.all([
            requestSurrounding(prevTimeParams),
            requestSurrounding(afterTimeParams)
        ]);
    }, {
        refreshDeps: [
            contextKey
        ],
        onSuccess: (res)=>surrounding_logs_async_to_generator(function*() {
                if (res.some((item)=>item.surroundingContext !== contextRef.current)) {
                    return;
                }
                if (res[0].ok && res[1].ok) {
                    const rowsData1 = (0,utils_data/* convertColumnToRowViaFieldsType */.ml)(res[0].data.results.getSurroundingData.frames[0], tableFields);
                    const rowsData2 = (0,utils_data/* convertColumnToRowViaFieldsType */.ml)(res[1].data.results.getSurroundingData.frames[0], tableFields);
                    const result1 = generateSurroundingResult(rowsData1, currentTimeField);
                    const result2 = generateSurroundingResult(rowsData2, currentTimeField);
                    const selectedResult = generateSurroundingResult([
                        selectedRow._original
                    ], currentTimeField);
                    const data = [
                        ...result1,
                        ...selectedResult,
                        ...result2
                    ];
                    const rowsDataWithUID = yield (0,utils/* generateTableDataUID */.sd)(data);
                    if (res.some((item)=>item.surroundingContext !== contextRef.current)) {
                        return;
                    }
                    setBeforeCount(result1.length);
                    setAfterCount(result2.length);
                    if (result1.length > 0) {
                        setBeforeCount(result1.length);
                        setBeforeTime(result1[0]._original[currentTimeField]);
                    } else {
                        setBeforeTime(selectedRow.time);
                    }
                    if (result2.length > 0) {
                        setAfterCount(result2.length);
                        setAfterTime(result2[result2.length - 1]._original[currentTimeField]);
                    } else {
                        setAfterTime(selectedRow.time);
                    }
                    setSurroundingTableData(rowsDataWithUID);
                    setTimeout(()=>{
                        scrollToSelectedRow();
                    }, 50);
                } else {
                // toast.error(res[1].message);
                }
            })(),
        onError: (err)=>{
            (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                source: 'SurroundingLogs',
                action: 'initSurroundingData'
            });
        }
    });
    (0,external_react_.useEffect)(()=>{
        const data = surroundingTableData.map((item)=>{
            var _item__original;
            return {
                _original: item._original,
                time: ((_item__original = item._original) === null || _item__original === void 0 ? void 0 : _item__original[currentTimeField]) || '',
                _source: (0,utils_data/* generateHighlightedResults */.F9)({
                    search_value: '',
                    indexes: []
                }, [
                    (0,utils_data/* formatRecordTimes */.d$)(item._original, tableFields, timeZone)
                ])[0]._source,
                _uid: item._uid,
                selected: item._uid === selectedRow._uid
            };
        });
        setFields(data);
    }, [
        surroundingTableData,
        currentTimeField,
        selectedRow._uid,
        tableFields,
        timeZone
    ]);
    const renderBeforeLoadingBar = ()=>{
        if (initLoading || getBeforeSurroundingDataLoading) {
            return /*#__PURE__*/ external_react_default().createElement("div", {
                className: (0,css_.css)`
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                    `
            }, /*#__PURE__*/ external_react_default().createElement(ui_.LoadingBar, {
                width: 100
            }));
        }
        return null;
    };
    const renderAfterLoadingBar = ()=>{
        if (initLoading || getAfterSurroundingDataLoading) {
            return /*#__PURE__*/ external_react_default().createElement("div", {
                className: (0,css_.css)`
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                    `
            }, /*#__PURE__*/ external_react_default().createElement(ui_.LoadingBar, {
                width: 100
            }));
        }
        return null;
    };
    const renderSubComponent = ({ row })=>{
        const processedData = (0,utils_data/* parseJsonLikeValue */.mt)(row.original._original);
        const subTableData = Object.keys(processedData).map((key)=>{
            return {
                field: key,
                value: row.original._original[key]
            };
        });
        return /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`
                    position: relative;
                `
        }, /*#__PURE__*/ external_react_default().createElement(ui_.TabsBar, {
            className: (0,css_.css)`
                        ${theme.isDark ? 'background-color: hsl(var(--n9) / 0.4);' : 'background-color: hsl(var(--b1) / 0.6);'}
                    `
        }, state.map((tab, index)=>{
            return /*#__PURE__*/ external_react_default().createElement(ui_.Tab, {
                key: index,
                label: tab.label,
                active: tab.active,
                onChangeTab: ()=>updateState(state.map((tab, idx)=>surrounding_logs_object_spread_props(surrounding_logs_object_spread({}, tab), {
                            active: idx === index
                        }))),
                counter: subTableData.length
            });
        })), /*#__PURE__*/ external_react_default().createElement(ui_.TabContent, null, state[0].active && /*#__PURE__*/ external_react_default().createElement("table", {
            className: "bg-b1/20 pl-4 backdrop-blur-md dark:bg-n9/60"
        }, /*#__PURE__*/ external_react_default().createElement("tbody", null, subTableData.map((item)=>{
            var _tableFields_find;
            const fieldName = item.field;
            const fieldType = (_tableFields_find = tableFields.find((field)=>field.Field === fieldName)) === null || _tableFields_find === void 0 ? void 0 : _tableFields_find.Type;
            const fieldValue = (0,utils_data/* isValidTimeFieldType */.Q3)(String(fieldType || '').toUpperCase()) && item.value != null ? (0,utils_data/* formatTimestampToDateTime */.My)(item.value, 3, timeZone) : (0,utils_data/* formatFieldDisplayValue */.xW)(item.value, 'compact');
            const tableRowStyle = (0,css_.css)`
                                        &:hover {
                                            .filter-table-content {
                                                visibility: visible;
                                            }
                                        }
                                    `;
            return /*#__PURE__*/ external_react_default().createElement("tr", {
                className: `${tableRowStyle}`,
                key: fieldName
            }, /*#__PURE__*/ external_react_default().createElement("td", {
                className: (0,css_.css)`
                                                    height: 32px;
                                                    width: 70px;
                                                `
            }, /*#__PURE__*/ external_react_default().createElement("div", {
                className: `filter-table-content ${(0,css_.css)`
                                                        visibility: hidden;
                                                    `}`
            }, /*#__PURE__*/ external_react_default().createElement(SurroundingColumnAction, {
                fieldName: fieldName
            }))), /*#__PURE__*/ external_react_default().createElement("td", {
                className: "h-8 text-xs"
            }, fieldName || '-'), /*#__PURE__*/ external_react_default().createElement("td", {
                className: "h-8 whitespace-normal text-xs"
            }, /*#__PURE__*/ external_react_default().createElement("div", {
                className: "w-full break-all"
            }, (0,utils_data/* isStructuredJsonType */.Ml)(fieldType) ? /*#__PURE__*/ external_react_default().createElement(VariantValueViewer, {
                value: item.value
            }) : fieldValue)));
        }))), state[1].active && /*#__PURE__*/ external_react_default().createElement(VariantValueViewer, {
            value: processedData,
            rootName: "JSON"
        })));
    };
    function generateSurroundingResult(result, timeField) {
        const sortedResult = (0,sortBy/* default */.A)(result, timeField);
        const _sourceResult = sortedResult.map((item)=>{
            let itemSource = '';
            for(const key in item){
                const highlightValue = (0,utils_data/* formatFieldDisplayValue */.xW)(item[key], 'compact');
                itemSource += `<span style="background-color: ${theme.isDark ? '#3F3F4F' : '#BED8FD'} ; padding: 0px 4px 2px; margin-right: 4px; border-radius: 4px;">${(0,utils_data/* escapeHtml */.ZD)(key)}:</span>${(0,utils_data/* escapeHtml */.ZD)(highlightValue)} `;
            }
            return {
                _original: item,
                _source: itemSource
            };
        });
        return _sourceResult;
    }
    const columns = (0,external_react_.useMemo)(()=>{
        let dynamicColumns = [
            {
                id: '__expand',
                accessorKey: 'collapse',
                header: ``,
                size: 48,
                minSize: 48,
                maxSize: 48,
                enableResizing: false,
                enableSorting: false,
                cell: ({ row, getValue })=>{
                    return row.getCanExpand() && /*#__PURE__*/ external_react_default().createElement("div", null, row.getIsExpanded() ? /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
                        onClick: row.getToggleExpandedHandler(),
                        name: "arrow-down",
                        tooltip: (0,i18n.t)('Collapse')
                    }) : /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
                        onClick: row.getToggleExpandedHandler(),
                        name: "arrow-right",
                        tooltip: (0,i18n.t)('Expand')
                    }), /*#__PURE__*/ external_react_default().createElement("div", {
                        className: "ml-1"
                    }, getValue()));
                }
            },
            {
                id: '__time',
                header: ()=>(0,i18n.t)('Time'),
                accessorKey: 'time',
                size: 240,
                minSize: 80,
                maxSize: 800,
                cell: ({ row, getValue })=>{
                    const fieldValue = getValue();
                    const fieldName = currentTimeField;
                    const timeField = (0,utils_data/* formatTimestampToDateTime */.My)(fieldValue, 3, timeZone);
                    return /*#__PURE__*/ external_react_default().createElement("div", {
                        className: `${(0,css_.css)`
                                width: 230px;
                            `} ${HoverStyle}`
                    }, /*#__PURE__*/ external_react_default().createElement("div", {
                        className: (0,css_.css)`
                                    display: flex;
                                    align-items: center;
                                `
                    }, timeField, /*#__PURE__*/ external_react_default().createElement("div", {
                        className: `filter-content ${(0,css_.css)`
                                        visibility: hidden;
                                    `}`
                    }, /*#__PURE__*/ external_react_default().createElement(SurroundingColumnAction, {
                        fieldName: fieldName
                    }))));
                }
            }
        ];
        if (!hasSelectedFields) {
            dynamicColumns.push({
                id: '__source',
                accessorKey: '_source',
                header: '_source',
                size: 640,
                minSize: 80,
                maxSize: 800,
                enableSorting: false,
                cell: ({ row, getValue })=>{
                    function createMarkup() {
                        return {
                            __html: getValue()
                        };
                    }
                    return /*#__PURE__*/ external_react_default().createElement(LongTextCell, {
                        copyText: (0,utils_data/* formatRecordDisplayValue */.YN)(row.original._original),
                        className: (0,css_.css)`
                                display: block;
                                width: 100%;
                                max-height: 12rem;
                                overflow: auto;
                                word-break: break-all;
                                white-space: pre-wrap;
                                padding-top: 0.5rem;
                                padding-bottom: 0.5rem;
                                font-size: 0.875rem;
                                line-height: 1.25rem;
                            `
                    }, /*#__PURE__*/ external_react_default().createElement(ColumnStyleWrapper, {
                        className: (0,css_.css)`
                                    .field-key {
                                        background-color: ${theme.isDark ? '#3f3f4f' : 'rgb(191, 217, 253)'};
                                    }
                                `
                    }, /*#__PURE__*/ external_react_default().createElement("div", {
                        dangerouslySetInnerHTML: createMarkup(),
                        className: (0,css_.css)`
                                        display: block;
                                        width: 100%;
                                    `
                    })));
                }
            });
        } else {
            dynamicColumns = [
                ...dynamicColumns,
                ...selectedFields.map((field)=>{
                    return {
                        id: `field:${field.Field}`,
                        accessorFn: (row)=>getVariantFieldValue(row._original, field),
                        size: 240,
                        minSize: 80,
                        maxSize: 800,
                        header: ()=>/*#__PURE__*/ external_react_default().createElement("div", {
                                className: (0,css_.css)`
                                    display: flex;
                                    align-items: center;
                                `
                            }, /*#__PURE__*/ external_react_default().createElement("div", null, field.Field), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
                                name: "times",
                                tooltip: (0,i18n.t)('Remove'),
                                style: {
                                    marginLeft: '8px',
                                    cursor: 'pointer',
                                    marginTop: '2px'
                                },
                                onClick: (e)=>{
                                    handleRemove(field);
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            })),
                        cell: ({ row })=>{
                            const rawFieldValue = getVariantFieldValue(row.original._original, field);
                            const fieldValue = (0,utils_data/* isValidTimeFieldType */.Q3)(String(field.Type || '').toUpperCase()) && rawFieldValue != null ? (0,utils_data/* formatTimestampToDateTime */.My)(rawFieldValue, 3, timeZone) : (0,utils_data/* formatFieldDisplayValue */.xW)(rawFieldValue, 'compact');
                            const fieldName = field.Field;
                            const fieldType = field.Type;
                            return /*#__PURE__*/ external_react_default().createElement("div", {
                                className: `${HoverStyle} ${(0,css_.css)`
                                        display: flex;
                                        align-items: center;
                                        min-height: 48px;
                                    `}`
                            }, (0,utils_data/* isStructuredJsonType */.Ml)(fieldType) ? /*#__PURE__*/ external_react_default().createElement(VariantValueViewer, {
                                value: rawFieldValue
                            }) : field.value === 'trace_id' && fieldValue ? /*#__PURE__*/ external_react_default().createElement(ui_.Button, null, fieldValue) : /*#__PURE__*/ external_react_default().createElement(LongTextCell, {
                                copyText: fieldValue,
                                className: "max-h-48 overflow-auto"
                            }, /*#__PURE__*/ external_react_default().createElement("div", {
                                className: "flex items-center break-all py-4"
                            }, /*#__PURE__*/ external_react_default().createElement("span", {
                                className: "text-xs"
                            }, fieldValue))), fieldValue ? /*#__PURE__*/ external_react_default().createElement("div", {
                                className: `filter-content ${(0,css_.css)`
                                            visibility: hidden;
                                        `}`
                            }, /*#__PURE__*/ external_react_default().createElement(SurroundingColumnAction, {
                                fieldName: fieldName
                            })) : null);
                        }
                    };
                })
            ];
        }
        return dynamicColumns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        timeZone,
        currentTimeField,
        handleRemove,
        hasSelectedFields,
        selectedFields
    ]);
    return /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement(SurroundingDiscoverFilter, {
        enabled: filterEnabled,
        onEnabledChange: setFilterEnabled
    }), /*#__PURE__*/ external_react_default().createElement("div", {
        className: "h-[2px] bg-b1 dark:bg-black"
    }), /*#__PURE__*/ external_react_default().createElement("div", {
        style: {
            position: 'relative'
        }
    }, /*#__PURE__*/ external_react_default().createElement(SurroundingLogsActions, {
        getSurroundingData: getBeforeSurroundingData,
        getSurroundingDataLoading: getBeforeSurroundingDataLoading,
        time: beforeTime,
        type: "before",
        timeFieldPageSize: beforeTimeFieldPageSize,
        setTimeFieldPageSize: setBeforeTimeFieldPageSize,
        tips: (0,i18n.t)('Old records'),
        count: beforeCount
    }), renderBeforeLoadingBar()), /*#__PURE__*/ external_react_default().createElement("div", {
        style: {
            height: 'calc(100vh - 220px)',
            overflow: 'auto',
            position: 'relative'
        }
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: "mx-6 border"
    }, /*#__PURE__*/ external_react_default().createElement(SDCollapsibleTable, {
        data: fields,
        columns: columns,
        getRowCanExpand: ()=>true,
        renderSubComponent: renderSubComponent
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        style: {
            position: 'relative'
        }
    }, renderAfterLoadingBar(), /*#__PURE__*/ external_react_default().createElement(SurroundingLogsActions, {
        getSurroundingData: getAfterSurroundingData,
        getSurroundingDataLoading: getAfterSurroundingDataLoading,
        time: afterTime,
        type: "after",
        timeFieldPageSize: afterTimeFieldPageSize,
        setTimeFieldPageSize: setAfterTimeFieldPageSize,
        tips: (0,i18n.t)('New records'),
        count: afterCount
    })));
}

// EXTERNAL MODULE: ./components/trace-detail/index.tsx + 1 modules
var trace_detail = __webpack_require__(879);
// EXTERNAL MODULE: external "@grafana/data"
var data_ = __webpack_require__(7781);
// EXTERNAL MODULE: ./types/plugin-settings.ts
var plugin_settings = __webpack_require__(325);
;// ./utils/column-layout.ts
const EXPAND_COLUMN_ID = '__expand';
function reconcileColumnOrder(availableColumnIds, persistedColumnOrder = []) {
    const available = new Set(availableColumnIds);
    const reconciled = persistedColumnOrder.filter((id)=>available.has(id) && id !== EXPAND_COLUMN_ID);
    for (const id of availableColumnIds){
        if (id !== EXPAND_COLUMN_ID && !reconciled.includes(id)) {
            reconciled.push(id);
        }
    }
    return available.has(EXPAND_COLUMN_ID) ? [
        EXPAND_COLUMN_ID,
        ...reconciled
    ] : reconciled;
}
function reconcileColumnSizing(availableColumnIds, persistedColumnSizing = {}) {
    const available = new Set(availableColumnIds);
    return Object.fromEntries(Object.entries(persistedColumnSizing).filter(([id])=>available.has(id) && id !== EXPAND_COLUMN_ID).map(([id, size])=>[
            id,
            Math.min(800, Math.max(80, size))
        ]));
}

;// ./hooks/useDiscoverColumnLayout.ts
function useDiscoverColumnLayout_define_property(obj, key, value) {
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
function useDiscoverColumnLayout_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            useDiscoverColumnLayout_define_property(target, key, source[key]);
        });
    }
    return target;
}
function useDiscoverColumnLayout_ownKeys(object, enumerableOnly) {
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
function useDiscoverColumnLayout_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        useDiscoverColumnLayout_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function useDiscoverColumnLayout_object_without_properties(source, excluded) {
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
    target = useDiscoverColumnLayout_object_without_properties_loose(source, excluded);
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
function useDiscoverColumnLayout_object_without_properties_loose(source, excluded) {
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
function _to_primitive(input, hint) {
    if (_type_of(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_type_of(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function _to_property_key(arg) {
    var key = _to_primitive(arg, "string");
    return _type_of(key) === "symbol" ? key : String(key);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}




function useDiscoverColumnLayout(layoutKey, availableColumnIds, defaultColumnSizing) {
    const [columnLayouts, setColumnLayouts] = (0,react/* useAtom */.fp)(discover/* discoverColumnLayoutsAtom */.IQ);
    const [sharedColumnOrder, setSharedColumnOrder] = (0,react/* useAtom */.fp)(discover/* discoverSharedColumnOrderAtom */.G9);
    const savedLayout = layoutKey ? columnLayouts[layoutKey] : undefined;
    const columnOrder = (0,external_react_.useMemo)(()=>reconcileColumnOrder(availableColumnIds, sharedColumnOrder.length ? sharedColumnOrder : savedLayout === null || savedLayout === void 0 ? void 0 : savedLayout.columnOrder), [
        availableColumnIds,
        savedLayout === null || savedLayout === void 0 ? void 0 : savedLayout.columnOrder,
        sharedColumnOrder
    ]);
    const columnSizing = (0,external_react_.useMemo)(()=>useDiscoverColumnLayout_object_spread({}, defaultColumnSizing, reconcileColumnSizing(availableColumnIds, savedLayout === null || savedLayout === void 0 ? void 0 : savedLayout.columnSizing)), [
        availableColumnIds,
        defaultColumnSizing,
        savedLayout === null || savedLayout === void 0 ? void 0 : savedLayout.columnSizing
    ]);
    // Persist only user changes. Restoring a link or changing tables must never
    // write the previous table's layout over the newly selected table's settings.
    const onColumnSizingChange = (0,external_react_.useCallback)((updater)=>{
        if (!layoutKey) {
            return;
        }
        setColumnLayouts((previous)=>{
            const current = previous[layoutKey];
            const currentSizing = useDiscoverColumnLayout_object_spread({}, defaultColumnSizing, reconcileColumnSizing(availableColumnIds, current === null || current === void 0 ? void 0 : current.columnSizing));
            const nextSizing = typeof updater === 'function' ? updater(currentSizing) : updater;
            // Keep hidden fields' widths, but let resetSize remove a visible field's override.
            const inactiveSizing = Object.fromEntries(Object.entries((current === null || current === void 0 ? void 0 : current.columnSizing) || {}).filter(([id])=>!availableColumnIds.includes(id)));
            return useDiscoverColumnLayout_object_spread_props(useDiscoverColumnLayout_object_spread({}, previous), {
                [layoutKey]: {
                    columnOrder: (current === null || current === void 0 ? void 0 : current.columnOrder) || columnOrder,
                    columnSizing: useDiscoverColumnLayout_object_spread({}, inactiveSizing, nextSizing)
                }
            });
        });
    }, [
        availableColumnIds,
        columnOrder,
        defaultColumnSizing,
        layoutKey,
        setColumnLayouts
    ]);
    const onColumnOrderChange = (0,external_react_.useCallback)((updater)=>{
        const nextOrder = typeof updater === 'function' ? updater(columnOrder) : updater;
        setSharedColumnOrder(nextOrder);
        if (layoutKey) {
            setColumnLayouts((previous)=>{
                var _previous_layoutKey, _previous_layoutKey1;
                return useDiscoverColumnLayout_object_spread_props(useDiscoverColumnLayout_object_spread({}, previous), {
                    [layoutKey]: {
                        columnOrder: [
                            ...nextOrder,
                            ...(((_previous_layoutKey = previous[layoutKey]) === null || _previous_layoutKey === void 0 ? void 0 : _previous_layoutKey.columnOrder) || []).filter((id)=>!nextOrder.includes(id))
                        ],
                        columnSizing: ((_previous_layoutKey1 = previous[layoutKey]) === null || _previous_layoutKey1 === void 0 ? void 0 : _previous_layoutKey1.columnSizing) || {}
                    }
                });
            });
        }
    }, [
        columnOrder,
        layoutKey,
        setColumnLayouts,
        setSharedColumnOrder
    ]);
    const resetColumnLayout = (0,external_react_.useCallback)(()=>{
        setSharedColumnOrder([]);
        if (layoutKey) {
            setColumnLayouts((previous)=>{
                const { [layoutKey]: _removed } = previous, remaining = useDiscoverColumnLayout_object_without_properties(previous, [
                    _to_property_key(layoutKey)
                ]);
                return remaining;
            });
        }
    }, [
        layoutKey,
        setColumnLayouts,
        setSharedColumnOrder
    ]);
    return {
        columnOrder,
        columnSizing,
        onColumnOrderChange,
        onColumnSizingChange,
        resetColumnLayout
    };
}

;// ./components/discover-content/index.tsx
'use client';
function discover_content_define_property(obj, key, value) {
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
function discover_content_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            discover_content_define_property(target, key, source[key]);
        });
    }
    return target;
}
function discover_content_ownKeys(object, enumerableOnly) {
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
function discover_content_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        discover_content_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function discover_content_object_without_properties(source, excluded) {
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
    target = discover_content_object_without_properties_loose(source, excluded);
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
function discover_content_object_without_properties_loose(source, excluded) {
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





















const discover_content_EXPAND_COLUMN_ID = '__expand';
const TIME_COLUMN_ID = '__time';
const SOURCE_COLUMN_ID = '__source';
const FIELD_COLUMN_PREFIX = 'field:';
const getFieldColumnId = (fieldName)=>`${FIELD_COLUMN_PREFIX}${fieldName}`;
function DiscoverContent({ fetchNextPage, getTraceData, queryState, sort, onSortChange }) {
    const theme = (0,ui_.useTheme2)();
    const timeZone = (0,react/* useAtomValue */.md)(discover/* timeZoneAtom */.tF);
    const [fields, setFields] = (0,external_react_.useState)([]);
    const tableTotalCount = normalizeCount((0,react/* useAtomValue */.md)(discover/* tableTotalCountAtom */.HC));
    const [tableData, _setTableData] = (0,react/* useAtom */.fp)(discover/* tableDataAtom */.q3);
    const [selectedFields, setSelectedFields] = (0,react/* useAtom */.fp)(discover/* selectedFieldsAtom */.Wg);
    const hasSelectedFields = selectedFields.length > 0;
    const currentTimeField = (0,react/* useAtomValue */.md)(discover/* currentTimeFieldAtom */.CA);
    // const [surroundingOpen, setSurroundingOpen] = useState(false);
    const [selectedRow, setSelectedRow] = (0,react/* useAtom */.fp)(discover/* selectedRowAtom */.nn);
    const setSurroundingTableData = (0,react/* useSetAtom */.Xr)(discover/* surroundingTableDataAtom */.mj);
    const setBeforeCount = (0,react/* useSetAtom */.Xr)(discover/* beforeCountAtom */.cn);
    const setAfterCount = (0,react/* useSetAtom */.Xr)(discover/* afterCountAtom */.f5);
    const [pageSize, setPageSize] = (0,react/* useAtom */.fp)(discover/* pageSizeAtom */.Ol);
    const [page, setPage] = (0,react/* useAtom */.fp)(discover/* pageAtom */.fs);
    const [drawerOpen, setDrawerOpen] = (0,external_react_.useState)(false);
    const [surroundingLogsOpen, setSurroundingLogsOpen] = (0,external_react_.useState)(false);
    const [_fieldKeyBg, setFieldKeyBg] = (0,external_react_.useState)('#3f3f4f');
    const discoverCurrent = (0,react/* useAtomValue */.md)(discover/* discoverCurrentAtom */.WN);
    const currentDatasource = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const [discoverRowsExpanded, setDiscoverRowsExpanded] = (0,react/* useAtom */.fp)(discover/* discoverRowsExpandedAtom */.Ps);
    const [discoverRowsWrapped, setDiscoverRowsWrapped] = (0,react/* useAtom */.fp)(discover/* discoverRowsWrappedAtom */.h2);
    const [rowLineCount, setRowLineCount] = (0,react/* useAtom */.fp)(discover/* discoverRowLineCountAtom */.aB);
    const cellLineCount = discoverRowsWrapped ? rowLineCount : 1;
    const availableColumnIds = (0,external_react_.useMemo)(()=>[
            discover_content_EXPAND_COLUMN_ID,
            TIME_COLUMN_ID,
            ...hasSelectedFields ? selectedFields.map((field)=>getFieldColumnId(field.Field)) : [
                SOURCE_COLUMN_ID
            ]
        ], [
        hasSelectedFields,
        selectedFields
    ]);
    const defaultColumnSizing = (0,external_react_.useMemo)(()=>discover_content_object_spread({
            [TIME_COLUMN_ID]: 240,
            [SOURCE_COLUMN_ID]: 640
        }, Object.fromEntries(selectedFields.map((field)=>[
                getFieldColumnId(field.Field),
                240
            ]))), [
        selectedFields
    ]);
    const layoutKey = (0,external_react_.useMemo)(()=>{
        const datasourceId = (currentDatasource === null || currentDatasource === void 0 ? void 0 : currentDatasource.uid) || (currentDatasource === null || currentDatasource === void 0 ? void 0 : currentDatasource.id) || (currentDatasource === null || currentDatasource === void 0 ? void 0 : currentDatasource.name);
        if (!datasourceId || !discoverCurrent.database || !discoverCurrent.table) {
            return '';
        }
        return JSON.stringify([
            datasourceId,
            discoverCurrent.catalog || 'internal',
            discoverCurrent.database,
            discoverCurrent.table
        ]);
    }, [
        currentDatasource === null || currentDatasource === void 0 ? void 0 : currentDatasource.id,
        currentDatasource === null || currentDatasource === void 0 ? void 0 : currentDatasource.name,
        currentDatasource === null || currentDatasource === void 0 ? void 0 : currentDatasource.uid,
        discoverCurrent.catalog,
        discoverCurrent.database,
        discoverCurrent.table
    ]);
    const { columnOrder, columnSizing, onColumnOrderChange, onColumnSizingChange, resetColumnLayout } = useDiscoverColumnLayout(layoutKey, availableColumnIds, defaultColumnSizing);
    const context = (0,data_.usePluginContext)();
    // user settings
    const jsonData = context.meta.jsonData || {};
    const logsConfig = (0,plugin_settings/* mergeLogsConfig */.oW)(jsonData.logsConfig);
    const { database = '', datasource, logsTable = '', targetTraceTable = '' } = logsConfig;
    // local input state for page-jump control
    const [jumpPage, setJumpPage] = (0,external_react_.useState)(String(page));
    (0,external_react_.useEffect)(()=>{
        setJumpPage(String(page));
    }, [
        page
    ]);
    const configuredDatasourceUid = typeof datasource === 'string' ? datasource : (datasource === null || datasource === void 0 ? void 0 : datasource.uid) || (datasource === null || datasource === void 0 ? void 0 : datasource.id);
    const currentDatasourceIdentity = [
        currentDatasource === null || currentDatasource === void 0 ? void 0 : currentDatasource.uid,
        currentDatasource === null || currentDatasource === void 0 ? void 0 : currentDatasource.id,
        currentDatasource === null || currentDatasource === void 0 ? void 0 : currentDatasource.name
    ].filter(Boolean);
    const isTargetLogTable = discoverCurrent.table === logsTable && discoverCurrent.database === database && (!configuredDatasourceUid || currentDatasourceIdentity.includes(configuredDatasourceUid));
    (0,external_react_.useEffect)(()=>{
        if (theme.isDark) {
            setFieldKeyBg('#3f3f4f');
        } else {
            setFieldKeyBg('rgb(191, 217, 253)');
        }
    }, [
        theme.isDark
    ]);
    const [state, updateState] = (0,external_react_.useState)([
        {
            label: (0,i18n.t)('Table'),
            value: 'Table',
            active: true
        },
        {
            label: 'JSON',
            value: 'JSON',
            active: false
        }
    ]);
    (0,external_react_.useEffect)(()=>{
        const data = tableData.map((item)=>{
            var _item__original;
            return {
                _original: item._original,
                time: ((_item__original = item._original) === null || _item__original === void 0 ? void 0 : _item__original[currentTimeField]) || '',
                _source: (0,utils_data/* generateHighlightedResults */.F9)({
                    search_value: '',
                    indexes: []
                }, [
                    (0,utils_data/* formatRecordTimes */.d$)(item._original, tableFields, timeZone)
                ])[0]._source,
                _uid: item === null || item === void 0 ? void 0 : item._uid
            };
        });
        setFields(data);
    }, [
        tableData,
        currentTimeField,
        timeZone,
        tableFields
    ]);
    const handleRemove = external_react_default().useCallback((field)=>{
        setSelectedFields((current)=>current.filter((item)=>item.Field !== field.Field));
    }, [
        setSelectedFields
    ]);
    const renderSubComponent = ({ row })=>{
        const processedData = (0,utils_data/* parseJsonLikeValue */.mt)(row.original._original);
        const subTableData = Object.keys(processedData).map((key)=>{
            return {
                field: key,
                value: row.original._original[key]
            };
        });
        return /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`
                    position: relative;
                `
        }, /*#__PURE__*/ external_react_default().createElement(ui_.TabsBar, {
            className: (0,css_.css)`
                        ${theme.isDark ? 'background-color: hsl(var(--n9) / 0.4);' : 'background-color: hsl(var(--b1) / 0.6);'}
                    `
        }, state.map((tab, index)=>{
            return /*#__PURE__*/ external_react_default().createElement(ui_.Tab, {
                key: index,
                label: tab.label,
                active: tab.active,
                onChangeTab: ()=>updateState(state.map((tab, idx)=>discover_content_object_spread_props(discover_content_object_spread({}, tab), {
                            active: idx === index
                        }))),
                counter: subTableData.length
            });
        })), /*#__PURE__*/ external_react_default().createElement(ui_.TabContent, null, state[0].active && /*#__PURE__*/ external_react_default().createElement("table", {
            // className="bg-b1/20 pl-4 backdrop-blur-md dark:bg-n9/60"
            className: (0,css_.css)`
                                padding-left: 16px;
                                backdrop-filter: blur(12px);
                                -webkit-backdrop-filter: blur(12px);
                                width: 100%;
                                ${theme.isDark ? 'background-color: hsl(var(--n9) / 0.6);' : 'background-color: hsl(var(--b1) / 0.2)'}
                            `
        }, /*#__PURE__*/ external_react_default().createElement("tbody", null, subTableData.map((item)=>{
            var _tableFields_find;
            const fieldName = item.field;
            const fieldType = (_tableFields_find = tableFields.find((field)=>field.Field === fieldName)) === null || _tableFields_find === void 0 ? void 0 : _tableFields_find.Type;
            const fieldValue = (0,utils_data/* isValidTimeFieldType */.Q3)(String(fieldType || '').toUpperCase()) && item.value != null ? (0,utils_data/* formatTimestampToDateTime */.My)(item.value, 3, timeZone) : (0,utils_data/* formatFieldDisplayValue */.xW)(item.value, 'compact');
            const tableRowStyle = (0,css_.css)`
                                        &:hover {
                                            .filter-table-content {
                                                visibility: visible;
                                            }
                                        }
                                    `;
            return /*#__PURE__*/ external_react_default().createElement("tr", {
                className: `${tableRowStyle}`,
                key: fieldName
            }, /*#__PURE__*/ external_react_default().createElement("td", {
                className: (0,css_.css)`
                                                    height: 32px;
                                                    width: 70px;
                                                `
            }, /*#__PURE__*/ external_react_default().createElement("div", {
                className: `filter-table-content ${(0,css_.css)`
                                                        visibility: hidden;
                                                    `}`
            }, /*#__PURE__*/ external_react_default().createElement(ContentTableActions, {
                fieldName: fieldName,
                fieldValue: (0,utils_data/* formatFieldDisplayValue */.xW)(item.value)
            }))), /*#__PURE__*/ external_react_default().createElement("td", {
                className: (0,css_.css)`
                                                    height: 32px;
                                                    font-size: 12px;
                                                `
            }, fieldName || '-'), /*#__PURE__*/ external_react_default().createElement("td", {
                className: (0,css_.css)`
                                                    height: 32px;
                                                    font-size: 12px;
                                                    white-space: normal;
                                                `
            }, /*#__PURE__*/ external_react_default().createElement("div", {
                className: (0,css_.css)`
                                                        width: 100%;
                                                        word-break: break-all;
                                                    `
            }, (0,utils_data/* isStructuredJsonType */.Ml)(fieldType) ? /*#__PURE__*/ external_react_default().createElement(VariantValueViewer, {
                value: item.value
            }) : fieldValue)));
        }))), state[1].active && /*#__PURE__*/ external_react_default().createElement(VariantValueViewer, {
            value: processedData,
            rootName: "JSON"
        })), /*#__PURE__*/ external_react_default().createElement(tooltip/* default */.A, {
            title: (0,i18n.t)('Surrounding logs ignore existing filters by default. Enable Filter to apply them.')
        }, /*#__PURE__*/ external_react_default().createElement("a", {
            onClick: ()=>{
                setSurroundingLogsOpen(true);
                setSelectedRow(row.original);
            },
            className: (0,css_.css)`
                            position: absolute;
                            right: 1rem;
                            top: 0;
                            cursor: pointer;
                            padding-top: 0.5rem;
                            &:hover {
                                color: #3d71d9;
                            }
                        `
        }, (0,i18n.t)('Surrounding items'))));
    };
    const callback = (status)=>{
        if (status >= 200 && status <= 299) {
            setDrawerOpen(true);
        }
    };
    const openTraceDrawer = (traceId, table)=>{
        // request
        getTraceData(traceId, table, callback);
    };
    const columns = (0,external_react_.useMemo)(()=>{
        let dynamicColumns = [
            {
                id: discover_content_EXPAND_COLUMN_ID,
                accessorKey: 'collapse',
                header: ``,
                size: 48,
                minSize: 48,
                maxSize: 48,
                enableResizing: false,
                enableSorting: false,
                cell: ({ row, getValue })=>{
                    return row.getCanExpand() && /*#__PURE__*/ external_react_default().createElement("div", {
                        className: "flex items-center"
                    }, row.getIsExpanded() ? /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
                        onClick: row.getToggleExpandedHandler(),
                        name: "arrow-down",
                        tooltip: (0,i18n.t)('Collapse')
                    }) : /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
                        onClick: row.getToggleExpandedHandler(),
                        name: "arrow-right",
                        tooltip: (0,i18n.t)('Expand')
                    }), /*#__PURE__*/ external_react_default().createElement("div", {
                        className: "ml-1"
                    }, getValue()));
                }
            },
            {
                id: TIME_COLUMN_ID,
                header: ()=>currentTimeField || (0,i18n.t)('Time'),
                accessorKey: 'time',
                size: 240,
                minSize: 80,
                maxSize: 800,
                enableSorting: true,
                sortDescFirst: false,
                cell: ({ row, getValue })=>{
                    const fieldValue = getValue();
                    const fieldName = currentTimeField;
                    // try to find field type from tableFields
                    const fieldInfo = tableFields.find((f)=>f.value === currentTimeField);
                    const fieldType = (fieldInfo === null || fieldInfo === void 0 ? void 0 : fieldInfo.Type) || '';
                    let timeField = fieldValue;
                    if (fieldInfo && (0,utils_data/* isValidTimeFieldType */.Q3)(String(fieldInfo.Type).toUpperCase()) && fieldValue != null) {
                        timeField = (0,utils_data/* formatTimestampToDateTime */.My)(fieldValue, 3, timeZone);
                    }
                    return /*#__PURE__*/ external_react_default().createElement("div", {
                        className: HoverStyle
                    }, /*#__PURE__*/ external_react_default().createElement("div", {
                        className: (0,css_.css)`
                                    display: flex;
                                    align-items: center;
                                `
                    }, timeField, /*#__PURE__*/ external_react_default().createElement("div", {
                        className: `filter-content ${(0,css_.css)`
                                        visibility: hidden;
                                    `}`
                    }, /*#__PURE__*/ external_react_default().createElement(ContentItem, {
                        fieldName: fieldName,
                        fieldValue: fieldValue,
                        fieldType: fieldType
                    }))));
                }
            }
        ];
        if (!hasSelectedFields) {
            dynamicColumns.push({
                id: SOURCE_COLUMN_ID,
                accessorKey: '_source',
                header: '_source',
                size: 640,
                minSize: 80,
                maxSize: 800,
                enableSorting: false,
                cell: (_0)=>{
                    let { row, getValue } = _0, rest = discover_content_object_without_properties(_0, [
                        "row",
                        "getValue"
                    ]);
                    const html = getValue();
                    const handleClick = (e)=>{
                        const target = e.target;
                        if (!target) {
                            return;
                        }
                        const link = target.closest('[data-trace-id]');
                        if (!link) {
                            return;
                        }
                        const traceId = link.getAttribute('data-trace-id');
                        if (!traceId) {
                            return;
                        }
                        e.preventDefault();
                        if (isTargetLogTable && targetTraceTable) {
                            openTraceDrawer(traceId, targetTraceTable);
                        } else {
                            openTraceDrawer(traceId);
                        }
                    };
                    return /*#__PURE__*/ external_react_default().createElement(LongTextCell, {
                        maxLines: cellLineCount,
                        copyText: (0,utils_data/* formatRecordDisplayValue */.YN)(row.original._original),
                        className: (0,css_.css)`
                                width: 100%;
                                box-sizing: border-box;
                                font-size: 0.875rem;
                                line-height: 1.25rem;
                            `
                    }, /*#__PURE__*/ external_react_default().createElement(ColumnStyleWrapper, {
                        as: "span",
                        className: (0,css_.css)`
                                    && .field-pair {
                                        display: inline;
                                    }
                                    & .field-key {
                                        background-color: ${theme.isDark ? '#3f3f4f' : 'rgb(191, 217, 253)'};
                                    }
                                    & .trace-link {
                                        cursor: pointer;
                                        text-decoration: underline;
                                        color: #3d71d9;
                                    }
                                `
                    }, /*#__PURE__*/ external_react_default().createElement("span", {
                        onClick: handleClick,
                        dangerouslySetInnerHTML: {
                            __html: html
                        },
                        className: (0,css_.css)`
                                        display: inline;
                                    `
                    })));
                }
            });
        } else {
            dynamicColumns = [
                ...dynamicColumns,
                ...selectedFields.map((field)=>{
                    return {
                        id: getFieldColumnId(field.Field),
                        accessorFn: (row)=>getVariantFieldValue(row._original, field),
                        size: 240,
                        minSize: 80,
                        maxSize: 800,
                        enableSorting: field.Field !== currentTimeField && !(0,utils_data/* isComplexType */.tF)(field.Type),
                        sortDescFirst: false,
                        header: ()=>/*#__PURE__*/ external_react_default().createElement("div", {
                                className: (0,css_.css)`
                                    display: flex;
                                    align-items: center;
                                `
                            }, /*#__PURE__*/ external_react_default().createElement("div", null, field.Field), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
                                name: "times",
                                tooltip: (0,i18n.t)('Remove'),
                                style: {
                                    marginLeft: '8px',
                                    cursor: 'pointer',
                                    marginTop: '2px'
                                },
                                onClick: (e)=>{
                                    handleRemove(field);
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            })),
                        cell: ({ row })=>{
                            const rawFieldValue = getVariantFieldValue(row.original._original, field);
                            const fieldValue = (0,utils_data/* isValidTimeFieldType */.Q3)(String(field.Type || '').toUpperCase()) && rawFieldValue != null ? (0,utils_data/* formatTimestampToDateTime */.My)(rawFieldValue, 3, timeZone) : (0,utils_data/* formatFieldDisplayValue */.xW)(rawFieldValue, 'compact');
                            const fieldName = field.Field;
                            const fieldType = field.Type;
                            return /*#__PURE__*/ external_react_default().createElement("div", {
                                className: `${HoverStyle} ${(0,css_.css)`
                                        display: flex;
                                        align-items: center;
                                        min-height: 48px;
                                    `}`
                            }, /*#__PURE__*/ external_react_default().createElement(LongTextCell, {
                                maxLines: cellLineCount,
                                copyText: (0,utils_data/* isStructuredJsonType */.Ml)(fieldType) ? (0,utils_data/* formatFieldDisplayValue */.xW)(rawFieldValue, 'pretty') : fieldValue,
                                className: (0,css_.css)`font-size: 12px;`
                            }, field.value === 'trace_id' ? /*#__PURE__*/ external_react_default().createElement(es_button/* default */.Ay, {
                                className: (0,css_.css)`padding: 0; height: auto; font: inherit;`,
                                onClick: ()=>{
                                    if (isTargetLogTable && targetTraceTable) {
                                        openTraceDrawer(fieldValue, targetTraceTable);
                                    } else {
                                        openTraceDrawer(fieldValue);
                                    }
                                },
                                type: "link"
                            }, fieldValue) : fieldValue), /*#__PURE__*/ external_react_default().createElement("div", {
                                className: `filter-content ${(0,css_.css)`
                                            visibility: hidden;
                                        `}`
                            }, /*#__PURE__*/ external_react_default().createElement(ContentItem, {
                                fieldName: fieldName,
                                fieldValue: rawFieldValue,
                                fieldType: fieldType
                            })));
                        }
                    };
                })
            ];
        }
        return dynamicColumns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        timeZone,
        currentTimeField,
        cellLineCount,
        handleRemove,
        hasSelectedFields,
        selectedFields,
        theme.isDark
    ]);
    const tableSorting = (0,external_react_.useMemo)(()=>{
        const selectedColumnId = sort.field === currentTimeField || !sort.field ? TIME_COLUMN_ID : selectedFields.some((field)=>field.Field === sort.field) ? getFieldColumnId(sort.field) : TIME_COLUMN_ID;
        return [
            {
                id: selectedColumnId,
                desc: sort.direction === 'DESC'
            }
        ];
    }, [
        currentTimeField,
        selectedFields,
        sort.direction,
        sort.field
    ]);
    (0,external_react_.useEffect)(()=>{
        if (sort.field && sort.field !== currentTimeField && !selectedFields.some((field)=>field.Field === sort.field)) {
            onSortChange({
                field: currentTimeField,
                direction: 'DESC'
            });
        }
    }, [
        currentTimeField,
        onSortChange,
        selectedFields,
        sort.field
    ]);
    const handleTableSortingChange = external_react_default().useCallback((updater)=>{
        const nextSorting = typeof updater === 'function' ? updater(tableSorting) : updater;
        const nextColumn = nextSorting[0];
        if (!nextColumn) {
            onSortChange({
                field: currentTimeField,
                direction: 'DESC'
            });
            return;
        }
        const field = nextColumn.id === TIME_COLUMN_ID ? currentTimeField : nextColumn.id.startsWith(FIELD_COLUMN_PREFIX) ? nextColumn.id.slice(FIELD_COLUMN_PREFIX.length) : currentTimeField;
        const selectedField = selectedFields.find((item)=>item.Field === field);
        onSortChange({
            field,
            direction: nextColumn.desc ? 'DESC' : 'ASC',
            variantPath: selectedField === null || selectedField === void 0 ? void 0 : selectedField.variantPath,
            variantType: selectedField === null || selectedField === void 0 ? void 0 : selectedField.Type
        });
    }, [
        currentTimeField,
        onSortChange,
        selectedFields,
        tableSorting
    ]);
    const emptyContent = queryState.status === 'error' ? /*#__PURE__*/ external_react_default().createElement("div", {
        role: "status",
        className: (0,css_.css)`
                    padding: 32px 16px;
                    text-align: center;
                `
    }, /*#__PURE__*/ external_react_default().createElement("strong", null, (0,i18n.t)('Query failed')), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        margin-top: 4px;
                        color: ${theme.colors.text.secondary};
                    `
    }, (0,i18n.t)('Review the query error above, then update the query and try again.'))) : queryState.status === 'success' && queryState.rowCount === 0 ? /*#__PURE__*/ external_react_default().createElement("div", {
        role: "status",
        className: (0,css_.css)`
                    padding: 32px 16px;
                    text-align: center;
                `
    }, /*#__PURE__*/ external_react_default().createElement("strong", null, (0,i18n.t)('Query succeeded — no results')), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        margin-top: 4px;
                        color: ${theme.colors.text.secondary};
                    `
    }, (0,i18n.t)('Try expanding the time range or adjusting the filters.'))) : queryState.status === 'loading' ? /*#__PURE__*/ external_react_default().createElement("div", {
        role: "status",
        className: (0,css_.css)`
                    padding: 32px 16px;
                    text-align: center;
                `
    }, (0,i18n.t)('Querying…')) : undefined;
    const isLayoutModified = JSON.stringify(columnOrder) !== JSON.stringify(availableColumnIds) || JSON.stringify(columnSizing) !== JSON.stringify(defaultColumnSizing);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                display: flex;
                flex-direction: column;
                width: 100%;
                min-width: 0;
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 12px;
                    min-height: 28px;
                    flex: none;
                    padding: 0 8px 4px;
                `
    }, /*#__PURE__*/ external_react_default().createElement("label", {
        htmlFor: "discover-row-lines",
        className: (0,css_.css)`
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        cursor: pointer;
                        font-size: 12px;
                        color: ${theme.colors.text.secondary};
                    `
    }, (0,i18n.t)('Row height'), /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        inputId: "discover-row-lines",
        "aria-label": (0,i18n.t)('Cell display lines'),
        width: 14,
        options: [
            {
                label: (0,i18n.t)('Single line'),
                value: 1
            },
            {
                label: (0,i18n.t)('3 lines'),
                value: 3
            },
            {
                label: (0,i18n.t)('5 lines'),
                value: 5
            },
            {
                label: (0,i18n.t)('Auto'),
                value: 0
            }
        ],
        value: cellLineCount,
        onChange: (option)=>{
            const lines = option.value;
            if (lines === 0 || lines === 1 || lines === 3 || lines === 5) {
                setRowLineCount(lines);
                setDiscoverRowsWrapped(lines !== 1);
            }
        }
    })), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "history",
        tooltip: (0,i18n.t)('Reset column layout'),
        "aria-label": (0,i18n.t)('Reset column layout'),
        disabled: !isLayoutModified,
        onClick: resetColumnLayout
    })), /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": "discover-table-scroll",
        className: (0,css_.css)`
                    min-width: 0;
                    overflow-x: auto;
                `
    }, /*#__PURE__*/ external_react_default().createElement(SDCollapsibleTable, {
        className: (0,css_.css)`
                        width: 100%;
                    `,
        data: fields,
        columns: columns,
        getRowCanExpand: ()=>true,
        renderSubComponent: renderSubComponent,
        showExpandAllToggle: true,
        allRowsExpanded: discoverRowsExpanded,
        onAllRowsExpandedChange: setDiscoverRowsExpanded,
        columnOrder: columnOrder,
        onColumnOrderChange: onColumnOrderChange,
        columnSizing: columnSizing,
        onColumnSizingChange: onColumnSizingChange,
        sorting: tableSorting,
        onSortingChange: handleTableSortingChange,
        enableColumnReordering: true,
        emptyContent: emptyContent,
        rowVerticalPadding: 3,
        stickyHeader: false
    })), queryState.status !== 'error' ? /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": "discover-pagination",
        className: (0,css_.css)`
                        display: flex;
                        flex: none;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 8px 16px;
                        padding: 0.5rem 1rem;
                        padding-bottom: 8px;
                    `
    }, /*#__PURE__*/ external_react_default().createElement("div", null, (0,i18n.t)('Total {{count}} rows', {
        count: tableTotalCount
    })), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;
                            flex-wrap: wrap;
                            gap: 8px;
                        `
    }, /*#__PURE__*/ external_react_default().createElement("label", {
        className: (0,css_.css)`
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            `
    }, (0,i18n.t)('Rows per page'), /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        "aria-label": (0,i18n.t)('Rows per page'),
        options: [
            20,
            50,
            100,
            200
        ].map((size)=>({
                label: String(size),
                value: size
            })),
        value: pageSize,
        onChange: (option)=>{
            const nextPageSize = Number(option.value);
            if (![
                20,
                50,
                100,
                200
            ].includes(nextPageSize)) {
                return;
            }
            setPageSize(nextPageSize);
            setPage(1);
            setJumpPage('1');
        },
        width: 10
    })), /*#__PURE__*/ external_react_default().createElement(ui_.Pagination, {
        currentPage: page,
        numberOfPages: Math.ceil(tableTotalCount / pageSize) || 1,
        onNavigate: (toPage)=>{
            setPage(toPage);
        }
    }), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            `
    }, /*#__PURE__*/ external_react_default().createElement("input", {
        type: "number",
        min: 1,
        step: 1,
        value: jumpPage,
        onChange: (e)=>{
            setJumpPage(e.target.value);
        },
        onKeyDown: (e)=>{
            if (e.key === 'Enter') {
                const num = Number(jumpPage);
                const total = Math.max(Math.ceil(tableTotalCount / pageSize) || 1, 1);
                if (!Number.isNaN(num)) {
                    const target = Math.min(Math.max(1, Math.floor(num)), total);
                    setPage(target);
                    try {
                        fetchNextPage && fetchNextPage(target);
                    } catch (unused) {}
                    setJumpPage(String(target));
                } else {
                    // reset to current page if invalid
                    setJumpPage(String(page));
                }
            }
        },
        className: (0,css_.css)`
                                    width: 72px;
                                    padding: 6px 8px;
                                    border-radius: 4px;
                                    border: 1px solid rgba(0, 0, 0, 0.15);
                                `
    }), /*#__PURE__*/ external_react_default().createElement("button", {
        onClick: ()=>{
            const num = Number(jumpPage);
            const total = Math.max(Math.ceil(tableTotalCount / pageSize) || 1, 1);
            if (!Number.isNaN(num)) {
                const target = Math.min(Math.max(1, Math.floor(num)), total);
                setPage(target);
                try {
                    fetchNextPage && fetchNextPage(target);
                } catch (unused) {}
                setJumpPage(String(target));
            } else {
                setJumpPage(String(page));
            }
        },
        className: (0,css_.css)`
                                    padding: 6px 10px;
                                    border-radius: 4px;
                                    border: 1px solid rgba(0, 0, 0, 0.15);
                                    background: transparent;
                                    cursor: pointer;
                                `
    }, (0,i18n.t)('Go'))))) : null, /*#__PURE__*/ external_react_default().createElement(trace_detail/* default */.A, {
        onClose: ()=>setDrawerOpen(false),
        open: drawerOpen,
        traceId: selectedRow === null || selectedRow === void 0 ? void 0 : selectedRow.trace_id,
        traceTable: "otel_traces"
    }), surroundingLogsOpen && /*#__PURE__*/ external_react_default().createElement(ui_.Drawer, {
        size: "lg",
        title: (0,i18n.t)('Surrounding items'),
        onClose: ()=>{
            setSurroundingTableData([]);
            setBeforeCount(0);
            setAfterCount(0);
            setSurroundingLogsOpen(false);
        }
    }, /*#__PURE__*/ external_react_default().createElement(SurroundingLogs, null)));
}

;// ./components/discover-header/discover-header.style.ts



const DiscoverHeaderField = (0,emotion_styled_browser_esm/* default */.A)((0,ui_.Field))`
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 8px;
    margin: 0;
    min-width: 0;
    max-width: 100%;

    /* Grafana 10 renders a label directly; newer versions wrap it in a div. */
    > label,
    > div:first-child:not(:last-child) {
        margin: 0;
        flex: 0 0 auto;
        white-space: nowrap;
    }

    > div:last-child {
        flex: 1;
        min-width: 0;
    }
`;
const DiscoverHeaderActions = emotion_styled_browser_esm/* default */.A.div`
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 8px;
    margin-left: auto;
`;
const DiscoverHeaderControls = emotion_styled_browser_esm/* default */.A.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    min-width: 0;

    > div {
        margin-bottom: 0;
    }
`;
const DiscoverHeaderSearch = emotion_styled_browser_esm/* default */.A.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    min-width: 0;

    > div {
        margin-bottom: 0;
    }
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
    .ant-select-selector > .ant-select-selection-search > .ant-select-selection-search-input {
        margin-left: 1.8rem;
    }
`;

;// ./components/discover-header/search-type.tsx






function SearchType() {
    const [searchType, setSearchType] = (0,react/* useAtom */.fp)(discover/* searchTypeAtom */.WM);
    const setSearchValue = (0,react/* useSetAtom */.Xr)(discover/* searchValueAtom */.P8);
    const disabledOptions = (0,react/* useAtomValue */.md)(discover/* disabledOptionsAtom */.IH);
    const indexes = (0,react/* useAtomValue */.md)(discover/* indexesAtom */.Eq);
    const setSelectedIndexes = (0,react/* useSetAtom */.Xr)(discover/* selectedIndexesAtom */.pG);
    const [currentIndex, setCurrentIndex] = (0,react/* useAtom */.fp)(discover/* currentIndexAtom */.TY);
    const searchMode = searchType === 'Search';
    const theme = (0,ui_.useTheme2)();
    const options = [
        // {
        //     label: t`Search`,
        //     value: 'Search',
        //     disabled: indexes.length === 0,
        //     tips: t`Discover.SearchType.Search.DisabledText`,
        // },
        {
            label: 'SQL',
            value: 'SQL'
        },
        {
            label: 'Lucene',
            value: 'Lucene'
        }
    ];
    function DropdownQueryType() {
        return /*#__PURE__*/ external_react_default().createElement("div", {
            className: "w-[232px]"
        }, /*#__PURE__*/ external_react_default().createElement(ui_.RadioButtonGroup, {
            options: options,
            disabledOptions: disabledOptions,
            value: searchType,
            onChange: (val)=>{
                setSearchType(val);
                setSearchValue('');
            }
        }), indexes && searchMode ? /*#__PURE__*/ external_react_default().createElement("div", {
            className: "mt-4"
        }, /*#__PURE__*/ external_react_default().createElement(ui_.MultiSelect, {
            placeholder: (0,i18n.t)('Choose'),
            options: indexes.filter((item)=>item.type === 'INVERTED'),
            value: currentIndex,
            onChange: (item, actionMeta)=>{
                const selectedIndexes = [];
                item.forEach((selectedValue)=>{
                    indexes.forEach((item)=>{
                        if (item.value === selectedValue) {
                            selectedIndexes.push(item);
                        }
                    });
                });
                setSelectedIndexes(selectedIndexes);
                setCurrentIndex(item);
            }
        })) : /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null));
    }
    return /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement(ui_.Toggletip, {
        closeButton: false,
        content: /*#__PURE__*/ external_react_default().createElement(DropdownQueryType, null),
        placement: "bottom"
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        cursor: pointer;
                        border: 1px solid rgba(204, 204, 220, 0.2);
                        width: 80px;
                        height: 32px;
                        line-height: 32px;
                        background-color: ${theme.isDark ? 'rgb(17, 18, 23)' : '#FFF'};
                        padding-left: 8px;
                        border-radius: 2px;
                        display: flex;
                        justify-content: space-between;
                    `
    }, /*#__PURE__*/ external_react_default().createElement("span", null, searchType), /*#__PURE__*/ external_react_default().createElement("span", {
        style: {
            marginRight: 6
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
        name: "angle-down"
    })))));
}

;// ./components/discover-header/query-completion.ts



const getSqlOperators = ()=>[
        [
            '=',
            (0,i18n.t)('Equal')
        ],
        [
            '!=',
            (0,i18n.t)('Not equal')
        ],
        [
            '>',
            (0,i18n.t)('Greater than')
        ],
        [
            '>=',
            (0,i18n.t)('Greater than or equal')
        ],
        [
            '<',
            (0,i18n.t)('Less than')
        ],
        [
            '<=',
            (0,i18n.t)('Less than or equal')
        ],
        [
            'LIKE',
            (0,i18n.t)('Pattern match')
        ],
        [
            'IN',
            (0,i18n.t)('Match one of several values')
        ],
        [
            'BETWEEN',
            (0,i18n.t)('Inclusive range')
        ],
        [
            'IS NULL',
            (0,i18n.t)('Missing value')
        ],
        [
            'IS NOT NULL',
            (0,i18n.t)('Present value')
        ]
    ];
const LOGICAL_OPERATORS = [
    'AND',
    'OR'
];
const getLuceneOperators = ()=>[
        [
            'AND',
            (0,i18n.t)('Both clauses must match')
        ],
        [
            'OR',
            (0,i18n.t)('Either clause may match')
        ],
        [
            'NOT',
            (0,i18n.t)('Exclude the following clause')
        ]
    ];
function normalizedType(type) {
    return String(type || '').toUpperCase();
}
function isNumber(type) {
    return /(INT|FLOAT|DOUBLE|DECIMAL|NUMBER)/.test(normalizedType(type));
}
function isBoolean(type) {
    return /BOOL/.test(normalizedType(type));
}
function escapeLucenePhrase(value) {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}
function getSqlFieldInsertText(field) {
    var _field_variantPath;
    if (!((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath.length)) {
        return (0,sql_filter/* transformFieldPath */.k8)(field.Field);
    }
    return (0,sql_filter/* getFilterFieldReference */.MF)({
        fieldName: field.Field,
        variantPath: field.variantPath,
        variantRootType: field.variantRootType,
        fieldType: field.Type,
        operator: 'is not null',
        value: [],
        id: 'query-completion'
    });
}
function getLuceneFieldInsertText(field) {
    var _field_variantPath;
    if (!((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath.length) || field.variantPath.length === 1) {
        return field.Field;
    }
    return field.variantPath[0] + field.variantPath.slice(1).map((part)=>`["${escapeLucenePhrase(part)}"]`).join('');
}
function sqlValue(value, field) {
    if (value === null || value === undefined || typeof value === 'object') {
        return undefined;
    }
    if (typeof value === 'boolean' || isBoolean(field.Type)) {
        return String(value).toLowerCase();
    }
    if (typeof value === 'number' || isNumber(field.Type)) {
        return String(value);
    }
    return (0,sql_filter/* quoteSqlLiteral */.Ck)(String(value));
}
function luceneValue(value, field) {
    if (value === null || value === undefined || typeof value === 'object') {
        return undefined;
    }
    if (typeof value === 'boolean' || isBoolean(field.Type) || typeof value === 'number' || isNumber(field.Type)) {
        return String(value).toLowerCase();
    }
    return `"${escapeLucenePhrase(String(value))}"`;
}
function valuesForField(field, rows, mode) {
    if (!field) {
        return [];
    }
    const seen = new Set();
    const result = [];
    for (const row of rows){
        var _field_variantPath;
        const raw = ((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath.length) ? getVariantFieldValue(row, field) : row[field.Field];
        const text = mode === 'sql' ? sqlValue(raw, field) : luceneValue(raw, field);
        if (!text || seen.has(text)) {
            continue;
        }
        seen.add(text);
        result.push({
            label: text,
            insertText: text,
            detail: (0,i18n.t)('Sample value'),
            kind: 'value'
        });
        if (result.length === 50) {
            break;
        }
    }
    return result;
}
function fieldSuggestions(fields, mode) {
    return fields.map((field)=>{
        var _field_variantPath;
        return {
            label: field.Field,
            insertText: mode === 'sql' ? getSqlFieldInsertText(field) : getLuceneFieldInsertText(field),
            detail: field.Type || (0,i18n.t)('Field'),
            documentation: ((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath.length) ? (0,i18n.t)('Structured path: {{path}}', {
                path: field.variantPath.join('.')
            }) : undefined,
            kind: 'field'
        };
    });
}
function lastSqlCondition(query) {
    // The current condition is enough for completion. BETWEEN's inner AND is
    // intentionally retained so values continue to be suggested after it.
    const parts = query.split(/(?:\bOR\b|\()/i);
    return parts[parts.length - 1] || '';
}
function findSqlField(query, fields) {
    var _matches_;
    const escaped = /`([^`]+)`/g;
    const matches = Array.from(query.matchAll(escaped));
    const last = (_matches_ = matches[matches.length - 1]) === null || _matches_ === void 0 ? void 0 : _matches_[1];
    if (!last) {
        return undefined;
    }
    return fields.find((field)=>{
        var _field_variantPath;
        return (((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath[0]) || field.Field) === last || field.Field === last;
    });
}
function findLuceneField(query, fields) {
    const match = query.match(/([A-Za-z_][\w.\[\]"\\-]*)\s*:\s*[^:]*$/);
    if (!match) {
        return undefined;
    }
    return fields.find((field)=>getLuceneFieldInsertText(field) === match[1] || field.Field === match[1]);
}
function getQuerySuggestions({ mode, query, fields, rows }) {
    const before = query.trimEnd();
    if (mode === 'lucene') {
        if (!before || /(?:^|\s|\()(?:(?:AND|OR|NOT)\s*)?$/i.test(before)) {
            return [
                ...fieldSuggestions(fields, mode),
                ...getLuceneOperators().map(([label, detail])=>({
                        label,
                        insertText: `${label} `,
                        detail,
                        kind: 'keyword'
                    }))
            ];
        }
        const luceneField = findLuceneField(before, fields);
        const completedLuceneValue = before.match(/[A-Za-z_][\w.\[\]"\\-]*\s*:\s*(.+)$/);
        if (luceneField && completedLuceneValue && /\s$/.test(query)) {
            return getLuceneOperators().map(([label, detail])=>({
                    label,
                    insertText: `${label} `,
                    detail,
                    kind: 'keyword'
                }));
        }
        if (luceneField) {
            return [
                ...valuesForField(luceneField, rows, mode),
                {
                    label: '>',
                    insertText: '>',
                    detail: (0,i18n.t)('Greater than'),
                    kind: 'operator'
                },
                {
                    label: '>=',
                    insertText: '>=',
                    detail: (0,i18n.t)('Greater than or equal'),
                    kind: 'operator'
                },
                {
                    label: '<',
                    insertText: '<',
                    detail: (0,i18n.t)('Less than'),
                    kind: 'operator'
                },
                {
                    label: '[min TO max]',
                    insertText: '[ TO ]',
                    detail: (0,i18n.t)('Inclusive range'),
                    kind: 'operator'
                },
                {
                    label: '*',
                    insertText: '*',
                    detail: (0,i18n.t)('Field exists'),
                    kind: 'operator'
                }
            ];
        }
        if (/^[\w.\[\]"\\-]+$/.test(before.split(/\s+/).pop() || '')) {
            return [
                ...fieldSuggestions(fields, mode),
                {
                    label: ':',
                    insertText: ':',
                    detail: (0,i18n.t)('Field/value separator'),
                    kind: 'operator'
                }
            ];
        }
        return getLuceneOperators().map(([label, detail])=>({
                label,
                insertText: ` ${label} `,
                detail,
                kind: 'keyword'
            }));
    }
    if (!before || /(?:^|\bAND\b|\bOR\b|\()\s*$/i.test(before)) {
        return fieldSuggestions(fields, mode);
    }
    const condition = lastSqlCondition(before);
    const field = findSqlField(condition, fields);
    const hasOperator = RegExp("(?:=|!=|>=|<=|(?<![<>!])>|(?<![<>!])<|\\bLIKE\\b|\\bIN\\b|\\bBETWEEN\\b|\\bIS\\s+(?:NOT\\s+)?NULL\\b)\\s*$", "i").test(condition);
    if (field && !hasOperator && !/(?:=|!=|>=|<=|>|<|\bLIKE\b|\bIN\b|\bBETWEEN\b|\bIS\b)/i.test(condition)) {
        return getSqlOperators().map(([label, detail])=>({
                label,
                insertText: label.startsWith('IS ') ? ` ${label}` : ` ${label} `,
                detail,
                kind: 'operator'
            }));
    }
    if (field && RegExp("(?:=|!=|>=|<=|(?<![<>!])>|(?<![<>!])<|\\bLIKE\\b|\\bIN\\b|\\bBETWEEN\\b)\\s*[^)]*$", "i").test(condition)) {
        return valuesForField(field, rows, mode);
    }
    if (/\b(?:IS\s+(?:NOT\s+)?NULL)\s*$/i.test(condition)) {
        return LOGICAL_OPERATORS.map((label)=>({
                label,
                insertText: ` ${label} `,
                detail: (0,i18n.t)('Logical operator'),
                kind: 'keyword'
            }));
    }
    return [
        ...fieldSuggestions(fields, mode),
        ...LOGICAL_OPERATORS.map((label)=>({
                label,
                insertText: ` ${label} `,
                detail: (0,i18n.t)('Logical operator'),
                kind: 'keyword'
            }))
    ];
}

;// ./components/discover-header/discover-query-editor.tsx
function discover_query_editor_define_property(obj, key, value) {
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
function discover_query_editor_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            discover_query_editor_define_property(target, key, source[key]);
        });
    }
    return target;
}
function discover_query_editor_ownKeys(object, enumerableOnly) {
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
function discover_query_editor_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        discover_query_editor_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}








const SUGGESTION_KIND = {
    field: ui_.CodeEditorSuggestionItemKind.Field,
    operator: ui_.CodeEditorSuggestionItemKind.Method,
    value: ui_.CodeEditorSuggestionItemKind.Constant,
    keyword: ui_.CodeEditorSuggestionItemKind.Text
};
// Keep the query compact while retaining the editor's input border.
const singleLineEditorStyle = (0,css_.css)`
    width: 100%;
    min-width: 0;

    .monaco-editor,
    .monaco-editor .overflow-guard,
    .monaco-editor .margin {
        border: 0 !important;
        outline: 0 !important;
    }
`;
function getCompletionRange(model, position) {
    const offset = model.getOffsetAt(position);
    const value = model.getValue();
    let start = offset;
    while(start > 0 && !/[\s()]/.test(value[start - 1])){
        start -= 1;
    }
    return {
        startLineNumber: model.getPositionAt(start).lineNumber,
        startColumn: model.getPositionAt(start).column,
        endLineNumber: position.lineNumber,
        endColumn: position.column
    };
}
function isSuggestionVisible(editor) {
    var _editor_getContribution, _controller_widget;
    // fixedOverflowWidgets places the popup outside the editor DOM, so check
    // the document first. The controller state covers the short interval
    // before Monaco adds the `visible` CSS class.
    if (typeof document !== 'undefined' && document.querySelector('.suggest-widget.visible')) {
        return true;
    }
    const controller = (_editor_getContribution = editor.getContribution) === null || _editor_getContribution === void 0 ? void 0 : _editor_getContribution.call(editor, 'editor.contrib.suggestController');
    const widget = controller === null || controller === void 0 ? void 0 : (_controller_widget = controller.widget) === null || _controller_widget === void 0 ? void 0 : _controller_widget.value;
    return Boolean(widget && widget._state !== 0);
}
function DiscoverQueryEditor({ mode, onQuerying }) {
    const theme = (0,ui_.useTheme2)();
    const [searchValue, setSearchValue] = (0,react/* useAtom */.fp)(discover/* searchValueAtom */.P8);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const variantFields = (0,react/* useAtomValue */.md)(discover/* variantFieldsAtom */.cE);
    const tableData = (0,react/* useAtomValue */.md)(discover/* tableDataAtom */.q3);
    const providerRef = (0,external_react_.useRef)(undefined);
    const keyListenerRef = (0,external_react_.useRef)(undefined);
    const latestRef = (0,external_react_.useRef)({
        mode,
        fields: [],
        rows: []
    });
    const fields = (0,external_react_.useMemo)(()=>{
        const all = [
            ...tableFields,
            ...flattenVariantLeaves(variantFields)
        ];
        const byPath = new Map();
        all.forEach((field)=>{
            const key = JSON.stringify(field.variantPath || [
                field.Field
            ]);
            if (!byPath.has(key)) {
                byPath.set(key, field);
            }
        });
        return Array.from(byPath.values()).map((field)=>{
            var _field_variantPath, _tableFields_find;
            return {
                Field: String(field.Field),
                Type: field.Type,
                variantPath: field.variantPath,
                variantRootType: ((_field_variantPath = field.variantPath) === null || _field_variantPath === void 0 ? void 0 : _field_variantPath.length) ? (_tableFields_find = tableFields.find((root)=>root.Field === field.variantPath[0])) === null || _tableFields_find === void 0 ? void 0 : _tableFields_find.Type : undefined
            };
        });
    }, [
        tableFields,
        variantFields
    ]);
    latestRef.current = {
        mode,
        fields,
        rows: tableData
    };
    const disposeEditorResources = (0,external_react_.useCallback)(()=>{
        var _providerRef_current, _keyListenerRef_current;
        (_providerRef_current = providerRef.current) === null || _providerRef_current === void 0 ? void 0 : _providerRef_current.dispose();
        (_keyListenerRef_current = keyListenerRef.current) === null || _keyListenerRef_current === void 0 ? void 0 : _keyListenerRef_current.dispose();
        providerRef.current = undefined;
        keyListenerRef.current = undefined;
    }, []);
    const onEditorDidMount = (0,external_react_.useCallback)((editor, monaco)=>{
        var _editor_getModel;
        disposeEditorResources();
        const language = mode === 'sql' ? 'sql' : 'plaintext';
        const modelId = (_editor_getModel = editor.getModel()) === null || _editor_getModel === void 0 ? void 0 : _editor_getModel.id;
        providerRef.current = monaco.languages.registerCompletionItemProvider(language, {
            triggerCharacters: mode === 'sql' ? [
                ' ',
                '`',
                '(',
                '='
            ] : [
                ':',
                ' ',
                '(',
                '['
            ],
            provideCompletionItems: (model, position)=>{
                if (model.id !== modelId) {
                    return undefined;
                }
                const offset = model.getOffsetAt(position);
                const current = latestRef.current;
                const suggestions = getQuerySuggestions({
                    mode: current.mode,
                    query: model.getValue().slice(0, offset),
                    fields: current.fields,
                    rows: current.rows
                }).map((suggestion)=>discover_query_editor_object_spread_props(discover_query_editor_object_spread({}, suggestion), {
                        kind: SUGGESTION_KIND[suggestion.kind || 'keyword'],
                        range: getCompletionRange(model, position)
                    }));
                return {
                    suggestions
                };
            }
        });
        keyListenerRef.current = editor.onKeyDown((event)=>{
            const browserEvent = event.browserEvent;
            const suggestionIsVisible = isSuggestionVisible(editor);
            if (event.keyCode === monaco.KeyCode.Enter && !(browserEvent === null || browserEvent === void 0 ? void 0 : browserEvent.isComposing) && !suggestionIsVisible) {
                event.preventDefault();
                event.stopPropagation();
                onQuerying();
            }
        });
    }, [
        disposeEditorResources,
        mode,
        onQuerying
    ]);
    (0,external_react_.useEffect)(()=>disposeEditorResources, [
        disposeEditorResources
    ]);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        style: {
            minWidth: 0,
            width: '100%'
        },
        title: mode === 'lucene' ? (0,i18n.t)('VARIANT properties use exact value matching; searchable paths come from sampled data.') : undefined
    }, /*#__PURE__*/ external_react_default().createElement(ui_.CodeEditor, {
        language: mode === 'sql' ? 'sql' : 'plaintext',
        value: searchValue,
        width: "100%",
        height: "30px",
        showMiniMap: false,
        showLineNumbers: false,
        containerStyles: (0,css_.css)(singleLineEditorStyle, {
            border: `1px solid ${theme.components.input.borderColor}`,
            borderRadius: theme.shape.radius.default,
            '&:focus-within': {
                borderColor: theme.colors.primary.border
            }
        }),
        monacoOptions: {
            lineNumbers: 'off',
            renderLineHighlight: 'none',
            renderValidationDecorations: 'off',
            minimap: {
                enabled: false
            },
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            lineHeight: 30,
            padding: {
                top: 0,
                bottom: 0
            },
            scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden'
            }
        },
        onChange: setSearchValue,
        onEditorDidMount: onEditorDidMount,
        onEditorWillUnmount: disposeEditorResources
    }));
}

;// ./components/discover-header/sql-search.tsx


function SQLSearch({ style, onQuerying }) {
    return /*#__PURE__*/ external_react_default().createElement("div", {
        style: style
    }, /*#__PURE__*/ external_react_default().createElement(DiscoverQueryEditor, {
        mode: "sql",
        onQuerying: onQuerying
    }));
}

// EXTERNAL MODULE: ./services/metaservice.ts
var metaservice = __webpack_require__(8161);
// EXTERNAL MODULE: ./services/grafana-permissions.ts
var grafana_permissions = __webpack_require__(7116);
// EXTERNAL MODULE: ./hooks/useDatabaseTableSelection.ts
var useDatabaseTableSelection = __webpack_require__(2307);
;// ./components/discover-header/lucene.tsx



function Lucene({ onQuerying }) {
    return /*#__PURE__*/ external_react_default().createElement("div", {
        style: {
            width: '100%'
        },
        title: (0,i18n.t)('Attribute values match as whole values. Free-text attribute paths come from sampling; use field:value for a known path.')
    }, /*#__PURE__*/ external_react_default().createElement(DiscoverQueryEditor, {
        mode: "lucene",
        onQuerying: ()=>onQuerying === null || onQuerying === void 0 ? void 0 : onQuerying()
    }));
}

// EXTERNAL MODULE: ../node_modules/@hyperdx/lucene/lib/lucene.js
var lucene = __webpack_require__(9894);
;// ./utils/query-parser/tokenUtils.ts
const VARIANT_LITERAL_KEY_PREFIX = '__HDX_VARIANT_KEY_';
function encodeVariantKey(value) {
    return Array.from(new TextEncoder().encode(value)).map((byte)=>byte.toString(16).padStart(2, '0')).join('');
}
function decodeVariantKey(value) {
    if (!value.startsWith(VARIANT_LITERAL_KEY_PREFIX)) {
        return undefined;
    }
    const hex = value.slice(VARIANT_LITERAL_KEY_PREFIX.length);
    if (!hex || hex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hex)) {
        return undefined;
    }
    try {
        const bytes = new Uint8Array(hex.match(/.{2}/g).map((byte)=>Number.parseInt(byte, 16)));
        return new TextDecoder().decode(bytes);
    } catch (unused) {
        return undefined;
    }
}
/**
 * Makes a literal VARIANT key parser-safe. For example,
 * attrs["k8s.pod.name"] becomes attrs.__HDX_VARIANT_KEY_6b... .
 */ function encodeVariantLiteralFieldPaths(query) {
    let normalized = query;
    let previous;
    const bracketedKey = /([A-Za-z_][A-Za-z0-9_.]*)(?:\["((?:\\.|[^"\\])*)"\])/g;
    do {
        previous = normalized;
        normalized = normalized.replace(bracketedKey, (_match, field, escapedKey)=>{
            let key;
            try {
                key = JSON.parse(`"${escapedKey}"`);
            } catch (unused) {
                return _match;
            }
            return `${field}.${VARIANT_LITERAL_KEY_PREFIX}${encodeVariantKey(key)}`;
        });
    }while (normalized !== previous)
    return normalized;
}
/**
 * Accept SQL-style single-quoted Lucene values in the query editor and turn
 * them into Lucene phrase values before handing the query to the parser.
 */ function normalizeLuceneSingleQuotedValues(query) {
    return query.replace(/(:\s*)'((?:\\.|[^'\\])*)'/g, (_match, prefix, value)=>{
        return `${prefix}${JSON.stringify(value.replace(/\\'/g, "'"))}`;
    });
}
function splitVariantFieldPath(field, expandBracketedDots = false) {
    return field.split('.').flatMap((segment)=>{
        const literalKey = decodeVariantKey(segment);
        // In Lucene, bracket notation is used to make a dotted field path
        // parser-safe. Doris VARIANT then needs each path component as its
        // own bracket accessor: attrs["a.b"] -> attrs['a']['b'].
        return literalKey != null && expandBracketedDots ? literalKey.split('.') : [
            literalKey !== null && literalKey !== void 0 ? literalKey : segment
        ];
    });
}
function encodeSpecialTokens(query) {
    return query.replace(/\\\\/g, 'HDX_BACKSLASH_LITERAL').replace('http://', 'http_COLON_//').replace('https://', 'https_COLON_//').replace(/localhost:(\d{1,5})/, 'localhost_COLON_$1').replace(/\\:/g, 'HDX_COLON');
}
function decodeSpecialTokens(query) {
    return query.replace(/\\"/g, '"').replace(/HDX_BACKSLASH_LITERAL/g, '\\').replace('http_COLON_//', 'http://').replace('https_COLON_//', 'https://').replace(/localhost_COLON_(\d{1,5})/, 'localhost:$1').replace(/HDX_COLON/g, ':');
}

;// ./utils/query-parser/constants.ts
const IMPLICIT_FIELD = '<implicit>';
const CLICK_HOUSE_JSON_NUMBER_TYPES = (/* unused pure expression or super */ null && ([
    'Int8',
    'Int16',
    'Int32',
    'Int64',
    'Int128',
    'Int256',
    'UInt8',
    'UInt16',
    'UInt32',
    'UInt64',
    'UInt128',
    'UInt256',
    'Float32',
    'Float64'
]));

// EXTERNAL MODULE: ./utils/query-parser/column-types.ts
var column_types = __webpack_require__(1945);
;// ./utils/query-parser/sqlstring-browser.ts
const RAW_FLAG = '__raw';
const escapeString = (value)=>{
    const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `'${escaped}'`;
};
const formatDate = (value)=>{
    const pad = (input)=>input.toString().padStart(2, '0');
    const year = value.getFullYear();
    const month = pad(value.getMonth() + 1);
    const day = pad(value.getDate());
    const hours = pad(value.getHours());
    const minutes = pad(value.getMinutes());
    const seconds = pad(value.getSeconds());
    return `'${year}-${month}-${day} ${hours}:${minutes}:${seconds}'`;
};
const escapePrimitive = (value)=>{
    if (isRaw(value)) {
        return value.value;
    }
    if (value === null || value === undefined) {
        return 'NULL';
    }
    if (value instanceof Date) {
        return formatDate(value);
    }
    switch(typeof value){
        case 'number':
        case 'bigint':
            return `${value}`;
        case 'boolean':
            return value ? '1' : '0';
        default:
            return escapeString(String(value));
    }
};
const escapeIdentifier = (identifier)=>{
    if (isRaw(identifier)) {
        return identifier.value;
    }
    return identifier.split('.').map((part)=>{
        if (part === '*') {
            return '*';
        }
        return `\`${part.replace(/`/g, '``')}\``;
    }).join('.');
};
const escapeValue = (value)=>{
    if (isRaw(value)) {
        return value.value;
    }
    if (Array.isArray(value)) {
        const list = value.map((item)=>escapeValue(item));
        return `(${list.join(', ')})`;
    }
    if (value && typeof value === 'object' && !(value instanceof Date)) {
        return escapeString(JSON.stringify(value));
    }
    return escapePrimitive(value);
};
const isRaw = (value)=>Boolean(value && typeof value === 'object' && RAW_FLAG in value);
const format = (sql, values)=>{
    if (!values || values.length === 0) {
        return sql;
    }
    let index = 0;
    return sql.replace(/\?\?|\?/g, (placeholder)=>{
        if (index >= values.length) {
            return placeholder;
        }
        const value = values[index++];
        if (placeholder === '??') {
            if (Array.isArray(value)) {
                return value.map((v)=>escapeIdentifier(v)).join(', ');
            }
            return escapeIdentifier(value);
        }
        return escapeValue(value);
    });
};
const raw = (value)=>({
        __raw: true,
        value
    });
const SqlString = {
    format,
    raw
};
/* harmony default export */ const sqlstring_browser = (SqlString);

;// ./utils/query-parser/enums.ts
var JSDataType = /*#__PURE__*/ function(JSDataType) {
    JSDataType["Array"] = "array";
    JSDataType["Date"] = "date";
    JSDataType["Map"] = "map";
    JSDataType["Number"] = "number";
    JSDataType["String"] = "string";
    JSDataType["Tuple"] = "tuple";
    JSDataType["Bool"] = "bool";
    JSDataType["JSON"] = "json";
    JSDataType["Variant"] = "variant";
    JSDataType["Dynamic"] = "dynamic";
    return JSDataType;
}({});
const convertCHDataTypeToJSType = (dataType)=>{
    if (dataType.startsWith('Date')) {
        return "date";
    } else if (dataType.startsWith('Tuple')) {
        return "tuple";
    } else if (dataType.startsWith('Map')) {
        return "map";
    } else if (dataType.startsWith('Array')) {
        return "array";
    } else if (dataType.startsWith('Int') || dataType.startsWith('UInt') || dataType.startsWith('Float') || // Nullable types are possible (charts)
    dataType.startsWith('Nullable(Int') || dataType.startsWith('Nullable(UInt') || dataType.startsWith('Nullable(Float')) {
        return "number";
    } else if (dataType.startsWith('String') || dataType.startsWith('FixedString') || dataType.startsWith('Enum') || dataType.startsWith('UUID') || dataType.startsWith('IPv4') || dataType.startsWith('IPv6')) {
        return "string";
    } else if (dataType === 'Bool') {
        return "bool";
    } else if (dataType.startsWith('JSON')) {
        return "json";
    } else if (dataType.toLowerCase().startsWith('variant')) {
        return "variant";
    } else if (dataType.startsWith('Dynamic')) {
        return "dynamic";
    } else if (dataType.startsWith('LowCardinality')) {
        return convertCHDataTypeToJSType(dataType.slice(15, -1));
    }
    return null;
};
const convertCHTypeToPrimitiveJSType = (dataType)=>{
    const jsType = convertCHDataTypeToJSType(dataType);
    if (jsType === "map" || jsType === "array" || jsType === "tuple") {
        throw new Error('Map, Array or Tuple type is not a primitive type');
    } else if (jsType === "date") {
        return "number";
    }
    return jsType;
};

;// ./utils/query-parser/utils.ts
// Replace splitAndTrimCSV, should remove splitAndTrimCSV later
function splitAndTrimWithBracket(input) {
    let parenCount = 0;
    let squareCount = 0;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    const res = [];
    let cur = '';
    for (const c of input + ','){
        if (c === '"' && !inSingleQuote) {
            inDoubleQuote = !inDoubleQuote;
            cur += c;
            continue;
        }
        if (c === "'" && !inDoubleQuote) {
            inSingleQuote = !inSingleQuote;
            cur += c;
            continue;
        }
        // Only count brackets when not in quotes
        if (!inSingleQuote && !inDoubleQuote) {
            if (c === '(') {
                parenCount++;
            } else if (c === ')') {
                parenCount--;
            } else if (c === '[') {
                squareCount++;
            } else if (c === ']') {
                squareCount--;
            }
        }
        if (c === ',' && parenCount === 0 && squareCount === 0 && !inSingleQuote && !inDoubleQuote) {
            const trimString = cur.trim();
            if (trimString) {
                res.push(trimString);
            }
            ;
            cur = '';
        } else {
            cur += c;
        }
    }
    return res;
}

;// ./utils/query-parser/serializers.ts
/* unused harmony import specifier */ var t;
/* unused harmony import specifier */ var serializers_IMPLICIT_FIELD;
function serializers_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function serializers_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                serializers_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                serializers_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function serializers_define_property(obj, key, value) {
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








class EnglishSerializer {
    translateField(field) {
        if (field === serializers_IMPLICIT_FIELD) {
            return 'event';
        }
        return `'${field}'`;
    }
    operator(op) {
        switch(op){
            case 'NOT':
            case 'AND NOT':
                return 'AND NOT';
            case 'OR NOT':
                return 'OR NOT';
            case '&&':
            case '<implicit>':
            case 'AND':
                return 'AND';
            case '||':
            case 'OR':
                return 'OR';
            default:
                throw new Error(t('Unexpected operator. {{operator}}', {
                    operator: op
                }));
        }
    }
    eq(field, term, isNegatedField) {
        return serializers_async_to_generator(function*() {
            return `${this.translateField(field)} ${isNegatedField ? 'is not' : 'is'} ${term}`;
        }).call(this);
    }
    isNotNull(field, isNegatedField) {
        return serializers_async_to_generator(function*() {
            return `${this.translateField(field)} ${isNegatedField ? 'is null' : 'is not null'}`;
        }).call(this);
    }
    gte(field, term) {
        return serializers_async_to_generator(function*() {
            return `${this.translateField(field)} is greater than or equal to ${term}`;
        }).call(this);
    }
    lte(field, term) {
        return serializers_async_to_generator(function*() {
            return `${this.translateField(field)} is less than or equal to ${term}`;
        }).call(this);
    }
    lt(field, term) {
        return serializers_async_to_generator(function*() {
            return `${this.translateField(field)} is less than ${term}`;
        }).call(this);
    }
    gt(field, term) {
        return serializers_async_to_generator(function*() {
            return `${this.translateField(field)} is greater than ${term}`;
        }).call(this);
    }
    fieldSearch(field, term, isNegatedField, prefixWildcard, suffixWildcard, isPhrase) {
        return serializers_async_to_generator(function*() {
            if (field === serializers_IMPLICIT_FIELD) {
                return `${this.translateField(field)} ${prefixWildcard && suffixWildcard ? isNegatedField ? 'does not contain' : 'contains' : prefixWildcard ? isNegatedField ? 'does not end with' : 'ends with' : suffixWildcard ? isNegatedField ? 'does not start with' : 'starts with' : isNegatedField ? 'does not have whole word' : 'has whole word'} ${term}`;
            }
            return `${this.translateField(field)} ${isNegatedField ? 'does not contain' : 'contains'} ${term}`;
        }).call(this);
    }
    range(field, start, end, isNegatedField) {
        return serializers_async_to_generator(function*() {
            return `${field} ${isNegatedField ? 'is not' : 'is'} between ${start} and ${end}`;
        })();
    }
}
class SQLSerializer {
    operator(op) {
        switch(op){
            case 'NOT':
            case 'AND NOT':
                return 'AND NOT';
            case 'OR NOT':
                return 'OR NOT';
            case '&&':
            case '<implicit>':
            case 'AND':
                return 'AND';
            case '||':
            case 'OR':
                return 'OR';
            default:
                throw new Error((0,i18n.t)('Unexpected operator. {{operator}}', {
                    operator: op
                }));
        }
    }
    eq(field, term, isNegatedField) {
        return serializers_async_to_generator(function*() {
            const { column, found, propertyType, supportsTextSearch, sourceColumn, variantRoot, json } = yield this.getColumnForField(field);
            if (!found) {
                return this.NOT_FOUND_QUERY;
            }
            if (propertyType === JSDataType.Bool) {
                const normTerm = `${term}`.trim().toLowerCase();
                return sqlstring_browser.format(`(?? ${isNegatedField ? '!' : ''}= ?)`, [
                    column,
                    normTerm === 'true' ? 1 : normTerm === 'false' ? 0 : parseInt(normTerm, 10)
                ]);
            } else if (propertyType === JSDataType.Number) {
                return sqlstring_browser.format(`(${column} ${isNegatedField ? '!' : ''}= CAST(? AS DOUBLE))`, [
                    term
                ]);
            } else if (propertyType === JSDataType.JSON) {
                return this.jsonEquality(json, term, isNegatedField);
            } else if (propertyType === JSDataType.Variant) {
                return this.variantEquality(column, term, isNegatedField, supportsTextSearch, sourceColumn, Boolean(variantRoot));
            } else if (propertyType === JSDataType.String && supportsTextSearch) {
                const searchTarget = column && column.length > 0 ? column : sourceColumn;
                if (!searchTarget) {
                    return this.NOT_FOUND_QUERY;
                }
                return sqlstring_browser.format(`(? ${isNegatedField ? 'NOT ' : ''}MATCH_PHRASE ?)`, [
                    sqlstring_browser.raw(searchTarget),
                    term
                ]);
            }
            return sqlstring_browser.format(`(${column} ${isNegatedField ? '!' : ''}= ?)`, [
                term
            ]);
        }).call(this);
    }
    isNotNull(field, isNegatedField) {
        return serializers_async_to_generator(function*() {
            const { column, found, propertyType, json, variantRoot } = yield this.getColumnForField(field);
            if (!found) {
                return this.NOT_FOUND_QUERY;
            }
            if (propertyType === JSDataType.JSON) {
                if (!json) {
                    return this.NOT_FOUND_QUERY;
                }
                const exists = `JSON_EXISTS_PATH(${json.root}, ${sqlstring_browser.format('?', [
                    json.path
                ])})`;
                const nonNull = `JSON_TYPE(${json.root}, ${sqlstring_browser.format('?', [
                    json.path
                ])}) != 'null'`;
                return isNegatedField ? `(NOT (${exists} AND ${nonNull}))` : `(${exists} AND ${nonNull})`;
            }
            if (propertyType === JSDataType.Variant) {
                if (!variantRoot && column) {
                    return `${column} IS ${isNegatedField ? '' : 'NOT '}NULL`;
                }
                return `CAST(${column} AS STRING) IS ${isNegatedField ? '' : 'NOT '}NULL`;
            }
            return `notEmpty(${column}) ${isNegatedField ? '!' : ''}= 1`;
        }).call(this);
    }
    gte(field, term) {
        return serializers_async_to_generator(function*() {
            const { column, found, propertyType, variantRoot, json } = yield this.getColumnForField(field);
            if (!found) {
                return this.NOT_FOUND_QUERY;
            }
            if (propertyType === JSDataType.JSON) {
                return this.jsonNumericComparison(json, '>=', term);
            }
            if (propertyType === JSDataType.Variant) {
                return this.variantNumericComparison(column, '>=', term, Boolean(variantRoot));
            }
            return sqlstring_browser.format(`(${column} >= ?)`, [
                term
            ]);
        }).call(this);
    }
    lte(field, term) {
        return serializers_async_to_generator(function*() {
            const { column, found, propertyType, variantRoot, json } = yield this.getColumnForField(field);
            if (!found) {
                return this.NOT_FOUND_QUERY;
            }
            if (propertyType === JSDataType.JSON) {
                return this.jsonNumericComparison(json, '<=', term);
            }
            if (propertyType === JSDataType.Variant) {
                return this.variantNumericComparison(column, '<=', term, Boolean(variantRoot));
            }
            return sqlstring_browser.format(`(${column} <= ?)`, [
                term
            ]);
        }).call(this);
    }
    lt(field, term) {
        return serializers_async_to_generator(function*() {
            const { column, found, propertyType, variantRoot, json } = yield this.getColumnForField(field);
            if (!found) {
                return this.NOT_FOUND_QUERY;
            }
            if (propertyType === JSDataType.JSON) {
                return this.jsonNumericComparison(json, '<', term);
            }
            if (propertyType === JSDataType.Variant) {
                return this.variantNumericComparison(column, '<', term, Boolean(variantRoot));
            }
            return sqlstring_browser.format(`(${column} < ?)`, [
                term
            ]);
        }).call(this);
    }
    gt(field, term) {
        return serializers_async_to_generator(function*() {
            const { column, found, propertyType, variantRoot, json } = yield this.getColumnForField(field);
            if (!found) {
                return this.NOT_FOUND_QUERY;
            }
            if (propertyType === JSDataType.JSON) {
                return this.jsonNumericComparison(json, '>', term);
            }
            if (propertyType === JSDataType.Variant) {
                return this.variantNumericComparison(column, '>', term, Boolean(variantRoot));
            }
            return sqlstring_browser.format(`(${column} > ?)`, [
                term
            ]);
        }).call(this);
    }
    attemptToParseNumber(term) {
        const number = Number.parseFloat(term);
        if (Number.isNaN(number)) {
            return term;
        }
        return number;
    }
    tokenizeTerm(term) {
        return term.split(/[ -/:-@[-`{-~\t\n\r]+/).filter((t)=>t.length > 0);
    }
    termHasSeperators(term) {
        return term.match(/[ -/:-@[-`{-~\t\n\r]+/) != null;
    }
    isNumericTerm(term) {
        return /^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?$/.test(`${term}`.trim());
    }
    isBooleanTerm(term) {
        return /^(true|false)$/i.test(`${term}`.trim());
    }
    wrapNegation(clause, isNegated) {
        return isNegated ? `(NOT ${clause})` : clause;
    }
    variantNumericComparison(column, operator, term, variantRoot) {
        if (!column || variantRoot || !this.isNumericTerm(term)) {
            return this.NOT_FOUND_QUERY;
        }
        const targetType = /^[-+]?\d+$/.test(`${term}`.trim()) ? 'BIGINT' : 'DOUBLE';
        return sqlstring_browser.format(`(${this.variantCast(column, targetType)} ${operator} CAST(? AS ${targetType}))`, [
            term
        ]);
    }
    variantBooleanComparison(column, term, isNegatedField) {
        if (!column || !this.isBooleanTerm(term)) {
            return this.NOT_FOUND_QUERY;
        }
        const clause = sqlstring_browser.format(`(${this.variantCast(column, 'BOOLEAN')} = CAST(? AS BOOLEAN))`, [
            `${term}`.trim().toLowerCase()
        ]);
        return this.wrapNegation(clause, isNegatedField);
    }
    variantCast(column, targetType) {
        return `${this.supportsTryCast ? 'TRY_CAST' : 'CAST'}(${column} AS ${targetType})`;
    }
    jsonCast(column, targetType) {
        return `CAST(${column} AS ${targetType})`;
    }
    jsonType(json) {
        return `JSON_TYPE(${json.root}, ${sqlstring_browser.format('?', [
            json.path
        ])})`;
    }
    jsonScalarType(json, types) {
        return `${this.jsonType(json)} IN (${types.map((type)=>sqlstring_browser.format('?', [
                type
            ])).join(', ')})`;
    }
    jsonNumericComparison(json, operator, term) {
        if (!json || json.isRoot || !this.isNumericTerm(term)) {
            return this.NOT_FOUND_QUERY;
        }
        const scalar = `${this.jsonScalarType(json, [
            'int',
            'bigint',
            'largeint',
            'double'
        ])} AND ` + `${this.jsonCast(json.extracted, 'DOUBLE')} ${operator} CAST(${sqlstring_browser.format('?', [
            term
        ])} AS DOUBLE)`;
        const array = `(${this.jsonType(json)} = 'array' AND JSON_CONTAINS(${json.extracted}, CAST(${sqlstring_browser.format('?', [
            term
        ])} AS JSON)))`;
        return `((${scalar}) OR ${array})`;
    }
    jsonBooleanComparison(json, term, isNegatedField) {
        if (!json || json.isRoot || !this.isBooleanTerm(term)) {
            return this.NOT_FOUND_QUERY;
        }
        const value = `${term}`.trim().toLowerCase();
        const scalar = `(${this.jsonType(json)} = 'bool' AND ${this.jsonCast(json.extracted, 'BOOLEAN')} = CAST(${sqlstring_browser.format('?', [
            value
        ])} AS BOOLEAN))`;
        const array = `(${this.jsonType(json)} = 'array' AND JSON_CONTAINS(${json.extracted}, CAST(${sqlstring_browser.format('?', [
            value
        ])} AS JSON)))`;
        const clause = `(${scalar} OR ${array})`;
        return this.wrapNegation(clause, isNegatedField);
    }
    escapeLikePattern(value) {
        return value.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');
    }
    jsonTextSearch(json, term, isNegatedField, prefixWildcard, suffixWildcard, isPhrase) {
        return serializers_async_to_generator(function*() {
            if (!json || json.isRoot) {
                return this.NOT_FOUND_QUERY;
            }
            if (!this.supportsJsonSearch) {
                throw new Error((0,i18n.t)('JSON array text search requires Doris JSON_SEARCH support.'));
            }
            const pattern = `${prefixWildcard ? '%' : '%'}${this.escapeLikePattern(term)}${suffixWildcard ? '%' : '%'}`;
            const scalar = `(${this.jsonType(json)} = 'string' AND lower(JSON_UNQUOTE(${json.extracted})) ${isNegatedField ? 'NOT ' : ''}LIKE lower(${sqlstring_browser.format('?', [
                pattern
            ])}) ESCAPE '\\\\')`;
            const array = `(${this.jsonType(json)} = 'array' AND JSON_SEARCH(${json.extracted}, 'one', ${sqlstring_browser.format('?', [
                pattern
            ])}) IS ${isNegatedField ? '' : 'NOT '}NULL)`;
            return `(${scalar} OR ${array})`;
        }).call(this);
    }
    jsonEquality(json, term, isNegatedField) {
        return serializers_async_to_generator(function*() {
            if (`${term}`.trim().toLowerCase() === 'null') {
                if (!json || json.isRoot) {
                    return this.NOT_FOUND_QUERY;
                }
                const clause = `(${this.jsonType(json)} = 'null' OR (${this.jsonType(json)} = 'array' AND JSON_CONTAINS(${json.extracted}, CAST('null' AS JSON))))`;
                return this.wrapNegation(clause, isNegatedField);
            }
            if (this.isBooleanTerm(term)) {
                return this.jsonBooleanComparison(json, term, isNegatedField);
            }
            if (this.isNumericTerm(term)) {
                const clause = this.jsonNumericComparison(json, '=', term);
                return clause === this.NOT_FOUND_QUERY ? clause : this.wrapNegation(clause, isNegatedField);
            }
            return this.jsonTextSearch(json, term, isNegatedField, false, false, true);
        }).call(this);
    }
    variantLikePattern(term, prefixWildcard, suffixWildcard, isPhrase) {
        if (prefixWildcard || suffixWildcard) {
            return `${prefixWildcard ? '%' : ''}${term}${suffixWildcard ? '%' : ''}`;
        }
        return isPhrase ? `%${term}%` : `%${term}%`;
    }
    variantTextSearch(column, term, isNegatedField, prefixWildcard, suffixWildcard, isPhrase, supportsTextSearch, sourceColumn, variantRoot = false) {
        if (!column) {
            return this.NOT_FOUND_QUERY;
        }
        // Doris VARIANT child values are indexed as whole values. Exact terms
        // and phrases should therefore use equality; only an explicit prefix
        // wildcard can use the inverted index's phrase-prefix operator.
        if (!variantRoot) {
            const usePrefix = !isPhrase && suffixWildcard && !prefixWildcard;
            if (usePrefix) {
                return sqlstring_browser.format(`(? ${isNegatedField ? 'NOT ' : ''}MATCH_PHRASE_PREFIX ?)`, [
                    sqlstring_browser.raw(column),
                    term
                ]);
            }
            if (usePrefix || prefixWildcard) {
                return sqlstring_browser.format(`(lower(CAST(? AS STRING)) ${isNegatedField ? 'NOT ' : ''}LIKE lower(?))`, [
                    sqlstring_browser.raw(column),
                    `${prefixWildcard ? '%' : ''}${this.escapeLikePattern(term)}${suffixWildcard ? '%' : ''}`
                ]);
            }
            return sqlstring_browser.format(`(? ${isNegatedField ? '!=' : '='} ?)`, [
                sqlstring_browser.raw(column),
                term
            ]);
        }
        if (supportsTextSearch && sourceColumn) {
            const usePhrasePrefix = !isPhrase && suffixWildcard && !prefixWildcard;
            const matchTerm = isPhrase ? term : usePhrasePrefix ? term : `${prefixWildcard ? '*' : ''}${term}${suffixWildcard ? '*' : ''}`;
            const operator = isPhrase ? 'MATCH_PHRASE' : usePhrasePrefix ? 'MATCH_PHRASE_PREFIX' : 'MATCH_ANY';
            const searchTarget = variantRoot ? sourceColumn : `CAST(${column} AS STRING)`;
            return sqlstring_browser.format(`(? ${isNegatedField ? 'NOT ' : ''}${operator} ?)`, [
                sqlstring_browser.raw(searchTarget),
                matchTerm
            ]);
        }
        return sqlstring_browser.format(`(lower(CAST(? AS STRING)) ${isNegatedField ? 'NOT ' : ''}LIKE lower(?))`, [
            sqlstring_browser.raw(column),
            this.variantLikePattern(term, prefixWildcard, suffixWildcard, isPhrase)
        ]);
    }
    variantEquality(column, term, isNegatedField, supportsTextSearch, sourceColumn, variantRoot = false) {
        if (this.isBooleanTerm(term)) {
            return this.variantBooleanComparison(column, term, isNegatedField);
        }
        if (this.isNumericTerm(term)) {
            const clause = this.variantNumericComparison(column, '=', term, variantRoot);
            return clause === this.NOT_FOUND_QUERY ? clause : this.wrapNegation(clause, isNegatedField);
        }
        return this.variantTextSearch(column, term, isNegatedField, false, false, true, supportsTextSearch, sourceColumn, variantRoot);
    }
    fieldSearch(field, term, isNegatedField, prefixWildcard, suffixWildcard, isPhrase) {
        return serializers_async_to_generator(function*() {
            const isImplicitField = field === IMPLICIT_FIELD;
            const { column, found, propertyType, supportsTextSearch, sourceColumn, implicitTargets, variantRoot, json } = yield this.getColumnForField(field);
            if (!found) {
                return this.NOT_FOUND_QUERY;
            }
            if (propertyType === JSDataType.Bool) {
                const normTerm = `${term}`.trim().toLowerCase();
                return sqlstring_browser.format(`(?? ${isNegatedField ? '!' : ''}= ?)`, [
                    column,
                    normTerm === 'true' ? 1 : normTerm === 'false' ? 0 : parseInt(normTerm, 10)
                ]);
            } else if (propertyType === JSDataType.Number) {
                return sqlstring_browser.format(`(?? ${isNegatedField ? '!' : ''}= CAST(? AS DOUBLE))`, [
                    column,
                    term
                ]);
            } else if (propertyType === JSDataType.Variant) {
                if (this.isBooleanTerm(term)) {
                    return this.variantBooleanComparison(column, term, isNegatedField);
                }
                if (this.isNumericTerm(term)) {
                    const clause = this.variantNumericComparison(column, '=', term, Boolean(variantRoot));
                    return clause === this.NOT_FOUND_QUERY ? clause : this.wrapNegation(clause, isNegatedField);
                }
                return this.variantTextSearch(column, term, isNegatedField, prefixWildcard, suffixWildcard, isPhrase, supportsTextSearch, sourceColumn, Boolean(variantRoot));
            } else if (propertyType === JSDataType.JSON) {
                if (`${term}`.trim().toLowerCase() === 'null') {
                    return this.jsonEquality(json, term, isNegatedField);
                }
                if (this.isBooleanTerm(term)) {
                    return this.jsonBooleanComparison(json, term, isNegatedField);
                }
                if (this.isNumericTerm(term)) {
                    const clause = this.jsonNumericComparison(json, '=', term);
                    return clause === this.NOT_FOUND_QUERY ? clause : this.wrapNegation(clause, isNegatedField);
                }
                return yield this.jsonTextSearch(json, term, isNegatedField, prefixWildcard, suffixWildcard, isPhrase);
            }
            if (term.length === 0) {
                return '(1=1)';
            }
            if (isImplicitField) {
                if (implicitTargets && implicitTargets.length > 0) {
                    const usePhrasePrefix = !isPhrase && suffixWildcard && !prefixWildcard;
                    const matchTerm = isPhrase ? term : usePhrasePrefix ? term : `${prefixWildcard ? '*' : ''}${term}${suffixWildcard ? '*' : ''}`;
                    const clauses = implicitTargets.map((target)=>{
                        if (!target) {
                            return null;
                        }
                        if (isPhrase && target.propertyType !== JSDataType.String && target.propertyType !== JSDataType.JSON && target.propertyType !== JSDataType.Variant) {
                            return null;
                        }
                        if ((target.propertyType === JSDataType.String || target.propertyType === JSDataType.JSON || target.propertyType === JSDataType.Variant) && target.supportsTextSearch) {
                            var _target_sourceColumn;
                            const identifier = (_target_sourceColumn = target.sourceColumn) !== null && _target_sourceColumn !== void 0 ? _target_sourceColumn : target.column;
                            if (!identifier) {
                                return null;
                            }
                            const operator = isPhrase ? 'MATCH_PHRASE' : usePhrasePrefix ? 'MATCH_PHRASE_PREFIX' : 'MATCH_ANY';
                            return sqlstring_browser.format(`(?? ${operator} ?)`, [
                                identifier,
                                matchTerm
                            ]);
                        }
                        if (target.propertyType === JSDataType.Variant) {
                            var _target_column;
                            const identifier = (_target_column = target.column) !== null && _target_column !== void 0 ? _target_column : target.sourceColumn;
                            if (!identifier) {
                                return null;
                            }
                            if (target.exactVariantValue) {
                                const usePrefix = !isPhrase && suffixWildcard && !prefixWildcard;
                                if (usePrefix) {
                                    return sqlstring_browser.format(`(? ${isNegatedField ? 'NOT ' : ''}MATCH_PHRASE_PREFIX ?)`, [
                                        sqlstring_browser.raw(identifier),
                                        term
                                    ]);
                                }
                                return sqlstring_browser.format(`(? ${isNegatedField ? '!=' : '='} ?)`, [
                                    sqlstring_browser.raw(identifier),
                                    term
                                ]);
                            }
                            return sqlstring_browser.format(`(lower(CAST(? AS STRING)) LIKE lower(?))`, [
                                sqlstring_browser.raw(identifier),
                                this.variantLikePattern(term, prefixWildcard, suffixWildcard, isPhrase)
                            ]);
                        }
                        if (target.propertyType === JSDataType.Number) {
                            var _target_sourceColumn1;
                            const identifier = (_target_sourceColumn1 = target.sourceColumn) !== null && _target_sourceColumn1 !== void 0 ? _target_sourceColumn1 : target.column;
                            if (!identifier) {
                                return null;
                            }
                            return sqlstring_browser.format(`(?? = CAST(? AS DOUBLE))`, [
                                identifier,
                                term
                            ]);
                        }
                        if (target.propertyType === JSDataType.Bool) {
                            var _target_sourceColumn2;
                            const identifier = (_target_sourceColumn2 = target.sourceColumn) !== null && _target_sourceColumn2 !== void 0 ? _target_sourceColumn2 : target.column;
                            if (!identifier) {
                                return null;
                            }
                            const normTerm = `${term}`.trim().toLowerCase();
                            const boolValue = normTerm === 'true' ? 1 : normTerm === 'false' ? 0 : parseInt(normTerm, 10);
                            return sqlstring_browser.format(`(?? = ?)`, [
                                identifier,
                                boolValue
                            ]);
                        }
                        return null;
                    }).filter((clause)=>clause != null);
                    if (clauses.length === 0) {
                        return this.NOT_FOUND_QUERY;
                    }
                    const orClause = clauses.join(' OR ');
                    const wrapped = clauses.length === 1 ? clauses[0] : `(${orClause})`;
                    if (isNegatedField) {
                        return `(NOT ${wrapped})`;
                    }
                    return wrapped;
                }
                if (column) {
                    if (prefixWildcard || suffixWildcard) {
                        return sqlstring_browser.format(`(lower(?) ${isNegatedField ? 'NOT ' : ''}LIKE lower(?))`, [
                            sqlstring_browser.raw(column !== null && column !== void 0 ? column : ''),
                            `${prefixWildcard ? '%' : ''}${term}${suffixWildcard ? '%' : ''}`
                        ]);
                    } else {
                        const hasSeperators = this.termHasSeperators(term);
                        if (hasSeperators) {
                            const tokens = this.tokenizeTerm(term);
                            return `(${isNegatedField ? 'NOT (' : ''}${[
                                ...tokens.map((token)=>sqlstring_browser.format(`hasToken(lower(?), lower(?))`, [
                                        sqlstring_browser.raw(column !== null && column !== void 0 ? column : ''),
                                        token
                                    ])),
                                sqlstring_browser.format(`(lower(?) LIKE lower(?))`, [
                                    sqlstring_browser.raw(column !== null && column !== void 0 ? column : ''),
                                    `%${term}%`
                                ])
                            ].join(' AND ')}${isNegatedField ? ')' : ''})`;
                        }
                        return sqlstring_browser.format(`(${isNegatedField ? 'NOT ' : ''}hasToken(lower(?), lower(?)))`, [
                            sqlstring_browser.raw(column !== null && column !== void 0 ? column : ''),
                            term
                        ]);
                    }
                }
                return this.NOT_FOUND_QUERY;
            } else {
                if (supportsTextSearch === false) {
                    return this.NOT_FOUND_QUERY;
                }
                const searchTarget = column && column.length > 0 ? column : sourceColumn;
                if (!searchTarget) {
                    return this.NOT_FOUND_QUERY;
                }
                const usePhrasePrefix = !isPhrase && suffixWildcard && !prefixWildcard;
                const matchTerm = isPhrase ? term : usePhrasePrefix ? term : `${prefixWildcard ? '*' : ''}${term}${suffixWildcard ? '*' : ''}`;
                const operator = isPhrase ? 'MATCH_PHRASE' : usePhrasePrefix ? 'MATCH_PHRASE_PREFIX' : 'MATCH_ANY';
                return sqlstring_browser.format(`(? ${isNegatedField ? 'NOT ' : ''}${operator} ?)`, [
                    sqlstring_browser.raw(searchTarget),
                    matchTerm
                ]);
            }
        }).call(this);
    }
    range(field, start, end, isNegatedField) {
        return serializers_async_to_generator(function*() {
            const { column, found, propertyType, variantRoot, json } = yield this.getColumnForField(field);
            if (!found) {
                return this.NOT_FOUND_QUERY;
            }
            if (propertyType === JSDataType.Variant) {
                const startClause = this.variantNumericComparison(column, '>=', start, Boolean(variantRoot));
                const endClause = this.variantNumericComparison(column, '<=', end, Boolean(variantRoot));
                if (startClause === this.NOT_FOUND_QUERY || endClause === this.NOT_FOUND_QUERY) {
                    return this.NOT_FOUND_QUERY;
                }
                return this.wrapNegation(`(${startClause} AND ${endClause})`, isNegatedField);
            }
            if (propertyType === JSDataType.JSON) {
                const startClause = this.jsonNumericComparison(json, '>=', start);
                const endClause = this.jsonNumericComparison(json, '<=', end);
                if (startClause === this.NOT_FOUND_QUERY || endClause === this.NOT_FOUND_QUERY) {
                    return this.NOT_FOUND_QUERY;
                }
                return this.wrapNegation(`(${startClause} AND ${endClause})`, isNegatedField);
            }
            return sqlstring_browser.format(`(${column} ${isNegatedField ? 'NOT ' : ''}BETWEEN ? AND ?)`, [
                this.attemptToParseNumber(start),
                this.attemptToParseNumber(end)
            ]);
        }).call(this);
    }
    constructor(){
        serializers_define_property(this, "NOT_FOUND_QUERY", '(1 = 0)');
        serializers_define_property(this, "supportsTryCast", true);
        serializers_define_property(this, "supportsJsonSearch", true);
    }
}
class CustomSchemaSQLSerializerV2 extends SQLSerializer {
    fetchColumnMetadata(column) {
        return serializers_async_to_generator(function*() {
            var _this_providedColumnMetadata_get;
            var _this_legacyMetadataProvider;
            if (this.columnMetadataCache.has(column)) {
                var _this_columnMetadataCache_get;
                return (_this_columnMetadataCache_get = this.columnMetadataCache.get(column)) !== null && _this_columnMetadataCache_get !== void 0 ? _this_columnMetadataCache_get : null;
            }
            let resolved = null;
            resolved = (_this_providedColumnMetadata_get = this.providedColumnMetadata.get(column.toLowerCase())) !== null && _this_providedColumnMetadata_get !== void 0 ? _this_providedColumnMetadata_get : null;
            try {
                if (resolved) {
                    this.columnMetadataCache.set(column, resolved);
                    return resolved;
                }
                if (this.hasProvidedColumnMetadata) {
                    this.columnMetadataCache.set(column, null);
                    return null;
                }
                const result = yield (0,metaservice/* getColumn */.bf)({
                    connectionId: this.connectionId,
                    database: this.databaseName,
                    table: this.tableName,
                    column,
                    datasourceType: this.datasourceType
                });
                if (result) {
                    resolved = {
                        name: result.name,
                        type: result.normalizedType || result.columnType || result.dataType || 'Unknown',
                        dataType: result.dataType,
                        columnType: result.columnType
                    };
                }
            } catch (error) {
            // ignore service errors and fallback to legacy metadata provider if available
            }
            if (!resolved && ((_this_legacyMetadataProvider = this.legacyMetadataProvider) === null || _this_legacyMetadataProvider === void 0 ? void 0 : _this_legacyMetadataProvider.getColumn)) {
                try {
                    const legacy = yield this.legacyMetadataProvider.getColumn({
                        databaseName: this.databaseName,
                        tableName: this.tableName,
                        column,
                        connectionId: this.connectionId
                    });
                    if (legacy) {
                        resolved = {
                            name: legacy.name,
                            type: legacy.type || 'Unknown'
                        };
                    }
                } catch (legacyError) {
                // swallow legacy metadata errors
                }
            }
            this.columnMetadataCache.set(column, resolved);
            return resolved;
        }).call(this);
    }
    loadInvertedIndexColumns() {
        return serializers_async_to_generator(function*() {
            if (this.invertedIndexColumns) {
                return this.invertedIndexColumns;
            }
            if (!this.invertedIndexColumnsPromise) {
                this.invertedIndexColumnsPromise = (()=>serializers_async_to_generator(function*() {
                        try {
                            const columns = yield (0,metaservice/* getInvertedIndexColumns */.Dr)({
                                connectionId: this.connectionId,
                                database: this.databaseName,
                                table: this.tableName,
                                datasourceType: this.datasourceType
                            });
                            return new Set(columns.map((name)=>name.toLowerCase()));
                        } catch (error) {
                            return new Set();
                        }
                    }).call(this))();
            }
            const resolved = yield this.invertedIndexColumnsPromise;
            this.invertedIndexColumns = resolved;
            return resolved;
        }).call(this);
    }
    columnHasInvertedIndex(column) {
        return serializers_async_to_generator(function*() {
            if (!column) {
                return false;
            }
            const indexes = yield this.loadInvertedIndexColumns();
            return indexes.has(column.toLowerCase());
        }).call(this);
    }
    isVariantColumnType(columnType) {
        return columnType.toLowerCase().startsWith('variant');
    }
    isJsonColumnType(columnType) {
        return columnType.toLowerCase().startsWith('json');
    }
    getDorisJsonPath(path) {
        // Quote every member so dots in telemetry attribute keys remain literal
        // keys instead of being interpreted as nested JSON-path separators.
        return '$' + path.map((part)=>`."${String(part).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join('');
    }
    buildColumnExpressionFromField(field) {
        return serializers_async_to_generator(function*() {
            const exactMatch = yield this.fetchColumnMetadata(field);
            if (exactMatch) {
                const isVariantRoot = this.isVariantColumnType(exactMatch.type);
                const isJsonRoot = this.isJsonColumnType(exactMatch.type);
                return {
                    found: true,
                    columnType: exactMatch.type,
                    columnExpression: isVariantRoot || isJsonRoot ? sqlstring_browser.format(`??`, [
                        exactMatch.name
                    ]) : exactMatch.name,
                    sourceColumn: exactMatch.name,
                    // Both structured root types disallow scalar numeric comparisons
                    // until a JSON/VARIANT child path has been selected.
                    variantRoot: isVariantRoot || isJsonRoot,
                    json: isJsonRoot ? {
                        root: sqlstring_browser.format('??', [
                            exactMatch.name
                        ]),
                        path: '$',
                        extracted: sqlstring_browser.format('??', [
                            exactMatch.name
                        ]),
                        isRoot: true
                    } : undefined
                };
            }
            const fieldPath = splitVariantFieldPath(field);
            const fieldPrefix = fieldPath[0];
            const prefixMatch = yield this.fetchColumnMetadata(fieldPrefix);
            if (!prefixMatch && field.includes('__HDX_VARIANT_KEY_')) {
                throw new Error((0,i18n.t)('Unknown column "{{column}}" in Lucene field "{{field}}". Check the field name.', {
                    column: fieldPrefix,
                    field: fieldPath.join('.')
                }));
            }
            if (prefixMatch) {
                const fieldPostfix = fieldPath.slice(1).join('.');
                if (prefixMatch.type.startsWith('Map')) {
                    var _prefixMatch_type_match;
                    const valueType = (_prefixMatch_type_match = prefixMatch.type.match(/,\s+(\w+)\)$/)) === null || _prefixMatch_type_match === void 0 ? void 0 : _prefixMatch_type_match[1];
                    return {
                        found: true,
                        columnExpression: sqlstring_browser.format(`??[?]`, [
                            prefixMatch.name,
                            fieldPostfix
                        ]),
                        columnType: valueType !== null && valueType !== void 0 ? valueType : 'Unknown',
                        sourceColumn: prefixMatch.name
                    };
                } else if (this.isJsonColumnType(prefixMatch.type)) {
                    const nestedPaths = fieldPath.slice(1).filter(Boolean);
                    return {
                        found: true,
                        columnExpression: sqlstring_browser.format(`JSON_EXTRACT(??, ?)`, [
                            prefixMatch.name,
                            this.getDorisJsonPath(nestedPaths)
                        ]),
                        columnType: 'JSON',
                        sourceColumn: prefixMatch.name,
                        variantRoot: nestedPaths.length === 0,
                        json: {
                            root: sqlstring_browser.format('??', [
                                prefixMatch.name
                            ]),
                            path: this.getDorisJsonPath(nestedPaths),
                            extracted: sqlstring_browser.format(`JSON_EXTRACT(??, ?)`, [
                                prefixMatch.name,
                                this.getDorisJsonPath(nestedPaths)
                            ]),
                            isRoot: nestedPaths.length === 0
                        }
                    };
                } else if (this.isVariantColumnType(prefixMatch.type)) {
                    // Bracketed Lucene paths are encoded before parsing. Expand a
                    // dotted bracket value here so Doris receives one accessor per
                    // VARIANT path segment, e.g. attrs["k8s.pod.name"] becomes
                    // attrs['k8s']['pod']['name'].
                    const nestedPaths = splitVariantFieldPath(field, true).slice(1).filter(Boolean);
                    return {
                        found: true,
                        columnExpression: sqlstring_browser.format(`??${Array(nestedPaths.length).fill('[?]').join('')}`, [
                            prefixMatch.name,
                            ...nestedPaths
                        ]),
                        columnType: 'Variant',
                        sourceColumn: prefixMatch.name,
                        variantRoot: nestedPaths.length === 0
                    };
                } else if (prefixMatch.type === 'String') {
                    const nestedPaths = fieldPath.slice(1);
                    return {
                        found: true,
                        columnExpression: sqlstring_browser.format(`JSONExtractString(??, ${Array(nestedPaths.length).fill('?').join(',')})`, [
                            prefixMatch.name,
                            ...nestedPaths
                        ]),
                        columnType: 'String',
                        sourceColumn: prefixMatch.name
                    };
                }
                throw new Error((0,i18n.t)('Unsupported column type for prefix match'));
            }
            return {
                found: true,
                columnExpression: field,
                columnType: 'Unknown',
                sourceColumn: field,
                variantRoot: false
            };
        }).call(this);
    }
    getColumnForField(field) {
        return serializers_async_to_generator(function*() {
            var _convertCHTypeToPrimitiveJSType;
            if (field === IMPLICIT_FIELD) {
                if (!this.implicitColumnExpression && !Object.values(this.variantImplicitPaths).some((paths)=>paths.length > 0)) {
                    throw new Error((0,i18n.t)('Can not search bare text without an implicit column set.'));
                }
                const expressions = this.implicitColumnExpression ? splitAndTrimWithBracket(this.implicitColumnExpression) : [];
                const implicitFieldCandidates = Array.from(new Set(expressions.reduce((acc, expression)=>{
                    acc.push(...this.extractFieldNamesFromExpression(expression));
                    return acc;
                }, []).filter((name)=>!!name)));
                const implicitTargets = (yield Promise.all(implicitFieldCandidates.map((candidate)=>serializers_async_to_generator(function*() {
                        try {
                            var _convertCHTypeToPrimitiveJSType, _candidateExpression_sourceColumn;
                            const candidateExpression = yield this.buildColumnExpressionFromField(candidate);
                            const candidatePropertyType = (_convertCHTypeToPrimitiveJSType = convertCHTypeToPrimitiveJSType(candidateExpression.columnType)) !== null && _convertCHTypeToPrimitiveJSType !== void 0 ? _convertCHTypeToPrimitiveJSType : undefined;
                            // Implicit search must never stringify a whole VARIANT root,
                            // nor send numeric/time/unknown columns to text operators.
                            if (![
                                JSDataType.String,
                                JSDataType.JSON
                            ].includes(candidatePropertyType)) {
                                return null;
                            }
                            let candidateSupportsTextSearch;
                            if ((candidatePropertyType === JSDataType.String || candidatePropertyType === JSDataType.JSON || candidatePropertyType === JSDataType.Variant) && candidateExpression.sourceColumn && (candidateExpression.columnExpression === candidateExpression.sourceColumn || candidateExpression.variantRoot !== undefined)) {
                                candidateSupportsTextSearch = yield this.columnHasInvertedIndex(candidateExpression.sourceColumn);
                            } else if (candidatePropertyType === JSDataType.String || candidatePropertyType === JSDataType.JSON || candidatePropertyType === JSDataType.Variant) {
                                candidateSupportsTextSearch = false;
                            }
                            return {
                                column: candidateExpression.columnExpression,
                                sourceColumn: (_candidateExpression_sourceColumn = candidateExpression.sourceColumn) !== null && _candidateExpression_sourceColumn !== void 0 ? _candidateExpression_sourceColumn : candidate,
                                propertyType: candidatePropertyType,
                                supportsTextSearch: candidateSupportsTextSearch
                            };
                        } catch (error) {
                            return null;
                        }
                    }).call(this)))).filter((target)=>target !== null);
                for (const [root, paths] of Object.entries(this.variantImplicitPaths)){
                    const rootMeta = yield this.fetchColumnMetadata(root);
                    if (!rootMeta || !this.isVariantColumnType(rootMeta.type)) {
                        continue;
                    }
                    (paths || []).slice(0, 200).forEach((path)=>{
                        if (!path.length) {
                            return;
                        }
                        const expression = sqlstring_browser.format(`??${Array(path.length).fill('[?]').join('')}`, [
                            root,
                            ...path
                        ]);
                        implicitTargets.push({
                            column: expression,
                            sourceColumn: root,
                            propertyType: JSDataType.Variant,
                            supportsTextSearch: false,
                            exactVariantValue: true
                        });
                    });
                }
                return {
                    column: expressions.length === 0 || implicitTargets.length === 0 ? undefined : expressions.length > 1 ? `concatWithSeparator(';',${expressions.join(',')})` : this.implicitColumnExpression,
                    propertyType: JSDataType.String,
                    supportsTextSearch: undefined,
                    sourceColumn: undefined,
                    implicitTargets,
                    found: true
                };
            }
            const expression = yield this.buildColumnExpressionFromField(field);
            const propertyType = (_convertCHTypeToPrimitiveJSType = convertCHTypeToPrimitiveJSType(expression.columnType)) !== null && _convertCHTypeToPrimitiveJSType !== void 0 ? _convertCHTypeToPrimitiveJSType : undefined;
            let supportsTextSearch;
            if ((propertyType === JSDataType.String || propertyType === JSDataType.JSON || propertyType === JSDataType.Variant) && expression.sourceColumn && (expression.columnExpression === expression.sourceColumn || expression.variantRoot !== undefined)) {
                supportsTextSearch = yield this.columnHasInvertedIndex(expression.sourceColumn);
            } else if (propertyType === JSDataType.String || propertyType === JSDataType.JSON || propertyType === JSDataType.Variant) {
                supportsTextSearch = false;
            }
            return {
                column: expression.columnExpression,
                propertyType,
                supportsTextSearch,
                sourceColumn: expression.sourceColumn,
                implicitTargets: undefined,
                variantRoot: expression.variantRoot,
                json: expression.json,
                found: expression.found
            };
        }).call(this);
    }
    extractFieldNamesFromExpression(expression) {
        const matches = expression.match(/`([^`]+)`/g);
        if (!matches) {
            return [];
        }
        return matches.map((match)=>match.slice(1, -1));
    }
    constructor({ metadata, databaseName, tableName, connectionId, implicitColumnExpression, datasourceType, supportsTryCast = true, supportsJsonSearch = true, columnMeta, variantImplicitPaths }){
        var _ref;
        super(), serializers_define_property(this, "tableName", void 0), serializers_define_property(this, "databaseName", void 0), serializers_define_property(this, "implicitColumnExpression", void 0), serializers_define_property(this, "connectionId", void 0), serializers_define_property(this, "datasourceType", void 0), serializers_define_property(this, "legacyMetadataProvider", void 0), serializers_define_property(this, "columnMetadataCache", new Map()), serializers_define_property(this, "invertedIndexColumns", void 0), serializers_define_property(this, "invertedIndexColumnsPromise", void 0), serializers_define_property(this, "providedColumnMetadata", new Map()), serializers_define_property(this, "variantImplicitPaths", {}), serializers_define_property(this, "hasProvidedColumnMetadata", false);
        this.legacyMetadataProvider = metadata;
        this.databaseName = databaseName;
        this.tableName = tableName;
        this.implicitColumnExpression = implicitColumnExpression;
        this.connectionId = connectionId;
        this.datasourceType = datasourceType;
        this.supportsTryCast = supportsTryCast;
        this.supportsJsonSearch = supportsJsonSearch;
        this.variantImplicitPaths = variantImplicitPaths !== null && variantImplicitPaths !== void 0 ? variantImplicitPaths : {};
        this.hasProvidedColumnMetadata = Boolean(columnMeta);
        for (const column of (_ref = columnMeta === null || columnMeta === void 0 ? void 0 : columnMeta.columns) !== null && _ref !== void 0 ? _ref : []){
            this.providedColumnMetadata.set(column.name.toLowerCase(), {
                name: column.name,
                type: (0,column_types/* normalizeColumnType */.a)({
                    columnType: column.type
                }) || 'Unknown'
            });
        }
        if (columnMeta) {
            this.invertedIndexColumns = new Set(columnMeta.invertedIndexColumns.map((name)=>name.toLowerCase()));
        }
    }
}

;// ./utils/query-parser/ast.ts
/* unused harmony import specifier */ var logWarning;
/* unused harmony import specifier */ var ast_EnglishSerializer;
/* unused harmony import specifier */ var toError;
function ast_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function ast_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                ast_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                ast_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}







function parse(query) {
    return lucene/* parse */.qg(encodeSpecialTokens(encodeVariantLiteralFieldPaths(normalizeLuceneSingleQuotedValues(query))));
}
/**
 * SEARCH's Lucene mode can preserve explicit text field queries, but it does
 * not replace this parser's typed comparisons, ranges, existence checks, or
 * implicit-field expansion. Keep those on the SQL serializer path.
 */ function canUseDorisSearch(ast) {
    const candidate = ast;
    if (candidate.term != null) {
        var _candidate_field, _candidate_term;
        const field = String((_candidate_field = candidate.field) !== null && _candidate_field !== void 0 ? _candidate_field : '');
        const term = String((_candidate_term = candidate.term) !== null && _candidate_term !== void 0 ? _candidate_term : '');
        return Boolean(field && field !== IMPLICIT_FIELD && !field.startsWith('-') && !field.includes('[') && !field.includes(']') && !candidate.regex && candidate.similarity == null && candidate.proximity == null && candidate.boost == null && !term.includes('?') && term !== '*' && (candidate.quoted || !/^(?:[<>]=?|\d|true\b|false\b)/iu.test(term)));
    }
    if (candidate.inclusive != null || candidate.term_min != null) {
        return false;
    }
    if (candidate.right != null) {
        return (candidate.operator === 'AND' || candidate.operator === 'OR' || candidate.operator === '&&' || candidate.operator === '||') && canUseDorisSearch(candidate.left) && canUseDorisSearch(candidate.right);
    }
    if (candidate.left != null) {
        // Unary negation and leading modifiers have different semantics in
        // Doris Lucene mode, so only accept a plain single child.
        return candidate.start === undefined && canUseDorisSearch(candidate.left);
    }
    return false;
}
function nodeTerm(node, serializer) {
    return ast_async_to_generator(function*() {
        const field = node.field[0] === '-' ? node.field.slice(1) : node.field;
        let isNegatedField = node.field[0] === '-';
        const isImplicitField = node.field === IMPLICIT_FIELD;
        if (node.term != null) {
            const nodeTermInstance = node;
            if (nodeTermInstance.regex) {
                throw new Error((0,i18n.t)('Lucene regular-expression queries are not supported.'));
            }
            if (nodeTermInstance.similarity != null) {
                throw new Error((0,i18n.t)('Lucene fuzzy queries are not supported.'));
            }
            if (nodeTermInstance.proximity != null) {
                throw new Error((0,i18n.t)('Lucene proximity queries are not supported.'));
            }
            if (nodeTermInstance.boost != null) {
                throw new Error((0,i18n.t)('Lucene boost queries are not supported.'));
            }
            if (nodeTermInstance.term.includes('?')) {
                throw new Error((0,i18n.t)('Lucene single-character wildcards (?) are not supported.'));
            }
            let term = decodeSpecialTokens(nodeTermInstance.term);
            if (isImplicitField && nodeTermInstance.prefix === '-') {
                isNegatedField = true;
            }
            if (!isImplicitField && nodeTermInstance.prefix === '-') {
                term = nodeTermInstance.prefix + decodeSpecialTokens(nodeTermInstance.term);
            }
            if (field === '_exists_') {
                return serializer.isNotNull(term, isNegatedField);
            }
            if (nodeTermInstance.quoted && !isImplicitField) {
                return serializer.eq(field, term, isNegatedField);
            }
            if (!nodeTermInstance.quoted && term === '*') {
                return serializer.isNotNull(field, isNegatedField);
            }
            if (!nodeTermInstance.quoted && term.substring(0, 2) === '>=') {
                if (isNegatedField) {
                    return serializer.lt(field, term.slice(2));
                }
                return serializer.gte(field, term.slice(2));
            }
            if (!nodeTermInstance.quoted && term.substring(0, 2) === '<=') {
                if (isNegatedField) {
                    return serializer.gt(field, term.slice(2));
                }
                return serializer.lte(field, term.slice(2));
            }
            if (!nodeTermInstance.quoted && term[0] === '>') {
                if (isNegatedField) {
                    return serializer.lte(field, term.slice(1));
                }
                return serializer.gt(field, term.slice(1));
            }
            if (!nodeTermInstance.quoted && term[0] === '<') {
                if (isNegatedField) {
                    return serializer.gte(field, term.slice(1));
                }
                return serializer.lt(field, term.slice(1));
            }
            let prefixWildcard = false;
            let suffixWildcard = false;
            if (!nodeTermInstance.quoted && term[0] === '*') {
                prefixWildcard = true;
                term = term.slice(1);
            }
            if (!nodeTermInstance.quoted && term[term.length - 1] === '*') {
                suffixWildcard = true;
                term = term.slice(0, -1);
            }
            return serializer.fieldSearch(field, term, isNegatedField, prefixWildcard, suffixWildcard, Boolean(nodeTermInstance.quoted));
        }
        if (node.inclusive != null) {
            const rangedTerm = node;
            return serializer.range(field, rangedTerm.term_min, rangedTerm.term_max, isNegatedField);
        }
        throw new Error((0,i18n.t)('Unexpected Node type. {{node}}', {
            node
        }));
    })();
}
function serialize(ast, serializer) {
    return ast_async_to_generator(function*() {
        if (ast.term != null) {
            return yield nodeTerm(ast, serializer);
        }
        if (ast.inclusive != null) {
            return yield nodeTerm(ast, serializer);
        }
        if (ast.right != null) {
            const binaryAST = ast;
            const operator = serializer.operator(binaryAST.operator);
            const parenthesized = binaryAST.parenthesized;
            return `${parenthesized ? '(' : ''}${yield serialize(binaryAST.left, serializer)} ${operator} ${yield serialize(binaryAST.right, serializer)}${parenthesized ? ')' : ''}`;
        }
        if (ast.left != null) {
            const leftOnlyAST = ast;
            const parenthesized = leftOnlyAST.parenthesized;
            return `${parenthesized ? '(' : ''}${leftOnlyAST.start !== undefined ? `${leftOnlyAST.start} ` : ''}${yield serialize(leftOnlyAST.left, serializer)}${parenthesized ? ')' : ''}`;
        }
        return '';
    })();
}
function genWhereSQL(ast, serializer) {
    return ast_async_to_generator(function*() {
        return yield serialize(ast, serializer);
    })();
}
function genEnglishExplanation(query) {
    return ast_async_to_generator(function*() {
        try {
            const parsedQ = parse(query);
            if (parsedQ) {
                const serializer = new ast_EnglishSerializer();
                return yield serialize(parsedQ, serializer);
            }
        } catch (e) {
            const error = toError(e);
            logWarning('Lucene parse failure', {
                source: 'query-parser',
                query,
                error: error.message
            });
        }
        return `Message containing ${query}`;
    })();
}

;// ./utils/query-parser/lucene-index-warning.ts


function normalizeName(name) {
    return String(name !== null && name !== void 0 ? name : '').trim().toLowerCase();
}
function normalizeLuceneField(field) {
    const normalized = String(field !== null && field !== void 0 ? field : '').trim();
    return normalized[0] === '-' ? normalized.slice(1) : normalized;
}
function isNodeTerm(ast) {
    return ast.term != null;
}
function isNodeRangedTerm(ast) {
    return ast.inclusive != null;
}
function isBinaryAST(ast) {
    return ast.right != null;
}
function isLeftOnlyAST(ast) {
    return ast.left != null;
}
function isTextSearchTerm(node) {
    var _node_term;
    const term = String((_node_term = node.term) !== null && _node_term !== void 0 ? _node_term : '').trim();
    if (!term || term === '*') {
        return false;
    }
    if (!node.quoted && /^(>=|<=|>|<)/.test(term)) {
        return false;
    }
    return true;
}
function collectTextSearchFields(ast, fields) {
    if (isNodeTerm(ast)) {
        const field = normalizeLuceneField(ast.field);
        if (field && field !== IMPLICIT_FIELD && isTextSearchTerm(ast)) {
            fields.add(field);
        }
        return;
    }
    if (isNodeRangedTerm(ast)) {
        return;
    }
    if (isBinaryAST(ast)) {
        collectTextSearchFields(ast.left, fields);
        collectTextSearchFields(ast.right, fields);
        return;
    }
    if (isLeftOnlyAST(ast)) {
        collectTextSearchFields(ast.left, fields);
    }
}
function hasInvertedIndex(field, indexes, tableFields) {
    var _rootMetadata_Type, _ref, _rootMetadata_Type1;
    const normalizedField = normalizeName(field);
    const hasIndexForColumn = (column)=>indexes.some((index)=>{
            var _ref, _ref1, _ref2, _ref3;
            const indexType = String((_ref = index === null || index === void 0 ? void 0 : index.type) !== null && _ref !== void 0 ? _ref : '').toUpperCase();
            if (!indexType.includes('INVERT')) {
                return false;
            }
            const indexedColumn = normalizeName((_ref1 = (_ref2 = (_ref3 = index === null || index === void 0 ? void 0 : index.columnName) !== null && _ref3 !== void 0 ? _ref3 : index === null || index === void 0 ? void 0 : index.Field) !== null && _ref2 !== void 0 ? _ref2 : index === null || index === void 0 ? void 0 : index.field) !== null && _ref1 !== void 0 ? _ref1 : index === null || index === void 0 ? void 0 : index.value);
            return indexedColumn === normalizeName(column);
        });
    if (hasIndexForColumn(normalizedField)) {
        return true;
    }
    // Doris builds a VARIANT inverted index for its subpaths as well. A Lucene
    // field such as `resource_attributes.app` therefore inherits the inverted
    // index declared on the `resource_attributes` root column.
    const rootField = field.split('.')[0];
    if (normalizeName(rootField) === normalizedField) {
        return false;
    }
    const rootMetadata = tableFields.find((item)=>{
        var _ref, _ref1;
        return normalizeName((_ref = (_ref1 = item === null || item === void 0 ? void 0 : item.Field) !== null && _ref1 !== void 0 ? _ref1 : item === null || item === void 0 ? void 0 : item.field) !== null && _ref !== void 0 ? _ref : item === null || item === void 0 ? void 0 : item.value) === normalizeName(rootField);
    });
    return Boolean(rootMetadata && getPrimitiveFieldType((_rootMetadata_Type = rootMetadata.Type) !== null && _rootMetadata_Type !== void 0 ? _rootMetadata_Type : rootMetadata.type) === 'TEXT' && String((_ref = (_rootMetadata_Type1 = rootMetadata.Type) !== null && _rootMetadata_Type1 !== void 0 ? _rootMetadata_Type1 : rootMetadata.type) !== null && _ref !== void 0 ? _ref : '').toUpperCase().includes('VARIANT') && hasIndexForColumn(rootField));
}
function findFieldMetadata(field, tableFields) {
    const normalizedField = normalizeName(field);
    const directMatch = tableFields.find((item)=>{
        var _ref, _ref1;
        return normalizeName((_ref = (_ref1 = item === null || item === void 0 ? void 0 : item.Field) !== null && _ref1 !== void 0 ? _ref1 : item === null || item === void 0 ? void 0 : item.field) !== null && _ref !== void 0 ? _ref : item === null || item === void 0 ? void 0 : item.value) === normalizedField;
    });
    if (directMatch) {
        return directMatch;
    }
    const fieldPrefix = normalizeName(field.split('.')[0]);
    return tableFields.find((item)=>{
        var _ref, _ref1;
        return normalizeName((_ref = (_ref1 = item === null || item === void 0 ? void 0 : item.Field) !== null && _ref1 !== void 0 ? _ref1 : item === null || item === void 0 ? void 0 : item.field) !== null && _ref !== void 0 ? _ref : item === null || item === void 0 ? void 0 : item.value) === fieldPrefix;
    });
}
function getPrimitiveFieldType(columnType) {
    if (!columnType) {
        return '';
    }
    const normalizedType = columnType.toUpperCase();
    if ([
        'INT',
        'LARGEINT',
        'SMALLINT',
        'TINYINT',
        'DECIMAL',
        'BIGINT',
        'FLOAT',
        'DOUBLE'
    ].some((type)=>normalizedType.includes(type))) {
        return 'NUMBER';
    }
    if ([
        'DATE',
        'DATETIME',
        'DATEV2',
        'DATETIMEV2'
    ].some((type)=>normalizedType.includes(type))) {
        return 'DATE';
    }
    if (normalizedType.includes('BOOLEAN')) {
        return 'BOOLEAN';
    }
    if ([
        'VARCHAR',
        'STRING',
        'CHAR',
        'TEXT',
        'JSONB',
        'ARRAY',
        'VARIANT'
    ].some((type)=>normalizedType.includes(type))) {
        return 'TEXT';
    }
    return '';
}
function shouldWarnForField(field, tableFields) {
    var _metadata_Type;
    const metadata = findFieldMetadata(field, tableFields);
    if (!metadata) {
        return true;
    }
    const fieldType = getPrimitiveFieldType((_metadata_Type = metadata.Type) !== null && _metadata_Type !== void 0 ? _metadata_Type : metadata.type);
    return fieldType !== 'NUMBER' && fieldType !== 'DATE' && fieldType !== 'BOOLEAN';
}
function getLuceneFieldsWithoutInvertedIndex(query, indexes, tableFields) {
    const trimmedQuery = query === null || query === void 0 ? void 0 : query.trim();
    if (!trimmedQuery || !indexes.length && !tableFields.length) {
        return [];
    }
    try {
        const ast = parse(trimmedQuery);
        const fields = new Set();
        collectTextSearchFields(ast, fields);
        return Array.from(fields).filter((field)=>shouldWarnForField(field, tableFields) && !hasInvertedIndex(field, indexes, tableFields));
    } catch (error) {
        return [];
    }
}

// EXTERNAL MODULE: ./hooks/useDatasourcePermissions.ts
var useDatasourcePermissions = __webpack_require__(9693);
;// ./utils/discover-share-state.ts
function discover_share_state_define_property(obj, key, value) {
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
function discover_share_state_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            discover_share_state_define_property(target, key, source[key]);
        });
    }
    return target;
}
const DISCOVER_SHARE_STATE_PARAM = 'discoverState';
const DISCOVER_SHARE_STATE_VERSION = 1;
function isRecord(value) {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
function isMode(value) {
    return value === 'SQL' || value === 'Search' || value === 'Lucene';
}
function encodeDiscoverShareState(state) {
    return encodeURIComponent(JSON.stringify(state));
}
function decodeDiscoverShareState(value) {
    if (!value) {
        return undefined;
    }
    try {
        const parsed = JSON.parse(decodeURIComponent(value));
        if (!isRecord(parsed) || parsed.version !== DISCOVER_SHARE_STATE_VERSION) {
            return undefined;
        }
        if (!Array.isArray(parsed.filters) || !Array.isArray(parsed.selectedFields) || !Array.isArray(parsed.columnOrder) || !isRecord(parsed.sort)) {
            return undefined;
        }
        return {
            version: DISCOVER_SHARE_STATE_VERSION,
            datasource: typeof parsed.datasource === 'string' ? parsed.datasource : undefined,
            database: typeof parsed.database === 'string' ? parsed.database : undefined,
            table: typeof parsed.table === 'string' ? parsed.table : undefined,
            timeField: typeof parsed.timeField === 'string' ? parsed.timeField : undefined,
            timeZone: typeof parsed.timeZone === 'string' ? parsed.timeZone : undefined,
            timeRawFrom: typeof parsed.timeRawFrom === 'string' ? parsed.timeRawFrom : undefined,
            timeRawTo: typeof parsed.timeRawTo === 'string' ? parsed.timeRawTo : undefined,
            startTime: typeof parsed.startTime === 'string' ? parsed.startTime : undefined,
            endTime: typeof parsed.endTime === 'string' ? parsed.endTime : undefined,
            mode: isMode(parsed.mode) ? parsed.mode : undefined,
            query: typeof parsed.query === 'string' ? parsed.query : undefined,
            filters: parsed.filters.filter(isRecord).filter((item)=>typeof item.id === 'string' && typeof item.fieldName === 'string' && typeof item.operator === 'string' && Array.isArray(item.value)).map((item)=>discover_share_state_object_spread({}, item)),
            selectedFields: parsed.selectedFields.filter(isRecord).filter((item)=>typeof item.Field === 'string').map((item)=>({
                    Field: item.Field,
                    Type: typeof item.Type === 'string' ? item.Type : undefined,
                    variantPath: Array.isArray(item.variantPath) ? item.variantPath.filter((value)=>typeof value === 'string') : undefined,
                    variantKey: typeof item.variantKey === 'string' ? item.variantKey : undefined
                })),
            columnOrder: parsed.columnOrder.filter((item)=>typeof item === 'string'),
            sort: {
                field: typeof parsed.sort.field === 'string' ? parsed.sort.field : '',
                direction: parsed.sort.direction === 'ASC' ? 'ASC' : 'DESC',
                variantPath: Array.isArray(parsed.sort.variantPath) ? parsed.sort.variantPath.filter((item)=>typeof item === 'string') : undefined,
                variantType: typeof parsed.sort.variantType === 'string' ? parsed.sort.variantType : undefined
            }
        };
    } catch (unused) {
        return undefined;
    }
}
function readDiscoverShareState(searchParams) {
    return decodeDiscoverShareState(searchParams.get(DISCOVER_SHARE_STATE_PARAM));
}

;// ./utils/saved-query-state.ts
function saved_query_state_define_property(obj, key, value) {
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
function saved_query_state_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            saved_query_state_define_property(target, key, source[key]);
        });
    }
    return target;
}
function saved_query_state_ownKeys(object, enumerableOnly) {
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
function saved_query_state_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        saved_query_state_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}


const record = (v)=>Boolean(v) && typeof v === 'object' && !Array.isArray(v);
const stringArray = (v)=>Array.isArray(v) && v.every((x)=>typeof x === 'string');
/** Unlike legacy URL decoding, saved snapshots must not silently lose filters. */ function validateSavedQueryState(value) {
    var _value_timeRawFrom, _value_timeRawTo;
    if (!record(value) || value.version !== DISCOVER_SHARE_STATE_VERSION) {
        throw new Error((0,i18n.t)('Unsupported Discover state version'));
    }
    for (const key of [
        'datasource',
        'database',
        'table',
        'timeField',
        'timeZone'
    ]){
        if (typeof value[key] !== 'string' || !value[key].trim()) {
            throw new Error((0,i18n.t)('A valid {{field}} is required', {
                field: key
            }));
        }
    }
    if (![
        'SQL',
        'Search',
        'Lucene'
    ].includes(value.mode)) {
        throw new Error((0,i18n.t)('Invalid query mode'));
    }
    for (const key of [
        'query',
        'timeRawFrom',
        'timeRawTo',
        'startTime',
        'endTime'
    ]){
        if (value[key] !== undefined && typeof value[key] !== 'string') {
            throw new Error((0,i18n.t)('Invalid {{field}}', {
                field: key
            }));
        }
    }
    const relative = ((_value_timeRawFrom = value.timeRawFrom) === null || _value_timeRawFrom === void 0 ? void 0 : _value_timeRawFrom.startsWith('now')) && ((_value_timeRawTo = value.timeRawTo) === null || _value_timeRawTo === void 0 ? void 0 : _value_timeRawTo.startsWith('now'));
    if (!relative && !(value.startTime && value.endTime)) {
        throw new Error((0,i18n.t)('A complete time range is required'));
    }
    const operators = [
        '=',
        '!=',
        'in',
        'not in',
        'is null',
        'is not null',
        'between',
        'not between',
        'like',
        'not like',
        'match_all',
        'match_any',
        'match_phrase',
        'match_phrase_prefix'
    ];
    const optionalPath = (x)=>x.variantPath === undefined || stringArray(x.variantPath);
    const optionalText = (x, keys)=>keys.every((key)=>x[key] === undefined || typeof x[key] === 'string');
    if (!Array.isArray(value.filters) || !value.filters.every((f)=>record(f) && [
            'id',
            'fieldName',
            'operator'
        ].every((key)=>typeof f[key] === 'string' && f[key]) && operators.includes(f.operator) && Array.isArray(f.value) && f.value.every((v)=>[
                'string',
                'number',
                'boolean'
            ].includes(typeof v)) && optionalPath(f) && optionalText(f, [
            'variantKey',
            'variantRootType',
            'fieldType',
            'label'
        ]))) {
        throw new Error((0,i18n.t)('Invalid saved filters'));
    }
    if (!Array.isArray(value.selectedFields) || !value.selectedFields.every((f)=>record(f) && typeof f.Field === 'string' && f.Field && optionalPath(f) && optionalText(f, [
            'Type',
            'variantKey'
        ]))) {
        throw new Error((0,i18n.t)('Invalid selected fields'));
    }
    if (!stringArray(value.columnOrder)) {
        throw new Error((0,i18n.t)('Invalid column order'));
    }
    if (!record(value.sort) || typeof value.sort.field !== 'string' || ![
        'ASC',
        'DESC'
    ].includes(value.sort.direction) || !optionalPath(value.sort) || !optionalText(value.sort, [
        'variantType'
    ])) {
        throw new Error((0,i18n.t)('Invalid saved sort'));
    }
    return value;
}
/** Object key order and omitted optional fields do not make a query dirty. */ function snapshotKey(state) {
    const normalize = (value)=>Array.isArray(value) ? value.map(normalize) : record(value) ? Object.fromEntries(Object.keys(value).sort().filter((key)=>value[key] !== undefined).map((key)=>[
                key,
                normalize(value[key])
            ])) : value;
    return JSON.stringify(normalize(saved_query_state_object_spread_props(saved_query_state_object_spread({}, state), {
        query: state.query || '',
        // Discover resolves an empty initial sort to the time field in an
        // effect. That initialization is not an unsaved user modification.
        sort: state.sort.field ? state.sort : {
            field: state.timeField || '',
            direction: 'DESC'
        }
    })));
}

;// ./services/saved-queries.ts
function saved_queries_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function saved_queries_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                saved_queries_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                saved_queries_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}




const base = '/api/plugins/velodb-doris-app/resources/saved-queries';
function request(method, path = '', data) {
    return saved_queries_async_to_generator(function*() {
        if (data === null || data === void 0 ? void 0 : data.state) {
            validateSavedQueryState(data.state);
        }
        if ((data === null || data === void 0 ? void 0 : data.name) !== undefined && (!data.name.trim() || Array.from(data.name.trim()).length > 120)) {
            throw new Error((0,i18n.t)('Name must contain 1–120 characters'));
        }
        if ((data === null || data === void 0 ? void 0 : data.description) && Array.from(data.description.trim()).length > 2000) {
            throw new Error((0,i18n.t)('Description exceeds 2000 characters'));
        }
        if (data && new Blob([
            JSON.stringify(data)
        ]).size > 1024 * 1024) {
            throw new Error((0,i18n.t)('Saved query exceeds 1 MiB'));
        }
        try {
            const response = yield (0,external_rxjs_.lastValueFrom)((0,runtime_.getBackendSrv)().fetch({
                url: base + path,
                method,
                data,
                // Grafana does not default DELETE bodies to JSON.
                headers: data ? {
                    'Content-Type': 'application/json'
                } : undefined,
                showErrorAlert: false
            }));
            return response.data;
        } catch (error) {
            var _error_data;
            throw new Error((error === null || error === void 0 ? void 0 : error.status) === 409 ? (0,i18n.t)('This query changed. Reload it before trying again; your changes have not been saved.') : (error === null || error === void 0 ? void 0 : (_error_data = error.data) === null || _error_data === void 0 ? void 0 : _error_data.message) || (error === null || error === void 0 ? void 0 : error.message) || (0,i18n.t)('Saved queries are unavailable'));
        }
    })();
}
const savedQueries = {
    list: (search = '', page = 1)=>request('GET', `?${new URLSearchParams({
            search,
            page: String(page),
            pageSize: '20'
        })}`),
    get: (id)=>request('GET', `/${encodeURIComponent(id)}`),
    create: (input)=>request('POST', '', input),
    update: (id, input)=>request('PUT', `/${encodeURIComponent(id)}`, input),
    delete: (id, revision)=>request('DELETE', `/${encodeURIComponent(id)}`, {
            revision
        })
};

// EXTERNAL MODULE: ../node_modules/jotai/esm/vanilla.mjs
var vanilla = __webpack_require__(4945);
;// ./store/discover-snapshot.ts




/** One snapshot representation for sharing and saving; never read it from the URL. */ const discoverSnapshotAtom = (0,vanilla/* atom */.eU)((get)=>{
    var _get;
    const raw = (_get = get(discover/* timeRangeAtom */.U9)) === null || _get === void 0 ? void 0 : _get.raw;
    const relative = typeof (raw === null || raw === void 0 ? void 0 : raw.from) === 'string' && typeof (raw === null || raw === void 0 ? void 0 : raw.to) === 'string' && raw.from.startsWith('now') && raw.to.startsWith('now');
    const dates = get(discover/* currentDateAtom */.Zb);
    const ds = get(discover/* selectedDatasourceAtom */.SW);
    return {
        version: DISCOVER_SHARE_STATE_VERSION,
        datasource: (ds === null || ds === void 0 ? void 0 : ds.uid) || (ds === null || ds === void 0 ? void 0 : ds.name),
        database: get(discover/* currentDatabaseAtom */.Cf),
        table: get(discover/* currentTableAtom */.$w),
        timeField: get(discover/* currentTimeFieldAtom */.CA),
        timeZone: get(discover/* timeZoneAtom */.tF),
        mode: get(discover/* searchTypeAtom */.WM),
        query: get(discover/* searchValueAtom */.P8),
        timeRawFrom: relative ? raw.from : undefined,
        timeRawTo: relative ? raw.to : undefined,
        startTime: relative || !dates[0] ? undefined : (0,utils_time/* formatShareTime */.yK)(dates[0]),
        endTime: relative || !dates[1] ? undefined : (0,utils_time/* formatShareTime */.yK)(dates[1]),
        filters: get(discover/* dataFilterAtom */.EA),
        selectedFields: get(discover/* selectedFieldsAtom */.Wg).map((field)=>({
                Field: field.Field,
                Type: field.Type,
                variantPath: field.variantPath,
                variantKey: field.variantKey
            })),
        columnOrder: get(discover/* discoverSharedColumnOrderAtom */.G9),
        sort: get(discover/* discoverSortAtom */.V3)
    };
});
const discoverRestoreEpochAtom = (0,vanilla/* atom */.eU)(0);
const discoverRestoreErrorAtom = (0,vanilla/* atom */.eU)('');
const discoverRestoreWarningAtom = (0,vanilla/* atom */.eU)('');

;// ./components/saved-queries/saved-queries.styles.ts

const getSavedQueriesStyles = (theme)=>({
        drawerBody: (0,css_.css)({
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
            minWidth: 0
        }),
        listSummary: (0,css_.css)({
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: theme.spacing(1),
            color: theme.colors.text.secondary,
            fontSize: theme.typography.bodySmall.fontSize
        }),
        list: (0,css_.css)({
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(1),
            listStyle: 'none',
            padding: 0,
            margin: 0
        }),
        card: (0,css_.css)({
            marginBottom: 0,
            minWidth: 0,
            gridTemplateColumns: 'auto minmax(0, 1fr) auto'
        }),
        heading: (0,css_.css)({
            minWidth: 0,
            overflowWrap: 'anywhere'
        }),
        tags: (0,css_.css)({
            alignSelf: 'start'
        }),
        actions: (0,css_.css)({
            position: 'relative',
            zIndex: 1
        }),
        description: (0,css_.css)({
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            overflowWrap: 'anywhere'
        }),
        metadata: (0,css_.css)({
            flexWrap: 'wrap',
            minWidth: 0
        }),
        empty: (0,css_.css)({
            '> div': {
                minWidth: 0,
                marginBottom: 0
            }
        }),
        modal: (0,css_.css)({
            width: 560,
            maxWidth: `calc(100vw - ${theme.spacing(4)})`
        })
    });

;// ./components/saved-queries/index.tsx
function components_saved_queries_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function components_saved_queries_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                components_saved_queries_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                components_saved_queries_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function saved_queries_define_property(obj, key, value) {
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
function saved_queries_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            saved_queries_define_property(target, key, source[key]);
        });
    }
    return target;
}
function saved_queries_ownKeys(object, enumerableOnly) {
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
function saved_queries_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        saved_queries_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}










function SavedQueries({ snapshot, ready, restore }) {
    var _config_bootData_user, _config_bootData, _editor_target, _editor_target1, _editor_source;
    const store = (0,react/* useStore */.Pj)();
    const theme = (0,ui_.useTheme2)();
    const styles = (0,ui_.useStyles2)(getSavedQueriesStyles);
    const [open, setOpen] = (0,external_react_.useState)(false);
    const [search, setSearch] = (0,external_react_.useState)('');
    const [page, setPage] = (0,external_react_.useState)(1);
    const [items, setItems] = (0,external_react_.useState)([]);
    const [total, setTotal] = (0,external_react_.useState)(0);
    const [canCreate, setCanCreate] = (0,external_react_.useState)([
        'Editor',
        'Admin'
    ].includes(((_config_bootData = runtime_.config.bootData) === null || _config_bootData === void 0 ? void 0 : (_config_bootData_user = _config_bootData.user) === null || _config_bootData_user === void 0 ? void 0 : _config_bootData_user.orgRole) || ''));
    const [loading, setLoading] = (0,external_react_.useState)(false);
    const [busy, setBusy] = (0,external_react_.useState)(false);
    const [error, setError] = (0,external_react_.useState)('');
    const [editorError, setEditorError] = (0,external_react_.useState)('');
    const [editor, setEditor] = (0,external_react_.useState)();
    const [confirmation, setConfirmation] = (0,external_react_.useState)();
    const nameInput = (0,external_react_.useRef)(null);
    const searchInput = (0,external_react_.useRef)(null);
    const confirmationCancel = (0,external_react_.useRef)(null);
    const editorTrigger = (0,external_react_.useRef)(null);
    const isEditing = Boolean(editor);
    const isDialogOpen = isEditing || Boolean(confirmation);
    const [active, setActive] = (0,external_react_.useState)();
    const [baseline, setBaseline] = (0,external_react_.useState)('');
    const [reload, setReload] = (0,external_react_.useState)(0);
    const initial = (0,external_react_.useRef)(undefined);
    (0,external_react_.useEffect)(()=>{
        // Let the modal capture the trigger before moving focus into the form.
        if (isEditing) {
            var _nameInput_current;
            (_nameInput_current = nameInput.current) === null || _nameInput_current === void 0 ? void 0 : _nameInput_current.focus();
        } else if (isDialogOpen) {
            var _confirmationCancel_current;
            (_confirmationCancel_current = confirmationCancel.current) === null || _confirmationCancel_current === void 0 ? void 0 : _confirmationCancel_current.focus();
        } else if (editorTrigger.current) {
            // Restore focus after the tooltip/drawer and modal finish updating.
            const frame = window.requestAnimationFrame(()=>{
                var _editorTrigger_current;
                if ((_editorTrigger_current = editorTrigger.current) === null || _editorTrigger_current === void 0 ? void 0 : _editorTrigger_current.isConnected) {
                    editorTrigger.current.focus();
                } else {
                    var _searchInput_current;
                    (_searchInput_current = searchInput.current) === null || _searchInput_current === void 0 ? void 0 : _searchInput_current.focus();
                }
            });
            return ()=>window.cancelAnimationFrame(frame);
        }
        return undefined;
    }, [
        isEditing,
        isDialogOpen
    ]);
    (0,external_react_.useEffect)(()=>{
        if (open) {
            var _searchInput_current;
            (_searchInput_current = searchInput.current) === null || _searchInput_current === void 0 ? void 0 : _searchInput_current.focus();
        }
    }, [
        open
    ]);
    if (ready && initial.current === undefined) {
        initial.current = snapshotKey(snapshot);
    }
    const dirty = initial.current !== undefined && snapshotKey(snapshot) !== (active ? baseline : initial.current);
    const mounted = (0,external_react_.useRef)(true);
    (0,external_react_.useEffect)(()=>{
        mounted.current = true;
        return ()=>{
            mounted.current = false;
        };
    }, []);
    (0,external_react_.useEffect)(()=>{
        // The server is authoritative; the boot role only avoids a disabled
        // button while loading capabilities on the first render.
        let cancelled = false;
        void savedQueries.list('', 1).then((result)=>{
            if (!cancelled) {
                setCanCreate(result.canCreate);
            }
        }).catch(()=>undefined);
        return ()=>{
            cancelled = true;
        };
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (!open) {
            return;
        }
        let cancelled = false;
        setLoading(true);
        const timer = window.setTimeout(()=>{
            void savedQueries.list(search, page).then((result)=>{
                if (cancelled) {
                    return;
                }
                setItems(result.items);
                setTotal(result.total);
                setCanCreate(result.canCreate);
                setError('');
                if (page > 1 && !result.items.length) {
                    setPage(Math.max(1, Math.ceil(result.total / 20)));
                }
            }).catch((error)=>{
                if (!cancelled) {
                    setError(error.message);
                }
            }).finally(()=>{
                if (!cancelled) {
                    setLoading(false);
                }
            });
        }, 200);
        return ()=>{
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [
        open,
        search,
        page,
        reload
    ]);
    const beginSave = (kind)=>{
        try {
            validateSavedQueryState(snapshot);
        } catch (error) {
            setError(error.message);
            setOpen(true);
            return;
        }
        setEditorError('');
        setEditor({
            kind,
            name: (active === null || active === void 0 ? void 0 : active.name) || '',
            description: (active === null || active === void 0 ? void 0 : active.description) || '',
            target: kind === 'update' ? active : undefined,
            source: active,
            snapshot,
            snapshotChanged: dirty
        });
    };
    const unchanged = (editor === null || editor === void 0 ? void 0 : editor.kind) === 'update' && !editor.snapshotChanged && editor.name.trim() === ((_editor_target = editor.target) === null || _editor_target === void 0 ? void 0 : _editor_target.name) && editor.description.trim() === ((_editor_target1 = editor.target) === null || _editor_target1 === void 0 ? void 0 : _editor_target1.description);
    const save = ()=>components_saved_queries_async_to_generator(function*() {
            if (!editor || busy || unchanged || !editor.name.trim()) {
                return;
            }
            setBusy(true);
            setEditorError('');
            try {
                const input = {
                    name: editor.name.trim(),
                    description: editor.description.trim(),
                    state: editor.kind === 'rename' ? undefined : editor.snapshot
                };
                const result = editor.target ? yield savedQueries.update(editor.target.id, saved_queries_object_spread_props(saved_queries_object_spread({}, input), {
                    revision: editor.target.revision
                })) : yield savedQueries.create(input);
                if (!mounted.current) {
                    return;
                }
                if (editor.kind !== 'rename') {
                    setActive(result);
                    setBaseline(snapshotKey(result.state));
                } else {
                    setActive((previous)=>{
                        var _editor_target;
                        return (previous === null || previous === void 0 ? void 0 : previous.id) === result.id ? saved_queries_object_spread_props(saved_queries_object_spread({}, previous), {
                            name: result.name,
                            description: result.description,
                            // Renaming a newer list revision must not authorize
                            // overwriting a state change this editor never loaded.
                            revision: previous.revision === ((_editor_target = editor.target) === null || _editor_target === void 0 ? void 0 : _editor_target.revision) ? result.revision : previous.revision,
                            updatedAt: result.updatedAt
                        }) : previous;
                    });
                }
                setEditor(undefined);
                setReload((n)=>n + 1);
            } catch (error) {
                if (mounted.current) {
                    setEditorError(error.message);
                }
            } finally{
                if (mounted.current) {
                    setBusy(false);
                }
            }
        })();
    const load = (item)=>components_saved_queries_async_to_generator(function*() {
            setBusy(true);
            setError('');
            try {
                const latest = yield savedQueries.get(item.id);
                if (!mounted.current) {
                    return;
                }
                validateSavedQueryState(latest.state);
                if (yield restore(latest.state)) {
                    if (!mounted.current) {
                        return;
                    }
                    setActive(latest);
                    setBaseline(snapshotKey(store.get(discoverSnapshotAtom)));
                    setOpen(false);
                } else if (mounted.current) {
                    setError((0,i18n.t)('The query could not be restored. See the details in Discover.'));
                }
            } catch (error) {
                if (mounted.current) {
                    setError(error.message);
                }
            } finally{
                if (mounted.current) {
                    setBusy(false);
                }
            }
        })();
    const confirmLoad = (item)=>{
        if (dirty) {
            setConfirmation({
                kind: 'load',
                target: item
            });
        } else {
            void load(item);
        }
    };
    const remove = (item)=>components_saved_queries_async_to_generator(function*() {
            setBusy(true);
            try {
                yield savedQueries.delete(item.id, item.revision);
                if (!mounted.current) {
                    return;
                }
                if ((active === null || active === void 0 ? void 0 : active.id) === item.id) {
                    setActive(undefined);
                    setBaseline('');
                    initial.current = snapshotKey(snapshot);
                }
                setReload((n)=>n + 1);
            } catch (error) {
                if (mounted.current) {
                    setError(error.message);
                }
            } finally{
                if (mounted.current) {
                    setBusy(false);
                }
            }
        })();
    const confirm = ()=>components_saved_queries_async_to_generator(function*() {
            if (!confirmation || busy) {
                return;
            }
            if (confirmation.kind === 'load') {
                yield load(confirmation.target);
            } else {
                yield remove(confirmation.target);
            }
            if (mounted.current) {
                setConfirmation(undefined);
            }
        })();
    return /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement("div", {
        style: {
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            flexShrink: 0
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Tooltip, {
        content: active ? (0,i18n.t)('Save query: {{name}}{{modified}}', {
            name: active.name,
            modified: dirty ? (0,i18n.t)(' (Modified)') : ''
        }) : (0,i18n.t)('Save query'),
        show: isDialogOpen ? false : undefined
    }, /*#__PURE__*/ external_react_default().createElement("span", {
        style: {
            display: 'inline-flex',
            position: 'relative'
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        "aria-label": (0,i18n.t)('Save query'),
        variant: "secondary",
        icon: "save",
        onClick: (event)=>{
            editorTrigger.current = event.currentTarget;
            beginSave((active === null || active === void 0 ? void 0 : active.canEdit) ? 'update' : 'create');
        },
        disabled: !canCreate && !(active === null || active === void 0 ? void 0 : active.canEdit) || !ready || busy
    }), dirty && /*#__PURE__*/ external_react_default().createElement("span", {
        role: "status",
        "aria-label": (0,i18n.t)('Unsaved query changes'),
        style: {
            position: 'absolute',
            top: 3,
            right: 3,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: theme.colors.warning.main,
            pointerEvents: 'none'
        }
    }))), /*#__PURE__*/ external_react_default().createElement(ui_.Tooltip, {
        content: (0,i18n.t)('Saved queries'),
        show: open ? false : undefined
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        "aria-label": (0,i18n.t)('Saved queries'),
        variant: "secondary",
        icon: "folder-open",
        onClick: ()=>setOpen(true)
    }))), open && /*#__PURE__*/ external_react_default().createElement(ui_.Drawer, {
        title: (0,i18n.t)('Saved queries'),
        subtitle: "Shared with members of this Grafana organization. Data access uses your own permissions.",
        size: "md",
        onClose: ()=>{
            if (!isDialogOpen) {
                setOpen(false);
            }
        }
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: styles.drawerBody
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, {
        ref: searchInput,
        type: "search",
        "aria-label": (0,i18n.t)('Search saved queries'),
        placeholder: (0,i18n.t)('Search by name'),
        prefix: /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
            name: "search"
        }),
        suffix: search ? /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
            name: "times",
            "aria-label": (0,i18n.t)('Clear search'),
            onClick: ()=>{
                var _searchInput_current;
                setSearch('');
                setPage(1);
                (_searchInput_current = searchInput.current) === null || _searchInput_current === void 0 ? void 0 : _searchInput_current.focus();
            }
        }) : undefined,
        value: search,
        onChange: (event)=>{
            setSearch(event.currentTarget.value);
            setPage(1);
        }
    }), error && /*#__PURE__*/ external_react_default().createElement(ui_.Alert, {
        severity: "error",
        title: error,
        bottomSpacing: 0
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        variant: "secondary",
        size: "sm",
        onClick: ()=>setReload((n)=>n + 1)
    }, (0,i18n.t)('Retry'))), loading ? /*#__PURE__*/ external_react_default().createElement("div", {
        role: "status"
    }, /*#__PURE__*/ external_react_default().createElement(ui_.LoadingPlaceholder, {
        text: (0,i18n.t)('Loading saved queries…')
    })) : /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, !error && items.length === 0 && /*#__PURE__*/ external_react_default().createElement("div", {
        className: styles.empty
    }, /*#__PURE__*/ external_react_default().createElement(ui_.EmptySearchResult, null, search ? (0,i18n.t)('No saved queries match your search.') : (0,i18n.t)('No saved queries yet. Use Save query to save your current query.'))), items.length > 0 && /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement("div", {
        className: styles.listSummary
    }, /*#__PURE__*/ external_react_default().createElement("span", null, (0,i18n.t)('{{count}} saved queries', {
        count: total
    })), /*#__PURE__*/ external_react_default().createElement("span", null, (0,i18n.t)('Updated most recently'))), /*#__PURE__*/ external_react_default().createElement("ul", {
        "aria-label": (0,i18n.t)('Saved queries results'),
        className: styles.list
    }, items.map((item)=>{
        var _item_state, _item_state1, _item_state2;
        return /*#__PURE__*/ external_react_default().createElement("li", {
            key: item.id
        }, /*#__PURE__*/ external_react_default().createElement(ui_.Card, {
            className: styles.card,
            disabled: busy,
            onClick: (event)=>{
                editorTrigger.current = event.currentTarget;
                confirmLoad(item);
            }
        }, /*#__PURE__*/ external_react_default().createElement(ui_.Card.Heading, {
            className: styles.heading
        }, item.name), /*#__PURE__*/ external_react_default().createElement(ui_.Card.Tags, {
            className: styles.tags
        }, /*#__PURE__*/ external_react_default().createElement(ui_.Tag, {
            name: ((_item_state = item.state) === null || _item_state === void 0 ? void 0 : _item_state.mode) || (0,i18n.t)('Unknown mode')
        })), item.description && /*#__PURE__*/ external_react_default().createElement(ui_.Card.Description, {
            className: styles.description
        }, item.description), /*#__PURE__*/ external_react_default().createElement(ui_.Card.Meta, {
            className: styles.metadata
        }, /*#__PURE__*/ external_react_default().createElement("span", null, (_item_state1 = item.state) === null || _item_state1 === void 0 ? void 0 : _item_state1.database, ".", (_item_state2 = item.state) === null || _item_state2 === void 0 ? void 0 : _item_state2.table), /*#__PURE__*/ external_react_default().createElement("span", null, item.author), /*#__PURE__*/ external_react_default().createElement("time", {
            dateTime: item.updatedAt
        }, new Date(item.updatedAt).toLocaleString())), (item.canEdit || item.canDelete) && /*#__PURE__*/ external_react_default().createElement(ui_.Card.Actions, {
            className: styles.actions
        }, item.canEdit && /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
            variant: "secondary",
            size: "sm",
            icon: "pen",
            disabled: busy,
            onClick: (event)=>{
                editorTrigger.current = event.currentTarget;
                setEditorError('');
                setEditor({
                    kind: 'rename',
                    name: item.name,
                    description: item.description,
                    target: item
                });
            }
        }, (0,i18n.t)('Rename')), item.canDelete && /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
            variant: "destructive",
            fill: "outline",
            size: "sm",
            icon: "trash-alt",
            disabled: busy,
            onClick: (event)=>{
                editorTrigger.current = event.currentTarget;
                setConfirmation({
                    kind: 'delete',
                    target: item
                });
            }
        }, (0,i18n.t)('Delete')))));
    })), /*#__PURE__*/ external_react_default().createElement("nav", {
        "aria-label": (0,i18n.t)('Saved queries pagination')
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Pagination, {
        currentPage: page,
        numberOfPages: Math.max(1, Math.ceil(total / 20)),
        onNavigate: setPage,
        hideWhenSinglePage: true,
        showSmallVersion: true
    })))))), confirmation && /*#__PURE__*/ external_react_default().createElement(ui_.Modal, {
        title: confirmation.kind === 'delete' ? (0,i18n.t)('Delete “{{name}}”?', {
            name: confirmation.target.name
        }) : (0,i18n.t)('Discard unsaved query changes?'),
        isOpen: true,
        trapFocus: true,
        className: styles.modal,
        closeOnEscape: !busy,
        closeOnBackdropClick: !busy,
        onDismiss: ()=>{
            if (!busy) {
                setConfirmation(undefined);
            }
        }
    }, /*#__PURE__*/ external_react_default().createElement("p", null, confirmation.kind === 'delete' ? (0,i18n.t)('This removes the saved query for everyone in this organization.') : (0,i18n.t)('Loading this query replaces the current query and display settings.')), /*#__PURE__*/ external_react_default().createElement(ui_.Modal.ButtonRow, null, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        ref: confirmationCancel,
        variant: "secondary",
        disabled: busy,
        onClick: ()=>setConfirmation(undefined)
    }, (0,i18n.t)('Cancel')), /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        variant: confirmation.kind === 'delete' ? 'destructive' : 'primary',
        disabled: busy,
        icon: busy ? 'spinner' : undefined,
        onClick: ()=>void confirm()
    }, confirmation.kind === 'delete' ? busy ? (0,i18n.t)('Deleting…') : (0,i18n.t)('Delete') : busy ? (0,i18n.t)('Loading…') : (0,i18n.t)('Discard and load')))), editor && /*#__PURE__*/ external_react_default().createElement(ui_.Modal, {
        title: editor.kind === 'rename' ? (0,i18n.t)('Rename saved query') : (0,i18n.t)('Save query'),
        isOpen: true,
        trapFocus: true,
        className: styles.modal,
        closeOnEscape: !busy,
        closeOnBackdropClick: !busy,
        onDismiss: ()=>{
            if (!busy) {
                setEditor(undefined);
            }
        }
    }, /*#__PURE__*/ external_react_default().createElement("form", {
        "aria-label": (0,i18n.t)('Saved query details'),
        "aria-busy": busy,
        onSubmit: (event)=>{
            event.preventDefault();
            void save();
        }
    }, /*#__PURE__*/ external_react_default().createElement("p", {
        className: (0,css_.css)({
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing(3)
        })
    }, (0,i18n.t)('Shared with members of this Grafana organization. Data access uses your own permissions.')), editor.kind !== 'rename' && ((_editor_source = editor.source) === null || _editor_source === void 0 ? void 0 : _editor_source.canEdit) && canCreate && /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Save action'),
        disabled: busy
    }, /*#__PURE__*/ external_react_default().createElement(ui_.RadioButtonGroup, {
        "aria-label": (0,i18n.t)('Save query action'),
        value: editor.kind,
        options: [
            {
                label: (0,i18n.t)('Update current query'),
                value: 'update'
            },
            {
                label: (0,i18n.t)('Save as new query'),
                value: 'create'
            }
        ],
        className: (0,css_.css)({
            flexWrap: 'wrap'
        }),
        onChange: (kind)=>setEditor((previous)=>previous && saved_queries_object_spread_props(saved_queries_object_spread({}, previous), {
                    kind,
                    target: kind === 'update' ? previous.source : undefined
                }))
    })), /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Name'),
        required: true,
        disabled: busy
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, {
        ref: nameInput,
        id: "saved-query-name",
        "aria-label": (0,i18n.t)('Saved query name'),
        required: true,
        value: editor.name,
        placeholder: (0,i18n.t)('Name your query'),
        maxLength: 120,
        onChange: ({ currentTarget: { value } })=>setEditor((previous)=>previous && saved_queries_object_spread_props(saved_queries_object_spread({}, previous), {
                    name: value
                }))
    })), /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Description (optional)'),
        disabled: busy
    }, /*#__PURE__*/ external_react_default().createElement(ui_.TextArea, {
        id: "saved-query-description",
        "aria-label": (0,i18n.t)('Saved query description'),
        value: editor.description,
        placeholder: (0,i18n.t)('Describe when to use this query'),
        rows: 4,
        maxLength: 2000,
        onChange: ({ currentTarget: { value } })=>setEditor((previous)=>previous && saved_queries_object_spread_props(saved_queries_object_spread({}, previous), {
                    description: value
                }))
    })), editorError && /*#__PURE__*/ external_react_default().createElement(ui_.Alert, {
        severity: "error",
        title: editorError
    }), /*#__PURE__*/ external_react_default().createElement(ui_.Modal.ButtonRow, null, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        type: "button",
        variant: "secondary",
        disabled: busy,
        onClick: ()=>setEditor(undefined)
    }, (0,i18n.t)('Cancel')), /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        type: "submit",
        disabled: busy || !editor.name.trim() || unchanged,
        icon: busy ? 'spinner' : undefined
    }, busy ? (0,i18n.t)('Saving…') : (0,i18n.t)('Save'))))));
}

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(8398);
;// ./hooks/useDiscoverRestore.ts
function useDiscoverRestore_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function useDiscoverRestore_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                useDiscoverRestore_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                useDiscoverRestore_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function useDiscoverRestore_define_property(obj, key, value) {
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
function useDiscoverRestore_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            useDiscoverRestore_define_property(target, key, source[key]);
        });
    }
    return target;
}
function useDiscoverRestore_ownKeys(object, enumerableOnly) {
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
function useDiscoverRestore_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        useDiscoverRestore_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}













function frameFor(request, ref) {
    return useDiscoverRestore_async_to_generator(function*() {
        var _response_data_results, _response_data, _result_frames;
        const response = yield (0,external_rxjs_.lastValueFrom)(request.pipe((0,external_rxjs_.timeout)(20000)));
        const result = response === null || response === void 0 ? void 0 : (_response_data = response.data) === null || _response_data === void 0 ? void 0 : (_response_data_results = _response_data.results) === null || _response_data_results === void 0 ? void 0 : _response_data_results[ref];
        if (!(response === null || response === void 0 ? void 0 : response.ok) || (result === null || result === void 0 ? void 0 : result.error) || !(result === null || result === void 0 ? void 0 : (_result_frames = result.frames) === null || _result_frames === void 0 ? void 0 : _result_frames[0])) {
            throw new Error((result === null || result === void 0 ? void 0 : result.error) || (0,i18n.t)('Failed to load {{resource}}', {
                resource: ref
            }));
        }
        return (0,data_.toDataFrame)(result.frames[0]);
    })();
}
function useDiscoverRestore(allowedDatasources, invalidateMetadata) {
    const store = (0,react/* useStore */.Pj)();
    (0,external_react_.useEffect)(()=>()=>{
            store.set(discoverRestoreEpochAtom, (n)=>n + 1);
        }, [
        store
    ]);
    return (0,external_react_.useCallback)((input, strict = true)=>useDiscoverRestore_async_to_generator(function*() {
            const epoch = store.get(discoverRestoreEpochAtom) + 1;
            store.set(discoverRestoreEpochAtom, epoch);
            store.set(discover/* discoverShareReadyAtom */.Zs, false);
            store.set(discoverRestoreErrorAtom, '');
            store.set(discoverRestoreWarningAtom, '');
            invalidateMetadata();
            store.set(discover/* topNEnabledAtom */.w, false);
            store.set(discover/* topNResultFieldsAtom */.Jf, []);
            store.set(discover/* topNRowsAtom */.q1, []);
            store.set(discover/* tableDataAtom */.q3, []);
            store.set(discover/* tableDataChartsAtom */.pB, []);
            store.set(discover/* tableEChartsDataAtom */.IY, []);
            store.set(discover/* tableTotalCountAtom */.HC, 0);
            store.set(discover/* topDataAtom */.l_, []);
            store.set(discover/* discoverQueryStateAtom */.g_, {
                status: 'idle',
                rowCount: 0,
                auxiliaryErrors: []
            });
            store.set(discover/* discoverLoadingAtom */.jU, (previous)=>Object.fromEntries(Object.keys(previous).map((key)=>[
                        key,
                        false
                    ])));
            const current = ()=>store.get(discoverRestoreEpochAtom) === epoch;
            try {
                var _databasesFrame_fields_, _tablesFrame_fields_, _fieldsFrame_fields_, _variantsFrame_fields_, _range_from, _range_to;
                const state = strict ? validateSavedQueryState(input) : input;
                const ds = allowedDatasources.find((ds)=>ds.uid === state.datasource || !strict && ds.name === state.datasource);
                if (!ds) {
                    throw new Error((0,i18n.t)('The saved datasource is unavailable or you do not have permission to use it'));
                }
                const databasesFrame = yield frameFor((0,metaservice/* getDatabases */.Hm)(ds), 'getDatabases');
                if (!current()) {
                    return false;
                }
                const databases = Array.from(((_databasesFrame_fields_ = databasesFrame.fields[0]) === null || _databasesFrame_fields_ === void 0 ? void 0 : _databasesFrame_fields_.values) || [], (value)=>({
                        label: String(value),
                        value: String(value)
                    }));
                if (!databases.some((db)=>db.value === state.database)) {
                    throw new Error((0,i18n.t)('Database is unavailable: {{database}}', {
                        database: state.database
                    }));
                }
                const tablesFrame = yield frameFor((0,metaservice/* getTablesService */.Rw)({
                    selectdbDS: ds,
                    database: state.database
                }), 'getTables');
                if (!current()) {
                    return false;
                }
                const tables = Array.from(((_tablesFrame_fields_ = tablesFrame.fields[0]) === null || _tablesFrame_fields_ === void 0 ? void 0 : _tablesFrame_fields_.values) || [], (value)=>({
                        label: String(value),
                        value: String(value)
                    }));
                if (!tables.some((table)=>table.value === state.table)) {
                    throw new Error((0,i18n.t)('Table is unavailable: {{table}}', {
                        table: state.table
                    }));
                }
                const params = {
                    selectdbDS: ds,
                    database: state.database,
                    table: state.table
                };
                // Start independent metadata requests together. Optional extended DESC
                // may fail, but it must settle before the first restored query runs.
                const [fieldsFrame, variantsFrame, indexesFrame] = yield Promise.all([
                    frameFor((0,metaservice/* getFieldsService */.H1)(params), 'getFields'),
                    frameFor((0,metaservice/* getVariantFieldsService */.U1)(params), 'getVariantFields').catch(()=>undefined),
                    frameFor((0,metaservice/* getIndexesService */.s1)(params), 'getIndexes').catch(()=>undefined)
                ]);
                if (!current()) {
                    return false;
                }
                const fields = Array.from(((_fieldsFrame_fields_ = fieldsFrame.fields[0]) === null || _fieldsFrame_fields_ === void 0 ? void 0 : _fieldsFrame_fields_.values) || [], (value, i)=>{
                    var _fieldsFrame_fields_;
                    return {
                        Field: String(value),
                        Type: String(((_fieldsFrame_fields_ = fieldsFrame.fields[1]) === null || _fieldsFrame_fields_ === void 0 ? void 0 : _fieldsFrame_fields_.values[i]) || ''),
                        label: String(value),
                        value: String(value)
                    };
                });
                const timeFields = fields.filter((field)=>(0,utils_data/* isValidTimeFieldType */.Q3)(field.Type.toUpperCase())).map((field)=>({
                        label: field.Field,
                        value: field.Field
                    }));
                if (!state.timeField && !strict) {
                    var _timeFields_;
                    state.timeField = (_timeFields_ = timeFields[0]) === null || _timeFields_ === void 0 ? void 0 : _timeFields_.value;
                }
                if (!timeFields.some((field)=>field.value === state.timeField)) {
                    throw new Error((0,i18n.t)('Time field is unavailable: {{field}}', {
                        field: state.timeField
                    }));
                }
                const variants = variantsFrame ? deriveVariantFieldsFromMetadata(fields, Array.from(((_variantsFrame_fields_ = variantsFrame.fields[0]) === null || _variantsFrame_fields_ === void 0 ? void 0 : _variantsFrame_fields_.values) || [], (Field, i)=>{
                    var _variantsFrame_fields_;
                    return {
                        Field,
                        Type: (_variantsFrame_fields_ = variantsFrame.fields[1]) === null || _variantsFrame_fields_ === void 0 ? void 0 : _variantsFrame_fields_.values[i]
                    };
                })) : deriveVariantFields(fields, []);
                const byName = new Map([
                    ...fields,
                    ...flattenVariantLeaves(variants)
                ].map((field)=>[
                        field.Field,
                        field
                    ]));
                const resolve = (name, path, type, key)=>{
                    const leafPath = path || (key ? [
                        name,
                        key
                    ] : undefined);
                    // Explicit JSON/VARIANT paths can be sparse and absent from DESC.
                    // Keep them only when the physical root still has a structured type.
                    if (leafPath === null || leafPath === void 0 ? void 0 : leafPath.length) {
                        const root = fields.find((field)=>field.Field === leafPath[0]);
                        if (!root || !(0,utils_data/* isStructuredJsonType */.Ml)(root.Type)) {
                            return undefined;
                        }
                        const found = byName.get(name);
                        return useDiscoverRestore_object_spread_props(useDiscoverRestore_object_spread({}, found), {
                            Field: name,
                            Type: (found === null || found === void 0 ? void 0 : found.variantPath) ? found.Type : type || 'VARCHAR',
                            variantPath: leafPath,
                            variantKey: key,
                            value: name,
                            label: name
                        });
                    }
                    return byName.get(name);
                };
                const invalidFilters = state.filters.filter((filter)=>!resolve(filter.fieldName, filter.variantPath, filter.fieldType, filter.variantKey));
                if (invalidFilters.length) {
                    throw new Error((0,i18n.t)('Filter fields are unavailable: {{fields}}', {
                        fields: invalidFilters.map((f)=>f.fieldName).join(', ')
                    }));
                }
                if (state.sort.field && !resolve(state.sort.field, state.sort.variantPath, state.sort.variantType)) {
                    throw new Error((0,i18n.t)('Sort field is unavailable: {{field}}', {
                        field: state.sort.field
                    }));
                }
                const selectedFields = state.selectedFields.map((field)=>resolve(field.Field, field.variantPath, field.Type, field.variantKey)).filter(Boolean);
                const missing = state.selectedFields.filter((field)=>!resolve(field.Field, field.variantPath, field.Type, field.variantKey));
                const zone = state.timeZone ? (0,utils_time/* normalizeTimeZone */.F9)(state.timeZone) : store.get(discover/* timeZoneAtom */.tF);
                if (!zone) {
                    throw new Error((0,i18n.t)('Invalid saved time zone'));
                }
                let range = store.get(discover/* timeRangeAtom */.U9);
                if (state.timeRawFrom && state.timeRawTo) {
                    range = (0,utils_time/* buildRelativeTimeRange */.n)(state.timeRawFrom, state.timeRawTo, zone);
                } else if (state.startTime && state.endTime) {
                    const start = (0,utils_time/* parseTimeInZone */.mk)(state.startTime, zone), end = (0,utils_time/* parseTimeInZone */.mk)(state.endTime, zone);
                    if (!(start === null || start === void 0 ? void 0 : start.isValid()) || !(end === null || end === void 0 ? void 0 : end.isValid()) || start.isAfter(end)) {
                        throw new Error((0,i18n.t)('Invalid saved time range'));
                    }
                    range = (0,utils_time/* buildAbsoluteTimeRange */.kh)(start, end);
                }
                if (!(range === null || range === void 0 ? void 0 : (_range_from = range.from) === null || _range_from === void 0 ? void 0 : _range_from.isValid()) || !(range === null || range === void 0 ? void 0 : (_range_to = range.to) === null || _range_to === void 0 ? void 0 : _range_to.isValid()) || range.from.valueOf() > range.to.valueOf()) {
                    throw new Error((0,i18n.t)('Invalid saved time range'));
                }
                if (!current()) {
                    return false;
                }
                const indexFields = (indexesFrame === null || indexesFrame === void 0 ? void 0 : indexesFrame.fields) || [];
                const names = indexFields.find((f)=>f.name === 'Key_name') || indexFields[2];
                const columns = indexFields.find((f)=>f.name === 'Column_name') || indexFields[4];
                const types = indexFields.find((f)=>f.name === 'Index_type') || indexFields[10];
                const indexes = Array.from((names === null || names === void 0 ? void 0 : names.values) || [], (value, i)=>({
                        label: value,
                        value,
                        columnName: columns === null || columns === void 0 ? void 0 : columns.values[i],
                        type: types === null || types === void 0 ? void 0 : types.values[i]
                    }));
                (0,external_react_dom_.unstable_batchedUpdates)(()=>{
                    store.set(discover/* selectedDatasourceAtom */.SW, ds);
                    store.set(discover/* databasesAtom */.SK, databases);
                    store.set(discover/* tablesAtom */.b9, tables);
                    store.set(discover/* currentTableAtom */.$w, state.table);
                    store.set(discover/* discoverCurrentAtom */.WN, (previous)=>useDiscoverRestore_object_spread_props(useDiscoverRestore_object_spread({}, previous), {
                            database: state.database,
                            table: state.table,
                            timeField: state.timeField
                        }));
                    store.set(discover/* tableFieldsAtom */.D_, fields);
                    store.set(discover/* timeFieldsAtom */.Gg, timeFields);
                    store.set(discover/* variantMetadataFieldsAtom */.dR, variants);
                    store.set(discover/* variantFieldsAtom */.cE, variants);
                    store.set(discover/* indexesAtom */.Eq, indexes);
                    store.set(discover/* currentIndexAtom */.TY, indexes);
                    const metadataKey = JSON.stringify([
                        ds.uid,
                        state.database,
                        state.table
                    ]);
                    store.set(discover/* tableMetadataAtom */.hX, (previous)=>useDiscoverRestore_object_spread_props(useDiscoverRestore_object_spread({}, previous), {
                            [metadataKey]: {
                                fields,
                                indexes
                            }
                        }));
                    store.set(discover/* timeZoneAtom */.tF, zone);
                    store.set(discover/* timeRangeAtom */.U9, range);
                    store.set(discover/* currentDateAtom */.Zb, (0,utils_time/* toDayjsRange */.K$)(range));
                    store.set(discover/* activeShortcutAtom */.m_, utils_data/* DISCOVER_SHORTCUTS */.oU.find((shortcut)=>shortcut.raw.from === state.timeRawFrom && shortcut.raw.to === state.timeRawTo));
                    store.set(discover/* searchTypeAtom */.WM, state.mode || store.get(discover/* searchTypeAtom */.WM));
                    store.set(discover/* searchValueAtom */.P8, state.query || '');
                    store.set(discover/* dataFilterAtom */.EA, state.filters);
                    store.set(discover/* selectedFieldsAtom */.Wg, selectedFields);
                    store.set(discover/* discoverSharedColumnOrderAtom */.G9, state.columnOrder);
                    store.set(discover/* discoverSortAtom */.V3, state.sort);
                    store.set(discover/* pageAtom */.fs, 1);
                    if (missing.length) {
                        store.set(discoverRestoreWarningAtom, `Unavailable display columns were skipped: ${missing.map((field)=>field.Field).join(', ')}`);
                    }
                    store.set(discover/* discoverShareReadyAtom */.Zs, true);
                });
                return true;
            } catch (error) {
                if (current()) {
                    store.set(discoverRestoreErrorAtom, error instanceof Error ? error.message : 'Failed to restore query');
                }
                return false;
            }
        })(), [
        allowedDatasources,
        invalidateMetadata,
        store
    ]);
}

// EXTERNAL MODULE: ./components/time-range-input/time-range-input.styles.ts
var time_range_input_styles = __webpack_require__(8078);
;// ./components/discover-header/index.tsx
'use client';
function discover_header_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function discover_header_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                discover_header_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                discover_header_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function discover_header_define_property(obj, key, value) {
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
function discover_header_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            discover_header_define_property(target, key, source[key]);
        });
    }
    return target;
}
function discover_header_ownKeys(object, enumerableOnly) {
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
function discover_header_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        discover_header_ownKeys(Object(source)).forEach(function(key) {
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
function normalizeMode(mode) {
    if (!mode) {
        return undefined;
    }
    const normalizedMode = mode.trim().toLowerCase();
    if (normalizedMode === 'sql') {
        return 'SQL';
    }
    if (normalizedMode === 'search') {
        return 'Search';
    }
    if (normalizedMode === 'lucene') {
        return 'Lucene';
    }
    return undefined;
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
function findShortcutByRaw(rawFrom, rawTo) {
    if (!rawFrom || !rawTo) {
        return undefined;
    }
    return utils_data/* DISCOVER_SHORTCUTS */.oU.find((shortcut)=>shortcut.raw.from === rawFrom && shortcut.raw.to === rawTo);
}
function DiscoverHeader(props) {
    var _ref;
    var _loc_searchParams;
    const { loading, onQuerying, onRefresh } = props;
    // const catalog = 'internal';
    // const catalogs = useAtomValue(catalogAtom);
    const setIndexes = (0,react/* useSetAtom */.Xr)(discover/* indexesAtom */.Eq);
    const setTableMetadata = (0,react/* useSetAtom */.Xr)(discover/* tableMetadataAtom */.hX);
    const requestedFieldsKey = external_react_default().useRef('');
    const requestedIndexesKey = external_react_default().useRef('');
    const metadataGeneration = external_react_default().useRef(0);
    (0,external_react_.useEffect)(()=>()=>{
            metadataGeneration.current += 1;
        }, []);
    const [searchType, setSearchType] = (0,react/* useAtom */.fp)(discover/* searchTypeAtom */.WM);
    const [discoverCurrent, setDiscoverCurrent] = (0,react/* useAtom */.fp)(discover/* discoverCurrentAtom */.WN);
    if (false) // removed by dead control flow
{}
    const [loc, setLoc] = (0,react/* useAtom */.fp)(discover/* locationAtom */.JT);
    // const [currentCluster, setCurrentCluster] = useAtom(currentClusterAtom);
    const [tableFields, setTableFields] = (0,react/* useAtom */.fp)(discover/* tableFieldsAtom */.D_);
    const setVariantFields = (0,react/* useSetAtom */.Xr)(discover/* variantFieldsAtom */.cE);
    const setVariantMetadataFields = (0,react/* useSetAtom */.Xr)(discover/* variantMetadataFieldsAtom */.dR);
    const [timeFields, setTimeFields] = (0,react/* useAtom */.fp)(discover/* timeFieldsAtom */.Gg);
    const [_currentDate, setCurrentDate] = (0,react/* useAtom */.fp)(discover/* currentDateAtom */.Zb);
    const currentTimeField = (0,react/* useAtomValue */.md)(discover/* currentTimeFieldAtom */.CA);
    const [, setCurrentIndex] = (0,react/* useAtom */.fp)(discover/* currentIndexAtom */.TY);
    const searchFocus = (0,react/* useAtomValue */.md)(discover/* searchFocusAtom */.MM);
    // const { databaseList } = useDatabaseList();
    const [activeItem, setActiveItem] = (0,react/* useAtom */.fp)(discover/* activeShortcutAtom */.m_);
    // const [clusters, setClusters] = useState<any[]>([]);
    // const database = loc.searchParams?.get('database');
    // const table = loc.searchParams?.get('table');
    // const cluster = loc.searchParams?.get('cluster');
    // const startTime = loc.searchParams?.get('startTime');
    // const endTime = loc.searchParams?.get('endTime');
    const [selectedDatasource, setSelectedDatasource] = (0,react/* useAtom */.fp)(discover/* selectedDatasourceAtom */.SW);
    const [timeRange, setTimeRange] = (0,react/* useAtom */.fp)(discover/* timeRangeAtom */.U9);
    const [currentTable, setCurrentTable] = (0,react/* useAtom */.fp)(discover/* currentTableAtom */.$w);
    const [databases, setDatabases] = (0,react/* useAtom */.fp)(discover/* databasesAtom */.SK);
    const [tables, setTables] = (0,react/* useAtom */.fp)(discover/* tablesAtom */.b9);
    const [_datasources] = (0,react/* useAtom */.fp)(discover/* datasourcesAtom */.ui);
    const [searchValue, setSearchValue] = (0,react/* useAtom */.fp)(discover/* searchValueAtom */.P8);
    const [timeZone, setTimeZone] = (0,react/* useAtom */.fp)(discover/* timeZoneAtom */.tF);
    const [dataFilter, setDataFilter] = (0,react/* useAtom */.fp)(discover/* dataFilterAtom */.EA);
    const setSelectedFields = (0,react/* useSetAtom */.Xr)(discover/* selectedFieldsAtom */.Wg);
    const setSharedColumnOrder = (0,react/* useSetAtom */.Xr)(discover/* discoverSharedColumnOrderAtom */.G9);
    const setShareSort = (0,react/* useSetAtom */.Xr)(discover/* discoverSortAtom */.V3);
    const [shareReady, setDiscoverShareReady] = (0,react/* useAtom */.fp)(discover/* discoverShareReadyAtom */.Zs);
    const snapshot = (0,react/* useAtomValue */.md)(discoverSnapshotAtom);
    const [restoreError, setRestoreError] = (0,react/* useAtom */.fp)(discoverRestoreErrorAtom);
    const restoreWarning = (0,react/* useAtomValue */.md)(discoverRestoreWarningAtom);
    const setRestoreEpoch = (0,react/* useSetAtom */.Xr)(discoverRestoreEpochAtom);
    const [applicationDraft, setApplicationDraft] = external_react_default().useState('');
    const [applicationOptions, setApplicationOptions] = external_react_default().useState([]);
    const [applicationOptionsLoading, setApplicationOptionsLoading] = external_react_default().useState(false);
    const [resolvedFieldsContext, setResolvedFieldsContext] = external_react_default().useState('');
    const searchMode = searchType === 'Search';
    const indexes = (0,react/* useAtomValue */.md)(discover/* indexesAtom */.Eq);
    const fieldsWithoutInvertedIndex = external_react_default().useMemo(()=>searchType === 'Lucene' ? getLuceneFieldsWithoutInvertedIndex(searchValue, indexes, tableFields) : [], [
        indexes,
        searchType,
        searchValue,
        tableFields
    ]);
    const warningFields = fieldsWithoutInvertedIndex.slice(0, 3).join(', ');
    const remainingWarningFieldCount = fieldsWithoutInvertedIndex.length - 3;
    const jsonFieldsWithoutInvertedIndex = external_react_default().useMemo(()=>{
        const jsonRoots = new Set(tableFields.filter((field)=>{
            var _ref;
            return String((_ref = field === null || field === void 0 ? void 0 : field.Type) !== null && _ref !== void 0 ? _ref : '').toUpperCase().includes('JSON');
        }).map((field)=>{
            var _ref, _ref1, _ref2;
            return String((_ref = (_ref1 = (_ref2 = field === null || field === void 0 ? void 0 : field.Field) !== null && _ref2 !== void 0 ? _ref2 : field === null || field === void 0 ? void 0 : field.value) !== null && _ref1 !== void 0 ? _ref1 : field === null || field === void 0 ? void 0 : field.name) !== null && _ref !== void 0 ? _ref : '').toLowerCase();
        }));
        return fieldsWithoutInvertedIndex.filter((field)=>jsonRoots.has(field.split('.')[0].toLowerCase()));
    }, [
        fieldsWithoutInvertedIndex,
        tableFields
    ]);
    const selectdbDS = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const theme = (0,ui_.useTheme2)();
    const context = (0,data_.usePluginContext)();
    const jsonData = context.meta.jsonData || {};
    const configuredLogsConfig = jsonData.logsConfig;
    const logsConfig = (0,plugin_settings/* mergeLogsConfig */.oW)(configuredLogsConfig);
    const applicationAttributeKey = getConfiguredApplicationAttributeKey(configuredLogsConfig === null || configuredLogsConfig === void 0 ? void 0 : configuredLogsConfig.applicationAttributeKey);
    const isApplicationFilterConfigured = Boolean(applicationAttributeKey);
    const { allowedDatasources, allowedDatasourceUids, loading: datasourcePermissionsLoading, error: datasourcePermissionsError } = (0,useDatasourcePermissions/* useDatasourcePermissions */.R)(jsonData.teamDatasourcePermissions, 'DiscoverHeader');
    const hasInitializedUrlSyncRef = external_react_default().useRef(false);
    const locSearch = (_ref = loc === null || loc === void 0 ? void 0 : (_loc_searchParams = loc.searchParams) === null || _loc_searchParams === void 0 ? void 0 : _loc_searchParams.toString()) !== null && _ref !== void 0 ? _ref : '';
    const fieldsContext = `${(selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.uid) || ''}\u0000${discoverCurrent.database}\u0000${currentTable}`;
    const hasResourceAttributes = isApplicationFilterConfigured && resolvedFieldsContext === fieldsContext && tableFields.some((field)=>(field === null || field === void 0 ? void 0 : field.Field) === 'resource_attributes');
    const committedApplication = getCommittedApplication(dataFilter, applicationAttributeKey);
    const applicationStartDate = _currentDate[0] ? (0,utils_time/* formatSqlTime */.h9)(_currentDate[0]) : '';
    const applicationEndDate = _currentDate[1] ? (0,utils_time/* formatSqlTime */.h9)(_currentDate[1]) : '';
    const visibleApplicationOptions = external_react_default().useMemo(()=>{
        if (!applicationDraft || applicationOptions.some((option)=>option.value === applicationDraft)) {
            return applicationOptions;
        }
        return [
            {
                label: applicationDraft,
                value: applicationDraft
            },
            ...applicationOptions
        ];
    }, [
        applicationDraft,
        applicationOptions
    ]);
    const resetApplicationFilter = external_react_default().useCallback(()=>{
        requestedFieldsKey.current = '';
        requestedIndexesKey.current = '';
        setApplicationDraft('');
        setDataFilter((current)=>{
            const next = current.filter((filter)=>filter.id !== APPLICATION_FILTER_ID);
            return next.length === current.length ? current : next;
        });
        setApplicationOptions([]);
        setResolvedFieldsContext('');
    }, [
        setDataFilter
    ]);
    const commitApplicationAndQuery = external_react_default().useCallback(()=>{
        if (!shareReady) {
            return;
        }
        const result = applyApplicationFilter(dataFilter, applicationDraft, applicationAttributeKey);
        if (!result.changed) {
            onQuerying();
            return;
        }
        setDataFilter(result.filters);
    }, [
        applicationAttributeKey,
        applicationDraft,
        dataFilter,
        onQuerying,
        setDataFilter,
        shareReady
    ]);
    const applyAbsoluteTimeRange = external_react_default().useCallback((start, end)=>{
        setCurrentDate([
            start,
            end
        ]);
        setTimeRange((prev)=>discover_header_object_spread({}, prev, (0,utils_time/* buildAbsoluteTimeRange */.kh)(start, end)));
    }, [
        setCurrentDate,
        setTimeRange
    ]);
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
            return discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                searchParams
            });
        });
    }, [
        setLoc
    ]);
    function getFields(selectedTable, initOptions) {
        var _ref, _ref1;
        const effectiveDatasource = (_ref = initOptions === null || initOptions === void 0 ? void 0 : initOptions.datasource) !== null && _ref !== void 0 ? _ref : selectdbDS;
        const effectiveDatabase = (_ref1 = initOptions === null || initOptions === void 0 ? void 0 : initOptions.database) !== null && _ref1 !== void 0 ? _ref1 : discoverCurrent.database;
        if (!effectiveDatasource || !effectiveDatabase || !(selectedTable === null || selectedTable === void 0 ? void 0 : selectedTable.value)) {
            return;
        }
        setResolvedFieldsContext('');
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
                    setTableMetadata((previous)=>discover_header_object_spread_props(discover_header_object_spread({}, previous), {
                            [metadataKey]: discover_header_object_spread_props(discover_header_object_spread({}, previous[metadataKey]), {
                                fields: tableFields
                            })
                        }));
                    setTableFields(tableFields);
                    setVariantFields(deriveVariantFields(tableFields, []));
                    setVariantMetadataFields([]);
                    setResolvedFieldsContext(`${effectiveDatasource.uid || ''}\u0000${effectiveDatabase}\u0000${selectedTable.value}`);
                    (0,metaservice/* getVariantFieldsService */.U1)({
                        selectdbDS: effectiveDatasource,
                        database: effectiveDatabase,
                        table: selectedTable.value
                    }).subscribe({
                        next: ({ data, ok })=>{
                            var _data_results_getVariantFields_frames, _data_results_getVariantFields, _data_results, _metadata_fields_, _metadata_fields_1;
                            if (requestedFieldsKey.current !== metadataKey || metadataGeneration.current !== generation) {
                                return;
                            }
                            const metadataFrame = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_getVariantFields = _data_results.getVariantFields) === null || _data_results_getVariantFields === void 0 ? void 0 : (_data_results_getVariantFields_frames = _data_results_getVariantFields.frames) === null || _data_results_getVariantFields_frames === void 0 ? void 0 : _data_results_getVariantFields_frames[0];
                            if (!ok || !metadataFrame) {
                                return;
                            }
                            const metadata = (0,data_.toDataFrame)(metadataFrame);
                            const names = Array.from(((_metadata_fields_ = metadata.fields[0]) === null || _metadata_fields_ === void 0 ? void 0 : _metadata_fields_.values) || []);
                            const types = Array.from(((_metadata_fields_1 = metadata.fields[1]) === null || _metadata_fields_1 === void 0 ? void 0 : _metadata_fields_1.values) || []);
                            const variantMetadata = deriveVariantFieldsFromMetadata(tableFields, names.map((Field, index)=>({
                                    Field,
                                    Type: types[index]
                                })));
                            setVariantMetadataFields(variantMetadata);
                            setVariantFields(variantMetadata);
                        },
                        error: ()=>{
                        // Extended DESC is optional. Sampling remains available below.
                        }
                    });
                    if (values) {
                        var _ref, _ref1;
                        var _options_, _initOptions_onResolved;
                        const options = values.filter((field, index)=>{
                            return (0,utils_data/* isValidTimeFieldType */.Q3)(fieldTypes[index].toUpperCase());
                        }).map((item)=>{
                            return {
                                label: item,
                                value: item
                            };
                        });
                        const preferredTimeField = ((_ref = (_ref1 = initOptions === null || initOptions === void 0 ? void 0 : initOptions.preferredTimeField) !== null && _ref1 !== void 0 ? _ref1 : currentTimeField) !== null && _ref !== void 0 ? _ref : '').trim();
                        const targetTimeField = options.some((option)=>option.value === preferredTimeField) ? preferredTimeField : ((_options_ = options[0]) === null || _options_ === void 0 ? void 0 : _options_.value) || '';
                        setDiscoverCurrent((prev)=>discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                                database: effectiveDatabase,
                                table: selectedTable.value,
                                timeField: targetTimeField
                            }));
                        setTimeFields(options);
                        initOptions === null || initOptions === void 0 ? void 0 : (_initOptions_onResolved = initOptions.onResolved) === null || _initOptions_onResolved === void 0 ? void 0 : _initOptions_onResolved.call(initOptions, targetTimeField);
                        // Enable Discover's initial query after datasource, table, and time field
                        // have been resolved, including links that use the individual URL params.
                        setDiscoverShareReady(true);
                    }
                }
            },
            error: (err)=>{
                (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                    source: 'DiscoverHeader',
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
                    var _ref, _frame_fields_find, _ref1, _frame_fields_find1, _ref2, _frame_fields_find2;
                    var _data_results_getIndexes_frames, _data_results_getIndexes, _data_results, _this, _this1, _this2;
                    const frameData = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_getIndexes = _data_results.getIndexes) === null || _data_results_getIndexes === void 0 ? void 0 : (_data_results_getIndexes_frames = _data_results_getIndexes.frames) === null || _data_results_getIndexes_frames === void 0 ? void 0 : _data_results_getIndexes_frames[0];
                    if (!frameData) {
                        setTableMetadata((previous)=>discover_header_object_spread_props(discover_header_object_spread({}, previous), {
                                [metadataKey]: discover_header_object_spread_props(discover_header_object_spread({}, previous[metadataKey]), {
                                    indexes: []
                                })
                            }));
                        setIndexes([]);
                        setCurrentIndex([]);
                        return;
                    }
                    const frame = (0,data_.toDataFrame)(frameData);
                    if (frame.fields.length === 0) {
                        setTableMetadata((previous)=>discover_header_object_spread_props(discover_header_object_spread({}, previous), {
                                [metadataKey]: discover_header_object_spread_props(discover_header_object_spread({}, previous[metadataKey]), {
                                    indexes: []
                                })
                            }));
                        setIndexes([]);
                        setCurrentIndex([]);
                        return;
                    }
                    const values = Array.from((_ref = (_this = (_frame_fields_find = frame.fields.find((field)=>field.name === 'Key_name')) !== null && _frame_fields_find !== void 0 ? _frame_fields_find : frame.fields[2]) === null || _this === void 0 ? void 0 : _this.values) !== null && _ref !== void 0 ? _ref : []);
                    const columnNames = Array.from((_ref1 = (_this1 = (_frame_fields_find1 = frame.fields.find((field)=>field.name === 'Column_name')) !== null && _frame_fields_find1 !== void 0 ? _frame_fields_find1 : frame.fields[4]) === null || _this1 === void 0 ? void 0 : _this1.values) !== null && _ref1 !== void 0 ? _ref1 : []);
                    const indexesTypes = Array.from((_ref2 = (_this2 = (_frame_fields_find2 = frame.fields.find((field)=>field.name === 'Index_type')) !== null && _frame_fields_find2 !== void 0 ? _frame_fields_find2 : frame.fields[10]) === null || _this2 === void 0 ? void 0 : _this2.values) !== null && _ref2 !== void 0 ? _ref2 : []);
                    if (!values || values.length === 0) {
                        setTableMetadata((previous)=>discover_header_object_spread_props(discover_header_object_spread({}, previous), {
                                [metadataKey]: discover_header_object_spread_props(discover_header_object_spread({}, previous[metadataKey]), {
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
                    setTableMetadata((previous)=>discover_header_object_spread_props(discover_header_object_spread({}, previous), {
                            [metadataKey]: discover_header_object_spread_props(discover_header_object_spread({}, previous[metadataKey]), {
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
                    source: 'DiscoverHeader',
                    action: 'getIndexes'
                });
            }
        });
    }
    const applyTableSelection = (datasource, database, table, timeField)=>{
        setRestoreEpoch((n)=>n + 1);
        setRestoreError('');
        metadataGeneration.current += 1;
        requestedFieldsKey.current = '';
        requestedIndexesKey.current = '';
        setTableFields([]);
        setTimeFields([]);
        setIndexes([]);
        setCurrentIndex([]);
        resetApplicationFilter();
        setVariantFields([]);
        setVariantMetadataFields([]);
        setSelectedFields([]);
        setDataFilter([]);
        setSharedColumnOrder([]);
        setShareSort({
            field: '',
            direction: 'DESC'
        });
        setDiscoverShareReady(false);
        setCurrentTable(table);
        setDiscoverCurrent((prev)=>discover_header_object_spread_props(discover_header_object_spread({}, prev), {
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
    const { selectDatasource, selectDatabase, databasesLoading, tablesLoading, cancelSelection } = (0,useDatabaseTableSelection/* useDatabaseTableSelection */.H)({
        setDatabases,
        setTables,
        onDatabaseChange: (database)=>setDiscoverCurrent((prev)=>discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                    database,
                    table: '',
                    timeField: ''
                })),
        onTableChange: applyTableSelection
    });
    const invalidateMetadata = external_react_default().useCallback(()=>{
        metadataGeneration.current += 1;
        requestedFieldsKey.current = '';
        requestedIndexesKey.current = '';
        cancelSelection();
    }, [
        cancelSelection
    ]);
    const restoreSnapshot = useDiscoverRestore(allowedDatasources, invalidateMetadata);
    const restore = external_react_default().useCallback((state, strict = true)=>discover_header_async_to_generator(function*() {
            const applied = yield restoreSnapshot(state, strict);
            if (applied) {
                const datasource = allowedDatasources.find((ds)=>ds.uid === state.datasource || ds.name === state.datasource);
                setResolvedFieldsContext(`${(datasource === null || datasource === void 0 ? void 0 : datasource.uid) || ''}\u0000${state.database}\u0000${state.table}`);
            }
            return applied;
        })(), [
        allowedDatasources,
        restoreSnapshot
    ]);
    function initHeaderData() {
        return discover_header_async_to_generator(function*() {
            var _ref, _urlSearchParams_get;
            var _urlSearchParams_get1, _urlSearchParams_get2, _urlSearchParams_get3, _urlSearchParams_get4, _urlSearchParams_get5, _allowedDatasources_;
            const urlSearchParams = new URLSearchParams(locSearch);
            const sharedState = readDiscoverShareState(urlSearchParams);
            if (sharedState) {
                hasInitializedUrlSyncRef.current = true;
                yield restore(discover_header_object_spread_props(discover_header_object_spread({}, sharedState), {
                    datasource: sharedState.datasource || resolveDatasourceUid(logsConfig.datasource, allowedDatasources),
                    database: sharedState.database || logsConfig.database,
                    table: sharedState.table || logsConfig.logsTable
                }), false);
                return;
            }
            setDiscoverShareReady(false);
            const persistedDatasourceStorage = getStoredValue('discover-selected-datasource');
            const persistedDiscoverCurrentStorage = getStoredValue('discover-current');
            const persistedTableStorage = getStoredValue('discover-current-table');
            const urlDatasource = resolveDatasourceFromParam(urlSearchParams.get('datasource'), allowedDatasources);
            const urlDatabase = ((_urlSearchParams_get1 = urlSearchParams.get('database')) === null || _urlSearchParams_get1 === void 0 ? void 0 : _urlSearchParams_get1.trim()) || '';
            const urlTable = ((_urlSearchParams_get2 = urlSearchParams.get('table')) === null || _urlSearchParams_get2 === void 0 ? void 0 : _urlSearchParams_get2.trim()) || '';
            const urlMode = normalizeMode(urlSearchParams.get('mode'));
            const urlSearchValue = (_ref = (_urlSearchParams_get = urlSearchParams.get('query')) !== null && _urlSearchParams_get !== void 0 ? _urlSearchParams_get : urlSearchParams.get('searchValue')) !== null && _ref !== void 0 ? _ref : '';
            const urlTimeZone = (0,utils_time/* normalizeTimeZone */.F9)(urlSearchParams.get('timeZone'));
            const effectiveTimeZone = urlTimeZone || timeZone;
            const urlTimeField = ((_urlSearchParams_get3 = urlSearchParams.get('timeField')) === null || _urlSearchParams_get3 === void 0 ? void 0 : _urlSearchParams_get3.trim()) || '';
            const urlStartTime = (0,utils_time/* parseTimeInZone */.mk)(urlSearchParams.get('startTime'), effectiveTimeZone);
            const urlEndTime = (0,utils_time/* parseTimeInZone */.mk)(urlSearchParams.get('endTime'), effectiveTimeZone);
            const urlTimeRawFrom = ((_urlSearchParams_get4 = urlSearchParams.get('timeRawFrom')) === null || _urlSearchParams_get4 === void 0 ? void 0 : _urlSearchParams_get4.trim()) || '';
            const urlTimeRawTo = ((_urlSearchParams_get5 = urlSearchParams.get('timeRawTo')) === null || _urlSearchParams_get5 === void 0 ? void 0 : _urlSearchParams_get5.trim()) || '';
            const matchedShortcut = findShortcutByRaw(urlTimeRawFrom, urlTimeRawTo);
            const configuredDatasourceUid = resolveDatasourceUid(logsConfig.datasource, allowedDatasources);
            const persistedDatasourceUid = (urlDatasource === null || urlDatasource === void 0 ? void 0 : urlDatasource.uid) || (selectedDatasource === null || selectedDatasource === void 0 ? void 0 : selectedDatasource.uid) || (persistedDatasourceStorage === null || persistedDatasourceStorage === void 0 ? void 0 : persistedDatasourceStorage.uid);
            const persistedDatabase = urlDatabase || discoverCurrent.database || (persistedDiscoverCurrentStorage === null || persistedDiscoverCurrentStorage === void 0 ? void 0 : persistedDiscoverCurrentStorage.database) || '';
            const persistedTable = urlTable || currentTable || persistedTableStorage || discoverCurrent.table || (persistedDiscoverCurrentStorage === null || persistedDiscoverCurrentStorage === void 0 ? void 0 : persistedDiscoverCurrentStorage.table) || '';
            const persistedTimeField = urlTimeField || discoverCurrent.timeField || (persistedDiscoverCurrentStorage === null || persistedDiscoverCurrentStorage === void 0 ? void 0 : persistedDiscoverCurrentStorage.timeField) || '';
            const requestedDatasourceUid = persistedDatasourceUid || configuredDatasourceUid || '';
            const defaultDatasourceUid = requestedDatasourceUid && allowedDatasourceUids.has(requestedDatasourceUid) ? requestedDatasourceUid : ((_allowedDatasources_ = allowedDatasources[0]) === null || _allowedDatasources_ === void 0 ? void 0 : _allowedDatasources_.uid) || '';
            const defaultDatabase = persistedDatabase || (configuredLogsConfig === null || configuredLogsConfig === void 0 ? void 0 : configuredLogsConfig.database) || '';
            const defaultLogsTable = persistedTable || logsConfig.logsTable || '';
            const hasRelativeTimeParams = Boolean(urlTimeRawFrom && urlTimeRawTo);
            const hasAbsoluteTimeParams = Boolean(urlStartTime && urlEndTime);
            if (urlTimeZone && urlTimeZone !== timeZone) {
                setTimeZone(urlTimeZone);
            }
            if (hasRelativeTimeParams && urlTimeRawFrom && urlTimeRawTo) {
                const relativeTimeRange = (0,utils_time/* buildRelativeTimeRange */.n)(urlTimeRawFrom, urlTimeRawTo, effectiveTimeZone);
                setActiveItem(matchedShortcut);
                setCurrentDate((0,utils_time/* toDayjsRange */.K$)(relativeTimeRange));
                setTimeRange((prev)=>discover_header_object_spread({}, prev, relativeTimeRange));
            } else if (hasRelativeTimeParams) {
                setActiveItem(undefined);
            } else if (hasAbsoluteTimeParams && urlStartTime && urlEndTime) {
                setActiveItem(undefined);
                applyAbsoluteTimeRange(urlStartTime, urlEndTime);
            }
            if (allowedDatasources.length === 0) {
                setSelectedDatasource(undefined);
                setDatabases([]);
                setTables([]);
                setCurrentTable('');
                setDiscoverCurrent((prev)=>discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                        database: '',
                        table: '',
                        timeField: ''
                    }));
                if (urlMode) {
                    setSearchType(urlMode);
                }
                setSearchValue(urlSearchValue);
                hasInitializedUrlSyncRef.current = true;
                setDiscoverShareReady(true);
                return;
            }
            if (!defaultDatasourceUid) {
                if (urlMode) {
                    setSearchType(urlMode);
                }
                if (urlTimeField) {
                    setDiscoverCurrent((prev)=>discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                            timeField: urlTimeField
                        }));
                }
                setSearchValue(urlSearchValue);
                hasInitializedUrlSyncRef.current = true;
                setDiscoverShareReady(true);
                return;
            }
            try {
                var _allowedDatasources_find;
                if (urlMode) {
                    setSearchType(urlMode);
                }
                if (urlTimeField) {
                    setDiscoverCurrent((prev)=>discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                            timeField: urlTimeField
                        }));
                }
                setSearchValue(urlSearchValue);
                const ds = (_allowedDatasources_find = allowedDatasources.find((datasource)=>datasource.uid === defaultDatasourceUid)) !== null && _allowedDatasources_find !== void 0 ? _allowedDatasources_find : yield (0,runtime_.getDataSourceSrv)().get({
                    uid: defaultDatasourceUid
                });
                if (!ds) {
                    return;
                }
                setSelectedDatasource(ds);
                selectDatasource(ds, {
                    database: defaultDatabase,
                    table: defaultLogsTable,
                    timeField: persistedTimeField
                });
            } catch (error) {
                (0,runtime_.logError)((0,errors/* toError */.i)(error), {
                    source: 'DiscoverHeader',
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
    // We only want to apply plugin-config defaults once when the page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        datasourcePermissionsLoading
    ]);
    (0,external_react_.useEffect)(()=>{
        var _urlSearchParams_get, _urlSearchParams_get1, _urlSearchParams_get2, _urlSearchParams_get3, _timeRange_raw, _timeRange_raw1;
        if (!hasInitializedUrlSyncRef.current || !shareReady) {
            return;
        }
        const urlSearchParams = new URLSearchParams(locSearch);
        const urlTimeRawFrom = ((_urlSearchParams_get = urlSearchParams.get('timeRawFrom')) === null || _urlSearchParams_get === void 0 ? void 0 : _urlSearchParams_get.trim()) || '';
        const urlTimeRawTo = ((_urlSearchParams_get1 = urlSearchParams.get('timeRawTo')) === null || _urlSearchParams_get1 === void 0 ? void 0 : _urlSearchParams_get1.trim()) || '';
        const urlStartTimeParam = ((_urlSearchParams_get2 = urlSearchParams.get('startTime')) === null || _urlSearchParams_get2 === void 0 ? void 0 : _urlSearchParams_get2.trim()) || '';
        const urlEndTimeParam = ((_urlSearchParams_get3 = urlSearchParams.get('endTime')) === null || _urlSearchParams_get3 === void 0 ? void 0 : _urlSearchParams_get3.trim()) || '';
        const urlTimeZone = (0,utils_time/* normalizeTimeZone */.F9)(urlSearchParams.get('timeZone')) || timeZone;
        const urlStartTime = (0,utils_time/* parseTimeInZone */.mk)(urlStartTimeParam, urlTimeZone);
        const urlEndTime = (0,utils_time/* parseTimeInZone */.mk)(urlEndTimeParam, urlTimeZone);
        const rawFrom = normalizeRawTimeValue(timeRange === null || timeRange === void 0 ? void 0 : (_timeRange_raw = timeRange.raw) === null || _timeRange_raw === void 0 ? void 0 : _timeRange_raw.from);
        const rawTo = normalizeRawTimeValue(timeRange === null || timeRange === void 0 ? void 0 : (_timeRange_raw1 = timeRange.raw) === null || _timeRange_raw1 === void 0 ? void 0 : _timeRange_raw1.to);
        const shouldShareRelativeRaw = isRelativeRawRange(timeRange === null || timeRange === void 0 ? void 0 : timeRange.raw);
        const currentStartTime = _currentDate[0] ? (0,utils_time/* formatShareTime */.yK)(_currentDate[0]) : undefined;
        const currentEndTime = _currentDate[1] ? (0,utils_time/* formatShareTime */.yK)(_currentDate[1]) : undefined;
        const hasRelativeTimeParams = Boolean(urlTimeRawFrom && urlTimeRawTo);
        const hasAbsoluteTimeParams = Boolean(urlStartTime && urlEndTime);
        const isRelativeTimeSynced = hasRelativeTimeParams && rawFrom === urlTimeRawFrom && rawTo === urlTimeRawTo;
        const isAbsoluteTimeSynced = hasAbsoluteTimeParams && !shouldShareRelativeRaw && currentStartTime === urlStartTimeParam && currentEndTime === urlEndTimeParam;
        if ((hasRelativeTimeParams || hasAbsoluteTimeParams) && !isRelativeTimeSynced && !isAbsoluteTimeSynced) {
            return;
        }
        updateShareParams({
            datasource: (selectedDatasource === null || selectedDatasource === void 0 ? void 0 : selectedDatasource.uid) || (selectedDatasource === null || selectedDatasource === void 0 ? void 0 : selectedDatasource.name) || '',
            database: discoverCurrent.database,
            table: currentTable || discoverCurrent.table,
            mode: searchType,
            query: searchValue,
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
        searchType,
        searchValue,
        selectedDatasource,
        timeRange === null || timeRange === void 0 ? void 0 : timeRange.raw,
        timeZone,
        updateShareParams,
        shareReady
    ]);
    (0,external_react_.useEffect)(()=>{
        setApplicationDraft(committedApplication);
    }, [
        committedApplication
    ]);
    (0,external_react_.useEffect)(()=>{
        if (!hasResourceAttributes || !selectdbDS || !discoverCurrent.database || !currentTable || !currentTimeField || !applicationStartDate || !applicationEndDate) {
            setApplicationOptions([]);
            setApplicationOptionsLoading(false);
            return;
        }
        setApplicationOptionsLoading(true);
        const subscription = (0,metaservice/* getApplicationValuesService */.UD)({
            selectdbDS,
            database: discoverCurrent.database,
            table: currentTable,
            timeField: currentTimeField,
            startDate: applicationStartDate,
            endDate: applicationEndDate,
            attributeKey: applicationAttributeKey
        }).subscribe({
            next: ({ data, ok })=>{
                var _data_results_getApplicationValues_frames, _data_results_getApplicationValues, _data_results, _dataFrame_fields_;
                setApplicationOptionsLoading(false);
                if (!ok) {
                    setApplicationOptions([]);
                    return;
                }
                const frame = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_getApplicationValues = _data_results.getApplicationValues) === null || _data_results_getApplicationValues === void 0 ? void 0 : (_data_results_getApplicationValues_frames = _data_results_getApplicationValues.frames) === null || _data_results_getApplicationValues_frames === void 0 ? void 0 : _data_results_getApplicationValues_frames[0];
                if (!frame) {
                    setApplicationOptions([]);
                    return;
                }
                const dataFrame = (0,data_.toDataFrame)(frame);
                const values = Array.from(((_dataFrame_fields_ = dataFrame.fields[0]) === null || _dataFrame_fields_ === void 0 ? void 0 : _dataFrame_fields_.values) || []);
                const uniqueValues = new Set();
                values.forEach((value)=>{
                    if (value != null && String(value).trim()) {
                        uniqueValues.add(String(value));
                    }
                });
                setApplicationOptions(Array.from(uniqueValues, (value)=>({
                        label: value,
                        value
                    })));
            },
            error: (error)=>{
                setApplicationOptionsLoading(false);
                setApplicationOptions([]);
                (0,runtime_.logError)((0,errors/* toError */.i)(error), {
                    source: 'DiscoverHeader',
                    action: 'getApplicationValues'
                });
            }
        });
        return ()=>subscription.unsubscribe();
    }, [
        applicationAttributeKey,
        applicationEndDate,
        applicationStartDate,
        currentTable,
        currentTimeField,
        discoverCurrent.database,
        hasResourceAttributes,
        selectdbDS
    ]);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": "discover-header",
        className: (0,css_.css)`
                padding: 12px;
                background-color: ${theme.isDark ? 'rgb(24, 27, 31)' : '#FFF'};
                display: flex;
                flex-direction: column;
                gap: 8px;
                border-radius: 0.25rem 0.25rem 0 0;
            `
    }, restoreError && /*#__PURE__*/ external_react_default().createElement("div", {
        role: "alert",
        style: {
            color: theme.colors.error.text
        }
    }, restoreError, (0,i18n.t)('. Automatic querying is paused.'), /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        variant: "secondary",
        size: "sm",
        onClick: ()=>{
            setRestoreError('');
            setDiscoverShareReady(true);
        }
    }, (0,i18n.t)('Keep current query'))), restoreWarning && /*#__PURE__*/ external_react_default().createElement("div", {
        role: "status",
        style: {
            color: theme.colors.warning.text
        }
    }, restoreWarning), /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderControls, {
        "data-testid": "discover-header-controls"
    }, /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderField, {
        label: (0,i18n.t)('Datasource'),
        description: datasourcePermissionsError ? (0,i18n.t)('Failed to load team datasource permissions') : undefined
    }, /*#__PURE__*/ external_react_default().createElement(runtime_.DataSourcePicker, {
        width: 15,
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
    })), /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderField, {
        label: (0,i18n.t)('Database')
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
    })), /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderField, {
        label: (0,i18n.t)('Table')
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
    })), isApplicationFilterConfigured ? /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderField, {
        label: (0,i18n.t)('Application')
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        options: visibleApplicationOptions,
        width: 14,
        value: applicationDraft || undefined,
        placeholder: hasResourceAttributes ? (0,i18n.t)('All') : (0,i18n.t)('Unavailable'),
        isClearable: true,
        isLoading: applicationOptionsLoading,
        disabled: !hasResourceAttributes,
        onChange: (selectedApplication)=>{
            setApplicationDraft((selectedApplication === null || selectedApplication === void 0 ? void 0 : selectedApplication.value) || '');
        }
    })) : null, !searchFocus && /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderField, {
        label: (0,i18n.t)('Time Field')
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        value: currentTimeField,
        width: 15,
        options: timeFields,
        onChange: (selectdbTimeFiled)=>{
            setDiscoverCurrent(discover_header_object_spread_props(discover_header_object_spread({}, discoverCurrent), {
                timeField: selectdbTimeFiled.value
            }));
            setLoc((prev)=>{
                var _ref;
                var _prev_searchParams;
                const searchParams = new URLSearchParams((_ref = prev === null || prev === void 0 ? void 0 : (_prev_searchParams = prev.searchParams) === null || _prev_searchParams === void 0 ? void 0 : _prev_searchParams.toString()) !== null && _ref !== void 0 ? _ref : '');
                searchParams === null || searchParams === void 0 ? void 0 : searchParams.set('timeField', selectdbTimeFiled.value);
                return discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                    searchParams
                });
            });
        },
        placeholder: (0,i18n.t)('Time Field')
    })), /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderField, {
        label: (0,i18n.t)('Time Range'),
        className: time_range_input_styles/* timeRangeFieldClass */.Z,
        style: {
            marginLeft: 'auto'
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.TimeRangeInput, {
        hideTimeZone: false,
        isReversed: false,
        onChange: (timeRange)=>{
            var _timeRange_raw, _timeRange_raw1;
            const [start, end] = (0,utils_time/* toDayjsRange */.K$)(timeRange);
            setActiveItem(undefined);
            const rawFrom = normalizeRawTimeValue((_timeRange_raw = timeRange.raw) === null || _timeRange_raw === void 0 ? void 0 : _timeRange_raw.from);
            const rawTo = normalizeRawTimeValue((_timeRange_raw1 = timeRange.raw) === null || _timeRange_raw1 === void 0 ? void 0 : _timeRange_raw1.to);
            const hasRelativeRaw = isRelativeRawRange(timeRange.raw);
            setLoc((prev)=>{
                var _ref;
                var _prev_searchParams;
                const searchParams = new URLSearchParams((_ref = prev === null || prev === void 0 ? void 0 : (_prev_searchParams = prev.searchParams) === null || _prev_searchParams === void 0 ? void 0 : _prev_searchParams.toString()) !== null && _ref !== void 0 ? _ref : '');
                if (hasRelativeRaw && rawFrom && rawTo) {
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete('startTime');
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete('endTime');
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.set('timeRawFrom', rawFrom);
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.set('timeRawTo', rawTo);
                } else {
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.set('startTime', (0,utils_time/* formatShareTime */.yK)(start));
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.set('endTime', (0,utils_time/* formatShareTime */.yK)(end));
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete('timeRawFrom');
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete('timeRawTo');
                }
                searchParams === null || searchParams === void 0 ? void 0 : searchParams.set('timeZone', timeZone);
                return discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                    searchParams
                });
            });
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
        },
        onChangeTimeZone: (nextTimeZone)=>{
            setTimeZone(nextTimeZone);
            updateShareParams({
                timeZone: nextTimeZone
            });
        },
        timeZone: timeZone,
        value: timeRange
    })))), /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderSearch, {
        "data-testid": "discover-header-search"
    }, /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderField, {
        label: (0,i18n.t)('Mode'),
        style: {
            flex: '0 0 auto'
        }
    }, /*#__PURE__*/ external_react_default().createElement(SearchType, null)), searchType === 'Lucene' ? /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderField, {
        label: "Lucene",
        style: {
            flex: '1 1 240px',
            minWidth: 0
        }
    }, /*#__PURE__*/ external_react_default().createElement(Lucene, {
        onQuerying: commitApplicationAndQuery
    })) : /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderField, {
        label: searchMode ? 'Search' : 'SQL',
        style: {
            flex: '1 1 240px',
            minWidth: 0
        }
    }, /*#__PURE__*/ external_react_default().createElement(SQLSearch, {
        style: {
            minWidth: 0,
            width: '100%'
        },
        onQuerying: commitApplicationAndQuery
    })), /*#__PURE__*/ external_react_default().createElement(DiscoverHeaderActions, null, fieldsWithoutInvertedIndex.length > 0 ? /*#__PURE__*/ external_react_default().createElement(ui_.Tooltip, {
        content: /*#__PURE__*/ external_react_default().createElement("span", null, remainingWarningFieldCount > 0 ? (0,i18n.t)('{{fields}} and other fields ({{count}} total) have no inverted index. Lucene queries may be slow.', {
            fields: warningFields,
            count: fieldsWithoutInvertedIndex.length
        }) : (0,i18n.t)('{{fields}} have no inverted index. Lucene queries may be slow.', {
            fields: warningFields
        }), jsonFieldsWithoutInvertedIndex.length > 0 ? (0,i18n.t)(' JSON subpaths use JSON functions for filtering and usually scan data.') : ''),
        placement: "top"
    }, /*#__PURE__*/ external_react_default().createElement("span", {
        "aria-label": (0,i18n.t)('Lucene inverted index warning'),
        style: {
            color: theme.colors.warning.text,
            cursor: 'help',
            display: 'inline-flex'
        }
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
        name: "exclamation-triangle",
        size: "sm"
    }))) : null, /*#__PURE__*/ external_react_default().createElement(ui_.Tooltip, {
        content: (0,i18n.t)('Refresh table metadata and sampled attribute paths')
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        "aria-label": (0,i18n.t)('Refresh search metadata'),
        variant: "secondary",
        icon: "sync",
        disabled: loading || !currentTimeField,
        onClick: onRefresh
    })), /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        onClick: ()=>{
            const latestTime = (0,utils_data/* getLatestTime */.hC)(activeItem === null || activeItem === void 0 ? void 0 : activeItem.key, timeZone);
            if (latestTime) {
                var _currentShortcut_raw, _currentShortcut_raw1;
                const [latestStartTime, latestEndTime] = latestTime;
                const currentShortcut = utils_data/* DISCOVER_SHORTCUTS */.oU.find((shortcut)=>shortcut.key === (activeItem === null || activeItem === void 0 ? void 0 : activeItem.key));
                const rawFrom = normalizeRawTimeValue(currentShortcut === null || currentShortcut === void 0 ? void 0 : (_currentShortcut_raw = currentShortcut.raw) === null || _currentShortcut_raw === void 0 ? void 0 : _currentShortcut_raw.from);
                const rawTo = normalizeRawTimeValue(currentShortcut === null || currentShortcut === void 0 ? void 0 : (_currentShortcut_raw1 = currentShortcut.raw) === null || _currentShortcut_raw1 === void 0 ? void 0 : _currentShortcut_raw1.to);
                setLoc((prev)=>{
                    var _ref;
                    var _prev_searchParams;
                    const searchParams = new URLSearchParams((_ref = prev === null || prev === void 0 ? void 0 : (_prev_searchParams = prev.searchParams) === null || _prev_searchParams === void 0 ? void 0 : _prev_searchParams.toString()) !== null && _ref !== void 0 ? _ref : '');
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete('startTime');
                    searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete('endTime');
                    if (rawFrom && rawTo) {
                        searchParams === null || searchParams === void 0 ? void 0 : searchParams.set('timeRawFrom', rawFrom);
                        searchParams === null || searchParams === void 0 ? void 0 : searchParams.set('timeRawTo', rawTo);
                    } else {
                        searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete('timeRawFrom');
                        searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete('timeRawTo');
                    }
                    return discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                        searchParams
                    });
                });
                setCurrentDate([
                    dayjs_min_default()(latestStartTime),
                    dayjs_min_default()(latestEndTime)
                ]);
                setTimeRange((prev)=>discover_header_object_spread_props(discover_header_object_spread({}, prev), {
                        from: (0,data_.dateTime)(dayjs_min_default()(latestStartTime).toDate()),
                        to: (0,data_.dateTime)(dayjs_min_default()(latestEndTime).toDate()),
                        raw: rawFrom && rawTo ? {
                            from: rawFrom,
                            to: rawTo
                        } : (0,utils_time/* buildAbsoluteTimeRange */.kh)(dayjs_min_default()(latestStartTime), dayjs_min_default()(latestEndTime)).raw
                    }));
            }
            commitApplicationAndQuery();
        },
        variant: "primary",
        className: "h-8",
        icon: loading ? 'fa fa-spinner' : 'sync',
        disabled: !currentTimeField || !shareReady
    }, (0,i18n.t)('Query')), /*#__PURE__*/ external_react_default().createElement(SavedQueries, {
        snapshot: discover_header_object_spread_props(discover_header_object_spread({}, snapshot), {
            filters: applicationAttributeKey ? applyApplicationFilter(dataFilter, applicationDraft, applicationAttributeKey).filters : dataFilter
        }),
        ready: shareReady,
        restore: restore
    }))));
}

// EXTERNAL MODULE: ./components/testIds.ts
var testIds = __webpack_require__(5611);
// EXTERNAL MODULE: ./services/traces.ts + 1 modules
var traces = __webpack_require__(3764);
// EXTERNAL MODULE: ../node_modules/antd/es/message/index.js + 25 modules
var message = __webpack_require__(1712);
;// ./utils/query-parser/query-parser.ts
/* unused harmony import specifier */ var query_parser_parse;
/* unused harmony import specifier */ var query_parser_genWhereSQL;
function query_parser_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function query_parser_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                query_parser_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                query_parser_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function query_parser_define_property(obj, key, value) {
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



class SearchQueryBuilder {
    setSerializer(serializer) {
        this.serializer = serializer;
        return this;
    }
    getSerializer() {
        return this.serializer;
    }
    genSearchQuery() {
        return query_parser_async_to_generator(function*() {
            if (!this.searchQ) {
                return '';
            }
            const parsedQ = query_parser_parse(this.searchQ);
            return yield query_parser_genWhereSQL(parsedQ, this.serializer);
        }).call(this);
    }
    and(condition) {
        if (condition && condition.trim()) {
            this.conditions.push(`(${condition})`);
        }
        return this;
    }
    build() {
        return query_parser_async_to_generator(function*() {
            const searchQuery = yield this.genSearchQuery();
            if (this.searchQ) {
                this.and(searchQuery);
            }
            return this.conditions.join(' AND ');
        }).call(this);
    }
    constructor(searchQ, serializer){
        query_parser_define_property(this, "searchQ", void 0);
        query_parser_define_property(this, "conditions", void 0);
        query_parser_define_property(this, "serializer", void 0);
        this.conditions = [];
        this.searchQ = searchQ;
        this.serializer = serializer;
    }
}

;// ./services/lucene.ts
function lucene_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function lucene_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                lucene_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                lucene_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}






// Temporarily keep Lucene queries on the SQL serializer path.
const ENABLE_DORIS_SEARCH = false;
function assertSupportedLuceneSyntax(query) {
    // @hyperdx/lucene currently preserves slash-delimited regex as ordinary
    // text, so reject it before parsing instead of silently changing meaning.
    if (/(?:^|[\s(])[^\s:()]+:\/(?:\\.|[^/])+\/(?:$|[\s)])/u.test(query)) {
        throw new Error((0,i18n.t)('Lucene regular-expression queries are not supported.'));
    }
}
function getWhereSQLViaLucene(_0) {
    return lucene_async_to_generator(function*({ query, databaseName, tableName, connectionId, implicitColumnExpression, datasourceType, columnMeta, variantImplicitPaths }) {
        const trimmedQuery = query === null || query === void 0 ? void 0 : query.trim();
        if (!trimmedQuery) {
            return '';
        }
        assertSupportedLuceneSyntax(trimmedQuery);
        // Probe the actual SQL capability. VERSION() is always 5.7.99 in Doris for
        // MySQL compatibility and cannot identify the Doris release.
        const [tryCastSupported, jsonSearchSupported] = yield Promise.all([
            (0,metaservice/* supportsTryCast */.rp)({
                connectionId,
                datasourceType
            }),
            (0,metaservice/* supportsJsonSearch */.RJ)({
                connectionId,
                datasourceType
            })
        ]);
        let ast;
        try {
            ast = parse(trimmedQuery);
        } catch (error) {
            (0,runtime_.logError)((0,errors/* toError */.i)(error), {
                source: 'lucene',
                action: 'getWhereSQLViaLucene'
            });
            throw error;
        }
        if (ENABLE_DORIS_SEARCH && canUseDorisSearch(ast) && (yield (0,metaservice/* supportsSearch */.pm)({
            connectionId,
            datasourceType,
            databaseName,
            tableName,
            query: trimmedQuery
        }))) {
            const escapedQuery = trimmedQuery.replace(/\\/g, '\\\\').replace(/'/g, "''");
            return `SEARCH('${escapedQuery}', '{"mode":"lucene"}')`;
        }
        const serializer = new CustomSchemaSQLSerializerV2({
            databaseName,
            tableName,
            connectionId,
            implicitColumnExpression,
            datasourceType,
            supportsTryCast: tryCastSupported,
            supportsJsonSearch: jsonSearchSupported,
            columnMeta,
            variantImplicitPaths
        });
        try {
            const whereSQL = yield genWhereSQL(ast, serializer);
            return whereSQL;
        } catch (error) {
            (0,runtime_.logError)((0,errors/* toError */.i)(error), {
                source: 'lucene',
                action: 'getWhereSQLViaLucene'
            });
            throw error;
        }
    }).apply(this, arguments);
}

;// ./utils/variant-path-cache.ts
function variant_path_cache_define_property(obj, key, value) {
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
function variant_path_cache_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            variant_path_cache_define_property(target, key, source[key]);
        });
    }
    return target;
}

/** Count a path once per sampled row. Deterministic ties keep persisted caches stable. */ function mergeVariantPathSamples(previous, columns, rows) {
    const result = variant_path_cache_object_spread({}, previous);
    for (const column of columns){
        const counts = new Map((previous[column] || []).map((entry)=>[
                JSON.stringify(entry.path),
                variant_path_cache_object_spread({}, entry)
            ]));
        for (const row of rows){
            let value = row[column];
            if (typeof value === 'string') {
                try {
                    value = JSON.parse(value);
                } catch (unused) {
                    continue;
                }
            }
            const paths = new Map(collectStringVariantPaths(value).map((path)=>[
                    JSON.stringify(path),
                    path
                ]));
            for (const [key, path] of paths){
                const entry = counts.get(key);
                counts.set(key, {
                    path,
                    count: ((entry === null || entry === void 0 ? void 0 : entry.count) || 0) + 1
                });
            }
        }
        result[column] = [
            ...counts.values()
        ].sort((a, b)=>b.count - a.count || JSON.stringify(a.path).localeCompare(JSON.stringify(b.path))).slice(0, 200);
    }
    return result;
}
function variantPathsFromFrequencies(frequencies) {
    return Object.fromEntries(Object.entries(frequencies).map(([column, entries])=>[
            column,
            entries.map((entry)=>entry.path)
        ]));
}

;// ./pages/PageDiscover/useLuceneWhereClause.ts
function useLuceneWhereClause_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function useLuceneWhereClause_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                useLuceneWhereClause_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                useLuceneWhereClause_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function useLuceneWhereClause_define_property(obj, key, value) {
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
function useLuceneWhereClause_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            useLuceneWhereClause_define_property(target, key, source[key]);
        });
    }
    return target;
}
function useLuceneWhereClause_ownKeys(object, enumerableOnly) {
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
function useLuceneWhereClause_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        useLuceneWhereClause_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}












function rowsFromResponse(response, refId) {
    var _response_data_results, _response_data, _result_frames, _fields_;
    const result = response === null || response === void 0 ? void 0 : (_response_data = response.data) === null || _response_data === void 0 ? void 0 : (_response_data_results = _response_data.results) === null || _response_data_results === void 0 ? void 0 : _response_data_results[refId];
    if (!(response === null || response === void 0 ? void 0 : response.ok) || (result === null || result === void 0 ? void 0 : result.error)) {
        throw new Error((result === null || result === void 0 ? void 0 : result.error) || (0,i18n.t)('Failed to load search metadata'));
    }
    const frame = result === null || result === void 0 ? void 0 : (_result_frames = result.frames) === null || _result_frames === void 0 ? void 0 : _result_frames[0];
    if (!frame) {
        return [];
    }
    const fields = (0,data_.toDataFrame)(frame).fields;
    return Array.from(((_fields_ = fields[0]) === null || _fields_ === void 0 ? void 0 : _fields_.values) || []).map((_, i)=>Object.fromEntries(fields.map((field)=>[
                field.name,
                field.values[i]
            ])));
}
function rememberVariantSamples(store, key, columns, rows) {
    const oldPaths = store.get(discover/* variantImplicitPathsAtom */.md)[key] || {};
    const previous = store.get(discover/* variantPathFrequenciesAtom */.iG)[key] || Object.fromEntries(Object.entries(oldPaths).map(([column, paths])=>[
            column,
            paths.map((path)=>({
                    path,
                    count: 0
                }))
        ]));
    const frequencies = mergeVariantPathSamples(previous, columns, rows);
    store.set(discover/* variantPathFrequenciesAtom */.iG, (all)=>useLuceneWhereClause_object_spread_props(useLuceneWhereClause_object_spread({}, all), {
            [key]: frequencies
        }));
    store.set(discover/* variantImplicitPathsAtom */.md, (all)=>useLuceneWhereClause_object_spread_props(useLuceneWhereClause_object_spread({}, all), {
            [key]: variantPathsFromFrequencies(frequencies)
        }));
}
function useLuceneWhereClause() {
    const store = (0,react/* useStore */.Pj)();
    const sampledContext = (0,external_react_.useRef)('');
    const inFlight = (0,external_react_.useRef)(null);
    return (0,external_react_.useCallback)((options = {})=>{
        var _inFlight_current;
        const datasource = store.get(discover/* selectedDatasourceAtom */.SW);
        const database = store.get(discover/* currentDatabaseAtom */.Cf);
        const table = store.get(discover/* currentTableAtom */.$w);
        const query = store.get(discover/* searchValueAtom */.P8).trim();
        const mode = store.get(discover/* searchTypeAtom */.WM);
        if (mode !== 'Lucene' && !options.refreshMetadata || !datasource || !database || !table) {
            return Promise.resolve('');
        }
        const epoch = store.get(discoverRestoreEpochAtom);
        const key = JSON.stringify([
            datasource.uid,
            database,
            table
        ]);
        const requestKey = JSON.stringify([
            key,
            epoch,
            query,
            store.get(discover/* currentDateAtom */.Zb).map((date)=>date.valueOf()),
            options
        ]);
        if (((_inFlight_current = inFlight.current) === null || _inFlight_current === void 0 ? void 0 : _inFlight_current.key) === requestKey) {
            return inFlight.current.promise;
        }
        const isCurrent = ()=>{
            var _store_get;
            return epoch === store.get(discoverRestoreEpochAtom) && key === JSON.stringify([
                (_store_get = store.get(discover/* selectedDatasourceAtom */.SW)) === null || _store_get === void 0 ? void 0 : _store_get.uid,
                store.get(discover/* currentDatabaseAtom */.Cf),
                store.get(discover/* currentTableAtom */.$w)
            ]);
        };
        const promise = (()=>useLuceneWhereClause_async_to_generator(function*() {
                let meta = store.get(discover/* tableMetadataAtom */.hX)[key];
                if (options.refreshMetadata || !(meta === null || meta === void 0 ? void 0 : meta.fields) || !(meta === null || meta === void 0 ? void 0 : meta.indexes)) {
                    const [fields, indexes] = yield Promise.all([
                        options.refreshMetadata || !(meta === null || meta === void 0 ? void 0 : meta.fields) ? (0,external_rxjs_.lastValueFrom)((0,metaservice/* getFieldsService */.H1)({
                            selectdbDS: datasource,
                            database,
                            table
                        })).then((response)=>rowsFromResponse(response, 'getFields').map((field)=>useLuceneWhereClause_object_spread_props(useLuceneWhereClause_object_spread({}, field), {
                                    label: field.Field,
                                    value: field.Field
                                }))) : meta.fields,
                        options.refreshMetadata || !(meta === null || meta === void 0 ? void 0 : meta.indexes) ? (0,external_rxjs_.lastValueFrom)((0,metaservice/* getIndexesService */.s1)({
                            selectdbDS: datasource,
                            database,
                            table
                        })).then((response)=>rowsFromResponse(response, 'getIndexes').map((index)=>({
                                    type: index.Index_type,
                                    columnName: index.Column_name,
                                    label: index.Key_name,
                                    value: index.Key_name
                                }))) : meta.indexes
                    ]);
                    meta = {
                        fields,
                        indexes
                    };
                    if (!isCurrent()) {
                        throw new Error((0,i18n.t)('Search table changed while loading metadata'));
                    }
                    store.set(discover/* tableMetadataAtom */.hX, (previous)=>useLuceneWhereClause_object_spread_props(useLuceneWhereClause_object_spread({}, previous), {
                            [key]: meta
                        }));
                    store.set(discover/* tableFieldsAtom */.D_, fields);
                    store.set(discover/* indexesAtom */.Eq, indexes);
                }
                if (!isCurrent()) {
                    throw new Error((0,i18n.t)('Search table changed while loading metadata'));
                }
                const fields = meta.fields;
                const columns = fields.filter((field)=>/^VARIANT/i.test(field.Type || '')).map((field)=>String(field.Field));
                if (columns.length && (options.refreshPaths || sampledContext.current !== key)) {
                    const dates = store.get(discover/* currentDateAtom */.Zb);
                    try {
                        const response = yield (0,external_rxjs_.lastValueFrom)((0,metaservice/* getVariantPathSampleService */.GM)({
                            selectdbDS: datasource,
                            database,
                            table,
                            columns,
                            timeField: store.get(discover/* currentTimeFieldAtom */.CA),
                            startDate: (0,utils_time/* formatSqlTime */.h9)(dates[0]),
                            endDate: (0,utils_time/* formatSqlTime */.h9)(dates[1])
                        }));
                        const samples = rowsFromResponse(response, 'sampleVariantPaths').map((row)=>Object.fromEntries(columns.map((column, index)=>[
                                    column,
                                    row[`c${index + 1}`]
                                ])));
                        if (!isCurrent()) {
                            throw new Error((0,i18n.t)('Search table changed while sampling attributes'));
                        }
                        rememberVariantSamples(store, key, columns, samples);
                        store.set(discover/* variantSamplingWarningAtom */.CK, (previous)=>useLuceneWhereClause_object_spread_props(useLuceneWhereClause_object_spread({}, previous), {
                                [key]: ''
                            }));
                        if (isCurrent()) {
                            sampledContext.current = key;
                        }
                    } catch (unused) {
                        if (!isCurrent()) {
                            throw new Error((0,i18n.t)('Search table changed while sampling attributes'));
                        }
                        store.set(discover/* variantSamplingWarningAtom */.CK, (previous)=>useLuceneWhereClause_object_spread_props(useLuceneWhereClause_object_spread({}, previous), {
                                [key]: 'Attribute path sampling failed. Free-text search uses cached paths and may miss attribute values.'
                            }));
                    }
                }
                if (!isCurrent()) {
                    throw new Error((0,i18n.t)('Search table changed while sampling attributes'));
                }
                const implicitFields = fields.filter((field)=>/^(?:CHAR|VARCHAR|TEXT|STRING|JSON)/i.test(field.Type || ''));
                if (!query || mode !== 'Lucene') {
                    return '';
                }
                return getWhereSQLViaLucene({
                    query,
                    connectionId: datasource.uid,
                    datasourceType: datasource.type,
                    databaseName: database,
                    tableName: table,
                    implicitColumnExpression: implicitFields.slice(0, 10).map((field)=>`coalesce(${sqlstring_default().escapeId(field.Field)}, '')`).join(',\n') || undefined,
                    columnMeta: {
                        columns: fields.map((field)=>({
                                name: String(field.Field),
                                type: String(field.Type || (0,i18n.t)('Unknown'))
                            })),
                        invertedIndexColumns: meta.indexes.filter((index)=>/inverted/i.test(index.type || '')).map((index)=>String(index.columnName))
                    },
                    variantImplicitPaths: store.get(discover/* variantImplicitPathsAtom */.md)[key] || {}
                });
            })())().finally(()=>{
            var _inFlight_current;
            if (((_inFlight_current = inFlight.current) === null || _inFlight_current === void 0 ? void 0 : _inFlight_current.key) === requestKey) {
                inFlight.current = null;
            }
        });
        inFlight.current = {
            key: requestKey,
            promise
        };
        return promise;
    }, [
        store
    ]);
}

// EXTERNAL MODULE: ./utils/query-error.ts
var query_error = __webpack_require__(8957);
;// ./pages/PageDiscover/useDiscoverData.ts
function useDiscoverData_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function useDiscoverData_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                useDiscoverData_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                useDiscoverData_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function useDiscoverData_define_property(obj, key, value) {
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
function useDiscoverData_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            useDiscoverData_define_property(target, key, source[key]);
        });
    }
    return target;
}
function useDiscoverData_ownKeys(object, enumerableOnly) {
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
function useDiscoverData_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        useDiscoverData_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}





















function restorePaused(store) {
    return store.get(discoverRestoreEpochAtom) > 0 && !store.get(discover/* discoverShareReadyAtom */.Zs);
}
function measureDiscoverPhase(requestId, source, phase, startTime) {
    if (typeof performance === 'undefined') {
        return;
    }
    performance.measure(`discover:${requestId}:${source}:${phase}`, {
        start: startTime,
        end: performance.now()
    });
}
function useDiscoverData() {
    const store = (0,react/* useStore */.Pj)();
    const didRunPageEffect = (0,external_react_.useRef)(false);
    const didRunAutoRefreshEffect = (0,external_react_.useRef)(false);
    const requestGenerationRef = (0,external_react_.useRef)(0);
    const suppressNextPageEffectRef = (0,external_react_.useRef)(false);
    const [page, setPage] = (0,react/* useAtom */.fp)(discover/* pageAtom */.fs);
    const shareReady = (0,react/* useAtomValue */.md)(discover/* discoverShareReadyAtom */.Zs);
    const restoreEpoch = (0,react/* useAtomValue */.md)(discoverRestoreEpochAtom);
    const pageSize = (0,react/* useAtomValue */.md)(discover/* pageSizeAtom */.Ol);
    const setTableData = (0,react/* useSetAtom */.Xr)(discover/* tableDataAtom */.q3);
    const setVariantFields = (0,react/* useSetAtom */.Xr)(discover/* variantFieldsAtom */.cE);
    const setTableDataCharts = (0,react/* useSetAtom */.Xr)(discover/* tableDataChartsAtom */.pB);
    const selectdbDS = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const currentTimeField = (0,react/* useAtomValue */.md)(discover/* currentTimeFieldAtom */.CA);
    const interval = (0,react/* useAtomValue */.md)(discover/* intervalAtom */.le);
    const currentIndexes = (0,react/* useAtomValue */.md)(discover/* currentIndexAtom */.TY);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const variantMetadataFields = (0,react/* useAtomValue */.md)(discover/* variantMetadataFieldsAtom */.dR);
    const variantFields = (0,react/* useAtomValue */.md)(discover/* variantFieldsAtom */.cE);
    const variantFieldsRef = (0,external_react_.useRef)(variantFields);
    const variantMetadataFieldsRef = (0,external_react_.useRef)(variantMetadataFields);
    const searchType = (0,react/* useAtomValue */.md)(discover/* searchTypeAtom */.WM);
    const dataFilter = (0,react/* useAtomValue */.md)(discover/* dataFilterAtom */.EA);
    const queryDataFilters = (0,external_react_.useMemo)(()=>(0,sql_filter/* enrichStructuredFilterTypes */.a9)(dataFilter, [
            ...tableFields,
            ...flattenVariantLeaves(variantFields)
        ]), [
        dataFilter,
        tableFields,
        variantFields
    ]);
    const searchValue = (0,react/* useAtomValue */.md)(discover/* searchValueAtom */.P8);
    const setTopData = (0,react/* useSetAtom */.Xr)(discover/* topDataAtom */.l_);
    const currentTable = (0,react/* useAtomValue */.md)(discover/* currentTableAtom */.$w);
    const currentCatalog = (0,react/* useAtomValue */.md)(discover/* currentCatalogAtom */.K0);
    const currentDatabase = (0,react/* useAtomValue */.md)(discover/* currentDatabaseAtom */.Cf);
    const currentDate = (0,react/* useAtomValue */.md)(discover/* currentDateAtom */.Zb);
    const timeZone = (0,react/* useAtomValue */.md)(discover/* timeZoneAtom */.tF);
    const setTableTotalCount = (0,react/* useSetAtom */.Xr)(discover/* tableTotalCountAtom */.HC);
    const setTraceData = (0,react/* useSetAtom */.Xr)(discover/* tableTracesDataAtom */.UB);
    const [loading, setLoading] = (0,react/* useAtom */.fp)(discover/* discoverLoadingAtom */.jU);
    const [sort, setSort] = (0,react/* useAtom */.fp)(discover/* discoverSortAtom */.V3);
    const [queryState, setQueryState] = (0,react/* useAtom */.fp)(discover/* discoverQueryStateAtom */.g_);
    const buildLuceneWhereClause = useLuceneWhereClause();
    const sortContextKey = `${(selectdbDS === null || selectdbDS === void 0 ? void 0 : selectdbDS.uid) || ''}\u0000${currentDatabase}\u0000${currentTable}\u0000${currentTimeField}`;
    const sortContextRef = (0,external_react_.useRef)(sortContextKey);
    const requestContextKey = `${sortContextKey}\u0000${restoreEpoch}`;
    const requestContextRef = (0,external_react_.useRef)(requestContextKey);
    if (requestContextRef.current !== requestContextKey) {
        requestContextRef.current = requestContextKey;
        requestGenerationRef.current += 1;
        if (restorePaused(store) && page !== 1) {
            suppressNextPageEffectRef.current = true;
        }
    }
    (0,external_react_.useEffect)(()=>()=>{
            requestGenerationRef.current += 1;
        }, []);
    (0,external_react_.useEffect)(()=>{
        variantFieldsRef.current = variantFields;
    }, [
        variantFields
    ]);
    (0,external_react_.useEffect)(()=>{
        variantMetadataFieldsRef.current = variantMetadataFields;
    }, [
        variantMetadataFields
    ]);
    const formatCurrentTime = (0,external_react_.useCallback)((time)=>{
        return time ? (0,utils_time/* formatSqlTime */.h9)(time) : undefined;
    }, []);
    const beginQuery = (0,external_react_.useCallback)(()=>{
        const requestId = requestGenerationRef.current + 1;
        requestGenerationRef.current = requestId;
        setQueryState({
            status: 'loading',
            rowCount: 0,
            auxiliaryErrors: []
        });
        return requestId;
    }, [
        setQueryState
    ]);
    const addAuxiliaryError = (0,external_react_.useCallback)((requestId, source, error)=>{
        if (requestGenerationRef.current !== requestId || restorePaused(store)) {
            return;
        }
        const queryError = (0,query_error/* createDiscoverQueryError */.I)(error, {
            source,
            searchType,
            searchValue
        });
        setQueryState((previous)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, previous), {
                auxiliaryErrors: [
                    ...previous.auxiliaryErrors.filter((item)=>item.source !== source),
                    queryError
                ]
            }));
    }, [
        searchType,
        searchValue,
        setQueryState,
        store
    ]);
    const getTableData = (0,external_react_.useCallback)((options)=>useDiscoverData_async_to_generator(function*() {
            var _ref, _ref1, _ref2;
            var _flattenVariantLeaves_find, _flattenVariantLeaves_find1;
            if (!currentTable || !currentDatabase || !selectdbDS) {
                return;
            }
            const requestId = (_ref = options === null || options === void 0 ? void 0 : options.requestId) !== null && _ref !== void 0 ? _ref : beginQuery();
            const requestStartedAt = performance.now();
            const nextPage = (_ref1 = options === null || options === void 0 ? void 0 : options.nextPage) !== null && _ref1 !== void 0 ? _ref1 : page;
            const requestedSort = (_ref2 = options === null || options === void 0 ? void 0 : options.nextSort) !== null && _ref2 !== void 0 ? _ref2 : sortContextRef.current === sortContextKey ? sort : {
                field: currentTimeField,
                direction: 'DESC'
            };
            const availableFields = [
                ...tableFields.map((field)=>String((field === null || field === void 0 ? void 0 : field.Field) || (field === null || field === void 0 ? void 0 : field.value) || '')),
                ...flattenVariantLeaves(variantFieldsRef.current).map((field)=>field.Field)
            ];
            const sortField = resolveQuerySortField(requestedSort.field, currentTimeField, availableFields);
            // Recover the concrete VARIANT path from the current field catalogue
            // as well. This keeps sorting safe when a stale table interaction
            // only supplies the display name.
            const sortFieldPath = sortField === requestedSort.field ? requestedSort.variantPath || ((_flattenVariantLeaves_find = flattenVariantLeaves(variantFieldsRef.current).find((field)=>field.Field === sortField)) === null || _flattenVariantLeaves_find === void 0 ? void 0 : _flattenVariantLeaves_find.variantPath) : undefined;
            const sortFieldType = (sortFieldPath === null || sortFieldPath === void 0 ? void 0 : sortFieldPath.length) ? requestedSort.variantType || ((_flattenVariantLeaves_find1 = flattenVariantLeaves(variantFieldsRef.current).find((field)=>field.Field === sortField)) === null || _flattenVariantLeaves_find1 === void 0 ? void 0 : _flattenVariantLeaves_find1.Type) : undefined;
            setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                    getTableData: true
                }));
            const indexesStatement = (0,utils_data/* getIndexesStatement */.cE)(currentIndexes, tableFields, searchValue);
            const payload = {
                catalog: currentCatalog,
                database: currentDatabase,
                table: currentTable,
                timeField: currentTimeField,
                startDate: formatCurrentTime(currentDate[0]),
                endDate: formatCurrentTime(currentDate[1]),
                cluster: '',
                sort: requestedSort.direction,
                sortField,
                sortFieldPath,
                sortFieldType,
                search_type: searchType,
                indexes: '',
                page: nextPage,
                page_size: pageSize
            };
            if (searchType === 'Search') {
                payload.indexes_statement = indexesStatement;
            }
            payload.data_filters = queryDataFilters.length > 0 ? queryDataFilters : [];
            if (searchType === 'Lucene') {
                try {
                    var _ref3;
                    const luceneWhere = (_ref3 = options === null || options === void 0 ? void 0 : options.luceneWhere) !== null && _ref3 !== void 0 ? _ref3 : yield buildLuceneWhereClause();
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    payload.lucene_where = luceneWhere;
                } catch (error) {
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                            getTableData: false
                        }));
                    setTableData([]);
                    if (requestGenerationRef.current === requestId && !restorePaused(store)) {
                        setQueryState({
                            status: 'error',
                            rowCount: 0,
                            error: (0,query_error/* createDiscoverQueryError */.I)(error, {
                                source: 'lucene',
                                searchType,
                                searchValue
                            }),
                            auxiliaryErrors: []
                        });
                    }
                    (0,runtime_.logError)((0,errors/* toError */.i)(error), {
                        source: 'useDiscoverData',
                        action: 'buildLuceneWhereClause'
                    });
                    return;
                }
            }
            if (searchValue && searchType !== 'Lucene') {
                payload.search_value = searchType === 'Search' ? (0,utils_data/* encodeBase64 */.WG)(searchValue) : searchValue;
            }
            let resultRequest;
            try {
                resultRequest = getTableDataService(useDiscoverData_object_spread({
                    selectdbDS
                }, payload), {
                    showBackendError: false
                });
            } catch (error) {
                setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                        getTableData: false
                    }));
                setTableData([]);
                setQueryState({
                    status: 'error',
                    rowCount: 0,
                    error: (0,query_error/* createDiscoverQueryError */.I)(error, {
                        source: 'results',
                        searchType,
                        searchValue
                    }),
                    auxiliaryErrors: []
                });
                return;
            }
            resultRequest.subscribe({
                next: ({ data })=>useDiscoverData_async_to_generator(function*() {
                        var _data_results_getTableData, _data_results;
                        if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                            return;
                        }
                        const processingStartedAt = performance.now();
                        measureDiscoverPhase(requestId, 'results', 'request', requestStartedAt);
                        setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                                getTableData: false
                            }));
                        const frames = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_getTableData = _data_results.getTableData) === null || _data_results_getTableData === void 0 ? void 0 : _data_results_getTableData.frames;
                        if (!frames || !frames[0]) {
                            setTableData([]);
                            setVariantFields(mergeVariantFields(variantMetadataFieldsRef.current, deriveVariantFields(tableFields, [])));
                            setQueryState((previous)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, previous), {
                                    status: 'success',
                                    rowCount: 0,
                                    error: undefined
                                }));
                            measureDiscoverPhase(requestId, 'results', 'processing', processingStartedAt);
                            return;
                        }
                        const rowsData = (0,utils_data/* convertColumnToRowViaFieldsType */.ml)(frames[0], tableFields);
                        setVariantFields(mergeVariantFields(variantMetadataFieldsRef.current, deriveVariantFields(tableFields, rowsData)));
                        const resData = (0,utils_data/* generateHighlightedResults */.F9)({
                            search_value: searchValue,
                            indexes: currentIndexes || []
                        }, rowsData);
                        const rowsDataWithUid = yield (0,utils/* generateTableDataUID */.sd)(resData);
                        if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                            return;
                        }
                        setTableData(rowsDataWithUid);
                        setQueryState((previous)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, previous), {
                                status: 'success',
                                rowCount: rowsDataWithUid.length,
                                error: undefined
                            }));
                        measureDiscoverPhase(requestId, 'results', 'processing', processingStartedAt);
                    })(),
                error: (err)=>{
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                            getTableData: false
                        }));
                    setTableData([]);
                    setVariantFields(mergeVariantFields(variantMetadataFieldsRef.current, deriveVariantFields(tableFields, [])));
                    setQueryState((previous)=>({
                            status: 'error',
                            rowCount: 0,
                            error: (0,query_error/* createDiscoverQueryError */.I)(err, {
                                source: 'results',
                                searchType,
                                searchValue
                            }),
                            auxiliaryErrors: previous.auxiliaryErrors
                        }));
                    (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                        source: 'useDiscoverData',
                        action: 'getTableData'
                    });
                }
            });
        })(), [
        store,
        buildLuceneWhereClause,
        beginQuery,
        currentCatalog,
        currentDate,
        currentDatabase,
        currentIndexes,
        currentTable,
        currentTimeField,
        queryDataFilters,
        page,
        pageSize,
        searchType,
        searchValue,
        selectdbDS,
        formatCurrentTime,
        setLoading,
        setQueryState,
        setTableData,
        setVariantFields,
        sort,
        sortContextKey,
        tableFields
    ]);
    const getTableDataCharts = (0,external_react_.useCallback)((requestId, sharedLuceneWhere)=>useDiscoverData_async_to_generator(function*() {
            if (!currentTable || !currentDatabase || !selectdbDS) {
                return;
            }
            const requestStartedAt = performance.now();
            setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                    getTableDataCharts: true
                }));
            const autoInterval = (0,constants/* getAutoInterval */.Vy)(currentDate);
            const timeInterval = interval === constants/* IntervalEnum */.Bg.Auto ? autoInterval.interval_unit : interval;
            const timeIntervalValue = interval === constants/* IntervalEnum */.Bg.Auto ? autoInterval.interval_value : 1;
            const indexesStatement = (0,utils_data/* getIndexesStatement */.cE)(currentIndexes, tableFields, searchValue);
            const payload = {
                catalog: 'internal',
                database: currentDatabase,
                table: currentTable,
                timeField: currentTimeField,
                startDate: formatCurrentTime(currentDate[0]),
                endDate: formatCurrentTime(currentDate[1]),
                cluster: '',
                data_filters: [],
                sort: 'DESC',
                interval: timeInterval,
                interval_value: timeIntervalValue,
                timeZone,
                search_type: searchType,
                indexes: indexesStatement
            };
            if (dataFilter.length > 0) {
                payload.data_filters = queryDataFilters;
            }
            if (searchType === 'Lucene') {
                try {
                    const luceneWhere = sharedLuceneWhere;
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    payload.lucene_where = luceneWhere;
                } catch (error) {
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                            getTableDataCharts: false
                        }));
                    setTableDataCharts([]);
                    (0,runtime_.logError)((0,errors/* toError */.i)(error), {
                        source: 'useDiscoverData',
                        action: 'buildLuceneWhereClause'
                    });
                    return;
                }
            }
            if (searchValue && searchType !== 'Lucene') {
                payload.search_value = searchType === 'Search' ? (0,utils_data/* encodeBase64 */.WG)(searchValue) : searchValue;
            }
            getTableDataChartsService(useDiscoverData_object_spread({
                selectdbDS
            }, payload), {
                showBackendError: false
            }).subscribe({
                next: ({ data })=>{
                    var _data_results_getTableDataCharts_frames, _data_results_getTableDataCharts, _data_results, _frame_fields_, _frame_fields_1;
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    const processingStartedAt = performance.now();
                    measureDiscoverPhase(requestId, 'histogram', 'request', requestStartedAt);
                    setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                            getTableDataCharts: false
                        }));
                    const frameData = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_getTableDataCharts = _data_results.getTableDataCharts) === null || _data_results_getTableDataCharts === void 0 ? void 0 : (_data_results_getTableDataCharts_frames = _data_results_getTableDataCharts.frames) === null || _data_results_getTableDataCharts_frames === void 0 ? void 0 : _data_results_getTableDataCharts_frames[0];
                    const frame = frameData ? (0,data_.toDataFrame)(frameData) : undefined;
                    const times = Array.from((frame === null || frame === void 0 ? void 0 : (_frame_fields_ = frame.fields[0]) === null || _frame_fields_ === void 0 ? void 0 : _frame_fields_.values) || []);
                    const values = Array.from((frame === null || frame === void 0 ? void 0 : (_frame_fields_1 = frame.fields[1]) === null || _frame_fields_1 === void 0 ? void 0 : _frame_fields_1.values) || []);
                    if (!times.length || !values.length) {
                        setTableDataCharts([]);
                        measureDiscoverPhase(requestId, 'histogram', 'processing', processingStartedAt);
                        return;
                    }
                    const tableDataCharts = times.map((item, index)=>({
                            TT: item,
                            'sum(cnt)': values[index]
                        }));
                    const chartsData = (0,utils_data/* getChartsData */.Wd)(tableDataCharts, currentDate, timeZone, {
                        interval_unit: timeInterval,
                        interval_value: timeIntervalValue
                    });
                    setTableDataCharts(chartsData);
                    measureDiscoverPhase(requestId, 'histogram', 'processing', processingStartedAt);
                },
                error: (err)=>{
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                            getTableDataCharts: false
                        }));
                    setTableDataCharts([]);
                    addAuxiliaryError(requestId, 'histogram', err);
                    (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                        source: 'useDiscoverData',
                        action: 'getTableDataCharts'
                    });
                }
            });
        })(), [
        store,
        addAuxiliaryError,
        currentDate,
        currentDatabase,
        currentIndexes,
        currentTable,
        currentTimeField,
        dataFilter,
        queryDataFilters,
        interval,
        searchType,
        searchValue,
        selectdbDS,
        formatCurrentTime,
        setLoading,
        setTableDataCharts,
        tableFields,
        timeZone
    ]);
    const getTopData = (0,external_react_.useCallback)((requestId, nextPage = 1, sharedLuceneWhere = '')=>useDiscoverData_async_to_generator(function*() {
            if (!currentTable || !currentDatabase || !selectdbDS) {
                return;
            }
            const requestStartedAt = performance.now();
            const indexesStatement = (0,utils_data/* getIndexesStatement */.cE)(currentIndexes, tableFields, searchValue);
            const payload = {
                catalog: currentCatalog,
                database: currentDatabase,
                table: currentTable,
                timeField: currentTimeField,
                startDate: formatCurrentTime(currentDate[0]),
                endDate: formatCurrentTime(currentDate[1]),
                cluster: '',
                sort: 'DESC',
                search_type: searchType,
                indexes: '',
                page: nextPage,
                page_size: 500
            };
            if (searchType === 'Search') {
                payload.indexes_statement = indexesStatement;
            }
            payload.data_filters = queryDataFilters.length > 0 ? queryDataFilters : [];
            if (searchValue && searchType !== 'Lucene') {
                payload.search_value = searchType === 'Search' ? (0,utils_data/* encodeBase64 */.WG)(searchValue) : searchValue;
            }
            if (searchType === 'Lucene') {
                try {
                    const luceneWhere = sharedLuceneWhere;
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    payload.lucene_where = luceneWhere;
                } catch (error) {
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    (0,runtime_.logError)((0,errors/* toError */.i)(error), {
                        source: 'useDiscoverData',
                        action: 'buildLuceneWhereClause'
                    });
                    setTopData([]);
                    return;
                }
            }
            getTopDataService(useDiscoverData_object_spread({
                selectdbDS
            }, payload), {
                showBackendError: false
            }).subscribe({
                next: ({ data })=>{
                    var _data_results_getTableTopData, _data_results;
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    const processingStartedAt = performance.now();
                    measureDiscoverPhase(requestId, 'top-data', 'request', requestStartedAt);
                    const frames = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_getTableTopData = _data_results.getTableTopData) === null || _data_results_getTableTopData === void 0 ? void 0 : _data_results_getTableTopData.frames;
                    if (!frames || !frames[0]) {
                        setTopData([]);
                        measureDiscoverPhase(requestId, 'top-data', 'processing', processingStartedAt);
                        return;
                    }
                    const samples = (0,utils_data/* convertColumnToRowViaFieldsType */.ml)(frames[0], tableFields);
                    setTopData(samples);
                    rememberVariantSamples(store, JSON.stringify([
                        selectdbDS.uid,
                        currentDatabase,
                        currentTable
                    ]), tableFields.filter((field)=>/^VARIANT/i.test(field.Type || '')).map((field)=>String(field.Field)), samples);
                    measureDiscoverPhase(requestId, 'top-data', 'processing', processingStartedAt);
                },
                error: (err)=>{
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                        source: 'useDiscoverData',
                        action: 'getTopData'
                    });
                    setTopData([]);
                    addAuxiliaryError(requestId, 'topData', err);
                }
            });
        })(), [
        addAuxiliaryError,
        currentCatalog,
        currentDate,
        currentDatabase,
        currentIndexes,
        currentTable,
        currentTimeField,
        queryDataFilters,
        searchType,
        searchValue,
        selectdbDS,
        formatCurrentTime,
        setTopData,
        tableFields,
        store
    ]);
    const getTableDataCount = (0,external_react_.useCallback)((requestId, sharedLuceneWhere)=>useDiscoverData_async_to_generator(function*() {
            if (!currentTable || !currentDatabase || !selectdbDS) {
                return;
            }
            const requestStartedAt = performance.now();
            const autoInterval = (0,constants/* getAutoInterval */.Vy)(currentDate);
            const timeInterval = interval === constants/* IntervalEnum */.Bg.Auto ? autoInterval.interval_unit : interval;
            const timeIntervalValue = interval === constants/* IntervalEnum */.Bg.Auto ? autoInterval.interval_value : 1;
            const indexesStatement = (0,utils_data/* getIndexesStatement */.cE)(currentIndexes, tableFields, searchValue);
            const payload = {
                catalog: 'internal',
                database: currentDatabase,
                table: currentTable,
                timeField: currentTimeField,
                startDate: formatCurrentTime(currentDate[0]),
                endDate: formatCurrentTime(currentDate[1]),
                cluster: '',
                sort: 'DESC',
                interval: timeInterval,
                data_filters: [],
                interval_value: timeIntervalValue,
                search_type: searchType,
                indexes: indexesStatement
            };
            if (dataFilter.length > 0) {
                payload.data_filters = queryDataFilters;
            }
            if (searchType === 'Lucene') {
                try {
                    const luceneWhere = sharedLuceneWhere;
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    payload.lucene_where = luceneWhere;
                } catch (error) {
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    (0,runtime_.logError)((0,errors/* toError */.i)(error), {
                        source: 'useDiscoverData',
                        action: 'buildLuceneWhereClause'
                    });
                    setTableTotalCount(0);
                    return;
                }
            }
            if (searchValue && searchType !== 'Lucene') {
                payload.search_value = searchType === 'Search' ? (0,utils_data/* encodeBase64 */.WG)(searchValue) : searchValue;
            }
            getTableDataCountService(useDiscoverData_object_spread({
                selectdbDS
            }, payload), {
                showBackendError: false
            }).subscribe({
                next: ({ data })=>{
                    var _data_results_getTableCountData_frames, _data_results_getTableCountData, _data_results, _frame_fields_;
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    const processingStartedAt = performance.now();
                    measureDiscoverPhase(requestId, 'count', 'request', requestStartedAt);
                    setLoading((prev)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, prev), {
                            getTableDataCount: false
                        }));
                    const frameData = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_getTableCountData = _data_results.getTableCountData) === null || _data_results_getTableCountData === void 0 ? void 0 : (_data_results_getTableCountData_frames = _data_results_getTableCountData.frames) === null || _data_results_getTableCountData_frames === void 0 ? void 0 : _data_results_getTableCountData_frames[0];
                    const frame = frameData ? (0,data_.toDataFrame)(frameData) : undefined;
                    const totalCount = normalizeCount(frame === null || frame === void 0 ? void 0 : (_frame_fields_ = frame.fields[0]) === null || _frame_fields_ === void 0 ? void 0 : _frame_fields_.values[0]);
                    setTableTotalCount(totalCount);
                    measureDiscoverPhase(requestId, 'count', 'processing', processingStartedAt);
                },
                error: (err)=>{
                    if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                        return;
                    }
                    setTableTotalCount(0);
                    addAuxiliaryError(requestId, 'count', err);
                    (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                        source: 'useDiscoverData',
                        action: 'getTableDataCount'
                    });
                }
            });
        })(), [
        store,
        addAuxiliaryError,
        currentDate,
        currentDatabase,
        currentIndexes,
        currentTable,
        currentTimeField,
        dataFilter,
        queryDataFilters,
        interval,
        searchType,
        searchValue,
        selectdbDS,
        formatCurrentTime,
        setLoading,
        setTableTotalCount,
        tableFields
    ]);
    const getTraceData = (0,external_react_.useCallback)((trace_id, table, callback)=>{
        const indexesStatement = (0,utils_data/* getIndexesStatement */.cE)(currentIndexes, tableFields, searchValue);
        const payload = {
            catalog: currentCatalog,
            database: currentDatabase,
            table: table || currentTable || 'otel_traces',
            timeField: currentTimeField,
            startDate: formatCurrentTime(currentDate[0]),
            endDate: formatCurrentTime(currentDate[1]),
            cluster: '',
            sort: 'DESC',
            search_type: searchType,
            indexes: '',
            page: page,
            page_size: pageSize,
            trace_id
        };
        if (searchType === 'Search') {
            payload.indexes_statement = indexesStatement;
        }
        payload.data_filters = queryDataFilters.length > 0 ? queryDataFilters : [];
        if (searchValue) {
            payload.search_value = (0,utils_data/* encodeBase64 */.WG)(searchValue);
        }
        (0,traces/* getTableDataTraceService */.hA)(useDiscoverData_object_spread({
            selectdbDS
        }, payload)).subscribe({
            next: ({ data, ok })=>{
                callback && callback(data.results.getTableDataTrace.status);
                if (!ok) {
                    message/* default */.Ay.error((0,i18n.t)('Failed to request trace'));
                    return;
                }
                const formattedData = (0,utils_data/* formatTracesResData */.O1)(data.results.getTableDataTrace.frames[0]);
                setTraceData(formattedData);
            },
            error: (err)=>{
                // Clear trace data on error
                setTraceData([]);
                (0,runtime_.logError)((0,errors/* toError */.i)(err), {
                    source: 'useDiscoverData',
                    action: 'getTraceData'
                });
                callback && callback(err.status);
                message/* default */.Ay.error((0,i18n.t)('Failed to request trace'));
                setTraceData(null);
            }
        });
    }, [
        currentCatalog,
        currentDate,
        currentDatabase,
        currentIndexes,
        currentTable,
        currentTimeField,
        queryDataFilters,
        page,
        pageSize,
        searchType,
        searchValue,
        selectdbDS,
        formatCurrentTime,
        setTraceData,
        tableFields
    ]);
    const clearData = (0,external_react_.useCallback)(()=>{
        requestGenerationRef.current += 1;
        setTableDataCharts([]);
        setTableTotalCount(0);
        setTableData([]);
        setTopData([]);
        setQueryState({
            status: 'idle',
            rowCount: 0,
            auxiliaryErrors: []
        });
    }, [
        setQueryState,
        setTableData,
        setTableDataCharts,
        setTableTotalCount,
        setTopData
    ]);
    const refreshData = (0,external_react_.useCallback)(({ skipPageReset = false, forceRefresh = false } = {})=>useDiscoverData_async_to_generator(function*() {
            if (restorePaused(store)) {
                return;
            }
            if (!selectdbDS || !currentDatabase || !currentTable || !currentTimeField) {
                clearData();
                return;
            }
            const nextPage = skipPageReset ? page : 1;
            if (!skipPageReset && page !== 1) {
                suppressNextPageEffectRef.current = true;
                setPage(1);
            }
            const requestId = beginQuery();
            setLoading((previous)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, previous), {
                    getTableData: true,
                    getTableDataCharts: true
                }));
            try {
                const luceneWhere = yield buildLuceneWhereClause({
                    refreshMetadata: forceRefresh,
                    refreshPaths: forceRefresh
                });
                if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                    return;
                }
                void getTableDataCharts(requestId, luceneWhere);
                void getTableData({
                    requestId,
                    nextPage,
                    luceneWhere
                });
                void getTableDataCount(requestId, luceneWhere);
                void getTopData(requestId, nextPage, luceneWhere);
            } catch (error) {
                if (requestGenerationRef.current !== requestId || restorePaused(store)) {
                    return;
                }
                setTableData([]);
                setTableDataCharts([]);
                setTableTotalCount(0);
                setTopData([]);
                setQueryState({
                    status: 'error',
                    rowCount: 0,
                    error: (0,query_error/* createDiscoverQueryError */.I)(error, {
                        source: 'lucene',
                        searchType,
                        searchValue
                    }),
                    auxiliaryErrors: []
                });
                setLoading((previous)=>useDiscoverData_object_spread_props(useDiscoverData_object_spread({}, previous), {
                        getTableData: false,
                        getTableDataCharts: false
                    }));
            }
        })(), [
        store,
        beginQuery,
        clearData,
        currentDatabase,
        currentTable,
        currentTimeField,
        getTableData,
        getTableDataCharts,
        getTableDataCount,
        getTopData,
        page,
        selectdbDS,
        setPage,
        buildLuceneWhereClause,
        searchType,
        searchValue,
        setQueryState,
        setLoading,
        setTableData,
        setTableDataCharts,
        setTableTotalCount,
        setTopData
    ]);
    const handleQuerying = (0,external_react_.useCallback)(()=>{
        if (!currentTimeField) {
            clearData();
            return;
        }
        void refreshData();
    }, [
        clearData,
        currentTimeField,
        refreshData
    ]);
    const handleSortChange = (0,external_react_.useCallback)((nextSort)=>{
        if (!currentTimeField) {
            return;
        }
        setSort(nextSort);
        if (page !== 1) {
            suppressNextPageEffectRef.current = true;
            setPage(1);
        }
        const requestId = beginQuery();
        void getTableData({
            requestId,
            nextPage: 1,
            nextSort
        });
    }, [
        beginQuery,
        currentTimeField,
        getTableData,
        page,
        setPage,
        setSort
    ]);
    (0,external_react_.useEffect)(()=>{
        sortContextRef.current = sortContextKey;
        if (restorePaused(store)) {
            return;
        }
        if (shareReady && sort.field) {
            return;
        }
        setSort({
            field: currentTimeField,
            direction: 'DESC'
        });
    }, [
        currentTimeField,
        setSort,
        shareReady,
        sort.field,
        sortContextKey,
        store
    ]);
    (0,external_react_.useEffect)(()=>{
        if (!didRunPageEffect.current) {
            didRunPageEffect.current = true;
            return;
        }
        if (!currentTimeField || restorePaused(store)) {
            return;
        }
        if (suppressNextPageEffectRef.current) {
            suppressNextPageEffectRef.current = false;
            return;
        }
        void getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        page,
        pageSize
    ]);
    (0,external_react_.useEffect)(()=>{
        if (!didRunAutoRefreshEffect.current) {
            didRunAutoRefreshEffect.current = true;
            return;
        }
        if (!shareReady) {
            return;
        }
        refreshData({
            skipPageReset: false
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        currentDate,
        currentDatabase,
        currentTable,
        currentTimeField,
        dataFilter,
        interval,
        selectdbDS,
        shareReady,
        timeZone
    ]);
    return {
        loading,
        queryState,
        sort,
        onSortChange: handleSortChange,
        onQuerying: handleQuerying,
        onRefresh: ()=>{
            void refreshData({
                forceRefresh: true
            });
        },
        getTraceData
    };
}

;// ./components/discover-query-feedback/index.tsx




function getLocationText(error) {
    const location = error.location;
    if (!location) {
        return (0,i18n.t)('Location: The backend did not report an error position.');
    }
    if (location.inputLine && location.inputColumn) {
        return location.inputPosition ? (0,i18n.t)('Input location: line {{line}}, column {{column}} (character {{position}}).', {
            line: location.inputLine,
            column: location.inputColumn,
            position: location.inputPosition
        }) : (0,i18n.t)('Input location: line {{line}}, column {{column}}.', {
            line: location.inputLine,
            column: location.inputColumn
        });
    }
    if (location.line && location.column) {
        return (0,i18n.t)('Generated SQL location: line {{line}}, column {{column}}.', {
            line: location.line,
            column: location.column
        });
    }
    if (location.position) {
        return (0,i18n.t)('Generated SQL position: character {{position}}.', {
            position: location.position
        });
    }
    if (location.near) {
        return (0,i18n.t)('Reported near: {{near}}', {
            near: location.near
        });
    }
    return (0,i18n.t)('Location: The backend did not report an error position.');
}
function QueryErrorDetails({ error }) {
    var _error_location;
    const theme = (0,ui_.useTheme2)();
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                display: grid;
                gap: 6px;
                margin-top: 4px;
                overflow-wrap: anywhere;
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement("strong", null, (0,i18n.t)('Backend message')), /*#__PURE__*/ external_react_default().createElement("pre", {
        className: (0,css_.css)`
                        max-height: 180px;
                        margin: 4px 0 0;
                        padding: 8px;
                        overflow: auto;
                        border-radius: 4px;
                        background: ${theme.colors.background.canvas};
                        color: ${theme.colors.text.primary};
                        white-space: pre-wrap;
                    `
    }, error.message)), /*#__PURE__*/ external_react_default().createElement("div", null, getLocationText(error)), ((_error_location = error.location) === null || _error_location === void 0 ? void 0 : _error_location.near) ? /*#__PURE__*/ external_react_default().createElement("div", null, (0,i18n.t)('Near:'), /*#__PURE__*/ external_react_default().createElement("code", null, error.location.near)) : null, /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement("strong", null, (0,i18n.t)('Possible cause:')), " ", error.likelyCause), error.generatedSql ? /*#__PURE__*/ external_react_default().createElement("details", null, /*#__PURE__*/ external_react_default().createElement("summary", {
        className: (0,css_.css)`
                            width: fit-content;
                            cursor: pointer;
                            font-weight: 500;
                        `
    }, (0,i18n.t)('Generated SQL')), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`margin-top: 8px;`
    }, /*#__PURE__*/ external_react_default().createElement("pre", {
        className: (0,css_.css)`
                                max-height: 260px;
                                margin: 4px 0 0;
                                padding: 8px;
                                overflow: auto;
                                border-radius: 4px;
                                background: ${theme.colors.background.canvas};
                                color: ${theme.colors.text.primary};
                                white-space: pre-wrap;
                            `
    }, error.generatedSql))) : null);
}
function DiscoverQueryFeedback({ queryState, searchType, database, table }) {
    const tableContext = database && table ? `${database}.${table}` : (0,i18n.t)('No table selected');
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                display: grid;
                gap: 8px;
                margin-top: 8px;
            `
    }, queryState.status === 'error' && queryState.error ? /*#__PURE__*/ external_react_default().createElement(ui_.Alert, {
        title: (0,i18n.t)('Query failed'),
        severity: "error"
    }, /*#__PURE__*/ external_react_default().createElement("div", null, (0,i18n.t)('{{mode}} query on {{table}} did not complete.', {
        mode: searchType === 'Search' ? (0,i18n.t)('Search') : searchType,
        table: tableContext
    })), /*#__PURE__*/ external_react_default().createElement(QueryErrorDetails, {
        error: queryState.error
    })) : null, queryState.status !== 'error' && queryState.auxiliaryErrors.length > 0 ? /*#__PURE__*/ external_react_default().createElement(ui_.Alert, {
        title: (0,i18n.t)('Partial query failure'),
        severity: "warning"
    }, /*#__PURE__*/ external_react_default().createElement("div", null, (0,i18n.t)('The result query completed, but some supporting queries failed.')), queryState.auxiliaryErrors.map((error)=>/*#__PURE__*/ external_react_default().createElement("div", {
            key: error.source,
            className: (0,css_.css)`margin-top: 8px;`
        }, /*#__PURE__*/ external_react_default().createElement("strong", null, error.summary), /*#__PURE__*/ external_react_default().createElement(QueryErrorDetails, {
            error: error
        })))) : null);
}

;// ./components/field-statistics/index.tsx
function field_statistics_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function field_statistics_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                field_statistics_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                field_statistics_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function field_statistics_define_property(obj, key, value) {
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
function field_statistics_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            field_statistics_define_property(target, key, source[key]);
        });
    }
    return target;
}
function field_statistics_ownKeys(object, enumerableOnly) {
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
function field_statistics_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        field_statistics_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}














function numberValue(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
}
function parseHistogram(value) {
    if (!value) {
        return [];
    }
    try {
        const parsed = typeof value === 'string' ? JSON.parse(value) : value;
        return Array.isArray(parsed === null || parsed === void 0 ? void 0 : parsed.buckets) ? parsed.buckets.map((bucket)=>({
                lower: String(bucket.lower),
                upper: String(bucket.upper),
                count: numberValue(bucket.count),
                ndv: numberValue(bucket.ndv)
            })) : [];
    } catch (unused) {
        return [];
    }
}
function isContinuousType(type) {
    return /(TINYINT|SMALLINT|MEDIUMINT|INT|BIGINT|LARGEINT|FLOAT|DOUBLE|DECIMAL|DATE|TIME|TIMESTAMP)/i.test(type || '');
}
function FieldStatistics() {
    const theme = (0,ui_.useTheme2)();
    const [field, setField] = (0,react/* useAtom */.fp)(discover/* fieldStatisticsFieldAtom */.V_);
    const [result, setResult] = (0,react/* useAtom */.fp)(discover/* fieldStatisticsResultAtom */.wV);
    const [loading, setLoading] = (0,react/* useAtom */.fp)(discover/* fieldStatisticsLoadingAtom */.nL);
    const [error, setError] = (0,react/* useAtom */.fp)(discover/* fieldStatisticsErrorAtom */.n);
    const [filters, setFilters] = (0,react/* useAtom */.fp)(discover/* dataFilterAtom */.EA);
    const datasource = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const catalog = (0,react/* useAtomValue */.md)(discover/* currentCatalogAtom */.K0);
    const database = (0,react/* useAtomValue */.md)(discover/* currentDatabaseAtom */.Cf);
    const table = (0,react/* useAtomValue */.md)(discover/* currentTableAtom */.$w);
    const timeField = (0,react/* useAtomValue */.md)(discover/* currentTimeFieldAtom */.CA);
    const date = (0,react/* useAtomValue */.md)(discover/* currentDateAtom */.Zb);
    const timeZone = (0,react/* useAtomValue */.md)(discover/* timeZoneAtom */.tF);
    const indexes = (0,react/* useAtomValue */.md)(discover/* currentIndexAtom */.TY);
    const tableFields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const variantFields = (0,react/* useAtomValue */.md)(discover/* variantFieldsAtom */.cE);
    const searchType = (0,react/* useAtomValue */.md)(discover/* searchTypeAtom */.WM);
    const searchValue = (0,react/* useAtomValue */.md)(discover/* searchValueAtom */.P8);
    const setQueryState = (0,react/* useSetAtom */.Xr)(discover/* discoverQueryStateAtom */.g_);
    const buildLuceneWhereClause = useLuceneWhereClause();
    const generation = (0,external_react_.useRef)(0);
    (0,external_react_.useEffect)(()=>{
        const requestId = generation.current + 1;
        generation.current = requestId;
        setResult(undefined);
        setError(undefined);
        if (!field || !datasource || !database || !table || !timeField || !date[0] || !date[1]) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const allFields = [
            ...tableFields,
            ...flattenVariantLeaves(variantFields)
        ];
        const payload = {
            catalog,
            database,
            table,
            timeField,
            startDate: (0,utils_time/* formatTimeInZone */.Oh)(date[0], timeZone),
            endDate: (0,utils_time/* formatTimeInZone */.Oh)(date[1], timeZone),
            search_type: searchType,
            data_filters: (0,sql_filter/* enrichStructuredFilterTypes */.a9)(filters, allFields),
            field
        };
        if (searchType === 'Search') {
            payload.indexes_statement = (0,utils_data/* getIndexesStatement */.cE)(indexes, tableFields, searchValue);
        }
        if (searchValue && searchType !== 'Lucene') {
            payload.search_value = searchType === 'Search' ? (0,utils_data/* encodeBase64 */.WG)(searchValue) : searchValue;
        }
        const run = ()=>field_statistics_async_to_generator(function*() {
                try {
                    if (searchType === 'Lucene') {
                        payload.lucene_where = yield buildLuceneWhereClause();
                    }
                    if (generation.current !== requestId) {
                        return;
                    }
                    getFieldStatisticsService(field_statistics_object_spread({
                        selectdbDS: datasource
                    }, payload), {
                        showBackendError: false
                    }).subscribe({
                        next: ({ data })=>{
                            var _data_results_getFieldStatisticsSummary_frames, _data_results_getFieldStatisticsSummary, _data_results, _data_results_getFieldStatisticsTopValues_frames, _data_results_getFieldStatisticsTopValues, _data_results1;
                            if (generation.current !== requestId) {
                                return;
                            }
                            const summaryFrame = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_getFieldStatisticsSummary = _data_results.getFieldStatisticsSummary) === null || _data_results_getFieldStatisticsSummary === void 0 ? void 0 : (_data_results_getFieldStatisticsSummary_frames = _data_results_getFieldStatisticsSummary.frames) === null || _data_results_getFieldStatisticsSummary_frames === void 0 ? void 0 : _data_results_getFieldStatisticsSummary_frames[0];
                            const topFrame = data === null || data === void 0 ? void 0 : (_data_results1 = data.results) === null || _data_results1 === void 0 ? void 0 : (_data_results_getFieldStatisticsTopValues = _data_results1.getFieldStatisticsTopValues) === null || _data_results_getFieldStatisticsTopValues === void 0 ? void 0 : (_data_results_getFieldStatisticsTopValues_frames = _data_results_getFieldStatisticsTopValues.frames) === null || _data_results_getFieldStatisticsTopValues_frames === void 0 ? void 0 : _data_results_getFieldStatisticsTopValues_frames[0];
                            const summary = summaryFrame ? (0,utils_data/* convertColumnToRow */.HL)(summaryFrame)[0] || {} : {};
                            const topValues = topFrame ? (0,utils_data/* convertColumnToRow */.HL)(topFrame).map((row)=>({
                                    value: row.__field_stats_value,
                                    count: numberValue(row.__field_stats_count)
                                })) : [];
                            setResult({
                                totalCount: numberValue(summary.__field_stats_total),
                                nonNullCount: numberValue(summary.__field_stats_non_null),
                                approximateDistinctCount: numberValue(summary.__field_stats_distinct),
                                min: summary.__field_stats_min,
                                max: summary.__field_stats_max,
                                histogram: parseHistogram(summary.__field_stats_histogram),
                                topValues
                            });
                            setLoading(false);
                        },
                        error: (requestError)=>{
                            if (generation.current !== requestId) {
                                return;
                            }
                            setLoading(false);
                            setError(requestError instanceof Error ? requestError : new Error(String((requestError === null || requestError === void 0 ? void 0 : requestError.message) || (0,i18n.t)('Field statistics request failed'))));
                            const queryError = (0,query_error/* createDiscoverQueryError */.I)(requestError, {
                                source: 'fieldStatistics',
                                searchType,
                                searchValue
                            });
                            setQueryState((current)=>field_statistics_object_spread_props(field_statistics_object_spread({}, current), {
                                    auxiliaryErrors: [
                                        ...current.auxiliaryErrors.filter((item)=>item.source !== 'fieldStatistics'),
                                        queryError
                                    ]
                                }));
                        }
                    });
                } catch (requestError) {
                    if (generation.current !== requestId) {
                        return;
                    }
                    setLoading(false);
                    setError(requestError instanceof Error ? requestError : new Error(String((requestError === null || requestError === void 0 ? void 0 : requestError.message) || (0,i18n.t)('Field statistics request failed'))));
                }
            })();
        void run();
        return ()=>{
            generation.current += 1;
        };
    }, [
        buildLuceneWhereClause,
        catalog,
        database,
        datasource,
        date,
        field,
        filters,
        indexes,
        searchType,
        searchValue,
        setError,
        setLoading,
        setQueryState,
        setResult,
        table,
        tableFields,
        timeField,
        timeZone,
        variantFields
    ]);
    if (!field) {
        return null;
    }
    const close = ()=>{
        generation.current += 1;
        setField(undefined);
        setResult(undefined);
        setError(undefined);
    };
    const percentage = (result === null || result === void 0 ? void 0 : result.totalCount) ? result.nonNullCount * 100 / result.totalCount : 0;
    const maxTopCount = Math.max(...(result === null || result === void 0 ? void 0 : result.topValues.map((item)=>item.count)) || [], 1);
    return /*#__PURE__*/ external_react_default().createElement(ui_.Drawer, {
        title: (0,i18n.t)('Field statistics: {{field}}', {
            field: field.Field
        }),
        size: "md",
        onClose: close
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`display:grid; gap:16px; padding: 0 8px 16px;`
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`color:${theme.colors.text.secondary}; font-size:12px;`
    }, /*#__PURE__*/ external_react_default().createElement("div", null, field.Type || (0,i18n.t)('Unknown type'), " ", (0,i18n.t)('· All matching data')), /*#__PURE__*/ external_react_default().createElement("div", null, (0,i18n.t)('Statistics cover all matching records in the current time range and query, beyond the card preview\'s 500-record sample.'))), loading ? /*#__PURE__*/ external_react_default().createElement(ui_.LoadingPlaceholder, {
        text: (0,i18n.t)('Loading field statistics')
    }) : null, error ? /*#__PURE__*/ external_react_default().createElement("div", {
        role: "alert",
        className: (0,css_.css)`color:${theme.colors.error.text};`
    }, error.message) : null, result ? /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement("section", null, /*#__PURE__*/ external_react_default().createElement("h4", null, (0,i18n.t)('Non-null values')), /*#__PURE__*/ external_react_default().createElement("strong", null, result.nonNullCount.toLocaleString(), " / ", result.totalCount.toLocaleString(), " (", percentage.toFixed(1), "%)")), /*#__PURE__*/ external_react_default().createElement("section", null, /*#__PURE__*/ external_react_default().createElement("h4", null, (0,i18n.t)('Approximate unique values')), /*#__PURE__*/ external_react_default().createElement("strong", null, "≈ ", result.approximateDistinctCount.toLocaleString())), /*#__PURE__*/ external_react_default().createElement("section", null, /*#__PURE__*/ external_react_default().createElement("h4", null, (0,i18n.t)('Top values')), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`display:grid; gap:10px;`
    }, result.topValues.length ? result.topValues.map((item, index)=>{
        const display = (0,utils_data/* formatFieldDisplayValue */.xW)(item.value, 'compact');
        const filterValue = typeof item.value === 'string' || typeof item.value === 'number' || typeof item.value === 'boolean' ? item.value : undefined;
        return /*#__PURE__*/ external_react_default().createElement("div", {
            key: `${display}-${index}`,
            className: (0,css_.css)`display:grid; grid-template-columns:minmax(0, 1fr) auto; gap:8px; align-items:center;`
        }, /*#__PURE__*/ external_react_default().createElement("div", null, /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`overflow:hidden; text-overflow:ellipsis; white-space:nowrap;`,
            title: display
        }, display), /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`height:5px; background:${theme.colors.background.secondary}; margin-top:4px;`
        }, /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`height:100%; background:${theme.colors.primary.main};`,
            style: {
                width: `${item.count * 100 / maxTopCount}%`
            }
        }))), /*#__PURE__*/ external_react_default().createElement("div", {
            className: (0,css_.css)`display:flex; align-items:center; gap:4px;`
        }, /*#__PURE__*/ external_react_default().createElement("span", null, item.count.toLocaleString()), filterValue !== undefined ? /*#__PURE__*/ external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
            name: "plus-circle",
            tooltip: (0,i18n.t)('Include value'),
            onClick: ()=>setFilters((current)=>[
                        ...current,
                        {
                            fieldName: field.Field,
                            variantPath: field.variantPath,
                            variantRootType: field.variantRootType,
                            fieldType: field.Type,
                            operator: '=',
                            value: [
                                filterValue
                            ],
                            id: (0,index_browser/* nanoid */.Ak)()
                        }
                    ])
        }), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
            name: "minus-circle",
            tooltip: (0,i18n.t)('Exclude value'),
            onClick: ()=>setFilters((current)=>[
                        ...current,
                        {
                            fieldName: field.Field,
                            variantPath: field.variantPath,
                            variantRootType: field.variantRootType,
                            fieldType: field.Type,
                            operator: '!=',
                            value: [
                                filterValue
                            ],
                            id: (0,index_browser/* nanoid */.Ak)()
                        }
                    ])
        })) : null));
    }) : /*#__PURE__*/ external_react_default().createElement("span", null, (0,i18n.t)('No non-null values')))), isContinuousType(field.Type) ? /*#__PURE__*/ external_react_default().createElement("section", null, /*#__PURE__*/ external_react_default().createElement("h4", null, (0,i18n.t)('Range and distribution')), /*#__PURE__*/ external_react_default().createElement("div", null, (0,i18n.t)('Min:'), (0,utils_data/* formatFieldDisplayValue */.xW)(result.min), " ", (0,i18n.t)('· Max:'), (0,utils_data/* formatFieldDisplayValue */.xW)(result.max)), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`display:flex; align-items:end; gap:2px; height:120px; margin-top:12px;`
    }, result.histogram.map((bucket, index)=>/*#__PURE__*/ external_react_default().createElement("div", {
            key: `${bucket.lower}-${index}`,
            title: `${bucket.lower} – ${bucket.upper}: ${bucket.count}`,
            className: (0,css_.css)`flex:1; min-width:4px; background:${theme.colors.primary.main};`,
            style: {
                height: `${result.nonNullCount ? Math.max(2, bucket.count * 100 / result.nonNullCount) : 0}%`
            }
        })))) : null) : null));
}

;// ./components/discover-content/top-n-results.tsx






function TopNResults({ loading, hasRun, error }) {
    const fields = (0,react/* useAtomValue */.md)(discover/* topNResultFieldsAtom */.Jf);
    const rows = (0,react/* useAtomValue */.md)(discover/* topNRowsAtom */.q1);
    const config = (0,react/* useAtomValue */.md)(discover/* topNConfigAtom */.vr);
    const theme = (0,ui_.useTheme2)();
    const metricLabel = config.metric === 'COUNT' ? (0,i18n.t)('Record count') : `${config.metric}(${config.metricField})`;
    if (!hasRun) {
        return null;
    }
    if (error) {
        return /*#__PURE__*/ external_react_default().createElement(ui_.Alert, {
            title: (0,i18n.t)('Top N statistics failed'),
            severity: "error"
        }, error.message);
    }
    return /*#__PURE__*/ external_react_default().createElement("section", {
        "aria-label": (0,i18n.t)('Top N aggregation results'),
        "data-testid": "discover-top-n-results",
        className: (0,css_.css)`
                margin: 0;
                padding-top: ${theme.spacing(3)};
                border-top: 1px solid ${theme.colors.border.weak};
            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: ${theme.spacing(1)};
                    margin-bottom: ${theme.spacing(1)};
                `
    }, /*#__PURE__*/ external_react_default().createElement("h4", {
        className: (0,css_.css)`
                        margin: 0;
                        font-size: ${theme.typography.h5.fontSize};
                    `
    }, (0,i18n.t)('Aggregation results')), /*#__PURE__*/ external_react_default().createElement("span", {
        className: (0,css_.css)`
                        color: ${theme.colors.text.secondary};
                        font-size: ${theme.typography.bodySmall.fontSize};
                    `
    }, loading ? (0,i18n.t)('Calculating') : (0,i18n.t)('{{count}} groups', {
        count: rows.length
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    margin-bottom: ${theme.spacing(2)};
                    color: ${theme.colors.text.secondary};
                    font-size: ${theme.typography.bodySmall.fontSize};
                    line-height: 1.6;
                    overflow-wrap: anywhere;
                `
    }, config.direction === 'ASC' ? (0,i18n.t)('Bottom') : (0,i18n.t)('Top'), " ", config.limit, " · ", config.groupField, " · ", metricLabel), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                    max-height: 480px;
                    overflow: auto;
                    border: 1px solid ${theme.colors.border.weak};
                    border-radius: ${theme.shape.radius.default};
                `
    }, /*#__PURE__*/ external_react_default().createElement("table", {
        className: (0,css_.css)`
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 14px;
                    `
    }, /*#__PURE__*/ external_react_default().createElement("thead", null, /*#__PURE__*/ external_react_default().createElement("tr", null, fields.map((field)=>/*#__PURE__*/ external_react_default().createElement("th", {
            key: field.Field,
            className: (0,css_.css)`
                                        position: sticky;
                                        top: 0;
                                        background: ${theme.colors.background.secondary};
                                        padding: ${theme.spacing(1.5)};
                                        border-bottom: 1px solid ${theme.colors.border.weak};
                                        text-align: ${field.Field === '__top_n_value' ? 'right' : 'left'};
                                    `
        }, field.Field === '__top_n_value' ? metricLabel : field.Field)))), /*#__PURE__*/ external_react_default().createElement("tbody", null, (loading ? [] : rows).map((row, index)=>/*#__PURE__*/ external_react_default().createElement("tr", {
            key: index,
            className: (0,css_.css)`
                                    &:hover {
                                        background: ${theme.colors.action.hover};
                                    }
                                    &:last-child td {
                                        border-bottom: 0;
                                    }
                                `
        }, fields.map((field)=>/*#__PURE__*/ external_react_default().createElement("td", {
                key: field.Field,
                className: (0,css_.css)`
                                            padding: ${theme.spacing(1.5)};
                                            border-bottom: 1px solid ${theme.colors.border.weak};
                                            overflow-wrap: anywhere;
                                            font-variant-numeric: tabular-nums;
                                            text-align: ${field.Field === '__top_n_value' ? 'right' : 'left'};
                                        `
            }, row[field.Field] == null ? 'NULL' : String(row[field.Field])))))))), loading ? /*#__PURE__*/ external_react_default().createElement("div", {
        role: "status",
        className: (0,css_.css)`
                        padding: 16px;
                        font-size: 14px;
                    `
    }, (0,i18n.t)('Calculating…')) : rows.length === 0 ? /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        padding: 16px;
                        font-size: 14px;
                    `
    }, (0,i18n.t)('No matching groups')) : null);
}

;// ./components/top-n-configuration/useTopNData.ts
function useTopNData_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
function useTopNData_async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                useTopNData_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                useTopNData_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function useTopNData_define_property(obj, key, value) {
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
function useTopNData_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            useTopNData_define_property(target, key, source[key]);
        });
    }
    return target;
}
function useTopNData_ownKeys(object, enumerableOnly) {
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
function useTopNData_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        useTopNData_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}










/** Runs sidebar aggregation independently from the main table and its query state. */ function useTopNData(fieldName) {
    const store = (0,react/* useStore */.Pj)();
    const datasource = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const catalog = (0,react/* useAtomValue */.md)(discover/* currentCatalogAtom */.K0);
    const database = (0,react/* useAtomValue */.md)(discover/* currentDatabaseAtom */.Cf);
    const table = (0,react/* useAtomValue */.md)(discover/* currentTableAtom */.$w);
    const timeField = (0,react/* useAtomValue */.md)(discover/* currentTimeFieldAtom */.CA);
    const dates = (0,react/* useAtomValue */.md)(discover/* currentDateAtom */.Zb);
    const filters = (0,react/* useAtomValue */.md)(discover/* dataFilterAtom */.EA);
    const searchType = (0,react/* useAtomValue */.md)(discover/* searchTypeAtom */.WM);
    const searchValue = (0,react/* useAtomValue */.md)(discover/* searchValueAtom */.P8);
    const config = (0,react/* useAtomValue */.md)(discover/* topNConfigAtom */.vr);
    const enabled = (0,react/* useAtomValue */.md)(discover/* topNEnabledAtom */.w);
    const request = (0,react/* useAtomValue */.md)(discover/* topNRunRequestAtom */.JC);
    const setFields = (0,react/* useSetAtom */.Xr)(discover/* topNResultFieldsAtom */.Jf);
    const setRows = (0,react/* useSetAtom */.Xr)(discover/* topNRowsAtom */.q1);
    const buildLuceneWhereClause = useLuceneWhereClause();
    const [state, setState] = (0,external_react_.useState)({
        loading: false,
        hasRun: false
    });
    (0,external_react_.useEffect)(()=>{
        if (!enabled || !request || config.groupField !== fieldName) {
            setState({
                loading: false,
                hasRun: false
            });
            return;
        }
        let active = true;
        let subscription;
        setState({
            loading: true,
            hasRun: true
        });
        setFields([]);
        setRows([]);
        const fail = (error)=>{
            if (active) {
                setState({
                    loading: false,
                    hasRun: true,
                    error: error instanceof Error ? error : new Error(String(error))
                });
            }
        };
        const run = ()=>useTopNData_async_to_generator(function*() {
                if (!datasource || !database || !table || !timeField || !dates[0] || !dates[1]) {
                    throw new Error((0,i18n.t)('Select a datasource, table, time field, and time range first'));
                }
                const luceneWhere = searchType === 'Lucene' ? yield buildLuceneWhereClause() : undefined;
                if (!active) {
                    return;
                }
                const physicalFields = store.get(discover/* tableFieldsAtom */.D_);
                const allFields = [
                    ...physicalFields,
                    ...flattenVariantLeaves(store.get(discover/* variantFieldsAtom */.cE))
                ];
                const payload = useTopNData_object_spread(useTopNData_object_spread_props(useTopNData_object_spread({
                    selectdbDS: datasource,
                    catalog,
                    database,
                    table,
                    timeField,
                    startDate: (0,utils_time/* formatSqlTime */.h9)(dates[0]),
                    endDate: (0,utils_time/* formatSqlTime */.h9)(dates[1]),
                    search_type: searchType,
                    data_filters: (0,sql_filter/* enrichStructuredFilterTypes */.a9)(filters, allFields)
                }, searchType === 'Search' ? {
                    indexes_statement: (0,utils_data/* getIndexesStatement */.cE)(store.get(discover/* currentIndexAtom */.TY), physicalFields, searchValue)
                } : {}, searchValue && searchType !== 'Lucene' ? {
                    search_value: searchType === 'Search' ? (0,utils_data/* encodeBase64 */.WG)(searchValue) : searchValue
                } : {}), {
                    lucene_where: luceneWhere
                }), config);
                subscription = getTopNDataService(payload, allFields, {
                    showBackendError: false
                }).subscribe({
                    next: ({ data })=>{
                        var _data_results_getTopNData_frames, _data_results_getTopNData, _data_results;
                        if (!active) {
                            return;
                        }
                        const frame = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_getTopNData = _data_results.getTopNData) === null || _data_results_getTopNData === void 0 ? void 0 : (_data_results_getTopNData_frames = _data_results_getTopNData.frames) === null || _data_results_getTopNData_frames === void 0 ? void 0 : _data_results_getTopNData_frames[0];
                        setFields(frame ? frame.schema.fields.map((item)=>({
                                Field: item.name,
                                Type: item.type || 'STRING'
                            })) : []);
                        setRows(frame ? (0,utils_data/* convertColumnToRow */.HL)(frame) : []);
                        setState({
                            loading: false,
                            hasRun: true
                        });
                    },
                    error: fail
                });
            })();
        void run().catch(fail);
        return ()=>{
            active = false;
            subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
        };
    }, [
        buildLuceneWhereClause,
        catalog,
        config,
        database,
        datasource,
        dates,
        enabled,
        fieldName,
        filters,
        request,
        searchType,
        searchValue,
        setFields,
        setRows,
        store,
        table,
        timeField
    ]);
    return state;
}

;// ./components/top-n-configuration/useTopNPreferences.ts
function useTopNPreferences_define_property(obj, key, value) {
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
function useTopNPreferences_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            useTopNPreferences_define_property(target, key, source[key]);
        });
    }
    return target;
}
function useTopNPreferences_ownKeys(object, enumerableOnly) {
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
function useTopNPreferences_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        useTopNPreferences_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}


function readConfig(saved, fieldName) {
    const limit = saved === null || saved === void 0 ? void 0 : saved.limit;
    return {
        groupField: fieldName,
        metric: (saved === null || saved === void 0 ? void 0 : saved.metric) && [
            'COUNT',
            'SUM',
            'AVG',
            'MIN',
            'MAX'
        ].includes(saved.metric) ? saved.metric : 'COUNT',
        metricField: typeof (saved === null || saved === void 0 ? void 0 : saved.metricField) === 'string' ? saved.metricField : '',
        direction: (saved === null || saved === void 0 ? void 0 : saved.direction) === 'ASC' ? 'ASC' : 'DESC',
        limit: typeof limit === 'number' && Number.isInteger(limit) && limit >= 1 && limit <= 10000 ? limit : 5
    };
}
function useTopNPreferences(fieldName) {
    const datasource = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const catalog = (0,react/* useAtomValue */.md)(discover/* currentCatalogAtom */.K0);
    const database = (0,react/* useAtomValue */.md)(discover/* currentDatabaseAtom */.Cf);
    const table = (0,react/* useAtomValue */.md)(discover/* currentTableAtom */.$w);
    const [preferences, setPreferences] = (0,react/* useAtom */.fp)(discover/* topNPreferencesAtom */.D$);
    const datasourceId = (datasource === null || datasource === void 0 ? void 0 : datasource.uid) || (datasource === null || datasource === void 0 ? void 0 : datasource.id) || (datasource === null || datasource === void 0 ? void 0 : datasource.name);
    const key = datasourceId && database && table ? JSON.stringify([
        datasourceId,
        catalog || 'internal',
        database,
        table,
        fieldName
    ]) : '';
    const config = readConfig(key ? preferences[key] : undefined, fieldName);
    const update = (patch)=>{
        if (key) {
            setPreferences((previous)=>useTopNPreferences_object_spread_props(useTopNPreferences_object_spread({}, previous), {
                    [key]: useTopNPreferences_object_spread({}, readConfig(previous[key], fieldName), patch)
                }));
        }
    };
    return {
        key,
        config,
        update
    };
}

;// ./components/top-n-configuration/index.tsx










function ConfigurationForm({ field, onClose, preferences }) {
    var _numericFields_;
    const theme = (0,ui_.useTheme2)();
    const fields = (0,react/* useAtomValue */.md)(discover/* tableFieldsAtom */.D_);
    const setConfig = (0,react/* useSetAtom */.Xr)(discover/* topNConfigAtom */.vr);
    const { config, update } = preferences;
    const setEnabled = (0,react/* useSetAtom */.Xr)(discover/* topNEnabledAtom */.w);
    const requestRun = (0,react/* useSetAtom */.Xr)(discover/* topNRunRequestAtom */.JC);
    const numericFields = fields.filter((item)=>{
        var _item_variantPath;
        return (0,utils_data/* getFieldType */.Re)(item.Type) === 'NUMBER' && !(0,utils_data/* isComplexType */.tF)(item.Type) && !((_item_variantPath = item.variantPath) === null || _item_variantPath === void 0 ? void 0 : _item_variantPath.length);
    });
    const [invalidLimitText, setInvalidLimitText] = (0,external_react_.useState)(null);
    const limitText = invalidLimitText !== null && invalidLimitText !== void 0 ? invalidLimitText : String(config.limit);
    const { metric, direction } = config;
    const metricField = config.metricField || ((_numericFields_ = numericFields[0]) === null || _numericFields_ === void 0 ? void 0 : _numericFields_.Field) || '';
    const setLimitText = (text)=>{
        const value = Number(text);
        if (text.trim() && Number.isInteger(value) && value >= 1 && value <= 10000) {
            update({
                limit: value
            });
            setInvalidLimitText(null);
        } else {
            setInvalidLimitText(text);
        }
    };
    const fieldStyle = (0,css_.css)`
        margin-bottom: 0;
    `;
    const resultState = useTopNData(field.Field);
    const limit = Number(limitText);
    const invalidLimit = !Number.isInteger(limit) || limit < 1 || limit > 10000;
    const invalidMetricField = metric !== 'COUNT' && !numericFields.some((item)=>item.Field === metricField);
    const unavailableField = !fields.some((item)=>item.Field === field.Field);
    return /*#__PURE__*/ external_react_default().createElement(ui_.Drawer, {
        title: (0,i18n.t)('Top N statistics: {{field}}', {
            field: field.Field
        }),
        width: "min(640px, calc(100vw - 32px))",
        onClose: onClose
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": "top-n-sidebar",
        className: (0,css_.css)`
                    padding: ${theme.spacing(0, 1, 2)};
                    display: grid;
                    gap: ${theme.spacing(4)};
                `
    }, /*#__PURE__*/ external_react_default().createElement("form", {
        onSubmit: (event)=>{
            event.preventDefault();
            if (invalidLimit || invalidMetricField || unavailableField) {
                return;
            }
            setConfig({
                groupField: field.Field,
                metric,
                metricField: metric === 'COUNT' ? '' : metricField,
                direction,
                limit
            });
            setEnabled(true);
            requestRun((value)=>value + 1);
        },
        className: (0,css_.css)`
                        display: grid;
                        gap: ${theme.spacing(2.5)};
                    `
    }, /*#__PURE__*/ external_react_default().createElement("p", {
        className: (0,css_.css)`
                            margin: 0;
                            color: ${theme.colors.text.secondary};
                            line-height: 1.6;
                        `
    }, (0,i18n.t)('Aggregate all matching records in the current time range and query, grouped by {{field}}.', {
        field: field.Field
    })), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                            display: grid;
                            gap: ${theme.spacing(1.5)};
                        `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        className: fieldStyle,
        label: (0,i18n.t)('Number of groups (N)'),
        htmlFor: "top-n-limit",
        description: (0,i18n.t)('Enter an integer from 1–10,000, or choose a preset.'),
        invalid: invalidLimit,
        error: invalidLimit ? (0,i18n.t)('N must be an integer from 1–10,000') : undefined
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Input, {
        id: "top-n-limit",
        autoFocus: true,
        "aria-label": (0,i18n.t)('Number of groups (N)'),
        type: "number",
        min: 1,
        max: 10000,
        step: 1,
        value: limitText,
        onChange: (event)=>setLimitText(event.currentTarget.value),
        invalid: invalidLimit
    })), /*#__PURE__*/ external_react_default().createElement(ui_.RadioButtonGroup, {
        "aria-label": (0,i18n.t)('Common Top N counts'),
        value: invalidLimitText === null ? config.limit : undefined,
        options: [
            5,
            10,
            20,
            50,
            100
        ].map((value)=>({
                label: String(value),
                ariaLabel: `Top ${value}`,
                value
            })),
        onChange: (value)=>setLimitText(String(value)),
        fullWidth: true,
        size: "sm"
    })), /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Aggregation'),
        htmlFor: "top-n-metric",
        className: fieldStyle
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        inputId: "top-n-metric",
        "aria-label": (0,i18n.t)('Aggregation'),
        value: metric,
        options: [
            {
                label: (0,i18n.t)('Count (COUNT)'),
                value: 'COUNT'
            },
            {
                label: (0,i18n.t)('Sum (SUM)'),
                value: 'SUM',
                isDisabled: !numericFields.length
            },
            {
                label: (0,i18n.t)('Average (AVG)'),
                value: 'AVG',
                isDisabled: !numericFields.length
            },
            {
                label: (0,i18n.t)('Minimum (MIN)'),
                value: 'MIN',
                isDisabled: !numericFields.length
            },
            {
                label: (0,i18n.t)('Maximum (MAX)'),
                value: 'MAX',
                isDisabled: !numericFields.length
            }
        ],
        onChange: (option)=>{
            if (option.value) {
                const nextMetric = option.value;
                update({
                    metric: nextMetric,
                    metricField: nextMetric === 'COUNT' ? config.metricField : metricField
                });
            }
        }
    })), metric !== 'COUNT' && /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Metric field'),
        htmlFor: "top-n-metric-field",
        className: fieldStyle,
        invalid: invalidMetricField,
        error: invalidMetricField ? (0,i18n.t)('Select an available numeric field') : undefined
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        inputId: "top-n-metric-field",
        "aria-label": (0,i18n.t)('Metric field'),
        value: metricField,
        options: numericFields.map((item)=>({
                label: item.Field,
                value: item.Field
            })),
        onChange: (option)=>update({
                metricField: option.value || ''
            })
    })), /*#__PURE__*/ external_react_default().createElement(ui_.Field, {
        label: (0,i18n.t)('Sort direction'),
        htmlFor: "top-n-direction",
        className: fieldStyle
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Select, {
        placeholder: (0,i18n.t)('Choose'),
        inputId: "top-n-direction",
        "aria-label": (0,i18n.t)('Sort direction'),
        value: direction,
        options: [
            {
                label: (0,i18n.t)('Highest to lowest (Top)'),
                value: 'DESC'
            },
            {
                label: (0,i18n.t)('Lowest to highest (Bottom)'),
                value: 'ASC'
            }
        ],
        onChange: (option)=>{
            if (option.value === 'ASC' || option.value === 'DESC') {
                update({
                    direction: option.value
                });
            }
        }
    })), unavailableField && /*#__PURE__*/ external_react_default().createElement("p", {
        role: "alert"
    }, (0,i18n.t)('This grouping field is no longer available. Close the configuration and select a field again.')), /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                            display: grid;
                            gap: ${theme.spacing(1.5)};
                            border-top: 1px solid ${theme.colors.border.weak};
                            padding-top: ${theme.spacing(2.5)};
                        `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                                display: flex;
                                gap: ${theme.spacing(1)};
                            `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        type: "submit",
        icon: "play",
        disabled: invalidLimit || invalidMetricField || unavailableField || resultState.loading
    }, resultState.loading ? (0,i18n.t)('Running…') : (0,i18n.t)('Run aggregation')), /*#__PURE__*/ external_react_default().createElement(ui_.Button, {
        type: "button",
        variant: "secondary",
        onClick: onClose
    }, (0,i18n.t)('Close'))), /*#__PURE__*/ external_react_default().createElement("span", {
        className: (0,css_.css)`
                                display: flex;
                                align-items: center;
                                gap: ${theme.spacing(0.5)};
                                color: ${theme.colors.text.secondary};
                                font-size: ${theme.typography.bodySmall.fontSize};
                            `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.Icon, {
        name: "check",
        size: "sm"
    }), " ", (0,i18n.t)('Settings are saved automatically and retained after refresh')))), /*#__PURE__*/ external_react_default().createElement(TopNResults, resultState)));
}
function TopNConfiguration() {
    const [field, setField] = (0,react/* useAtom */.fp)(discover/* topNConfigurationFieldAtom */.li);
    const preferences = useTopNPreferences((field === null || field === void 0 ? void 0 : field.Field) || '');
    return field ? /*#__PURE__*/ external_react_default().createElement(ConfigurationForm, {
        key: preferences.key || field.Field,
        field: field,
        preferences: preferences,
        onClose: ()=>setField(undefined)
    }) : null;
}

;// ./pages/PageDiscover/discover-layout.ts
const DISCOVER_LAYOUT_STORAGE_KEY = 'doris-app.discover-layout.v1';
const DISCOVER_SIDEBAR_MIN_WIDTH = 240;
const DISCOVER_SIDEBAR_MAX_WIDTH = 480;
const DISCOVER_CHART_MIN_HEIGHT = 160;
const DISCOVER_CHART_DEFAULT_HEIGHT = 300;
const DEFAULT_DISCOVER_LAYOUT = {
    sidebarWidth: 320,
    chartHeight: DISCOVER_CHART_DEFAULT_HEIGHT,
    sidebarCollapsed: false,
    chartCollapsed: false
};
function clamp(value, minimum, maximum, fallback) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
        return fallback;
    }
    return Math.min(maximum, Math.max(minimum, value));
}
function normalizeDiscoverLayout(value) {
    const layout = value && typeof value === 'object' ? value : {};
    return {
        sidebarWidth: clamp(layout.sidebarWidth, DISCOVER_SIDEBAR_MIN_WIDTH, DISCOVER_SIDEBAR_MAX_WIDTH, DEFAULT_DISCOVER_LAYOUT.sidebarWidth),
        chartHeight: clamp(layout.chartHeight, DISCOVER_CHART_MIN_HEIGHT, Number.MAX_SAFE_INTEGER, DEFAULT_DISCOVER_LAYOUT.chartHeight),
        sidebarCollapsed: layout.sidebarCollapsed === true,
        chartCollapsed: layout.chartCollapsed === true
    };
}
function readDiscoverLayout(storage = typeof window === 'undefined' ? undefined : window.localStorage) {
    if (!storage) {
        return DEFAULT_DISCOVER_LAYOUT;
    }
    try {
        const raw = storage.getItem(DISCOVER_LAYOUT_STORAGE_KEY);
        return raw ? normalizeDiscoverLayout(JSON.parse(raw)) : DEFAULT_DISCOVER_LAYOUT;
    } catch (unused) {
        return DEFAULT_DISCOVER_LAYOUT;
    }
}
function hasSavedDiscoverLayout(storage = typeof window === 'undefined' ? undefined : window.localStorage) {
    if (!storage) {
        return false;
    }
    try {
        const raw = storage.getItem(DISCOVER_LAYOUT_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : undefined;
        return !!parsed && typeof parsed === 'object' && !Array.isArray(parsed);
    } catch (unused) {
        return false;
    }
}
function saveDiscoverLayout(layout, storage = typeof window === 'undefined' ? undefined : window.localStorage) {
    if (!storage) {
        return;
    }
    try {
        storage.setItem(DISCOVER_LAYOUT_STORAGE_KEY, JSON.stringify(normalizeDiscoverLayout(layout)));
    } catch (unused) {
    // A blocked or full localStorage must never prevent Discover from rendering.
    }
}

;// ./pages/PageDiscover.tsx
function PageDiscover_define_property(obj, key, value) {
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
function PageDiscover_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            PageDiscover_define_property(target, key, source[key]);
        });
    }
    return target;
}
function PageDiscover_ownKeys(object, enumerableOnly) {
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
function PageDiscover_object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        PageDiscover_ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}




















function PageDiscover() {
    const theme = (0,ui_.useTheme2)();
    const { loading, queryState, sort, onSortChange, onQuerying, onRefresh, getTraceData } = useDiscoverData();
    const searchType = (0,react/* useAtomValue */.md)(discover/* searchTypeAtom */.WM);
    const currentDatabase = (0,react/* useAtomValue */.md)(discover/* currentDatabaseAtom */.Cf);
    const currentTable = (0,react/* useAtomValue */.md)(discover/* currentTableAtom */.$w);
    const [, setLoc] = (0,react/* useAtom */.fp)(discover/* locationAtom */.JT);
    const shareReady = (0,react/* useAtomValue */.md)(discover/* discoverShareReadyAtom */.Zs);
    const selectedDatasource = (0,react/* useAtomValue */.md)(discover/* selectedDatasourceAtom */.SW);
    const samplingWarnings = (0,react/* useAtomValue */.md)(discover/* variantSamplingWarningAtom */.CK);
    const samplingWarning = samplingWarnings[JSON.stringify([
        selectedDatasource === null || selectedDatasource === void 0 ? void 0 : selectedDatasource.uid,
        currentDatabase,
        currentTable
    ])];
    const snapshot = (0,react/* useAtomValue */.md)(discoverSnapshotAtom);
    const sectionRef = (0,external_react_.useRef)(null);
    const contentRef = (0,external_react_.useRef)(null);
    const hasSavedLayoutRef = (0,external_react_.useRef)(hasSavedDiscoverLayout());
    const [layout, setLayout] = (0,external_react_.useState)(readDiscoverLayout);
    const [contentHeight, setContentHeight] = (0,external_react_.useState)(0);
    const chartMaxHeight = Math.max(DISCOVER_CHART_MIN_HEIGHT, Math.floor((contentHeight || 600) / 2));
    const chartHeight = Math.min(layout.chartHeight, chartMaxHeight);
    (0,external_react_.useEffect)(()=>{
        if (!shareReady) {
            return;
        }
        const state = encodeDiscoverShareState(snapshot);
        setLoc((previous)=>{
            var _ref;
            var _previous_searchParams;
            const searchParams = new URLSearchParams((_ref = previous === null || previous === void 0 ? void 0 : (_previous_searchParams = previous.searchParams) === null || _previous_searchParams === void 0 ? void 0 : _previous_searchParams.toString()) !== null && _ref !== void 0 ? _ref : '');
            if (searchParams.get(DISCOVER_SHARE_STATE_PARAM) === state) {
                return previous;
            }
            searchParams.set(DISCOVER_SHARE_STATE_PARAM, state);
            return PageDiscover_object_spread_props(PageDiscover_object_spread({}, previous), {
                searchParams
            });
        });
    }, [
        snapshot,
        shareReady,
        setLoc
    ]);
    (0,external_react_.useEffect)(()=>{
        saveDiscoverLayout(layout);
    }, [
        layout
    ]);
    (0,external_react_.useEffect)(()=>{
        if (hasSavedLayoutRef.current || !sectionRef.current) {
            return;
        }
        const sidebarWidth = Math.min(DISCOVER_SIDEBAR_MAX_WIDTH, Math.max(DISCOVER_SIDEBAR_MIN_WIDTH, Math.round(sectionRef.current.clientWidth * 0.2)));
        setLayout((current)=>PageDiscover_object_spread_props(PageDiscover_object_spread({}, current), {
                sidebarWidth
            }));
    }, []);
    (0,external_react_.useEffect)(()=>{
        const element = contentRef.current;
        if (!element) {
            return undefined;
        }
        const updateHeight = ()=>setContentHeight(element.clientHeight);
        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(element);
        return ()=>observer.disconnect();
    }, []);
    const updateLayout = (0,external_react_.useCallback)((update)=>{
        setLayout((current)=>update(current));
    }, []);
    const beginResize = (0,external_react_.useCallback)((direction, event)=>{
        var _sectionRef_current;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        const startPosition = direction === 'sidebar' ? event.clientX : event.clientY;
        const startSize = direction === 'sidebar' ? layout.sidebarWidth : chartHeight;
        const sectionLeft = ((_sectionRef_current = sectionRef.current) === null || _sectionRef_current === void 0 ? void 0 : _sectionRef_current.getBoundingClientRect().left) || 0;
        const previousUserSelect = document.body.style.userSelect;
        document.body.style.userSelect = 'none';
        const onPointerMove = (moveEvent)=>{
            if (direction === 'sidebar') {
                const width = Math.min(DISCOVER_SIDEBAR_MAX_WIDTH, Math.max(DISCOVER_SIDEBAR_MIN_WIDTH, moveEvent.clientX - sectionLeft));
                updateLayout((current)=>PageDiscover_object_spread_props(PageDiscover_object_spread({}, current), {
                        sidebarWidth: width
                    }));
            } else {
                const height = Math.min(chartMaxHeight, Math.max(DISCOVER_CHART_MIN_HEIGHT, startSize + moveEvent.clientY - startPosition));
                updateLayout((current)=>PageDiscover_object_spread_props(PageDiscover_object_spread({}, current), {
                        chartHeight: height
                    }));
            }
        };
        const onPointerUp = ()=>{
            document.body.style.userSelect = previousUserSelect;
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
            document.removeEventListener('pointercancel', onPointerUp);
        };
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp, {
            once: true
        });
        document.addEventListener('pointercancel', onPointerUp, {
            once: true
        });
    }, [
        chartHeight,
        chartMaxHeight,
        layout.sidebarWidth,
        updateLayout
    ]);
    const handleResizeKeyDown = (0,external_react_.useCallback)((direction, event)=>{
        const decrease = direction === 'sidebar' ? event.key === 'ArrowLeft' : event.key === 'ArrowUp';
        const increase = direction === 'sidebar' ? event.key === 'ArrowRight' : event.key === 'ArrowDown';
        if (!decrease && !increase) {
            return;
        }
        event.preventDefault();
        const delta = increase ? 16 : -16;
        updateLayout((current)=>direction === 'sidebar' ? PageDiscover_object_spread_props(PageDiscover_object_spread({}, current), {
                sidebarWidth: Math.min(DISCOVER_SIDEBAR_MAX_WIDTH, Math.max(DISCOVER_SIDEBAR_MIN_WIDTH, current.sidebarWidth + delta))
            }) : PageDiscover_object_spread_props(PageDiscover_object_spread({}, current), {
                chartHeight: Math.min(chartMaxHeight, Math.max(DISCOVER_CHART_MIN_HEIGHT, current.chartHeight + delta))
            }));
    }, [
        chartMaxHeight,
        updateLayout
    ]);
    return /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                display: flex;
                flex: 1 1 0;
                flex-direction: column;
                min-height: 0;
                height: calc(100vh - 48px);
                max-height: calc(100vh - 48px);
                overflow: hidden;

                & > div > div {
                    background-color: ${theme.isDark ? '#111217' : '#F4F5F5'};
                    padding: 0 1rem;
                }
            `
    }, /*#__PURE__*/ external_react_default().createElement(runtime_.PluginPage, {
        pageNav: {
            text: ''
        }
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                        display: flex;
                        flex-direction: column;
                        flex: 1 1 auto;
                        width: 100%;
                        min-height: 0;
                        height: calc(100vh - 64px);
                        max-height: calc(100vh - 64px);
                        overflow: hidden;
                    `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": testIds/* testIds */.b.pageTwo.container,
        style: {
            flex: 'none'
        }
    }, /*#__PURE__*/ external_react_default().createElement(DiscoverHeader, {
        onRefresh: onRefresh,
        onQuerying: onQuerying,
        loading: loading.getTableData || loading.getTableDataCharts
    }), searchType === 'Lucene' && samplingWarning && /*#__PURE__*/ external_react_default().createElement(ui_.Alert, {
        title: (0,i18n.t)('Attribute search coverage'),
        severity: "warning"
    }, samplingWarning), /*#__PURE__*/ external_react_default().createElement(DiscoverFilter, null), /*#__PURE__*/ external_react_default().createElement(DiscoverQueryFeedback, {
        queryState: queryState,
        searchType: searchType,
        database: currentDatabase,
        table: currentTable
    })), /*#__PURE__*/ external_react_default().createElement("section", {
        ref: sectionRef,
        className: (0,css_.css)`
                            display: grid;
                            flex: 1;
                            min-height: 0;
                            grid-template-columns: minmax(0, 1fr);
                            grid-template-rows: minmax(0, 1fr);
                            padding-top: 0.5rem;
                        `,
        style: {
            gridTemplateColumns: layout.sidebarCollapsed ? '36px minmax(0, 1fr)' : `${layout.sidebarWidth}px 8px minmax(0, 1fr)`
        }
    }, layout.sidebarCollapsed ? /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": "discover-sidebar-collapsed",
        className: (0,css_.css)`
                                    background-color: ${theme.isDark ? 'rgb(24, 27, 31)' : '#FFF'};
                                    display: flex;
                                    align-items: center;
                                    flex-direction: column;
                                    padding-top: 8px;
                                    position: sticky;
                                    top: 0;
                                    align-self: stretch;
                                    min-height: 0;
                                `
    }, /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "angle-right",
        tooltip: (0,i18n.t)('Expand Column Panel'),
        "aria-label": (0,i18n.t)('Expand Column Panel'),
        onClick: ()=>updateLayout((current)=>PageDiscover_object_spread_props(PageDiscover_object_spread({}, current), {
                    sidebarCollapsed: false
                }))
    }), /*#__PURE__*/ external_react_default().createElement("span", {
        className: (0,css_.css)`
                                        writing-mode: vertical-rl;
                                        margin-top: 8px;
                                        font-size: 12px;
                                    `
    }, (0,i18n.t)('Column Panel'))) : /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                                    min-width: 0;
                                    position: sticky;
                                    top: 0;
                                    align-self: stretch;
                                    min-height: 0;
                                `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        className: (0,css_.css)`
                                        height: 100%;
                                    `
    }, /*#__PURE__*/ external_react_default().createElement(DiscoverSidebar, null)), /*#__PURE__*/ external_react_default().createElement(ui_.IconButton, {
        name: "angle-left",
        tooltip: (0,i18n.t)('Collapse Column Panel'),
        "aria-label": (0,i18n.t)('Collapse Column Panel'),
        "data-testid": "discover-sidebar-toggle",
        onClick: ()=>updateLayout((current)=>PageDiscover_object_spread_props(PageDiscover_object_spread({}, current), {
                    sidebarCollapsed: true
                })),
        className: (0,css_.css)`
                                        position: absolute;
                                        top: 8px;
                                        right: 4px;
                                        z-index: 1;
                                    `
    })), !layout.sidebarCollapsed && /*#__PURE__*/ external_react_default().createElement("div", {
        role: "separator",
        tabIndex: 0,
        "aria-label": (0,i18n.t)('Resize Column Panel'),
        "aria-orientation": "vertical",
        "aria-valuemin": DISCOVER_SIDEBAR_MIN_WIDTH,
        "aria-valuemax": DISCOVER_SIDEBAR_MAX_WIDTH,
        "aria-valuenow": layout.sidebarWidth,
        onPointerDown: (event)=>beginResize('sidebar', event),
        onKeyDown: (event)=>handleResizeKeyDown('sidebar', event),
        className: (0,css_.css)`
                                    cursor: col-resize;
                                    position: relative;
                                    outline: none;
                                    &:hover::after,
                                    &:focus::after {
                                        background: ${theme.colors.primary.main};
                                    }
                                    &::after {
                                        content: '';
                                        position: absolute;
                                        inset: 0 3px;
                                        background: transparent;
                                    }
                                `
    }), /*#__PURE__*/ external_react_default().createElement("div", {
        ref: contentRef,
        className: (0,css_.css)`
                                display: flex;
                                flex-direction: column;
                                min-width: 0;
                                min-height: 0;
                                background-color: ${theme.isDark ? 'rgb(24, 27, 31)' : '#FFF'};
                                position: relative;
                                padding: 16px 0;
                                overflow-y: auto;
                                overflow-x: hidden;
                                overscroll-behavior: contain;
                            `
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        style: {
            position: 'absolute',
            top: 0,
            width: '100%'
        }
    }, loading.getTableDataCharts && /*#__PURE__*/ external_react_default().createElement(ui_.LoadingBar, {
        width: 100
    })), /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": "discover-chart-panel",
        className: (0,css_.css)`
                                    flex: none;
                                `
    }, /*#__PURE__*/ external_react_default().createElement(DiscoverHistogram, {
        height: chartHeight,
        collapsed: layout.chartCollapsed,
        onToggleCollapsed: ()=>updateLayout((current)=>PageDiscover_object_spread_props(PageDiscover_object_spread({}, current), {
                    chartCollapsed: !current.chartCollapsed
                }))
    }), !layout.chartCollapsed && /*#__PURE__*/ external_react_default().createElement(ui_.Tooltip, {
        content: (0,i18n.t)('Drag to resize chart and table · Chart height: {{height}} px · ↑ / ↓ to adjust', {
            height: Math.round(chartHeight)
        }),
        placement: "top"
    }, /*#__PURE__*/ external_react_default().createElement("div", {
        role: "separator",
        tabIndex: 0,
        "data-testid": "discover-chart-resizer",
        "aria-label": (0,i18n.t)('Resize chart'),
        "aria-orientation": "horizontal",
        "aria-valuemin": DISCOVER_CHART_MIN_HEIGHT,
        "aria-valuemax": chartMaxHeight,
        "aria-valuenow": chartHeight,
        "aria-valuetext": (0,i18n.t)('Chart height: {{height}} pixels', {
            height: Math.round(chartHeight)
        }),
        onPointerDownCapture: (event)=>beginResize('chart', event),
        onKeyDownCapture: (event)=>handleResizeKeyDown('chart', event),
        className: (0,css_.css)`
                                                height: ${theme.spacing(2)};
                                                cursor: row-resize;
                                                touch-action: none;
                                                flex: none;
                                                position: relative;
                                                outline: none;
                                                &::before,
                                                &::after {
                                                    content: '';
                                                    position: absolute;
                                                    top: 50%;
                                                    transition: ${theme.transitions.create('background-color')};
                                                }
                                                &::before {
                                                    height: 1px;
                                                    left: 16px;
                                                    right: 16px;
                                                    background: ${theme.colors.border.weak};
                                                }
                                                &::after {
                                                    left: 50%;
                                                    transform: translate(-50%, -50%);
                                                    height: 4px;
                                                    width: min(200px, 40%);
                                                    border-radius: ${theme.shape.radius.pill};
                                                    background: ${theme.colors.emphasize(theme.colors.background.secondary, 0.15)};
                                                }
                                                &:hover::before,
                                                &:hover::after,
                                                &:active::before,
                                                &:active::after,
                                                &:focus-visible::before,
                                                &:focus-visible::after {
                                                    background: ${theme.colors.primary.border};
                                                }
                                                &:focus-visible {
                                                    outline: 2px solid ${theme.colors.primary.border};
                                                    outline-offset: -2px;
                                                }
                                            `
    }))), /*#__PURE__*/ external_react_default().createElement("div", {
        "data-testid": "discover-table-panel",
        className: (0,css_.css)`
                                    margin-top: ${layout.chartCollapsed ? 16 : 0}px;
                                    flex: none;
                                `
    }, /*#__PURE__*/ external_react_default().createElement(DiscoverContent, {
        getTraceData: getTraceData,
        fetchNextPage: ()=>{},
        queryState: queryState,
        sort: sort,
        onSortChange: onSortChange
    }), /*#__PURE__*/ external_react_default().createElement(FieldStatistics, null), /*#__PURE__*/ external_react_default().createElement(TopNConfiguration, null)))))));
}


/***/ }

}]);
//# sourceMappingURL=421.js.map?_cache=c750496ede954bb313c9