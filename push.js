const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const universities = [
  {
    "name": "Stanford University",
    "slug": "stanford-university",
    "country": "United States",
    "city": "Stanford, CA",
    "ranking": 3,
    "tuitionMin": 65000,
    "tuitionMax": 66000,
    "acceptanceRate": 4.0,
    "studentCount": 18446,
    "description": "A leading research university known for innovation and excellence in engineering, business, and liberal arts.",
    "programs": ["Computer Science", "Engineering", "Business", "Medicine"],
    "applicationDeadline": "2025-01-02T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "Harvard University",
    "slug": "harvard-university",
    "country": "United States",
    "city": "Cambridge, MA",
    "ranking": 2,
    "tuitionMin": 50000,
    "tuitionMax": 55000,
    "acceptanceRate": 5.0,
    "studentCount": 21000,
    "description": "Harvard University is a private Ivy League research university known for its rigorous academics, influential alumni, and leading research programs across fields.",
    "programs": ["Law", "Medicine", "Business", "Engineering"],
    "applicationDeadline": "2025-01-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1621416897036-12360f7f9882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of Oxford",
    "slug": "university-of-oxford",
    "country": "United Kingdom",
    "city": "Oxford",
    "ranking": 1,
    "tuitionMin": 35000,
    "tuitionMax": 45000,
    "acceptanceRate": 16.0,
    "studentCount": 24000,
    "description": "The oldest university in the English-speaking world, renowned for its academic excellence and historic traditions.",
    "programs": ["Law", "Medicine", "Arts & Humanities", "Social Sciences"],
    "applicationDeadline": "2024-10-15T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of Cambridge",
    "slug": "university-of-cambridge",
    "country": "United Kingdom",
    "city": "Cambridge",
    "ranking": 4,
    "tuitionMin": 32000,
    "tuitionMax": 42000,
    "acceptanceRate": 20.0,
    "studentCount": 22000,
    "description": "A historic university recognized worldwide for outstanding research, teaching, and collegiate life.",
    "programs": ["Mathematics", "Engineering", "Medicine", "Law"],
    "applicationDeadline": "2024-10-15T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "Massachusetts Institute of Technology",
    "slug": "massachusetts-institute-of-technology",
    "country": "United States",
    "city": "Cambridge, MA",
    "ranking": 5,
    "tuitionMin": 53000,
    "tuitionMax": 58000,
    "acceptanceRate": 7.0,
    "studentCount": 11500,
    "description": "MIT is a private research university known for science, engineering, and technology programs and cutting-edge research.",
    "programs": ["Engineering", "Computer Science", "Physics", "Mathematics"],
    "applicationDeadline": "2025-01-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1526925539332-aa3b66e35444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of California, Berkeley",
    "slug": "university-of-california-berkeley",
    "country": "United States",
    "city": "Berkeley, CA",
    "ranking": 6,
    "tuitionMin": 45000,
    "tuitionMax": 50000,
    "acceptanceRate": 17.0,
    "studentCount": 42000,
    "description": "A public research university offering world-class programs in science, technology, and liberal arts.",
    "programs": ["Engineering", "Business", "Computer Science", "Biology"],
    "applicationDeadline": "2025-01-15T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1598488033066-960e3f85e7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "ETH Zurich",
    "slug": "eth-zurich",
    "country": "Switzerland",
    "city": "Zurich",
    "ranking": 7,
    "tuitionMin": 1500,
    "tuitionMax": 3000,
    "acceptanceRate": 27.0,
    "studentCount": 22000,
    "description": "ETH Zurich is a science, technology, engineering, and mathematics university recognized for excellence in research and innovation.",
    "programs": ["Engineering", "Physics", "Computer Science", "Mathematics"],
    "applicationDeadline": "2025-02-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1584696049838-8a4d691abf2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of Tokyo",
    "slug": "university-of-tokyo",
    "country": "Japan",
    "city": "Tokyo",
    "ranking": 8,
    "tuitionMin": 4000,
    "tuitionMax": 8000,
    "acceptanceRate": 30.0,
    "studentCount": 28000,
    "description": "Japan's premier university, excelling in research, international collaborations, and engineering programs.",
    "programs": ["Engineering", "Law", "Medicine", "Social Sciences"],
    "applicationDeadline": "2025-03-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1582571284437-9b49c412f4d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "National University of Singapore",
    "slug": "national-university-of-singapore",
    "country": "Singapore",
    "city": "Singapore",
    "ranking": 9,
    "tuitionMin": 17000,
    "tuitionMax": 35000,
    "acceptanceRate": 15.0,
    "studentCount": 38000,
    "description": "NUS is Singapore's flagship university, known for research excellence, innovation, and global engagement.",
    "programs": ["Engineering", "Business", "Computer Science", "Law"],
    "applicationDeadline": "2025-04-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1593941707882-a5bba53377fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of Melbourne",
    "slug": "university-of-melbourne",
    "country": "Australia",
    "city": "Melbourne",
    "ranking": 10,
    "tuitionMin": 25000,
    "tuitionMax": 40000,
    "acceptanceRate": 37.0,
    "studentCount": 50000,
    "description": "Australia's leading university offering top programs in research, medicine, law, and business.",
    "programs": ["Medicine", "Engineering", "Law", "Business"],
    "applicationDeadline": "2025-05-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1584696049838-8a4d691abf2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of Toronto",
    "slug": "university-of-toronto",
    "country": "Canada",
    "city": "Toronto",
    "ranking": 11,
    "tuitionMin": 20000,
    "tuitionMax": 45000,
    "acceptanceRate": 43.0,
    "studentCount": 60000,
    "description": "Canada's top-ranked university with strong programs in research, medicine, and engineering.",
    "programs": ["Engineering", "Medicine", "Law", "Business"],
    "applicationDeadline": "2025-06-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "Imperial College London",
    "slug": "imperial-college-london",
    "country": "United Kingdom",
    "city": "London",
    "ranking": 12,
    "tuitionMin": 30000,
    "tuitionMax": 45000,
    "acceptanceRate": 14.0,
    "studentCount": 19000,
    "description": "Imperial College London specializes in science, technology, medicine, and business education.",
    "programs": ["Engineering", "Medicine", "Business", "Computer Science"],
    "applicationDeadline": "2025-07-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1622556785981-2c0c5e0b0e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "Peking University",
    "slug": "peking-university",
    "country": "China",
    "city": "Beijing",
    "ranking": 13,
    "tuitionMin": 5000,
    "tuitionMax": 10000,
    "acceptanceRate": 25.0,
    "studentCount": 42000,
    "description": "China's leading university renowned for research excellence and strong international collaborations.",
    "programs": ["Engineering", "Law", "Business", "Social Sciences"],
    "applicationDeadline": "2025-08-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "Seoul National University",
    "slug": "seoul-national-university",
    "country": "South Korea",
    "city": "Seoul",
    "ranking": 14,
    "tuitionMin": 4000,
    "tuitionMax": 10000,
    "acceptanceRate": 30.0,
    "studentCount": 28000,
    "description": "South Korea's top university excelling in research, technology, and international programs.",
    "programs": ["Engineering", "Medicine", "Business", "Law"],
    "applicationDeadline": "2025-09-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1598488033066-960e3f85e7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "Australian National University",
    "slug": "australian-national-university",
    "country": "Australia",
    "city": "Canberra",
    "ranking": 15,
    "tuitionMin": 20000,
    "tuitionMax": 35000,
    "acceptanceRate": 38.0,
    "studentCount": 20000,
    "description": "ANU is a leading research university in Australia, known for social sciences, natural sciences, and engineering.",
    "programs": ["Engineering", "Law", "Business", "Arts"],
    "applicationDeadline": "2025-05-15T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1584696049838-8a4d691abf2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of Edinburgh",
    "slug": "university-of-edinburgh",
    "country": "United Kingdom",
    "city": "Edinburgh",
    "ranking": 16,
    "tuitionMin": 25000,
    "tuitionMax": 40000,
    "acceptanceRate": 42.0,
    "studentCount": 30000,
    "description": "Scotland's top university offering strong programs in arts, science, engineering, and medicine.",
    "programs": ["Medicine", "Engineering", "Arts", "Business"],
    "applicationDeadline": "2025-07-15T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of British Columbia",
    "slug": "university-of-british-columbia",
    "country": "Canada",
    "city": "Vancouver",
    "ranking": 17,
    "tuitionMin": 20000,
    "tuitionMax": 35000,
    "acceptanceRate": 45.0,
    "studentCount": 65000,
    "description": "UBC is a leading Canadian university with research excellence across science, arts, and engineering.",
    "programs": ["Engineering", "Business", "Medicine", "Arts"],
    "applicationDeadline": "2025-06-15T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of Hong Kong",
    "slug": "university-of-hong-kong",
    "country": "Hong Kong",
    "city": "Hong Kong",
    "ranking": 18,
    "tuitionMin": 15000,
    "tuitionMax": 30000,
    "acceptanceRate": 30.0,
    "studentCount": 30000,
    "description": "Hong Kong's premier university known for research, medicine, and business education.",
    "programs": ["Medicine", "Law", "Engineering", "Business"],
    "applicationDeadline": "2025-08-15T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1593941707882-a5bba53377fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of Sydney",
    "slug": "university-of-sydney",
    "country": "Australia",
    "city": "Sydney",
    "ranking": 19,
    "tuitionMin": 25000,
    "tuitionMax": 40000,
    "acceptanceRate": 37.0,
    "studentCount": 50000,
    "description": "Australia's first university, known for a strong tradition in research, arts, and sciences.",
    "programs": ["Medicine", "Engineering", "Law", "Business"],
    "applicationDeadline": "2025-07-01T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1584696049838-8a4d691abf2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  },
  {
    "name": "University of Cape Town",
    "slug": "university-of-cape-town",
    "country": "South Africa",
    "city": "Cape Town",
    "ranking": 20,
    "tuitionMin": 6000,
    "tuitionMax": 10000,
    "acceptanceRate": 35.0,
    "studentCount": 29000,
    "description": "South Africa's leading university known for research, medicine, and social sciences programs.",
    "programs": ["Medicine", "Engineering", "Law", "Business"],
    "applicationDeadline": "2025-06-15T00:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1582571284437-9b49c412f4d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  }
];

async function pushUniversities() {
  try {
    for (const uni of universities){
 await prisma.universities.upsert({
    where: { slug: uni.slug },
    update: { image: uni.image }, // 👈 updates if exists
    create: uni,
  });
    }
  
    console.log("✅ Universities pushed successfully!");
  } catch (err) {
    console.error("❌ Error inserting universities:", err);
  } finally {
    await prisma.$disconnect();
  }
}


pushUniversities();
