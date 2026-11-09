import urllib.request
import urllib.error
import json

base_url = 'http://localhost:3000'

def post_json(path, data):
    req = urllib.request.Request(
        f'{base_url}{path}',
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json', 'User-Agent': 'Shirley-Test-Suite'}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode('utf-8'))

def get_url(path):
    req = urllib.request.Request(
        f'{base_url}{path}',
        headers={'User-Agent': 'Shirley-Test-Suite'}
    )
    with urllib.request.urlopen(req) as resp:
        return resp.status, resp.read().decode('utf-8')

print('--- TEST 1: Register Founding Member 1 ---')
data1 = {
    'fullName': 'Ananya Sharma',
    'email': 'ananya.test@gmail.com',
    'phone': '+91 98765 43210',
    'product_interests': ['Period Support', 'PCOS Support'],
    'consent': True,
    'utmSource': 'instagram',
    'utmMedium': 'story'
}
status, res = post_json('/api/register', data1)
print('Status:', status, 'Success:', res.get('success'))
assert status in (200, 201), f'Unexpected status {status}'
assert res['success'] is True
member1 = res['member']
print('Member 1 Created:', member1['memberNumber'], member1['id'], member1['referralCode'])
print('Masked Email:', member1['maskedEmail'])
assert 'ananya' in member1['maskedEmail'] or 'a****' in member1['maskedEmail']

print('\n--- TEST 2: Duplicate Registration Handling ---')
status, res_dup = post_json('/api/register', data1)
print('Status:', status, 'isExisting:', res_dup.get('isExisting'))
assert res_dup['isExisting'] is True
assert res_dup['member']['id'] == member1['id']

print('\n--- TEST 3: Validation Error Handling ---')
status, res_err = post_json('/api/register', {'fullName': '', 'email': 'bademail', 'consent': False})
print('Status:', status, 'Errors:', res_err.get('errors'))
assert status == 400
assert 'fullName' in res_err['errors']
assert 'email' in res_err['errors']
assert 'consent' in res_err['errors']
assert 'product_interests' in res_err['errors']

print('\n--- TEST 4: Register Member 2 via Member 1 Referral ---')
import time
unique_suffix = int(time.time())
data2 = {
    'fullName': 'Pooja Verma',
    'email': f'pooja.verma.{unique_suffix}@example.com',
    'phone': '+91 91234 56789',
    'product_interests': ['UTI Support', 'Anemia Support'],
    'consent': True,
    'referredBy': member1['referralCode']
}
status, res2 = post_json('/api/register', data2)
print('Status:', status, 'Success:', res2.get('success'))
assert res2['success'] is True
member2 = res2['member']
print('Member 2 Created:', member2['memberNumber'], member2['id'])

print('\n--- TEST 5: Verify Referral Attribution Count ---')
status, body_m1 = get_url('/api/member/' + member1['id'])
m1_data = json.loads(body_m1)['member']
print('Member 1 Updated Referral Count:', m1_data['referralCount'])
assert m1_data['referralCount'] >= 1, f'Expected >= 1 referral, got {m1_data["referralCount"]}'

print('\n--- TEST 6: Check Key Routes ---')
routes = [
    '/',
    '/our-story',
    '/products',
    '/products/cycora',
    '/products/inosia',
    '/journal',
    '/journal/demystifying-magnesium-bisglycinate',
    '/faq',
    '/privacy',
    '/terms',
    f'/founding-member/{member1["id"]}',
    '/sitemap.xml',
    '/robots.txt'
]
for r in routes:
    st, html = get_url(r)
    print(f'Route {r} -> HTTP {st} ({len(html)} bytes)')
    assert st == 200

print('\nALL 6 TEST SUITES PASSED FLAWLESSLY!')

