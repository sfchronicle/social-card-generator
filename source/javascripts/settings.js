var MEME_SETTINGS = {
  creditText: 'Person Name ', // Default "credits" text.
  creditSize: 14, // Font size for credit text.
  creditTitleSize: 12,
  creditSpacing: 20,
  creditTitle: 'The Chronicle',
  creditFont: '"SourceSansPro700"',
  creditTitleFont: '"SourceSansPro"',

  downloadName: 'share', // The name of the downloaded image file (will have a ".png" extension added).

  // Universal font family for texts:
  // Note that you'll need to included quoted font names as you would in CSS, ie: '"Knockout 28 B"'.
  fontFamily: 'Lora',
  // Font family options: set to empty array to disable font selector.
  // These options may also be formatted as {text:'Knockout', value:'"Knockout 28 B"'}.
  fontFamilyOpts: [{
    text: 'Serif - SFC',
    value: 'Lora'
  }, {
    text: 'Sans-serif - SFC',
    value: 'SourceSansPro'
  }, {
    text: 'Sans-serif bold - SFC',
    value: 'SourceSansPro700'
  }],

  // Font size of main headline:
  fontSize: 30,
  lineHeight:1.2,
  // Font color options
  fontColor: '#fff',
  fontColorOpts: ['#fff', '#333', '#000'],

  headlineWidth: 0.75,

  headlineText: '“Write your own headline.”', // Default headline text.
  height: 506, // Canvas rendering height
  width: 1024, // Canvas rendering width.
  imageScale: 1, // Background image scale if image larger than 1024px wide.
  imageSrc: '', // Default background image path. MUST reside on host domain, or use base64 data.
  overlayAlpha: 1, // Opacity of image overlay.

  // Background color, or blank ('') for no overlay. Takes precedent over overlay.
  backgroundColor: '#000',
  // Background color options: set to empty array to disable overlay options selector.
  backgroundColorOpts: ['#000', '#777', '#3985A2'],
  
  paddingRatio: 0.05, // Percentage of canvas width to use as edge padding.

  // Size options: these are some sane defaults for the three social networks.
  sizeOpts: [{
    label: 'Twitter',
    width: 1024,
    height: 506,
  }, {
    label: 'Facebook',
    width: 1024,
    height: 536
  }, {
    label: 'Instagram Post',
    width: 900,
    height: 900
  }
  // , {
  //   label: 'Instagram Story',
  //   width: 506,
  //   height: 900
  // }
  ],

  // Text alignment: valid settings are "left", "center", and "right".
  textAlign: 'left',
  // Text alignment options: set to empty array to disable alignment picker.
  textAlignOpts: [
    {text: 'Align left', value: 'left'},
    {text: 'Align center', value: 'center'},
    {text: 'Align right', value: 'right'}
  ],

  // Credit alignment: valid settings are "left", "center", and "right".
  creditAlign: 'left',
  // Credit alignment options: set to empty array to disable alignment picker.
  creditAlignOpts: [
    {text: 'Align left', value: 'left'},
    {text: 'Align center', value: 'center'},
    {text: 'Align right', value: 'right'}
  ],

  textShadow: false, // Text shadow toggle.
  textShadowEdit: true, // Toggles text shadow control within the editor.
  watermarkAlpha: 1, // Opacity of watermark image.
  watermarkMaxWidthRatio: 0.25, // Maximum allowed width of watermark (percentage of total canvas width).

  // Path to the watermark image source, or blank for no watermark:
  watermarkSrc: (localStorage && localStorage.getItem('meme_watermark')) || 'source/images/sfc_logo_white.png',

  // Watermark image options: set to empty array to disable watermark picker.
  // NOTE: only populate the "data" attributes with base64 data when concerned about Cross-Origin requests...
  // Otherwise, just leave "data" attributes blank and allow images to load from your server.
  watermarkOpts: [
    {text: 'SFC - black', value: 'source/images/sfc_logo_black.png', data: ''},
    {text: 'SFC - white', value: 'source/images/sfc_logo_white.png', data: ''},
    {text: 'The Press - white', value: 'source/images/the_press_white.png', data: ''},
    {text: 'The Press - black', value: 'source/images/the_press_black.png', data: ''}
  ]
};
