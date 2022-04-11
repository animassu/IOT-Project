import psycopg2
import json


def db():
    return psycopg2.connect(
        dbname = "csc2006",
        user = 'postgres',
        password = 'cl0udplus!',
        host = '174.138.23.75',
        port = '5432'
    )

def query_db(query, args=(), one=False):
    cur = db().cursor()
    cur.execute(query, args)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    cur.connection.close()
    return (r[0] if r else None) if one else r

query = query_db("SELECT * FROM foot_traffic")
json_output = json.dumps(query, default=str)
print(json_output)