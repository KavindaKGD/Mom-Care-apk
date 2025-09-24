# SSD Group Assignment - MomCare-App

**Secure Software Development (SE4030)** | 4th Year 1st Semester | SLIIT  
**Group ID - 61**

## Project Overview
MomCare-App is a web/mobile application designed to assist pregnant women in tracking doctor visits, recording health notes, monitoring pregnancy progress, and accessing personalized health advice. The backend API handles data storage and retrieval, while the frontend provides user interaction. This project was chosen for the assignment as its source code is available from before the semester start, it is not maintained, and it exhibits vulnerabilities suitable for analysis and mitigation. It is not a well-known app used for learning purposes (e.g., WebGoat, DVWA), and no improved version is publicly available.

GitHub link to the original project:  
https://github.com/YourOriginalRepo/MomCare-App.git (Last commit before semester start: [Date, e.g., August 15, 2025])

GitHub link to the modified project after fixing the vulnerabilities:  
https://github.com/YourModifiedRepo/MomCare-App.git

Link to the YouTube video:  
https://www.youtube.com/watch?v=YourVideoID (10 minutes max: Describes vulnerabilities, fixes, and OAuth implementation. Each member uses max 2.5 minutes.)

## Identified Vulnerabilities
- Vulnerability 1 (IT22576170 - Kavinda K G D): [Brief description, e.g., Hardcoded Secrets in DB credentials]
- Vulnerability 2 (IT22576170 - Kavinda K G D): [Brief description, e.g., Insecure Data Storage in AsyncStorage]
- Vulnerability 3 - M5: Insecure Communication (Open CORS + Insecure Transport) (IT22143204 - Fonseka A A M D)
- Vulnerability 4 - M8: Secure Configuration (Helmet, API Config) (IT22143204 - Fonseka A A M D)
- Vulnerability 5 - M3: Insecure Authentication/Authorization (IT22189226 - Palamure S N)
- Vulnerability 6 - M4: Insufficient Input/Output Validation (IT22189226 - Palamure S N)
- Vulnerability 7 - M10: No / Insufficient Rate Limiting (IT22110916 - Mirahawaththa R W M N K G A)
- Vulnerability 8 - M2: Inadequate Supply Chain Security (Vulnerable/Outdated Dependencies) (IT22110916 - Mirahawaththa R W M N K G A)
- OAuth/OpenID Connect Implementation (Collaborative, led by IT22110916)

## Fixed Vulnerabilities
- Fixed vulnerabilities using “npm audit fix” command in backend implementation (e.g., ansi-regex, decode-uri-component).
- Fixed vulnerabilities using JSON Web Tokens (JWT) for authentication.
- Fixed vulnerabilities using “npm audit fix” in frontend packages.
- Implemented OAuth 2.0 with Google for secure login and feature update (e.g., authenticated access to health data).

## Security-Related Open-Source Testing Tools
- OWASP ZAP: For black-box scanning of APIs (e.g., injection and auth bypass tests).
- sqlmap: For SQL/NoSQL injection testing on POST endpoints.
- ESLint with eslint-plugin-security and eslint-plugin-no-unsanitized: For white-box static analysis (e.g., detecting non-literal RegExp and unsanitized req.body).
- Jest and Supertest: For unit testing auth and validation (e.g., 401 for unauthenticated requests).
- SonarCloud: For overall code quality and vulnerability scanning.
- Snyk: For dependency vulnerability checks.

## Contributors
- IT22576170 - Kavinda K G D (Vulnerability 1 and 2: Hardcoded Secrets and Insecure Data Storage)
- IT22143204 - Fonseka A A M D (Vulnerability 3 and 4: M5 Insecure Communication and M8 Secure Configuration)
- IT22189226 - Palamure S N (Vulnerability 5 and 6: M3 Insecure Authentication/Authorization and M4 Insufficient Input/Output Validation)
- IT22110916 - Mirahawaththa R W M N K G A (Vulnerability 7 and 8: M10 Rate Limiting and M2 Supply Chain Security, plus OAuth Implementation)

## How to Run the Project
1. Clone the modified repo: `git clone https://github.com/YourModifiedRepo/MomCare-App.git`
2. Install dependencies: `npm install`
3. Start the backend: `node server.js`
4. Start the frontend: [Instructions for React Native/Expo, e.g., `expo start`]
5. Test endpoints: Use Postman with Bearer token for authenticated routes.

## License
ISC
