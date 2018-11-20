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
            },
            filters: {
                src: 'Frontend/src/filters.js',
                dest: 'Frontend/www/assets/js/filters.js'
            },
            competitor: {
                src: 'Frontend/src/competitor.js',
                dest: 'Frontend/www/assets/js/competitor.js'
            },
            showFilters: {
                src: 'Frontend/src/showFilters.js',
                dest: 'Frontend/www/assets/js/showFilters.js'
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
                'browserify:parsed',
                'browserify:filters',
                'browserify:competitor',
                'browserify:showFilters'
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
            'browserify:parsed',
            'browserify:filters',
            'browserify:competitor',
            'browserify:showFilters'
        ]
    );

};