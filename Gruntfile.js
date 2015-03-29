module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

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
                files: ['public/styles/main.css']
            },
            js: {
                files: ['public/app/**/*.js']
            },
            html: {
                files: [
                    ['public/index.html'],
                    ['public/app/**/*.html']
                ]
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