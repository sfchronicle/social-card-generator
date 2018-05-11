/*
* MemeEditorView
* Manages form capture, model updates, and selection state of the editor form.
*/
MEME.MemeEditorView = Backbone.View.extend({

  initialize: function() {
    this.buildForms();
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  // Builds all form options based on model option arrays:
  buildForms: function() {
    var d = this.model.toJSON();

    function buildOptions(opts) {
      return _.reduce(opts, function(memo, opt) {
        return memo += ['<option value="', opt.hasOwnProperty('value') ? opt.value : opt, '">', opt.hasOwnProperty('text') ? opt.text : opt, '</option>'].join('');
      }, '');
    }

    function buildColorOptions(opts, name) {
      return _.reduce(opts, function(memo, opt) {
        var color = opt.hasOwnProperty('value') ? opt.value : opt;
        return memo += '<li><label><input class="m-editor__swatch" style="background-color:'+color+'" type="radio" name="'+name+'" value="'+color+'"></label></li>';
      }, '');
    }

    function buildSizeOptions(opts) {
      return _.reduce(opts, function(memo, opt) {
        return memo += '<option value="' + opt.label + '">' + opt.label + '</option>';
      }, '');
    }

    if (d.textShadowEdit) {
      $('#text-shadow').parent().show();
    }

    // Build text alignment options:
    if (d.textAlignOpts && d.textAlignOpts.length) {
      $('#text-align').append(buildOptions(d.textAlignOpts)).show();
    }

    // Build credit alignment options:
    if (d.creditAlignOpts && d.creditAlignOpts.length) {
      $('#credit-align').append(buildOptions(d.creditAlignOpts)).show();
    }

    // Build font family options:
    if (d.fontFamilyOpts && d.fontFamilyOpts.length) {
      $('#font-family').append(buildOptions(d.fontFamilyOpts)).show();
    }

    // Build font color options:
    if (d.fontColorOpts && d.fontColorOpts.length) {
      $('#font-color').show().find('ul').append(buildColorOptions(d.fontColorOpts, 'font-color'));
    }

    // Build watermark options:
    if (d.watermarkOpts && d.watermarkOpts.length) {
      $('#watermark').append(buildOptions(d.watermarkOpts)).show();
    }

    // Setup available image sizes:
    if (d.sizeOpts && d.sizeOpts.length) {
      $('#image-size').show().append(buildSizeOptions(d.sizeOpts));
    }

    // Build background color options:
    if (d.backgroundColorOpts && d.backgroundColorOpts.length) {
      var backgroundOpts = _.reduce(
        d.backgroundColorOpts,
        function(memo, opt) {
          var color = opt.hasOwnProperty("value") ? opt.value : opt;
          return (memo +=
            '<li><label><input class="m-editor__swatch" style="background-color:' +
            color +
            '" type="radio" name="background-color" value="' +
            color +
            '"></label></li>');
        },
        ""
      );

      $("#background-color").show().find("ul").append(backgroundOpts);
    }
  },

  render: function() {
    var d = this.model.toJSON();
    this.$('#headline').val(d.headlineText);
    this.$('#credit').val(d.creditText);
    this.$('#credit-title').val(d.creditTitle);
    this.$('#watermark').val(d.watermarkSrc);
    this.$('#image-scale').val(d.imageScale);
    this.$('#font-size').val(d.fontSize);
    this.$('#headline-width').val(d.headlineWidth);
    this.$('#font-family').val(d.fontFamily);
    this.$('#text-align').val(d.textAlign);
    this.$('#credit-align').val(d.creditAlign);
    this.$('#text-shadow').prop('checked', d.textShadow);
    this.$('#font-color').find('[value="'+d.fontColor+'"]').prop('checked', true);
    this.$("#overlay-alpha").val(d.overlayAlpha);
    this.$("#backgroundcolor").find('[value="' + d.backgroundColor + '"]').prop("checked", true);
  },

  events: {
    'input #headline': 'onHeadline',
    'input #credit': 'onCredit',
    'input #credit-title': 'onCreditTitle',
    'change #image-size': 'onImageSize',
    'input #image-scale': 'onScale',
    'input #font-size': 'onFontSize',
    'input #headline-width': 'onHeadlineWidth',
    'change #font-family': 'onFontFamily',
    'change [name="font-color"]': 'onFontColor',
    'change #watermark': 'onWatermark',
    'change #text-align': 'onTextAlign',
    'change #credit-align': 'onCreditAlign',
    'change #text-shadow': 'onTextShadow',
    'change [name="background-color"]': "onBackgroundColor",
    'dragover #dropzone': 'onZoneOver',
    'dragleave #dropzone': 'onZoneOut',
    'change #overlay-alpha': 'onOverlayAlpha',
    'drop #dropzone': 'onZoneDrop'
  },

  onCredit: function() {
    this.model.set('creditText', this.$('#credit').val());
  },

  onCreditTitle: function() {
    this.model.set('creditTitle', this.$('#credit-title').val());
  },

  onHeadline: function() {
    this.model.set('headlineText', this.$('#headline').val());
  },

  onTextAlign: function() {
    this.model.set('textAlign', this.$('#text-align').val());
  },

  onCreditAlign: function() {
    this.model.set('creditAlign', this.$('#credit-align').val());
  },

  onTextShadow: function() {
    this.model.set('textShadow', this.$('#text-shadow').prop('checked'));
  },

  onFontSize: function() {
    this.model.set('fontSize', this.$('#font-size').val());
  },

  onHeadlineWidth: function() {
    this.model.set('headlineWidth', this.$('#headline-width').val());
  },

  onFontFamily: function() {
    this.model.set('fontFamily', this.$('#font-family').val());
  },

  onFontColor: function(evt) {
    this.model.set('fontColor', this.$(evt.target).val());
  },

  onWatermark: function() {
    this.model.set('watermarkSrc', this.$('#watermark').val());
    if (localStorage) localStorage.setItem('meme_watermark', this.$('#watermark').val());
  },

  onImageSize: function(e) {
    var sizes = this.model.get('sizeOpts'),
        size = _.findWhere(sizes, {label: e.currentTarget.value});

    this.model.set({
      width: size.width,
      height: size.height
    });

    if (size.label == 'Instagram'){
      document.getElementById('meme-canvas-view').className += ' small';
    }else{
      document.getElementById('meme-canvas-view').classList.remove('small');
    }
  },

  onScale: function() {
    this.model.set('imageScale', this.$('#image-scale').val());
  },

  onBackgroundColor: function(evt) {
    this.model.set("backgroundColor", this.$(evt.target).val());
  },

  onOverlayAlpha: function() {
    this.model.set("overlayAlpha", this.$("#overlay-alpha").val());
  },

  getDataTransfer: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return evt.originalEvent.dataTransfer || null;
  },

  onZoneOver: function(evt) {
    var dataTransfer = this.getDataTransfer(evt);
    if (dataTransfer) {
      dataTransfer.dropEffect = 'copy';
      this.$('#dropzone').addClass('pulse');
    }
  },

  onZoneOut: function(evt) {
    this.$('#dropzone').removeClass('pulse');
  },

  onZoneDrop: function(evt) {
    var dataTransfer = this.getDataTransfer(evt);
    if (dataTransfer) {
      this.model.loadBackground(dataTransfer.files[0]);
      this.$('#dropzone').removeClass('pulse');
    }
  }
});
