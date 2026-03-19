from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# =========== Models ===========

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    service: Optional[str] = None
    preferredDoctor: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    service: Optional[str] = None
    preferredDoctor: Optional[str] = None
    message: str

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    active: bool = True

class NewsletterCreate(BaseModel):
    email: str

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    content: str
    rating: int = 5
    image: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    image: Optional[str] = None
    author: str
    published_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_published: bool = True

class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    sender: str  # 'user' or 'bot'
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatMessageCreate(BaseModel):
    session_id: str
    message: str

# =========== Routes ===========

@api_router.get("/")
async def root():
    return {"message": "Milton Health Centre API"}

# Contact Messages
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    for c in contacts:
        if isinstance(c['created_at'], str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return contacts

# Newsletter
@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(input: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": input.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    sub_obj = NewsletterSubscription(email=input.email)
    doc = sub_obj.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    await db.newsletter.insert_one(doc)
    return sub_obj

@api_router.get("/newsletter", response_model=List[NewsletterSubscription])
async def get_newsletter_subscriptions():
    subs = await db.newsletter.find({}, {"_id": 0}).to_list(1000)
    for s in subs:
        if isinstance(s['subscribed_at'], str):
            s['subscribed_at'] = datetime.fromisoformat(s['subscribed_at'])
    return subs

# Testimonials
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    if not testimonials:
        # Return default testimonials if none exist
        return [
            Testimonial(
                id="1",
                name="Sarah Johnson",
                role="Family Patient",
                content="Dr. Qureshi and the team at Milton Health Centre have been exceptional. The care and attention they provide is unmatched. I've been bringing my whole family here for years.",
                rating=5,
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
            ).model_dump(),
            Testimonial(
                id="2",
                name="Michael Chen",
                role="Travel Clinic Client",
                content="Got all my vaccinations for my trip to Southeast Asia. The staff was knowledgeable and made the process smooth and stress-free. Highly recommend their travel clinic!",
                rating=5,
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            ).model_dump(),
            Testimonial(
                id="3",
                name="Emily Rodriguez",
                role="Aesthetic Client",
                content="The aesthetic treatments here are top-notch. Professional staff, clean environment, and amazing results. I feel more confident than ever!",
                rating=5,
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
            ).model_dump(),
            Testimonial(
                id="4",
                name="David Thompson",
                role="Walk-in Patient",
                content="Needed urgent care on a Saturday and was seen quickly. The doctors were thorough and caring. Best walk-in clinic experience I've had.",
                rating=5,
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
            ).model_dump()
        ]
    for t in testimonials:
        if isinstance(t.get('created_at'), str):
            t['created_at'] = datetime.fromisoformat(t['created_at'])
    return testimonials

# Blog Posts
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    posts = await db.blog_posts.find({"is_published": True}, {"_id": 0}).to_list(100)
    if not posts:
        # Return default blog posts if none exist
        return [
            BlogPost(
                id="1",
                title="Understanding the Importance of Annual Health Checkups",
                slug="importance-annual-health-checkups",
                excerpt="Regular health checkups are essential for maintaining your well-being and catching potential issues early.",
                content="Full article content here...",
                category="Health Tips",
                image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
                author="Dr. Saima Qureshi"
            ).model_dump(),
            BlogPost(
                id="2",
                title="Travel Health: What You Need to Know Before Your Trip",
                slug="travel-health-tips",
                excerpt="Planning an international trip? Here's everything you need to know about travel vaccinations and health precautions.",
                content="Full article content here...",
                category="Travel Health",
                image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
                author="Dr. Saima Qureshi"
            ).model_dump(),
            BlogPost(
                id="3",
                title="Skin Care Tips for the Canadian Winter",
                slug="winter-skin-care-tips",
                excerpt="Keep your skin healthy and glowing during the harsh Canadian winter with these expert tips.",
                content="Full article content here...",
                category="Aesthetics",
                image="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=800",
                author="Milton Health Centre"
            ).model_dump()
        ]
    for p in posts:
        if isinstance(p.get('published_at'), str):
            p['published_at'] = datetime.fromisoformat(p['published_at'])
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug, "is_published": True}, {"_id": 0})
    if not post:
        # Check default blog posts
        default_posts = {
            "importance-annual-health-checkups": BlogPost(
                id="1",
                title="Understanding the Importance of Annual Health Checkups",
                slug="importance-annual-health-checkups",
                excerpt="Regular health checkups are essential for maintaining your well-being and catching potential issues early.",
                content="Regular health checkups are one of the most important things you can do for your overall health and wellbeing. These routine examinations allow your healthcare provider to detect potential health issues before they become serious problems. During an annual checkup, your doctor will review your medical history, perform a physical examination, and may order various screening tests based on your age, gender, and risk factors. Early detection of conditions like high blood pressure, diabetes, and certain cancers can significantly improve treatment outcomes and quality of life. Don't wait until you're sick to see your doctor – preventive care is the cornerstone of good health.",
                category="Health Tips",
                image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
                author="Dr. Saima Qureshi"
            ),
            "travel-health-tips": BlogPost(
                id="2",
                title="Travel Health: What You Need to Know Before Your Trip",
                slug="travel-health-tips",
                excerpt="Planning an international trip? Here's everything you need to know about travel vaccinations and health precautions.",
                content="Traveling to new destinations is exciting, but it's important to prepare your health before you go. Depending on your destination, you may need specific vaccinations to protect against diseases not common in Canada. Our Travel Clinic recommends booking a consultation 4-6 weeks before your trip to ensure adequate time for vaccine immunity to develop. Common travel vaccines include Hepatitis A and B, Typhoid, Yellow Fever, Japanese Encephalitis, and Rabies. Beyond vaccinations, we'll discuss antimalarial medications, food and water safety, and how to handle common travel health issues. A little preparation goes a long way in ensuring a healthy and enjoyable trip.",
                category="Travel Health",
                image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
                author="Dr. Saima Qureshi"
            ),
            "winter-skin-care-tips": BlogPost(
                id="3",
                title="Skin Care Tips for the Canadian Winter",
                slug="winter-skin-care-tips",
                excerpt="Keep your skin healthy and glowing during the harsh Canadian winter with these expert tips.",
                content="Canadian winters can be brutal on your skin. The combination of cold outdoor air and dry indoor heating can leave skin feeling parched, irritated, and uncomfortable. To keep your skin healthy during the winter months, start by switching to a richer moisturizer and applying it immediately after washing while skin is still damp. Use a humidifier in your home to add moisture to the air, and don't forget sunscreen – UV rays can still damage skin on cloudy winter days. Avoid long hot showers which strip natural oils, and consider adding hydrating serums with hyaluronic acid to your routine. Our Aesthetic Clinic offers professional treatments that can help restore your skin's winter glow.",
                category="Aesthetics",
                image="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=800",
                author="Milton Health Centre"
            )
        }
        if slug in default_posts:
            return default_posts[slug]
        raise HTTPException(status_code=404, detail="Blog post not found")
    if isinstance(post.get('published_at'), str):
        post['published_at'] = datetime.fromisoformat(post['published_at'])
    return post

