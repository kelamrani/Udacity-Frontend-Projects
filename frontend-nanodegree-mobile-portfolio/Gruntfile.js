/*
 After you have changed the settings under responsive_images
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({

    // minify css files
    cssmin: {
      target: {
        files: [
            {
              expand: true,
              cwd: 'src/css',
              src: ['*.css', '!*.min.css'],
              dest: 'dist/css',
              ext: '.min.css'
            },
            {
              expand: true,
                cwd: 'src/views/css',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/views/css',
                ext: '.min.css'
            }]
      }
    },

    //minify js
      uglify: {
          options: {
              mangle: false
          },
          target: {
              files: [
                {
                    expand: true,
                    cwd: 'src/js',
                    src: ['*.js', '!*.min.js'],
                    dest : 'dist/js',
                    ext: '.min.js'
                },
                {
                    expand: true,
                    cwd: 'src/views/js',
                    src: ['*.js', '!*.min.js'],
                    dest : 'dist/views/js',
                    ext: '.min.js'
                }
              ]
          }
      },


      //Replace css and js with minified versions
      processhtml: {
          dist: {
              files:[
                  {'dist/index.html': ['src/index.html']},
                  {'dist/project-2048.html': ['src/project-2048.html']},
                  {'dist/project-mobile.html': ['src//project-mobile.html']},
                  {'dist/project-webperf.html': ['src/project-webperf.html']},
                  {'dist/views/pizza.html': ['src/views/pizza.html']}
              ]
          }
      },

      // copy remaining files (html files should be copied from processhtml to include min js/css
      copy: {
          files:
              {
                  expand: true,
                  cwd: 'src',
                  src: ['**', '!**/*.js', '!**/*.css', '!**/*.html'],
                  dest: 'dist'

              }
      }

  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.registerTask('default', ['cssmin','uglify','processhtml', 'copy']);

};
