module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    var devServer = require('servers/server.dev.js');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        express: {
            dev: {
                options: {
                    port: 3000,
                    debug: true
                },
                server: {
                    options: {
                        script: 'servers/server.dev.js'
                    }
                }
            }
        },

        watch: {
            express: {
                files: [
                    ['app/**/*'],
                    ['img/**/*'],
                    ['styles/main.css']
                ],
                tasks:  [ 'express:dev'],
                options: {
                    spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
                }
            }
        }

    });

    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'express:dev',
            'watch'
        ]);
    });


    grunt.registerTask('default', ['useminPrepare', 'copy', 'concat', 'uglify', 'usemin']);
};