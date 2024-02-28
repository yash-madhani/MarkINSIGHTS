from serpapi import GoogleSearch


def get_locations(buisness:list):
    params = {
    "engine": "google_trends",
    "q": buisness,
    "data_type": "GEO_MAP_0",
    "geo":"IN",
    "date":"today 12-m",
    "api_key": "af5ce4a05b46dd2be9269279239d840d8c9b69b6a1cfabc5bcb59f87ed289684",
    "region":"CITY"

    }

    search = GoogleSearch(params)
    results = search.get_dict()
    interest_by_region = results["interest_by_region"]
    extracted_data = [{'location': entry['location'], 'extracted_value': entry['extracted_value']} for entry in interest_by_region]
    return extracted_data
