module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less',
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    "dist/styles/main.min.css": "src/styles/main.less",
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['htmlmin:dev']
            },
            js: {
                files: ['src/scripts/**/*.js'],
                tasks: ['uglify:dev']
            },
            img: {
                files: ['src/img/**/*'],
                tasks: ['copy:dev']
            }

        },
        htmlmin: {
            dev: {
                options: {
                    removeComments: false,
                    collapseWhiteSpace: false
                },
                files: {
                    'dev/index.html': 'src/index.html'
                }
            },
            dist: {
                options: {
                    removeComments: true,
                    collapseWhiteSpace: true
                },
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },
        uglify:{
            dev: {
                files: {
                    'dev/scripts/main.min.js': 'src/scripts/main.js'
                }
            },
            dist: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        },
        copy: {
            dev:{
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: '**',
                    dest: 'dev/img'
                },
                {
                    expand: true,
                    cwd: 'src/fonts',
                    src: '**',
                    dest: 'dev/fonts'
                }]
            },
            dist:{
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: '**',
                    dest: 'dist/img'
                },
                {
                    expand: true,
                    cwd: 'src/fonts',
                    src: '**',
                    dest: 'dist/fonts'
                }]
            }
        }
    })
    
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-copy')
    
    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['copy:dist', 'less:production', 'htmlmin:dist', 'uglify:dist'])
}