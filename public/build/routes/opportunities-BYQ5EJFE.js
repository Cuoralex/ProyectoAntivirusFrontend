import {
  Link,
  useLoaderData
} from "/build/_shared/chunk-MLUCKDWY.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-5EC3W3DM.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:@remix-run/node
var require_node = __commonJS({
  "empty-module:@remix-run/node"(exports, module) {
    module.exports = {};
  }
});

// app/routes/opportunities.tsx
var import_node = __toESM(require_node(), 1);

// app/components/OpportunityCard.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\OpportunityCard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\OpportunityCard.tsx"
  );
  import.meta.hot.lastModified = "1740886902231.8623";
}
var OpportunityCard = ({
  title,
  description,
  link
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border rounded-lg p-4 shadow-md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-bold mb-2", children: title }, void 0, false, {
      fileName: "app/components/OpportunityCard.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-700 mb-4", children: description }, void 0, false, {
      fileName: "app/components/OpportunityCard.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: link, className: "text-blue-500 hover:underline", children: "M\xE1s informaci\xF3n" }, void 0, false, {
      fileName: "app/components/OpportunityCard.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/OpportunityCard.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
};
_c = OpportunityCard;
var OpportunityCard_default = OpportunityCard;
var _c;
$RefreshReg$(_c, "OpportunityCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/opportunities.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\opportunities.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\opportunities.tsx"
  );
  import.meta.hot.lastModified = "1740887580973.7627";
}
function Opportunities() {
  _s();
  const {
    opportunities
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Oportunidades" }, void 0, false, {
      fileName: "app/routes/opportunities.tsx",
      lineNumber: 48,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("ul", { children: opportunities.map((opportunity) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("li", { className: "mt-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { to: `/opportunities/${opportunity.id}`, className: "text-blue-600", children: opportunity.name }, void 0, false, {
        fileName: "app/routes/opportunities.tsx",
        lineNumber: 51,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(OpportunityCard_default, { opportunity, title: "", description: "", link: "" }, void 0, false, {
        fileName: "app/routes/opportunities.tsx",
        lineNumber: 54,
        columnNumber: 13
      }, this)
    ] }, opportunity.id, true, {
      fileName: "app/routes/opportunities.tsx",
      lineNumber: 50,
      columnNumber: 43
    }, this)) }, void 0, false, {
      fileName: "app/routes/opportunities.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/opportunities.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
}
_s(Opportunities, "xBN9iBaE1fXxBPpME8HBBK/aopU=", false, function() {
  return [useLoaderData];
});
_c2 = Opportunities;
var _c2;
$RefreshReg$(_c2, "Opportunities");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Opportunities as default
};
//# sourceMappingURL=/build/routes/opportunities-BYQ5EJFE.js.map
