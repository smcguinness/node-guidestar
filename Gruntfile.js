'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.option( 'force', true );

  grunt.initConfig({
    eslint: {
      target: [
        'lib/**/*.js'
      ],
      options: {
        configFile: '.eslintrc.js',
        quiet: true,   
      }
    },
    watch: {
      files: [
        './lib/**/*.js'
      ],
      tasks: ['eslint']
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['eslint', 'watch']);
};