# Chat
@api_router.post("/chat", response_model=ChatMessage)
async def send_chat_message(input: ChatMessageCreate):
    # Save user message
    user_msg = ChatMessage(
        session_id=input.session_id,
        sender="user",
        message=input.message
    )
    user_doc = user_msg.model_dump()
    user_doc['created_at'] = user_doc['created_at'].isoformat()
    await db.chat_messages.insert_one(user_doc)
    
    # Generate bot response (simple rule-based for now)
    bot_response = generate_bot_response(input.message)
    bot_msg = ChatMessage(
        session_id=input.session_id,
        sender="bot",
        message=bot_response
    )
    bot_doc = bot_msg.model_dump()
    bot_doc['created_at'] = bot_doc['created_at'].isoformat()
    await db.chat_messages.insert_one(bot_doc)
    
    return bot_msg

def generate_bot_response(message: str) -> str:
    message_lower = message.lower()
    
    if any(word in message_lower for word in ['hello', 'hi', 'hey']):
        return "Hello! Welcome to Milton Health Centre. How can I help you today? I can provide information about our services, hours, or help you get in touch with our team."
    
    if any(word in message_lower for word in ['hours', 'open', 'time']):
        return "Our clinic is open Monday to Friday 9:00AM to 6:00PM, and Saturday 10:00AM to 4:00PM. We're closed on Sundays."
    
    if any(word in message_lower for word in ['appointment', 'book', 'schedule']):
        return "To book an appointment, please use our contact form or call us at 905-693-6400. Same day appointments are available!"
    
    if any(word in message_lower for word in ['walk-in', 'walkin', 'urgent']):
        return "Our Walk-in Clinic is open Monday-Friday 9:00am-6:00pm and Saturday 10:00am-4:00pm. To minimize wait times, please call ahead at 905-693-6400."
    
    if any(word in message_lower for word in ['travel', 'vaccine', 'vaccination']):
        return "Our Travel Clinic offers comprehensive travel health services including vaccinations, health consultations, and antimalarial prescriptions. We recommend booking 4-6 weeks before your trip."
    
    if any(word in message_lower for word in ['aesthetic', 'botox', 'filler', 'skin']):
        return "Our Aesthetic Clinic offers various treatments including Botox, dermal fillers, and skin rejuvenation therapies. Book a consultation to discuss your goals with our specialists."
    
    if any(word in message_lower for word in ['family', 'doctor', 'new patient']):
        return "Dr. Saima Qureshi is currently accepting new patients for family practice. Contact us to register as a new patient."
    
    if any(word in message_lower for word in ['location', 'address', 'where']):
        return "Milton Health Centre is located at 200-1225 Maple Avenue, Milton, Ontario L9T 0A5. Call us at 905-693-6400 for directions."
    
    if any(word in message_lower for word in ['thank', 'thanks']):
        return "You're welcome! Is there anything else I can help you with?"
    
    return "Thank you for your message. For specific inquiries, please use our contact form or call us at 905-693-6400. Our team will be happy to assist you with any questions about our services."

