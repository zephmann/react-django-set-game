release: python manage.py migrate
web: gunicorn set_game_backend.wsgi --log-file -
web: npm start
