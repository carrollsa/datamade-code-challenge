import pytest

def test_api_parse_succeeds(client):
    
    address_string = '123 main st chicago il'

    response = client.get('/api/parse/', { 'address': address_string })

    assert 'input_string' in response.data, '"input_string" not in response object'

    assert 'address_components' in response.data, '"address_components" not in response object'

    assert 'address_type' in response.data, '"address_type" not in response object'

    assert isinstance(response.data['input_string'], str), 'Failed to return type str for key "input_string"'

    assert isinstance(response.data['address_components'], dict), 'Failed to return type dict for key "address_components"'

    assert isinstance(response.data['address_type'], str), 'Failed to return type str for key "address_type"'


def test_api_parse_raises_error(client):

    address_string = '123 main st chicago il 123 main st'

    response = client.get('/api/parse/', { 'address': address_string })

    assert response.status_code == 400, 'Failed to throw RepeatedLabelError'