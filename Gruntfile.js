module.exports = function(grunt) {

    grunt.initConfig({

        less: {
            development: {
                options: {
                    compress: true,
                    cleancss: true,
                    strictImports: true
                },
                files: {
                    "./assets/stylesheets/css/ghostvnoise.css": "./assets/stylesheets/less/ghostvnoise.less"
                }
            }
        },

        watch: {
            less: {
                files: ['./assets/stylesheets/less/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }
        },

        'cache-busting': {
            css: {
                replace: ['app/views/block/head.blade.php'],
                replacement: 'dm.css',
                file: 'public/assets/stylesheets/dm.css',
                cleanup: true
            },
            js: {
                replace: ['app/views/block/scripts.blade.php'],
                replacement: 'dm.js',
                file: 'public/assets/javascript/dm.js',
                cleanup: true
            }
        },

        cssmin: {
            combine: {
                files: {
                    './assets/stylesheets/css/ghostvnoise.css': ['./assets/stylesheets/css/ghostvnoise.css']
                }
            }
        }

    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-cache-busting');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Task definition
    grunt.registerTask('production', ['copy', 'less', 'concat', 'uglify', 'cssmin' ,'cache-busting']);
    grunt.registerTask('default', ['watch']);

};