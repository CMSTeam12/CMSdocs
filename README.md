A comprehensive career services dashboard for Saint Louis University students and career services staff. This platform helps students track their skills, discover job opportunities based on USA labor law codes, and receive certification suggestions tailored to their skill set.

## 📋 Features

### For Students
- **Personalized Dashboard**: View your profile, skills, and preferences at a glance
- **Skills Assessment**: Track your current skills and identify areas for improvement
- **Job Suggestions**: Receive job recommendations based on your skills with USA labor code references
- **Certification Recommendations**: Get personalized certification suggestions to enhance your career prospects
- **Data Visualization**: Interactive charts to visualize your skills and progress
- **Career Chatbot**: AI-powered assistant to answer career-related questions

### For Career Services Staff
- **Student Overview**: Comprehensive view of all students in the system
- **Analytics Dashboard**: Analyze student skills, preferences, and career readiness
- **Filtering Capabilities**: Filter students by major, job level, and other criteria
- **Skills Distribution**: View skill distribution across the student population
- **Location Preferences**: Track popular location preferences among students
- **Administrative Tools**: Manage student accounts and system settings

## 🚀 Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Data Visualization**: Recharts
- **Authentication**: Custom authentication system
- **Data Parsing**: PapaParse for CSV data processing
- **AI Integration**: AI-powered career chatbot

## 🔧 Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/slu-career-portal.git
   cd slu-career-portal
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔑 Authentication

The system uses a simple authentication system for demonstration purposes:

### Student Login
- **Username**: firstName + lastName (no spaces, case insensitive)
  - Example: For "John Doe", use "johndoe"
- **Password**: 123456

### Staff Login
- **Username**: admin
- **Password**: admin123

## 🔒 Login Page

The login page features:

- **Institutional Branding**: SLU and CMS logos prominently displayed
- **Responsive Design**: Optimized for all device sizes
- **Theme Support**: Light and dark mode toggle
- **Input Validation**: Real-time validation of username and password fields
- **Error Handling**: Clear error messages for authentication issues
- **Security Features**: Protection against common attacks
- **Accessibility**: ARIA-compliant design for screen readers
- **Session Management**: Secure cookie-based session storage

## 📊 Match Score Algorithm

The portal uses sophisticated algorithms to calculate match scores:

### Job Match Scores
- **Skill Alignment**: Compares student skills with job requirements
- **Weighting System**: Core skills are weighted more heavily
- **Calculation Method**: (Number of matching skills) / (Total required skills) * 100
- **Labor Code Integration**: Jobs are tagged with USA labor law codes for compliance
- **Score Interpretation**:
  - 90-100%: Excellent match
  - 70-89%: Good match
  - 50-69%: Moderate match
  - Below 50%: Minimal match

### Certification Match Scores
- **Skill Gap Analysis**: Identifies skills gaps that certifications can fill
- **Career Path Alignment**: Matches certifications to career goals
- **Industry Relevance**: Prioritizes industry-recognized certifications
- **Score Calculation**: (Number of relevant skills) / (Total certification skills) * 100
- **Recommendation Threshold**: Only certifications with >40% match are recommended

## 🤖 Career Chatbot

The integrated AI career assistant provides:

- **24/7 Career Guidance**: Instant answers to career-related questions
- **Resume Feedback**: Basic resume review and suggestions
- **Interview Preparation**: Common interview questions and tips
- **Job Search Strategies**: Personalized job search advice
- **Industry Insights**: Up-to-date information on various industries
- **Skill Development Recommendations**: Suggestions for skill improvement
- **Conversation History**: Saved chat history for reference
- **Multi-format Responses**: Text, links, and visual content

## 🛡️ Data Validation

The system implements comprehensive data validation:

### Input Validation
- **Form Validation**: Client-side validation for all input fields
- **Data Type Checking**: Ensures correct data types for all fields
- **Required Field Validation**: Prevents submission of incomplete forms
- **Format Validation**: Validates email addresses, phone numbers, etc.
- **Cross-field Validation**: Ensures logical consistency between related fields

### Data Integrity
- **Duplicate Detection**: Prevents duplicate student records
- **Referential Integrity**: Maintains relationships between data entities
- **Data Sanitization**: Prevents XSS and injection attacks
- **Error Logging**: Comprehensive logging of validation errors
- **Validation Feedback**: Clear user feedback for validation issues

### CSV Data Validation
- **Schema Validation**: Ensures CSV files match expected format
- **Data Cleansing**: Handles missing or malformed data
- **Transformation Rules**: Standardizes data during import
- **Batch Validation**: Validates entire datasets before processing
- **Error Reporting**: Detailed error reports for data issues

## 📁 Project Structure

\`\`\`
slu-career-portal/
├── app/                    # Next.js app directory
│   ├── login/              # Login page
│   ├── career-services/    # Career services dashboard
│   └── page.tsx            # Student dashboard
├── components/             # React components
│   ├── charts/             # Data visualization components
│   ├── ui/                 # UI components from shadcn/ui
│   ├── chatbot/            # Career chatbot components
│   └── main-nav.tsx        # Main navigation component
├── lib/                    # Utility functions and data handling
│   ├── auth-context.tsx    # Authentication context
│   ├── data.ts             # Data fetching and processing
│   ├── validation.ts       # Data validation utilities
│   └── match-algorithms.ts # Job and certification matching algorithms
├── public/                 # Static assets
│   └── images/             # Images and logos
└── README.md               # Project documentation
\`\`\`

## 📊 Data Visualization

The portal includes several interactive charts:

- Skills Progress Chart
- Job Match Analysis
- Certification Match Analysis
- Skills Radar Chart
- Skills Distribution Chart
- Work Mode Preferences Chart
- Location Preferences Chart
- Salary Distribution Chart

## 🔒 Security Note

This application uses client-side authentication for demonstration purposes. In a production environment, you should implement:

- Server-side authentication
- Secure password storage with hashing
- HTTPS for all communications
- Proper input validation and sanitization
- Rate limiting for login attempts
- CSRF protection
- Content Security Policy

## 📱 Responsive Design

The portal is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


## 📞 Contact

For questions or support, please contact:
- Email: helpdesk@cms.edu
- Website: [https://www.slu.edu/career-services](https://www.slu.edu/career-services)

---

© 2025 Saint Louis University Career Management Services. All rights reserved.
`