@api_router.get("/chat/{session_id}", response_model=List[ChatMessage])
async def get_chat_history(session_id: str):
    messages = await db.chat_messages.find({"session_id": session_id}, {"_id": 0}).sort("created_at", 1).to_list(100)
    for m in messages:
        if isinstance(m.get('created_at'), str):
            m['created_at'] = datetime.fromisoformat(m['created_at'])
    return messages

# Services data endpoint
@api_router.get("/services")
async def get_services():
    return {
        "services": [
            {
                "id": "walk-in-clinic",
                "title": "Walk-in Clinic",
                "shortDescription": "Same day appointments available. Call ahead at 905-693-6400 to minimize wait times.",
                "description": "Our Walk-in Clinic provides accessible healthcare for patients who need prompt medical attention. Open Monday-Friday 9:00am-6:00pm and Saturday 10:00am-4:00pm. To minimize wait times, please call ahead at 905-693-6400.",
                "features": [
                    "No appointment necessary",
                    "Same day appointments",
                    "Call ahead: 905-693-6400",
                    "STD testing and treatment",
                    "Minor illness treatment",
                    "Prescription services"
                ],
                "icon": "clock"
            },
            {
                "id": "family-practice",
                "title": "Family Practice",
                "shortDescription": "Dr. Saima Qureshi is accepting new patients. Comprehensive care for all ages.",
                "description": "Our Family Practice provides continuous, comprehensive healthcare for individuals and families across all ages. Dr. Saima Qureshi is currently accepting new patients. We focus on building long-term relationships to better understand and manage your health needs.",
                "features": [
                    "Dr. Saima Qureshi accepting new patients",
                    "Annual health examinations",
                    "Chronic disease management",
                    "Preventive care & immunizations",
                    "Mental health & ADHD assessments",
                    "Women's health services"
                ],
                "icon": "users"
            },
            {
                "id": "travel-clinic",
                "title": "Travel Clinic",
                "shortDescription": "Registered Yellow Fever clinic with destination-specific vaccinations and travel health services.",
                "description": "Planning an international trip? Our Travel Clinic is a registered Yellow Fever vaccination centre providing comprehensive pre-travel health services. Book 4-6 weeks before travel for optimal vaccine effectiveness.",
                "features": [
                    "Registered Yellow Fever Clinic",
                    "Destination-specific vaccinations",
                    "Hepatitis A & B, Typhoid vaccines",
                    "Antimalarial prescriptions",
                    "Travel health certificates",
                    "CDC travel advisory guidance"
                ],
                "icon": "plane"
            },
            {
                "id": "aesthetic-clinic",
                "title": "Aesthetic Clinic",
                "shortDescription": "Botox, fillers, hyperhidrosis treatment, and natural non-surgical face lift.",
                "description": "Our Aesthetic Clinic combines medical expertise with cutting-edge treatments to help you look and feel your best. We offer non-invasive and minimally invasive procedures performed by trained professionals.",
                "features": [
                    "Botox for headaches & migraines",
                    "Hyperhidrosis (excessive sweating) treatment",
                    "Anti-aging & wrinkle treatments",
                    "Dermal fillers",
                    "Natural non-surgical face lift",
                    "Personalized skincare consultations"
                ],
                "icon": "sparkles"
            },
            {
                "id": "circumcision-clinic",
                "title": "Circumcision Clinic",
                "shortDescription": "Safe, professional circumcision services for newborns and infants.",
                "description": "Our Circumcision Clinic provides safe, professional circumcision services for newborns and infants in a comfortable, clinical setting. Our experienced medical team uses the latest techniques with a focus on minimizing discomfort and ensuring proper healing.",
                "features": [
                    "Services for newborns and infants",
                    "Local anesthesia for comfort",
                    "Experienced medical professionals",
                    "Post-procedure care instructions",
                    "Follow-up appointments included",
                    "No referral required"
                ],
                "icon": "baby"
            },
            {
                "id": "procedures",
                "title": "Procedures",
                "shortDescription": "Biopsies, joint injections, IUD insertion, blood work, ECG, and STD testing.",
                "description": "Milton Health Centre offers a comprehensive range of medical procedures performed by our experienced physicians. From diagnostic tests to minor surgical procedures, we provide convenient in-clinic services.",
                "features": [
                    "Lump, bump & mole biopsies",
                    "Joint injections",
                    "IUD insertion & contraception",
                    "Blood work & lab tests",
                    "ECG (electrocardiogram)",
                    "STD testing & treatment"
                ],
                "icon": "syringe"
            }
        ]
    }

