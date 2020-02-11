release: python manage.py migrate
worker: gunicorn set_game_backend.wsgi --log-file -
web: npm start
