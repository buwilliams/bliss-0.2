module.exports = {
  getVariableRule: function(rule, cssVars) {
    if(typeof rule === "undefined") return "";
    if(typeof rule.name === "undefined") return "";
    if(typeof rule.value === "undefined") return "";
    if(rule.variable === "") return "";

    var varValue = '';
    for(var i=0; i<cssVars.length; i++) {
      var cssVar = cssVars[i];
      if(rule.variable === cssVar.name) {
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
    if(typeof rule.variable === "undefined" || rule.variable === null ||
      rule.variable === '') {
      return this.getStandardRule(rule);
    } else {
      return this.getVariableRule(rule, cssVars);
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
    out.push('}');
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
    return data.join("\n\n");
  }
};
