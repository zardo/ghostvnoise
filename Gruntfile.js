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
            },
            js: {
                files: ['./assets/javascript/*.js'],
                tasks: ['concat'],
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

        concat: {
            options: {
                separator: ';\n',
            },
            js_frontend: {
                src: [
                    './bower_components/jquery/dist/jquery.min.js',
                    './assets/javascript/sidebar.js',
                    './assets/javascript/Graph.js',
                ],
                dest: './assets/javascript/dist/ghostvnoise.js'
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
    grunt.loadNpmTasks('grunt-cache-busting');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Task definition
    grunt.registerTask('production', ['less', 'concat', 'cssmin']);
    grunt.registerTask('default', ['watch']);

};