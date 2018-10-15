module.exports = function(grunt) {

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        browserify:     {
            options:      {
                transform:  [ require('brfs') ],
                browserifyOptions: {
                    basedir: "Frontend/src/"
                }
            },

            main: {
                src: 'Frontend/src/main.js',
                dest: 'Frontend/www/assets/js/main.js'
            },
            parsed: {
                src: 'Frontend/src/parsed.js',
                dest: 'Frontend/www/assets/js/parsed.js'
            }
        }
    };

    var watchDebug = {
        options: {
            'no-beep': true
        },
        scripts: {
            files: ['Frontend/src/**/*.js', 'Frontend/**/*.ejs', 'Frontend/src/*.js'],
            tasks: [
                'browserify:main',
                'browserify:parsed'
            ]
        }
    };

    config.watch = watchDebug;
    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',
        [
            'browserify:main',
            'browserify:parsed'
        ]
    );

};