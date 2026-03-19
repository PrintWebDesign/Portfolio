import requests
import sys
import json
from datetime import datetime

class HealthCentreAPITester:
    def __init__(self, base_url="https://medical-services-hub-2.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            else:
                print(f"❌ Unsupported method: {method}")
                return False, {}

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response preview: {str(response_data)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:500] if response.text else 'No response body'
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                return False, {}

        except Exception as e:
            self.failed_tests.append({
                'name': name,
                'error': str(e),
                'expected': expected_status,
                'actual': 'Exception'
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_services_endpoint(self):
        """Test services endpoint"""
        success, response = self.run_test(
            "Services Endpoint",
            "GET",
            "/api/services",
            200
        )
        if success:
            # Verify response structure
            if 'services' in response and len(response['services']) >= 5:
                print("   ✅ Services data structure is correct")
                # Check for required service fields
                service = response['services'][0]
                required_fields = ['id', 'title', 'shortDescription', 'description', 'features', 'icon']
                for field in required_fields:
                    if field not in service:
                        print(f"   ⚠️  Missing field: {field}")
            else:
                print("   ⚠️  Services response structure may be incorrect")
        return success

    def test_doctors_endpoint(self):
        """Test doctors endpoint"""
        success, response = self.run_test(
            "Doctors Endpoint",
            "GET", 
            "/api/doctors",
            200
        )
        if success:
            # Verify response structure
            if 'doctors' in response and len(response['doctors']) >= 1:
                print("   ✅ Doctors data structure is correct")
                doctor = response['doctors'][0]
                required_fields = ['id', 'name', 'title', 'bio']
                for field in required_fields:
                    if field not in doctor:
                        print(f"   ⚠️  Missing field: {field}")
            else:
                print("   ⚠️  Doctors response structure may be incorrect")
        return success

    def test_testimonials_endpoint(self):
        """Test testimonials endpoint"""
        success, response = self.run_test(
            "Testimonials Endpoint",
            "GET",
            "/api/testimonials", 
            200
        )
        if success:
            # Verify response structure
            if isinstance(response, list) and len(response) >= 3:
                print("   ✅ Testimonials data structure is correct")
                testimonial = response[0]
                required_fields = ['id', 'name', 'role', 'content', 'rating']
                for field in required_fields:
                    if field not in testimonial:
                        print(f"   ⚠️  Missing field: {field}")
            else:
                print("   ⚠️  Testimonials response structure may be incorrect")
        return success

    def test_blog_endpoint(self):
        """Test blog posts endpoint"""
        success, response = self.run_test(
            "Blog Posts Endpoint",
            "GET",
            "/api/blog",
            200
        )
        if success:
            # Verify response structure
            if isinstance(response, list) and len(response) >= 3:
                print("   ✅ Blog posts data structure is correct")
                post = response[0]
                required_fields = ['id', 'title', 'slug', 'excerpt', 'content', 'category', 'author']
                for field in required_fields:
                    if field not in post:
                        print(f"   ⚠️  Missing field: {field}")
            else:
                print("   ⚠️  Blog response structure may be incorrect")
        return success

    def test_contact_endpoint(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "(555) 123-4567",
            "service": "Family Practice",
            "message": "This is a test message from automated testing."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "/api/contact",
            200,
            data=contact_data
        )
        
        if success:
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'message', 'created_at']
            for field in required_fields:
                if field not in response:
                    print(f"   ⚠️  Missing field in response: {field}")
                    
        return success

    def test_newsletter_endpoint(self):
        """Test newsletter subscription"""
        newsletter_data = {
            "email": f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        }
        
        success, response = self.run_test(
            "Newsletter Subscription",
            "POST",
            "/api/newsletter", 
            200,
            data=newsletter_data
        )
        
        if success:
            # Verify response structure
            required_fields = ['id', 'email', 'subscribed_at', 'active']
            for field in required_fields:
                if field not in response:
                    print(f"   ⚠️  Missing field in response: {field}")
                    
        return success

    def test_chat_endpoint(self):
        """Test chat functionality"""
        chat_data = {
            "session_id": f"test_session_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "message": "Hello, I need information about your services."
        }
        
        success, response = self.run_test(
            "Chat Message",
            "POST",
            "/api/chat",
            200,
            data=chat_data
        )
        
        if success:
            # Verify response structure
            required_fields = ['id', 'session_id', 'sender', 'message', 'created_at']
            for field in required_fields:
                if field not in response:
                    print(f"   ⚠️  Missing field in response: {field}")
            
            # Verify it's a bot response
            if response.get('sender') != 'bot':
                print(f"   ⚠️  Expected bot response, got: {response.get('sender')}")
                    
        return success

    def test_blog_single_post(self):
        """Test single blog post endpoint using first post slug"""
        # First get blog posts to find a slug
        success, response = self.run_test(
            "Blog Posts for Slug",
            "GET",
            "/api/blog",
            200
        )
        
        if success and len(response) > 0:
            slug = response[0]['slug']
            success, single_post = self.run_test(
                f"Single Blog Post ({slug})",
                "GET",
                f"/api/blog/{slug}",
                200
            )
            return success
        else:
            print("   ⚠️  Could not test single blog post - no blog posts available")
            return False

def main():
    print("🚀 Starting Milton Health Centre API Tests")
    print("=" * 60)
    
    tester = HealthCentreAPITester()
    
    # Test all endpoints
    test_results = []
    
    test_results.append(tester.test_services_endpoint())
    test_results.append(tester.test_doctors_endpoint())
    test_results.append(tester.test_testimonials_endpoint())
    test_results.append(tester.test_blog_endpoint())
    test_results.append(tester.test_blog_single_post())
    test_results.append(tester.test_contact_endpoint())
    test_results.append(tester.test_newsletter_endpoint())
    test_results.append(tester.test_chat_endpoint())
    
    # Print summary
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    print(f"✅ Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            error_msg = test.get('error', f"Expected {test['expected']}, got {test['actual']}")
            print(f"   - {test['name']}: {error_msg}")
    
    # Return success if all tests pass
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())