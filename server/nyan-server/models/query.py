from base import Session
from user import User

session = Session()

user = session.query(User).all()

print('\n##All users:')
for acc in user:
    print(f'{acc.name} {acc.password} {acc.id}')
print('')