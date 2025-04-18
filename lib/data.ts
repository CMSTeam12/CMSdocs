import Papa from "papaparse"

export type Student = {
  id: string
  submissionDate: string
  firstName: string
  lastName: string
  email: string
  date: string
  educationLevel: string
  major: string
  yearsOfExperience: number
  jobLevel: string
  workModePreference: string
  willingToRelocate: string
  preferredLocation1: string
  preferredLocation2: string
  preferredLocation3: string
  jobSearchStatus: string
  expectedSalary: number
  skills: string
  gender: string
  language: string
  gpa: string
  sponsorship: string
  disability: string
  openToMentorship: string
  skillsMap: {
    [key: string]: boolean
  }
}

export async function fetchStudentData(): Promise<Student[]> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Final_data-rQo1GeUzyIuQ8F4fSTZvHR9AqBnZ91.csv",
    )
    const csvText = await response.text()

    const { data } = Papa.parse(csvText, { header: true })

    return data.map((row: any) => {
      // Create a skills map from the individual skill columns
      const skillsMap: { [key: string]: boolean } = {
        "C++": row["C++"] === "Yes",
        Java: row["Java"] === "Yes",
        Python: row["Python"] === "Yes",
        JavaScript: row["JavaScript"] === "Yes",
        R_Language: row["R_Language"] === "Yes",
        AI_Machine_Learning: row["AI_Machine_Learning"] === "Yes",
        Cloud_DevOps: row["Cloud_DevOps"] === "Yes",
        Networking_Security: row["Networking_Security"] === "Yes",
        GIT: row["GIT"] === "Yes",
        Data_Structures_Algorithms: row["Data_Structures_Algorithms"] === "Yes",
        Database_Management: row["Database_Management"] === "Yes",
        Data_Backup_Recovery: row["Data_Backup_Recovery"] === "Yes",
        Big_Data: row["Big_Data"] === "Yes",
        Operating_Systems: row["Operating_Systems"] === "Yes",
        Data_Analytics_Visualization: row["Data_Analytics_Visualization"] === "Yes",
        Data_Collaboration: row["Data_Collaboration"] === "Yes",
        Data_Governance_Quality: row["Data_Governance_Quality"] === "Yes",
        Data_Science: row["Data_Science"] === "Yes",
        Cybersecurity: row["Cybersecurity"] === "Yes",
        Web_Development: row["Web_Development"] === "Yes",
        Business_Analyst: row["Business_Analyst"] === "Yes",
        Project_Management_and_Collaboration_Tools: row["Project_Management_and_Collaboration_Tools"] === "Yes",
        Enterprise_Systems: row["Enterprise_Systems"] === "Yes",
        IT_Support_Helpdesk: row["IT_Support_Helpdesk"] === "Yes",
        IT_Security_Compliance: row["IT_Security_Compliance"] === "Yes",
        Testing_Quality_Assurance: row["Testing_Quality_Assurance"] === "Yes",
        Development_Tools: row["Development_Tools"] === "Yes",
      }

      return {
        id: row[""] || "",
        submissionDate: row["Submission.Date"] || "",
        firstName: row["First.Name"] || "",
        lastName: row["Last.Name"] || "",
        email: row["Email"] || "",
        date: row["Date"] || "",
        educationLevel: row["Education.Level"] || "",
        major: row["Major"] || "",
        yearsOfExperience: Number.parseInt(row["Years.of.Experience"] || "0"),
        jobLevel: row["What.level.are.you.looking.for."] || "",
        workModePreference: row["Work.Mode.Preference"] || "",
        willingToRelocate: row["Willing.to.relocate"] || "",
        preferredLocation1: row["Prefered.Location.1"] || "",
        preferredLocation2: row["Prefered.Location.2"] || "",
        preferredLocation3: row["Prefered.Location.3"] || "",
        jobSearchStatus: row["Current.Job.Search.Status"] || "",
        expectedSalary: Number.parseInt(row["Expected.Salary"] || "0"),
        skills: row["Skills"] || "",
        gender: row["Gender"] || "",
        language: row["Language"] || "",
        gpa: row["GPA"] || "",
        sponsorship: row["Sponsorship"] || "",
        disability: row["Disability"] || "",
        openToMentorship: row["Are.you.open.to.mentorship."] || "",
        skillsMap,
      }
    })
  } catch (error) {
    console.error("Error fetching student data:", error)
    return []
  }
}

export function getSkillsCount(students: Student[]) {
  const skillsCount: { [key: string]: number } = {}

  // Initialize all skills with 0
  const skillKeys = [
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "R_Language",
    "AI_Machine_Learning",
    "Cloud_DevOps",
    "Networking_Security",
    "GIT",
    "Data_Structures_Algorithms",
    "Database_Management",
    "Data_Backup_Recovery",
    "Big_Data",
    "Operating_Systems",
    "Data_Analytics_Visualization",
    "Data_Collaboration",
    "Data_Governance_Quality",
    "Data_Science",
    "Cybersecurity",
    "Web_Development",
    "Business_Analyst",
    "Project_Management_and_Collaboration_Tools",
    "Enterprise_Systems",
    "IT_Support_Helpdesk",
    "IT_Security_Compliance",
    "Testing_Quality_Assurance",
    "Development_Tools",
  ]

  skillKeys.forEach((skill) => {
    skillsCount[skill] = 0
  })

  // Count skills
  students.forEach((student) => {
    Object.entries(student.skillsMap).forEach(([skill, hasSkill]) => {
      if (hasSkill) {
        skillsCount[skill] = (skillsCount[skill] || 0) + 1
      }
    })
  })

  return skillsCount
}

