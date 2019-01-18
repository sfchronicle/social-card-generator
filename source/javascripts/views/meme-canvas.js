/*
* MemeCanvasView
* Manages the creation, rendering, and download of the Meme image.
*/
MEME.MemeCanvasView = Backbone.View.extend({

  initialize: function() {
    var canvas = document.createElement('canvas');
    var $container = MEME.$('#meme-canvas');

    // Display canvas, if enabled:
    if (canvas && canvas.getContext) {
      $container.html(canvas);
      this.canvas = canvas;
      this.setDownload();
      this.render();
    } else {
      $container.html(this.$('noscript').html());
    }

    // Listen to model for changes, and re-render in response:
    this.listenTo(this.model, 'change', this.render);
  },

  setDownload: function() {
    var a = document.createElement('a');
    if (typeof a.download == 'undefined') {
      this.$el.append('<p class="m-canvas__download-note">Right-click button and select "Download Linked File..." to save image.</p>');
    }
  },

  render: function() {
    // Return early if there is no valid canvas to render:
    if (!this.canvas) return;

    // Collect model data:
    var m = this.model;
    var d = this.model.toJSON();
    var ctx = this.canvas.getContext('2d');
    var padding = Math.round(d.width * d.paddingRatio);

    // Reset canvas display:
    this.canvas.width = d.width;
    this.canvas.height = d.height;
    ctx.clearRect(0, 0, d.width, d.height);

    function renderBackground(ctx) {
      // Base height and width:
      var bh = m.background.height;
      var bw = m.background.width;

      if (bh && bw) {
        // Transform height and width
        
        var th = bh * d.imageScale;
        var tw = bw * d.imageScale;
        var cx = d.backgroundPosition.x || d.width / 2;
        var cy = d.backgroundPosition.y || d.height / 2;

        ctx.globalAlpha = d.overlayAlpha;
        ctx.drawImage(m.background, 0, 0, bw, bh, cx-(tw/2), cy-(th/2), tw, th);
        ctx.globalAlpha = 1;
      }
    }

    function renderBackgroundColor(ctx) {
      if (d.backgroundColor) {
        ctx.fillStyle = d.backgroundColor;
        ctx.fillRect(0, 0, d.width, d.height);
      }
      renderBackground(ctx);
    }

    function renderHeadline(ctx) {
      var maxWidth = Math.round(d.width * d.headlineWidth);
      var x = padding;
      var y = padding;

      ctx.font = d.fontSize +'pt '+ d.fontFamily;
      ctx.fillStyle = d.fontColor;
      ctx.textBaseline = 'top';

      console.log('FONT', ctx.font);

      // Text shadow:
      if (d.textShadow) {
        ctx.shadowColor = "#666";
        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 10;
      }

      // Text alignment:
      if (d.textAlign == 'center') {
        ctx.textAlign = 'center';
        x = d.width / 2;
        y = d.height - d.height / 1.5;
        maxWidth = d.width - d.width / 3;

      } else if (d.textAlign == 'right' ) {
        ctx.textAlign = 'right';
        x = d.width - padding;
        // y = d.height / 5;

      } else {
        ctx.textAlign = 'left';
        y = d.height / 6;
      }

      var words = d.headlineText.split(' ');
      var line  = '';

      for (var n = 0; n < words.length; n++) {
        var testLine  = line + words[n] + ' ';
        var metrics   = ctx.measureText( testLine );
        var testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          // this controls the line height
          y += Math.round(d.fontSize * 1.65);
        } else {
          line = testLine;
        }
      }
      var smrtQuotes = line.replace(/(\W|^)"(\S)/g, '$1\u201c$2').replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2').replace(/([^0-9])"/g,'$1\u201d').replace(/(\W|^)'(\S)/g, '$1\u2018$2').replace(/([a-z])'([a-z])/ig, '$1\u2019$2').replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3').replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3').replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019').replace(/'''/g, '\u2034').replace(/("|'')/g, '\u2033').replace(/'/g, '\u2032');
      ctx.fillText(smrtQuotes, x, y);
    }

    function renderCredit(ctx) {
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = d.fontColor;
      ctx.font = 'normal '+ d.creditSize +'pt '+ d.creditFont;
      var x = padding;
      var y = d.height /1.2;

      // Text shadow:
      if (d.textShadow) {
        ctx.shadowColor = "#666";
        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 10;
      }

      // Credit alignment:
      console.log(ctx.textAlign);
      if (d.creditAlign == 'center') {
        ctx.textAlign = 'center';
        x = d.width / 2;

      } else if (d.creditAlign == 'right' ) {
        ctx.textAlign = 'right';
        x = d.width - padding;

      } else {
        ctx.textAlign = 'left';
      }

      ctx.fillText(d.creditText.toUpperCase(), x,y);
    }

    function renderCreditTitle(ctx) {
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = d.fontColor;
      ctx.font = 'normal '+ d.creditTitleSize +'pt '+ d.creditTitleFont;
      var x = padding;
      var y = d.height /1.13;

      // Text shadow:
      if (d.textShadow) {
        ctx.shadowColor = "#666";
        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 10;
      }

      // Credit alignment:
      if (d.creditAlign == 'center') {
        ctx.textAlign = 'center';
        x = d.width / 2;

      } else if (d.creditAlign == 'right') {
        ctx.textAlign = 'right';
        x = d.width - padding;

      } else {
        ctx.textAlign = 'left';
      }

      ctx.fillText(d.creditTitle, x,y);
    }

    function renderWatermark(ctx) {
      // Base & transformed height and width:
      var bw, bh, tw, th;
      bh = th = m.watermark.height;
      bw = tw = m.watermark.width;

      if (bh && bw) {
        // Calculate watermark maximum width:
        var mw = d.width * d.watermarkMaxWidthRatio;

        // Constrain transformed height based on maximum allowed width:
        if (mw < bw) {
          th = bh * (mw / bw);
          tw = mw;
        }

        var x = d.width-padding-tw;
        var y = d.height-padding-th;

        if(d.creditAlign == 'right'){
          x = padding
        }

        ctx.globalAlpha = d.watermarkAlpha;
        ctx.drawImage(m.watermark, 0, 0, bw, bh, x, y, tw, th);
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }

    renderBackground(ctx);
    renderBackgroundColor(ctx);
    renderHeadline(ctx);
    renderCredit(ctx);
    renderCreditTitle(ctx);
    renderWatermark(ctx);

    var data = this.canvas.toDataURL(); //.replace('image/png', 'image/octet-stream');
    this.$('#meme-download').attr({
      'href': data,
      'download': (d.downloadName || 'share') + '.png'
    });

    // Enable drag cursor while canvas has artwork:
    this.canvas.style.cursor = this.model.background.width ? 'move' : 'default';
  },

  events: {
    'mousedown canvas': 'onDrag'
  },

  // Performs drag-and-drop on the background image placement:
  onDrag: function(evt) {
    evt.preventDefault();

    // Return early if there is no background image:
    if (!this.model.hasBackground()) return;

    // Configure drag settings:
    var model = this.model;
    var d = model.toJSON();
    var iw = model.background.width * d.imageScale / 2;
    var ih = model.background.height * d.imageScale / 2;
    var origin = {x: evt.clientX, y: evt.clientY};
    var start = d.backgroundPosition;
    start.x = start.x || d.width / 2;
    start.y = start.y || d.height / 2;

    // Create update function with draggable constraints:
    function update(evt) {
      evt.preventDefault();
      model.set('backgroundPosition', {
        x: (start.x - (origin.x - evt.clientX)),
        y: (start.y - (origin.y - evt.clientY))
      });
    }

    // Perform drag sequence:
    var $doc = MEME.$(document)
      .on('mousemove.drag', update)
      .on('mouseup.drag', function(evt) {
        $doc.off('mouseup.drag mousemove.drag');
        update(evt);
      });
  }
});
