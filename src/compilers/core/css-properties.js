const _ = require('lodash');

module.exports = {
  has: function(name) {
    var index = _.findIndex(this.properties, function(property) {
      return (property.name === name)
    })
    return (index !== -1)
  },

  fuzzyFind: function(search) {
    var lowerSearch = search.toLowerCase()
    return _.reduce(this.properties, function(accum, property) {
      if(property.name.indexOf(lowerSearch) !== -1) accum.push(property)
      return accum
    }, [])
  },

  find: function(search) {
    var lowerSearch = search.toLowerCase()
    return _.find(this.properties, { 'name': lowerSearch });
  },

  'properties': [
    {
      'name': 'color',
      'values': []
    },
    {
      'name': 'opacity',
      'values': []
    },
    {
      'name': 'background',
      'values': []
    },
    {
      'name': 'background-attachment',
      'values': []
    },
    {
      'name': 'background-blend-mode',
      'values': []
    },
    {
      'name': 'background-color',
      'values': []
    },
    {
      'name': 'background-image',
      'values': []
    },
    {
      'name': 'background-position',
      'values': []
    },
    {
      'name': 'background-repeat',
      'values': []
    },
    {
      'name': 'background-clip',
      'values': []
    },
    {
      'name': 'background-origin',
      'values': []
    },
    {
      'name': 'background-size',
      'values': []
    },
    {
      'name': 'border',
      'values': []
    },
    {
      'name': 'border-bottom',
      'values': []
    },
    {
      'name': 'border-bottom-color',
      'values': []
    },
    {
      'name': 'border-bottom-left-radius',
      'values': []
    },
    {
      'name': 'border-bottom-right-radius',
      'values': []
    },
    {
      'name': 'border-bottom-style',
      'values': []
    },
    {
      'name': 'border-bottom-width',
      'values': []
    },
    {
      'name': 'border-color',
      'values': []
    },
    {
      'name': 'border-image',
      'values': []
    },
    {
      'name': 'border-image-outset',
      'values': []
    },
    {
      'name': 'border-image-repeat',
      'values': []
    },
    {
      'name': 'border-image-slice',
      'values': []
    },
    {
      'name': 'border-image-source',
      'values': []
    },
    {
      'name': 'border-image-width',
      'values': []
    },
    {
      'name': 'border-left',
      'values': []
    },
    {
      'name': 'border-left-color',
      'values': []
    },
    {
      'name': 'border-left-style',
      'values': []
    },
    {
      'name': 'border-left-width',
      'values': []
    },
    {
      'name': 'border-radius',
      'values': []
    },
    {
      'name': 'border-right',
      'values': []
    },
    {
      'name': 'border-right-color',
      'values': []
    },
    {
      'name': 'border-right-style',
      'values': []
    },
    {
      'name': 'border-right-width',
      'values': []
    },
    {
      'name': 'border-style',
      'values': []
    },
    {
      'name': 'border-top',
      'values': []
    },
    {
      'name': 'border-top-color',
      'values': []
    },
    {
      'name': 'border-top-left-radius',
      'values': []
    },
    {
      'name': 'border-top-right-radius',
      'values': []
    },
    {
      'name': 'border-top-style',
      'values': []
    },
    {
      'name': 'border-top-width',
      'values': []
    },
    {
      'name': 'border-width',
      'values': []
    },
    {
      'name': 'box-decoration-break',
      'values': []
    },
    {
      'name': 'box-shadow',
      'values': []
    },
    {
      'name': 'bottom',
      'values': []
    },
    {
      'name': 'clear',
      'values': []
    },
    {
      'name': 'clip',
      'values': []
    },
    {
      'name': 'display',
      'values': []
    },
    {
      'name': 'float',
      'values': []
    },
    {
      'name': 'height',
      'values': []
    },
    {
      'name': 'left',
      'values': []
    },
    {
      'name': 'margin',
      'values': []
    },
    {
      'name': 'margin-bottom',
      'values': []
    },
    {
      'name': 'margin-left',
      'values': []
    },
    {
      'name': 'margin-right',
      'values': []
    },
    {
      'name': 'margin-top',
      'values': []
    },
    {
      'name': 'max-height',
      'values': []
    },
    {
      'name': 'max-width',
      'values': []
    },
    {
      'name': 'min-height',
      'values': []
    },
    {
      'name': 'min-width',
      'values': []
    },
    {
      'name': 'overflow',
      'values': []
    },
    {
      'name': 'overflow-x',
      'values': []
    },
    {
      'name': 'overflow-y',
      'values': []
    },
    {
      'name': 'padding',
      'values': []
    },
    {
      'name': 'padding-bottom',
      'values': []
    },
    {
      'name': 'padding-left',
      'values': []
    },
    {
      'name': 'padding-right',
      'values': []
    },
    {
      'name': 'padding-top',
      'values': []
    },
    {
      'name': 'position',
      'values': []
    },
    {
      'name': 'right',
      'values': []
    },
    {
      'name': 'top',
      'values': []
    },
    {
      'name': 'visibility',
      'values': []
    },
    {
      'name': 'width',
      'values': []
    },
    {
      'name': 'vertical-align',
      'values': []
    },
    {
      'name': 'z-index',
      'values': []
    },
    {
      'name': 'align-content',
      'values': []
    },
    {
      'name': 'align-items',
      'values': []
    },
    {
      'name': 'align-self',
      'values': []
    },
    {
      'name': 'flex',
      'values': []
    },
    {
      'name': 'flex-basis',
      'values': []
    },
    {
      'name': 'flex-direction',
      'values': []
    },
    {
      'name': 'flex-flow',
      'values': []
    },
    {
      'name': 'flex-grow',
      'values': []
    },
    {
      'name': 'flex-shrink',
      'values': []
    },
    {
      'name': 'flex-wrap',
      'values': []
    },
    {
      'name': 'justify-content',
      'values': []
    },
    {
      'name': 'order',
      'values': []
    },
    {
      'name': 'hanging-punctuation',
      'values': []
    },
    {
      'name': 'hyphens',
      'values': []
    },
    {
      'name': 'letter-spacing',
      'values': []
    },
    {
      'name': 'line-break',
      'values': []
    },
    {
      'name': 'line-height',
      'values': []
    },
    {
      'name': 'overflow-wrap',
      'values': []
    },
    {
      'name': 'tab-size',
      'values': []
    },
    {
      'name': 'text-align',
      'values': []
    },
    {
      'name': 'text-align-last',
      'values': []
    },
    {
      'name': 'text-combine-upright',
      'values': []
    },
    {
      'name': 'text-indent',
      'values': []
    },
    {
      'name': 'text-justify',
      'values': []
    },
    {
      'name': 'text-transform',
      'values': []
    },
    {
      'name': 'white-space',
      'values': []
    },
    {
      'name': 'word-break',
      'values': []
    },
    {
      'name': 'word-spacing',
      'values': []
    },
    {
      'name': 'word-wrap',
      'values': []
    },
    {
      'name': 'text-decoration',
      'values': []
    },
    {
      'name': 'text-decoration-color',
      'values': []
    },
    {
      'name': 'text-decoration-line',
      'values': []
    },
    {
      'name': 'text-decoration-style',
      'values': []
    },
    {
      'name': 'text-shadow',
      'values': []
    },
    {
      'name': 'text-underline-position',
      'values': []
    },
    {
      'name': '@font-face',
      'values': []
    },
    {
      'name': '@font-feature-values',
      'values': []
    },
    {
      'name': 'font',
      'values': []
    },
    {
      'name': 'font-family',
      'values': []
    },
    {
      'name': 'font-feature-settings',
      'values': []
    },
    {
      'name': 'font-kerning',
      'values': []
    },
    {
      'name': 'font-language-override',
      'values': []
    },
    {
      'name': 'font-size',
      'values': []
    },
    {
      'name': 'font-size-adjust',
      'values': []
    },
    {
      'name': 'font-stretch',
      'values': []
    },
    {
      'name': 'font-style',
      'values': []
    },
    {
      'name': 'font-synthesis',
      'values': []
    },
    {
      'name': 'font-variant',
      'values': []
    },
    {
      'name': 'font-variant-alternates',
      'values': []
    },
    {
      'name': 'font-variant-caps',
      'values': []
    },
    {
      'name': 'font-variant-east-asian',
      'values': []
    },
    {
      'name': 'font-variant-ligatures',
      'values': []
    },
    {
      'name': 'font-variant-numeric',
      'values': []
    },
    {
      'name': 'font-variant-position',
      'values': []
    },
    {
      'name': 'font-weight',
      'values': []
    },
    {
      'name': 'direction',
      'values': []
    },
    {
      'name': 'text-orientation',
      'values': []
    },
    {
      'name': 'text-combine-upright',
      'values': []
    },
    {
      'name': 'unicode-bidi',
      'values': []
    },
    {
      'name': 'user-select',
      'values': []
    },
    {
      'name': 'writing-mode',
      'values': []
    },
    {
      'name': 'border-collapse',
      'values': []
    },
    {
      'name': 'border-spacing',
      'values': []
    },
    {
      'name': 'caption-side',
      'values': []
    },
    {
      'name': 'empty-cells',
      'values': []
    },
    {
      'name': 'table-layout',
      'values': []
    },
    {
      'name': 'counter-increment',
      'values': []
    },
    {
      'name': 'counter-reset',
      'values': []
    },
    {
      'name': 'list-style',
      'values': []
    },
    {
      'name': 'list-style-image',
      'values': []
    },
    {
      'name': 'list-style-position',
      'values': []
    },
    {
      'name': 'list-style-type',
      'values': []
    },
    {
      'name': '@keyframes',
      'values': []
    },
    {
      'name': 'animation',
      'values': []
    },
    {
      'name': 'animation-delay',
      'values': []
    },
    {
      'name': 'animation-direction',
      'values': []
    },
    {
      'name': 'animation-duration',
      'values': []
    },
    {
      'name': 'animation-fill-mode',
      'values': []
    },
    {
      'name': 'animation-iteration-count',
      'values': []
    },
    {
      'name': 'animation-name',
      'values': []
    },
    {
      'name': 'animation-play-state',
      'values': []
    },
    {
      'name': 'animation-timing-function',
      'values': []
    },
    {
      'name': 'backface-visibility',
      'values': []
    },
    {
      'name': 'perspective',
      'values': []
    },
    {
      'name': 'perspective-origin',
      'values': []
    },
    {
      'name': 'transform',
      'values': []
    },
    {
      'name': 'transform-origin',
      'values': []
    },
    {
      'name': 'transform-style',
      'values': []
    },
    {
      'name': 'transition',
      'values': []
    },
    {
      'name': 'transition-property',
      'values': []
    },
    {
      'name': 'transition-duration',
      'values': []
    },
    {
      'name': 'transition-timing-function',
      'values': []
    },
    {
      'name': 'transition-delay',
      'values': []
    },
    {
      'name': 'box-sizing',
      'values': []
    },
    {
      'name': 'content',
      'values': []
    },
    {
      'name': 'cursor',
      'values': []
    },
    {
      'name': 'ime-mode',
      'values': []
    },
    {
      'name': 'nav-down',
      'values': []
    },
    {
      'name': 'nav-index',
      'values': []
    },
    {
      'name': 'nav-left',
      'values': []
    },
    {
      'name': 'nav-right',
      'values': []
    },
    {
      'name': 'nav-up',
      'values': []
    },
    {
      'name': 'outline',
      'values': []
    },
    {
      'name': 'outline-color',
      'values': []
    },
    {
      'name': 'outline-offset',
      'values': []
    },
    {
      'name': 'outline-style',
      'values': []
    },
    {
      'name': 'outline-width',
      'values': []
    },
    {
      'name': 'resize',
      'values': []
    },
    {
      'name': 'text-overflow',
      'values': []
    },
    {
      'name': 'break-after',
      'values': []
    },
    {
      'name': 'break-before',
      'values': []
    },
    {
      'name': 'break-inside',
      'values': []
    },
    {
      'name': 'column-count',
      'values': []
    },
    {
      'name': 'column-fill',
      'values': []
    },
    {
      'name': 'column-gap',
      'values': []
    },
    {
      'name': 'column-rule',
      'values': []
    },
    {
      'name': 'column-rule-color',
      'values': []
    },
    {
      'name': 'column-rule-style',
      'values': []
    },
    {
      'name': 'column-rule-width',
      'values': []
    },
    {
      'name': 'column-span',
      'values': []
    },
    {
      'name': 'column-width',
      'values': []
    },
    {
      'name': 'columns',
      'values': []
    },
    {
      'name': 'widows',
      'values': []
    },
    {
      'name': 'orphans',
      'values': []
    },
    {
      'name': 'page-break-after',
      'values': []
    },
    {
      'name': 'page-break-before',
      'values': []
    },
    {
      'name': 'page-break-inside',
      'values': []
    },
    {
      'name': 'marks',
      'values': []
    },
    {
      'name': 'quotes',
      'values': []
    },
    {
      'name': 'filter',
      'values': []
    },
    {
      'name': 'image-orientation',
      'values': []
    },
    {
      'name': 'image-rendering',
      'values': []
    },
    {
      'name': 'image-resolution',
      'values': []
    },
    {
      'name': 'object-fit',
      'values': []
    },
    {
      'name': 'object-position',
      'values': []
    },
    {
      'name': 'mask',
      'values': []
    },
    {
      'name': 'mask-type',
      'values': []
    },
    {
      'name': 'mark',
      'values': []
    },
    {
      'name': 'mark-after',
      'values': []
    },
    {
      'name': 'mark-before',
      'values': []
    },
    {
      'name': 'phonemes',
      'values': []
    },
    {
      'name': 'rest',
      'values': []
    },
    {
      'name': 'rest-after',
      'values': []
    },
    {
      'name': 'rest-before',
      'values': []
    },
    {
      'name': 'voice-balance',
      'values': []
    },
    {
      'name': 'voice-duration',
      'values': []
    },
    {
      'name': 'voice-pitch',
      'values': []
    },
    {
      'name': 'voice-pitch-range',
      'values': []
    },
    {
      'name': 'voice-rate',
      'values': []
    },
    {
      'name': 'voice-stress',
      'values': []
    },
    {
      'name': 'voice-volume',
      'values': []
    },
    {
      'name': 'marquee-direction',
      'values': []
    },
    {
      'name': 'marquee-play-count',
      'values': []
    },
    {
      'name': 'marquee-speed',
      'values': []
    },
    {
      'name': 'marquee-style',
      'values': []
    }
  ]
}
