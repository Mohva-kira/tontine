import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

// import useFetch from "../../../hook/useFetch";
import { useGetPaymentQuery } from "../../../reducers/api/paymentApi";
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Nearbyjobs = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null)
  const {data, isLoading, refetch, isSuccess, isError} = useGetPaymentQuery()
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
      console.log('getData', jsonValue)
      if (jsonValue) {
        setCurrentUser(JSON.parse(jsonValue))
      }
      return jsonValue
    } catch (e) {
      // error reading value

      console.log('error', e)
    }
  }


  const myTransactions = data?.data.filter(tr => tr.attributes.user.data.id === currentUser?.user.id)

  useEffect(() => {
    getData()
  
   
  }, [data])

  useEffect(() => {
    refetch()
  
   
  }, [])
  
  // const data = {
  //   data: [
  //     {
  //       employer_name: "Data Wave Technologies Inc",
  //       employer_logo:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD7NbwOCgONDjoF8e8uAtOf_YhdTruAFzHs81B&s=0",
  //       employer_website: null,
  //       employer_company_type: null,
  //       job_publisher: "Dice",
  //       job_id: "neexBYE-WO0AAAAAAAAAAA==",
  //       job_employment_type: "FULLTIME",
  //       job_title:
  //         "Job Title: Python Developer Location: Houston, TX Hybrid Duration: Long term",
  //       job_apply_link:
  //         "https://www.dice.com/job-detail/d70778fa-dc57-4068-aa40-0fbd9ede5e92",
  //       job_description:
  //         "Job Title: Python Developer\nLocation: Houston, TX Hybrid\nDuration: Long term Job Description: The person should be an independent and mature with minimal need for hand holding.\nIdeally, the candidate will have 6+ years of experience in Python, Python Pandas and Django. Experience: 8-10 Years +\nknowledgeable with center Python web frameworks, Object social mappers.\nShould be hands on, there would be coding test.\nshould have an understanding of the multi-process design and RESTful API's to coordinate applications with other components.\nComposing Python scripts and framework organization\nUnderstanding and experience in AWS Migration is highly preferred",
  //       job_is_remote: false,
  //       job_posted_at_timestamp: 1679523321,
  //       job_posted_at_datetime_utc: "2023-03-22T22:15:21.000Z",
  //       job_city: "Houston",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 29.760427,
  //       job_longitude: -95.369804,
  //       job_benefits: null,
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=neexBYE-WO0AAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-04-22T22:15:21.000Z",
  //       job_offer_expiration_timestamp: 1682201721,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: 72,
  //         experience_mentioned: true,
  //         experience_preferred: true,
  //       },
  //       job_required_skills: ["Python Developer"],
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: false,
  //         degree_mentioned: false,
  //         degree_preferred: false,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: null,
  //       job_max_salary: null,
  //       job_salary_currency: null,
  //       job_salary_period: null,
  //       job_highlights: {
  //         Qualifications: [
  //           "Duration: Long term Job Description: The person should be an independent and mature with minimal need for hand holding",
  //           "Ideally, the candidate will have 6+ years of experience in Python, Python Pandas and Django",
  //           "Experience: 8-10 Years +",
  //           "knowledgeable with center Python web frameworks, Object social mappers",
  //           "Should be hands on, there would be coding test",
  //           "Composing Python scripts and framework organization",
  //         ],
  //       },
  //       job_job_title: null,
  //     },
  //     {
  //       employer_name: "Nabors Corporate Services Inc",
  //       employer_logo:
  //         "https://www.sec.gov/Archives/edgar/data/1163739/000114036120007483/logo_naborsindustries.jpg",
  //       employer_website: null,
  //       employer_company_type: null,
  //       job_publisher: "Dice",
  //       job_id: "DRUsW7WnO2oAAAAAAAAAAA==",
  //       job_employment_type: "FULLTIME",
  //       job_title: "Python Developer",
  //       job_apply_link:
  //         "https://www.dice.com/job-detail/9ee50ca2-54de-4b9c-abc8-5d65600b46cd",
  //       job_description:
  //         "Company Overview\n\nNabors is a leading provider of advanced technology for the energy industry. With operations in about 20 countries, Nabors has established a global network of people, technology and equipment to deploy solutions that deliver safe, efficient and responsible hydrocarbon production. By leveraging its core competencies, particularly in drilling, engineering, automation, data science and manufacturing, Nabors aims to innovate the future of energy and enable the transition to a lower carbon world.\n\nNabors is committed to providing equal employment opportunities to all employees and applicants and prohibiting discrimination and harassment of any type without regard to race, religion, age, color, sex, national origin, disability status, genetics, protected veteran status, sexual orientation, gender identity or expression, or any other characteristic protected by federal, state or local laws. This applies to all terms and conditions of employment including recruiting, hiring, placement, promotion, termination, layoff, recall, transfer, leaves of absence, compensation, and training. To learn more about our Fair Employment practices, please refer to the Nabors Code of Conduct.\n\nJOB SUMMARY\n\nNabors is seeking a Python Developer for the controls and automation team platform team. The developer is responsible for delivering fast and reliable software. The position is based in Houston, TX.\n\nDUTIES AND RESPONSIBILITIES\n• Develop applications (programming, coding)\n• Develop APIs\n• Document code and perform unit testing of software\n• Participate in code review\n• Maintain release notes on all software versions\n• Lab testing of all software with the rig simulator\n• Provide technical support to field technicians and trainers\n• Follows procedures and safety guidelines\n\nMINIMUM QUALIFICATIONS/SKILLS\n• Minimum experience of 3 years\n• Bachelors degree in computer science, computer engineering or related field\n• Expert in Python with knowledge of at least one Python web framework (Django, Flask, Fastpi)\n• Familiar with ORM like SQLAlchemy\n• Familiar with Databases like PostgreSQL\n• Strong understanding of API\n• Familiar with web server setups & configuration\n• Proficient in writing bash scripts\n• Proficient in Linux\n• Basic understanding ROS (robotic operating system)\n• Basic understanding of pub/sub protocols like MQTT\n• Strong understanding of code versioning tools like Git\n• Critical thinking and problem-solving things\n• Great interpersonal and communication skills\n\nPREFERRED QUALIFICATIONS\n• Experience in Oil & Gas Drilling is preferred\n\nPHYSICAL REQUIREMENTS / WORKING CONDITIONS\n• The primary location for this position is an office environment with a hybrid work flexibility\n• Able to lift to 20 lbs.\n• Rig yard trips may be expected from time to time.\n• 20% travel to rig yards and field.",
  //       job_is_remote: false,
  //       job_posted_at_timestamp: 1651622468,
  //       job_posted_at_datetime_utc: "2022-05-04T00:01:08.000Z",
  //       job_city: "Houston",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 29.760427,
  //       job_longitude: -95.369804,
  //       job_benefits: null,
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=DRUsW7WnO2oAAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-04-22T08:00:42.000Z",
  //       job_offer_expiration_timestamp: 1682150442,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: 36,
  //         experience_mentioned: true,
  //         experience_preferred: true,
  //       },
  //       job_required_skills: [
  //         "MINIMUM QUALIFICATIONS/SKILLS * Minimum experience of 3 years * Bachelors degree in computer science",
  //         "computer engineering or related field * Expert in Python with knowledge of at least one Pyth",
  //       ],
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: false,
  //         degree_mentioned: true,
  //         degree_preferred: true,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: null,
  //       job_max_salary: null,
  //       job_salary_currency: null,
  //       job_salary_period: null,
  //       job_highlights: {
  //         Qualifications: [
  //           "Minimum experience of 3 years",
  //           "Bachelors degree in computer science, computer engineering or related field",
  //           "Expert in Python with knowledge of at least one Python web framework (Django, Flask, Fastpi)",
  //           "Familiar with ORM like SQLAlchemy",
  //           "Familiar with Databases like PostgreSQL",
  //           "Strong understanding of API",
  //           "Familiar with web server setups & configuration",
  //           "Proficient in writing bash scripts",
  //           "Proficient in Linux",
  //           "Basic understanding ROS (robotic operating system)",
  //           "Basic understanding of pub/sub protocols like MQTT",
  //           "Strong understanding of code versioning tools like Git",
  //           "Critical thinking and problem-solving things",
  //           "Great interpersonal and communication skills",
  //           "Able to lift to 20 lbs",
  //           "Rig yard trips may be expected from time to time",
  //         ],
  //         Responsibilities: [
  //           "The developer is responsible for delivering fast and reliable software",
  //           "Develop applications (programming, coding)",
  //           "Develop APIs",
  //           "Document code and perform unit testing of software",
  //           "Participate in code review",
  //           "Maintain release notes on all software versions",
  //           "Lab testing of all software with the rig simulator",
  //           "Provide technical support to field technicians and trainers",
  //           "Follows procedures and safety guidelines",
  //           "20% travel to rig yards and field",
  //         ],
  //       },
  //       job_job_title: null,
  //     },
  //     {
  //       employer_name: "IntagHire",
  //       employer_logo:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0R2ziPsRSOwJz7G0lYy2hWTwyyzn8zeBvs91M&s=0",
  //       employer_website: null,
  //       employer_company_type: null,
  //       job_publisher: "LinkedIn",
  //       job_id: "464B4ZszsCEAAAAAAAAAAA==",
  //       job_employment_type: "FULLTIME",
  //       job_title: "Python Developer - Onsite in Houston, TX",
  //       job_apply_link:
  //         "https://www.linkedin.com/jobs/view/python-developer-onsite-in-houston-tx-at-intaghire-3525713539",
  //       job_description:
  //         "Python/SQL Software Developer - Permanent position located in Houston, TX.\n• *Must be a U.S. Citizen, or permanent resident (green card holder), no sponsorship provided. No C2C please**\n\nOur client is hiring for a Python Software Developer, ranging from mid to senior level (6+ years), to work on current and future software development projects. This is a direct-hire (perm with full benefits) position with Intag's client.\n\nThe Python Software Developer may end up working on various projects over time, involving potentially different and evolving sets of technologies as needed for modern business applications and systems. Permanent on-site work in Houston, TX.\n\nThe candidate will have strong development skills in the following:\n• Python fundamentals, REST protocol, Flask and FastAPI frameworks\n• Knowledge of microservices architecture, system design, SQL and NoSQL databases\n• Knowledge of CI/CD workflow (Github Actions, Jenkins)\n• Knowledge of Elastic and Observability stack (Elasticsearch, Kibana, APM) preferred\n• Containerization architecture knowledge preferred (Docker, Kubernetes)\n• Basic knowledge of cloud architecture (Azure, GCP preferred)\n• Oil and gas industry knowledge is a plus but not required\n\nOther Requirements\n• Must be a U.S. Citizen, or permanent resident (green card holder), no sponsorship provided\n• Job Type: Full-time with benefits\n\nTags: Python, SQL, NoSQL, AWS, Django, Flask, Python Developer, Senior Python Developer",
  //       job_is_remote: false,
  //       job_posted_at_timestamp: 1679509919,
  //       job_posted_at_datetime_utc: "2023-03-22T18:31:59.000Z",
  //       job_city: "Houston",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 29.760427,
  //       job_longitude: -95.369804,
  //       job_benefits: null,
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=464B4ZszsCEAAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-05-16T16:09:03.000Z",
  //       job_offer_expiration_timestamp: 1684253343,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: null,
  //         experience_mentioned: false,
  //         experience_preferred: false,
  //       },
  //       job_required_skills: null,
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: true,
  //         degree_mentioned: false,
  //         degree_preferred: false,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: null,
  //       job_max_salary: null,
  //       job_salary_currency: null,
  //       job_salary_period: null,
  //       job_highlights: {
  //         Qualifications: [
  //           "*Must be a U.S. Citizen, or permanent resident (green card holder), no sponsorship provided",
  //           "Python fundamentals, REST protocol, Flask and FastAPI frameworks",
  //           "Knowledge of microservices architecture, system design, SQL and NoSQL databases",
  //           "Knowledge of CI/CD workflow (Github Actions, Jenkins)",
  //           "Job Type: Full-time with benefits",
  //         ],
  //       },
  //       job_job_title: null,
  //     },
  //     {
  //       employer_name: "Net2Source Inc.",
  //       employer_logo:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQorO4gtnesXeelxJYfOyyrhgnbrD0WO8oGQITo&s=0",
  //       employer_website: null,
  //       employer_company_type: null,
  //       job_publisher: "LinkedIn",
  //       job_id: "2itITIduN78AAAAAAAAAAA==",
  //       job_employment_type: "CONTRACTOR",
  //       job_title: "Python Developer",
  //       job_apply_link:
  //         "https://www.linkedin.com/jobs/view/python-developer-at-net2source-inc-3429969682",
  //       job_description:
  //         "Net 2 Source Inc. is an award-winning total workforce solutions company recognized by Staffing Industry Analysts for our accelerated growth of 300% in the last 3 years with over 5500+ employees globally, with over 30+ locations in the US and global operations in 32 countries. We believe in providing staffing solutions to address the current talent gap Right Talent Right Time Right Place Right Price and acting as a Career Coach to our consultants.\n\nJob Title: Python Developer\nLocation: Plano, TX\nDuration: Contract\nRate: $60- $65/hr\n\nRequired Skills: Python, Autosys Jobs, Java\n\nMigrate existing jobs from Python/Bob/Athena to Java/Autosys\nSupport strategic projects (datacenter migration, etc.) as needed\n\nWhy work with us - At Net2Source, we believe everyone has an opportunity to lead. We see the importance of your perspective and your ability to create value. We want you to fit inwith an inclusive culture, focus on work-life fit and well-being, and a supportive, connected environment; but we also want you to stand outwith opportunities to have a strategic impact, innovate, and take necessary steps to make your mark. We help clients with new skilling, talent strategy, leadership development, employee experience, transformational change management, and beyond.\n\nEqual Employment Opportunity Statement:\nNet2Source is an Equal Opportunity Employer. We believe that no one should be discriminated against because of their differences, such as age, disability, ethnicity, gender, gender identity and expression, religion, or sexual orientation. Our rich diversity makes us more innovative, more competitive, and more creative, which helps us better serve our clients and our communities. All employment decisions shall be made without regard to age, race, creed, color, religion, sex, national origin, ancestry, disability status, veteran status, sexual orientation, gender identity or expression, genetic information, marital status, citizenship status, or any other basis as protected by federal, state, or local law.\n\nAwards and Accolades:\n• America's Most Honored Businesses (Top 10%)\n• Awarded by USPAAC for Fastest Growing Business in the US\n• 12th Fastest-Growing Staffing Company in the USA by Staffing Industry Analysts in the US (2020, 2019, 2020)\n• Fastest 50 by NJ Biz (2020, 2019, 2020)\n• INC 5000 Fastest growing for 8 consecutive years in a row (only 1.26% of companies make it to this list).\n• Top 100 by Dallas Business Journal (2020 and 2019)\n• Proven Supplier of the Year by Workforce Logiq (2020 and 2019)\n• 2019 Spirit of Alliance Award by Agile1\n• 2018 Best of the Best Platinum Award by Agile1\n• 2018 TechServe Alliance Excellence Awards Winner\n• 2017 Best of the Best Gold Award by Agile1(Act1 Group)\n\nThanks & Regards,\n\nBalamurugan P\nTeam Lead US Staffing\nNet 2 Source Inc.\nGlobal HQ Address 7250 Dallas Pkwy, Suite 825 Plano, Texas 75024\nDirect: (201) 620-3193 | Fax: (201) 221-8131 | Email: bala@net2source.com\nWeb: www.net2source.com | Social: Facebook | Twitter | LinkedIn",
  //       job_is_remote: false,
  //       job_posted_at_timestamp: 1673463295,
  //       job_posted_at_datetime_utc: "2023-01-11T18:54:55.000Z",
  //       job_city: "Plano",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 33.019844,
  //       job_longitude: -96.69888,
  //       job_benefits: null,
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=2itITIduN78AAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-07-10T19:16:54.000Z",
  //       job_offer_expiration_timestamp: 1689016614,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: null,
  //         experience_mentioned: true,
  //         experience_preferred: false,
  //       },
  //       job_required_skills: null,
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: true,
  //         degree_mentioned: false,
  //         degree_preferred: false,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: null,
  //       job_max_salary: null,
  //       job_salary_currency: null,
  //       job_salary_period: null,
  //       job_highlights: {
  //         Qualifications: ["Required Skills: Python, Autosys Jobs, Java"],
  //         Responsibilities: [
  //           "Support strategic projects (datacenter migration, etc.)",
  //         ],
  //         Benefits: ["Rate: $60- $65/hr"],
  //       },
  //       job_job_title: null,
  //     },
  //     {
  //       employer_name: "TensorIoT",
  //       employer_logo: null,
  //       employer_website: null,
  //       employer_company_type: null,
  //       job_publisher: "ZipRecruiter",
  //       job_id: "Uf-i8SLunFMAAAAAAAAAAA==",
  //       job_employment_type: "FULLTIME",
  //       job_title: "Contract Python Developer - Remote",
  //       job_apply_link:
  //         "https://www.ziprecruiter.com/c/TensorIoT/Job/Contract-Python-Developer-Remote/-in-Austin,TX?jid=f63df8ce15aafb09",
  //       job_description:
  //         "Accepting remote candidates in the following states: Arizona, California, Colorado, Delaware, Florida, Minnesota, North Carolina, Nevada, New York, Texas, Virginia, Washington, and Wisconsin.\n\nTensorIoT is seeking a Contract Python Developer to work on our projects. Contract length is 3-6 months with opportunity to extend and convert to full-time with exceptional performance.\n\nLeveraging the AWS (Amazon Web Services) platform we work to build new and unique solutions in the smart devices vertical across many different industry sectors. We're looking for tech-savvy enthusiasts with a passion for IoT (Internet of Things) and or ML/AI (Machine Learning/Artificial Intelligence). Apply today and join our team!\n\nResponsibilities:\n• Analyze user needs and develop software solutions\n• Work with project manager or product owner to meet specification needs\n• Recommend software upgrades to optimize operational efficiency\n• Collaborate with other developers to design and optimize code\n• Create flowcharts and user guides for new and existing programs\n• Document all programming tasks and procedures\n• Perform routine software maintenance\n• Collaborate with external clients and internal team members to meet product deadlines\n\nQualifications:\n• BS in Computer Science, Engineering or Related Fields\n• 3+ years of previous experience in software development, computer engineering, or other related fields\n• Strong experience with Python, Node.JS, TypeScript, AWS, and GraphQL\n• Familiarity and comfort with REST APIs\n\nPreferred (Not Required):\n• IoT/ML/AI/VR Experience\n• Experience with BlackDuck, Sonar, CircleCl, Zephyr\n\nCompany DescriptionTensorIoT's founders helped build world-class IoT and AI platforms at AWS, and Google and are now creating solutions to simplify the way enterprises incorporate edge devices and their data into their day to day operations. Our mission is to help connect devices and make them smarter. Our founders firmly believe in the transformative potential of smarter devices to enhance our quality of life and we're just getting started! Connect with us today to learn more!",
  //       job_is_remote: true,
  //       job_posted_at_timestamp: 1679525685,
  //       job_posted_at_datetime_utc: "2023-03-22T22:54:45.000Z",
  //       job_city: "Austin",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 30.267153,
  //       job_longitude: -97.74306,
  //       job_benefits: null,
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=Uf-i8SLunFMAAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-04-21T00:00:00.000Z",
  //       job_offer_expiration_timestamp: 1682035200,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: 36,
  //         experience_mentioned: true,
  //         experience_preferred: false,
  //       },
  //       job_required_skills: null,
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: false,
  //         degree_mentioned: true,
  //         degree_preferred: true,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: 45,
  //       job_max_salary: 55,
  //       job_salary_currency: "USD",
  //       job_salary_period: "HOUR",
  //       job_highlights: {
  //         Qualifications: [
  //           "BS in Computer Science, Engineering or Related Fields",
  //           "3+ years of previous experience in software development, computer engineering, or other related fields",
  //           "Strong experience with Python, Node.JS, TypeScript, AWS, and GraphQL",
  //           "Familiarity and comfort with REST APIs",
  //         ],
  //         Responsibilities: [
  //           "Analyze user needs and develop software solutions",
  //           "Work with project manager or product owner to meet specification needs",
  //           "Recommend software upgrades to optimize operational efficiency",
  //           "Collaborate with other developers to design and optimize code",
  //           "Create flowcharts and user guides for new and existing programs",
  //           "Document all programming tasks and procedures",
  //           "Perform routine software maintenance",
  //           "Collaborate with external clients and internal team members to meet product deadlines",
  //         ],
  //       },
  //       job_job_title: null,
  //     },
  //     {
  //       employer_name: "Insight Global",
  //       employer_logo:
  //         "https://images.squarespace-cdn.com/content/5f7f984c3ca20d1d55b276f7/1619793549819-L54X3W9Z5RD277UPNH9S/IGLogoPublic.png?content-type=image%2Fpng",
  //       employer_website: "http://www.insightglobal.com",
  //       employer_company_type: "Staffing",
  //       job_publisher: "LinkedIn",
  //       job_id: "MCrmbnNwISMAAAAAAAAAAA==",
  //       job_employment_type: "FULLTIME",
  //       job_title: "Python Developer",
  //       job_apply_link:
  //         "https://www.linkedin.com/jobs/view/python-developer-at-insight-global-3531098797",
  //       job_description:
  //         "Day-to-Day\n\nThe software developer will be responsible for strategizing ideas for beneficial software, coordinating with individual project Managers/Coordinators and collaborate with other developers to design the software tools needed. The individual will be tasked with developing, assisting, and refining software programs or systems that align with the client's needs by creating code libraries, reviewing design elements to ensure that the client's deadlines are met.\n\nMust Have:\n• 4+ years of experience in Python Development\n• Bachelor's Degree in computer science or related field\n• Experience in Python and SQL( Postgres/PostGIS)\n• Understanding of APIs and REST services",
  //       job_is_remote: false,
  //       job_posted_at_timestamp: 1679414268,
  //       job_posted_at_datetime_utc: "2023-03-21T15:57:48.000Z",
  //       job_city: "Tyler",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 32.35126,
  //       job_longitude: -95.30106,
  //       job_benefits: null,
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=MCrmbnNwISMAAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-04-20T15:57:48.000Z",
  //       job_offer_expiration_timestamp: 1682006268,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: 48,
  //         experience_mentioned: true,
  //         experience_preferred: false,
  //       },
  //       job_required_skills: null,
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: true,
  //         degree_mentioned: true,
  //         degree_preferred: true,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: 65000,
  //       job_max_salary: 85000,
  //       job_salary_currency: "USD",
  //       job_salary_period: "YEAR",
  //       job_highlights: {
  //         Qualifications: [
  //           "4+ years of experience in Python Development",
  //           "Bachelor's Degree in computer science or related field",
  //           "Experience in Python and SQL( Postgres/PostGIS)",
  //           "Understanding of APIs and REST services",
  //         ],
  //         Responsibilities: [
  //           "The software developer will be responsible for strategizing ideas for beneficial software, coordinating with individual project Managers/Coordinators and collaborate with other developers to design the software tools needed",
  //           "The individual will be tasked with developing, assisting, and refining software programs or systems that align with the client's needs by creating code libraries, reviewing design elements to ensure that the client's deadlines are met",
  //         ],
  //       },
  //       job_job_title: null,
  //     },
  //     {
  //       employer_name: "Talent Group",
  //       employer_logo:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRK45P-8ndJb_JYX9FL79Ht8eyfOk_Xc3ZLIqj&s=0",
  //       employer_website: null,
  //       employer_company_type: null,
  //       job_publisher: "Glassdoor",
  //       job_id: "RGa0uM-wv_gAAAAAAAAAAA==",
  //       job_employment_type: "FULLTIME",
  //       job_title: "Python Developer",
  //       job_apply_link:
  //         "https://www.glassdoor.com/job-listing/python-developer-talent-group-JV_IC1139761_KO0,16_KE17,29.htm?jl=1008543770612",
  //       job_description:
  //         "• Backend Python Design & Development having one of the Python backend framework experience\n• Good knowledge of SQL, nice to have MySQL Experience\n• Experienced either in AWS or GCP\n• Nice to have front end AngularJS or reactJS experience\n\nJob Type: Full-time\n\nSalary: Up to $120,000.00 per year\n\nBenefits:\n• 401(k) matching\n\nSchedule:\n• 8 hour shift\n\nWork Location: One location",
  //       job_is_remote: false,
  //       job_posted_at_timestamp: 1679443200,
  //       job_posted_at_datetime_utc: "2023-03-22T00:00:00.000Z",
  //       job_city: "Austin",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 30.267153,
  //       job_longitude: -97.74306,
  //       job_benefits: ["retirement_savings"],
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=RGa0uM-wv_gAAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-04-22T00:00:00.000Z",
  //       job_offer_expiration_timestamp: 1682121600,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: null,
  //         experience_mentioned: true,
  //         experience_preferred: false,
  //       },
  //       job_required_skills: null,
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: false,
  //         degree_mentioned: false,
  //         degree_preferred: false,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: 120000,
  //       job_max_salary: 120000,
  //       job_salary_currency: "USD",
  //       job_salary_period: "YEAR",
  //       job_highlights: {
  //         Qualifications: [
  //           "Good knowledge of SQL, nice to have MySQL Experience",
  //           "Experienced either in AWS or GCP",
  //           "Nice to have front end AngularJS or reactJS experience",
  //         ],
  //         Benefits: [
  //           "Salary: Up to $120,000.00 per year",
  //           "401(k) matching",
  //           "8 hour shift",
  //         ],
  //       },
  //       job_job_title: null,
  //     },
  //     {
  //       employer_name: "Fintech Inc",
  //       employer_logo: null,
  //       employer_website: "http://www.fin-techinc.com",
  //       employer_company_type: null,
  //       job_publisher: "Learn4Good.com",
  //       job_id: "vE9Sl8CmE80AAAAAAAAAAA==",
  //       job_employment_type: "FULLTIME",
  //       job_title: "Python Developer",
  //       job_apply_link:
  //         "https://www.learn4good.com/jobs/houston/texas/software_development/2197714406/e/",
  //       job_description:
  //         "Job Title:\n\nPython Developer\n\nLocation:\n\nHouston, TX Onsite From Day one\n\nHire Type:\nContract\n\nResponsibilities Design, develop, test, deploy, and maintain our software on different hardware platforms Consider the customer in every decision we make to deliver a world-class product Take personal responsibility for the quality and maintainability of the product and actively identifies areas for improvement Implement Python focused tooling (scripts, APIs) for both developers and product Ready to ask questions and dive headfirst into supporting and improving a complex technical stack\n\nQualifications Required\n\nBS or MS in Computer Science/Engineering (or equivalent experience) 8 to 9+ years of professional experience in software design and delivery\n\nExperience with a modern programming language (Python, Golang, JavaScript, etc) Unix/Linux proficiency Strong knowledge of container platforms\n\nExperience with software debugging, testing, and documentation.",
  //       job_is_remote: false,
  //       job_posted_at_timestamp: 1679356800,
  //       job_posted_at_datetime_utc: "2023-03-21T00:00:00.000Z",
  //       job_city: "Houston",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 29.760427,
  //       job_longitude: -95.369804,
  //       job_benefits: null,
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=vE9Sl8CmE80AAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-09-20T00:00:00.000Z",
  //       job_offer_expiration_timestamp: 1695168000,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: 96,
  //         experience_mentioned: true,
  //         experience_preferred: false,
  //       },
  //       job_required_skills: null,
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: false,
  //         degree_mentioned: true,
  //         degree_preferred: true,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: null,
  //       job_max_salary: null,
  //       job_salary_currency: null,
  //       job_salary_period: null,
  //       job_highlights: {
  //         Qualifications: [
  //           "BS or MS in Computer Science/Engineering (or equivalent experience) 8 to 9+ years of professional experience in software design and delivery",
  //           "Experience with a modern programming language (Python, Golang, JavaScript, etc) Unix/Linux proficiency Strong knowledge of container platforms",
  //           "Experience with software debugging, testing, and documentation",
  //         ],
  //         Responsibilities: [
  //           "Responsibilities Design, develop, test, deploy, and maintain our software on different hardware platforms Consider the customer in every decision we make to deliver a world-class product Take personal responsibility for the quality and maintainability of the product and actively identifies areas for improvement Implement Python focused tooling (scripts, APIs) for both developers and product Ready to ask questions and dive headfirst into supporting and improving a complex technical stack",
  //         ],
  //       },
  //       job_job_title: null,
  //     },
  //     {
  //       employer_name: "Modis",
  //       employer_logo:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP9g6T37mFhPvHCB_0lE1Cre0hrkwzxOE6E-Yw&s=0",
  //       employer_website: null,
  //       employer_company_type: null,
  //       job_publisher: "LinkedIn",
  //       job_id: "aVc8zLa5VW0AAAAAAAAAAA==",
  //       job_employment_type: "CONTRACTOR",
  //       job_title: "Python Software Engineer",
  //       job_apply_link:
  //         "https://www.linkedin.com/jobs/view/python-software-engineer-at-modis-3531713384",
  //       job_description:
  //         "Akkodis is seeking a Python Software Engineer in Dallas, TX. This person will be responsible for integrating data sources into internal data services. Example include pulling network configuration data and converting into OpenConfig format, working with partners to sync IPAMs / SoTs, and pushing metadata into ServiceNow. Work will be accomplished using Python3 and a modified Apache Airflow.\n\nPay/Salary Range: $64-72/hr\n\nThis position will be based in Dallas, TX.\n\nQualifications:\n• 5 years of professional Python3 experience\n\nAdditional Optional Preferred Qualifications:\n• 3 years of experience working with ETL Tools, Apache Airflow preferred\n• Deep understanding of Antlr4\n• GoLang experience\n\nIf you are interested in this Python Software Engineer role in Dallas, TX then please click APPLY NOW. For other opportunities available at Akkodis go to www.akkodis.com. If you have questions about the position, please contact Jessica Houdek at Jessica.houdek@akkodisgroup.com\n\nEqual Opportunity Employer/Veterans/Disabled\n\nBenefit offerings include medical, dental, vision, term life insurance, short-term disability insurance, additional voluntary benefits, commuter benefits and 401K plan. Our program provides employees the flexibility to choose the type of coverage that meets their individual needs. Available paid leave may include Paid Sick Leave, where required by law; any other paid leave required by Federal, State or local law; and Holiday pay upon meeting eligibility criteria. Disclaimer: These benefit offerings do not apply to client-recruited jobs and jobs which are direct hire to a client\n\nTo read our Candidate Privacy Information Statement, which explains how we will use your information, please visit https://www.modis.com/en-us/candidate-privacy/\n\nThe Company will consider qualified applicants with arrest and conviction records.",
  //       job_is_remote: false,
  //       job_posted_at_timestamp: 1679417911,
  //       job_posted_at_datetime_utc: "2023-03-21T16:58:31.000Z",
  //       job_city: "Dallas",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 32.776665,
  //       job_longitude: -96.79699,
  //       job_benefits: [
  //         "retirement_savings",
  //         "paid_time_off",
  //         "dental_coverage",
  //         "health_insurance",
  //       ],
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=aVc8zLa5VW0AAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-04-20T16:58:29.000Z",
  //       job_offer_expiration_timestamp: 1682009909,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: 60,
  //         experience_mentioned: true,
  //         experience_preferred: true,
  //       },
  //       job_required_skills: null,
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: true,
  //         degree_mentioned: false,
  //         degree_preferred: false,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: 64,
  //       job_max_salary: 72,
  //       job_salary_currency: "USD",
  //       job_salary_period: "HOUR",
  //       job_highlights: {
  //         Qualifications: ["5 years of professional Python3 experience"],
  //         Responsibilities: [
  //           "This person will be responsible for integrating data sources into internal data services",
  //           "Example include pulling network configuration data and converting into OpenConfig format, working with partners to sync IPAMs / SoTs, and pushing metadata into ServiceNow",
  //           "Work will be accomplished using Python3 and a modified Apache Airflow",
  //         ],
  //         Benefits: [
  //           "Pay/Salary Range: $64-72/hr",
  //           "Benefit offerings include medical, dental, vision, term life insurance, short-term disability insurance, additional voluntary benefits, commuter benefits and 401K plan",
  //           "Our program provides employees the flexibility to choose the type of coverage that meets their individual needs",
  //         ],
  //       },
  //       job_job_title: "Software engineer",
  //     },
  //     {
  //       employer_name: "CONTINUUM SOLUTIONS INC",
  //       employer_logo: null,
  //       employer_website: null,
  //       employer_company_type: null,
  //       job_publisher: "Learn4Good",
  //       job_id: "KTEFmaq9pp8AAAAAAAAAAA==",
  //       job_employment_type: "FULLTIME",
  //       job_title: "Python Developer",
  //       job_apply_link:
  //         "https://www.learn4good.com/jobs/houston/texas/software_development/2203616940/e/",
  //       job_description:
  //         "PYTHON DEVELOPER\n\n‍\n• * Please note this is an in-person position located in Houston (near Rice Village).*\n• About The Job:\n\nWe are seeking a Full Stack Python Developer to join our fast-growing, Houston-based engineering team. The candidate will be responsible for the technical design, development, and deployment of our accounting and finance related SaaS products. They will be joining a small and rapidly growing early-stage startup, where they will have a direct impact on the end-user product and future direction of the technology stack.\n\nWe are looking for a highly motivated, highly collaborative self-starter who will own and drive the building of software products on an agile development team. This is a great opportunity to join a rapidly growing, early-stage startup on the ground floor.\n\nYou Will:\n\n• Be responsible for the technical design, development, and deployment of our end-user products and in-house administrative site\n\n• Participate in sprint planning and estimation\n\n• Collaborate with stakeholders on requirements definition, feature design, & development\n\n• Contribute to the design and development of new products and services\n\n• Maintain a high level of quality for software delivery\n\n• Support products and services in a production environment\n\n‍Who We Are Looking For:\n\n• Undergraduate degree, preferably in Computer Science or related field\n\n• 5+ years of working experience building web applications using Django, Python, HTML, CSS, and JavaScript libraries such as Query and React\n\n• Working experience deploying and supporting software solutions in a distributed Linux-based production environment\n\n• Working experience with relational databases, document databases, and cache stores\n\n• Knowledgeable on best practices for the full software development life cycle, coding standards, code reviews, source control management with git and Git Hub, build processes, CI/CD, testing, and ongoing operations\n\n• Working experience with cloud-computing platforms such as Google Cloud Platform (GCP) and Amazon Web Services (AWS)\n\n• Desire to automate everything\n\n• Excellent verbal & written communication skills\n\n• Independent and self-driven\n\n• Creative problem solver\n\n• Knowledge of accounting and financial operations a major plus\n\nHighly Desired\n\nQualifications & Skills:\n\n• Willingness to work in our Houston office, or in a hybrid capacity\n\n• Experience with Python\n\n‍Compensation &\n\nBenefits:\n\n• Competitive Salary\n\n• As a ground-floor member of the team, employees are eligible for equity in the form of a generous stock options package\n\n• We offer flexible time off so that our employees can perform their best\n\n• Medical / Dental / Vision & Supplemental Insurance Coverage\n• ○ Full premium paid, full HSA employer contribution if opting to go with the high-deductible plan.\n• ○ Low deductible and out of pocket plan fully paid if opting to not go with the high-deductible plan.",
  //       job_is_remote: false,
  //       job_posted_at_timestamp: 1679529600,
  //       job_posted_at_datetime_utc: "2023-03-23T00:00:00.000Z",
  //       job_city: "Houston",
  //       job_state: "TX",
  //       job_country: "US",
  //       job_latitude: 29.760427,
  //       job_longitude: -95.369804,
  //       job_benefits: [
  //         "retirement_savings",
  //         "health_insurance",
  //         "dental_coverage",
  //       ],
  //       job_google_link:
  //         "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=KTEFmaq9pp8AAAAAAAAAAA%3D%3D",
  //       job_offer_expiration_datetime_utc: "2023-09-22T00:00:00.000Z",
  //       job_offer_expiration_timestamp: 1695340800,
  //       job_required_experience: {
  //         no_experience_required: false,
  //         required_experience_in_months: 60,
  //         experience_mentioned: true,
  //         experience_preferred: false,
  //       },
  //       job_required_skills: null,
  //       job_required_education: {
  //         postgraduate_degree: false,
  //         professional_certification: false,
  //         high_school: false,
  //         associates_degree: false,
  //         bachelors_degree: false,
  //         degree_mentioned: true,
  //         degree_preferred: false,
  //         professional_certification_mentioned: false,
  //       },
  //       job_experience_in_place_of_education: false,
  //       job_min_salary: null,
  //       job_max_salary: null,
  //       job_salary_currency: null,
  //       job_salary_period: null,
  //       job_highlights: {
  //         Qualifications: [
  //           "Undergraduate degree, preferably in Computer Science or related field",
  //           "5+ years of working experience building web applications using Django, Python, HTML, CSS, and JavaScript libraries such as Query and React",
  //           "Working experience deploying and supporting software solutions in a distributed Linux-based production environment",
  //           "Working experience with relational databases, document databases, and cache stores",
  //           "Knowledgeable on best practices for the full software development life cycle, coding standards, code reviews, source control management with git and Git Hub, build processes, CI/CD, testing, and ongoing operations",
  //           "Working experience with cloud-computing platforms such as Google Cloud Platform (GCP) and Amazon Web Services (AWS)",
  //           "Desire to automate everything",
  //           "Excellent verbal & written communication skills",
  //           "Independent and self-driven",
  //           "Creative problem solver",
  //           "Knowledge of accounting and financial operations a major plus",
  //           "Willingness to work in our Houston office, or in a hybrid capacity",
  //         ],
  //         Responsibilities: [
  //           "The candidate will be responsible for the technical design, development, and deployment of our accounting and finance related SaaS products",
  //           "They will be joining a small and rapidly growing early-stage startup, where they will have a direct impact on the end-user product and future direction of the technology stack",
  //           "Be responsible for the technical design, development, and deployment of our end-user products and in-house administrative site",
  //           "Participate in sprint planning and estimation",
  //           "Collaborate with stakeholders on requirements definition, feature design, & development",
  //           "Contribute to the design and development of new products and services",
  //           "Maintain a high level of quality for software delivery",
  //           "Support products and services in a production environment",
  //         ],
  //         Benefits: [
  //           "Competitive Salary",
  //           "As a ground-floor member of the team, employees are eligible for equity in the form of a generous stock options package",
  //           "We offer flexible time off so that our employees can perform their best",
  //           "Medical / Dental / Vision & Supplemental Insurance Coverage",
  //           "○ Full premium paid, full HSA employer contribution if opting to go with the high-deductible plan",
  //           "○ Low deductible and out of pocket plan fully paid if opting to not go with the high-deductible plan",
  //         ],
  //       },
  //       job_job_title: null,
  //     },
  //   ],
  // };

  // const transactionData = {
  //   data: [
  //     {
  //       id: "123456",
  //       month: "Mars",
  //       date: "31-2022",
  //       amount: "1000000",
  //       tontine_name: "En famille",
  //       type: "prelevement"
  //     },
  //     {
  //       id: "123457",
  //       month: "Juin",
  //       date: "25-2022",
  //       amount: "200000",
  //       tontine_name: "Yopougon Millionnaire",
  //       type: "prelevement"
  //     },
  //     {
  //       id: "123458",
  //       month: "Janvier",
  //       date: "15-2023",
  //       amount: "50000",
  //       tontine_name: "Ma voiture",
  //       type: "prelevement"

  //     },
  //     {
  //       id: "123459",
  //       month: "Fevrier",
  //       date: "05-2023",
  //       amount: "125000",
  //       tontine_name: "Ma tontine",
  //       type: "prelevement"

  //     },{
  //       id: "123465",
  //       month: "Aout",
  //       date: "22-2022",
  //       amount: "350000",
  //       tontine_name: "La famille",
  //       type: "retrait"

  //     },
  //   ],
  // };
  // const isLoading = false;
  // const error = null;

  // console.log(data);
  return (
    <View style={styles.container}>
      {console.log('transaction data', myTransactions)}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity onPress={() => router.push('/transactionsList')}>
          <Text style={styles.headerBtn}>Plus</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : isError ? (
          <Text> Something went wrong </Text>
        ) : (
          myTransactions?.map((transac) => (
            <NearbyJobCard
              transac={transac}
              key={`nearby-job-${transac?.id}`}
              handleNavigate={() => router.push(`/tontine-details/${transac?.attributes.tontine.data.id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