export function getJobSuggestions(student: Student) {
  // Define job roles and their required skills
  const jobRoles = [
    {
      title: "Software Developer",
      skills: ["Java", "Python", "JavaScript", "GIT", "Data_Structures_Algorithms"],
      laborCode: "15-1252",
      description: "Develops applications using programming languages and software development practices.",
    },
    {
      title: "Data Scientist",
      skills: ["Python", "R_Language", "AI_Machine_Learning", "Data_Science", "Big_Data"],
      laborCode: "15-2051",
      description: "Analyzes and interprets complex data to help organizations make better decisions.",
    },
    {
      title: "Cloud Engineer",
      skills: ["Cloud_DevOps", "Networking_Security", "Operating_Systems"],
      laborCode: "15-1241",
      description: "Designs, implements, and manages cloud-based systems and infrastructure.",
    },
    {
      title: "Cybersecurity Analyst",
      skills: ["Cybersecurity", "Networking_Security", "IT_Security_Compliance"],
      laborCode: "15-1212",
      description: "Protects computer systems and networks from information disclosure or theft.",
    },
    {
      title: "Web Developer",
      skills: ["JavaScript", "Web_Development", "GIT"],
      laborCode: "15-1254",
      description: "Creates and maintains websites and web applications.",
    },
    {
      title: "Business Analyst",
      skills: ["Business_Analyst", "Data_Analytics_Visualization", "Project_Management_and_Collaboration_Tools"],
      laborCode: "13-1111",
      description: "Analyzes business needs and processes to recommend improvements.",
    },
    {
      title: "Database Administrator",
      skills: ["Database_Management", "Data_Backup_Recovery", "Data_Governance_Quality"],
      laborCode: "15-1242",
      description: "Manages and secures an organization's databases.",
    },
    {
      title: "IT Support Specialist",
      skills: ["IT_Support_Helpdesk", "Operating_Systems", "Networking_Security"],
      laborCode: "15-1232",
      description: "Provides technical assistance and support for computer systems and software.",
    },
  ]

  // Calculate match score for each job role
  const jobMatches = jobRoles.map((job) => {
    const matchingSkills = job.skills.filter((skill) => student.skillsMap[skill])
    const matchScore = matchingSkills.length / job.skills.length

    return {
      ...job,
      matchScore,
      matchingSkills,
    }
  })

  // Sort by match score and return top matches
  return jobMatches.sort((a, b) => b.matchScore - a.matchScore)
}

export function getCertificationSuggestions(student: Student) {
  // Define certifications and their related skills
  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      skills: ["Cloud_DevOps"],
      description: "Validates expertise in designing distributed systems on AWS.",
    },
    {
      name: "CompTIA Security+",
      skills: ["Cybersecurity", "IT_Security_Compliance", "Networking_Security"],
      description: "Establishes the core knowledge required for cybersecurity roles.",
    },
    {
      name: "Certified Information Systems Security Professional (CISSP)",
      skills: ["Cybersecurity", "IT_Security_Compliance"],
      description: "Advanced certification for security professionals.",
    },
    {
      name: "Microsoft Certified: Azure Developer Associate",
      skills: ["Cloud_DevOps", "Web_Development"],
      description: "Validates skills in developing solutions using Azure services.",
    },
    {
      name: "Certified Data Professional (CDP)",
      skills: ["Data_Science", "Big_Data", "Data_Analytics_Visualization"],
      description: "Validates expertise in data management and analytics.",
    },
    {
      name: "Google Professional Data Engineer",
      skills: ["Data_Science", "Big_Data", "Cloud_DevOps"],
      description: "Validates expertise in designing data processing systems on Google Cloud.",
    },
    {
      name: "Project Management Professional (PMP)",
      skills: ["Project_Management_and_Collaboration_Tools", "Business_Analyst"],
      description: "Validates expertise in project management principles and practices.",
    },
    {
      name: "Certified ScrumMaster (CSM)",
      skills: ["Project_Management_and_Collaboration_Tools"],
      description: "Validates knowledge of Scrum framework and agile practices.",
    },
    {
      name: "Oracle Certified Professional, Java SE Programmer",
      skills: ["Java"],
      description: "Validates expertise in Java programming language.",
    },
    {
      name: "Microsoft Certified: Azure AI Engineer Associate",
      skills: ["AI_Machine_Learning", "Cloud_DevOps"],
      description: "Validates skills in building AI solutions using Azure services.",
    },
  ]

  // Calculate match score for each certification
  const certMatches = certifications.map((cert) => {
    const matchingSkills = cert.skills.filter((skill) => student.skillsMap[skill])
    const matchScore = matchingSkills.length / cert.skills.length

    return {
      ...cert,
      matchScore,
      matchingSkills,
    }
  })

  // Sort by match score and return top matches
  return certMatches.sort((a, b) => b.matchScore - a.matchScore)
}