# Doctors data endpoint
@api_router.get("/doctors")
async def get_doctors():
    return {
        "doctors": [
            {
                "id": "dr-saima-qureshi",
                "name": "Dr. Saima Qureshi",
                "title": "Family Physician & Medical Director",
                "bio": "Dr. Saima Qureshi is the founder and Medical Director of Milton Health Centre. She is currently accepting new patients and is dedicated to providing compassionate, patient-centered care to the Milton community.",
                "specialties": ["Family Practice", "Walk-in Clinic", "Women's Health", "Chronic Disease Management"],
                "education": "MD, CCFP",
                "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
                "acceptingPatients": True
            },
            {
                "id": "dr-shazia-latif",
                "name": "Dr. Shazia Latif",
                "title": "Family Physician",
                "bio": "Dr. Shazia Latif is a dedicated family physician at Milton Health Centre with extensive experience in comprehensive primary care. She provides compassionate, patient-centered care for families in the Milton community.",
                "specialties": ["Family Practice", "Walk-in Clinic", "Preventive Care", "Chronic Disease Management"],
                "education": "MD, CCFP, FCFP",
                "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
                "acceptingPatients": False
            },
            {
                "id": "dr-arieg-badawi",
                "name": "Dr. Arieg Badawi",
                "title": "Family Physician",
                "bio": "Dr. Arieg Badawi is a skilled family physician dedicated to delivering comprehensive medical care. She focuses on preventive health and treats patients of all ages at Milton Health Centre.",
                "specialties": ["Family Practice", "Walk-in Clinic", "Preventive Medicine", "Health Screenings"],
                "education": "MD, CCFP",
                "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
                "acceptingPatients": False
            },
            {
                "id": "dr-meena-hussain",
                "name": "Dr. Meena Hussain",
                "title": "Family Physician",
                "bio": "Dr. Meena Hussain brings expertise in family medicine to Milton Health Centre. She is committed to providing high-quality healthcare services and building lasting relationships with her patients.",
                "specialties": ["Family Practice", "Walk-in Clinic", "Women's Health", "Pediatric Care"],
                "education": "MD, CCFP",
                "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
                "acceptingPatients": False
            }
        ]
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
