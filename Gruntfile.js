module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    var files = {
        css: ['public/styles/main.css'],
        html: ['public/index.html','public/app/**/*.html'],
        js: ['public/app/**/*.js']
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        env: {
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },

        jasmine: {
            mr: {

            }
        },

        nodemon: {
            dev: {
                script: 'servers/server.dev.js',
                options: {
                    watch: ['servers/*']
                }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        },

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: files.css
            },
            js: {
                files: files.js
            },
            html: {
                files: files.html
            }
        }


    });

    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'concurrent'
        ]);
    });


    grunt.registerTask('default', ['useminPrepare', 'copy', 'concat', 'uglify', 'usemin']);
};