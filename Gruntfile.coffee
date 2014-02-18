module.exports = (grunt) ->
  grunt.initConfig

    # Преобразуем slim в html
    slim:
      dist:
        files: [
          expand: true
          cwd: 'development'
          src: ['{,*/}*.slim']
          dest: 'production'
          ext: '.html'
        ]

    # Преобразуем coffee в js
    coffee:
      options:
        bare: true
        sourceMap: true
      dist:
        files: [
          expand: true
          cwd: 'development/coffee'
          src: ['{,*/}*.coffee']
          dest: 'tmp/js'
          ext: '.js'
        ]

    # Преобразуем stylus в css
    stylus:
      dist:
        files: [
          expand: true
          cwd: 'development/stylus'
          src: ['{,*/}*']
          dest: 'tmp/css'
          ext: '.css'
        ]

    # Добавляем префиксы
    autoprefixer:
      options:
        browsers: ['> 3%', 'last 2 version']
      dist:
        files: [
          expand: true
          cwd: 'tmp/css'
          src: ['{,*/}*.css']
          dest: 'tmp/css'
          ext: '.css'
        ]

    # Минимизируем js и конкатенируем
    uglify:
      dist:
        files: [
          expand: true
          cwd: 'tmp/js'
          src: ['{,*/}*.js']
          dest: 'production/js'
          ext: '.js'
        ]

    # Копируем сорсмапы
    copy:
      dist:
        files: [
          expand: true
          cwd: 'tmp/js'
          src: ['{,*/}*.map']
          dest: 'production/js'
          ext: '.map'
        ]

    # Минимизируем css и конкатенируем
    cssmin:
      dist:
        files:
          './production/css/styles.css': './tmp/css/*.css'

    # Отслеживаем изменения автоматически
    watch:
      styles:
        files: ['development/stylus/*.styl']
        tasks: ['stylus','autoprefixer','cssmin']
      scripts:
        files: ['development/coffee/*.coffee']
        tasks: ['coffee','uglify']
      markup:
        files: ['development/*.slim']
        tasks: ['slim']
      copy:
        files: ['tmp/js/*.map']
        tasks: ['copy']


  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-slim'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  grunt.registerTask 'watcher', [
    'watch'
  ]

  grunt.registerTask 'default', [
    'slim'
    'coffee'
    'stylus'
    'autoprefixer'
    'uglify'
    'cssmin'
    'copy'
  ]



