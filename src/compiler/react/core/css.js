module.exports = {
  isVariable: function(ruleValue) {
    var firstChar = ruleValue.charAt(0);
    if(firstChar === '$' && ruleValue.length > 1) {
      return true;
    } else {
      return false;
    }
  },

  getVarFromValue: function(ruleValue) {
    return ruleValue.substring(1);
  },

  getVariableRule: function(rule, cssVars) {
    if(typeof rule === "undefined") return "";
    if(typeof rule.name === "undefined") return "";
    if(typeof rule.value === "undefined") return "";

    var varName = this.getVarFromValue(rule.value);

    var varValue = '';
    for(var i=0; i<cssVars.length; i++) {
      var cssVar = cssVars[i];
      if(varName === cssVar.name) {
        varValue = cssVar.value;
        break;
      }
    }

    if(varValue === '') return varValue;

    return `${rule.name}: ${varValue};`;
  },

  getStandardRule: function(rule) {
    if(typeof rule === "undefined") return "";
    if(typeof rule.name === "undefined") return "";
    if(typeof rule.value === "undefined") return "";
    if(rule.value === "") return "";

    return `${rule.name}: ${rule.value};`;
  },

  getRule: function(rule, cssVars) {
    if(this.isVariable(rule.value)) {
      return this.getVariableRule(rule, cssVars);
    } else {
      return this.getStandardRule(rule);
    }
  },

  getRules: function(rules, cssVars) {
    var that = this;
    return rules.map(function(rule) {
      return that.getRule(rule, cssVars);
    });
  },

  getSelector: function(selector) {
    return selector;
  },

  getCssDef: function(cssDef, cssVars) {
    var out = [];
    out.push(this.getSelector(cssDef.selector) + ' {');
    this.getRules(cssDef.properties, cssVars).map(function(rule){
      out.push("  " + rule);
    });
    out.push("}\n\n");
    return out;
  },

  cssDefToStr: function(cssDef, cssVars) {
    return this.getCssDef(cssDef, cssVars).join("\n");
  },

  getCss: function(css, cssVars) {
    var that = this;
    var data = [];
    css.forEach(function(rules) {
      data.push(that.cssDefToStr(rules, cssVars));
    })
    return data.join("");
  }
};
