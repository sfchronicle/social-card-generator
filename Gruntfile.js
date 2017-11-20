module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Empty directories before build process
    clean: {
      css: ["dist/*.css", "dist/*.css.map"],
      js: ["dist/*.js", "dist/*.js.map"]
    },

    // Use Uglify to bundle up a pym file for the home page
    uglify: {
      options: {
        sourceMap: true
      },
      homepage: {
        files: {
          'dist/scripts.js': [
            'source/javascripts/vendor/jquery.js',
            'source/javascripts/vendor/underscore.js',
            'source/javascripts/vendor/backbone.js',
            'source/javascripts/main.js',
            'source/javascripts/models/meme.js',
            'source/javascripts/views/meme-canvas.js',
            'source/javascripts/views/meme-editor.js',
            'source/javascripts/helpers/font-monitor.js',
            'source/javascripts/settings.js'

          ]
        }
      }
    },

    // Transpile SASS
    sass: {
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: {
          'dist/styles.css': 'source/stylesheets/main.scss'
        }
      }
    },

    // watch locations
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['source/**/*.js'],
        tasks: ['uglify']
      },
      styles: {
        files: ['source/**/*.scss'],
        tasks: ['sass']
      },
      markup: {
        files: ['index.html']
      }
    },

  // Creating a local server
    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          base: './',
          keepalive: true,
          livereload: true,
          open: true
        }
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['connect', 'watch']
    }
  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['clean', 'sass', 'uglify', 'concurrent']);

};
