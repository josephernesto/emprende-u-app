import { useState } from 'react'
import EntrepreneurLogin from './pages/EntrepreneurLogin'
import EntrepreneurRegister from './pages/EntrepreneurRegister'
import Home from './pages/Home'
import Landing from './pages/Landing'
import StudentLogin from './pages/StudentLogin'
import StudentRegister from './pages/StudentRegister'

const normalizeText = (value) => value.trim().replace(/\s+/g, ' ').toLowerCase()

const demoStudent = {
  firstName: 'Alvaro',
  lastName: 'Vasquez',
  university: 'Universidad Nacional de San Agustín (UNSA)',
  password: '123456',
}

const demoSeller = {
  firstName: 'Emprendedor',
  lastName: 'Universitario',
  university: 'Universidad Tecnológica del Perú (UTP)',
  accessIp: '192.168.1.10',
  password: '123456',
  role: 'entrepreneur',
}

const createAccessIp = () => {
  const lastNumber = Math.floor(10 + Math.random() * 220)
  return `192.168.1.${lastNumber}`
}

function App() {
  const [screen, setScreen] = useState('landing')
  const [student, setStudent] = useState(null)
  const [registeredStudents, setRegisteredStudents] = useState([demoStudent])
  const [registeredEntrepreneurs, setRegisteredEntrepreneurs] = useState([
    demoSeller,
  ])

  const enterHome = (profile) => {
    setStudent(profile)
    setScreen('home')
  }

  const logout = () => {
    setStudent(null)
    setScreen('landing')
  }

  const updateProfile = (updatedProfile) => {
    setStudent(updatedProfile)

    if (updatedProfile.role === 'entrepreneur') {
      setRegisteredEntrepreneurs((entrepreneurs) =>
        entrepreneurs.map((entrepreneur) =>
          entrepreneur.accessIp === updatedProfile.accessIp
            ? updatedProfile
            : entrepreneur,
        ),
      )
      return
    }

    setRegisteredStudents((students) =>
      students.map((registeredStudent) =>
        registeredStudent.password === student.password &&
        normalizeText(
          `${registeredStudent.firstName} ${registeredStudent.lastName}`,
        ) === normalizeText(`${student.firstName} ${student.lastName}`)
          ? updatedProfile
          : registeredStudent,
      ),
    )
  }

  const registerStudent = (profile) => {
    setRegisteredStudents((students) => [...students, profile])
    enterHome(profile)
  }

  const registerEntrepreneur = (profile) => {
    const entrepreneurProfile = {
      ...profile,
      accessIp: createAccessIp(),
    }

    setRegisteredEntrepreneurs((entrepreneurs) => [
      ...entrepreneurs,
      entrepreneurProfile,
    ])
    enterHome(entrepreneurProfile)
  }

  const loginStudent = ({ fullName, password }) => {
    const normalizedFullName = normalizeText(fullName)
    const foundStudent = registeredStudents.find((registeredStudent) => {
      const registeredFullName = normalizeText(
        `${registeredStudent.firstName} ${registeredStudent.lastName}`,
      )

      return (
        registeredFullName === normalizedFullName &&
        registeredStudent.password === password
      )
    })

    if (!foundStudent) {
      return false
    }

    enterHome(foundStudent)
    return true
  }

  const loginEntrepreneur = ({ accessIp, password }) => {
    const foundEntrepreneur = registeredEntrepreneurs.find(
      (entrepreneur) =>
        entrepreneur.accessIp === accessIp.trim() &&
        entrepreneur.password === password,
    )

    if (!foundEntrepreneur) {
      return false
    }

    enterHome(foundEntrepreneur)
    return true
  }

  if (screen === 'student-register') {
    return (
      <StudentRegister
        onBack={() => setScreen('landing')}
        onRegister={registerStudent}
      />
    )
  }

  if (screen === 'student-login') {
    return (
      <StudentLogin
        onBack={() => setScreen('landing')}
        onLogin={loginStudent}
        onCreateAccount={() => setScreen('student-register')}
      />
    )
  }

  if (screen === 'entrepreneur-register') {
    return (
      <EntrepreneurRegister
        onBack={() => setScreen('landing')}
        onRegister={registerEntrepreneur}
      />
    )
  }

  if (screen === 'entrepreneur-login') {
    return (
      <EntrepreneurLogin
        onBack={() => setScreen('landing')}
        onLogin={loginEntrepreneur}
        onCreateAccount={() => setScreen('entrepreneur-register')}
      />
    )
  }

  if (screen === 'home') {
    return (
      <Home
        student={student}
        onLogout={logout}
        onUpdateProfile={updateProfile}
      />
    )
  }

  return (
    <Landing
      onStudentRegister={() => setScreen('student-register')}
      onStudentLogin={() => setScreen('student-login')}
      onSellerRegister={() => setScreen('entrepreneur-register')}
      onSellerLogin={() => setScreen('entrepreneur-login')}
    />
  )
}

export default App
