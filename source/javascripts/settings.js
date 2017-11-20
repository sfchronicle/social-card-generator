var MEME_SETTINGS = {
  creditText: 'Person Name ', // Default "credits" text.
  creditSize: 18, // Font size for credit text.
  creditTitleSize: 16,
  creditSpacing: 30,
  creditTitle: 'The Chronicle',
  creditFont: 'AntennaRegular',
  creditTitleFont: 'AntennaExtraLight',

  downloadName: 'share', // The name of the downloaded image file (will have a ".png" extension added).

  // Universal font family for texts:
  // Note that you'll need to included quoted font names as you would in CSS, ie: '"Knockout 28 B"'.
  fontFamily: 'FarnhamDisplayLight',
  // Font family options: set to empty array to disable font selector.
  // These options may also be formatted as {text:'Knockout', value:'"Knockout 28 B"'}.
  fontFamilyOpts: [{
    text: 'Serif - SFC',
    value: 'FarnhamDisplayLight'
  }, {
    text: 'Sans-serif bold - SFC',
    value: 'AntennaRegular'
  }, {
    text: 'Sans-serif - SFC',
    value: 'AntennaExtraLight'
  }],

  // Font size of main headline:
  fontSize: 48,
  // Font color options
  fontColor: '#fff',
  fontColorOpts: ['#fff', '#333', '#000'],

  headlineWidth: 0.75,

  headlineText: '“Write your own headline.”', // Default headline text.
  height: 756, // Canvas rendering height
  width: 1510, // Canvas rendering width.
  imageScale: 1, // Background image scale.
  imageSrc: '', // Default background image path. MUST reside on host domain, or use base64 data.
  overlayAlpha: 1, // Opacity of image overlay.

  // Background color, or blank ('') for no overlay. Takes precedent over overlay.
  backgroundColor: '#000',
  // Background color options: set to empty array to disable overlay options selector.
  backgroundColorOpts: ['#000', '#777', '#3985A2', '#56C165'],
  
  paddingRatio: 0.05, // Percentage of canvas width to use as edge padding.

  // Size options: these are some sane defaults for the three social networks.
  sizeOpts: [{
    label: 'Twitter',
    width: 1510,
    height: 756,
  }, {
    label: 'Facebook',
    width: 1410,
    height: 738
  }, {
    label: 'Instagram',
    width: 1200,
    height: 1200
  }],

  // Text alignment: valid settings are "left", "center", and "right".
  textAlign: 'left',
  // Text alignment options: set to empty array to disable alignment picker.
  textAlignOpts: [
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
    {text: 'Greenstate - white', value: 'source/images/greenstate_white.png', data: ''},
    {text: 'Greenstate - black', value: 'source/images/greenstate_black.png', data: ''}
  ]
};
