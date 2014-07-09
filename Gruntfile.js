module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['libs/*.js', 'src/*.js'],
        dest: 'build/js/app.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/js/app.js',
        dest: 'build/js/app.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        camelcase: true,
        smarttabs: true,
        '-W099': true,
        globals: {
          jQuery: true
        },
      },
      all: ['src/**/*.js']
    },
    less: {
      dev: {
        options: {
          paths: ["css/", "css/includes/"]
        },
        files: {
          "build/css/main.css": "css/main.less"
        }
      },
      prod: {
        options: {
          paths: ["css/"],
          cleancss: true
        },
        files: {
          "build/css/main.css": "css/main.less"
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'css/**/*.less', 'index.html'],
        tasks: ['jshint', 'concat', 'less:dev'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('dev', ['watch']);

  grunt.registerTask('prod', ['jshint', 'concat', 'less:prod', 'uglify']);



};